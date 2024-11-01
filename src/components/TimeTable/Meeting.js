import React from "react";
import Dayjs from "dayjs";
import "./meeting.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookie } from "react-use";
import { ApiBaseURL } from "../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../ApiConfig";
function Meeting() {
  const [loggedIn] = useCookie("maang");
  const borderColor = ["#35C69D", "#118EDE", "#F39F24"];
  const today = Dayjs(new Date()).format("DD MMMM YYYY");
  const [meetings, setMeetings] = useState([]);
  const [ongoingMeetings, setOngoingMeetings] = useState([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [recentMeetings, setRecentMeetings] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${ApiBaseURL}test-management/std-onging-upcoming/`,
            {
              headers: {
                Authorization: `Token ${JSON.parse(loggedIn).token}`,
              },
            }
          );
          const data = response.data.response_data;

          setOngoingMeetings(data.ongoing);

          setUpcomingMeetings(data.upcoming);

          setRecentMeetings(data.recent_passed);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      fetchData();
    }
  }, [loggedIn]);

  const allMeetings = [...ongoingMeetings, ...upcomingMeetings];

  return (
    <div className="xl:h-[867px] overflow-y-auto text-left">
      <span className="title">Upcoming Meeting</span>
      {allMeetings && allMeetings.length > 0 ? (
        <div className="upcoming-meeting-wrapper">
          <div className="upcoming-meeting-header">
            <div className="link-header">
              <a className="view-all-link" style={{ display: "none" }} href="#">
                View all&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.5 0.113251L13.5 5L8.5 9.88675V5.5H0V4.5H8.5V0.113251Z"
                    fill="#2DB2C4"
                  />
                </svg>
              </a>
            </div>
          </div>
          <span className="description">{`Today, ${today}`}</span>
          <div className="map-course mb-4">
            {allMeetings.slice(0, 3).map((meeting, idx) => {
              // console.log("Meeting object:", meeting);

              return (
                <div className="course-box">
                  <div
                    className="course-box-line"
                    style={{
                      background: borderColor[idx % borderColor.length],
                    }}
                  ></div>
                  <div className="course-box-body">
                    <div className="course-box-header-wrapper !items-start gap-x-2">
                      <div className="mb-2">
                        <div className="course-box-header-title">
                          Batch {"  "}
                          {meeting.batch_id} :
                          {meeting.time_table_topic || "Meeting"}
                        </div>
                        <div className="course-box-topic">
                          {meeting.today_topic}
                        </div>
                      </div>
                      <div className="course-box-header-online">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="5"
                          height="5"
                          viewBox="0 0 5 5"
                          fill="none"
                        >
                          <circle cx="2.5" cy="2.5" r="2.5" fill="#35C69D" />
                        </svg>
                        {/* <span className="course-box-header-online-text">
                          Online
                        </span> */}
                        <span className="course-box-header-online-text">
                          {meeting?.link ? "Online" : "Offline"}
                        </span>
                      </div>
                    </div>
                    <div className="course-box-date-wrapper">
                      <div className="course-box-date-time-wrapper">
                        <div className="course-box-date-body">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5.18632 0C4.83833 0 4.55622 0.287998 4.55622 0.643263V1.28719H3.05257C1.92325 1.28719 1 2.18045 1 3.2919V12.9953C1 14.1067 1.92325 15 3.05257 15H13.0099C14.1392 15 15.0625 14.1067 15.0625 12.9953V3.2919C15.0625 2.18045 14.1392 1.28719 13.0099 1.28719H11.5063V0.643263C11.5063 0.287999 11.2242 0 10.8762 0C10.5282 0 10.2461 0.287999 10.2461 0.643263V1.28719H5.81641V0.643263C5.81641 0.287998 5.53431 0 5.18632 0ZM2.26019 3.2919C2.26019 2.87219 2.61066 2.52421 3.05257 2.52421H4.55622V3.54768C4.55622 3.90294 4.83833 4.19094 5.18632 4.19094C5.53431 4.19094 5.81641 3.90294 5.81641 3.54768V2.52421H10.2461V3.54768C10.2461 3.90294 10.5282 4.19094 10.8762 4.19094C11.2242 4.19094 11.5063 3.90294 11.5063 3.54768V2.52421H13.0099C13.4518 2.52421 13.8023 2.87219 13.8023 3.2919V5.80883H2.26019V3.2919ZM2.26019 12.9953V7.09536H13.8023V12.9953C13.8023 13.415 13.4518 13.763 13.0099 13.763H3.05257C2.61066 13.763 2.26019 13.415 2.26019 12.9953ZM13.0567 10.0927H10.8861V12.3086H13.0567V10.0927Z"
                              fill="#595F6E"
                            />
                          </svg>
                          <span className="course-box-date">
                            {" "}
                            {Dayjs(meeting.meetingDate).format("DD MMMM YYYY")}
                          </span>
                        </div>
                        <div className="course-box-date-body">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M1 7.99989C1 4.14012 4.14031 0.999771 8.00012 0.999771C11.8599 0.999771 15.0002 4.14012 15.0002 7.99989C15.0002 11.8599 11.8601 15.0002 8.00012 15.0002C4.14035 15.0002 1 11.8599 1 7.99989ZM2.26888 8.00014C2.26888 11.1604 4.83991 13.7316 8.00012 13.7316C11.1603 13.7316 13.7314 11.1605 13.7314 8.00014C13.7314 4.83994 11.1604 2.2689 8.00012 2.2689C4.83988 2.2689 2.26888 4.83994 2.26888 8.00014ZM8.25397 7.78838H9.94582C10.2962 7.78838 10.5803 8.0724 10.5803 8.42283C10.5803 8.77326 10.2963 9.05729 9.94585 9.05729H7.61952C7.26909 9.05729 6.98506 8.77326 6.98506 8.42283V5.33516C6.98506 4.98473 7.26909 4.7007 7.61952 4.7007C7.96995 4.7007 8.25397 4.98473 8.25397 5.33516V7.78838Z"
                              fill="#595F6E"
                            />
                          </svg>
                          <span className="course-box-time">
                            {meeting.start_date && meeting.start_time
                              ? Dayjs(
                                  `${meeting.start_date}T${meeting.start_time}`,
                                  "DD MMMM YYYYTHH:mm"
                                ).format("h:mm A")
                              : "Time not available"}
                          </span>
                        </div>
                      </div>
                      <button
                        className={`btn btn-join !h-auto !py-1 ${
                          !meeting.link ? "btn-join-disabled" : ""
                        }`}
                        disabled={!meeting.link}
                        onClick={() => {
                          if (meeting.link) {
                            window.open(meeting.link, "_blank");
                          }
                        }}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="no-meetings-message">
          <span>There is no class schedule yet.</span>
        </div>
      )}
      <span className="title">Previous Meeting</span>
      {recentMeetings && recentMeetings.length > 0 ? (
        <div className="upcoming-meeting-wrapper ">
          <div className="upcoming-meeting-header">
            {/* <span className="description">{`Today, ${today}`}</span> */}
            <div className="link-header">
              <a className="view-all-link" href="#" style={{ display: "none" }}>
                View all&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.5 0.113251L13.5 5L8.5 9.88675V5.5H0V4.5H8.5V0.113251Z"
                    fill="#2DB2C4"
                  />
                </svg>
              </a>
            </div>
          </div>
          <span className="description">{`Today, ${today}`}</span>
          <div className="map-course xl:block md:flex overflow-x-auto tab-screen:gap-x-4">
            {recentMeetings.map((meeting, idx) => {
              return (
                <div className="course-box sm:!w-[300px] sm:!max-w-[300px] sm:!min-w-[300px] !w-[280px] !max-w-[280px] !min-w-[280px] xl:w-full md:mr-0">
                  <div
                    className="course-box-line"
                    style={{
                      background: borderColor[idx % borderColor.length],
                    }}
                  ></div>
                  <div className="course-box-body">
                    <div className="course-box-header-wrapper !items-start gap-x-2">
                      <div className="mb-2">
                        <div className="course-box-header-title">
                          Batch {"  "}
                          {meeting.batch_id} :{meeting.time_table_topic}
                        </div>
                        <div className="course-box-topic">
                          {meeting.today_topic}
                        </div>
                      </div>
                      <div className="course-box-header-online">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="5"
                          height="5"
                          viewBox="0 0 5 5"
                          fill="none"
                        >
                          <circle cx="2.5" cy="2.5" r="2.5" fill="#35C69D" />
                        </svg>
                        {/* <span className="course-box-header-online-text">
                          Online
                        </span> */}
                        <span className="course-box-header-online-text">
                          {meeting?.link ? "Online" : "Offline"}
                        </span>
                      </div>
                    </div>
                    <div className="course-box-date-wrapper">
                      <div className="course-box-date-time-wrapper">
                        <div className="course-box-date-body">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5.18632 0C4.83833 0 4.55622 0.287998 4.55622 0.643263V1.28719H3.05257C1.92325 1.28719 1 2.18045 1 3.2919V12.9953C1 14.1067 1.92325 15 3.05257 15H13.0099C14.1392 15 15.0625 14.1067 15.0625 12.9953V3.2919C15.0625 2.18045 14.1392 1.28719 13.0099 1.28719H11.5063V0.643263C11.5063 0.287999 11.2242 0 10.8762 0C10.5282 0 10.2461 0.287999 10.2461 0.643263V1.28719H5.81641V0.643263C5.81641 0.287998 5.53431 0 5.18632 0ZM2.26019 3.2919C2.26019 2.87219 2.61066 2.52421 3.05257 2.52421H4.55622V3.54768C4.55622 3.90294 4.83833 4.19094 5.18632 4.19094C5.53431 4.19094 5.81641 3.90294 5.81641 3.54768V2.52421H10.2461V3.54768C10.2461 3.90294 10.5282 4.19094 10.8762 4.19094C11.2242 4.19094 11.5063 3.90294 11.5063 3.54768V2.52421H13.0099C13.4518 2.52421 13.8023 2.87219 13.8023 3.2919V5.80883H2.26019V3.2919ZM2.26019 12.9953V7.09536H13.8023V12.9953C13.8023 13.415 13.4518 13.763 13.0099 13.763H3.05257C2.61066 13.763 2.26019 13.415 2.26019 12.9953ZM13.0567 10.0927H10.8861V12.3086H13.0567V10.0927Z"
                              fill="#595F6E"
                            />
                          </svg>
                          <span className="course-box-date">
                            {" "}
                            {Dayjs(meeting.start_date).format("DD MMMM YYYY")}
                          </span>
                        </div>
                        <div className="course-box-date-body">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M1 7.99989C1 4.14012 4.14031 0.999771 8.00012 0.999771C11.8599 0.999771 15.0002 4.14012 15.0002 7.99989C15.0002 11.8599 11.8601 15.0002 8.00012 15.0002C4.14035 15.0002 1 11.8599 1 7.99989ZM2.26888 8.00014C2.26888 11.1604 4.83991 13.7316 8.00012 13.7316C11.1603 13.7316 13.7314 11.1605 13.7314 8.00014C13.7314 4.83994 11.1604 2.2689 8.00012 2.2689C4.83988 2.2689 2.26888 4.83994 2.26888 8.00014ZM8.25397 7.78838H9.94582C10.2962 7.78838 10.5803 8.0724 10.5803 8.42283C10.5803 8.77326 10.2963 9.05729 9.94585 9.05729H7.61952C7.26909 9.05729 6.98506 8.77326 6.98506 8.42283V5.33516C6.98506 4.98473 7.26909 4.7007 7.61952 4.7007C7.96995 4.7007 8.25397 4.98473 8.25397 5.33516V7.78838Z"
                              fill="#595F6E"
                            />
                          </svg>
                          <span className="course-box-time">
                            {meeting.start_date && meeting.start_time
                              ? Dayjs(
                                  `${meeting.start_date}T${meeting.start_time}`,
                                  "DD MMMM YYYYTHH:mm"
                                ).format("h:mm A")
                              : "Time not available"}
                          </span>
                        </div>
                      </div>
                      <button
                        className={`btn btn-join !h-auto !py-1 ${
                          !meeting.link ? "btn-join-disabled" : ""
                        }`}
                        disabled={!meeting.link}
                        onClick={() => {
                          if (meeting.link) {
                            window.open(meeting.link, "_blank");
                          }
                        }}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="no-meetings-message">
          <span>There is no class schedule yet.</span>
        </div>
      )}
    </div>
  );
}

export default Meeting;
