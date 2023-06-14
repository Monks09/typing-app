import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePromptThunkActionCreator } from "../redux/action";

function TypingBox(props) {
  const [keysPressed, setKeysPressed] = useState(0);
  const [error, setError] = useState(false);
  const [typos, setTypos] = useState(0);

  const prompt = useSelector((store) => {
    return store.current_prompt;
  });

  const timerValue = useSelector((store) => {
    return store.timer_value;
  });

  const dispatch = useDispatch();

  const checkInput = (e) => {
    setKeysPressed(keysPressed + 1);
    const input = e.target.value;

    if (input !== prompt.substr(0, input.length)) {
      setTypos(typos + 1);
      setError(true);
    }

    if (input === prompt.substr(0, input.length)) {
      setError(false);
    }

    // if input matches completely with prompt then calculate score and generate new prompt
    if (input === prompt) {
      dispatch({
        type: "UPDATE_SCORE",
        payload: {
          keysPressed,
          typos,
        },
      });

      dispatch(generatePromptThunkActionCreator());
      // resetting the values
      e.target.value = "";
      setKeysPressed(0);
      setTypos(0);
    }
  };

  return (
    <div className="typing-box">
      <input
        type="text"
        name="user-text"
        id="user-text"
        onChange={checkInput}
        style={{ backgroundColor: error ? "pink" : "white" }}
        placeholder={
          timerValue === 0
            ? "You can type once you click start"
            : "Type given prompt here..."
        }
        disabled={timerValue === 0}
      />
    </div>
  );
}

export default TypingBox;