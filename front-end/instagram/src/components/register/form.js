import useFormValidation from "./useFormValidation";
import validateAuth from "./validateAuth";
import React, { useState } from "../../../node_modules/react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";

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
  const [isRegister, setRegister] = useState();

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
      setRegister(true);
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

  if (isRegister) {
    return <Redirect to="/login"></Redirect>;
  }

  return (
    <Fragment>
    <form onSubmit={handleSubmit} className="form-registration" style={{width:'100%', maxWidth:'300px',padding:'15px', margin:'auto', border:'1px solid grey', borderRadius:'10px', marginTop:'100px', boxShadow:' 5px 5px 5px 0px #888888'}}>
      <h1 className="h3 mb-3 font-weight-normal" style={{textAlign:'center'}}>Registration Form</h1>
      <br></br>
      
      <label htmlFor="inputEmail" className="sr-only">Email address</label>
      {errors.email && <p className="error-text" class="alert alert-danger">{errors.email}</p>}
      <input
        type="email"
        onChange={handleChange}
        name="email"
        className={errors.email && "error-input"}
        className="form-control"
        value={values.email}
        placeholder="Your email address"
        style={{marginBottom:'10px'}}
      ></input>  

      {errors.username && <p className="error-text" class="alert alert-danger">{errors.username}</p>}
      <label htmlFor="inputUsername" className="sr-only" >username</label>
      <input
        type="text"
        onChange={handleChange}
        name="username"
        className={errors.username && "error-input"}
        className="form-control"
        value={errors.username}
        placeholder="Your username"
        style={{marginBottom:'10px'}}
      ></input>

      {errors.firstName && <p className="error-text" class="alert alert-danger">{errors.firstName}</p>}
      <label htmlFor="inputFirstName" className="sr-only">First Name</label>
      <input
          type="text"
          onChange={handleChange}
          name="firstName"
          className={errors.firstName && "error-input"}
          className="form-control"
          value={values.firstName}
          placeholder="Your first name"
          style={{marginBottom:'10px'}}
        ></input>

      {errors.lastName && <p className="error-text" class="alert alert-danger">{errors.lastName}</p>}
      <label htmlFor="inputLasttName" className="sr-only">Last Name</label>
      <input
          type="text"
          onChange={handleChange}
          name="lastName"
          className={errors.lastName && "error-input"}
          className="form-control"
          value={values.lastName}
          placeholder="Your last name"
          style={{marginBottom:'10px'}}
        ></input>

        {errors.password && <p className="error-text" class="alert alert-danger">{errors.password}</p>}
      <label htmlFor="inputPassword1t" className="sr-only">Password</label>
        <input
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          className={errors.password && "error-input"}
          className="form-control"
          value={values.password}
          placeholder="Please choose a safe password"
          style={{marginBottom:'10px'}}
        ></input>

        {errors.password2 && <p className="error-text" class="alert alert-danger">{errors.password2}</p>}
      <label htmlFor="inputPassword2" className="sr-only">Retype password</label>
      <input
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          name="password2"
          className={errors.password2 && "error-input"}
          className="form-control"
          value={values.password2}
          placeholder="Re-enter password"
      ></input>
      <br></br>

        
        <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={isSubmitting}>Register</button>
    </form>
    </Fragment>
  );
};

export default Registration;
