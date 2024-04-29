import "./Landing.scss";
import { useSpeechSynthesis, useSpeechRecognition } from "react-speech-kit";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  let navigate = useNavigate();

  const [value, setValue] = useState("");

  const { speak, speaking, cancel } = useSpeechSynthesis();

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'q') {
      console.log(`Key pressed: ${event.key}`);
      navigate("/assessment/quiz");
      stop();
    }
    else if (event.key === 'g') {
      console.log(`Key pressed: ${event.key}`);
      navigate("/assessment/board");
      stop();
    }
    else if (event.key === 'c') {
      console.log(`Key pressed: ${event.key}`);
      navigate("/CodeSense");
      stop();
    }
    else if (event.key === 'h') {
      console.log(`Key pressed: ${event.key}`);
      navigate("/");
      stop();
    }
    else if (event.key === 's') {
      console.log(`Key pressed: ${event.key}`);
      initListening();
    }
    else {
      speak({
        text: "Invalid key! Try again. ",
      });
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      console.log(result);
      setValue(result);
      switch (result) {
        case "detect object":
          result = "detect object";
          navigate("/assessment/object-detection");
          stop();
          break;
        case "give quiz":
          result = "give quiz";
          navigate("/assessment/quiz");
          stop();
          break;
        case "play game":
          result = "play game";
          navigate("/assessment/board");
          stop();
          break;
        case "stop":
          result = "stop";
          stop();
          break;
        default:
          // speak({
          //   text: "Give your command.",
          // });
          break;
      }
    },
  });

  const initListening = async () => {
    await speak({
      text: "Welcome to Beyond Braille, we are listening to you. Give your command.",
    });

    listen({ interimResults: true });
    listen();
  };

  return (
    <div className="Landing">
      <div className="Landing-container">
        <div className="left-container">
          <h1>Beyond Braille</h1>
          <h4>
            One stop solution to facilitate effortless learning for our sight
            impaired students. Enhancing a number of cognitive skills, Our
            technology includes teaching through unifying experiences.
          </h4>
          <button
            onClick={() => {
              initListening();
            }}
            className="Landing-button"
          >
            Give Command
          </button>
          <h6>like "give quiz" or "play game"</h6>
        </div>
        <div className="right-container">
          <img
            className="landing-img"
            src={require("../assets/landing.png")}
            alt="landing"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
