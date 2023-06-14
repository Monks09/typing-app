import React, { useEffect, useState } from "react";

function Timer(props) {
  const [timerValue, setTimerValue] = useState(0);
  const [timerId, setTimerId] = useState();

  useEffect(() => {
    startTimer();
  }, []);

  function startTimer() {
    let id = setInterval(() => {
      setTimerValue((prev) => prev + 1);
    }, 1000);

    setTimerId(id);
  }

  function stopTimer() {
    clearInterval(timerId);
  }

  //   converting timerValue to minutes and seconds
  let minutes = Math.floor(timerValue / 60);
  let seconds = timerValue % 60;

  //   stopping the timer when it reaches 5 minutes
  if (seconds === 30) {
    stopTimer();
  }

  return (
    <div className="timer">
      <span>{`${minutes} : ${seconds}`}</span>
    </div>
  );
}

export default Timer;
