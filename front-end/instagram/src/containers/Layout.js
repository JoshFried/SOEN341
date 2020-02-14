import React, { Fragment } from 'react'
import {Navbar, Nav} from "react-bootstrap";
import Logo  from '../images/instagram.svg';

// Layout // Whatever is wrapped in CustomLayout will display ( props.children )
const CustomLayout = (props) => {  
    return (
        <Fragment>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <link href="https://fonts.googleapis.com/css?family=Grand+Hotel&display=swap" rel="stylesheet"></link> 
        <Navbar.Brand className = "title" href="login" style = {{ fontSize: '30px', marginLeft: '23%', padding: '10px', fontFamily: 'Grand Hotel', fontWeight:'500'}}>
            <img src = {Logo}   
                 width="29"
                 height="29"
                 className="d-inline-block align-top"
                 alt="React Bootstrap logo"
                 style = {{marginTop: '6px' }}>
            </img>
                 &nbsp; |  Instagram-Clone 
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav className = 'menu' style={{ marginRight: '500px'}}>
            <Nav.Link style={{ color: 'black', fontWeight: '500'}} href="login">Login</Nav.Link>
            <Nav.Link  style={{ color: 'black', fontWeight: '500'}} href="upload">Upload</Nav.Link>
            <Nav.Link  style={{ color: 'black', fontWeight: '500'}} href="profile">Profile</Nav.Link>
            <Nav.Link  style={{ color: 'black', fontWeight: '500'}} href="feed">Feed</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        <div>
            {props.children} 
        </div>
        <footer className="page-footer font-small blue">
         <div className="footer-copyright text-center py-3">© 2020 Copyright: SOEN-341 UB11
         </div>
        </footer>
        </Fragment>
    )
}

export default CustomLayout