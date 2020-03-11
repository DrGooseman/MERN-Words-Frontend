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
  const [currentWordList, setCurrentWordList] = useState([]);

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
      // let test = [];
      // for (let i = 0; i < 1195; i++) test.push(responseData.words[i]);
      setWords(responseData.words);
      setWordList(responseData.words, "Top");
    } catch (err) {}
  }

  function setWordList(words, category) {
    let newArray = [];
    console.log(category + " " + words.length);
    console.log(words[1111]);
    if (category === "Top") {
      for (let i = 0; i < 1000; i++) newArray.push(words[i]);
    } else newArray = words.filter(word => word.categories.includes(category));
    //console.log(words.filter(word => word.category === category));
    setCurrentWordList(newArray);
  }

  return (
    <React.Fragment>
      {error && (
        <Alert variant="danger" onClose={clearError} dismissible>
          <Alert.Heading>An error has occured :(</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
      <div className="center-container-list-buttons">
        <Nav fill variant="tabs" defaultActiveKey="Top">
          <Nav.Item>
            <Nav.Link
              eventKey="Top"
              onClick={() => {
                setWordList(words, "Top");
              }}
            >
              Top 1000
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="Food"
              onClick={() => {
                setWordList(words, "Food");
              }}
            >
              Food
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="Useful"
              onClick={() => {
                setWordList(words, "Useful");
              }}
            >
              Useful
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="Curse"
              onClick={() => {
                setWordList(words, "Curse");
              }}
            >
              Curses
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {/* <Button variant="secondary">Top 1000</Button>
        <Button variant="secondary">Food</Button>
        <Button variant="secondary">Useful</Button> */}
      </div>

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
            <th>Translation</th>
            <th>Level</th>
            <th>Next Review</th>
          </tr>
        </thead>

        <tbody>
          {currentWordList.length > 0 &&
            currentWordList.map(word => (
              <WordColumn
                key={word.number}
                number={word.number}
                word={word.word}
                definition={word.definition}
                level={word.level}
                nextDate={word.nextDate}
              />
            ))}
        </tbody>
      </Table>
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
