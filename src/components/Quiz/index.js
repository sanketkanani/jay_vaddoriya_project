import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useCookie } from "react-use";
import "./index.css";
import QuizCards from "./QuizCards";
import QuizWeek from "./QuizWeek";
import QuizResult from "./QuizResult";
import { studentContext } from "../Student/context";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Student from "../Student";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { ApiBaseURL } from "../../services/config/Endpoints";
// import { ApiBaseURL } from "../ApiConfig";

const quizList = [
  {
    id: 1,
    question:
      "Which Gas is the Lightest? Lorem ipsum dolor sit amet consectetur. Eu sed quis at natoque quam non",
    answer: "Hydrogen",
    userAnswer: "",
    status: "not-attempted",
    options: {
      a: "Hydrogen",
      b: "Helium",
      c: "Ammonia",
      d: "Oxygen",
    },
  },
  {
    id: 2,
    question: `The abbreviation ‘fob’ stands for`,
    answer: "Free of Bargain",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "Fellow of Britain",
      b: "Free of Bargain",
      c: "Free on Board",
      d: "None of these",
    },
  },
  {
    id: 3,
    question: "The spectrum of helium is similar to",
    answer: "Li",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "H",
      b: "Mg",
      c: "Li",
      d: "He",
    },
  },
  {
    id: 4,
    question: "The M.P. and B.P. are very low for ?",
    answer: "He",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "Ne",
      b: "He",
      c: "Kr",
      d: "Ar",
    },
  },
  {
    id: 5,
    question: `Which of the following is not a state of India?`,
    answer: "Vrindachal",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "Goa",
      b: "Jharkhand",
      c: "Chattisgarh",
      d: "Vrindachal",
    },
  },
  {
    id: 6,
    question: "Viscosity is very low for?",
    answer: "He",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "Ar",
      b: "Xe",
      c: "He",
      d: "Kr",
    },
  },
  {
    id: 7,
    question: `Which of the following options is correct for the given statement:
      The most abundant elements in the universe are`,
    answer: " hydrogen and helium",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "neon and argon",
      b: " hydrogen and helium",
      c: " aluminium and copper",
      d: "oxygen and nitrogen",
    },
  },
  {
    id: 8,
    question: "Which of the following is an Island country?",
    answer: "Maldives",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "Maldives",
      b: "Peru",
      c: "Oman",
      d: "Yemen",
    },
  },
  {
    id: 9,
    question: "A hot air balloon rises because it is filled with a gas :",
    answer: "less dense than air",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "denser than air",
      b: "less dense than air",
      c: "as dense as air",
      d: "the given statement is wrong",
    },
  },
  {
    id: 10,
    question:
      "Which one has the higher refractive index, cooler air or hotter air?",
    answer: "cooler",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "hotter",
      b: "cooler",
      c: "same for both",
      d: "cannot be determined.",
    },
  },
  {
    id: 11,
    question: `The refractive index of water with respect to air is
      4
      /
      3
       . Calculate the refractive index of air with respect to water.`,
    answer: "3/4",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "3/4",
      b: "4/3",
      c: "3/2",
      d: "2/3",
    },
  },
  {
    id: 12,
    question: "Which among the following is the lightest gas?",
    answer: "Neon",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "Neon",
      b: "Carbon dioxide",
      c: "Oxygen",
      d: "Hydrogen",
    },
  },
  {
    id: 13,
    question: `
      Which god is also known as ‘Gauri Nandan’?`,
    answer: "Indra",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "Agni",
      b: "Indra",
      c: "Hanuman",
      d: "Ganesha",
    },
  },
  {
    id: 14,
    question: `
    Which city is known as Pink City in India?`,
    answer: "Banglore",
    userAnswer: "",
    status: "not-attempted",
    options: {
      a: "Banglore",
      b: "Jaipur",
      c: "Surat",
      d: "Pune",
    },
  },
  {
    id: 15,
    question: `Which of the following musical instruments is NOT of foreign origin?`,
    answer: "Sitar",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "Tabla",
      b: "Flute",
      c: "Sitar",
      d: "Violin",
    },
  },
  {
    id: 16,
    question: "Where in India Gate located?",
    answer: "Mumbai",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "Mumbai",
      b: "Agra",
      c: "Punjab",
      d: "Delhi",
    },
  },
  {
    id: 17,
    question: "How many states are there in India?",
    answer: "29",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "28",
      b: "29",
      c: "31",
      d: "32",
    },
  },
  {
    id: 18,
    question: "How many religions are there in India?",
    answer: "8",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "6",
      b: "7",
      c: "8",
      d: "9",
    },
  },
  {
    id: 19,
    question: "Current Railway Minister of India is",
    answer: "Piyush Goyal",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "Mamta Banarjee",
      b: "Ram Vilash",
      c: "Ashwini Vaishnaw",
      d: "Piyush Goyal",
    },
  },
  {
    id: 20,
    question: `
      Which city is known as the "Silicon Valley Of India"?`,
    answer: "Delhi",
    status: "not-attempted",
    userAnswer: "",
    options: {
      a: "Delhi",
      b: "Mumbai",
      c: "Chennai",
      d: "Bangalore",
    },
  },
];

const Quiz = (othersCourseId, othersWeekId) => {
  const { screen, setScreen } = useContext(studentContext);
  const [list, setList] = useState([]);
  const [loggedIn] = useCookie("maang");
  const [tag, setTag] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [weekId, setWeekId] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [qsId, setQsId] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [timerData, setTimerData] = useState([]);
  const [qsQuantity, setQsQuantity] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    end_date: "",
    start_date: "",
  });
  const [timerReset, setTimerReset] = useState(false);
  const [week, setWeek] = useState("");
  const [attemptData, setAttemptData] = useState(0);
  const [passPercentage, setPassPercentage] = useState(0);
  const {
    selectedWeekId,
    selectedCourseIdForQuiz,
    setSelectedCourseIdForQuiz,
  } = useContext(studentContext);
  const location = useLocation();
  const { userProps } = location.state || {};
  const [loading, setLoading] = useState(true);

  // console.log("othersCourseId", othersCourseId);
  // console.log("othersWeekId", othersWeekId);

  // Now you can use userProps in your component
  // useEffect(() => {
  //   if (userProps?.courseId && userProps?.weekId) {
  //     setSelectedCourseId(userProps?.courseId);
  //     setWeekId(userProps?.weekId);
  //     fetchWeekQuestions();
  //   }
  // }, [userProps]);

  const fetchTimerData = async () => {
    if (loggedIn) {
      try {
        const token = JSON.parse(loggedIn).token;
        const response = await fetch(
          `${ApiBaseURL}test-management/examquestiontimer/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const quizData = data.find(
          (item) => item.exam_field === "Quiz" && item.week === week
        );
        // console.log("quizDataaaaaaaaaaaaaa", quizData);
        if (quizData) {
          setTimerData(quizData.time);
          setAttemptData(quizData.max_num_of_attempts);
          setPassPercentage(quizData.week_pass_percent);
        }
      } catch (error) {
        console.error("Error fetching timer data:", error.message);
      }
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetchTimerData(); // Call the fetchTimerData function
    }
  }, [loggedIn, week, passPercentage]);

  const resetTimer = () => {
    setTimerReset(!timerReset);
  };

  // useEffect(() => {
  //   if (loggedIn) {
  //     const apiUrl =
  //       "http://192.168.0.119:7000/test-management/std-all-courese/";
  //     const token = JSON.parse(loggedIn).token;

  //     fetch(apiUrl, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const courseNames = data.Main_Course.map((course) => ({
  //           id: course.id,
  //           name: course.name,
  //         }));

  //         setTag(courseNames);
  //         const weeksData = data.week;
  //         console.log("Weeks Data--->", weeksData);
  //         setWeeks(weeksData);
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      const apiUrl =
        // "http://192.168.0.133:8000/test-management/std-all-courese/";
        `${ApiBaseURL}test-management/std-all-courese/`;
      const token = JSON.parse(loggedIn).token;

      fetch(apiUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const courseNames = data.Main_Course.map((course) => ({
            id: course.id,
            name: course.name,
          }));

          setTag(courseNames);
          const weeksData = data.week;
          setWeeks(weeksData);

          // Set the default selected course ID
          const defaultCourseId =
            courseNames.length > 0 ? courseNames[0].id : null;
          setSelectedCourseId(defaultCourseId);
          toggleCourse(defaultCourseId);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  // const token=`${JSON.parse(loggedIn).token}`;
  // alert(token);

  const toggleCourse = async (courseId) => {
    if (loggedIn) {
      const token = JSON.parse(loggedIn).token;

      try {
        const toggleResponse = await fetch(
          `${ApiBaseURL}test-management/std-all-week-lock/?course_id=${
            selectedCourseIdForQuiz || courseId
          }`,
          // `http://192.168.0.133:8000/test-management/std-all-week-lock/?course_id=${courseId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        const toggleData = await toggleResponse.json();
        // console.log(`Toggle response for course ${courseId}:`, toggleData);
        const weeksData = toggleData.week;
        setWeeks(weeksData);
        // console.log("Weekdata", weeks);
        setCourseId(courseId);

        // console.log();
      } catch (error) {
        console.error(`Error toggling course ${courseId}:`, error);
      }
    }
  };

  useEffect(() => {
    // console.log("courseID", selectedCourseId);
    // console.log("weekId", weekId);
    // console.log("selectedWeekId--", selectedWeekId);
    // console.log("WEEK Data-->", week);
  }, [selectedCourseId, weekId, selectedWeekId, week]);

  const fetchWeekQuestions = async () => {
    try {
      const token = JSON.parse(loggedIn).token;
      // console.log("TOKEN ", token);
      const response = await axios.get(
        // `http://192.168.0.133:8000/test-management/course-question/?course_id=${selectedCourseId}&week_id=${weekId}`,
        `${ApiBaseURL}test-management/course-question/?course_id=${selectedCourseId}&week_id=${weekId}`,
        // `${ApiBaseURL}test-management/course-question/?course_id=2&week_id=2`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const data = response.data.question_data;
      const attemptCount = response.data.previous_attempt.attempt;
      const quiz_id = response.data.quiz_id;
      // setList(data);
      // console.log("Attempt--=->",attempt);
      // setAttempt(attempt);
      // setQsId(quiz_id);
      // console.log("QAASSS", list);
      // console.log("Updated Week ID:", data);
      // setScreen("quiz-week");
      // setList(data, () => {
      //   console.log("QAASSS", list);
      // });
      const questionDataLength =
        typeof data === "object" ? Object.keys(data).length : 0;
      setQsQuantity((prevQsQuantity) => {
        // console.log("Previous questionDataLength:", prevQsQuantity);
        // console.log("New questionDataLength:", questionDataLength);
        return questionDataLength;
      });
      // console.log("qsQuantity:", qsQuantity);
      // console.log("DATA--->", data);
      setList(data);
      setAttempt(attemptCount);
      setQsId(quiz_id);
      setScreen("quiz-week");
    } catch (error) {
      console.error("Error fetching week questions:", error);
    }
  };
  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message, severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (selectedCourseId && weekId) {
      fetchWeekQuestions();
    }
  }, [selectedCourseId, weekId, attemptData, attempt, qsQuantity]);

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
    setSelectedCourseIdForQuiz(null);
    toggleCourse(courseId);
  };

  // console.log("ATTEMPT-->", attempt);

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
    }
    const commonContent = (
      <div className="quiz-week">
        {screen !== "quiz-week" && screen !== "quiz-result" && (
          <div className="quiz-cards-container">
            {weeks && weeks.length > 0 && (
              <QuizCards
                setScreen={setScreen}
                weeks={weeks}
                setWeekId={setWeekId}
                attempt={attempt}
                setWeek={setWeek}
                attemptData={attemptData}
              />
            )}
          </div>
        )}
        {screen === "quiz-week" && (
          <QuizWeek
            setScreen={setScreen}
            screen={screen}
            list={list}
            setList={setList}
            courseId={selectedCourseId}
            timerData={timerData}
            qsQuantity={qsQuantity}
            weekId={weekId}
            qsId={qsId}
            attempt={attempt}
            selectedCourseId={selectedCourseId}
          />
        )}
        {screen === "quiz-result" && (
          <div className="p-20">
            <QuizResult
              list={list}
              setList={setList}
              setScreen={setScreen}
              selectedCourseId={selectedCourseId}
              weekId={weekId}
              attempt={attempt}
              qsId={qsId}
              fetchWeekQuestions={fetchWeekQuestions}
              attemptData={attemptData}
              passPercentage={passPercentage}
            />
          </div>
        )}
      </div>
    );

    return (
      <>
        <div className="p-5">
          <div className="quiz-week">
            {screen === "" && (
              <div className="gap-1 overflow-x-scroll hide-scrollbar ">
                <div className="course-tags">
                  {tag.map(({ id, name }) => (
                    <div
                      key={name}
                      className={
                        id === (selectedCourseIdForQuiz || selectedCourseId)
                          ? "active-tag"
                          : ""
                      }
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
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleCloseSnackbar}
              severity="warning"
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </div>
      </>
    );
  };

  return <>{renderContent()}</>;
};

export default Quiz;
