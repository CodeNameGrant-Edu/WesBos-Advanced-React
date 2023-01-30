import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation SignOut {
    endSession
  }
`;

export default function SignOut() {
  const [signOut] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [CURRENT_USER_QUERY]
  });

  return (
    <button type="button" onClick={signOut}>
      Sign Out
    </button>
  );
}
