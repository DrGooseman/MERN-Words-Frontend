import React from "react";
import BCard from "react-bootstrap/Card";

function Card(props) {
  return (
    <BCard className="dashboard-item center">
      <BCard.Header>{props.header}</BCard.Header>
      {props.bodyTitle !== undefined && (
        <BCard.Body>
          <BCard.Title>
            <h3>{props.bodyTitle}</h3>
          </BCard.Title>
        </BCard.Body>
      )}
    </BCard>
  );
}

export default Card;
