import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Common/Header";
import SideBar from "../Dashboard/Sidebar/SideBar";
import { useCookie } from "react-use";
import { mentorContext } from "./context";
import MentorSidebar from "../Common/Header/MentorSideBar";
import "./index.css";
import Quiz from "../Quiz";
import MentorDashboard from "../Dashboard/MentorDashboard";
import MentorSide from "../Dashboard/Sidebar/MentorSide";
import SideBarMentor from "../Common/Header/SidebarMentor";
import MentorsHeader from "../Common/Header/MentorsHeader";
import { ApiBaseURL } from "../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../ApiConfig";

const Mentor = () => {
  const { pathname } = useLocation();
  const [loggedIn] = useCookie("maang");
  const isDisplayShortHeader =
    localStorage.getItem("isShowMiniMentorSidebar") || "false";
  const isShow = isDisplayShortHeader === "true";
  const [isShowMiniMentorSidebar, setIsShowMiniMentorSidebar] =
    useState(isShow);
  const [screen, setScreen] = useState("");
  const [resetTimer, setResetTimer] = useState(false);
  const [timerData, setTimerData] = useState([]);
  const [enterWeek, setEnterWeek] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [selectedQsIdForTeaching, setSelectedQsIdForTeaching] = useState(null);
  const [selectedWeekIdForNavTeaching, setSelectedWeekIdForNavTeaching] =
    useState(null);
  const [selectedWeekIdForTeaching, setSelectedWeekIdForTeaching] =
    useState(null);
  const [selectedBatchIdForTeaching, setSelectedBatchIdForTeaching] =
    useState(null);
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
  useEffect(() => {
    // console.log("selectedBatchIdForTeaching--",selectedBatchIdForTeaching);
    // console.log("selectedWeekIdForTeaching--",selectedWeekIdForTeaching);
  }, [selectedBatchIdForTeaching, selectedWeekIdForTeaching]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loggedIn) {
          const token = JSON.parse(loggedIn).token;

          const response = await fetch(
            `${ApiBaseURL}mentor-management/inst-cls-complete/`,
            {
              method: "GET",
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

          const data = await response.json();
          const batchDetails = data.coursewise_progress;

          // console.log("BATCH DETAILS -------------------------> ", batchDetails);

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

  // useEffect(() => {
  //   const fetchTimerData = async () => {
  //     if (loggedIn) {
  //       try {
  //         const token = JSON.parse(loggedIn).token;
  //         const response = await fetch(
  //           `${ApiBaseURL}test-management/examquestiontimer/`,
  //           {
  //             headers: {
  //               Authorization: `Token ${token}`,
  //             },
  //           }
  //         );
  //         const data = await response.json();
  //         // console.log("Timer Data---->", data);
  //         setTimerData(data);
  //       } catch (error) {
  //         console.error("Error fetching timer data:", error);
  //       }
  //     }
  //   };

  //   fetchTimerData();
  // }, [loggedIn]);

  const handlerShortHeader = () => {
    localStorage.setItem("isShowMiniMentorSidebar", !isShowMiniMentorSidebar);
    setIsShowMiniMentorSidebar(!isShowMiniMentorSidebar);
  };

  const getHeaderTitle = () => {
    let weekId = selectedWeekIdForNavTeaching !== null ? selectedWeekIdForNavTeaching : "Loading...";
    switch (pathname) {
      case "/mentor/submission":
        return "Submission Points";
      case "/mentor/courses":
        return "Courses";
      case "/mentor/rules":
        return "Rules & Regulations";
      case "/mentor/profile":
        return "Profile";
      case "/mentor/whiteboard":
        return "WhiteBoard";
      case "/mentor/teaching":
        return "Teaching";
      case "/mentor/timetable":
        return "TimeTable";
      case `/mentor/teaching/${selectedQsIdForTeaching}/problem`:
      case `/mentor/teaching/${selectedQsIdForTeaching}/hint`:
      case `/mentor/teaching/${selectedQsIdForTeaching}/submission`:
        if (selectedWeekIdForNavTeaching !== null) {
          weekId = selectedWeekIdForNavTeaching;
        }
        return `Teaching > Week ${weekId}`;
      default:
        return "Mentor Dashboard";
    }
  };
  useEffect(() => {
    const title = getHeaderTitle();
    setHeaderTitle(title);
    // console.log("header", getHeaderTitle);
  }, [pathname]);

  return (
    <div className="student-app">
      <MentorSide isShowMiniMentorSidebar={isShowMiniMentorSidebar} />
      <div className="student-main">
        <MentorsHeader
          title={getHeaderTitle()}
          isShowMiniMentorSidebar={isShowMiniMentorSidebar}
          setIsShowShortHeader={handlerShortHeader}
          HeaderTitle={headerTitle}
          screen={screen}
          setScreen={setScreen}
          resetTimer={resetTimer}
          setResetTimer={setResetTimer}
          timerData={timerData}
        />
        <div className="student-content">
          <mentorContext.Provider
            value={{
              screen,
              isShowMiniMentorSidebar,
              setScreen,
              setIsShowMiniMentorSidebar,
              selectedWeekIdForTeaching,
              setSelectedWeekIdForTeaching,
              selectedBatchIdForTeaching,
              setSelectedBatchIdForTeaching,
              setSelectedQsIdForTeaching,
              setSelectedWeekIdForNavTeaching,
              selectedWeekIdForNavTeaching,
              selectedQsIdForTeaching,
              batchInfo,
            }}
          >
            <Outlet />
          </mentorContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Mentor;
