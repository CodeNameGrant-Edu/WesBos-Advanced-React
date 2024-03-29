import { useRouter } from 'next/router';
import styled from 'styled-components';
import RequestReset from '../components/RequestReset';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { useUser } from '../components/User';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export default function SignInPage() {
  const user = useUser();
  const router = useRouter();

  if (user) {
    router.push('/account');
  }

  return (
    <GridStyles>
      <SignIn />
      <SignUp />
      <RequestReset />
    </GridStyles>
  );
}
