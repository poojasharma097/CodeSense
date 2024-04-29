import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSpeechSynthesis, useSpeechRecognition } from "react-speech-kit";
import "./Quiz.scss";
import questions from "./questions.js";

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const detected = location?.state?.detected;

  const [questionSet, setQuestionSet] = useState([]);

  const getRandomQuestions = () => {
    const allQuestions = questions.questions;
    const randomQuestions = [];

    // Shuffle questions array
    allQuestions.sort(() => Math.random() - 0.5);

    // Select first 5 questions
    for (let i = 0; i < 5; i++) {
      randomQuestions.push(allQuestions[i]);
    }

    return randomQuestions;
  };

  useEffect(() => {
    const randomQuestions = getRandomQuestions();
    setQuestionSet(randomQuestions);
  }, []);

  const [question, setQuestion] = useState(0);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const { speak, speaking, cancel } = useSpeechSynthesis();

  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      console.log(result);
      setValue(result);
    },
  });

  const selectAnswer = async (i) => {
    let arr = [...selected];
    let option = questionSet[question].options[i];

    arr[question] = option;

    if (option === questionSet[question].answer) setScore(score + 1);

    await speak({ text: "Selected " + option, queue: false });
    setSelected(arr);
  };

  const startListening = async () => {
    await speak({ text: "We are listening to you", queue: false });
    await readQuestionAndOptions();
    await speak({ text: "Please select an option", queue: false });
    listen();
  };

  const readQuestionAndOptions = async () => {
    await speak({ text: "current question: ", queue: true });
    await speak({ text: questionSet[question].question, queue: true });
    return;
  };

  useEffect(() => {
    switch (value) {
      case "read question":
        speak({ text: questionSet[question].question, queue: false });
        break;

      case "read options":
        for (let i = 0; i < questionSet[question].options.length; i++) {
          speak({ text: questionSet[question].options[i], queue: true });
        }
        break;

      case "next question":
        changeQuestion("next");
        break;

      case "previous question":
        changeQuestion("prev");
        break;

      case "read option 1":
      case "read option one":
        speak({ text: questionSet[question].options[0], queue: false });
        break;

      case "read option 2":
      case "read option two":
        speak({ text: questionSet[question].options[1], queue: false });
        break;

      case "read option 3":
      case "read option three":
        speak({ text: questionSet[question].options[2], queue: false });
        break;

      case "read option 4":
      case "read option four":
        speak({ text: questionSet[question].options[3], queue: false });
        break;

      case "select option 1":
      case "select option one":
        selectAnswer(0);
        break;

      case "select option 2":
      case "select option two":
        selectAnswer(1);
        break;

      case "select option 3":
      case "select option three":
        selectAnswer(2);
        break;

      case "select option 4":
      case "select option four":
        selectAnswer(3);
        break;

      case "read selected option":
        const option = selected[question];
        speak({
          text: option !== "" ? option : "No option selected",
          queue: false,
        });
        break;

      case "read all selected options":
        for (let i = 0; i < selected.length; i++) {
          const option = selected[i];
          speak({
            text: "Question: " + questionSet[i].question,
            queue: true,
          });
          speak({
            text:
              option !== ""
                ? "Option selected: " + option
                : "No option selected",
            queue: true,
          });
        }
        break;

      case "stop":
        stop();
        speak({ text: "Stopped", queue: false });
        break;

      default:
        break;
    }
  }, [value]);

  useEffect(() => {
    readQuestionAndOptions();
  }, [question]);

  const changeQuestion = (where) => {
    if (where === "next" && question < questionSet.length - 1) {
      setQuestion(question + 1);
    } else if (where === "prev" && question > 0) {
      setQuestion(question - 1);
    } else if (where === "next" && question === questionSet.length - 1) {
      stop();
      speak({
        text: `You have completed the quiz, your score is ${score}`,
        queue: false,
      });
      navigate("/assessment/quiz", { state: { score } });
    }
  };

  return (
    <div className="Quiz">
      <h1>Quiz</h1>
      <div className="question-section">
        <p className="question">
          {" "}
          {questionSet[question] && questionSet[question].question}
        </p>
        <div className="options">
          {questionSet[question] &&
            questionSet[question].options &&
            questionSet[question].options.map((option, i) => {
              return (
                <button
                  className={`option ${
                    selected[question] === option ? "selected" : ""
                  }`}
                  key={i}
                  onClick={() => {
                    selectAnswer(i);
                  }}
                >
                  {option}
                </button>
              );
            })}
        </div>
      </div>
      <div className="bottom-buttons">
        <div
          onClick={() => {
            changeQuestion("prev");
          }}
          className="bottom-button"
        >
          Prev Q
        </div>
        <div
          onClick={() => {
            startListening();
          }}
          className="bottom-button voice"
        >
          Start Voice Recognition
        </div>
        <div
          onClick={() => {
            changeQuestion("next");
          }}
          className="bottom-button"
        >
          Next Q{" "}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
