import { useRouter } from 'next/dist/client/router';
import React from 'react';
import SignIn from '../components/SignIn';
import { useUser } from '../components/User';

export default function SignInPage() {
  const user = useUser();
  const router = useRouter();

  if (user) {
    router.push('/account');
  }
  return (
    <div>
      <SignIn />
    </div>
  );
}
