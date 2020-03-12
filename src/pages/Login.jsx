import React, { useContext, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../auth-context";

function Login() {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lang, setLang] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  function switchLoginMode() {
    setIsLoginMode(prev => !prev);
  }

  function handleInput(event) {
    if (event.target.name === "name") {
      setName(event.target.value);
      if (event.target.value === "") setErrorName("Name cannot be empty.");
      else setErrorName();
    } else if (event.target.name === "email") {
      setEmail(event.target.value);
      if (event.target.value === "") setErrorEmail("Email cannot be empty.");
      else setErrorEmail();
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
      if (event.target.value === "")
        setErrorPassword("Password cannot be empty.");
      else setErrorPassword();
    }
  }

  useEffect(() => {
    if (errorEmail || errorPassword || (!isLoginMode && errorName))
      setIsValid(false);
    else setIsValid(true);
  }, [errorEmail, errorName, errorPassword, isLoginMode]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          JSON.stringify({
            email: email,
            password: password
          }),
          { "Content-Type": "application/json" }
        );

        auth.login(
          responseData._id,
          responseData.token,
          responseData.name,
          null,
          responseData.lang
        );
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/",
          "POST",

          JSON.stringify({
            name: name,
            email: email,
            password: password,
            lang: lang
          }),
          { "Content-Type": "application/json" }
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
  }

  function handleSetLang(val) {
    setLang(val);
  }

  return (
    <React.Fragment>
      {error && (
        <Alert variant="danger" onClose={clearError} dismissible>
          <Alert.Heading>An error has occured :(</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
      <Form className="center-container">
        <div className="center-items">
          <h1>{isLoginMode ? "Login" : "Register"}</h1>
          <Button
            className="center"
            onClick={switchLoginMode}
            variant="outline-secondary"
          >
            {isLoginMode
              ? "Don't have an account? Create one here."
              : "Already have an account? Login here."}
          </Button>
        </div>
        {!isLoginMode && (
          <div className="center-items">
            <br />
            <h1>{"Pick a language:"}</h1>

            <ToggleButtonGroup
              type="radio"
              name="langs"
              defaultValue={""}
              onChange={handleSetLang}
            >
              <ToggleButton variant="outline-dark" value={"DE"}>
                <img
                  className="flag-icon-big"
                  src="germanflag.png"
                  alt="german flag"
                />
                <h3>German</h3>
              </ToggleButton>
              <ToggleButton variant="outline-dark" value={"RU"}>
                <img
                  className="flag-icon-big"
                  src="russianflag.png"
                  alt="russian flag"
                />
                <h3>Russian</h3>
              </ToggleButton>
            </ToggleButtonGroup>
            {/* <img className="flag-icon" src="germanflag.png" alt="german flag" />
            <h3>German</h3> */}
          </div>
        )}
        {!isLoginMode && (
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={handleInput}
              placeholder="Enter your name"
            />
          </Form.Group>
        )}

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={email}
            onChange={handleInput}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            value={password}
            onChange={handleInput}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          block
          disabled={isLoading || !isValid}
          onClick={!isLoading ? handleSubmit : null}
        >
          {isLoading ? "Loading…" : "Submit"}
        </Button>
      </Form>
      {isLoading && (
        <div className="center-items-flex">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
    </React.Fragment>
  );
}

export default Login;
