import React, { useContext, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import BCard from "react-bootstrap/Card";

import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import Card from "../components/Card";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../auth-context";

function WordInfo(props) {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [word, setWord] = useState();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL +
          "/users/words/info/" +
          props.match.params.WordNum,
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Authorization: auth.token
        }
      );
      setWord(responseData.word);
    } catch (err) {}
  }

  function getReviewDays() {
    if (new Date(word.nextDate) < new Date()) {
      if (word.level === 0)
        return <p style={{ color: "green" }}>Ready to learn!</p>;
      else return <p style={{ color: "green" }}>Ready to review!</p>;
    }

    let time = (new Date(word.nextDate) - new Date()) / 1000 / 60 / 60;
    if (time < 24) return Math.ceil(time) + " hour" + (time <= 1 ? "" : "s");
    else return Math.ceil(time / 24) + " day" + (time <= 24 ? "" : "s");
  }

  async function resetWord() {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/words/" + word.number,
        "PATCH",
        JSON.stringify({ level: 0 }),
        {
          "Content-Type": "application/json",
          Authorization: auth.token
        }
      );

      const updatedWord = { ...word, level: responseData.word.level };
      setWord(updatedWord);
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

      {word && (
        <div className="dashboard-items ">
          {/* <Card header={"Level"} bodyTitle={word.level} /> */}
          <BCard className="word-info-level">
            <BCard.Header>Level</BCard.Header>

            <BCard.Body>
              <BCard.Title className="word-info-level-body ">
                <h3 className="word-info-level-body-item">{word.level}</h3>
                <Button
                  variant="danger"
                  className="word-info-level-body-item-button"
                  onClick={resetWord}
                >
                  Reset
                </Button>
              </BCard.Title>
            </BCard.Body>
          </BCard>
          <Card header={"Next Review"} bodyTitle={getReviewDays()} />
        </div>
      )}

      {word && (
        <BCard className="word-info">
          <BCard.Header className="text-center">{word.word}</BCard.Header>

          <BCard.Body>
            <BCard.Title className="word-info-body">
              {word.definition}
            </BCard.Title>
          </BCard.Body>
        </BCard>
      )}
      <br />
      <h1 className="center">Examples:</h1>
      {word &&
        word.sentences.length > 0 &&
        word.sentences.map(sentence => (
          <div className="word-info-sentence">
            <h4>{sentence.sentence}</h4>
            <p>{sentence.translatedSentence}</p>
          </div>
        ))}
      {word && word.sentences.length === 0 && (
        <div className="word-info-sentence">
          <h4 className="center">
            We dont have any example sentences for this word :(
          </h4>
        </div>
      )}
      <div className="center-container-list"></div>
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

export default WordInfo;
