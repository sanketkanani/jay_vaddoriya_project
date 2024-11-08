import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useCookie } from "react-use";
import failed from "../../../assets/failed.svg";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL } from "../../ApiConfig";

const tags = ["Review Answers", "Retake Quiz"];
// const quizList = [
//   {
//     id: 1,
//     question:
//       "Which Gas is the Lightest? Lorem ipsum dolor sit amet consectetur. Eu sed quis at natoque quam non",
//     answer: "Hydrogen",
//     userAnswer: "",
//     status: "not-attempted",
//     options: {
//       a: "Hydrogen",
//       b: "Helium",
//       c: "Ammonia",
//       d: "Oxygen",
//     },
//   },
//   {
//     id: 2,
//     question: `The abbreviation ‘fob’ stands for`,
//     answer: "Free of Bargain",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "Fellow of Britain",
//       b: "Free of Bargain",
//       c: "Free on Board",
//       d: "None of these",
//     },
//   },
//   {
//     id: 3,
//     question: "The spectrum of helium is similar to",
//     answer: "Li",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "H",
//       b: "Mg",
//       c: "Li",
//       d: "He",
//     },
//   },
//   {
//     id: 4,
//     question: "The M.P. and B.P. are very low for ?",
//     answer: "He",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "Ne",
//       b: "He",
//       c: "Kr",
//       d: "Ar",
//     },
//   },
//   {
//     id: 5,
//     question: `Which of the following is not a state of India?`,
//     answer: "Vrindachal",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "Goa",
//       b: "Jharkhand",
//       c: "Chattisgarh",
//       d: "Vrindachal",
//     },
//   },
//   {
//     id: 6,
//     question: "Viscosity is very low for?",
//     answer: "He",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "Ar",
//       b: "Xe",
//       c: "He",
//       d: "Kr",
//     },
//   },
//   {
//     id: 7,
//     question: `Which of the following options is correct for the given statement:
//       The most abundant elements in the universe are`,
//     answer: " hydrogen and helium",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "neon and argon",
//       b: " hydrogen and helium",
//       c: " aluminium and copper",
//       d: "oxygen and nitrogen",
//     },
//   },
//   {
//     id: 8,
//     question: "Which of the following is an Island country?",
//     answer: "Maldives",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "Maldives",
//       b: "Peru",
//       c: "Oman",
//       d: "Yemen",
//     },
//   },
//   {
//     id: 9,
//     question: "A hot air balloon rises because it is filled with a gas :",
//     answer: "less dense than air",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "denser than air",
//       b: "less dense than air",
//       c: "as dense as air",
//       d: "the given statement is wrong",
//     },
//   },
//   {
//     id: 10,
//     question:
//       "Which one has the higher refractive index, cooler air or hotter air?",
//     answer: "cooler",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "hotter",
//       b: "cooler",
//       c: "same for both",
//       d: "cannot be determined.",
//     },
//   },
//   {
//     id: 11,
//     question: `The refractive index of water with respect to air is
//       4
//       /
//       3
//        . Calculate the refractive index of air with respect to water.`,
//     answer: "3/4",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "3/4",
//       b: "4/3",
//       c: "3/2",
//       d: "2/3",
//     },
//   },
//   {
//     id: 12,
//     question: "Which among the following is the lightest gas?",
//     answer: "Neon",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "Neon",
//       b: "Carbon dioxide",
//       c: "Oxygen",
//       d: "Hydrogen",
//     },
//   },
//   {
//     id: 13,
//     question: `
//       Which god is also known as ‘Gauri Nandan’?`,
//     answer: "Indra",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "Agni",
//       b: "Indra",
//       c: "Hanuman",
//       d: "Ganesha",
//     },
//   },
//   {
//     id: 14,
//     question: `
//     Which city is known as Pink City in India?`,
//     answer: "Banglore",
//     userAnswer: "",
//     status: "not-attempted",
//     options: {
//       a: "Banglore",
//       b: "Jaipur",
//       c: "Surat",
//       d: "Pune",
//     },
//   },
//   {
//     id: 15,
//     question: `Which of the following musical instruments is NOT of foreign origin?`,
//     answer: "Sitar",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "Tabla",
//       b: "Flute",
//       c: "Sitar",
//       d: "Violin",
//     },
//   },
//   {
//     id: 16,
//     question: "Where in India Gate located?",
//     answer: "Mumbai",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "Mumbai",
//       b: "Agra",
//       c: "Punjab",
//       d: "Delhi",
//     },
//   },
//   {
//     id: 17,
//     question: "How many states are there in India?",
//     answer: "29",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "28",
//       b: "29",
//       c: "31",
//       d: "32",
//     },
//   },
//   {
//     id: 18,
//     question: "How many religions are there in India?",
//     answer: "8",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "6",
//       b: "7",
//       c: "8",
//       d: "9",
//     },
//   },
//   {
//     id: 19,
//     question: "Current Railway Minister of India is",
//     answer: "Piyush Goyal",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "Mamta Banarjee",
//       b: "Ram Vilash",
//       c: "Ashwini Vaishnaw",
//       d: "Piyush Goyal",
//     },
//   },
//   {
//     id: 20,
//     question: `
//       Which city is known as the "Silicon Valley Of India"?`,
//     answer: "Delhi",
//     status: "not-attempted",
//     userAnswer: "",
//     options: {
//       a: "Delhi",
//       b: "Mumbai",
//       c: "Chennai",
//       d: "Bangalore",
//     },
//   },
// ];
const QuizResult = ({
  list,
  setScreen,
  resetTimer,
  setResetTimer,
  selectedCourseId,
  weekId,
  setList,
  attempt,
  qsId,
  fetchWeekQuestions,
  attemptData,
  passPercentage,
}) => {
  const [activeTag, setActiveTag] = useState("Review Answers");
  const [loggedIn] = useCookie("maang");
  const [percentage, setPercentage] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [isDisable, setIsDisable] = useState(false);
  const apiCalled = useRef(false);

  // console.log("PASSPERCENTAGE:::::::::>", attempt , "ANNDDD", attemptData);

  const calculateScore = () => {
    const correctAnswers = list.filter(
      (item) => item.answer === item.userAnswer
    );
    const correctAnswersSize = correctAnswers.length;
    const wrongAnswers = list.length - correctAnswersSize;
    const correctAnswerScore = correctAnswers.length * 5;
    setCorrectAnswers(correctAnswersSize);
    setWrongAnswer(wrongAnswers);
    const additionalScore = 0;
    const totalScore = correctAnswerScore + additionalScore;
    const calculatedPercentage = (totalScore / (list.length * 5)) * 100;
    setPercentage(calculatedPercentage);

    const postDataToApi = async () => {
      try {
        const token = JSON.parse(loggedIn).token;
        // const apiUrl = "http://192.168.0.119:7000/test-management/std-question-attempts/";
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
          answers: questionAttempts
            .map(
              (item) =>
                `{'option 1': ${item.answers["option 1"]}, 'option 2': ${item.answers["option 2"]}, 'option 3': ${item.answers["option 3"]}, 'option 4': ${item.answers["option 4"]}}`
            )
            .join("|"),
          score: calculatedPercentage,
          result: calculatedPercentage >= passPercentage ? "pass" : "fail",
          attempts: attempt + 1,
        };

        // console.log(JSON.stringify(data));
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const responseData = await response.json();
        // console.log("API response:", responseData);
      } catch (error) {
        console.error("Error calling API:", error);
      }
    };
    postDataToApi();

    return { totalScore, percentage: calculatedPercentage };
  };

  // if(attempt > (attemptData-1)){
  //   setIsDisable(true);
  // }

  useEffect(() => {
    if (!apiCalled.current) {
      calculateScore();
      apiCalled.current = true;
    }
  }, []);

  const handleExit = () => {
    // console.log("button clicked!");
    window.location.reload();
  };
  useEffect(() => {
    // console.log("attemptData222333333333333333", attempt);
  }, [attempt]);

  // const retakeList = () => {
  //   console.log("Helooooooooooooooooooooooooooooooooooooooooooooooooo",((attempt+1) > attemptData));
  //   if (attempt > attemptData) {
  //     setIsDisable(true);
  //     alert(`You have already attempted this quiz ${attemptData} times.`);
  //   } else {
  //     console.log("hello");
  //     // const cloneQuizList = [...list];
  //     const cloneQuizList = [fetchWeekQuestions()];
  //     setList(cloneQuizList);
  //     setScreen("quiz-week");
  //   }
  // };
  const retakeList = () => {
    // console.log("attempt:", attempt);
    // console.log("attemptData:", attemptData);

    if (attempt + 1 === attemptData) {
      setIsDisable(true);
      alert(`You have already attempted this quiz ${attemptData} times.`);
    } else {
      // console.log("hello");
      // const cloneQuizList = [...list];
      const cloneQuizList = [fetchWeekQuestions()];
      setList(cloneQuizList);
      setScreen("quiz-week");
    }
  };

  const isPass = percentage >= passPercentage;

  return (
    <div className="quiz-result md:!p-8 !p-5">
      <div className="flex flex-wrap -mx-4">
        <div className="xl:w-3/12 lg:w-4/12 w-full px-4 lg:text-start text-center">
          {/* <img src="/images/Quiz/quiz-success.svg" alt="bg-done icon" className="inline" /> */}
          {percentage >= passPercentage ? (
            <img
              src="/images/Quiz/quiz-success.svg"
              alt="bg-done icon"
              className="inline"
            />
          ) : (
            <img src={failed} alt="failed icon" className="inline w-full" />
          )}
        </div>
        <div className="xl:w-9/12 lg:w-8/12 w-full px-4">
          <div className="quiz-result-header-content-top lg:!justify-start !justify-center">
            <div className={`congratulation-box ${isPass ? "pass" : "fail"}`}>
              <span
                className="congratulation-text"
                style={{ fontSize: "30px" }}
              >
                {isPass ? (
                  "Congratulations"
                ) : (
                  <span style={{ color: "red" }}>Sorry</span>
                )}
              </span>
              <span
                className="congratulation-message"
                style={{ fontSize: "15px", padding: "0px" }}
              >
                {isPass
                  ? "You are amazing! Pass with"
                  : "You are not passed. Retake the Quiz."}
              </span>
            </div>
            {/* {console.log("attempt in render:", attempt)} */}
            {/* {console.log("attemptData in render:", attemptData)} */}

            <span
              className="percentage"
              style={{ color: !isPass ? "red" : "" }}
            >
              {Math.round(percentage)}%
            </span>
          </div>
          <div className="quiz-result-header-content-bottom xl:!p-5 sm:!p-4 bg-till-100 bg-opacity-50">
            <div className="quiz-result-text">
              <div className="divider">
                <span>Summary or Results</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center -mx-4 gap-y-4">
              <div className="xl:w-[20%] lg:w-[33.333333%] md:w-[20%] sm:w-[33.333333%] w-[50%] px-2 text-center">
                <div className="value text-gray-700 text-[25px] font-bold">
                  {attempt + 1}
                </div>
                <div className="lable text-gray-600 text-base font-normal">
                  Attempt
                </div>
              </div>
              <div className="xl:w-[20%] lg:w-[33.333333%] md:w-[20%] sm:w-[33.333333%] w-[50%] px-2 text-center">
                <div className="value text-gray-700 text-[25px] font-bold">
                  {list.length}
                </div>
                <div className="lable text-gray-600 text-base font-normal">
                  Total Questions
                </div>
              </div>
              <div className="xl:w-[20%] lg:w-[33.333333%] md:w-[20%] sm:w-[33.333333%] w-[50%] px-2 text-center">
                <div className="value text-gray-700 text-[25px] font-bold">
                  {correctAnswers}
                </div>
                <div className="lable text-gray-600 text-base font-normal">
                  Correct Answers
                </div>
              </div>
              <div className="xl:w-[20%] lg:w-[33.333333%] md:w-[20%] sm:w-[33.333333%] w-[50%] px-2 text-center">
                <div className="value text-gray-700 text-[25px] font-bold">
                  {wrongAnswer}
                </div>
                <div className="lable text-gray-600 text-base font-normal">
                  Wrong Answers
                </div>
              </div>
              <div className="xl:w-[20%] lg:w-[33.333333%] md:w-[20%] sm:w-[33.333333%] w-[50%] px-2 text-center">
                <div className="value text-gray-700 text-[25px] font-bold">
                  {percentage}%
                </div>
                <div className="lable text-gray-600 text-base font-normal">
                  Score
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        <div className="quiz-result-body">
          <div className="quiz-result-body-top">
            <div className="tags">
              {tags.map((item) => {
                return (
                  <div
                    className={`${
                      item === activeTag ? "active-tag" : "tag"
                    } mr-2`}
                    onClick={() => setActiveTag(item)}
                  >
                    <span style={{ width: "max-content" }}>{item}</span>
                  </div>
                );
              })}
            </div>
            <button className="exit-btn" onClick={handleExit}>
              <span>Exit</span>
            </button>
          </div>
          {activeTag === "Review Answers" ? (
            <div className="quiz-result-body-bottom">
              {list.map((quizItem) => {
                const { id, question, options, answer, userAnswer } = quizItem;
                // console.log("question", question);
                // console.log("options", options);
                // console.log("answer", answer, "?..?", answer.length);
                // console.log(
                // "userAnswer",
                // userAnswer,
                // "?..?",
                // userAnswer.length
                // );
                return (
                  <div className="answer-body">
                    <div style={{ textAlign: "left" }}>
                      <span className="text-gray-700 text-base font-medium font-['Outfit'] pr-1">
                        {id}.
                      </span>
                      <span className="text-gray-700 text-base font-medium font-['Outfit']">
                        {question}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-y-3 -mx-2 question-action">
                      <div className="xl:w-3/12 md:w-6/12 w-full px-2">
                        <button
                          className={`w-full !mb-0 quiz-button ${
                            options?.a === userAnswer
                              ? answer === userAnswer
                                ? "active-quiz-button"
                                : "active-quiz-button-wrong"
                              : options?.a === answer
                              ? "active-quiz-button"
                              : userAnswer === ""
                              ? "active-quiz-button-NotAttempt"
                              : ""
                          } `}
                        >
                          <span className="box">A</span>
                          <span className="btn-text">{options?.a}</span>
                        </button>
                      </div>
                      <div className="xl:w-3/12 md:w-6/12 w-full px-2">
                        <button
                          className={`w-full px-2 !mb-0 quiz-button ${
                            options?.b === userAnswer
                              ? answer === userAnswer
                                ? "active-quiz-button"
                                : "active-quiz-button-wrong"
                              : options?.b === answer
                              ? "active-quiz-button"
                              : userAnswer === ""
                              ? "active-quiz-button-NotAttempt"
                              : ""
                          } `}
                        >
                          <span className="box">B</span>
                          <span className="btn-text">{options?.b}</span>
                        </button>
                      </div>
                      <div className="xl:w-3/12 md:w-6/12 w-full px-2">
                        <button
                          className={`w-full px-2 !mb-0 quiz-button ${
                            options?.c === userAnswer
                              ? answer === userAnswer
                                ? "active-quiz-button"
                                : "active-quiz-button-wrong"
                              : options?.c === answer
                              ? "active-quiz-button"
                              : userAnswer === ""
                              ? "active-quiz-button-NotAttempt"
                              : ""
                          } `}
                        >
                          <span className="box">C</span>
                          <span className="btn-text">{options?.c}</span>
                        </button>
                      </div>
                      <div className="xl:w-3/12 md:w-6/12 w-full px-2">
                        <button
                          className={`w-full px-2 !mb-0 quiz-button ${
                            options?.d === userAnswer
                              ? answer === userAnswer
                                ? "active-quiz-button"
                                : "active-quiz-button-wrong"
                              : options?.d === answer
                              ? "active-quiz-button"
                              : userAnswer === ""
                              ? "active-quiz-button-NotAttempt"
                              : ""
                          } `}
                        >
                          <span className="box">D</span>
                          <span className="btn-text">{options.d}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : activeTag === "Retake Quiz" && !isDisable ? (
            <div className="retake-quiz-section">
              {retakeList()}
              {/* {setScreen("quiz-week")} */}
            </div>
          ) : // <div className="retake-quiz-section">
          //   {resetList()}
          //   {setScreen("quiz-week")}
          // </div>
          null}
          <div className="exit-btn-mobile">
            <button className="exit-btn" onClick={handleExit}>
              <span>Exit</span>
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default QuizResult;
