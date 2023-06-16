import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePromptThunkActionCreator } from "../redux/action";

function PromptBox(props) {
  const currentPrompt = useSelector((store) => {
    return store.current_prompt;
  });

  const userText = useSelector((store) => {
    return store.user_text;
  });

  const dispatch = useDispatch();

  const compare = () => {
    let activeIndex = -1;

    if (userText === "") {
      activeIndex = 0;
    } else {
      let i = 0;
      while (i < userText.length) {
        if (userText[i] !== currentPrompt[i]) {
          activeIndex = i;
          break;
        }
        i++;
      }

      if (i === userText.length) {
        activeIndex = i;
      }

      return activeIndex;
    }
  };

  // updating the active index
  let index = compare();
  dispatch({
    type: "SET_ACTIVE_INDEX",
    payload: index,
  });

  return (
    <div className="prompt-box">
      <p
        className="prompt-text"
        style={{ color: currentPrompt === "Hi Buddy!" ? "white" : "black" }}
      >
        {currentPrompt}
      </p>
    </div>
  );
}

export default PromptBox;
