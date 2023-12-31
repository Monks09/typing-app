import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePromptThunkActionCreator } from "../redux/action";
import { Howl, Howler } from "howler";
import errorSound from "../sounds/error.wav";
import typingSound from "../sounds/keypress.wav";

function TypingBox(props) {
  const [keysPressed, setKeysPressed] = useState(0);
  const [error, setError] = useState(false);
  const [typos, setTypos] = useState(0);

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  const prompt = useSelector((store) => {
    return store.current_prompt;
  });

  const timerValue = useSelector((store) => {
    return store.timer_value;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_FOCUS_FUNCTION",
      payload: handleClick,
    });
  });

  const soundObj1 = {
    sound: errorSound,
    label: "errorSound",
  };

  const soundObj2 = {
    sound: typingSound,
    label: "typingSound",
  };

  let soundPlay = (src) => {
    const sound = new Howl({
      src,
      volume: 0.2,
    });
    sound.play();
  };

  const checkInput = (e) => {
    setKeysPressed(keysPressed + 1);
    const input = e.target.value;

    dispatch({
      type: "SET_USER_TEXT",
      payload: input,
    });

    if (input !== prompt.substr(0, input.length)) {
      setTypos(typos + 1);
      setError(true);
      soundPlay(soundObj1.sound);
    }

    if (input === prompt.substr(0, input.length)) {
      setError(false);
      soundPlay(soundObj2.sound);
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
        ref={inputRef}
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
        disabled={prompt === "Hi Buddy!"}
      />
    </div>
  );
}

export default TypingBox;
