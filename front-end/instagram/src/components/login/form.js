import React, { useState, useEffect } from "../../../node_modules/react";
import useFormValidation from "./useFormValidation";
import validateAuth from "./validateAuth";
import { useAuth } from "../../context/auth";
import { Link, Redirect } from "react-router-dom";
import { Fragment } from "react";

const INITIAL_STATE = {
  username: "",
  password: ""
};

const LoginForm = () => {
  // const { setAuthTokens } = useAuth();
  const { setAuthTokens } = useAuth();
  const [isLoggedIn, setLoggedIn] = useState();
  const authenticateUser = async () => {
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
      setAuthTokens(resJSON.token);
      setLoggedIn(true);
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

  if (isLoggedIn) {
    return <Redirect to="/profile"></Redirect>;
  }

  return (
    <Fragment>
    <form  onSubmit={handleSubmit} className="form-signin" style={{width:'100%', maxWidth:'330px', padding:'15px', margin:'auto', border:'1px solid grey', borderRadius:'10px', marginTop:'100px', boxShadow:' 5px 5px 5px 0px #888888'}}>
      <h1 className="h3 mb-3 font-weight-normal" style={{textAlign:'center'}}> Welcome, Sign in</h1>
      <br></br>
      <label htmlFor="inputEmail" className="sr-only">Email address</label>
      {errors.username && <p className="error-text" class="alert alert-danger">{errors.username}</p>}<
        input 
        type="username"
        onChange={handleChange}
        name="username"
        className={errors.username && "error-input"}
        className="form-control"
        value={values.username}
        placeholder="Email address" 
        style={{marginBottom:'10px'}}
      ></input>
      
      {errors.password && <p className="error-text" class="alert alert-danger">{errors.password}</p>}
      <label htmlFor="inputPassword" className="sr-only">Password</label>
      <input 
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        name="password"
        className={errors.password && "error-input"}
        className="form-control" 
        value={values.password}
        placeholder="Password" 
      ></input>
      <br></br>
      
      <button className="btn btn-lg btn-success btn-block" type="submit" disabled={isSubmitting}>Login</button>
      <br></br>
      <label>no account yet? sign up</label>
        <a 
          className="btn btn-lg btn-primary btn-block"
          href="register"
          role="button">Register
        </a>
  </form>
    <br></br>
    </Fragment>
  );
};

export default LoginForm;
