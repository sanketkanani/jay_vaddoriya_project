import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useCookie } from "react-use";
import "./index.css";
import { studentContext } from "../Student/context";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { ApiBaseURL } from "../../services/config/Endpoints";
import { freeContext } from "../free/context";
import QuizCards from "./QuizCards";
import QuizWeek from "./QuizWeek";
import QuizResult from "./QuizResult";

const FreeQuiz = () => {
  const {
    screen,
    setScreen,
    selectedCourseIdForQuiz,
    setSelectedCourseIdForQuiz,
    questionData,
    setQuestionData,
    submissionData,
    setSubmissionData,
  } = useContext(freeContext);
  const [loggedIn] = useCookie("maang");
  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [syllabus_id , setSyllabusId] = useState('');
  useEffect(() => {
    if (loggedIn) {
      const apiUrl = `${ApiBaseURL}free-course-management/student-free-course-list/`;
      const token = JSON.parse(loggedIn).token;
      fetch(apiUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("************** hello data", data);
          const courseNames = data.data.map((course) => ({
            id: course.id,
            name: course.name,
          }));
          setTag(courseNames);
          const defaultCourseId =
            courseNames.length > 0 ? courseNames[0].id : null;
          setSelectedCourseId(defaultCourseId);
          setSelectedCourseIdForQuiz(defaultCourseId);
          toggleCourse(defaultCourseId);
        });
    }
  }, [loggedIn]);

  const toggleCourse = async (courseId) => {
    if (loggedIn) {
      const token = JSON.parse(loggedIn).token;

      try {
        const toggleResponse = await fetch(
          `${ApiBaseURL}free-course-management/syllabus-list/?course_id=${
            selectedCourseIdForQuiz || courseId
          }`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        const toggleData = await toggleResponse.json();
        console.log("****** toggle data", toggleData);
        const courseData = toggleData.data;
        setCourseData(courseData);
        setCourseId(courseId);
      } catch (error) {
        console.error(`Error toggling course ${courseId}:`, error);
      }
    }
  };

  const fetchQuizQuestionList = async (id) => {
    if (loggedIn) {
      setSyllabusId(id);
      const token = JSON.parse(loggedIn).token;
      try {
        const QsResponse = await fetch(
          `${ApiBaseURL}free-course-management/syllabus-question-list/?syllabus_id=${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        const qsData = await QsResponse.json();
        if (qsData && qsData.status === 200) {
          setQuestionData(qsData);
          setScreen("quiz-week");
        }

        console.log("****** question data", qsData);
      } catch (error) {
        console.error(`Error toggling course ${courseId}:`, error);
      }
    }
  };

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
    setSelectedCourseIdForQuiz(courseId);
  };

  useEffect(() => {
    toggleCourse(selectedCourseId);
  }, [selectedCourseId]);

  const commonContent = (
    <div className="quiz-week">
      {screen !== "quiz-week" && screen !== "quiz-result" && (
        <div className="quiz-cards-container">
          {courseData && courseData.length > 0 && (
            <QuizCards
              screen={screen}
              setScreen={setScreen}
              courseData={courseData}
              setCourseId={setCourseId}
              courseId={courseId}
              fetchQuizQuestionList={fetchQuizQuestionList}
            />
          )}
        </div>
      )}
      {screen === "quiz-week" && (
        <QuizWeek
          setScreen={setScreen}
          screen={screen}
          selectedCourseId={selectedCourseId}
          questionData={questionData}
          setQuestionData={setQuestionData}
          submissionData={submissionData}
          setSubmissionData={setSubmissionData}
          courseId={syllabus_id}
        />
      )}
      {screen === "quiz-result" && (
        <div>
          <QuizResult
            submissionData={submissionData}
            setSubmissionData={setSubmissionData}
            questionData={questionData}
            setScreen={setScreen}
          />
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      );
    } else {
      return (
        <div className="p-5">
          <div className="quiz-week">
            {screen === "" && (
            <div className="gap-1 overflow-x-scroll hide-scrollbar ">
                <div className="course-tags">
                {tag.map(({ id, name }) => (
                  <div
                    key={name}
                    className={id === selectedCourseId ? "active-tag" : ""}
                    onClick={() => {
                      handleCourseClick(id);
                    }}
                    style={{ width: "max-content" }}
                  >
                    <span>{name}</span>
                  </div>
                ))}
                </div>
              </div>
            )}
            {commonContent}
          </div>
        </div>
      );
    }
  };

  return <>{renderContent()}</>;
};

export default FreeQuiz;
