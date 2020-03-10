import React from "react";

function WordColumn(props) {
  function getReviewDays(date) {
    if (new Date(date) < new Date())
      return <p style={{ color: "green" }}>Ready to review!</p>;

    let time = (new Date(date) - new Date()) / 1000 / 60 / 60;
    if (time < 24) return Math.ceil(time) + " hours";
    else return Math.ceil(time) / 24 + " days";
  }

  return (
    <tr>
      <td>{props.number}</td>
      <td>{props.word}</td>
      <td>{props.definition}</td>
      <td>{props.level}</td>
      <td>{getReviewDays(props.nextDate)}</td>
    </tr>
  );
}

export default WordColumn;
