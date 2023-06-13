import React from "react";

function Score(props) {
  return (
    <div className="score">
      <div>
        <h3>WPM</h3>
        <h3>0</h3>
      </div>
      <div>
        <h3>Keys Pressed</h3>
        <h3>0</h3>
      </div>
      <div>
        <h3>Accuracy %</h3>
        <h3>0</h3>
      </div>
    </div>
  );
}

export default Score;
