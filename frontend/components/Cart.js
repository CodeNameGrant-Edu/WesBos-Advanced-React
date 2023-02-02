import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';

export default function Cart() {
  const user = useUser();
  if (!user) return null;

  console.log(user);

  return (
    <CartStyles open>
      <header>
        <Supreme>{user.name}'s Cart</Supreme>
      </header>

      <ul>
        {user.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>

      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart) / 100)}</p>
      </footer>
    </CartStyles>
  );
}

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    width: 100px;
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => {
  const { product } = cartItem;
  if (!product) return null;

  return (
    <CartItemStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.photo.altText} />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney((product.price * cartItem.quantity) / 100)}&nbsp;-&nbsp;
          <em>
            {cartItem.quantity} @ {formatMoney(product.price / 100)}
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
};
