import React from "react";
import useFormValidation from "./useFormValidation";
import validateAuth from "./validateAuth";

const INITIAL_STATE = {
  email: "",
  username: "",
  first_name: "test",
  last_name: "test",
  password: "",
  password2: ""
};

const Registration = () => {
  //   const RegistrationForm = styled.Form``;
  const authenticateUser = async () => {
    const {
      email,
      username,
      firstName,
      lastName,
      password,
      password2
    } = values;
    try {
      const apiRes = await fetch("http://127.0.0.1:8000/api/account/register", {
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        method: "POST",
        body: JSON.stringify(values)
      });
      const resJSON = await apiRes.json();
      console.log(resJSON);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateAuth, authenticateUser);

  return (
    <div className="container">
      <h1>Register Here</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={handleChange}
          name="email"
          className={errors.email && "error-input"}
          value={values.email}
          placeholder="Your email address"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <br />
        <input
          type="text"
          onChange={handleChange}
          name="username"
          className={errors.username && "error-input"}
          value={errors.username}
          placeholder="Your username"
        />
        {errors.username && <p className="error-text">{errors.username}</p>}
        <br />
        <input
          type="text"
          onChange={handleChange}
          name="firstName"
          className={errors.firstName && "error-input"}
          value={values.firstName}
          placeholder="Your first name"
        />
        {errors.firstName && <p className="error-text">{errors.firstName}</p>}
        <br />
        <input
          type="text"
          onChange={handleChange}
          name="lastName"
          className={errors.lastName && "error-input"}
          value={values.lastName}
          placeholder="Your last name"
        />
        {errors.lastName && <p className="error-text">{errors.lastName}</p>}
        <br />
        <input
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          className={errors.password && "error-input"}
          value={values.password}
          placeholder="Please choose a safe password"
        />
        <br />
        <input
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          name="password2"
          className={errors.password2 && "error-input"}
          value={values.password2}
          placeholder="Please choose a safe password"
        />
        <br />
        {errors.password2 && <p className="error-text">{errors.password2}</p>}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Registration;
