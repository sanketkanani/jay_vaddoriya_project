import { Grid, Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { studentContext } from "../../Student/context";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

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

const QuizCards = ({ weeks, setWeekId, attempt, setWeek, attemptData }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showHello, setShowHello] = useState(false);
  const { setSelectedWeekId, selectedWeekIdForQuiz, setSelectedWeekIdForQuiz } =
    useContext(studentContext);
  const [visibleWeeks, setVisibleWeeks] = useState(8);

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const getButtonClass = (status) => {
    if (status === "Fail") {
      return "btn-fail";
    }
    if (status === "Pass" || status === "Lock" || status === "Comming Soon") {
      return "btn-pass";
    }
    if (status === "Retake") {
      return "btn-start-now";
    }
    return "btn-start-now";
  };

  const loadMoreWeeks = () => {
    setVisibleWeeks((prev) => prev + 8);
  };

  useEffect(() => {
    weeks.forEach((weekItem) => {
      const { id } = weekItem;
      if (selectedWeekIdForQuiz === String(id)) {
        setShowHello(true);
        setTimeout(() => {
          setShowHello(false);
          setSelectedWeekIdForQuiz("");
        }, 10000);
      }
    });
  }, [selectedWeekIdForQuiz, weeks]);

  return (
    <>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className="quiz-card-body sm:gap-y-0 gap-y-3"
      >
        {weeks &&
          weeks.length > 0 &&
          weeks.slice(0, visibleWeeks).map((weekItem) => {
            const {
              id,
              week,
              url,
              status,
              condition,
              stud_attempt,
              total_attempt,
              max_score,
              isDisabled,
            } = weekItem;
            const weekText = `Week ${week}`;
            const btnClass = getButtonClass(status);
            const shouldShowHello =
              showHello && selectedWeekIdForQuiz === String(id);

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                <Layout weekText={weekText} isDisabled={isDisabled}>
                  <div
                    className={
                      isDisabled ? "bg-quiz-card-disabled" : "quiz-box-card"
                    }
                  >
                    <div className="relative p-2">
                      <div className="h-8 rounded-t-2xl bg-[#35C69D] absolute top-0 left-0 right-0"></div>
                      <div className="quiz-card relative z-[1]">
                        {shouldShowHello && (
                          <div className="absolute inset-0 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#35c69d,0_0_15px_#35c69d,0_0_30px_#35c69d]">
                            {/* Display "hello" here */}
                            {/* hello */}
                          </div>
                        )}
                        <div className="relative z-10">
                          <div className="test-header">
                            <div className="px-2.5 py-1 bg-sky-500 bg-opacity-10 rounded-tl-[10px] rounded-br-[10px] justify-center items-center gap-2.5 inline-flex text-sky-500 text-sm font-medium">
                              <span>{weekText}</span>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="text-center">
                              <img
                                src={url}
                                alt={weekText}
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
                                  <span className="completed">
                                    {stud_attempt}
                                  </span>
                                  <span className="total">
                                    {total_attempt && total_attempt.length > 0
                                      ? total_attempt[0].max_num_of_attempts
                                      : "N/A"}
                                  </span>
                                </div>
                                <div className="course-progress-bar">
                                  <span>Attempts</span>
                                  <div className="course-progress-text">
                                    <span className="percentage">
                                      <span>Max Score</span>
                                      {` ${max_score}%`}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="quiz-foolter p-2">
                            <button
                              onClick={() => {
                                if (
                                  status === "Start now" ||
                                  status === "Retake"
                                ) {
                                  setWeekId(id);
                                  setSelectedWeekId(id);
                                  setWeek(week);
                                }
                              }}
                              className={btnClass}
                              title={
                                status === "Lock" || status === "Start now"
                                  ? condition
                                  : ""
                              }
                              disabled={status === "Start now" && condition}
                            >
                              {status}
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
      {visibleWeeks < weeks.length && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            variant="contained"
            onClick={loadMoreWeeks}
            className="load-more-btn btn-start"
            style={{ width: "200px", backgroundColor: "#35c69d" }}
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default QuizCards;
