import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import styles from "../styles/take-quiz.module.css";

const TakeQuiz = () => {

  const [Ques, SetQues] = useState({
    title: "",
    describe: "",
    domain: "",
    questions: [],
  });

  const { quizId } = useParams();

  const API = `${import.meta.env.VITE_BACKEND_URL}/quiz/${quizId}`;

  useEffect(() => {
    axios
      .get(API)
      .then((response) => {
        SetQues(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [API]);

  const ShuffleOptions = (quiz) => {
    const combinedOpts = quiz.wrongAnswers.concat(quiz.correctAnswer);
    combinedOpts.sort(() => Math.random() - 0.5);
    return combinedOpts;
  };

  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload

    const quizData = new FormData(event.target);

    const formDataObject = {};
    quizData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    nav("/quiz/score", {state:[formDataObject, Ques] });

  };

  return (
    <div className={styles.main_container}>

        <Form className={styles.quiz_container} onSubmit={handleSubmit}>

          <div className={styles.quiz_header}>
            <h2 className={styles.title}>{Ques.title}</h2>
            <p className={styles.describe}>{Ques.describe}</p>
            <p className={styles.domain}>{Ques.domain}</p>
          </div>

          <div className={styles.ques_container}>

            {Ques.questions.map((quiz, index) => (

              <div className={styles.quiz_ques} key={index}>
                <h3>{quiz.question}</h3>

                {quiz.type === "mcq" && (
                  <div className={styles.opt_box}>
                      {ShuffleOptions(quiz).map((opt, optIndx) => (
                      <div key={optIndx} className={styles.option}>
                        <input
                          type="radio"
                          name={`mcq-opt${index}`}
                          value={opt}
                        />
                        <label>{opt}</label>
                      </div>
                    ))}
                  </div>
                )}

                {quiz.type === "true_false" && (
                  <div className={styles.opt_box}>
                    
                    <div className={styles.option}>
                      <input
                        type="radio"
                        name={`bool-opt${index}`}
                        value={"true"}
                      />
                      <label>True</label>
                      <input
                        type="radio"
                        name={`bool-opt${index}`}
                        value={"false"}
                      />
                      <label>False</label>
                    </div>
                  </div>
                )}

                {quiz.type === "subjective" && (
                  <div className={styles.answer_box}>
                    <textarea
                      name={`subjective-opt${index}`}
                      className={`answer-area${index}`}
                      placeholder="enter your answer"
                      cols={10}
                    ></textarea>
                  </div>
                )}

              </div>
            ))}

            <button type="submit" className={styles.submit}>
              Submit
            </button>

          </div>
        </Form>

    </div>
  );
};

export default TakeQuiz;
