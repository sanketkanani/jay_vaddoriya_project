import React, { useEffect, useState } from "react";
import "./index.css";
import "./button.css";
import { Grid } from "@mui/material";
import QuizPoint from "./quizPoint";
import { ApiBaseURL } from "../../../services/config/Endpoints";
import { useCookie } from "react-use";
import Swal from "sweetalert2";

const convertTimeToSeconds = (timeString) => {
  const timeInSeconds = parseFloat(timeString);
  if (isNaN(timeInSeconds)) {
    console.error("Invalid time format. Expected a number.");
    return 0;
  }
  return Math.floor(timeInSeconds); // Convert to integer seconds
};

const QuizWeek = ({
  setScreen,
  screen,
  selectedCourseId,
  questionData,
  setQuestionData,
  submissionData,
  setSubmissionData,
  courseId
}) => {
  const [step, setStep] = useState(0);
  const {
    id,
    question,
    option1,
    option2,
    option3,
    option4,
    answer,
    userAnswer,
  } = questionData?.data?.[step] || {};
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [loggedIn] = useCookie("maang");
  const [timer, setTimer] = useState(() => {
    if (questionData?.time) {
      const convertedTime = convertTimeToSeconds(questionData?.time);
      return isNaN(convertedTime) ? 0 : convertedTime;
    }
    return 0;
  });
  const [timeout, setTimeoutState] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      handleTimeout();
    }
  }, [timer]);

  useEffect(() => {
    let intervalId;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleTimeout = async () => {
    console.log("Timer ended, handling timeout...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await handleCloseModal();
  };

  const handleCloseModal = async () => {
    console.log("Closing modal...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setScreen("quiz-result");
  };

  const onOptionClickHandler = (selectedAnswer, ans) => {
    if (questionData && questionData.data) {
      const cloneQuizList = [...questionData.data];
      cloneQuizList[step].userAnswer = selectedAnswer;
      cloneQuizList[step].userAnswer1 = ans;
      cloneQuizList[step].status = "attempted";
      setQuestionData({ ...questionData, data: cloneQuizList });
      setIsOptionSelected(true);
    }
  };

  const onNextClickHandler = () => {
    const lastQuestion = questionData?.data?.length - 1;

    if (step === lastQuestion) {
      postDataToApi();
    } else {
      if (isOptionSelected) {
        setStep(step + 1);
        setIsOptionSelected(false);
      }
    }
  };

  const postDataToApi = async () => {
    try {
      const token = JSON.parse(loggedIn).token;
      const apiUrl = `${ApiBaseURL}free-course-management/quiz-question-attempt/`;

      const questionAttempts = questionData?.data.map((quizItem) => ({
        question_id: quizItem.id,
        answer: quizItem.userAnswer ? quizItem.userAnswer : "",
      }));

      const data = {
        course_id: selectedCourseId,
        syllabus_id: courseId,
        attempt_answer: JSON.stringify(questionAttempts),
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

      // Check if the response is ok (status code in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response as JSON (or use response.text() if it's not JSON)
      const result = await response.json();

      // Log the result or handle it as needed
      console.log("Submission successful:", result);
      if (result?.status === 200) {
        setSubmissionData(result?.data);
        setScreen("quiz-result");
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
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
        postDataToApi();
        // setIsQuizInProgress(false);
        // setScreen("quiz-result");
      }
    });
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // This function can't handle async operations properly.
      const confirmationMessage = "Are you sure you want to leave?";
      event.returnValue = confirmationMessage; // For old browsers
      return confirmationMessage; // For modern browsers
    };

    const handlePopState = () => {
      handleExit(); // Custom function to handle state change
    };

    const disableBackButton = () => {
      // Disable the back button
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
        window.history.go(1);
      };
    };

    // Disable back button
    setTimeout(disableBackButton, 0);

    // Add event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      // Cleanup event listeners
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <>
      <div className="quiz-week-body xl:flex justify-between items-start">
        <div className="count-down-mobile">
          <img src="/images/Practice/clock.svg" alt="header icon" />
          <span>
            {String(Math.floor(timer / 3600) || 0).padStart(2, "0")} :{" "}
            {String(Math.floor((timer % 3600) / 60) || 0).padStart(2, "0")} :{" "}
            {String(timer % 60 || 0).padStart(2, "0")}
          </span>
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
              <h2 className="visible-message">
                Choose correct answer from below
              </h2>
            </div>
          </div>
          <div className="xl:px-10 px-5 py-10">
            <div className="quiz-options-box">
              <div className="quiz-options">
                {/* <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <button
                      className={`button-block ${"option1" === userAnswer ? "btn-active" : "btn"}`}
                      onClick={() => onOptionClickHandler("option1", option1)}
                    >
                      <div className="btn-box">
                        <span>A</span>
                      </div>
                      <span className="btn-main-text">{option1}</span>
                    </button>
                  </Grid>
                  <Grid item xs={6}>
                    <button
                      className={`button-block ${"option2" === userAnswer ? "btn-active" : "btn"}`}
                      onClick={() => onOptionClickHandler("option2", option2)}
                    >
                      <div className="btn-box">
                        <span>B</span>
                      </div>
                      <span className="btn-main-text">{option2}</span>
                    </button>
                  </Grid>
                  <Grid item xs={6}>
                    <button
                      className={`button-block ${"option3" === userAnswer ? "btn-active" : "btn"}`}
                      onClick={() => onOptionClickHandler("option3", option3)}
                    >
                      <div className="btn-box">
                        <span>C</span>
                      </div>
                      <span className="btn-main-text">{option3}</span>
                    </button>
                  </Grid>
                  <Grid item xs={6}>
                    <button
                      className={`button-block ${"option4" === userAnswer ? "btn-active" : "btn"}`}
                      onClick={() => onOptionClickHandler("option4", option4)}
                    >
                      <div className="btn-box">
                        <span>D</span>
                      </div>
                      <span className="btn-main-text">{option4}</span>
                    </button>
                  </Grid>
                </Grid> */}
                 <div className="quiz-options-row">
                  <div className="quiz-options-col">
                    <button
                      className={`button-block ${"option1" === userAnswer ? "btn-active" : "btn"}`}
                      onClick={() => onOptionClickHandler("option1", option1)}
                    >
                      <div className="btn-box">
                        <span>A</span>
                      </div>
                      <span className="btn-main-text">{option1}</span>
                    </button>
                  </div>
                  <div className="quiz-options-col">
                    <button
                      className={`button-block ${"option2" === userAnswer ? "btn-active" : "btn"}`}
                      onClick={() => onOptionClickHandler("option2", option2)}
                    >
                      <div className="btn-box">
                        <span>B</span>
                      </div>
                      <span className="btn-main-text">{option2}</span>
                    </button>
                  </div>
                  <div className="quiz-options-col">
                    <button
                      className={`button-block ${"option3" === userAnswer ? "btn-active" : "btn"}`}
                      onClick={() => onOptionClickHandler("option3", option3)}
                    >
                      <div className="btn-box">
                        <span>C</span>
                      </div>
                      <span className="btn-main-text">{option3}</span>
                    </button>
                  </div>
                  <div className="quiz-options-col">
                    <button
                      className={`button-block ${"option4" === userAnswer ? "btn-active" : "btn"}`}
                      onClick={() => onOptionClickHandler("option4", option4)}
                    >
                      <div className="btn-box">
                        <span>D</span>
                      </div>
                      <span className="btn-main-text">{option4}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="quiz-next"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <button className="next-button" onClick={onNextClickHandler}>
                <span>
                  {" "}
                  {step === questionData?.data?.length - 1 ? "SUBMIT TEST" : "NEXT"}
                </span>
                <img src="/images/Quiz/next.svg" alt="next icon" />
              </button>
            </div>
          </div>
        </div>
        <div className="quiz-week-right xl:w-[300px] w-full">
          <div className="quiz-week-right-inner bg-white rounded-2xl shadow xl:sticky top-20 p-5">
            <div className="count-down flex items-center justify-between border-b border-[#EBEBEB] pb-5 mb-5">
              <div className="time flex flex-end">
                <img src="/images/Practice/clock.svg" alt="header icon" />

                <span>
                  {String(Math.floor(timer / 3600) || 0).padStart(2, "0")} :{" "}
                  {String(Math.floor((timer % 3600) / 60) || 0).padStart(
                    2,
                    "0"
                  )}{" "}
                  : {String(timer % 60 || 0).padStart(2, "0")}
                </span>
              </div>
            </div>
            <div className="quiz-week-right">
              <QuizPoint
                quizList={questionData?.data}
                step={step}
                currentQuestion={questionData?.data[step]}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizWeek;
