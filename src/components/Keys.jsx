import React from "react";
import { useSelector } from "react-redux";

function Keys(props) {
  const currentPrompt = useSelector((store) => {
    return store.current_prompt;
  });

  const activeIndex = useSelector((store) => {
    return store.active_index;
  });

  return (
    <div className="keys">
      <div className={currentPrompt[activeIndex] === "a" ? "active" : ""}>
        a
      </div>
      <div className={currentPrompt[activeIndex] === "s" ? "active" : ""}>
        s
      </div>
      <div className={currentPrompt[activeIndex] === "d" ? "active" : ""}>
        d
      </div>
      <div className={currentPrompt[activeIndex] === "f" ? "active" : ""}>
        f
      </div>
      <div className={currentPrompt[activeIndex] === "j" ? "active" : ""}>
        j
      </div>
      <div className={currentPrompt[activeIndex] === "k" ? "active" : ""}>
        k
      </div>
      <div className={currentPrompt[activeIndex] === "l" ? "active" : ""}>
        l
      </div>
      <div className={currentPrompt[activeIndex] === ";" ? "active" : ""}>
        ;
      </div>
      <div className={currentPrompt[activeIndex] === " " ? "active" : ""}>
        space
      </div>
    </div>
  );
}

export default Keys;
