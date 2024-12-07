import { useState } from 'react';

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validate = (validations) => {
    let isValid = true;
    const newErrors = {};

    Object.keys(validations).forEach((key) => {
      const value = values[key];
      const validation = validations[key];

      if (validation.required && !value) {
        isValid = false;
        newErrors[key] = `${key} is required`;
      } else if (validation.pattern && !validation.pattern.test(value)) {
        isValid = false;
        newErrors[key] = validation.message || `${key} is invalid`;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return {
    values,
    errors,
    handleChange,
    validate,
  };
};

export default useForm;
