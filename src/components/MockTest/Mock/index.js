import React, { useContext, useEffect, useState } from "react";
import { Grid, Button } from "@mui/material"; // Import Button component
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { studentContext } from "../../Student/context";
import { useCookie } from "react-use";
import DemoImage from "../../../assets/mock-test2.svg";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL } from "../../ApiConfig";

const Mock = ({ setScreen, courseId, setWeek, selectedCourseIdForMock }) => {
  const [loggedIn] = useCookie("maang");
  const [course, setCourse] = useState([]);
  const [showHello, setShowHello] = useState(false);
  const {
    setSelectedWeekId,
    selectedWeekIdForMock,
    setSelectedWeekIdForMock,
    setSelectNavWeekForMock,
  } = useContext(studentContext);

  // State to manage visible items
  const [visibleItems, setVisibleItems] = useState(8);

  const activeWeek = 1;

  const fetchData = async () => {
    if (loggedIn) {
      const apiUrl = `${ApiBaseURL}test-management/mock-week-lock/?course_id=${
        selectedCourseIdForMock || courseId
      }`;
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
        setCourse(data.main_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData(courseId);
  }, [loggedIn]);

  const { setIsShowMiniSidebar } = useContext(studentContext);

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
        <div className="bg-course">
          <div className="bg-course-content">
            <img src="/images/Practice/lock.svg" alt="lock icon" />
            <span>{weekText}</span>
          </div>
          {children}
        </div>
      );
    }

    return children;
  };

  const onButtonClickHandler = (week) => {
    setIsShowMiniSidebar(true);
    setScreen("start");
    setWeek(week);
    setSelectedWeekId(week);
    setSelectNavWeekForMock(week);
  };

  const checkIsDisable = (week) => {
    const currentIndex = course.findIndex((c) => c.week === week);
    const isPreviousWeekCompleted =
      currentIndex > 0 &&
      course[currentIndex - 1].completed === course[currentIndex - 1].total;
    const previousWeekCompletionPercentage =
      currentIndex > 0
        ? course[currentIndex - 1].total !== 0
          ? (course[currentIndex - 1].completed /
              course[currentIndex - 1].total) *
            100
          : 0
        : 0;
    const isPreviousWeekCompletionPercentageGreaterThan50 =
      previousWeekCompletionPercentage >= 50;
    const isLayoutDisabled =
      !isPreviousWeekCompleted &&
      !isPreviousWeekCompletionPercentageGreaterThan50;
    return isLayoutDisabled;
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

  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {course?.slice(0, visibleItems).map((courseInfo, idx) => {
          const {
            week,
            name,
            img: path,
            total,
            completed,
            total_attempt,
            max_attempt,
            max_score,
            status,
            isDisabled,
            condition,
          } = courseInfo;
          const activeClass =
            week === activeWeek ? "active-course-header-box" : "";
          const weekText = `Week ${week}`;
          const totalCompleted = ((completed * 100) / total).toFixed(0);

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
              <Layout weekText={weekText} isDisabled={isDisabled}>
                <div
                  className={`relative course-card ${
                    isDisabled ? "course-disabled-card" : ""
                  }`}
                >
                  <div className="relative z-10">
                    <div className="course-header">
                      <div className={`course-header-box ${activeClass}`}>
                        <span>{weekText} </span>
                      </div>
                    </div>
                    <div className="course-body">
                      {path ? (
                        <img alt={weekText} src={DemoImage} />
                      ) : (
                        <img alt={weekText} src={DemoImage} />
                      )}
                      <span className="title">{name}</span>
                      <div className="course-progress">
                        <div
                          className="course-result"
                          style={{
                            background: `url(/images/Practice/rectangle.svg)`,
                          }}
                        >
                          <span className="completed">{total_attempt}</span>
                          <span className="total">{max_attempt}</span>
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
                    <div className="course-footer">
                      <button
                        className={
                          status === "Start Now" || status === "Retake"
                            ? "btn-start"
                            : "btn-completed"
                        }
                        title={condition ? condition : ""}
                        onClick={() => {
                          if (status === "Start Now" || status === "Retake") {
                            onButtonClickHandler(week);
                          }
                        }}
                        disabled={status === "Start Now" && condition}
                      >
                        {status}
                      </button>
                    </div>
                  </div>
                </div>
              </Layout>
            </Grid>
          );
        })}
      </Grid>
      {course.length > visibleItems && ( // Render Load More button if there are more items
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button
            variant="contained"
            onClick={() => setVisibleItems((prev) => prev + 8)}
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

export default Mock;
