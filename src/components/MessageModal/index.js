import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import "./index.css";

const data = [
  // { imagePath: "/images/Email-Modal/support.svg", title: "Support" },
  // { imagePath: "/images/Email-Modal/mentor.svg", title: "Mentor" },
  // { imagePath: "/images/Email-Modal/admin.svg", title: "Admin" },
  // { imagePath: "/images/Email-Modal/other.svg", title: "Other" },
  { imagePath: "/images/Email-Modal/mentor.svg", title: "Class Updates" },
  { imagePath: "/images/Email-Modal/support.svg", title: "Doubt Session" },
  { imagePath: "/images/Email-Modal/admin.svg", title: "Admin" },
  { imagePath: "/images/Email-Modal/other.svg", title: "Technical Support" },
];

const MessageModal = ({ open, handleClose }) => {
  const [screen, setScreen] = useState("message");

  return (
    <Dialog
      onClose={() => {
        handleClose();
      }}
      open={open}
      className="email-modal"
      style={{
        background: "#0F31754D",
      }}
    >
      {screen === "message" ? (
        <div className="message-box">
          <div className="message-header">
            <span className="message-text">Message</span>
            <img
              src="/images/Email-Modal/close.svg"
              alt="close-sign"
              className="close-sign"
              onClick={() => handleClose()}
            />
          </div>
          {data.map((item) => (
            <div className="message-row" onClick={() => setScreen(item.title)}>
              <img
                src={item.imagePath}
                alt="support-icon"
                className="message-images"
              />
              <span className="message-title">{item.title}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="chat-row">
          <div className="chat-header">
            <div className="chat-left-side">
              <img
                src="/images/Email-Modal/leftArrow.svg"
                alt="left-arrow"
                className="left-arrow"
                onClick={() => setScreen("message")}
              />
              <img
                src="/images/Email-Modal/adminicon.svg"
                alt="admin-icon"
                className="admin-images"
              />
              <span className="chat-title">Admin</span>
            </div>

            <img
              src="/images/Email-Modal/close.svg"
              alt="close-sign"
              onClick={() => handleClose()}
            />
          </div>
          <div className="chat-body">
            <div className="chat-contant-top"></div>
            <div className="chat-contant-bottom">
              <div className="chat-text">
                <span className="chat-text-message">
                  Hello Teacher, I’m not good
                </span>
                <span className="chat-text-message">
                  Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Nam. consectetur
                </span>
              </div>
              <button className="chat-button">Request</button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default MessageModal;
