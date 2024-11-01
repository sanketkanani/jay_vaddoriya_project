import React, { useContext, useState } from "react";
import { Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { freeContext } from "../../free/context";

const Layout = ({ children, isDisabled, weekText }) => {
  if (isDisabled) {
    return (
      <div>
        <div className="bg-quiz-card">
          <div className="bg-test-content">
            <img src="/images/Practice/lock.svg" alt="lock icon" />
            <span>{weekText}</span>
          </div>
          {children}
        </div>
      </div>
    );
  }
  return children;
};

const QuizCards = ({
  screen,
  setScreen,
  courseData,
  setCourseId,
  courseId,
  fetchQuizQuestionList,
}) => {
  const [visibleWeeks, setVisibleWeeks] = useState(8);
  const { selectedCourseIdForQuiz, setSelectedCourseIdForQuiz } =
    useContext(freeContext);
  const loadMoreWeeks = () => {
    setVisibleWeeks((prev) => prev + 8);
  };

  return (
    <>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className="quiz-card-body sm:gap-y-0 gap-y-3"
      >
        {courseData &&
          courseData.length > 0 &&
          courseData.slice(0, visibleWeeks).map((item) => {
            const {
              id,
              name,
              is_disable,
              attempt,
              maximum_attempts,
              score,
              message,
              is_lock,
            } = item;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                <Layout weekText={name} isDisabled={is_disable}>
                  <div
                    className={
                      is_disable ? "bg-quiz-card-disabled" : "quiz-box-card"
                    }
                  >
                    <div className="relative p-2">
                      <div className="h-8 rounded-t-2xl bg-[#35C69D] absolute top-0 left-0 right-0"></div>
                      <div className="quiz-card relative z-[1]">
                        <div className="relative z-10">
                          <div className="test-header">
                            <div className="px-2.5 py-1 bg-sky-500 bg-opacity-10 rounded-tl-[10px] rounded-br-[10px] justify-center items-center gap-2.5 inline-flex text-sky-500 text-sm font-medium">
                              <span>{name}</span>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="text-center">
                              <img
                                src={
                                  "https://www.maangcareers.com/images/Quiz/quiz2.svg"
                                }
                                alt={name}
                                className="inline"
                              />
                            </div>
                            <div>
                              <div className="course-progress">
                                <div
                                  className="course-result"
                                  style={{
                                    background: `url(/images/Practice/rectangle.svg)`,
                                  }}
                                >
                                  <span className="completed">{attempt}</span>
                                  <span className="total">
                                    {maximum_attempts
                                      ? maximum_attempts
                                      : "N/A"}
                                  </span>
                                </div>
                                <div className="course-progress-bar">
                                  <span>Attempts</span>
                                  <div className="course-progress-text">
                                    <span className="percentage">
                                      <span>Max Score</span>
                                      {` ${score}%`}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="quiz-foolter p-2">
                            <button
                              className={'btn-start-now'}
                              title={is_lock && message ? message : ""}
                              disabled={is_lock && message}
                              onClick={() => {
                                // alert(id)
                                setCourseId(id);
                                // setSelectedCourseIdForQuiz(id);
                                fetchQuizQuestionList(id)
                              }}
                            >
                              {is_lock ? 'Lock' : 'Start now'}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="h-8 rounded-b-2xl bg-[#35C69D] absolute bottom-0 left-0 right-0"></div>
                    </div>
                  </div>
                </Layout>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default QuizCards;
