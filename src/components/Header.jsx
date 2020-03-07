import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={NavLink} to={"/"}>
        WordsApp
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to={"/"}>
            Dashboard
          </Nav.Link>
          <Nav.Link to={"/"}>Words List</Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link as={NavLink} to={"/login"}>
            Login/Register
          </Nav.Link>
          <Navbar.Brand>James Quinn</Navbar.Brand>
          <Nav.Link to={"/"}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
