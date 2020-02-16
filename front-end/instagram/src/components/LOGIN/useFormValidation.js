import { useState, useEffect } from "../../../node_modules/react";

const useFormValidation = (initialState, validate, authenticate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        authenticate();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  const handleChange = event => {
    setValues({
      ...values,
      //the [] allows us to dynamically change the property we're updatating
      [event.target.name]: event.target.value
    });
  };

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }
  const handleSubmit = event => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  };
  return {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  };
};

export default useFormValidation;
