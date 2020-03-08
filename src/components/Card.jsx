import React from "react";
import BCard from "react-bootstrap/Card";

function Card(props) {
  return (
    <BCard className="dashboard-item">
      <BCard.Header>{props.header}</BCard.Header>
      <BCard.Body>
        <BCard.Title>{props.bodyTitle}</BCard.Title>
      </BCard.Body>
    </BCard>
  );
}

export default Card;
