import React from "react";

function WordColumn(props) {
  return (
    <tr>
      <td>{props.number}</td>
      <td>{props.word}</td>
      <td>{props.definition}</td>
      <td>{props.level}</td>
      <td>{props.nextDate}</td>
    </tr>
  );
}

export default WordColumn;
