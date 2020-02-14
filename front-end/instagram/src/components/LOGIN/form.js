import React from "react";
import useFormValidation from "./useFormValidation";
import validateAuth from "./validateAuth";

const INITIAL_STATE = {
  username: "",
  password: ""
};

const LoginForm = () => {
  const authenticateUser = async () => {
    console.log("fuck");
    const { username, password } = values;
    try {
      const apiRes = await fetch("http://127.0.0.1:8000/api/account/login", {
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
      <h1 style={{ font: "Georgia" }}>Login Here</h1>
      <form onSubmit={handleSubmit}>
        <input
          style={{
            width: "100%",
            padding: "12px 20px",
            margin: "8px 0",
            border: "1px solid #DCDCDC",
            borderRadius: "4px",
            boxSizing: "border-box"
          }}
          type="username"
          onChange={handleChange}
          name="username"
          className={errors.username && "error-input"}
          value={values.username}
          placeholder="Enter your email"
        />

        <br />

        <input
          style={{
            width: "100%",
            padding: "12px 20px",
            margin: "8px 0",
            border: "1px solid #DCDCDC",
            borderRadius: "4px",
            boxSizing: "border-box"
          }}
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          className={errors.password && "error-input"}
          value={values.password}
          placeholder="Enter Your Password"
        />
        <br />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <button
          style={{
            width: "100%",
            backgroundColor: "#6495ED",
            color: "white",
            padding: "14px 20px",
            margin: "8px 0",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
          type="submit"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
