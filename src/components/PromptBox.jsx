import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function PromptBox(props) {
  const currentPrompt = useSelector((store) => {
    return store.current_prompt;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    let prompt = createPrompt();
    dispatch({
      type: "SET_CURRENT_PROMPT",
      payload: prompt,
    });
  }, []);

  let createPrompt = () => {
    const chars = ["a", "s", "d", "f", "j", "k", "l", ";"];

    let prompt = "";

    for (let i = 0; i < 5; i++) {
      let word = "";
      for (let j = 0; j < 4; j++) {
        let x = Math.floor(Math.random() * 8);
        word = word + chars[x];
      }

      prompt = prompt + word + " ";
      prompt.trim();
    }

    return prompt;
  };

  return (
    <div className="prompt-box">
      <p>{currentPrompt}</p>
    </div>
  );
}

export default PromptBox;
