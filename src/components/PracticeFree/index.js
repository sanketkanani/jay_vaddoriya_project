import React, { useState, useContext, useEffect } from "react";
import { useCookie } from "react-use";
import "./index.css";
import Note from "./Note";
import Course from "./Course";
import OnGoing from "./OnGoing";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiBaseURL } from "../../services/config/Endpoints";
import { freeContext } from "../free/context";
// import { ApiBaseURL } from "../ApiConfig";

const FreePractice = (props) => {
  const [loggedIn] = useCookie("maang");
  const { screen, setScreen, setIsShowMiniSidebar, isShowMiniSidebar } =
    useContext(freeContext);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState(null);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    end_date: "",
    start_date: "",
  });
  const [week, setWeek] = useState(null);
  const [activeCourseName, setActiveCourseName] = useState(""); // State to store the selected course name

  const location = useLocation();
  const { userProps } = location.state || {};

  useEffect(() => {
    if (userProps?.courseId && userProps?.weekId) {
      setTag(userProps?.courseId);
      setWeek(userProps?.weekId);
      setScreen("start");
    }
  }, [userProps]);

  // useEffect(() => {
  //   if (loggedIn) {
  //     fetch(
  //       `${ApiBaseURL}course-management/user-batch/`,
  //       {
  //         headers: {
  //           Authorization: `Token ${JSON.parse(loggedIn).token}`,
  //         },
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const { course, end_date, start_date } = data?.results?.[0] || {
  //           course: {
  //             name: "Interview Preparation Course Name",
  //           },
  //           end_date: null,
  //           start_date: "2030-05-09",
  //         };

  //         setCourseInfo({
  //           end_date,
  //           start_date,
  //           name: course?.name || "",
  //         });

  //         // Update the active course name when fetching course info
  //         setActiveCourseName(course?.name || "");
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      const apiUrl = `${ApiBaseURL}free-course-management/student-free-course-list/`;
      const token = JSON.parse(loggedIn).token;

      fetch(apiUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const courseNames = data?.data?.map((course) => ({
            id: course.id,
            name: course.name,
          }));
          setTags(courseNames);
          const defaultCourseId =
            courseNames.length > 0 ? courseNames[0].id : null;
          setTag(defaultCourseId);
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  const handleCourseClick = (id, name) => {
    setTag(id);
    setActiveCourseName(name); // Update active course name when a tag is clicked
  };

  useEffect(() => {
    setIsShowMiniSidebar(false);
  }, []);

  const renderScreen = () => {
    return (
      <>
        <div className="p-5">
          <div className="flex flex-wrap -mx-3 gap-y-4">
            <div className="  w-full px-3">
              <div className="gap-1 overflow-x-scroll hide-scrollbar ">
                <div className="course-tags ">
                  {tags &&
                    tags.length > 0 &&
                    tags.map(({ id, name }) => (
                      <div
                        key={id}
                        className={id === tag ? "active-tag" : ""}
                        onClick={() => handleCourseClick(id, name)}
                        style={{ width: "max-content" }}
                      >
                        <span>{name}</span>
                      </div>
                    ))}
                </div>
              </div>
              <Course
                setScreen={setScreen}
                courseId={tag}
                setWeek={setWeek}
                key={tag}
                activeCourseName={activeCourseName}
              />
            </div>
            {/* <div className="xl:w-[320px] lg:w-[260px] w-full px-3 right-side-section">
              <Note
                courseInfo={courseInfo}
                courseId={tag}
                key={tag}
                activeCourseName={activeCourseName}
              />
            </div> */}
          </div>
        </div>
      </>
    );
  };

  return <>{renderScreen()}</>;
};

export default FreePractice;
