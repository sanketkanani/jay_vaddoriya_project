import React from "react";
import "./sidebar.css";
import { SideBarMenu } from "../../Common/Header/SideBarMenu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookie } from "react-use";
import { useUserStore } from "../../../store/store";
import { useEffect, useState } from "react";
// import DemoImage from "../../../assets/student-banner.svg";
import DemoImage from "../../../assets/student-banner.svg";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL } from "../../ApiConfig";

function SideBar({ isShowMiniSidebar, screen, setScreen }) {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [, , deleteLoggedIn] = useCookie("maang");
  const [loggedIn] = useCookie("maang");
  const removeAllUser = useUserStore((state) => state.removeAllUser);
  const [studentData, setStudentData] = useState([]);
  const [userProfile, setUserProfile] = useState({
    profilePic: null,
  });

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

  // useEffect(() => {
  //   if (loggedIn) {
  //     fetch(
  //       `${ApiBaseURL}user-management/studentprofileinfo/`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Token ${JSON.parse(loggedIn).token}`,
  //         },
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setStudentData(data);
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      fetch(`${ApiBaseURL}user-management/studentprofileinfo/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${JSON.parse(loggedIn).token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setStudentData(data);
          const { message, Student_profile_pic } = data || {};

          if (message === 1) {
            setUserProfile({
              profilePic: Student_profile_pic || null,
            });
          } else {
            console.error("Invalid API response:", data);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  const currentPath = window.location.pathname;
  const isMockTestPage = currentPath.includes("mock-test");

  const DesktopMenu = () => (
    <div className="sidebar bg-white p-5">
      <div className="flex flex-col h-full">
        <div>
          <div className="p-[5px]">
            {isMockTestPage ? (
              <div>
                <img src="/images/logo-lg.png" alt="logo" />
              </div>
            ) : (
              <Link to="/">
                <img src="/images/logo-lg.png" alt="logo" />
              </Link>
            )}
          </div>
          <SideBarMenu
            isShowMiniSidebar={isShowMiniSidebar}
            screen={screen}
            setScreen={setScreen}
          />
        </div>
        <div className="mt-auto py-3 rounded-2xl bg-white shadow-[0px_5px_25px_0px_rgba(59,154,168,0.15)]">
          <div className="flex justify-center items-center">
            <div
              className="flex justify-center items-center user-image"
              style={{ background: `url(/images/sidebarsvgs/user-effect.svg)` }}
            >
              {userProfile.profilePic ? (
                <img
                  src={userProfile.profilePic}
                  className="rounded-full"
                  width="75px"
                  alt="user"
                />
              ) : (
                <img
                  src={DemoImage}
                  className="rounded-full"
                  width="75px"
                  alt="user"
                />
              )}
            </div>
          </div>
          {/* <span className="user-title">Maang Careers</span> */}
          <span className="user-title">
            {studentData.Student_f_nm} {studentData.Student_l_nm}
          </span>
          {/* <span className="user-email">support@maangcareers.com</span> */}
          <span className="user-email">{studentData.Student_email}</span>
          <div className="w-full flex items-center">
            <div className="user-left-side"></div>
            <div
              className="user-right-side"
              style={{
                background: `url(/images/sidebarsvgs/go-to-cta-background.svg)`,
              }}
            >
              <img
                src="/images/sidebarsvgs/go-to.svg"
                alt="CTA"
                onClick={logout}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileMenu = () => (
    <div className="sidebar-short flex flex-col">
      {isMockTestPage ? (
        <div>
          <img
            src="/images/sidebarsvgs/short-logo.svg"
            alt="site logo"
            style={{
              marginBottom: "10px",
            }}
          />{" "}
        </div>
      ) : (
        <Link to="/">
          <img
            src="/images/sidebarsvgs/short-logo.svg"
            alt="site logo"
            style={{
              marginBottom: "10px",
            }}
          />
        </Link>
      )}
      <SideBarMenu
        isShowMiniSidebar={isShowMiniSidebar}
        screen={screen}
        setScreen={setScreen}
      />
      <div className="mt-auto">
        <img
          src="/images/sidebarsvgs/mobile-menu-user.svg"
          className="rounded-full"
          width="75px"
          alt="user"
        />
      </div>
    </div>
  );

  if (isShowMiniSidebar) return <MobileMenu />;

  return <DesktopMenu />;
}

export default SideBar;
