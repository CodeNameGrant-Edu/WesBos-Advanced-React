import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput, OrderCreateInput } from '../.keystone/schema-types';
import stripe from '../lib/stripe';
import { CartItem } from '../schemas/CartItem';

export default async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  console.log('Checking out', token);

  // 1. Make sure the user is signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('Sorry, you must be signed in to create an order');
  }

  // 2. Calculate total price
  const user = await context.lists.User.findOne({
    where: {
      id: userId
    },
    resolveFields: `
      id 
      name 
      email 
      cart {
        id
        quantity
        product {
          id
          name
          price
          description
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }`
  });

  const cartItems = user.cart.filter((cartItem) => cartItem.product);

  const amount = cartItems.reduce(
    (tally, cartItem) => tally + cartItem.quantity * cartItem.product.price,
    0
  );

  // console.log({ amount });

  // 3. create charge with stripe
  const charge = await stripe.paymentIntents
    .create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });

  // console.log({ charge });

  // 4. convert cartitems to orderitems
  const orderItems = cartItems.map((cartItem) => ({
    name: cartItem.product.name,
    description: cartItem.product.description,
    price: cartItem.product.price,
    quantity: cartItem.quantity,
    photo: {
      connect: { id: cartItem.product.photo.id }
    }
  }));

  // 5. create order and return it to save
  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: {
        connect: { id: userId }
      }
    }
  });

  // 6. Clean up cart Items
  const cartItemIds = user.cart.map((item) => item.id);
  await context.lists.CartItem.deleteMany({
    ids: cartItemIds
  });

  return order;
}
