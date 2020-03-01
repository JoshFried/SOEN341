import React, { Fragment } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import Logo from "../images/header/instagram.svg";
import upload from "../images/header/upload.svg";
import profile from "../images/header/profile.svg";
import feed from "../images/header/feed.svg";
import "../App.css";
import { useAuth } from "../context/auth";

// Layout // Whatever is wrapped in CustomLayout will display ( props.children )
const CustomLayout = props => {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }
  return (
    <Fragment>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <link
          href="https://fonts.googleapis.com/css?family=Grand+Hotel&display=swap"
          rel="stylesheet"
        ></link>
        <Navbar.Brand
          className="title"
          href="login"
          style={{
            fontSize: "30px",
            marginLeft: "23%",
            padding: "10px",
            fontFamily: "Grand Hotel",
            fontWeight: "500"
          }}
        >
          <img
            src={Logo}
            width="29"
            height="29"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            style={{ marginTop: "6px" }}
          ></img>
          &nbsp; | Instagram-Clone
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div
            className="active-cyan-1 mb-1"
            style={{ marginLeft: "10%", paddingTop: "10px", width: "250px" }}
          >
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              aria-label="Search"
            ></input>
          </div>
          <Nav className="mr-auto"></Nav>
          <Nav className="menu" style={{ marginRight: "48px" }}>
            <Nav.Link href="feed">
              <img
                src={feed}
                alt=""
                style={{ width: "23px", height: "23px" }}
              ></img>
            </Nav.Link>
            &nbsp;&nbsp;
            <Nav.Link href="upload">
              <img
                src={upload}
                alt=""
                style={{ width: "23px", height: "23px" }}
              ></img>
            </Nav.Link>
            &nbsp;&nbsp;
            <Nav.Link href="profile">
              <img
                src={profile}
                alt=""
                style={{ width: "23px", height: "23px" }}
              ></img>
            </Nav.Link>
            <Nav.Link href="/login">
              <Button variant="outline-dark" onClick={logOut}>
                Logout
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>{props.children}</div>
      <footer className="page-footer font-small blue">
        <div className="footer-copyright text-center py-3">
          © 2020 Copyright: SOEN-341 UB11
        </div>
      </footer>
    </Fragment>
  );
};

export default CustomLayout;
