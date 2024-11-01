// // NotificationPanel.jsx
// import React from "react";
// import { styled } from "@mui/system";

// const NotificationPanel = styled("div")({
//   position: "absolute",
//   top: "50px",
//   right: "20px",
//   maxWidth: "305px",
//   maxHeight: "80vh",
//   overflowY: "auto",
//   background: "rgba(255, 255, 255, 0.5)",
//   backdropFilter: "blur(3px)",
//   zIndex: 9999,
//   padding: "16px",
//   boxSizing: "border-box",
//   borderRadius: "8px",
//   boxShadow: "0px 5px 25px rgba(61.82, 144.24, 156.19, 0.10)",
// });

// const NotificationCard = styled("div")({
//   marginBottom: "12px",
//   padding: "12px",
//   borderRadius: "8px",
//   background: "#fff",
//   boxShadow: "0px 3px 15px 0px rgba(59, 154, 168, 0.15)",
// });

// const CustomNotificationPanel = ({ notifications }) => {
//   console.log("wwwwww------->", notifications);

//   return (
//     <NotificationPanel>
//       <h2>Notifications</h2>
//       <div>
//         {notifications.slice(0, 5).map((notification) => (
//           <NotificationCard key={notification.id}>
//             {notification.content}
//           </NotificationCard>
//         ))}
//       </div>
//     </NotificationPanel>
//   );
// };

// export default CustomNotificationPanel;
// NotificationPanel.jsx
// NotificationPanel.jsx

import React, { useState } from "react";
import { useCookie } from "react-use";
import { styled } from "@mui/system";
import quizIcon from "../../../assets/quiz.svg";
import mockIcon from "../../../assets/mock-test.svg";
import practiceIcon from "../../../assets/practice.svg";
import noImageIcon from "../../../assets/no-img.svg";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";

const NotificationPanel = styled("div")({
  // position: "absolute",
  // top: "70px",
  // right: "20px",
  // width: "300px",
  // maxHeight: "50vh",
  // overflow: "auto",
  // background: "#fff",
  // zIndex: 9999,
  // padding: "15px",
  // boxSizing: "border-box",
  // borderRadius: "8px",
  // boxShadow: "0px 5px 25px rgba(61.82, 144.24, 156.19, 0.10)",
});

const NotificationHeading = styled("h2")({
  // fontSize: "16px",
  // fontWeight: "bold",
  // margin: "0 0 12px",
});

const NotificationCard = styled("div")({});

const NoNotificationMessage = styled("p")({
  fontSize: "16px",
  fontStyle: "italic",
  textAlign: "center",
});

const CustomNotificationPanel = ({
  notifications,
  setSelectedNotificationId,
}) => {
  const [loggedIn] = useCookie("maang");

  const markNotificationAsRead = async (notificationIds, status) => {
    try {
      const token = JSON.parse(loggedIn).token;
      // console.log("Token", token);
      // console.log("notificationIds", notificationIds);
      // console.log("status", status);

      const formData = new FormData();
      formData.append("notification_id", notificationIds);
      formData.append("status_msg", status);
      // console.log("FORM DATA----->", formData);

      const response = await fetch(
        `${ApiBaseURL}user-management/notifications/mark-as-read/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const responseData = await response.json();
        // console.log("RESPONSE MESSAGE--->", responseData);
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const handleNotificationClick = (notificationIds, status) => {
    // console.log("Clicked on notifications with IDs:", notificationIds);
    // setClickedId(notificationIds);
    if (status === "manual notice") {
      setSelectedNotificationId(notificationIds);
    }
    markNotificationAsRead(notificationIds, status);
  };

  // position: "absolute",
  // top: "70px",
  // right: "20px",
  // width: "300px",
  // maxHeight: "50vh",
  // overflow: "auto",
  // background: "#fff",
  // zIndex: 9999,
  // padding: "15px",
  // boxSizing: "border-box",
  // borderRadius: "8px",
  // boxShadow: "0px 5px 25px rgba(61.82, 144.24, 156.19, 0.10)",
  return (
    <NotificationPanel className="py-1 pl-3 pr-2 bg-white rounded-[10px] shadow-xl border absolute top-16 right-5 z-20">
      <div class="left-[50%] absolute -top-4 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-white border-l border-t border-slate-300"></div>
      {/* <NotificationHeading>Notifications</NotificationHeading> */}
      <div className="w-[360px] max-h-[290px] overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard
              className="py-4 border-b border-solid border-slate-300 flex flex-wrap cursor-pointer relative"
              key={notification.notice_id}
              onClick={() =>
                handleNotificationClick(
                  notification.notice_id,
                  notification.status
                )
              }
            >
              {notification.condition === "quiz" && (
                <img
                  src={quizIcon}
                  alt="Quiz Icon"
                  className="w-16 h-16 me-2 p-4 rounded-full bg-slate-300 bg-opacity-40"
                />
              )}
              {notification.condition === "mock" && (
                <img
                  src={mockIcon}
                  alt="Mock Icon"
                  className="w-16 h-16 me-2 p-4 rounded-full bg-slate-300 bg-opacity-40"
                />
              )}
              {notification.condition === "practice" && (
                <img
                  src={practiceIcon}
                  alt="Practice Icon"
                  className="w-16 h-16 me-2 p-4 rounded-full bg-slate-300 bg-opacity-40"
                />
              )}
              {notification.condition === undefined && (
                <img
                  src={noImageIcon}
                  alt="Practice Icon"
                  className="w-16 h-16 me-2 p-4 rounded-full bg-slate-300 bg-opacity-40"
                />
              )}
              <div className="w-[calc(100%-72px)]">
                <p className="text-gray-600 text-sm font-normal font-['Outfit']">
                  {notification.content}
                </p>
                <p
                  className="text-gray-600 text-xs font-normal font-['Outfit']"
                  p
                >
                  Date: {notification.date}
                </p>
              </div>
            </NotificationCard>
          ))
        ) : (
          <NoNotificationMessage>
            No notifications available
          </NoNotificationMessage>
        )}
      </div>
    </NotificationPanel>
  );
};

export default CustomNotificationPanel;
