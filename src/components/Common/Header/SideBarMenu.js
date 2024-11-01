import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookie } from "react-use";
import { useUserStore } from "../../../store/store";
import Swal from "sweetalert2";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
const sideBarItems = [
  {
    icon: "/images/sidebarsvgs/profile.svg",
    activeIcon: "/images/sidebarsvgs/user-active.svg",
    name: "Home",
    path: "/",
  },
  {
    icon: "/images/sidebarsvgs/dashboard.svg",
    activeIcon: "/images/sidebarsvgs/dashboard-active.svg",
    name: "Dashboard",
    path: "/student",
  },
  {
    icon: "/images/sidebarsvgs/timetable.svg",
    activeIcon: "/images/sidebarsvgs/time-table-active.svg",
    name: "Timetable",
    path: "/student/timetable",
  },
  {
    icon: "/images/sidebarsvgs/practice.svg",
    activeIcon: "/images/sidebarsvgs/practice-active.svg",
    name: "Practice",
    path: "/student/practice",
  },
  {
    icon: "/images/sidebarsvgs/quiz.svg",
    activeIcon: "/images/sidebarsvgs/quiz-active.svg",
    name: "Quiz",
    path: "/student/quiz",
  },
  {
    icon: "/images/sidebarsvgs/mocktest.svg",
    activeIcon: "/images/sidebarsvgs/mock-test-active.svg",
    name: "Mock Test",
    path: "/student/mock-test",
  },
  {
    icon: "/images/sidebarsvgs/certificates.svg",
    activeIcon: "/images/sidebarsvgs/certificate-active.svg",
    name: "Certificates",
    path: "/student/certificates",
  },
  {
    icon: "/images/sidebarsvgs/certificates.svg",
    activeIcon: "/images/sidebarsvgs/certificate-active.svg",
    name: "Resume Builder",
    path: "https://devresume.maangcareers.com/",
  },
  // {
  //   icon: "/images/sidebarsvgs/certificates.svg",
  //   activeIcon: "/images/sidebarsvgs/certificate-active.svg",
  //   name: "Student Essentials",
  //   path: "/student/essentials",
  // },
  {
    icon: "/images/sidebarsvgs/submission.svg",
    activeIcon: "/images/sidebarsvgs/submission-active.svg",
    name: "Submission Points",
    path: "/student/submission",
  },
  {
    icon: "/images/sidebarsvgs/profile.svg",
    activeIcon: "/images/sidebarsvgs/user-active.svg",
    name: "Profile",
    path: "/student/profile",
  },
  
];

export const SideBarMenu = ({ isShowMiniSidebar, screen, setScreen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const currentPathName = location.pathname || "";
  const [, , deleteLoggedIn] = useCookie("maang");
  const removeAllUser = useUserStore((state) => state.removeAllUser);
  // const { screen, setScreen } = useContext(studentContext);

  // console.log("SCreeeeennn", screen);

  const LogoutMenu = () => {
    if (isShowMiniSidebar) {
      return (
        <div className="mobile-menu-item">
          <img
            src="/images/sidebarsvgs/logout.svg"
            className="cursor-pointer"
            alt="navigation-item-icon"
            onClick={() => logout()}
          />
        </div>
      );
    }

    return (
      <div className="mt-2.5">
        <div
          className="w-52 h-11 rounded-lg py-2 pl-2.5 flex cursor-pointer"
          onClick={() => logout()}
        >
          <img
            src="/images/sidebarsvgs/logout.svg"
            alt="navigation-item-icon"
          />
          <span className="text-current pl-2.5 pt-0.5">Logout</span>
        </div>
      </div>
    );
  };

  const DesktopMenuItem = ({
    idx,
    item,
    activeImg,
    activeClass,
    setScreen,
    screen,
    currentPathName,
  }) => {
    const { name, path } = item;

    return (
      name !== 'Home' && <div className={`mt-2.5 ${activeClass}`} key={idx}>
        {(currentPathName !== "/student/practice" && screen === "start") ||
        screen == "quiz-week" ? (
          <a
            href="javascript:void(0)"
            onClick={() => {
              if (
                (currentPathName !== "/student/practice" &&
                  screen === "start") ||
                screen == "quiz-week"
              ) {
                Swal.fire({
                  title: "Reloading or leaving the page",
                  text: "Are you sure you want to reload or leave the page?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes",
                  cancelButtonText: "No",
                }).then((result) => {
                  if (result.isConfirmed) {
                    setScreen("");
                    if (screen === "quiz-week") {
                      setScreen("quiz-result");
                    } //for else part make force submit for mock test
                  }
                });
              }
            }}
          >
            <div className="w-52 h-11 rounded-lg py-2 pl-2.5 flex">
              <img src={activeImg} alt="navigation-item-icon" />
              <span className="text-current pl-2.5 pt-0.5">{name}</span>
            </div>
          </a>
        ) : name === "Resume Builder" ? (
          <Link
            to={path}
            target="_blank"
            onClick={() => {
              if (screen === "result-new" || "quiz-result") {
                setScreen("");
              }
            }}
          >
            <div className="w-52 h-11 rounded-lg py-2 pl-2.5 flex">
              <img src={activeImg} alt="navigation-item-icon" />
              <span className="text-current pl-2.5 pt-0.5">{name}</span>
            </div>
          </Link>
        ) : (
          <Link
            to={path}
            onClick={() => {
              if (screen === "result-new" || "quiz-result") {
                setScreen("");
              }
            }}
          >
            <div className="w-52 h-11 rounded-lg py-2 pl-2.5 flex">
              <img src={activeImg} alt="navigation-item-icon" />
              <span className="text-current pl-2.5 pt-0.5">{name}</span>
            </div>
          </Link>
        )}
      </div>
    );
  };

  const MobileMenuItem = ({
    idx,
    item,
    activeImg,
    activeClass,
    setScreen,
    screen,
    currentPathName,
  }) => {
    const { name, path } = item;
    return (currentPathName !== "/student/practice" && screen === "start") ||
      screen == "quiz-week" ? (
      <a
        href="javascript:void(0)"
        onClick={() => {
          if (
            (currentPathName !== "/student/practice" && screen === "start") ||
            screen == "quiz-week"
          ) {
            Swal.fire({
              title: "Reloading or leaving the page",
              text: "Are you sure you want to reload or leave the page?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes",
              cancelButtonText: "No",
            }).then((result) => {
              if (result.isConfirmed) {
                setScreen("");
                if (screen === "quiz-week") {
                  setScreen("quiz-result");
                } //for else part make force submit for mock test
              }
            });
          } else if (
            currentPathName !== "/student/quiz" &&
            screen === "quiz-result"
          ) {
            window.location.reload();
          }
        }}
      >
        <div key={idx} className={`mobile-menu-item ${activeClass}`}>
          <img src={activeImg} alt="navigation-item-icon" />
        </div>
      </a>
    ) : (
      <Link
        to={path}
        onClick={() => {
          if (screen === "result-new") {
            setScreen("");
          }
        }}
      >
        <div key={idx} className={`mobile-menu-item ${activeClass}`}>
          <img src={activeImg} alt="navigation-item-icon" />
        </div>
      </Link>
    );
  };

  async function logout() {
    try {
      await axios.post(`${ApiBaseURL}api/auth/logout/`, null, {
        headers: {
          Authorization: "Token " + user.token,
        },
      });
    } catch {
      console.error("unable to logout from server");
    }

    deleteLoggedIn();
    removeAllUser();
    navigate("/");
  }

  useEffect(() => {
    // console.log("neo hello", screen);
  }, [screen]);

  return (
    <>
      {sideBarItems.map((item, idx) => {
        const { icon, activeIcon, path } = item;
        const activeClass = currentPathName === path ? "active-menu" : "";
        const activeImg = currentPathName === path ? activeIcon : icon;

        if (isShowMiniSidebar) {
          return (
            <MobileMenuItem
              idx={idx}
              path={path}
              activeClass={activeClass}
              currentPathName={currentPathName}
              activeImg={activeImg}
              setScreen={setScreen}
              screen={screen}
              item={item}
            />
          );
        }
        return (
          <DesktopMenuItem
            idx={idx}
            item={item}
            activeClass={activeClass}
            activeImg={activeImg}
            setScreen={setScreen}
            screen={screen}
            currentPathName={currentPathName}
          />
        );
      })}
      <LogoutMenu />
    </>
  );
};
