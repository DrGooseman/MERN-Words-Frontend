import React, { useState, useEffect, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import WordColumn from "./../components/WordColumn";

import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../auth-context";

function WordList() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [words, setWords] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/words",
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Authorization: auth.token
        }
      );

      setWords(responseData.words);
    } catch (err) {}
  }

  function getReviewDays(date) {
    if (new Date(date) < new Date()) return "Ready to review!";

    let time = (new Date(date) - new Date()) / 1000 / 60 / 60;
    if (time < 24) console.log(Math.ceil(time) + " hours");
    else console.log(Math.ceil(time) + " days");
  }

  return (
    <React.Fragment>
      {error && (
        <Alert variant="danger" onClose={clearError} dismissible>
          <Alert.Heading>An error has occured :(</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
      {
        /* {!isLoading && words.map(word => <p>{word.number}</p>)} */
        <Table
          className="center-container-list"
          striped="true"
          bordered="true"
          hover="true"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Word</th>
              <th>Definition</th>
              <th>Level</th>
              <th>Next Review</th>
            </tr>
          </thead>
          <tbody>
            {words.map(word => (
              <WordColumn
                key={word.number}
                number={word.number}
                word={word.word}
                definition={word.definition}
                level={word.level}
                nextDate={getReviewDays(word.nextDate)}
              />
            ))}
          </tbody>
        </Table>
      }
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

export default WordList;
