import { useState } from 'react';

const useForm = (validate) => {
  const [values, setValues] = useState({ email: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e, submitData) => {
    e.preventDefault();
    const errors = validate(values);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setErrors(errors);
      submitData();
    }
  };

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
