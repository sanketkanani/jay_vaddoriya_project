import React from "react";
import "../../Dashboard/Sidebar/sidebar.css";
import { MentorSideBarMenu } from "./MentorSideBar";
import { Link } from "react-router-dom";

function SidebarMentor({ isShowMiniMentorSidebar }) {
  const DesktopMenu = () => (
    <div className="sidebar bg-white w-1.5/12 p-5 flex flex-col justify-between">
      <div>
        <div className="p-[5px]">
          <Link to={"/"}>
            <img src="/images/Logo.png" alt="logo" />
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
            <img
              src="/images/sidebarsvgs/user.png"
              className="rounded-full"
              width="75px"
              alt="user"
            />
          </div>
        </div>
        <span className="user-title">Maang Careers</span>
        <span className="user-email">support@maangcareers.com</span>
        <div className="w-full flex items-center">
          <div className="user-left-side"></div>
          <div
            className="user-right-side"
            style={{
              background: `url(/images/sidebarsvgs/go-to-cta-background.svg)`,
            }}
          >
            <img src="/images/sidebarsvgs/go-to.svg" alt="CTA" />
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

export default SidebarMentor;
