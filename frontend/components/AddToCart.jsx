import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($id: ID!) {
    addToCart(productId: $id) {
      id
      product {
        name
      }
      quantity
    }
  }
`;

export default function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [CURRENT_USER_QUERY]
  });

  return (
    <button type="button" disabled={loading} onClick={addToCart}>
      Add{loading && 'ing'} To Cart
    </button>
  );
}
