import React, { useContext, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";

import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../auth-context";

import Card from "../components/Card";

function Dashboard() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  const [wordInfo, setWordInfo] = useState({
    readyToLearn: 0,
    readyToReview: 0,
    learned: 0,
    mastered: 0,
    words: 0,
    flaggedAsDifficult: 0
  });

  useEffect(() => {
    getData();
  }, [auth.lang]);

  async function getData() {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/words/info",
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Authorization: auth.token
        }
      );
      //console.log(responseData.wordInfo);
      setWordInfo(responseData.wordInfo);
    } catch (err) {}
  }

  function getPercentage(num) {
    return num / 10;
  }

  return (
    <React.Fragment>
      {error && (
        <Alert variant="danger" onClose={clearError} dismissible>
          <Alert.Heading>An error has occured :(</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
      <ProgressBar>
        <ProgressBar
          striped
          variant="warning"
          now={getPercentage(wordInfo.mastered)}
          key={1}
        />
        <ProgressBar
          variant="success"
          now={getPercentage(wordInfo.learned)}
          key={2}
        />
      </ProgressBar>
      {!isLoading && (
        <div className="dashboard-items ">
          <Card header={"Ready to learn"} bodyTitle={wordInfo.readyToLearn} />
          <Card
            header={"Ready for review"}
            bodyTitle={wordInfo.readyToReview}
          />
          <Card header={"Words Learned"} bodyTitle={wordInfo.learned} />
          <Card header={"Words Mastered"} bodyTitle={wordInfo.mastered} />
        </div>
      )}
      {!isLoading && (
        <div className="dashboard-items ">
          <Button
            className="dashboard-learn-button"
            onClick={() => history.push("/learn/Top")}
          >
            Top 1000 Words
          </Button>
          <Button
            className="dashboard-learn-button"
            onClick={() => history.push("/learn/Food")}
          >
            Food
          </Button>
          <Button
            className="dashboard-learn-button-small-text"
            onClick={() => history.push("/learn/Useful")}
          >
            Useful Words and Phrases
          </Button>

          <Button
            className="dashboard-learn-button-small-text"
            onClick={() => history.push("/learn/Curse")}
          >
            Curse Words and Insults
          </Button>
          <Button
            className="dashboard-learn-button-small-text"
            onClick={() => history.push("/learn/Flagged")}
            disabled={!wordInfo.flaggedAsDifficult}
          >
            Flagged as Difficult
          </Button>
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

export default Dashboard;
