import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../assets/data";


const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const optionArray = [option1, option2, option3, option4];

  const checkAnswer = (e, option) => {
    if (lock === false) {
      if (question.ans === option) {
        e.target.classList.add("right");
        setLock(true);
        setScore((s) => s + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        optionArray[question.ans - 1].current.classList.add("right");
      }
    }
  };
  const nextQuestion = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        setQuestion(data[newIndex]);
        return newIndex;
      });
      setLock(false);
      optionArray.map((option) => {
        option.current.classList.remove("right");
        option.current.classList.remove("wrong");
        return null;
      });
    }
  };
  const restartQuiz = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result === false && (
        <>
          <h2>
            {index + 1}.{question.question}
          </h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAnswer(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAnswer(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAnswer(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAnswer(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={nextQuestion}>Next</button>
          <p className="index">
            {index + 1} of {data.length} qustions
          </p>
        </>
      )}
      {result && (
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>
          <button onClick={restartQuiz}>Restart</button>
        </>
      )}
    </div>
  );
};

export default Quiz;
