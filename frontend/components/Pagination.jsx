import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

const PRODUCT_COUNT_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { data, loading, error } = useQuery(PRODUCT_COUNT_QUERY);

  if (loading) return 'Loading Page Data';
  if (error) return <DisplayError error={error} />;

  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Page {page} of {pageCount} | Sick Fits
        </title>
      </Head>

      <Link href={{}}>
        <a aria-disabled={page === 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Total Products</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page === pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
}
