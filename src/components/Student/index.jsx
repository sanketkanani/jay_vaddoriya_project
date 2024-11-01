// import React, { useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import Header from "../Common/Header";
// import SideBar from "../Dashboard/Sidebar/SideBar";
// import { studentContext } from "./context";
// import "./index.css";

// const Student = () => {
//   const { pathname } = useLocation();
//   const isDisplayShortHeader =
//     localStorage.getItem("isShowMiniSidebar") || "false";
//   const isShow = isDisplayShortHeader === "true";
//   const [isShowMiniSidebar, setIsShowMiniSidebar] = useState(isShow);
//   const [screen, setScreen] = useState("");
//   const [resetTimer, setResetTimer]=useState(false);

//   const handlerShortHeader = () => {
//     localStorage.setItem("isShowMiniSidebar", !isShowMiniSidebar);
//     setIsShowMiniSidebar(!isShowMiniSidebar);
//   };

//   const getHeaderTitle = () => {
//     switch (pathname) {
//       case "/student/profile":
//         return "Profile";
//       case "/student/timetable":
//         return "Timetable";
//       case "/student/quiz":
//         if (screen === "quiz-week") {
//           return "Quiz > Week 3";
//         }
//         if (screen === "quiz-result") {
//           return "Quiz > Week 3 > Result";
//         }
//         return "Quiz";
//       case "/student/mock-test":
//         return "Mock Test";
//       case "/student/certificates":
//         return "Certificates";
//       case "/student/practice":
//         return "Practice";
//       default:
//         return "Dashboard";
//     }
//   };

//   return (
//     <div className="student-app">
//       <SideBar isShowMiniSidebar={isShowMiniSidebar} />
//       <div className="student-main">
//         <Header
//           title={getHeaderTitle()}
//           isShowMiniSidebar={isShowMiniSidebar}
//           setIsShowShortHeader={handlerShortHeader}
//           screen={screen}
//           setScreen={setScreen}
//           resetTimer={resetTimer}
//           setResetTimer={setResetTimer}

//         />
//         <div className="student-content">
//           <studentContext.Provider
//             value={{
//               screen,
//               isShowMiniSidebar,
//               setScreen,
//               setIsShowMiniSidebar,

//             }}
//           >
//             <Outlet />
//           </studentContext.Provider>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Student;

// import React, { useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import Header from "../Common/Header";
// import SideBar from "../Dashboard/Sidebar/SideBar";
// import { studentContext } from "./context";
// import "./index.css";

// const Student = () => {
//   const { pathname } = useLocation();
//   const isDisplayShortHeader =
//     localStorage.getItem("isShowMiniSidebar") || "false";
//   const isShow = isDisplayShortHeader === "true";
//   const [isShowMiniSidebar, setIsShowMiniSidebar] = useState(isShow);
//   const [screen, setScreen] = useState("");
//   const [resetTimer, setResetTimer]=useState(false);

//   const handlerShortHeader = () => {
//     localStorage.setItem("isShowMiniSidebar", !isShowMiniSidebar);
//     setIsShowMiniSidebar(!isShowMiniSidebar);
//   };

//   const getHeaderTitle = () => {
//     switch (pathname) {
//       case "/student/profile":
//         return "Profile";
//       case "/student/timetable":
//         return "Timetable";
//       case "/student/quiz":
//         if (screen === "quiz-week") {
//           return "Quiz > Week 3";
//         }
//         if (screen === "quiz-result") {
//           return "Quiz > Week 3 > Result";
//         }
//         return "Quiz";
//       case "/student/mock-test":
//         return "Mock Test";
//       case "/student/certificates":
//         return "Certificates";
//       case "/student/practice":
//         return "Practice";
//       default:
//         return "Dashboard";
//     }
//   };

//   return (
//     <div className="student-app">
//       <SideBar isShowMiniSidebar={isShowMiniSidebar} />
//       <div className="student-main">
//         <Header
//           title={getHeaderTitle()}
//           isShowMiniSidebar={isShowMiniSidebar}
//           setIsShowShortHeader={handlerShortHeader}
//           screen={screen}
//           setScreen={setScreen}
//           resetTimer={resetTimer}
//           setResetTimer={setResetTimer}

//         />
//         <div className="student-content">
//           <studentContext.Provider
//             value={{
//               screen,
//               isShowMiniSidebar,
//               setScreen,
//               setIsShowMiniSidebar,

//             }}
//           >
//             <Outlet />
//           </studentContext.Provider>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Student;

import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Common/Header";
import SideBar from "../Dashboard/Sidebar/SideBar";
import { useCookie } from "react-use";
import { studentContext } from "./context";
import "./index.css";
// import { ApiBaseURL } from "../ApiConfig";
import Quiz from "../Quiz";
import { ApiBaseURL } from "../../services/config/Endpoints";

const Student = () => {
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

  const [mockQsIdList, setMockQsIdList] = useState([]);
  // const [tags, setTags] = useState([]);
  const [tag, setTag] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
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

  // useEffect(() => {
  //   const fetchTimerData = async () => {
  //     console.log("selectedWeekId",typeof(selectedWeekId));
  //     if (screen === "quiz-week" && loggedIn) {
  //       try {
  //         const token = JSON.parse(loggedIn).token;
  //         const response = await fetch(
  //           "${ApiBaseURL}test-management/examquestiontimer/",
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

  //         console.log("DATAAAAAAAAAAAAAAAAAAAAAAAAAAAA", data);
  //         const quizData = data.find(
  //           (item) =>
  //             item.exam_field === "Quiz" && item.week === selectedWeekId.toString()
  //         );
  //         console.log("quizDataaaaaaaaaaaaaa", quizData);
  //         if (quizData) {
  //           const formattedTime = quizData.time || "00:00:00";
  //           setTimerData(formattedTime);
  //           console.log("timerData",timerData);
  //         } else {
  //           console.log("No quiz data found for the selected week");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching timer data:", error.message);
  //       }
  //     }
  //   };

  //   fetchTimerData();
  //   console.log("selectedWeek ID", selectedWeekId);

  // }, [screen, loggedIn, selectedWeekId]);

  // console.log("SCreeeeeemmmmmnnnn", screen);

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

          // console.log(
          // "QUIZZ PROGRESS DETAILS -------------------------> ",
          // quizDetails
          // );
          // console.log(
          // "MOCK PROGRESS DETAILS -------------------------> ",
          // mockDetails
          // );
          // console.log(
          // "BATCH DETAILS -------------------------> ",
          // batchDetails
          // );

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

  useEffect(() => {
    const fetchTimerData = async () => {
      // console.log("selectedWeekId", typeof selectedWeekId);
      if ((screen === "quiz-week" || screen === "start") && loggedIn) {
        try {
          const token = JSON.parse(loggedIn).token;
          const examField = screen === "quiz-week" ? "Quiz" : "Mock";
          // console.log("EXAMFIELDDDD----", examField);

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

          // console.log("DATAAAAAAAAAAAAAAAAAAAAAAAAAAAA", data);

          const quizData = data.find(
            (item) =>
              item.exam_field === examField &&
              item.week === selectedWeekId.toString()
          );

          // console.log("quizDataaaaaaaaaaaaaa", quizData);
          if (quizData) {
            const formattedTime = quizData.time || "00:00:00";
            setTimerData(formattedTime);
            // console.log("timerData", timerData);
          } else {
            console.log(
              `No ${examField.toLowerCase()} data found for the selected week`
            );
          }
        } catch (error) {
          console.error("Error fetching timer data:", error.message);
        }
      }
    };

    fetchTimerData();
    // console.log("selectedWeek ID", selectedWeekId);
  }, [screen, loggedIn, selectedWeekId]);

  const handlerShortHeader = () => {
    localStorage.setItem("isShowMiniSidebar", !isShowMiniSidebar);
    setIsShowMiniSidebar(!isShowMiniSidebar);
  };

  useEffect(() => {
    // console.log("selectedNotificationId", selectedNotificationId);
    // console.log("selectedWeek ID", selectedWeekId);
    // console.log(
    // "selectedWeekIdForQuiz ID9999999999990000000000000",
    // selectedWeekIdForQuiz
    // );
    // console.log(
    // "selectedWeekIdForMockkk",
    // selectedWeekIdForMock
    // );
    // console.log(
    // "selectedCourseIdForQuiz --------------------------->",
    // selectedCourseIdForQuiz
    // );
    // console.log(
    // "selectedWeekIdForMock ===========================>",
    // selectedCourseIdForMock
    // );
    // console.log(mockQsIdList);
    // console.log("SCreeeeeemmmmmnnnn", screen);
    // console.log("selectedQsIdForPractice", selectedQsIdForPractice);
    // console.log("selectedWeekIdForPractice", selectedWeekIdForPractice);
    // console.log("selectNavWeekForMock", selectNavWeekForMock);
  }, [
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
      case "/student/profile":
        return "Profile";
      case "/student/timetable":
        return "Timetable";
      case "/student/quiz":
        if (screen === "quiz-week") {
          return `Quiz > Week ${selectedWeekId}`;
        }
        if (screen === "quiz-result") {
          return `Quiz > Week ${selectedWeekId} > Result`;
        }
        return "Quiz";
      case "/student/mock-test":
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
      case "/student/practice":
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

  return (
    <div className="free-student-layout">
      <div className={`sidebar ${isShowMiniSidebar ? "mini" : ""}`}>
        <SideBar
          isShowMiniSidebar={isShowMiniSidebar}
          screen={screen}
          setScreen={setScreen}
        />
      </div>
      <div className={`content-area ${isShowMiniSidebar ? "mini" : ""}`}>
        <div className="header">
          <Header
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
          />
        </div>
        <div className="content-body">
          <studentContext.Provider
            value={{
              screen,
              isShowMiniSidebar,
              setScreen,
              setIsShowMiniSidebar,
              selectedNotificationId,
              setSelectedWeekId,
              timerData,
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
            }}
          >
            <Outlet />
          </studentContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Student;
