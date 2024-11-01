import React, { useState, useContext, useEffect } from "react";
import { useCookie } from "react-use";
import "./index.css";
import Course from "./Course";
import { mentorContext } from "../Mentor/context";
import { useLocation } from "react-router-dom";
import { ApiBaseURL } from "../../services/config/Endpoints";
// import { ApiBaseURL } from "../ApiConfig";

const Teaching = (props) => {
  const [loggedIn] = useCookie("maang");
  const {
    screen,
    setScreen,
    setIsShowMiniMentorSidebar,
    isShowMiniMentorSidebar,
    selectedBatchIdForTeaching,
    setSelectedBatchIdForTeaching,
  } = useContext(mentorContext);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState(null);
  const [week, setWeek] = useState(null);
  const [loadmore, setLodmore] = useState(false);

  const location = useLocation();
  const { userProps } = location.state || {};

  useEffect(() => {
    if (userProps?.courseId && userProps?.weekId) {
      setTag(userProps.courseId);
      setWeek(userProps.weekId);
      setScreen("start");
    }
  }, [userProps, setScreen]);

  useEffect(() => {
    if (loggedIn) {
      const apiUrl = `${ApiBaseURL}mentor-management/inst-course/`;
      const token = JSON.parse(loggedIn).token;
      setLodmore(true);
      fetch(apiUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const courseNames = data?.course_batches_details?.map((course) => ({
            id: course.course_id,
            name: course.course__name,
            batchId: course.batch_id,
          }));
          setLodmore(false);
          setTags(courseNames);
          if (courseNames.length > 0) {
            const defaultCourseId = courseNames[0].batchId;
            setTag(defaultCourseId);
          }
        })
        .catch((err) => {
          setLodmore(false);
          console.error("Fetch error:", err);
        });
    }
  }, [loggedIn]);

  const handleCourseClick = (id) => {
    setSelectedBatchIdForTeaching(null);
    setTag(id);
  };

  useEffect(() => {
    setIsShowMiniMentorSidebar(false);
  }, [setIsShowMiniMentorSidebar]);

  const getInitials = (sentence) => {
    let words = sentence.split(" ");
    let initials = [];
    for (let i = 0; i < words.length; i++) {
      if (words[i].toLowerCase() === "for") {
        break;
      } else if (/^[a-zA-Z]+$/.test(words[i])) {
        initials.push(words[i][0].toUpperCase());
      }
    }
    return initials.join("");
  };

  const renderScreen = () => {
    const selectedCourse = tags.find(({ batchId }) => batchId === tag);

    return (
      <>
        <div className="p-5">
          <div className="flex flex-wrap -mx-3 gap-y-4">
            <div className="xl:w-[calc(100%)] lg:w-[calc(100%)] w-full px-3">
              {tags.length > 0 && (
                <div className="gap-1 overflow-x-scroll hide-scrollbar ">
                  <div className="course-tags">
                    {tags.map(({ id, name, batchId }) => (
                      <div
                        key={batchId}
                        className={
                          batchId === (selectedBatchIdForTeaching || tag)
                            ? "active-tag"
                            : ""
                        }
                        onClick={() => handleCourseClick(batchId)}
                      >
                        <span>{`Batch-${batchId} ${getInitials(name)}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tags.length > 0 ? (
                <Course
                  setScreen={setScreen}
                  courseId={selectedCourse.id}
                  batchId={tag}
                  setWeek={setWeek}
                  key={selectedCourse.id}
                  selectedBatchIdForTeaching={selectedBatchIdForTeaching}
                />
              ) : (
                !loadmore && (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100vh",
                    }}
                  >
                    <p
                      style={{ textAlign: "center" }}
                      className="font-small text-slate-500"
                    >
                      Alas! There are no courses assigned to you at the time!
                      For more information, please contact the management team
                      at support.maangcareers.com.
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{renderScreen()}</>;
};

export default Teaching;
