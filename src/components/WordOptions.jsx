import React from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Tooltip } from "react-bootstrap/";

function WordOptions(props) {
  return (
    <div className="word-options">
      <OverlayTrigger
        key="Master"
        placement="right"
        overlay={<Tooltip id={"Master"}>Master this word.</Tooltip>}
      >
        <Button
          onClick={() => props.handleMaster(props.number)}
          variant="outline-warning"
        >
          <i className="fas fa-trophy"></i>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        key="Flag"
        placement="right"
        overlay={<Tooltip id={"Flag"}>Flag this word as difficult.</Tooltip>}
      >
        <Button
          onClick={() => props.handleFlag(props.number)}
          variant={props.isFlagged ? "danger" : "outline-danger"}
        >
          <i className="fas fa-flag"></i>
        </Button>
      </OverlayTrigger>
    </div>
  );
}
export default WordOptions;
