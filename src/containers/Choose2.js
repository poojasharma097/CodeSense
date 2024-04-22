import React, { useState, useEffect } from "react";
import "./Choose.scss";
import { Link } from "react-router-dom";
import { useSpeechSynthesis, useSpeechRecognition } from "react-speech-kit";
import { useNavigate } from "react-router-dom";

const Choose2 = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const { speak, speaking, cancel } = useSpeechSynthesis();
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      console.log(result);
      setValue(result);
    },
  });

  useEffect(() => {
    if (value === "Linear Search") {
      speak({ text: "You have chosen Linear Search", queue: false });
      stop();
      navigate("/assessment/Linear-search");
    } else if (
      value === "Binary Search") {
      speak({ text: "You have chosen Binary Search", queue: false });
      stop();
      navigate("/assessment/Binary-Search");
    }
  }, [value]);

  return (
    <div className="Choose">
      <h3>Choose the Algorithm you want to Visualize</h3>
      <div>
        <button
          onClick={() => {
            speak({ text: "You have chosen Linear Search", queue: false });
            stop();
            navigate("/CodeSense/Linear-Search");
          }}
        >
          Linear Search
        </button>
        <button
          onClick={() => {
            speak({ text: "You have chosen Binary Search", queue: false });
            stop();
            navigate("/CodeSense/Binary-Search");
          }}
        >
          Binary Search
        </button>
      </div>
      <button
        className="voice-button"
        onClick={() => {
          speak({
            text: "Choose Linear Search or Binary Search",
            queue: false,
          });
          listen();
        }}
      >
        Start voice recognition
      </button>
    </div>
  );
};

export default Choose2;
