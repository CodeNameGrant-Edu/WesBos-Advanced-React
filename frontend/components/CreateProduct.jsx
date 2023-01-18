import useForm from '../lib/useForm';
import Form from './styles/Form';

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm();

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <label htmlFor="image">
          Image:
          <input onChange={handleChange} type="file" id="image" name="image" />
        </label>

        <label htmlFor="name">
          Name:
          <input
            value={inputs.name}
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
            value={inputs.price}
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
