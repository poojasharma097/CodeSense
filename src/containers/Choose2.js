import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSpeechSynthesis, useSpeechRecognition } from "react-speech-kit";
import "./Choose.scss";

const Choose2 = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [introSpoken, setIntroSpoken] = useState(false);
  const { speak } = useSpeechSynthesis();
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      console.log(result);
      setValue(result);
    },
  });

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
      startListening();
    }
    else if (event.key === 'l') {
      console.log(`Key pressed: ${event.key}`);
      setValue("A");
    }
    else if (event.key === 'b') {
      console.log(`Key pressed: ${event.key}`);
      setValue("B");
    }
    else if (event.key === 'r') {
      console.log(`Key pressed: ${event.key}`);
      setValue("R");
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

  const startListening = () => {
    speak({ text: "Choose the Algorithm you want to Visualize. You can choose Linear Search, Binary search, or say Read for reading Documentation.", queue: false });
    setIntroSpoken(true);
  };

  useEffect(() => {
    if (!introSpoken) {
      startListening();
    } else {
      listen();
    }
  }, [introSpoken]);

  useEffect(() => {
    if (value) {
      if (value.toLowerCase() === "a" || value.toLowerCase() === "linear search") {
        speak({ text: "You have chosen Linear Search", queue: false });
        stop();
        navigate("/CodeSense/Linear-Search");
      } else if (value.toLowerCase() === "b" || value.toLowerCase() === "binary search") {
        speak({ text: "You have chosen Binary Search", queue: false });
        stop();
        navigate("/CodeSense/Binary-Search");
      } else if (value.toLowerCase() === "read" || value.toLowerCase() === "r") {
        speak({ text: "You have chosen to read documentation", queue: false });
        stop();
        navigate("/CodeSense/Documentation");
      } else {
        // If the input doesn't match any options, continue listening
        listen();
      }
    }
  }, [value]);

  return (
    <div className="Choose">
      <h3>Choose the Algorithm you want to Visualize</h3>
      <div>
        <button onClick={() => setValue("A")}>Linear Search</button>
        <button onClick={() => setValue("B")}>Binary Search</button>
      </div>
      <h3>OR</h3>
      <button className="read" onClick={() => setValue("Read")}>
        Read Documentation
      </button>
      <br></br>
      <button onClick={startListening} className="voice">
      <img src={require("../assets/microphone2.png")} alt="Voice Recognition" style={{ marginLeft: '5px', verticalAlign: 'middle',width: '40px' }}/>
      <span> Start Voice Recognition </span>
      <img src={require("../assets/microphone2.png")} alt="Voice Recognition" style={{ marginLeft: '5px', verticalAlign: 'middle',width: '40px' }}/>
      </button>
    </div>
  );
};

export default Choose2;
