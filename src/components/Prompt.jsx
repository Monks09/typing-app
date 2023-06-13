import React, { useEffect, useState } from "react";

function Prompt(props) {
  const [text, setText] = useState("");

  useEffect(() => {
    createPrompt();
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

    // console.log(prompt);

    setText(prompt);
  };

  return (
    <div className="prompt">
      <div className="prompt-box">
        <p>{text}</p>
      </div>
      <div className="user-box">
        <input type="text" name="user-text" id="user-text" />
      </div>
    </div>
  );
}

export default Prompt;
