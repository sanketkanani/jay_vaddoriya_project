import React, { useState, useContext, useEffect } from "react";
import { useCookie } from "react-use";
import "./index.css";
import Mock from "./Mock";
import OnGoing from "./OnGoing";
import { studentContext } from "../Student/context";
import MockResult from "./MockResult";
import Swal from "sweetalert2";
import { useNavigate, UNSAFE_NavigationContext } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { ApiBaseURL } from "../../services/config/Endpoints";
// import { ApiBaseURL } from "../ApiConfig";

const MockTest = () => {
  const [loggedIn] = useCookie("maang");
  const {
    screen,
    setScreen,
    setIsShowMiniSidebar,
    isShowMiniSidebar,
    selectedCourseIdForMock,
    setSelectedCourseIdForMock,
  } = useContext(studentContext);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    end_date: "",
    start_date: "",
  });
  const [week, setWeek] = useState(null);
  const navigate = useNavigate();

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
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [loggedIn]); // Add loggedIn as a dependency to useEffect

  useEffect(() => {
    if (loggedIn) {
      const apiUrl = `${ApiBaseURL}test-management/std-all-courese/`;
      // "${ApiBaseURL}test-management/std-all-courese/";
      const token = JSON.parse(loggedIn).token;

      fetch(apiUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const courseNames = data?.Main_Course?.map((course) => ({
            id: course.id,
            name: course.name,
          }));

          setTags(courseNames);
          const defaultCourseId =
            courseNames.length > 0 ? courseNames[0].id : null;
          setTag(defaultCourseId);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  const handleCourseClick = (id) => {
    setSelectedCourseIdForMock(null);
    setTag(id);
  };

  // useEffect(() => {
  //   // Cleanup logic when screen state changes
  //   if (screen === "start") {
  //     setScreen("");
  //     setIsShowMiniSidebar(!isShowMiniSidebar);
  //   }
  // }, [screen]);

  useEffect(() => {
    if (screen === "result-new") {
      setScreen(screen);
    }
    return () => {
      // console.log("Opa screen", screen);
      if (screen === "start") {
        setScreen("");
        setIsShowMiniSidebar(!isShowMiniSidebar);
      }
    };
  }, [screen]);

  const renderScreen = () => {
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      );
    }
    if (screen === "start") return <OnGoing courseId={tag} week={week} />;
    if (screen === "result-new")
      return (
        <div className="p-5">
          <MockResult
            setScreen={setScreen}
            courseId={tag}
            setWeek={setWeek}
            key={tag}
            week={week}
            setIsShowMiniSidebar={setIsShowMiniSidebar}
            isShowMiniSidebar={isShowMiniSidebar}
          />
        </div>
      );
    if (screen === "")
      return (
        <>
          <div class="p-5">
            <div class="flex flex-wrap -mx-3 gap-y-4">
              <div className="w-full px-3">
                <div className="gap-1 overflow-x-scroll hide-scrollbar ">
                  <div className="course-tags">
                    {tags.map(
                      (
                        { id, name } // Destructure id and name from the map function
                      ) => (
                        <div
                          key={id}
                          className={
                            id === (selectedCourseIdForMock || tag)
                              ? "active-tag"
                              : ""
                          }
                          onClick={() => handleCourseClick(id)}
                        >
                          <span>{name}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <Mock
                  setScreen={setScreen}
                  courseId={tag}
                  setWeek={setWeek}
                  key={tag}
                  selectedCourseIdForMock={selectedCourseIdForMock}
                />
              </div>
            </div>
          </div>
        </>
      );
  };

  return <>{renderScreen()}</>;
};

export default MockTest;
