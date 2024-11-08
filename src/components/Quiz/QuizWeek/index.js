import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCookie } from "react-use";
import { Grid } from "@mui/material";
import Swal from "sweetalert2";
import "./index.css";
import "./button.css";
import QuizPoint from "./quizPoint";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL } from "../../ApiConfig";

const convertTimeToSeconds = (timeString) => {
  if (typeof timeString !== "string") {
    console.error("Invalid timerData type. Expected string.");
    return 0;
  }

  const timeArray = timeString.split(":").map(Number);

  if (timeArray.length !== 3 || timeArray.some(isNaN)) {
    console.error("Invalid time format. Expected 'HH:MM:SS'.");
    return 0;
  }

  const [hours, minutes, seconds] = timeArray;
  return hours * 3600 + minutes * 60 + seconds;
};

const QuizWeek = ({
  screen,
  setScreen,
  list,
  setList,
  onTimerUpdate,
  onTimerReset,
  weekId,
  courseId,
  timerData,
  qsQuantity,
  attempt,
  qsId,
  selectedCourseId,
}) => {
  const { pathname } = useLocation();
  const [loggedIn] = useCookie("maang");
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState(() => {
    if (timerData) {
      const convertedTime = convertTimeToSeconds(timerData);
      return isNaN(convertedTime) ? 0 : convertedTime;
    }
    return 0;
  });
  const [timeout, setTimeoutState] = useState(false);
  const { id, question, options, userAnswer } = list[step] || {};
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [proceedToNext, setProceedToNext] = useState(false);
  const [isQuizInProgress, setIsQuizInProgress] = useState(true);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(true);

  const handleTimeout = async () => {
    setIsOpenModal(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await handleCloseModal();
  };

  const handleCloseModal = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsOpenModal(false);
    setScreen(
      pathname === "/student/mock-test" ? "mock-test-result" : "quiz-result"
    );
  };

  useEffect(() => {
    if (timer === 0) {
      handleTimeout();
    }
  }, [timer]);

  useEffect(() => {
    let intervalId;

    const startTimer = () => {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    };

    startTimer();
    return () => clearInterval(intervalId);
  }, []);

  const onNextClickHandler = () => {
    const lastQuestion = pathname === "/student/mock-test" ? 1 : qsQuantity - 1;

    if (step === lastQuestion) {
      setScreen(
        pathname === "/student/mock-test" ? "mock-test-result" : "quiz-result"
      );
    } else {
      if (isOptionSelected) {
        setStep(step + 1);
        setIsOptionSelected(false);
        setIsMessageVisible(true);
      } else {
        setIsMessageVisible(false);
      }
    }
  };

  const onOptionClickHandler = (answer) => {
    const cloneQuizList = [...list];
    cloneQuizList[step].userAnswer = answer;
    cloneQuizList[step].status = "attempted";
    setList(cloneQuizList);
    setIsOptionSelected(true);
  };

  const handleExit = () => {
    Swal.fire({
      title: "Confirm Exit",
      text: "Are you sure you want to exit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, exit!",
      cancelButtonText: "No, stay!",
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setIsQuizInProgress(false);
        setScreen("quiz-result");
      }
    });
  };

  useEffect(() => {
    const postDataToApi = async () => {
      try {
        const token = JSON.parse(loggedIn).token;
        const apiUrl = `${ApiBaseURL}test-management/std-question-attempts/`;

        const questionAttempts = list.map((quizItem) => ({
          question_id: quizItem.question_id,
          quiz_id: qsId,
          answers: {
            "option 1": quizItem.userAnswer === quizItem.options.a,
            "option 2": quizItem.userAnswer === quizItem.options.b,
            "option 3": quizItem.userAnswer === quizItem.options.c,
            "option 4": quizItem.userAnswer === quizItem.options.d,
          },
        }));

        const data = {
          course_id: selectedCourseId,
          week_id: weekId,
          question_id: questionAttempts
            .map((item) => item.question_id)
            .join(","),
          quiz_id: qsId,
          answers: null,
          score: 0,
          result: "fail",
          attempts: attempt + 1,
        };

        await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          keepalive: true,
        });
      } catch (error) {
        console.error("Error calling API:", error);
      }
    };

    const handleBeforeUnload = async (event) => {
      const confirmationMessage = "Are you sure you want to leave?";
      event.returnValue = confirmationMessage;

      if (window.confirm(confirmationMessage)) {
        await postDataToApi();
      }
      return confirmationMessage;
    };

    const handleUnload = async () => {
      await postDataToApi();
    };

    const handlePopState = () => {
      handleExit();
    };

    const disableBackButton = () => {
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
        window.history.go(1);
      };
    };

    setTimeout(disableBackButton, 0);

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("unload", handleUnload);
    };
  }, [handleExit, loggedIn, list, qsId, selectedCourseId, weekId, attempt]);

  const isNextButtonDisabled = !isOptionSelected;

  return (
    <div className="quiz-week-body xl:flex justify-between items-start">
      <div className="count-down-row flex w-full justify-between items-center mb-2">
          <div className="count-down-mobile mb-0">
          <img src="/images/Practice/clock.svg" alt="header icon" />
          <span>
            {String(Math.floor(timer / 3600) || 0).padStart(2, "0")} :{" "}
            {String(Math.floor((timer % 3600) / 60) || 0).padStart(2, "0")} :{" "}
            {String(timer % 60 || 0).padStart(2, "0")}
          </span>
        </div>
        <button
                type="button"
                className="exit-button flex items-center px-4 py-3 rounded-md text-white bg-red-500 hover:bg-red-700 duration-150"
                onClick={() => {
                  handleExit();
                }}
              >
                <span>EXIT</span>
              </button>
        </div>
      <div className="quiz-week-left xl:w-[calc(100%-325px)] w-full bg-white rounded-2xl shadow mb-7 lg:mb-0">
        <div className="xl:px-10 px-5 py-5 lg:py-10">
          <div className="quiz-question">
            <div className="question xl:px-10">
              <div className="question-wrapper !block">
                <div className="question-body flex items-center relative min-h-[300px] xl:py-20 xl:px-20 p-8">
                  <div className="blur-bg w-60 h-10 blur-2xl bg-[#40C2D4] opacity-80 absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] z-[1]"></div>
                  <div className="flex flex-col sm:flex-row w-full relative z-[1]">
                    {/* <div className="number sm:mb-0 mb-2 sm:mr-2 sm:mx-0 mx-auto">
                      <span>{id}</span>
                    </div> */}
                    <span className="text">{question}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:px-10 px-5 py-3">
          <div className="divider">
            {isMessageVisible ? (
              <div className="hidden-message">
                Choose correct answer from below
              </div>
            ) : (
              <div className="visible-message">
                Choose correct answer from below
              </div>
            )}
          </div>
        </div>
        <div className="xl:px-10 px-5 py-10">
          <div className="quiz-options-box">
            {/* <div className="flex justify-between items-start xl:space-x-5 space-x-2">
              <div className="quiz-options">
                <button
                  onClick={() => onOptionClickHandler(options?.a)}
                  className={`quiz-options-btn ${
                    userAnswer === options?.a ? "selected" : ""
                  }`}
                >
                  {options?.a}
                </button>
              </div>
              <div className="quiz-options">
                <button
                  onClick={() => onOptionClickHandler(options?.b)}
                  className={`quiz-options-btn ${
                    userAnswer === options?.b ? "selected" : ""
                  }`}
                >
                  {options?.b}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-start xl:space-x-5 space-x-2">
              <div className="quiz-options">
                <button
                  onClick={() => onOptionClickHandler(options?.c)}
                  className={`quiz-options-btn ${
                    userAnswer === options?.c ? "selected" : ""
                  }`}
                >
                  {options?.c}
                </button>
              </div>
              <div className="quiz-options">
                <button
                  onClick={() => onOptionClickHandler(options?.d)}
                  className={`quiz-options-btn ${
                    userAnswer === options?.d ? "selected" : ""
                  }`}
                >
                  {options?.d}
                </button>
              </div>
            </div> */}
            <div className="quiz-options-row">
              <div className="quiz-options-col">
                <button
                  className={`button-block ${
                    userAnswer === options?.a ? "btn-active" : "btn"
                  }`}
                  onClick={() => onOptionClickHandler(options?.a)}
                >
                  <div className="btn-box">
                    <span>A</span>
                  </div>
                  <span className="btn-main-text">{options?.a}</span>
                </button>
              </div>
              <div className="quiz-options-col">
                <button
                  className={`button-block ${
                    userAnswer === options?.b ? "btn-active" : "btn"
                  }`}
                  onClick={() => onOptionClickHandler(options?.b)}
                >
                  <div className="btn-box">
                    <span>B</span>
                  </div>
                  <span className="btn-main-text">{options?.b}</span>
                </button>
              </div>
              <div className="quiz-options-col">
                <button
                  className={`button-block ${
                    userAnswer === options?.c ? "btn-active" : "btn"
                  }`}
                  onClick={() => onOptionClickHandler(options?.c)}
                >
                  <div className="btn-box">
                    <span>C</span>
                  </div>
                  <span className="btn-main-text">{options?.c}</span>
                </button>
              </div>
              <div className="quiz-options-col">
                <button
                  className={`button-block ${
                    userAnswer === options?.d ? "btn-active" : "btn"
                  }`}
                  onClick={() => onOptionClickHandler(options?.d)}
                >
                  <div className="btn-box">
                    <span>D</span>
                  </div>
                  <span className="btn-main-text">{options?.d}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="quiz-next mt-10">
            <button
              className={`btn-primary btn-next ${
                isNextButtonDisabled ? "disabled" : ""
              }`}
              onClick={onNextClickHandler}
              disabled={isNextButtonDisabled}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="quiz-week-right xl:w-[300px] w-full">
        <div className="quiz-week-right-inner bg-white rounded-2xl shadow xl:sticky top-20 p-5">
          {/* <div className="count-down flex items-center justify-between border-b border-[#EBEBEB] pb-5 mb-5">
            <div className="time  flex flex-end">
              <img src="/images/Practice/clock.svg" alt="header icon" />
              <span>
                {String(Math.floor(timer / 3600)).padStart(2, "0")} :{" "}
                {String(Math.floor((timer % 3600) / 60)).padStart(2, "0")} :{" "}
                {String(timer % 60).padStart(2, "0")}
              </span>
            </div>
             <button className="btn-primary btn-exit" onClick={handleExit}>
              Exit
            </button>  
          </div> */}
          <div className="quiz-points">
            <Grid container spacing={2}>
              {list?.map((quiz, index) => (
                <Grid item xs={3} sm={2} key={index}>
                  <QuizPoint
                    quizList={quiz}
                    step={step}
                    currentQuestion={quiz?.data[step]}
                    handleExit={handleExit}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
      {isOpenModal && (
        <div className="modal-timeout">
          <div className="modal-content">
            <h2>Time's up!</h2>
            <p>
              The quiz has ended. You will be redirected to the results page.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizWeek;
