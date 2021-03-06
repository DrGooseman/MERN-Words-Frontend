import React, { useState, useEffect } from "react";
import BCard from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import WordOptions from "./WordOptions";

function LearnCard(props) {
  //array that shows which button is clicked
  const [isClicked, setIsClicked] = useState([false, false, false, false]);

  function getHeader() {
    return <h1>{props.word.word}</h1>;
  }

  function getSentence() {
    const slice = props.sentence.match(
      new RegExp(` ${props.word.word}[ !.,]`, "i")
    )[0];

    const splits = props.sentence.split(
      new RegExp(` ${props.word.word}[ !.,]`, "i")
    );

    const splitMatch = slice.split(new RegExp(`${props.word.word}`, "i"));

    const keyWord = props.isAnswered ? props.word.word : "____";

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

  function getColor(optionNum) {
    if (!props.isAnswered) return "primary";
    let mod = !isClicked[optionNum] ? "outline-" : "";
    if (props.options[optionNum].isCorrect) return mod + "success";
    else return mod + "danger";
  }

  useEffect(() => {
    setIsClicked([false, false, false, false]);
  }, [props.options]);

  function handleClick(optionNum) {
    const newIsClicked = [...isClicked];
    newIsClicked[optionNum] = true;
    setIsClicked(newIsClicked);
    props.handleAnswer(props.options[optionNum]);
  }

  if (props.isSentence) {
    return (
      <BCard className="learn-card">
        <BCard.Header className="text-center  learn-card-header">
          <div className="learn-card-word">
            {getSentence()}
            <p>{props.translatedSentence}</p>
          </div>
          <WordOptions
            number={props.number}
            handleMaster={props.handleMaster}
            handleFlag={props.handleFlag}
            isFlagged={props.word.isFlagged}
          />
        </BCard.Header>

        <BCard.Body>
          <BCard.Title className="learn-card-body">
            <Button
              onClick={() => handleClick(0)}
              variant={getColor(0)}
              disabled={props.isAnswered && !isClicked[0]}
            >
              <h3>{props.options[0].word}</h3>
            </Button>
            <Button
              onClick={() => handleClick(1)}
              variant={getColor(1)}
              disabled={props.isAnswered && !isClicked[1]}
            >
              <h3>{props.options[1].word}</h3>
            </Button>
            <Button
              onClick={() => handleClick(2)}
              variant={getColor(2)}
              disabled={props.isAnswered && !isClicked[2]}
            >
              <h3>{props.options[2].word}</h3>
            </Button>
            <Button
              onClick={() => handleClick(3)}
              variant={getColor(3)}
              disabled={props.isAnswered && !isClicked[3]}
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
        <BCard.Header className="text-center learn-card-header">
          <div className="learn-card-word">{getHeader()}</div>
          <WordOptions
            number={props.number}
            handleMaster={props.handleMaster}
            handleFlag={props.handleFlag}
            isFlagged={props.word.isFlagged}
          />
        </BCard.Header>

        <BCard.Body>
          <BCard.Title className="learn-card-body">
            <Button
              onClick={() => handleClick(0)}
              variant={getColor(0)}
              disabled={props.isAnswered && !isClicked[0]}
            >
              <h3>{props.options[0].definition}</h3>
            </Button>
            <Button
              onClick={() => handleClick(1)}
              variant={getColor(1)}
              disabled={props.isAnswered && !isClicked[1]}
            >
              <h3>{props.options[1].definition}</h3>
            </Button>
            <Button
              onClick={() => handleClick(2)}
              variant={getColor(2)}
              disabled={props.isAnswered && !isClicked[2]}
            >
              <h3>{props.options[2].definition}</h3>
            </Button>
            <Button
              onClick={() => handleClick(3)}
              variant={getColor(3)}
              disabled={props.isAnswered && !isClicked[3]}
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
