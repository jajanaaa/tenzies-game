import React from "react";

function Dice(props) {
  return (
    <div
      className={`Dice ${props.isHeld ? "green" : null}`}
      onClick={props.holdDice}
    >
      {props.value}
    </div>
  );
}

export default Dice;
