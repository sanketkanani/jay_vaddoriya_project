import { Grid, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useCookie } from "react-use";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
// import { studentContext } from "../../Student/context";
import DemoImage from "../../../assets/mock-test1.svg";
import { useNavigate } from "react-router-dom";
import { ApiBaseURL } from "../../../services/config/Endpoints";
import { freeContext } from "../../free/context";
// import { ApiBaseURL } from "../../ApiConfig";

const Course = ({ setScreen, courseId, setWeek }) => {
  const [loggedIn] = useCookie("maang");
  const [course, setCourse] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [loading, setLoading] = useState(false); // Loading state for the spinner
  const navigate = useNavigate();
  const activeWeek = 1;

  const fetchData = async () => {
    setLoading(true); // Set loading to true when fetching starts
    if (loggedIn) {
      const apiUrl = `${ApiBaseURL}free-course-management/syllabus-list-practice-question/?course_id=${courseId}`;
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
        setCourse(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when fetching completes (success or error)
      }
    }
  };

  useEffect(() => {
    fetchData(courseId);
  }, [loggedIn, courseId]);

  const {
    setIsShowMiniSidebar,
    setSelectedQsIdForPractice,
    setSelectedWeekIdForPractice,
  } = useContext(freeContext);

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

  const onButtonClickHandler = (number) => {
    navigate("/free/practice/" + number + "/Problem", {
      state: { number },
    });
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

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + 8);
  };

  return (
    <>
      {/* Render spinner when loading is true */}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {" "}
          <CircularProgress />{" "}
        </div>
      )}
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {course &&
          course.length > 0 &&
          course.slice(0, itemsToShow).map((courseInfo, idx) => {
            const {
              week,
              name,
              img: path,
              total,
              completed,
              status,
              is_disable,
              message,
              q_id,
              number,
              right_answer,
              total_questions,
              is_lock,
              id,
            } = courseInfo;
            const activeClass =
              week === activeWeek ? "active-course-header-box" : "";
            const weekText = `Section ${week}`;
            const sectionText = `Section ${number}`;
            const totalCompleted = (
              (right_answer * 100) /
              total_questions
            ).toFixed(0);

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <Layout weekText={sectionText} isDisabled={is_disable}>
                  <div
                    className={`course-card ${
                      is_disable ? "course-disabled-card" : ""
                    }`}
                  >
                    <div className="course-header">
                      <div className={`course-header-box ${activeClass}`}>
                        <span>{sectionText}</span>
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
                          <span className="completed">{right_answer}</span>
                          <span className="total">{total_questions}</span>
                        </div>
                        <div className="course-progress-bar">
                          <span>Questions Completed</span>
                          <div className="course-progress-text">
                            {/* {alert(totalCompleted)} */}
                            <BorderLinearProgress
                              variant="determinate"
                              value={
                                totalCompleted !== "NaN" ? totalCompleted : 0
                              }
                            />
                            <span className="percentage">{`${
                              totalCompleted !== "NaN" ? totalCompleted : 0
                            }%`}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="course-footer">
                      <button
                        className={is_lock ? "btn-completed" : "btn-start"}
                        onClick={() => {
                          onButtonClickHandler(id);
                          setSelectedQsIdForPractice(q_id);
                          setSelectedWeekIdForPractice(week);
                        }}
                        title={message ? message : ""}
                        disabled={is_lock && message}
                      >
                        {is_lock ? "Coming Soon" : "Start Now"}
                      </button>
                    </div>
                  </div>
                </Layout>
              </Grid>
            );
          })}
      </Grid>
      {course && course.length > 0 && itemsToShow < course.length && (
        <div
          style={{ textAlign: "center", marginTop: "20px" }}
          className="course-footer"
        >
          <button
            onClick={handleLoadMore}
            className="load-more-btn btn-start"
            style={{ width: "200px" }}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default Course;
