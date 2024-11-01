import React, { useEffect, useState } from "react";
import { addDays, addWeeks, differenceInDays } from "date-fns";
import { useCookie } from "react-use";
import { DUMMY_NOTES } from "../../../utils";
import { ApiBaseURL } from "../../ApiConfig";
import axios from "axios";
const topic = "Data Structure";
const borderColor = ["#35C69D", "#118EDE", "#F39F24"];

const Note = ({ courseInfo, courseInfoName, courseId }) => {
  const [loggedIn] = useCookie("maang");
  const [noteList, setNoteList] = useState([]);
  const [authToken, setAuthToken] = useState(null);
  const today = new Date();
  const courseName = courseInfo?.name || "";
  const courseStartDate = courseInfo?.start_date || "";
  const courseEndDate = courseInfo?.end_date || "";
  // const { name: courseName, start_date: courseStartDate } = courseInfo;
  // console.log("course:", courseInfoName);

  const generateWeeksFromDate = (list) => {
    // console.log("List", list);
    if (!list || list.length === 0) {
      return DUMMY_NOTES;
    }

    const filterList = list.map((item) => {
      const numWeeks = parseInt(item.week, 10) - 1;
      const week_start_date = addWeeks(new Date(courseStartDate), numWeeks);
      const week_end_date = addDays(week_start_date, 6);

      return {
        week_start_date,
        week_end_date,
        ...item,
      };
    });
    return filterList;
  };

  // const login = async () => {
  //   try {
  //     const response = await axios.post(
  //       "${ApiBaseURL}api/login/",
  //       {
  //         username: "akhilgunti91@gmail.com",
  //         password: "Callofduty@1",
  //       }
  //     );

  //     const token = response.data.token;
  //     setAuthToken(token);
  //     console.log("Login successful:", token);
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  // };

  // useEffect(() => {
  //   login();
  // }, []);

  useEffect(() => {
    if (loggedIn) {
      fetch(
        `${ApiBaseURL}mentor-management/inst-week-notes/?course_id=${courseId}`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const weeks = generateWeeksFromDate(data.main_data);
          setNoteList(weeks);
        })
        .catch((err) => console.error(err));
    }
  }, [courseId]);

  const Layout = ({ children, isDisabled, tag }) => {
    if (isDisabled) {
      return (
        <div className="bg-note">
          <div className="bg-note-content">
            <img src="/images/Practice/lock.svg" alt="lock icon" />
            <span>{tag}</span>
          </div>
          {children}
        </div>
      );
    }

    return children;
  };

  //-- old code before cross origin code (change) commit on 13-10-2023 --
  // const handleDownload = (url, topic) => {
  //   fetch(url)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = `${topic}.pdf`;
  //       document.body.appendChild(a);
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //     });
  // };

  const handleDownload = (url, topic) => {
    const link = document.createElement("a");
    link.download = `${topic}.pdf`;
    link.href = url;
    window.open(link.href, "_blank");
    // link.click();
  };

  const DownloadCTA = ({ data, disabledClass }) => (
    <img
      style={{ cursor: "pointer" }}
      className={`${disabledClass}-img absolute bottom-2 right-2`}
      alt="download icon"
      src="/images/Practice/download.svg"
      onClick={() => handleDownload(data?.file, data?.topic)}
    />
  );

  const calculatedDate = differenceInDays(today, new Date(courseStartDate)) + 1;

  return (
    <div className="note-wrapper">
      <div className="note-header">
        <div className="text">
          <span className="title">Notes</span>
          {noteList && noteList.length > 0 && (
            <span className="sub-title">{`Total ${noteList?.length} Weeks`}</span>
          )}
        </div>
      </div>
      {noteList && noteList.length > 0 ? (
        <div className="note-body lg:h-[calc(100vh-125px)]  overflow-y-auto">
          {noteList.map((noteInfo, idx) => {
            const { week, file, week_status, topic, condition } = noteInfo;
            const tag = `Week ${week || idx + 1}`;
            const multiply = (parseInt(week) - 1) * 7;
            const disabled = week_status === "unlock" ? false : true;
            const color = borderColor[idx % borderColor.length];
            const disabledClass = disabled ? "note-disabled" : "";

            // console.log("tags:", tag);

            return (
              <Layout isDisabled={!!disabledClass} tag={tag} key={idx}>
                <div className={`note-card ${disabledClass}-card`}>
                  <div
                    className="note-box-line"
                    style={{ background: color }}
                  ></div>
                  <div className="note-content relative !pe-10">
                    <span
                      className="title !text-base !font-normal mb-1"
                      style={{ color }}
                    >
                      {tag}
                    </span>
                    <span className="text-gray-700 text-base font-semibold mb-1">
                      {courseInfoName || `${courseName}`}
                    </span>

                    <div className="topic-wrapper">
                      <div className="flex">
                        <span className="text-gray-600 text-base font-normal me-1">
                          Topic:
                        </span>

                        {topic ? (
                          <span className="text-gray-700 text-base font-medium">
                            {topic}
                          </span>
                        ) : (
                          <span className="text-red-500 text-base font-medium">
                            No topic available
                          </span>
                        )}
                      </div>
                      {!file || !topic ? (
                        <span className="inline-block mt-2 py-1 px-3 text-red-500 border border-solid border-red-100 rounded-md bg-red-50 ">
                          {condition || "No notes at this moment"}
                        </span>
                      ) : (
                        !disabled && (
                          <DownloadCTA
                            data={{ file, topic }}
                            disabledClass={disabledClass}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </Layout>
            );
          })}
        </div>
      ) : (
        <p className="note-error-message">No note available</p>
      )}
    </div>
  );
};
export default Note;
