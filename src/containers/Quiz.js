import { useEffect, useState, useCallback } from "react";
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
  const [finish, setFinish] = useState(false);
  const [reset, setReset] = useState(false);

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

      case "reset":
        setFinish(false);
        setReset(true);
        setScore(0);
        setQuestion(0);
        setSelected([]);
        break;

      case "play game":
        setFinish(false);
        setReset(true);
        setScore(0);
        setQuestion(0);
        setSelected([]);
        navigate("/assessment/board");
        stop();
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
    } else if (where === "next" && question === questions.length - 1) {
      setFinish(true);
      speak({
        text: `You have completed the quiz, your score is ${score}`,
        queue: false,
      });
      // navigate("/assessment/quiz", { state: { score } });
    }
  };

  // useEffect(async () => {
  //   setSelected([]);
  //   setScore(0);
  //   setFinish(false);
  //   setQuestion(0);
  //   setReset(false);
  // }, [reset, setReset, setFinish]);

  return (
    <div className="Quiz">
      <h1>Quiz</h1>
      <div className={`winner ${(finish === true) ? "" : "shrink"}`}>
        {/* Display the current winner */}
        <div className="winner-text">Well Done!</div>
        {(score !== 0 && score !=null && (finish === true)) && <div>Quiz Score: {score}</div>}

        {/* Button used to reset the board */}
        <button onClick={() => {
          setScore(0);
          setQuestion(0);
          setSelected([]);
          setReset(true);
          setFinish(false);
        }}>Reset Board</button>
      </div>
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
