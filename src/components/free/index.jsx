import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCookie } from "react-use";
import { freeContext } from "./context";
import "./index.css";
// import { ApiBaseURL } from "../ApiConfig";
// import Quiz from "../Quiz";
import SideBar from "../SideBar/SideBar";
import { ApiBaseURL } from "../../services/config/Endpoints";
import Header1 from "../Header1/Header1";

const FreeStudent = () => {
  const { pathname } = useLocation();
  const [loggedIn] = useCookie("maang");
  const isDisplayShortHeader =
    localStorage.getItem("isShowMiniSidebar") || "false";
  const isShow = isDisplayShortHeader === "true";
  const [isShowMiniSidebar, setIsShowMiniSidebar] = useState(isShow);
  const [screen, setScreen] = useState("");
  const [resetTimer, setResetTimer] = useState(false);
  const [timerData, setTimerData] = useState([]);
  const [enterWeek, setEnterWeek] = useState("");
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [selectedWeekId, setSelectedWeekId] = useState("");
  const [selectedCourseIdForProfile, setSelectedCourseIdForProfile] =
    useState(null);
  const [quizProgress, setQuizProgress] = useState(null);
  const [mockProgress, setMockProgress] = useState(null);
  const [selectedWeekIdForQuiz, setSelectedWeekIdForQuiz] = useState("");
  const [selectedWeekIdForMock, setSelectedWeekIdForMock] = useState("");
  const [selectedCourseIdForQuiz, setSelectedCourseIdForQuiz] = useState(null);
  const [selectedCourseIdForMock, setSelectedCourseIdForMock] = useState(null);
  const [selectedQsIdForPractice, setSelectedQsIdForPractice] = useState(null);
  const [selectedWeekIdForPractice, setSelectedWeekIdForPractice] =
    useState(null);
  const [selectNavWeekForMock, setSelectNavWeekForMock] = useState(null);
  const [questionData, setQuestionData] = useState({});
  const [submissionData, setSubmissionData] = useState({});
  const [mockQsIdList, setMockQsIdList] = useState([]);
  // const [tags, setTags] = useState([]);
  const [tag, setTag] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [resultData, setResultData] = useState({});
  const [batchInfo, setBatchInfo] = useState({
    batchId: null,
    courseName: "",
    startDate: null,
    endDate: null,
    totalClasses: 0,
    completedClasses: 0,
    remainingClasses: 0,
    classPercentage: "0.00",
    status: "Not Available",
  });

const [sectionId, setSectionId] = useState('');  
const [qsIdList, setQsIdList] = useState([]);
const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loggedIn) {
          // Get the token from your authentication mechanism
          const token = JSON.parse(loggedIn).token;

          const response = await fetch(
            `${ApiBaseURL}test-management/std-all-progress/`,
            {
              method: "GET",
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

          const data = await response.json();
          const quizDetails = data.main_data1.quiz_details;
          const mockDetails = data.main_data2.mock_details;
          const batchDetails = data.main_data3.attendance_details;

          if (quizDetails.length > 0) {
            const quizProgressArray = quizDetails.map((quiz) => ({
              name: quiz.name,
              avgScore: quiz.avg_score,
              remScore: quiz.rem_score,
              weekRunning: quiz.running_week,
              weekAttempt: quiz.attempted_weeks,
              runningWeek: quiz["running week"],
            }));
            setQuizProgress(quizProgressArray);
          }

          if (mockDetails.length > 0) {
            const mockProgressArray = mockDetails.map((mock) => ({
              name: mock.name,
              avgScore: mock.avg_score,
              remScore: mock.rem_score,
              weekRunning: mock.running_week,
              weekAttempt: mock.attempted_weeks,
              runningWeek: mock["running week"],
            }));
            setMockProgress(mockProgressArray);
          }
          if (batchDetails.length > 0) {
            const batchInfoArray = batchDetails.map((batch) => ({
              batchId: batch.batch_id || null,
              courseName: batch.course_name || "",
              startDate: batch.start_date || null,
              endDate: batch.end_date || null,
              totalClasses: batch.total_class || 0,
              completedClasses: batch.num_of_completed_classes || 0,
              remainingClasses: batch.remaining_classes || 0,
              classPercentage: batch.cls_percentage || "0.00",
              status: batch.status || "Not Available",
            }));
            setBatchInfo(batchInfoArray);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loggedIn]);

  // console.log("SCREEEEN ----------------->", screen);

  // useEffect(() => {
  //   const fetchTimerData = async () => {
  //     // console.log("selectedWeekId", typeof selectedWeekId);
  //     const regex = /free\/mock-test\/\d+\/Problem/;
  //     const isShowCountdown = regex.test(pathname);

  //     if (isShowCountdown && loggedIn) {
  //       try {
  //         const token = JSON.parse(loggedIn).token;
  //         const examField = screen === "quiz-week" ? "Quiz" : "Mock";
  //         // console.log("EXAMFIELDDDD----", examField);

  //         const response = await fetch(
  //           `${ApiBaseURL}test-management/examquestiontimer/`,
  //           {
  //             headers: {
  //               Authorization: `Token ${token}`,
  //             },
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //         }

  //         const data = await response.json();

  //         // console.log("DATAAAAAAAAAAAAAAAAAAAAAAAAAAAA", data);

  //         const quizData = data.find(
  //           (item) =>
  //             item.exam_field === examField &&
  //             item.week === selectedWeekId.toString()
  //         );

  //         // console.log("quizDataaaaaaaaaaaaaa", quizData);
  //         if (quizData) {
  //           const formattedTime = quizData.time || "00:00:00";
  //           setTimerData(formattedTime);
  //           // console.log("timerData", timerData);
  //         } else {
  //           console.log(
  //             `No ${examField.toLowerCase()} data found for the selected week`
  //           );
  //         }
  //       } catch (error) {
  //         console.error("Error fetching timer data:", error.message);
  //       }
  //     }
  //   };

  //   fetchTimerData();
  //   // console.log("selectedWeek ID", selectedWeekId);
  // }, [screen, loggedIn, selectedWeekId]);

  const handlerShortHeader = () => {
    localStorage.setItem("isShowMiniSidebar", !isShowMiniSidebar);
    setIsShowMiniSidebar(!isShowMiniSidebar);
  };

  useEffect(() => { }, [
    screen,
    selectedWeekIdForPractice,
    selectedQsIdForPractice,
    selectedNotificationId,
    selectedWeekId,
    selectedWeekIdForQuiz,
    selectedWeekIdForMock,
    selectedCourseIdForQuiz,
    selectedCourseIdForMock,
    mockQsIdList,
    selectNavWeekForMock,
  ]);

  const getHeaderTitle = () => {
    let weekId =
      selectedWeekIdForPractice !== null
        ? selectedWeekIdForPractice
        : "Loading...";

    switch (pathname) {
      case "/free/profile":
        return "Profile";
      case "/free/quiz":
        if (screen === "quiz-week") {
          return `Quiz > Week ${selectedWeekId}`;
        }
        if (screen === "quiz-result") {
          return `Quiz > Week ${selectedWeekId} > Result`;
        }
        return "Quiz";
      case "/free/mock-test":
        if (screen === "start") {
          return `Mock > Week ${selectNavWeekForMock}`;
        }
        if (screen === "result-new") {
          return `Mock > Week ${selectNavWeekForMock} > Result`;
        }
        return "Mock Test";
      case "/student/certificates":
        return "Certificates";
      case "/student/submission":
        return "Submission Points";
      case "/free/practice":
        return "Practice";
      case "/student/essentials":
        return "Student Essentails";
      case `/student/practice/${selectedQsIdForPractice}/Problem`:
      case `/student/practice/${selectedQsIdForPractice}/Hint`:
      case `/student/practice/${selectedQsIdForPractice}/Submission`:
        if (selectedWeekIdForPractice !== null) {
          weekId = selectedWeekIdForPractice;
        }
        return `Practice > Week ${weekId}`;
      default:
        return "Dashboard";
    }
  };


  const postDataToApi = async () => {
    try {
      const token = JSON.parse(loggedIn).token;
      const apiUrl = `${ApiBaseURL}free-course-management/quiz-question-attempt/`;

      const questionAttempts = questionData?.data.map((quizItem) => ({
        question_id: quizItem.id,
        answer: quizItem.userAnswer ? quizItem.userAnswer : '',
      }));

      const data = {
        course_id: selectedCourseIdForQuiz,
        syllabus_id: questionData?.data[0]?.course_section_question,
        attempt_answer: JSON.stringify(questionAttempts),
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        keepalive: true,
      });

      // Check if the response is ok (status code in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response as JSON (or use response.text() if it's not JSON)
      const result = await response.json();

      // Log the result or handle it as needed
      console.log("Submission successful:", result);
      if (result?.status === 200) {
        setSubmissionData(result?.data);
        setScreen('quiz-result');
      }

    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  const submitAll = async () => {
    const formData = new FormData();

    // Adding data to FormData
    formData.append('course_id',  parseInt(selectedCourseIdForMock));
    formData.append('syllabus_id', sectionId);
    formData.append('ques_id_list', JSON.stringify(qsIdList));

    try {
      const response = await fetch(
        `${ApiBaseURL}free-course-management/submit-all-mock-question/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
          body: formData,
          keepalive: true,
        }
      );

      const data = await response.json();
      setResultData(data.data);
      console.log("Data save!");
      setScreen("");
      navigate("/free/mock-test/" + sectionId + "/Result", {
        state: { sectionId },
      });
    } catch (error) {
      console.error("Error submitting code:", error);
    }
  };

  return (
    <div className="free-student-layout">
      <div className={`sidebar ${isShowMiniSidebar ? "mini" : ""}`}>
        <SideBar
          isShowMiniSidebar={isShowMiniSidebar}
          screen={screen}
          setScreen={setScreen}
          free={true}
          postDataToApi={postDataToApi}
          submitAll={submitAll}
        />
      </div>
      <div className={`content-area ${isShowMiniSidebar ? "mini" : ""}`}>
        <div className="header">
          <Header1
            title={getHeaderTitle()}
            isShowMiniSidebar={isShowMiniSidebar}
            setIsShowShortHeader={handlerShortHeader}
            screen={screen}
            setScreen={setScreen}
            resetTimer={resetTimer}
            setResetTimer={setResetTimer}
            timerData={timerData}
            setSelectedNotificationId={setSelectedNotificationId}
            selectedWeekId={selectedWeekId}
            mockQsIdList={mockQsIdList}
            free={true}
          />
        </div>
        <div className="content-body">
          <freeContext.Provider
            value={{
              screen,
              isShowMiniSidebar,
              setScreen,
              setIsShowMiniSidebar,
              selectedNotificationId,
              setSelectedWeekId,
              timerData,
              setTimerData,
              setSelectedCourseIdForProfile,
              selectedCourseIdForProfile,
              quizProgress,
              mockProgress,
              batchInfo,
              setSelectedWeekIdForQuiz,
              setSelectedWeekIdForMock,
              selectedWeekIdForQuiz,
              selectedWeekIdForMock,
              setSelectedCourseIdForQuiz,
              setSelectedCourseIdForMock,
              selectedCourseIdForQuiz,
              selectedCourseIdForMock,
              setMockQsIdList,
              mockQsIdList,
              selectedQsIdForPractice,
              setSelectedQsIdForPractice,
              selectedWeekIdForPractice,
              setSelectedWeekIdForPractice,
              setSelectNavWeekForMock,
              selectNavWeekForMock,
              resultData,
              setResultData,
              questionData, 
              setQuestionData,
              submissionData, 
              setSubmissionData,
              sectionId, 
              setSectionId,
              qsIdList, 
              setQsIdList,
            }}
          >
            <Outlet />
          </freeContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default FreeStudent;