import { useMutation } from '@apollo/client';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../lib/cartState';
import SickButton from './styles/SickButton';
import { CURRENT_USER_QUERY } from './User';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CREATE_ORDER_MUTATION = gql`
  mutation Checkout($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { close: closeCart } = useCart();
  const strip = useStripe();
  const elements = useElements();
  const [checkout, { error: gqlError }] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [CURRENT_USER_QUERY]
  });

  async function handleSubmit(e) {
    // 1. stop form submission and turn on loader
    e.preventDefault();
    setLoading(true);

    // 2. Start Page transition
    nProgress.start();

    // 3. Create payment method via strip (token comes back if successful)
    const { error, paymentMethod } = await strip.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    console.log({ paymentMethod, error });

    // 4. Handle stripe errors
    if (error) {
      setError(error);
      nProgress.done();
      return; // Stops checkout form happending
    }

    // 5. Send token to keystone in custom mutation
    const order = await checkout({
      variables: {
        token: paymentMethod.id
      }
    });
    console.log(`Finished with order`, order);

    // 6. Change page to view Order
    router.push({
      pathname: `/order/[id]`,
      query: {
        id: order.data.checkout.id
      }
    });

    // 7. Close cart
    closeCart();

    // 8. Turn off loader
    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: '1.5rem', color: 'red' }}>{error.message}</p>}
      {gqlError && <p style={{ fontSize: '1.5rem', color: 'red' }}>{gqlError.message}</p>}
      <CardElement />
      <SickButton disabled={loading} aria-disabled={loading}>
        Check Out Now
      </SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
