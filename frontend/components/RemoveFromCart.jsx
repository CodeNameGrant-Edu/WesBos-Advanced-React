import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation RemoveFromCart($id: ID!) {
    deleteCartItem(id: $id) {
      id
      product {
        name
      }
      quantity
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    refetchQueries: [CURRENT_USER_QUERY]
  });

  return (
    <BigButton
      title="Remove Item From Cart"
      type="button"
      disabled={loading}
      onClick={removeFromCart}
    >
      &times;
    </BigButton>
  );
}
