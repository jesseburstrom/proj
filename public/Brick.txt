import React from "react";

export default function Brick(props) {
  return (
    <div
      className={props.value !== 0 ? "brick-face" : "brick-face-empty"}
      onClick={props.moveBrick}
    >
      <h2 className="brick-num">{props.value ? props.value : ""}</h2>
    </div>
  );
}
