import useForm from '../lib/useForm';
import Form from './styles/Form';

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm();

  return (
    <form action="">
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

      <button type="button" onClick={clearForm}>
        Clear Form
      </button>
      <button type="button" onClick={resetForm}>
        Reset Form
      </button>
    </form>
  );
}
