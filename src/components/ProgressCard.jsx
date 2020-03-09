import React from "react";

function ProgressCard(props) {
  function getHeader() {
    if (props.wins === 0) return "";
    else if (props.wins === 1)
      return (
        <div className="center2">
          <i className="fas fa-check"></i>
        </div>
      );
    if (props.wins === 2)
      return (
        <div className="center2">
          <i className="fas fa-check"></i>
          <i className="fas fa-check"></i>
        </div>
      );
    if (props.wins === 3)
      return (
        <div className="center2">
          <i className="fas fa-check fa-2x" style={{ color: "green" }}></i>
        </div>
      );
  }

  return <div className="learn-Progress">{getHeader()}</div>;
}

export default ProgressCard;
