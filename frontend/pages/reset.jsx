import { useRouter } from 'next/router';
import RequestReset from '../components/RequestReset';
import ResetPassword from '../components/ResetPassword';

export default function resetPasswordPage() {
  const { query } = useRouter();

  if (!query?.token) {
    return (
      <div>
        <p>Sorry, you must supply a token to use this page</p>
        <RequestReset />
      </div>
    );
  }

  return (
    <div>
      <ResetPassword token={query.token} />
    </div>
  );
}
