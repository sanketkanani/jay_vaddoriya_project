import React, { useEffect, useState } from "react";
import failed from "../../../assets/failed.svg";
import "./index.css";

const tags = ["Review Answers", "Retake Quiz"];

const QuizResult = ({
  submissionData,
  setSubmissionData,
  questionData,
  setScreen,
}) => {
  const [activeTag, setActiveTag] = useState("Review Answers");

  const isPass = submissionData?.score >= 75;

  useEffect(() => {
    if (activeTag === "Retake Quiz") {
      if (submissionData?.attempt_number === submissionData?.total_attempts) {
        alert(
          `You have already attempted this quiz ${submissionData?.total_attempts} times.`
        );
      } else {
        setScreen("quiz-week");
      }
    }
  }, [activeTag]);

  return (
    <>
      <div className="quiz-result md:!p-8 !p-5">
        <div className="flex flex-wrap -mx-4 items-center">
          <div className="xl:w-3/12 lg:w-4/12 w-full px-4 lg:text-start text-center">
            {submissionData?.score >= 75 ? (
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
              <span
                className="percentage"
                style={{ color: !isPass ? "red" : "" }}
              >
                {Math.round(submissionData?.score)}%
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
                    {submissionData?.attempt_number}
                  </div>
                  <div className="lable text-gray-600 text-base font-normal">
                    Attempt
                  </div>
                </div>
                <div className="xl:w-[20%] lg:w-[33.333333%] md:w-[20%] sm:w-[33.333333%] w-[50%] px-2 text-center">
                  <div className="value text-gray-700 text-[25px] font-bold">
                    {submissionData?.total_questions}
                  </div>
                  <div className="lable text-gray-600 text-base font-normal">
                    Total Questions
                  </div>
                </div>
                <div className="xl:w-[20%] lg:w-[33.333333%] md:w-[20%] sm:w-[33.333333%] w-[50%] px-2 text-center">
                  <div className="value text-gray-700 text-[25px] font-bold">
                    {submissionData?.right_answers}
                  </div>
                  <div className="lable text-gray-600 text-base font-normal">
                    Correct Answers
                  </div>
                </div>
                <div className="xl:w-[20%] lg:w-[33.333333%] md:w-[20%] sm:w-[33.333333%] w-[50%] px-2 text-center">
                  <div className="value text-gray-700 text-[25px] font-bold">
                    {submissionData?.wrong_answers}
                  </div>
                  <div className="lable text-gray-600 text-base font-normal">
                    Wrong Answers
                  </div>
                </div>
                <div className="xl:w-[20%] lg:w-[33.333333%] md:w-[20%] sm:w-[33.333333%] w-[50%] px-2 text-center">
                  <div className="value text-gray-700 text-[25px] font-bold">
                    {submissionData?.score}%
                  </div>
                  <div className="lable text-gray-600 text-base font-normal">
                    Score
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="quiz-result-body">
          <div className="quiz-result-body-top">
            <div className="tags">
              {tags.map((item) => (
                <div
                  key={item}
                  className={`${
                    item === activeTag ? "active-tag" : "tag"
                  } mr-2`}
                  onClick={() => setActiveTag(item)}
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button
              className="exit-btn"
              onClick={() => {
                setScreen("");
                window.location.reload();
              }}
            >
              <span>Exit</span>
            </button>
          </div>
          {activeTag === "Review Answers" && (
            <div className="quiz-result-body-bottom">
              {questionData?.data &&
                questionData?.data.length > 0 &&
                questionData?.data.map((item) => {
                  const {
                    id,
                    question,
                    option1,
                    option2,
                    option3,
                    option4,
                    answer,
                    userAnswer,
                  } = item;

                  // const getButtonClass = (option) => {
                  //   if (userAnswer !== '' && userAnswer !== answer) {
                  //       return "quiz-button active-quiz-button-wrong";
                  //   } else if (userAnswer !== ''  && userAnswer === answer) {
                  //     return "quiz-button active-quiz-button";
                  //   } else  {
                  //     return "quiz-button active-quiz-button-NotAttempt";
                  //   }
                  // };

                  const getButtonClass = (option) => {
                    if (userAnswer === option) {
                      return answer === option
                        ? "quiz-button active-quiz-button"
                        : "quiz-button active-quiz-button-wrong";
                    } else if (answer === option) {
                      return "quiz-button active-quiz-button";
                    } else {
                      return "quiz-button active-quiz-button-NotAttempt";
                    }
                  };

                  return (
                    <div key={id} className="answer-body">
                      <div>
                        <span className="text-gray-700 text-base font-medium pr-1">
                          {id}.
                        </span>
                        <span className="text-gray-700 text-base font-medium">
                          {question}
                        </span>
                      </div>
                      <div className="flex question-action question-action-row">
                        {[option1, option2, option3, option4].map(
                          (option, index) => {
                            const optionKey = `option${index + 1}`;
                            return (
                              <div>
                                <button
                                  className={`${getButtonClass(optionKey)}`}
                                >
                                  <span className="box">
                                    {String.fromCharCode(65 + index)}
                                  </span>
                                  <span className="btn-text">{option}</span>
                                </button>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizResult;
