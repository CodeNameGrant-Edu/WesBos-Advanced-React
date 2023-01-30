import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const SIGN_UP_MUTATION = gql`
  mutation SignUp($email: String!, $name: String!, $password: String!) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: ''
  });

  const [signUp, { data, loading, error }] = useMutation(SIGN_UP_MUTATION, {
    variables: inputs

    // refetchQueries: [CURRENT_USER_QUERY]
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await signUp().catch(console.error);
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={onSubmitHandler}>
      <h2>Sign Up For an Account</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.createUser ? (
          <p>Signed up with {data.createUser.email} - Please go a head an sign in!</p>
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

            <label htmlFor="name">
              Name:
              <input
                value={inputs.name || ''}
                onChange={handleChange}
                type="name"
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Name"
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

            <button type="submit">Sign Up</button>
          </>
        )}
      </fieldset>
    </Form>
  );
}
