import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { useCookie } from "react-use";
import failed from "../../../assets/failed.svg";
import { ApiBaseURL } from "../../../services/config/Endpoints";
import { freeContext } from "../../free/context";
// import { ApiBaseURL } from "../../ApiConfig";
import { useLocation, useNavigate } from "react-router-dom";

const tags = ["Review Answers", "Retake Mock"];
const FreeMockResult = () => {
  const [loggedIn] = useCookie("maang");
  const [course, setCourse] = useState([]);
  const {
    timerData,
    setTimerData,
    resultData,
    setResultData,
    setIsShowMiniSidebar,
    isShowMiniSidebar,
    setScreen,
  } = useContext(freeContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId } = location.state || {}; // Default to empty object if state is undefined

  const handleExit = () => {
    // console.log("button clicked!");
    navigate("/free/mock-test");
  };

  const onButtonClickHandler = (number) => {
    setScreen("start-mock");
    navigate("/free/mock-test/" + number + "/Problem", {
      state: { number },
    });
  };

  return (
    <div className="quiz-result md:!p-8 !p-5">
      <div className="flex flex-wrap -mx-4">
        <div className="quiz-result-header">
          <div className="xl:w-3/12 lg:w-4/12 w-full px-4 lg:text-start text-center">
            {/* <img src="/images/Quiz/quiz-success.svg" alt="bg-done icon" className="inline" /> */}
            {course?.max_score >= course?.db_max_score ? (
              <img
                src="/images/Quiz/quiz-success.svg"
                alt="bg-done icon"
                className="inline"
              />
            ) : (
              <img
                src={failed}
                alt="failed icon"
                className="inline"
                style={{ transform: "scale(1.2)" }}
              />
            )}
          </div>
          <div className="xl:w-9/12 lg:w-8/12 w-full px-4">
            <div className="quiz-result-header-content">
              <div className="quiz-result-header-content-top">
                <div className={`congratulation-box pass`}>
                  <span
                    className="congratulation-text"
                    style={{ fontSize: "30px" }}
                  >
                    {/* {course?.max_score >= course?.db_max_score ? (
                      "Congratulations"
                    ) : (
                      <span
                        style={{
                          color:
                            course?.max_score >= course?.db_max_score
                              ? "green"
                              : "red",
                        }}
                      >
                        Sorry
                      </span>
                    )} */}
                  </span>
                  <span
                    className="congratulation-message"
                    style={{ fontSize: "15px", padding: "0px" }}
                  >
                    {1 >= 2
                      ? "You are amazing! Pass with"
                      : "You are not passed. Retake the Mock Test."}
                  </span>
                </div>
                <span
                  className="percentage"
                  style={{
                    color: 1 >= 2 ? " " : "red",
                  }}
                >
                  {Math.round(resultData.score)}%
                </span>
              </div>
              <div className="quiz-result-header-content-bottom">
                <div className="quiz-result-text">
                  <div className="divider">
                    <span>Summary or Results</span>
                  </div>
                </div>
                <div className="quiz-summary-or-result">
                  <div className="quiz-summary-box box-50">
                    <span className="value">{resultData?.attempt_number}</span>
                    <span className="lable">Attempt</span>
                  </div>
                  <div className="quiz-summary-box box-50">
                    <span className="value">{resultData?.total_questions}</span>
                    <span className="lable">Total Questions</span>
                  </div>
                  <div className="quiz-summary-box box-50">
                    <span className="value">{resultData?.right_answers}</span>
                    <span className="lable">Correct Answers</span>
                  </div>
                  <div className="quiz-summary-box box-50">
                    <span className="value">{resultData?.worng_answers}</span>
                    <span className="lable">Wrong Answers</span>
                  </div>
                  <div className="quiz-summary-box quiz-summary-box-last">
                    <span className="value">{resultData?.score}%</span>
                    <span className="lable">Score</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "15px",
                  justifyContent: "space-between",
                }}
              >
                <button
                  className="exit-btn"
                  onClick={() => {
                    setIsShowMiniSidebar(!isShowMiniSidebar);
                    onButtonClickHandler(sectionId);
                  }}
                  style={{ background: "#74dfba1a" }}
                >
                  <span style={{ color: "green" }}>Retake</span>
                </button>
                <button className="exit-btn" onClick={handleExit}>
                  <span>Exit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeMockResult;
