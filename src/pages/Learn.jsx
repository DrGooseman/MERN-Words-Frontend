import React, { useContext, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../auth-context";

import ProgressCard from "../components/ProgressCard";
import LearnCard from "../components/LearnCard";

const soundCorrect = new Audio("/SoundCorrect.wav");
const soundIncorrect = new Audio("SoundIncorrect.wav");
const soundWin = new Audio("SoundWin.wav");

function Learn(props) {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState();
  const [currentOptions, setCurrentOptions] = useState();
  const [isDone, setIsDone] = useState(false);
  const [answerState, setAnswerState] = useState(0);
  const [isSentence, setIsSentence] = useState(false);
  //const [wordLevels, setWords] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (words.length > 0 && !answerState) {
      getQuestion();
    }
  }, [words]);

  async function getData() {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL +
          "/users/words/8&" +
          props.match.params.Category,
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Authorization: auth.token
        }
      );
      const newWords = responseData.words.map(word => ({ ...word, wins: 0 }));

      setWords(newWords);

      // getQuestion();
    } catch (err) {}
  }

  function getQuestion() {
    const options = [];
    const rightOption = getNextWord();

    if (rightOption.wins > 0 && rightOption.sentence) setIsSentence(true);
    else setIsSentence(false);

    rightOption.isCorrect = true;
    options.push(rightOption);
    fillRandomOptions(options);
    shuffleArray(options);

    setCurrentWord(rightOption);
    setCurrentOptions(options);
  }

  function getNextWord() {
    let i = Math.floor(Math.random() * words.length);
    let count = 0;

    let currentWordNum = -1;
    if (currentWord) currentWordNum = currentWord.number;

    while (count < words.length) {
      if (words[i].wins < 3 && words[i].number !== currentWordNum)
        return words[i];
      count++;
      i++;
      if (i === words.length) i = 0;
    }

    count = 0;
    while (count < words.length) {
      if (words[i].wins < 3) return words[i];
      count++;
      i++;
      if (i === words.length) i = 0;
    }

    finishRound();
  }

  function fillRandomOptions(array) {
    let count = 0;
    while (count < 30) {
      let randomWord = words[Math.floor(Math.random() * words.length)];

      if (!array.some(word => word.number === randomWord.number)) {
        randomWord.isCorrect = false;

        array.push(randomWord);
        if (array.length === 4) return;
      }
      count++;
    }
  }

  function shuffleArray(array) {
    for (let i = 0; i < array.length; i++) {
      const elem = array[i];
      const newIndex = Math.floor(Math.random() * array.length);
      array[i] = array[newIndex];
      array[newIndex] = elem;
      // const elem = { ...array[i] };
      // const newIndex = Math.floor(Math.random() * array.length);
      // array[i] = { ...array[newIndex] };
      // array[newIndex] = elem;
    }
  }

  function handleAnswer(answeredWord) {
    if (answerState !== 0) return;
    let newWords;
    if (answeredWord.isCorrect) {
      newWords = words.map(word => {
        if (word.number === answeredWord.number) {
          word.wins++;
          setAnswerState(1);
          if (word.wins === 3) {
            word.level++;
            if (word.level > 4) word.level = 4;
            updateWord(word);
          }
          playSound(0);
        }
        return word;
      });
    } else {
      playSound(1);
      newWords = words.map(word => {
        if (word.number === currentWord.number) {
          word.wins = 0;
          word.level = 0;
          setAnswerState(2);
          updateWord(word);
        }
        return word;
      });
    }
    setWords(newWords);

    //check if done
    getNextWord();
  }

  function handleNext() {
    if (isDone) {
      window.location.reload();
      return;
    }
    setAnswerState(0);
    //check if done
    getQuestion();
  }

  function finishRound() {
    setIsDone(true);
    playSound(2);
  }

  async function updateWord(word) {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/words/word/" + word.number,
        "PATCH",
        JSON.stringify({ level: word.level }),
        {
          "Content-Type": "application/json",
          Authorization: auth.token
        }
      );
    } catch (err) {}
  }

  function playSound(soundNum) {
    // if (audio.isPlaying())
    if (soundNum === 0) soundCorrect.play();
    else if (soundNum === 1) soundIncorrect.play();
    else if (soundNum === 2) {
      soundCorrect.pause();
      soundWin.play();
    }
  }

  return (
    <React.Fragment>
      {error && (
        <Alert variant="danger" onClose={clearError} dismissible>
          <Alert.Heading>An error has occured :(</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}{" "}
      {isDone && (
        <Alert variant="success" onClose={clearError} dismissible>
          <Alert.Heading>You completed the round! Great job!</Alert.Heading>
        </Alert>
      )}
      {currentWord && (
        <div className="dashboard-items ">
          {words.map(word => (
            <ProgressCard key={word.number} wins={word.wins} />
          ))}
        </div>
      )}
      {answerState !== 0 && (
        <div className="answered-message">
          {answerState === 1 && (
            <Alert variant="success">
              <Row>
                <Col>
                  <Alert.Heading>Correct!</Alert.Heading>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button onClick={handleNext}>Next</Button>
                </Col>
              </Row>
            </Alert>
          )}
          {answerState === 2 && (
            <Alert variant="danger" onClose={clearError}>
              <Row>
                <Col>
                  <Alert.Heading>Incorrect :(</Alert.Heading>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button onClick={handleNext}>Next</Button>
                </Col>
              </Row>
            </Alert>
          )}
        </div>
      )}
      {currentWord && (
        // <div className="learn-card">
        <LearnCard
          word={currentWord.word}
          sentence={currentWord.sentence}
          translatedSentence={currentWord.translatedSentence}
          options={currentOptions}
          definition={currentWord.definition}
          handleAnswer={handleAnswer}
          isAnswered={answerState !== 0}
          isSentence={isSentence}
        />
        // </div>
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

export default Learn;
