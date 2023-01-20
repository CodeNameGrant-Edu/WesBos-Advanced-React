import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Form from './styles/Form';

const SINGLE_PRODUCT_QUERY = gql`
  query SingleProductQuery($id: ID!) {
    product: Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: ID!, $name: String, $description: String, $price: Int) {
    updateProduct(id: $id, data: { name: $name, description: $description, price: $price }) {
      id
    }
  }
`;

export default function UpdateProduct({ id }) {
  // Query current product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id }
  });

  // Mutation to update product
  const [updateProduct, mutationResponse] = useMutation(UPDATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }]
  });

  const { inputs, handleChange } = useForm({
    ...data?.product
  });

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        await updateProduct({
          variables: {
            id,
            ...inputs
          }
        });
        Router.push({
          pathname: `/products`
        });
      }}
    >
      <DisplayError error={error || mutationResponse.error} />
      <fieldset disabled={mutationResponse.loading} aria-busy={mutationResponse.loading}>
        <label htmlFor="name">
          Name:
          <input
            value={inputs.name || ''}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            placeholder="Name"
          />
        </label>

        <label htmlFor="price">
          Price:
          <input
            value={inputs.price || 0}
            onChange={handleChange}
            type="number"
            id="price"
            name="price"
            placeholder="Price"
          />
        </label>

        <label htmlFor="description">
          Description:
          <textarea
            value={inputs.description}
            onChange={handleChange}
            id="description"
            name="description"
            placeholder="Description"
          />
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
