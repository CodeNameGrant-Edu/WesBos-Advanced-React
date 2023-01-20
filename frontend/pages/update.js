import { useRouter } from 'next/router';
import React from 'react';
import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ id }) {
  const { query } = useRouter();

  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
