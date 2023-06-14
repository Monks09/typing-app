import React from "react";
import { useSelector } from "react-redux";

function Score(props) {
  let total_keys_pressed = useSelector((store) => {
    return store.total_keys_pressed;
  });
  let accuracy = useSelector((store) => {
    return store.accuracy;
  });
  let speed = useSelector((store) => {
    return store.speed;
  });
  return (
    <div className="score">
      <div>
        <h3>Speed (wpm)</h3>
        <h3>{speed}</h3>
      </div>
      <div>
        <h3>Total Keys Pressed</h3>
        <h3>{total_keys_pressed}</h3>
      </div>
      <div>
        <h3>Accuracy</h3>
        <h3>{accuracy} %</h3>
      </div>
    </div>
  );
}

export default Score;
