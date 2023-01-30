import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const REQUEST_RESET_MUTATION = gql`
  mutation RequestReset($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: ''
  });

  const [sendRequest, { data, loading, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs

    // refetchQueries: [CURRENT_USER_QUERY]
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await sendRequest();
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={onSubmitHandler}>
      <h2>Request a Password Reset</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null ? (
          <p>Success! Check your email for a Password Reset Link</p>
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

            <button type="submit">Request Reset</button>
          </>
        )}
      </fieldset>
    </Form>
  );
}
