import React from "react";
import { useHistory } from "react-router-dom";

function WordColumn(props) {
  const history = useHistory();

  function getReviewDays() {
    if (new Date(props.nextDate) < new Date()) {
      if (props.level === 0)
        return <p style={{ color: "green" }}>Ready to learn!</p>;
      else return <p style={{ color: "green" }}>Ready to review!</p>;
    }

    let time = (new Date(props.nextDate) - new Date()) / 1000 / 60 / 60;
    if (time < 24) return Math.ceil(time) + " hour" + (time <= 1 ? "" : "s");
    else return Math.ceil(time / 24) + " day" + (time <= 24 ? "" : "s");
  }

  function getLevel() {
    if (props.level === 4)
      return <p style={{ color: "orange" }}>{props.level}</p>;
    else return props.level;
  }

  return (
    <tr onClick={() => history.push("/word/" + props.number)}>
      <td>{props.number}</td>
      <td>{props.word}</td>
      <td>{props.definition}</td>
      <td>{getLevel()}</td>
      <td>{getReviewDays()}</td>
    </tr>
  );
}

export default WordColumn;
