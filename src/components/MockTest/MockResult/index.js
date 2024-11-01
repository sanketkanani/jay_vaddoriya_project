import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useCookie } from "react-use";
import failed from "../../../assets/failed.svg";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL } from "../../ApiConfig";

const tags = ["Review Answers", "Retake Mock"];
const MockResult = ({
  setScreen,
  courseId,
  setWeek,
  week,
  setIsShowMiniSidebar,
  isShowMiniSidebar,
}) => {
  const [loggedIn] = useCookie("maang");
  const [course, setCourse] = useState([]);

  const fetchData = async () => {
    if (loggedIn) {
      const apiUrl = `${ApiBaseURL}test-management/mock-week-lock/?course_id=${courseId}&week_id=${week}`;
      const token = JSON.parse(loggedIn).token;

      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCourse(data.week_result[0]);
        // console.log("COURSE PASSS PERCENTAGE------>",course?.db_max_score );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  //Added this Api call
  useEffect(() => {
    fetchData(courseId);
  }, [loggedIn, courseId, week]);

  const handleExit = () => {
    // console.log("button clicked!");
    window.location.reload();
  };

  return (
    <div className="quiz-result">
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
                    {course?.max_score >= course?.db_max_score ? (
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
                    )}
                  </span>
                  <span
                    className="congratulation-message"
                    style={{ fontSize: "15px", padding: "0px" }}
                  >
                    {course?.max_score >= course?.db_max_score
                      ? "You are amazing! Pass with"
                      : "You are not passed. Retake the Mock Test."}
                  </span>
                </div>
                <span
                  className="percentage"
                  style={{
                    color:
                      course?.max_score >= course?.db_max_score ? " " : "red",
                  }}
                >
                  {Math.round(course.max_score)}%
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
                    <span className="value">{course.total_attempt}</span>
                    <span className="lable">Attempt</span>
                  </div>
                  <div className="quiz-summary-box box-50">
                    <span className="value">{course.total}</span>
                    <span className="lable">Total Questions</span>
                  </div>
                  <div className="quiz-summary-box box-50">
                    <span className="value">{course.correct_answer}</span>
                    <span className="lable">Correct Answers</span>
                  </div>
                  <div className="quiz-summary-box box-50">
                    <span className="value">{course.wrong_answer}</span>
                    <span className="lable">Wrong Answers</span>
                  </div>
                  <div className="quiz-summary-box quiz-summary-box-last">
                    <span className="value">{course.max_score}%</span>
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
                    setScreen("start");
                    setIsShowMiniSidebar(!isShowMiniSidebar);
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

export default MockResult;
