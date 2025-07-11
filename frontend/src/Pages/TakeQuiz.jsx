import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/take-quiz.module.css";

const TakeQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    describe: "",
    domain: "",
    questions: [],
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const { quizId } = useParams();
  const API = `${import.meta.env.VITE_BACKEND_URL}/quiz/${quizId}`;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API)
      .then((response) => {
        setQuiz(response.data);
      })
      .catch((err) => console.error(err));
  }, [API]);

  const handleOptionClick = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    const currQues = quiz.questions[currentIndex];
    const name = currQues.type === "mcq" ? `mcq-opt${currentIndex}` : `bool-opt${currentIndex}`;

    setAnswers((prev) => ({
      ...prev,
      [name]: selected,
    }));

    setSelected(null);
    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/quiz/score", { state: [answers, quiz] });
    }
  };

  const ShuffleOptions = (quiz) => {
    const opts = [...quiz.wrongAnswers, quiz.correctAnswer];
    return opts.sort(() => Math.random() - 0.5);
  };

  const currQues = quiz.questions[currentIndex];

  return (
    <div className={styles.quiz_wrapper}>
      <div className={styles.quiz_header}>
        <h2>{quiz.title}</h2>
        <p>{quiz.describe}</p>
        <p>{quiz.domain}</p>
        <div className={styles.progress}>Question {currentIndex + 1}/{quiz.questions.length}</div>
      </div>

      {currQues && (
        <div className={styles.quiz_card}>
          {currQues.image && (
            <img src={currQues.image} alt="quiz" className={styles.quiz_image} />
          )}

          <h3 className={styles.question}>{currQues.question}</h3>

          <div className={styles.options}>
            {currQues.type === "mcq" &&
              ShuffleOptions(currQues).map((option, i) => (
                <button
                  key={i}
                  className={`${styles.option_btn} ${selected === option ? styles.selected : ""}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}

            {currQues.type === "true_false" && (
              <>
                <button
                  className={`${styles.option_btn} ${selected === "true" ? styles.selected : ""}`}
                  onClick={() => handleOptionClick("true")}
                >
                  True
                </button>
                <button
                  className={`${styles.option_btn} ${selected === "false" ? styles.selected : ""}`}
                  onClick={() => handleOptionClick("false")}
                >
                  False
                </button>
              </>
            )}
          </div>

          <div className={styles.next_btn_container}>
            <button
              onClick={handleNext}
              className={styles.next_btn}
              disabled={selected === null}
            >
              {currentIndex + 1 === quiz.questions.length ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeQuiz;