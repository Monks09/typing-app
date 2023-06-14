import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePromptThunkActionCreator } from "../redux/action";

function PromptBox(props) {
  const currentPrompt = useSelector((store) => {
    return store.current_prompt;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generatePromptThunkActionCreator());
  }, []);

  return (
    <div className="prompt-box">
      <p>{currentPrompt}</p>
    </div>
  );
}

export default PromptBox;
