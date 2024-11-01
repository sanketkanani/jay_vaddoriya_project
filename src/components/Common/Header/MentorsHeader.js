import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useCookie } from "react-use";
import AppBar from "@mui/material/AppBar";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
import "./index.css";
import { MentorSideBarMenu } from "./MentorSideBar";
import { useUserStore } from "../../../store/store";
import MessageModal from "../MessageModal";
import { useLocation } from "react-router-dom";
import NotificationPanel from "./notificationPanel";
import Badge from "@mui/material/Badge";
import Modal from "react-modal";
import axios from "axios";
import MentorSearchBar from "../SearchBar/MentorSearchBar";
import { ApiBaseURL } from "../../../services/config/Endpoints";

const drawerWidth = 240;

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          "background-color": "rgb(246, 255, 254)",
          "box-shadow": "none",
          color: "#595F6E",
          height: "40px",
          marginTop: "15px",
          padding: "0px 25px",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "40px",
          paddingLeft: "0px !important",
          paddingRight: "0px !important",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          height: "34px",
          background: "#FFF",
          "box-shadow": `0px 3px 15px 0px rgba(59, 154, 168, 0.15)`,
        },
      },
    },
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

// const convertTimeToSeconds = (timeString) => {
//   const [hours, minutes, seconds] = timeString?.split(':').map(Number);
//   return hours * 3600 + minutes * 60 + seconds;
// };

const convertTimeToSeconds = (timeString) => {
  if (typeof timeString !== "string") {
    console.error("Invalid timerData type. Expected string.");
    return 0; // or handle it according to your use case
  }

  const timeArray = timeString.split(":").map(Number);

  if (timeArray.length !== 3 || timeArray.some(isNaN)) {
    console.error("Invalid time format. Expected 'HH:MM:SS'.");
    return 0;
  }

  const [hours, minutes, seconds] = timeArray;
  return hours * 3600 + minutes * 60 + seconds;
};

const MentorsHeader = ({
  title,
  isShowMiniMentorSidebar,
  setIsShowShortHeader,
  screen,
  resetTimer,
  setResetTimer,
  setScreen,
  setSelectedId,
  timerData,
}) => {
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [loggedIn] = useCookie("maang");
  const [isOpenMessageBox, setIsOpenMessageBox] = React.useState(false);
  const [timer, setTimer] = useState(null);

  const [timeout, setTimeout] = useState(false);
  const [noticeCount, setNoticeCount] = useState(0);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationPanelRef = useRef();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { pathname } = useLocation();

  const handleAcceptTerms = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleAgree = async () => {
    if (loggedIn) {
      try {
        const formData = new FormData();
        formData.append("terms_conditions", termsAccepted ? "True" : "False");

        const response = await axios.post(
          `${ApiBaseURL}user-management/terms-condition/`,
          formData,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);

        const apiMessage = response.data.message;

        if (apiMessage === 1) {
          setShowTermsModal(false);
        } else {
          localStorage.setItem("termsAccepted", termsAccepted.toString());
        }
      } catch (error) {
        console.error("Error posting terms and conditions:", error);
      }
    }
  };

  const isShowCountdown =
    (pathname === "/student/quiz" && screen === "quiz-week") ||
    (pathname === "/student/practice" && screen === "start");
  const handleTimeout = () => {
    setTimeout(true);
    if (pathname === "/student/quiz" && screen === "quiz-week") {
      setScreen("quiz-result");
    }
  };

  const CallTimerData = (timerData) => {
    if (timerData) {
      const convertedTime = convertTimeToSeconds(timerData);
      return isNaN(convertedTime) ? 0 : convertedTime;
    }
    return 0;
  };

  useEffect(() => {
    setTimer(CallTimerData(timerData));
  }, [timerData]);

  useEffect(() => {
    if (timer === 0) {
      handleTimeout();
    }
  }, [timer]);
  useEffect(() => {
    let intervalId;

    const startTimer = () => {
      intervalId = setInterval(() => {
        if (timer === 0) {
          clearInterval(intervalId);
        } else {
          setTimer((prevTimer) => prevTimer - 1);
        }
      }, 1000);
    };

    startTimer();
    return () => clearInterval(intervalId);
  }, [timer]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationPanelRef.current &&
        !notificationPanelRef.current.contains(event.target)
      ) {
        setIsNotificationPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationPanelRef]);

  // motification API implementation here:-

  // const fetchNotifications = async () => {
  //   try {
  //     const token = JSON.parse(loggedIn).token;

  //     const response = await fetch(
  //       `${ApiBaseURL}user-management/allnotifications/`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Token ${token}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const responseData = await response.json();

  //     if (responseData.message === 1) {
  //       const { notification_count, current_notification } = responseData;

  //       setNotifications(current_notification);
  //       setNoticeCount(notification_count);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching notifications:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchNotifications();
  //   const intervalId = setInterval(() => {
  //     fetchNotifications();
  //   }, 3000);
  //   return () => clearInterval(intervalId);
  // }, []);

  const handleNotificationIconClick = () => {
    setIsNotificationPanelOpen((prev) => !prev);
  };

  const generateInitials = (name) => {
    if (name) {
      name.trim();

      let parts = name.split(" ");

      if (parts.length > 1) {
        return (parts[0].charAt(0) + parts[1].charAt(1)).toUpperCase();
      } else {
        return (parts[0].charAt(0) + parts[0].charAt(1)).toUpperCase();
      }
    }
  };

  const getName = () => {
    if (user !== {} && user.user !== {})
      return user.user.username.split("@")[0];
    else return "";
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerBar = () => (
    <div className="drawer-bar">
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <div className="drawer-sidebar-menu">
          <MentorSideBarMenu />
        </div>
      </Drawer>
    </div>
  );

  return (
    <>
      {" "}
      {showTermsModal && (
        <div className="modal-overlay z-10 px-10">
          <div className="modal !w-auto xl:!max-w-[900px] md:!max-w-[730px] sm:!max-w-[600px] !max-w-[100%]">
            <div className="modal-content break-words">
              <div class="mb-4 text-gray-700 text-[25px] font-semibold font-['Outfit']">
                Terms & Conditions
              </div>
              <h4 class="mb-2 text-sky-500 text-xl font-semibold font-['Outfit']">
                1. Introduction
              </h4>
              <p>
                {" "}
                Welcome to MAANG Careers! We are dedicated to providing
                top-notch training to enhance your career prospects. Our classes
                are structured to offer a rich learning experience, blending
                instructional teaching with interactive sessions for clearing
                doubts.
              </p>
              <h5 className="text-lg font-semibold font-['Outfit']">
                Class Schedule and Format
              </h5>
              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  Each batch will have three classes per week. The specific days
                  will be communicated to you.
                </li>
                <li>
                  Each class is one and a half hours long, typically including
                  teaching and doubt clearing.
                </li>
                <li>
                  Access live classes through your student portal dashboard or
                  through the provided timetable.
                </li>
                <li>
                  We only offer live classes, and no recordings will be provided
                  throughout the course.
                </li>
              </ul>
              <h5 className="text-lg font-semibold font-['Outfit']">
                Practice and Performance
              </h5>
              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  Engage with all practice questions, quizzes, and mock tests to
                  improve your coding skills.
                </li>
                <li>
                  Your performance rating will benefit from active participation
                  in these activities.
                </li>
                <li>
                  We provide notes for your future reference, which you can find
                  in your student portal.
                </li>
              </ul>
              <h4 class="mb-2 text-sky-500 text-xl font-semibold font-['Outfit']">
                2. Terms of Service
              </h4>
              <h5 className="text-lg font-semibold font-['Outfit']">
                Interactions and Conduct
              </h5>
              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  Personal interactions between students and mentors outside of
                  official channels are not permitted, including the creation of
                  class WhatsApp groups or similar.
                </li>
                <li>
                  Sharing or recording course materials or data with external
                  parties (friends, relatives, teachers, etc.) is strictly
                  prohibited, and the company will take severe legal action as
                  per the law.
                </li>
                <li>
                  You are responsible for your conduct and adherence to these
                  rules.
                </li>
              </ul>
              <h5 className="text-lg font-semibold font-['Outfit']">
                Course Enrollment and Refunds
              </h5>
              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  Once enrolled in a course, you are responsible for your
                  participation. No refunds will be given.
                </li>
                <li>
                  Your access to your student portal will be revoked after one
                  month of completion of your course.
                </li>
              </ul>
              <h5 className="text-lg font-semibold font-['Outfit']">
                Performance and Placement
              </h5>
              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  Your performance in the course is your responsibility. We
                  provide training without ensuring any job guarantees.
                </li>
                <li>
                  Referrals for internships and placements will be judged based
                  on your performance metrics and mentor recommendations.
                </li>
              </ul>
              <h4 class="mb-2 text-sky-500 text-xl font-semibold font-['Outfit']">
                3. Specific Terms for Different Programs
              </h4>
              <h5 className="text-lg font-semibold font-['Outfit']">
                Training Program
              </h5>
              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  Enrollment in the training program is solely for educational
                  purposes and does not include job assistance.
                </li>
                <li>
                  Exceptional students may receive internship referrals based on
                  batch mentor suggestions.
                </li>
              </ul>
              <h5 className="text-lg font-semibold font-['Outfit']">
                Training and Placement Assistance Program
              </h5>
              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  The sole intention of this program is to make you
                  interview-ready, and the company reserves the right to decide
                  the number and type of companies for referrals based on your
                  performance, internal mock interview results, and conduct
                  during the program.
                </li>
                <li>
                  Eligibility for referrals is based on meeting a minimum of 90%
                  in the student portal progress bar and scoring at least 75% in
                  internal mock interviews.
                </li>
                <li>
                  Enrollment in this program does not guarantee a job, and
                  cracking a job completely depends on the student.
                </li>
                <li>
                  We assist you throughout the course and make you feel
                  confident in your preparation.
                </li>
                <li>
                  If you do not meet the criteria, you will not be referred for
                  placements.
                </li>
              </ul>
              <h4 class="mb-2 text-sky-500 text-xl font-semibold font-['Outfit']">
                4. Consequences of Non-Compliance
              </h4>

              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  Failure to comply with these terms may result in your being
                  removed from the batch and the termination of your student
                  contract with the company without refunds or prior notice.
                </li>
              </ul>
              <h4 class="mb-2 text-sky-500 text-xl font-semibold font-['Outfit']">
                5. Agreement and Acknowledgment
              </h4>

              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  By agreeing to these terms, you acknowledge that the company's
                  priority is to provide quality education and training.
                </li>
                <li>
                  You agree not to take any action against the company and to
                  focus on your preparation and learning.
                </li>
              </ul>
              <p className="mb-5 text-gray-600 text-base font-normal font-['Outfit']">
                By understanding and agreeing to these terms, you consent to
                abide by the rules and regulations of MAANG Careers as outlined
                above.
              </p>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={handleAcceptTerms}
                  className="w-5 h-5 bg-white rounded shadow-inner border border-slate-400 me-2"
                />
                <p className="text-gray-700 text-base font-medium font-['Outfit']">
                  Yes, I understand and agree to the above terms, and I consent
                  accordingly.{" "}
                </p>
              </div>
              <div className="text-right">
                <button
                  onClick={() => {
                    if (termsAccepted) {
                      handleAgree();
                    } else {
                      alert("Please agree to the terms to proceed.");
                    }
                  }}
                  className="w-[100px] h-10 bg-emerald-400 rounded-[5px] text-center text-white text-base font-medium font-['Outfit']"
                >
                  Agree
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="app-header w-full">
        <ThemeProvider theme={theme}>
          <AppBar position="static">
            <div className="w-full flex items-center justify-between h-10">
              <div className="left-header">
                <img
                  src="/images/dashboard-menu.svg"
                  alt="dashboard menu"
                  onClick={() => setIsShowShortHeader(!isShowMiniMentorSidebar)}
                  style={{ cursor: "pointer" }}
                />
                <span className="app-title Outfit text-lg	font-medium text-slate-500">
                  {title}
                </span>
              </div>
              <img
                className="app-logo"
                src="/images/logo-lg.png"
                alt="app logo"
              />
              {pathname !== "/student/practice" && isShowCountdown && (
                <div className="count-down">
                  <img src="/images/Practice/clock.svg" alt="header icon" />
                  <span>
                    {Math.floor(timer / 60)} :{" "}
                    {String(timer % 60).padStart(2, "0")}
                  </span>
                </div>
              )}

              <div className="search-header sm:hidden ms-auto block">
                <img src="/images/search.svg" alt="header icon" width={16} />
              </div>

              <div className="search-header sm:block ms-auto hidden">
                <MentorSearchBar />
                {/* <input type="text" className="textbox" placeholder="Search...." /> */}
              </div>

              <div className="right-header flex items-center">
                <Badge badgeContent={noticeCount} color="error">
                  <img
                    src="/images/sidebarsvgs/notifications.svg"
                    alt="header icon"
                    className="pl-5"
                    onClick={handleNotificationIconClick}
                    style={{ cursor: "pointer" }}
                  />
                </Badge>
                <div>
                  <img
                    src={
                      isOpenMessageBox
                        ? "/images/sidebarsvgs/mail-active.svg"
                        : "/images/sidebarsvgs/mail.svg"
                    }
                    alt="header icon"
                    className="px-7"
                    onClick={() => setIsOpenMessageBox(true)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <img
                  src="/images/sidebarsvgs/menu.svg"
                  alt="menu icon"
                  className="menu-icon"
                  onClick={() => handleDrawerOpen()}
                />
                <div
                  className="user_icon h-10 w-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#00FCDE" }}
                >
                  <span className="text-xs font-bold">
                    {generateInitials(getName())}
                  </span>
                </div>
                <span
                  className="user-name"
                  style={{
                    color: "595F6E",
                    fontSize: "14px",
                    fontWeight: 400,
                    fontFamily: "Outfit",
                    textTransform: "capitalize",
                  }}
                >
                  {getName()?.toLocaleLowerCase()}
                </span>
              </div>
            </div>
          </AppBar>
        </ThemeProvider>
        {DrawerBar()}
        <MessageModal
          open={isOpenMessageBox}
          handleClose={() => setIsOpenMessageBox(false)}
        />
        {isNotificationPanelOpen && (
          <div ref={notificationPanelRef}>
            <NotificationPanel
              notifications={notifications}
              setSelectedId={setSelectedId}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MentorsHeader;
