import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useCookie } from "react-use";
import AppBar from "@mui/material/AppBar";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchBar from "../SearchBar";
import "./index.css";
import { SideBarMenu } from "./SideBarMenu";
import { useUserStore } from "../../../store/store";
import MessageModal from "../MessageModal";
import { useLocation } from "react-router-dom";
import NotificationPanel from "./notificationPanel";
import Badge from "@mui/material/Badge";
import { ApiBaseURL } from "../../../services/config/Endpoints";
import { Link } from "react-router-dom";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
// import "./notificationPanel.css";

const drawerWidth = 240;

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        // Name of the slot
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
        // Name of the slot
        root: {
          minHeight: "40px",
          paddingLeft: "0px !important",
          paddingRight: "0px !important",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
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

const Header = ({
  title = "Dashboard",
  isShowMiniSidebar,
  setIsShowShortHeader,
  screen,
  resetTimer,
  setResetTimer,
  setScreen,
  setSelectedNotificationId,
  timerData,
  mockQsIdList,
}) => {
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [loggedIn] = useCookie("maang");
  const [isOpenMessageBox, setIsOpenMessageBox] = React.useState(false);
  const [timer, setTimer] = useState(null);

  // const [timer, setTimer]=useState(1200);
  const [timeout, setTimeout] = useState(false);
  const [noticeCount, setNoticeCount] = useState(0);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationPanelRef = useRef();
  const { pathname } = useLocation();
  const [mockList, setMockList] = useState([]);

  //adding this for pass the mock id list
  useEffect(() => {
    // console.log("mockList", mockQsIdList);
  }, [mockQsIdList]);

  const isShowCountdown =
    (pathname === "/student/quiz" && screen === "quiz-week") ||
    (pathname === "/student/practice" && screen === "start") ||
    (pathname === "/student/mock-test" && screen === "start");
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

  const getNotifications = async () => {
    try {
      // console.log("hello automatic notificaiton.................!");
      const token = JSON.parse(loggedIn).token;

      const response = await fetch(
        // "http://192.168.0.119:7000/user-management/allnotifications/",
        `${ApiBaseURL}test-management/get_messages/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      // if (responseData) {
      //   console.log(responseData.data);
      // }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  useEffect(() => {
    getNotifications();
    const intervalId = setInterval(() => {
      getNotifications();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = JSON.parse(loggedIn).token;

      const response = await fetch(
        // "http://192.168.0.119:7000/user-management/allnotifications/",
        `${ApiBaseURL}user-management/allnotifications/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.message === 1) {
        const { notification_count, current_notification } = responseData;

        // Use the extracted values as needed

        setNotifications(current_notification);
        setNoticeCount(notification_count);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const handleNotificationIconClick = () => {
    setIsNotificationPanelOpen((prev) => !prev);
  };

  // useEffect(() => {
  //   let intervalId;

  //   const startTimer = () => {
  //     intervalId = setInterval(() => {
  //       if (timer === 0) {
  //         clearInterval(intervalId);
  //         handleTimeout();
  //       } else {
  //         setTimer((prevTimer) => prevTimer - 1);
  //       }
  //     }, 1000);
  //   };

  //   if (isShowCountdown) {
  //     if (pathname === "/student/quiz" && screen === "quiz-week") {
  //       startTimer();
  //     } else if (resetTimer) {
  //       startTimer();
  //       setResetTimer(false);
  //     }
  //   }

  //   return () => clearInterval(intervalId);
  // }, [isShowCountdown, pathname, screen, resetTimer]);

  // useEffect(() => {
  //   let intervalId;

  //   const startTimer = () => {
  //     setTimer(convertTimeToSeconds(timerData[0]?.time));
  //     intervalId = setInterval(() => {
  //       setTimer((prevTimer) => {
  //         if (prevTimer === 0) {
  //           clearInterval(intervalId);
  //           handleTimeout();
  //           return 0;
  //         }
  //         return prevTimer - 1;
  //       });
  //     }, 1000);
  //   };

  //   if (isShowCountdown) {
  //     if (pathname === "/student/quiz" && screen === "quiz-week") {
  //       startTimer();
  //     } else if (resetTimer) {
  //       startTimer();
  //       setResetTimer(false);
  //     }
  //   }

  //   return () => clearInterval(intervalId);
  // }, [isShowCountdown, pathname, screen, timerData, resetTimer]);

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
    if (user && user.user && user.user.username) {
      return user.user.username.split("@")[0];
    } else {
      return "";
    }
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
          <SideBarMenu
            setScreen={setScreen}
            screen={screen}
            mockQsIdList={mockQsIdList}
          />
        </div>
      </Drawer>
    </div>
  );

  return (
    <div className="app-header w-full lg:pt-0 pt-3">
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <div className="w-full flex items-center justify-between h-10">
            <div className="left-header">
              <img
                src="/images/dashboard-menu.svg"
                alt="dashboard menu"
                onClick={() => setIsShowShortHeader(!isShowMiniSidebar)}
                style={{ cursor: "pointer" }}
              />
              <span className="app-title Outfit text-lg	font-medium text-slate-500">
                {title}
              </span>
            </div>
            <Link to="/">
              <img
                className="app-logo"
                src="/images/logo-lg.png"
                alt="app logo"
              />
            </Link>

            {pathname !== "/student/practice" && isShowCountdown && (
              <div className="count-down  ">
                <img src="/images/Practice/clock.svg" alt="header icon" />
                <span>
                  {String(Math.floor(timer / 3600)).padStart(2, "0")} :{" "}
                  {String(Math.floor((timer % 3600) / 60)).padStart(2, "0")} :{" "}
                  {String(timer % 60).padStart(2, "0")}
                </span>
              </div>
            )}

            {/* <div className="search-header sm:hidden ms-auto block">
              <img src="/images/search.svg" alt="header icon" width={16} />
            </div> */}

            {pathname === "/student" && (
              <div className="search-header sm:block ms-auto hidden">
                <SearchBar />
                {/* <input type="text" className="textbox" placeholder="Search...." /> */}
              </div>
            )}

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
            setSelectedNotificationId={setSelectedNotificationId}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
