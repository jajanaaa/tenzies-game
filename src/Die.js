import React from "react";

function Die(props) {
  return (
    <div className={`Die ${props.isHeld ? "green" : null}`}>{props.value}</div>
  );
}

export default Die;
