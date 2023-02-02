export default function calcTotalPrice(cart) {
  return cart.reduce((total, cartItem) => {
    // Incase a product is removed while its in someones cart
    if (!cartItem.product) return calcTotalPrice;

    return total + cartItem.product.price * cartItem.quantity;
  }, 0);
}
