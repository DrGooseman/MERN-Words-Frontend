import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { useHttpClient } from "../hooks/http-hook";

function ContactMe() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [didMessageSend, setDidMessageSend] = useState(false);

  function handleInput(event) {
    if (event.target.name === "name") {
      setName(event.target.value);
      if (event.target.value === "") setErrorName("Name cannot be empty.");
      else setErrorName();
    } else if (event.target.name === "email") {
      setEmail(event.target.value);
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(event.target.value))
        setErrorEmail("You must enter a valid email.");
      else setErrorEmail();
    } else if (event.target.name === "message") {
      setMessage(event.target.value);
      if (event.target.value === "")
        setErrorMessage("The message cannot be empty.");
      else setErrorMessage();
    }
  }

  useEffect(() => {
    if (errorEmail || errorName || errorMessage) setIsValid(false);
    else if (!email || !name || !message) setIsValid(false);
    else setIsValid(true);
  }, [errorEmail, errorName, errorMessage]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/contactme",
        "POST",
        JSON.stringify({
          name: name,
          email: email,
          message: message
        }),
        { "Content-Type": "application/json" }
      );
      setName("");
      setEmail("");
      setMessage("");
      setDidMessageSend(true);
    } catch (err) {}
  }

  return (
    <React.Fragment>
      {error && (
        <Alert variant="danger" onClose={clearError} dismissible>
          <Alert.Heading>An error has occured :(</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
      {didMessageSend && (
        <Alert
          variant="success"
          onClose={() => setDidMessageSend(false)}
          dismissible
        >
          <Alert.Heading>Message sent!</Alert.Heading>
        </Alert>
      )}
      <Form className="center-container">
        <div className="center-items">
          <h1>Contact Me</h1>
        </div>

        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={handleInput}
            placeholder="Enter your name"
            isInvalid={errorName && true}
            isValid={!errorName && name && true}
            // {errorName ? isInvalid : isValid}
          />
          <Form.Control.Feedback type="invalid">
            {errorName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={email}
            onChange={handleInput}
            type="email"
            placeholder="Enter email"
            isInvalid={errorEmail && true}
            isValid={!errorEmail && email && true}
          />
          <Form.Control.Feedback type="invalid">
            {errorEmail}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            name="message"
            value={message}
            onChange={handleInput}
            as="textarea"
            rows="4"
            placeholder="Enter your message here..."
            isInvalid={errorMessage && true}
            isValid={!errorMessage && message && true}
          />
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          block
          disabled={isLoading || !isValid}
          onClick={!isLoading ? handleSubmit : null}
        >
          {isLoading ? "Loading…" : "Send"}
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

export default ContactMe;
