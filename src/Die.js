import React from "react";

function Die(props) {
  return (
    <div
      className={`Die ${props.isHeld ? "green" : null}`}
      onClick={props.holdDice}
    >
      {props.value}
    </div>
  );
}

export default Die;
