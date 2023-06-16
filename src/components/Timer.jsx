import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Heading,
} from "@chakra-ui/react";
import { generatePromptThunkActionCreator } from "../redux/action";
import { Howl, Howler } from "howler";
import startSound from "../sounds/start.wav";
import endSound from "../sounds/end.wav";

function Timer(props) {
  const [timerId, setTimerId] = useState();
  const [timer, setTimer] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  let timerValue = useSelector((store) => {
    return store.timer_value;
  });

  let total_keys_pressed = useSelector((store) => {
    return store.total_keys_pressed;
  });

  let total_typos = useSelector((store) => {
    return store.total_typos;
  });

  let total_words_count = useSelector((store) => {
    return store.total_words_count;
  });

  let focusTypingBox = useSelector((store) => {
    return store.focusTypingBox;
  });

  const dispatch = useDispatch();

  dispatch({
    type: "UPDATE_TIMER",
    payload: timer,
  });

  const soundObj1 = {
    sound: startSound,
    label: "startSound",
  };

  const soundObj2 = {
    sound: endSound,
    label: "endSound",
  };

  let soundPlay = (src) => {
    const sound = new Howl({
      src,
      volume: 0.5,
    });
    sound.play();
  };

  async function startGame() {
    // generating the prompt for the first time
    await dispatch(generatePromptThunkActionCreator());

    // setting the active index as 0
    dispatch({
      type: "SET_ACTIVE_INDEX",
      payload: 0,
    });

    let id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    setTimerId(id);
    focusTypingBox();
    soundPlay(soundObj1.sound);
  }

  function endGame() {
    clearInterval(timerId);
    setTimerId(undefined);
    soundPlay(soundObj2.sound);
    onOpen();
    dispatch({
      type: "END_GAME",
    });
  }

  function resetGame() {
    clearInterval(timerId);
    setTimerId(undefined);
    setTimer(0);

    dispatch({
      type: "RESET_SCORE",
    });
  }

  function getOverallAccuracy() {
    if (total_keys_pressed === 0) {
      return 0;
    }

    let correctKeys = total_keys_pressed - total_typos;

    let accuracy = Math.round((correctKeys / total_keys_pressed) * 100);

    return accuracy;
  }

  function getAverageSpeed() {
    if (timerValue === 0) {
      return 0;
    }

    let minutes = timerValue / 60;

    let speed = Math.round(total_words_count / minutes);

    return speed;
  }

  //   converting timerValue to minutes and seconds
  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;

  //   stopping the timer when it reaches 5 minutes
  if (minutes === 5) {
    endGame();
  }

  return (
    <div className="timer-comp">
      <div className="timer-box">
        <div className="timer">
          <span>{`${minutes} : ${seconds}`}</span>
        </div>
        <div className="timer-buttons">
          <Button
            bgColor={"teal"}
            color={"white"}
            onClick={!timerId ? startGame : endGame}
          >
            {!timerId ? "Start" : "End"}
          </Button>
          <Button bgColor={"teal"} color={"white"} onClick={resetGame}>
            Reset Score
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={"black"} bgColor={"teal.500"}>
          <ModalHeader>
            <Heading color={"maroon"} textAlign={"center"}>
              Final Score
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="modal-content">
              <div>
                <p style={{ color: "maroon", textDecoration: "underline" }}>
                  Average Speed
                </p>
                <p>{getAverageSpeed()} wpm</p>
              </div>
              <div>
                <p style={{ color: "maroon", textDecoration: "underline" }}>
                  Overall Accuracy
                </p>
                <p>{getOverallAccuracy()} %</p>
              </div>
              <div>
                <p style={{ color: "maroon", textDecoration: "underline" }}>
                  Total Keys Pressed
                </p>
                <p>{total_keys_pressed}</p>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Timer;
