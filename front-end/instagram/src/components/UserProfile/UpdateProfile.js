import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import useFormValidation from "../register/useFormValidation";
import { updateProfile } from "../../modules/UserService";
import { useAuth } from "../../context/auth";
import { getUsername, getInfo } from "../../modules/UserService";
import { Redirect } from "react-router-dom";

const UpdateProfile = () => {
  const { authTokens } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({
    username: "",
    first_name: "",
    last_name: "",
    about: ""
  });
  const [user, setUser] = useState({
    username: " ",
    first_name: " ",
    last_name: " ",
    about: " "
  });

  useEffect(() => {
    getUsername(authTokens).then(name =>
      getInfo(name).then(person => {
        setUser({
          username: person.username,
          first_name: person.firstName,
          last_name: person.lastName,
          about: person.about
        });
      })
    );
  }, []);

  useEffect(() => {
    setValues({ ...user });
  }, [user]);

  const handleChange = event => {
    setValues({
      ...values,
      //the [] allows us to dynamically change the property we're updatating
      [event.target.name]: event.target.value
    });
    if (values.username === "") {
      values.username = user.username;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    updateProfile(authTokens, values);
    setSubmitting(true);
  };

  if(isSubmitting){
    return <Redirect to="/profile"></Redirect>
  }

  return (
    <Container    style={{
      maxWidth: "50%",
      paddingTop: "5%"
    }}>
  
      {user && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={handleChange}
              placeholder={user.username}
              defaultValue={user.username}
              value={values.username}
            />
          </Form.Group>

          <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              onChange={handleChange}
              defaultValue={user.first_name}
              value={values.first_name}
            />
          </Form.Group>

          <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              onChange={handleChange}
              placeholder={user.last_name}
              defaultValue="{user.last_name}"
              value={values.last_name}
            />
          </Form.Group>

          <Form.Group controlId="formBasicAbout">
            <Form.Label>About</Form.Label>
            <Form.Control
              type="text"
              name="about"
              onChange={handleChange}
              placeholder={user.about}
              defaultValue={user.about}
              value={values.about}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default UpdateProfile;
