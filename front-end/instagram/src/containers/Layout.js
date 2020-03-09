import React, { Fragment, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import Logo from "../images/header/instagram.svg";
import upload from "../images/header/upload.svg";
import profile from "../images/header/user.svg";
import feed from "../images/header/feed.svg";
import "../App.css";
import { useAuth } from "../context/auth";
import { Redirect, Link, useLocation, useHistory } from "react-router-dom";

// Layout // Whatever is wrapped in CustomLayout will display ( props.children )
const CustomLayout = props => {
  const { setAuthTokens } = useAuth();
  const [changeLoc, setLoc] = useState("/");
  const [enter, setEnter] = useState(false);
  const [url, seturl] = useState("");
  let history = useHistory();
  let location = useLocation();

  function logOut() {
    setAuthTokens();
  }

  // location.pathname(url);

  const [query, setQuery] = useState("");
  const handleSearch = e => {
    e.preventDefault();
    console.log(query);
    history.push("/" + query);
    setQuery("");
  };
  const _handleKeyDown = event => {
    if (event.key === "Enter") {
      console.log(query);
      history.push("/" + query);
      setQuery("");
    }
  };
  return (
    <Fragment>
      <Navbar  fixed="top" collapseOnSelect expand="lg" bg="light" variant="light" style={{height:'65px'} }>
        <link
          href="https://fonts.googleapis.com/css?family=Grand+Hotel&display=swap"
          rel="stylesheet"
        ></link>
        <Navbar.Brand
          className="title"
          href="login"
          style={{
            fontSize: "28px",
            marginLeft: "23.6%",
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
          <div style={{width:'500px'}}>
          <div 
            className="active-cyan-1 mb-1"
            style={{ marginLeft: "10%", paddingTop: "10px", width: "250px" }}
          >
            <form>
              <input
                className="form-control"
                type="text"
                onChange={e => setQuery(e.target.value)}
                name="query"
                value={query}
                placeholder="Search"
                aria-label="Search"
              ></input>

            <button style={{display:'none'}}onClick={e => handleSearch(e)}>Search</button>
            </form>
          </div>
          </div>
          <Nav className="mr-auto"></Nav>
          <Nav className="menu" style={{ marginRight: "448px" }}>
            <Nav.Link href="feed">
              <img
                src={feed}
                alt=""
                style={{ width: "20px", height: "20px" }}
              ></img>
            </Nav.Link>
            &nbsp;&nbsp;
            <Nav.Link href="/upload">
              <img
                src={upload}
                alt=""
                style={{ width: "20px", height: "20px" }}
              ></img>
            </Nav.Link>
            &nbsp;&nbsp;
            <Nav.Link href="/profile">
              <img
                src={profile}
                alt=""
                style={{ width: "20px", height: "20px" }}
              ></img>
            </Nav.Link>
            <Nav.Link href="/login">
              <a variant="outline-dark" onClick={logOut}>
                Logout
              </a>
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
