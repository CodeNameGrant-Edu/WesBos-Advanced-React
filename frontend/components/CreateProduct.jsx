import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # describe the variables are being passed in
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      price
      description
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm();

  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs
  });

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        await createProduct();
        clearForm();
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image:
          <input onChange={handleChange} type="file" id="image" name="image" />
        </label>

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

        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
