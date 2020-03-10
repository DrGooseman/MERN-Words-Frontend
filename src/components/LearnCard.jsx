import React from "react";
import BCard from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function LearnCard(props) {
  function getHeader() {
    return <h1>{props.word}</h1>;
  }

  function getSentence() {
    const slice = props.sentence.match(
      new RegExp(` ${props.word}[ !.,]`, "i")
    )[0];
    console.log(slice);
    const splits = props.sentence.split(
      new RegExp(` ${props.word}[ !.,]`, "i")
    );
    console.log(props.sentence);
    console.log(splits[0] + "." + splits[1]);

    const splitMatch = slice.split(props.word);

    const keyWord = props.isAnswered ? props.word : "____";

    return (
      <h1>
        {splits[0]}
        {splitMatch[0]}
        <u>{keyWord}</u>
        {splitMatch[1]}
        {splits[1]}
      </h1>
    );
  }

  function getColor(isCorrect) {
    if (!props.isAnswered) return "primary";
    else if (isCorrect) return "outline-success";
    else return "outline-danger";
  }
  if (props.isSentence) {
    return (
      <BCard className="learn-card">
        <BCard.Header className="text-center">
          {getSentence()}
          <p>{props.translatedSentence}</p>
        </BCard.Header>

        <BCard.Body>
          <BCard.Title className="learn-card-body">
            <Button
              onClick={() => props.handleAnswer(props.options[0])}
              variant={getColor(props.options[0].isCorrect)}
            >
              <h3>{props.options[0].word}</h3>
            </Button>
            <Button
              onClick={() => props.handleAnswer(props.options[1])}
              variant={getColor(props.options[1].isCorrect)}
            >
              <h3>{props.options[1].word}</h3>
            </Button>
            <Button
              onClick={() => props.handleAnswer(props.options[2])}
              variant={getColor(props.options[2].isCorrect)}
            >
              <h3>{props.options[2].word}</h3>
            </Button>
            <Button
              onClick={() => props.handleAnswer(props.options[3])}
              variant={getColor(props.options[3].isCorrect)}
            >
              <h3>{props.options[3].word}</h3>
            </Button>
          </BCard.Title>
        </BCard.Body>
      </BCard>
    );
  } else {
    return (
      <BCard className="learn-card">
        <BCard.Header className="text-center">{getHeader()}</BCard.Header>

        <BCard.Body>
          <BCard.Title className="learn-card-body">
            <Button
              onClick={() => props.handleAnswer(props.options[0])}
              variant={getColor(props.options[0].isCorrect)}
            >
              <h3>{props.options[0].definition}</h3>
            </Button>
            <Button
              onClick={() => props.handleAnswer(props.options[1])}
              variant={getColor(props.options[1].isCorrect)}
            >
              <h3>{props.options[1].definition}</h3>
            </Button>
            <Button
              onClick={() => props.handleAnswer(props.options[2])}
              variant={getColor(props.options[2].isCorrect)}
            >
              <h3>{props.options[2].definition}</h3>
            </Button>
            <Button
              onClick={() => props.handleAnswer(props.options[3])}
              variant={getColor(props.options[3].isCorrect)}
            >
              <h3>{props.options[3].definition}</h3>
            </Button>
          </BCard.Title>
        </BCard.Body>
      </BCard>
    );
  }
}

export default LearnCard;
