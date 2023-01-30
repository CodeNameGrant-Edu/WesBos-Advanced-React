import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
        }
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
        code
      }
    }
  }
`;

export default function SignIn() {
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: ''
  });

  const [signIn, { data, loading }] = useMutation(SIGN_IN_MUTATION, {
    variables: inputs,

    refetchQueries: [CURRENT_USER_QUERY]
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await signIn();
    resetForm();
    router.push('/products');
  };

  const error =
    data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form method="POST" onSubmit={onSubmitHandler}>
      <h2>Sign Into Your Account</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
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

        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
}
