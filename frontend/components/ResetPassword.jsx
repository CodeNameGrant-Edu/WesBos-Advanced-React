import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const RESET_MUTATION = gql`
  mutation ResetPassword($email: String!, $password: String!, $token: String!) {
    redeemUserPasswordResetToken(email: $email, password: $password, token: $token) {
      code
      message
    }
  }
`;

export default function ResetPassword({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token
  });

  const [resetPassword, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs

    // refetchQueries: [CURRENT_USER_QUERY]
  });

  const tokenError = data?.redeemUserPasswordResetToken?.code
    ? {
        message: data.redeemUserPasswordResetToken.message
      }
    : undefined;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await resetPassword();
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={onSubmitHandler}>
      <h2>Reset Password</h2>
      <DisplayError error={tokenError || error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null ? (
          <p>Success! You ca now sign in.</p>
        ) : (
          <>
            <label htmlFor="email">
              Email:
              <input
                value={inputs.email || ''}
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
              />
            </label>

            <label htmlFor="password">
              Password:
              <input
                value={inputs.password || ''}
                onChange={handleChange}
                type="password"
                id="password"
                name="password"
                autoComplete="password"
                placeholder="Password"
              />
            </label>

            <button type="submit">Reset</button>
          </>
        )}
      </fieldset>
    </Form>
  );
}
