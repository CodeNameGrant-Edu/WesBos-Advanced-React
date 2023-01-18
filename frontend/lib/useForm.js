import { useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { name, type, value } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = e.target.value;
    }

    setInputs({ ...inputs, [name]: value });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = {};
    Object.keys(inputs).forEach((key) => (blankState[key] = ''));
    setInputs(blankState);
  }

  return { inputs, handleChange, resetForm, clearForm };
}
