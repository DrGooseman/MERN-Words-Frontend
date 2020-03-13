import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import NavDropdown from "react-bootstrap/NavDropdown";

import { AuthContext } from "../auth-context";
import { useHttpClient } from "../hooks/http-hook";

function Header() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  async function handleLangChange(value) {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/lang",
        "POST",

        JSON.stringify({
          lang: value
        }),
        { "Content-Type": "application/json", Authorization: auth.token }
      );

      auth.login(
        responseData._id,
        responseData.token,
        responseData.name,
        null,
        responseData.lang
      );
    } catch (err) {}
  }

  function getIcon() {
    console.log(auth.lang);
    if (auth.lang === "DE")
      return (
        <img className="flag-icon" src="germanflag.png" alt="german flag" />
      );
    if (auth.lang === "RU")
      return (
        <img className="flag-icon" src="russianflag.png" alt="russian flag" />
      );
  }

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
          <Nav.Link as={NavLink} to={"/wordlist"}>
            Words List
          </Nav.Link>
        </Nav>

        <Nav>
          {!auth.token && (
            <Nav.Link as={NavLink} to={"/login"}>
              Login/Register
            </Nav.Link>
          )}
          {auth.token && <Navbar.Brand>{auth.name}</Navbar.Brand>}
          {auth.token && (
            <NavDropdown
              className="no-padding"
              title={getIcon()}
              id="nav-dropdown"
            >
              <NavDropdown.Item
                className="no-padding"
                eventKey="DE"
                onClick={() => handleLangChange("DE")}
              >
                <img
                  className="flag-icon"
                  src="germanflag.png"
                  alt="german flag"
                />
                German
              </NavDropdown.Item>
              <NavDropdown.Item
                className="no-padding"
                eventKey="RU"
                onClick={() => handleLangChange("RU")}
              >
                <img
                  className="flag-icon"
                  src="russianflag.png"
                  alt="russian flag"
                />
                Russian
              </NavDropdown.Item>
            </NavDropdown>
          )}

          {auth.token && <Nav.Link onClick={auth.logout}>Logout</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
