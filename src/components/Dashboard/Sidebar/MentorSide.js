import React from "react";
import "./sidebar.css";
import { SideBarMenu } from "../../Common/Header/SideBarMenu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookie } from "react-use";
import { useUserStore } from "../../../store/store";
import { useEffect, useState } from "react";
import { MentorSideBarMenu } from "../../Common/Header/MentorSideBar";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
function MentorSide({ isShowMiniMentorSidebar, profilePic }) {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [, , deleteLoggedIn] = useCookie("maang");
  const [loggedIn] = useCookie("maang");
  const removeAllUser = useUserStore((state) => state.removeAllUser);
  const [mentorData, setMentorData] = useState([]);
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

  useEffect(() => {
    if (loggedIn) {
      fetch(`${ApiBaseURL}mentor-management/inst-profileinfo/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${JSON.parse(loggedIn).token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("mentor data", data);
          setMentorData(data);
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  // useEffect(() => {
  //   if (loggedIn) {
  //     fetch(`${ApiBaseURL}user-management/studentprofileinfo/`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Token ${JSON.parse(loggedIn).token}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const { message, Student_profile_pic } = data || {};

  //         if (message === 1) {
  //           setUserProfile({
  //             profilePic: Student_profile_pic || null,
  //           });
  //         } else {
  //           console.error("Invalid API response:", data);
  //         }
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [loggedIn]);

  const DesktopMenu = () => (
    <div className="sidebar bg-white w-1.5/12 p-5 flex flex-col justify-between">
      <div>
        <div className="p-[5px]">
          <Link to={"/"}>
            <img src="/images/logo-lg.png" alt="logo" />
          </Link>
        </div>
        <MentorSideBarMenu isShowMiniMentorSidebar={isShowMiniMentorSidebar} />
      </div>
      <div
        className="rounded-2xl bg-white"
        style={{
          boxShadow: "0px 5px 25px 0px rgba(59, 154, 168, 0.15)",
          padding: "13px 0px",
        }}
      >
        <div className="flex justify-center items-center">
          <div
            className="flex justify-center items-center user-image"
            style={{ background: `url(/images/sidebarsvgs/user-effect.svg)` }}
          >
            {mentorData.Instructor_profile_pic ? (
              <img
                src={mentorData.Instructor_profile_pic}
                className="rounded-full"
                width="75px"
                alt="user"
              />
            ) : (
              <img
                src="/images/sidebarsvgs/user.png"
                className="rounded-full"
                width="75px"
                alt="user"
              />
            )}
          </div>
        </div>

        <span className="user-title">
          {mentorData.Instructor_f_nm} {mentorData.Instructor_l_nm}
        </span>

        <span className="user-email">{mentorData.Instructor_email}</span>
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
  );

  const MobileMenu = () => (
    <div className="sidebar-short">
      <Link to={"/"}>
        <img
          src="/images/sidebarsvgs/short-logo.svg"
          alt="site logo"
          style={{
            marginBottom: "10px",
          }}
        />
      </Link>
      <MentorSideBarMenu isShowMiniMentorSidebar={isShowMiniMentorSidebar} />
      <div>
        <img
          src="/images/sidebarsvgs/mobile-menu-user.svg"
          className="rounded-full"
          width="75px"
          alt="user"
        />
      </div>
    </div>
  );

  if (isShowMiniMentorSidebar) return <MobileMenu />;

  return <DesktopMenu />;
}

export default MentorSide;
