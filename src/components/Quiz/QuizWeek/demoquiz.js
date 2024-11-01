import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCookie } from "react-use";
import { Grid } from "@mui/material";
import Swal from "sweetalert2";
import "./index.css";
import "./button.css";
import QuizPoint from "./quizPoint";
import { ApiBaseURL } from "../../ApiConfig";

// const convertTimeToSeconds = (timeString) => {
//   const [hours, minutes, seconds] = timeString.split(':').map(Number);
//   return hours * 3600 + minutes * 60 + seconds;
// };

const convertTimeToSeconds = (timeString) => {
  if (typeof timeString !== "string") {
    console.error("Invalid timerData type. Expected string.");
    return 0; // or handle it according to your use case
  }

  const timeArray = timeString.split(":").map(Number);

  if (timeArray.length !== 3 || timeArray.some(isNaN)) {
    console.error("Invalid time format. Expected 'HH:MM:SS'.");
    return 0; // or handle it according to your use case
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
  // const [timer, setTimer] = useState(1200);
  const [timeout, setTimeout] = useState(false);
  // const { id, question, options, userAnswer } = list[step];
  const { id, question, options, userAnswer } = list[step] || {};
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [proceedToNext, setProceedToNext] = useState(false);
  const [isQuizInProgress, setIsQuizInProgress] = useState(true);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [message, setMessage] = useState("Choose correct answer from below");
  const [isMessageVisible, setIsMessageVisible] = useState(true);

  // const handleTimeout = () => {
  //   setTimeout(true);
  //   setIsOpenModal(true);
  // };
  // const handleCloseModal = () => {
  //   if (proceedToNext) {
  //     setIsOpenModal(false);
  //     onNextClickHandler();
  //     setProceedToNext(false);
  //     setIsOptionSelected(false);
  //   }
  // }; 

  const handleTimeout = async () => {
    setIsOpenModal(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await handleCloseModal();
  };

  const handleCloseModal = async () => {
    // console.log("start");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsOpenModal(false);
    setScreen(
      pathname === "/student/mock-test" ? "mock-test-result" : "quiz-result"
    );
    // console.log("end");
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
        if (timer === 0) {
          clearInterval(intervalId);
        } else {
          setTimer((prevTimer) => prevTimer - 1);
          // onTimerUpdate(timer - 1);
        }
      }, 1000);
    };
 
    startTimer();
    return () => clearInterval(intervalId);
  }, [timer]);

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
        // onTimerUpdate(1200);
        // onTimerReset();
        setIsMessageVisible(true); 
      } else {
        setIsMessageVisible(false); 
        // console.log("CLICKED NEXT BUTTON");
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

  // const handleExit = () => {
  //   setScreen("quiz-result");
  // };

  // const postDataToApi = async () => {
  //   console.log("hello calling!");
  //   try {
  //     const token = JSON.parse(loggedIn).token;
  //     const apiUrl =
  //       "https://devdevdjango.maangcareers.com/test-management/std-question-attempts/";
  
  //     const questionAttempts = list.map((quizItem) => ({
  //       question_id: quizItem.question_id,
  //       quiz_id: qsId,
  //       answers: {
  //         "option 1": quizItem.userAnswer === quizItem.options.a,
  //         "option 2": quizItem.userAnswer === quizItem.options.b,
  //         "option 3": quizItem.userAnswer === quizItem.options.c,
  //         "option 4": quizItem.userAnswer === quizItem.options.d,
  //       },
  //     }));
  //     console.log("questionAttempts", questionAttempts);
  
  //     const data = {
  //       course_id: selectedCourseId,
  //       week_id: weekId,
  //       question_id: questionAttempts
  //         .map((item) => item.question_id)
  //         .join(","),
  //       quiz_id: qsId,
  //       answers: null,
  //       score: 0,
  //       result: "fail",
  //       attempts: attempt + 1,
  //     };
  //     const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  //     navigator.sendBeacon(apiUrl, blob);
  //   } catch (error) {
  //     console.error("Error calling API:", error);
  //   }
  // };
  
  const handleExit = () => {
    const options = {
      title: "Confirm Exit",
      text: "Are you sure you want to exit?",
      icon: "warning", 
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
    };
    Swal.fire(options).then((result) => {
      if (result.isConfirmed) {
        setIsQuizInProgress(false);
        setScreen("quiz-result");
      }
    });
  };

  useEffect(() => {
    const postDataToApi = async () => {
      // console.log("hello calling!");
      try {
        const token = JSON.parse(loggedIn).token;
        const apiUrl =
          `${ApiBaseURL}test-management/std-question-attempts/`;
  
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
        // console.log("questionAttempts", questionAttempts);
  
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
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          keepalive: true,
        });
  
        // Process the response if needed
        const responseData = await response.json();
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
      <div className="count-down-mobile">
        <img src="/images/Practice/clock.svg" alt="header icon" />
        <span>
          {/* {Math.floor(timer / 60)} : {String(timer % 60).padStart(2, "0")} */}
          {String(Math.floor(timer / 3600)).padStart(2, "0")} :{" "}
                  {String(Math.floor((timer % 3600) / 60)).padStart(2, "0")} :{" "}
                  {String(timer % 60).padStart(2, "0")}
        </span>
      </div>
      <div className="quiz-week-left xl:w-[calc(100%-325px)] w-full bg-white rounded-2xl shadow mb-7 lg:mb-0">
        <div className="xl:px-10 px-5 py-5 lg:py-10">
          <div
            className="quiz-question"
            // style={{
            //   background: `url(/images/Quiz/bg-question.svg)`,
            // }}
          >
            <div className="question xl:px-10">
              <div className="question-wrapper !block">                
                <div className="question-body flex items-center relative min-h-[300px] xl:py-20 xl:px-20 p-8">
                  <div class="blur-bg w-60 h-10 blur-2xl bg-[#40C2D4] opacity-80 absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] z-[1]"></div>
                    <div className="flex flex-col sm:flex-row w-full relative z-[1]">
                      <div className="number sm:mb-0 mb-2 sm:mr-2 sm:mx-0 mx-auto">
                        <span>{id}</span>
                      </div>
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
            <span className="text-gray-600 lg:text-[25px] sm:text-xl text-base font-normal">Choose correct answer from below</span>
          ) : (
            <span className="text-gray-600 lg:text-[25px] sm:text-xl text-base font-normal">Select any option from below</span>
          )}
            {/* <span>{message}</span> */}
          </div>
        </div>
        <div className="xl:px-10 px-5 pt-6 pb-10">
          <div className="quiz-options">
            <Grid container className="gap-y-4">
              <Grid item className="sm:w-6/12 w-full px-4 !py-0">
                <button
                  className={options?.a === userAnswer ? "btn-active !p-0" : "btn !p-0"}
                  onClick={() => onOptionClickHandler(options?.a)}
                >
                  <div class="flex polygon-btn w-full h-[70px] items-center">
                    <div className="btn-box mx-3">
                      <span>A</span>
                    </div>
                    <span className="btn-main-text xl:text-[25px] text-xl font-medium text-[#3c4250] text-left">{options?.a}</span>
                  </div>
                </button>
              </Grid>
              <Grid
                item
                className="sm:w-6/12 w-full px-4 !py-0"
              >
                <button
                  className={options?.b === userAnswer ? "btn-active !p-0" : "btn !p-0"}
                  onClick={() => onOptionClickHandler(options?.b)}
                >
                  <div class="flex polygon-btn w-full h-[70px] items-center">
                    <div className="btn-box mx-3">
                      <span>B</span>
                    </div>
                    <span className="btn-main-text xl:text-[25px] text-xl font-medium text-[#3c4250] text-left">{options?.b}</span>
                  </div>
                </button>
              </Grid>
              <Grid item className="sm:w-6/12 w-full px-4 !py-0">
                <button
                  className={options?.c === userAnswer ? "btn-active !p-0" : "btn !p-0"}
                  onClick={() => onOptionClickHandler(options?.c)}
                >
                  <div class="flex polygon-btn w-full h-[70px] items-center">
                    <div className="btn-box mx-3">
                      <span>C</span>
                    </div>
                    <span className="btn-main-text xl:text-[25px] text-xl font-medium text-[#3c4250] text-left">{options?.c}</span>
                  </div>
                </button>
              </Grid>
              <Grid
                item
                className="sm:w-6/12 w-full px-4 !py-0"
              >
                <button
                  className={options?.d === userAnswer ? "btn-active !p-0" : "btn !p-0"}
                  onClick={() => onOptionClickHandler(options?.d)}
                >
                  <div class="flex polygon-btn w-full h-[70px] items-center">
                    <div className="btn-box mx-3">
                      <span>D</span>
                    </div>
                    <span className="btn-main-text xl:text-[25px] text-xl font-medium text-[#3c4250] text-left">{options?.d}</span>
                  </div>
                </button>
              </Grid>
            </Grid>
          </div>
        </div>

        <div
          className="quiz-next py-3 px-4 border-t border-gray-200 border-solid flex justify-between"
        >
          <button type="button"
            className="exit-button flex items-center px-4 py-3 rounded-md text-white bg-red-500 hover:bg-red-700 duration-150"            
            onClick={() => {
              handleExit();
            }}
          >
            <span>EXIT</span>
          </button>

          <button type="button"
            className="next-button flex items-center px-4 py-3 rounded-md text-white bg-[#35C69D] hover:bg-teal-700 duration-150 disabled:opacity-50"
            onClick={() => onNextClickHandler()}
            disabled={isNextButtonDisabled}
          >
            <span>NEXT</span>
            <img src="/images/Quiz/next.svg" alt="next icon" />
          </button>
        </div>
      </div>
      <div className="mt-5 xl:mt-0 quiz-week-right xl:w-[295px] w-full p-4 bg-white rounded-2xl shadow">
        <QuizPoint quizList={list} step={step} />
      </div>
    </div>
  );
};

export default QuizWeek;
