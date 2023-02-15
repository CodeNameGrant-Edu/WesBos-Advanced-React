import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const strip = useStripe();
  const elements = useElements();

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
    }

    // 5. Send token to keystone in custom mutation
    // 6. Change page to view Order
    // 7. Close cart
    // 8. Turn off loader
    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: '1.5rem', color: 'red' }}>{error.message}</p>}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
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
