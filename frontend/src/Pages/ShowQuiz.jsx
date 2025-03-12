import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../styles/showquiz.module.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ShowQuiz = () => {
  const [QuizData, SetQuizData] = useState([]);
  const DomainData = [
    "Computer Science",
    "Science",
    "Anime",
    "Cooking",
    "GK",
  ];

  const API = `${import.meta.env.VITE_BACKEND_URL}/quiz/all`;

  // Fetch Quiz Data
  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        SetQuizData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [API]);

  return (
    <div className={styles.view_quiz_main}>
      {DomainData.map((dom) => (
        <div className={styles.quiz_container} key={dom}>
          <h1 className={styles.domainName}>{dom}</h1>

          <Swiper
            modules={[Navigation, Pagination]}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1455: {slidesPerView: 4}
            }}
            className={styles.swiper_container}
          >
            {QuizData.filter((d) => d.domain === dom).map((d) => (
              <SwiperSlide key={d._id} className={styles.quiz_item}>
                <h2>{d.title}</h2>
                <h4>{d.domain}</h4>
                <p>{d.describe}</p>
                <Link className={styles.quiz_btn} to={`/quiz/take/${d._id}`}>
                  Take Quiz
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
};

export default ShowQuiz;
