import React, { useState, useEffect, useContext } from "react";

import { useCookie } from "react-use";
import dayjs from "dayjs";
import dimond from "./images/squire.png";

import { PickersDay } from "@mui/x-date-pickers";
import { Badge, Tooltip } from "@mui/material";
import { mentorContext } from "../Mentor/context";
import Batch from "./Batch";
import axios from "axios";
import MentorCalendar from "../Common/Calendar/MentorCalendar";
import MentorPerformanceChart from "../Dashboard/MentorPerformanceChart";
// import { ApiBaseURL, ApiEndpoints } from "../ApiConfig";
import Swal from "sweetalert2";
import "./coursesyllabus.css";
import { ApiBaseURL } from "../../services/config/Endpoints";

const CourseSyllabus = () => {
  const { batchInfo } = useContext(mentorContext);
  const [activeCourse, setActiveCourse] = useState(null);
  const [showSyllabus, setShowSyllabus] = useState(true);
  const [showBatch, setShowBatch] = useState(false);
  const [syllabusData, setSyllabusData] = useState(null);
  const [clickedBatchType, setClickedBatchType] = useState(null);

  const [courses, setCourses] = useState([]);
  const [loggedIn] = useCookie("maang");
  const [timetables, setTimeTables] = useState();
  const [highlightedDays, setHighlightedDays] = useState();
  const [myProgress, setMyProgress] = useState({
    classesRemaining: 0,
    classesCompleted: 0,
    totalClass: 0,
    endDate: null,
    startDate: null,
  });
  const [expandedDays, setExpandedDays] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log(activeCourse);
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${ApiBaseURL}mentor-management/inst-course-list/`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );

        const { message, courses } = response.data;

        if (message === 1 && courses && courses.length > 0) {
          const coursesData = courses.map(({ course_id, course__name }) => ({
            id: course_id,
            name: course__name,
          }));
          setLoading(false);
          setCourses(coursesData);

          if (coursesData.length > 0) {
            handleCourseClick(coursesData[0].id);
            handleSyllabusClick(coursesData[0].id);
          }
        }
      } catch (error) {
        setLoading(false);
        // console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [loggedIn]);

  const handleCourseClick = async (courseId) => {
    handleSyllabusClick(courseId);
    setActiveCourse(courseId);
    setShowSyllabus(true);
    setShowBatch(false);
  };

  const handleBatchClick = () => {
    setShowSyllabus(false);
    setShowBatch(true);
    setClickedBatchType("batches");
  };
  useEffect(() => {
    setHighlightedDaysForCalendar();
  }, [timetables]);

  const handleMonthChange = (date) => {
    setHighlightedDaysForCalendar(date);
  };

  function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) >= 0;

    return isSelected ? (
      <Tooltip title="Course">
        <Badge key={props.day.toString()} overlap="circular">
          <PickersDay
            {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
            style={{ background: "#40C2D4", color: "white", border: 0 }}
          />
        </Badge>
      </Tooltip>
    ) : (
      <Badge key={props.day.toString()} overlap="circular">
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  }

  const setHighlightedDaysForCalendar = (currentDate = dayjs()) => {
    if (!timetables || timetables.length <= 0) {
      setHighlightedDays([]);
      return;
    }

    let ongoingBatchesFiltered = timetables.filter((record) =>
      dayjs(`${record.start_date} ${record.start_time}`).isSame(
        currentDate,
        "month"
      )
    );

    const upcomingBatches = ongoingBatchesFiltered.map((x) => {
      return dayjs(x.start_date).get("date");
    });

    setHighlightedDays(upcomingBatches);
  };

  const handleSyllabusClick = async (activeCourse) => {
    setActiveCourse(activeCourse);
    setShowSyllabus(true);
    setShowBatch(false);
    setClickedBatchType("syllabus");

    try {
      const response = await axios.get(
        `${ApiBaseURL}mentor-management/course-syllabus/?course_id=${activeCourse}`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      );

      const { message, all_data } = response.data;

      if (message === 1 && all_data.length > 0) {
        const syllabusData = all_data.reduce((acc, data) => {
          const existingWeek = acc.find((week) => week.week === data.week);

          if (existingWeek) {
            existingWeek.days.push({
              topic: data.topic,
              file: data.file,
              description: data.description,
            });
          } else {
            acc.push({
              week: data.week,
              days: [
                {
                  topic: data.topic,
                  file: data.file,
                  description: data.description,
                },
              ],
            });
          }

          return acc;
        }, []);

        setSyllabusData(syllabusData);
      }
    } catch (error) {
      Swal.fire({
        text: "course specific syllabus not found",
        confirmButtonColor: "rgb(20,184,166)",
      }).then(() => {
        handleCourseClick(courses[0].id);
        handleSyllabusClick(courses[0].id);
      });
    }
  };

  const toggleAccordion = (weekIndex, dayIndex) => {
    const isExpanded = expandedDays.includes(`${weekIndex}-${dayIndex}`);
    if (isExpanded) {
      setExpandedDays(
        expandedDays.filter((day) => day !== `${weekIndex}-${dayIndex}`)
      );
    } else {
      setExpandedDays([`${weekIndex}-${dayIndex}`]);
    }
  };

  const formatTextWithLineBreaks = (text) => {
    if (text) {
      return text.replace(/\r\n/g, "<br>");
    } else {
      return "";
    }
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap -mx-3 gap-y-4">
        {courses && courses.length > 0 ? (
          <div className="xl:w-[calc(100%-320px)] w-full px-3">
            <div className="inline-flex flex-wrap gap-3 p-2 bg-[#E0F6F4] rounded-[30px] mb-4">
              {courses.map((course) => (
                <button
                  key={course.id}
                  className={`px-5 py-2.5 text-base font-medium rounded-[25px] justify-center items-center bg-white gap-2.5 inline-flex ${
                    activeCourse === course.id
                      ? "bg-gradient-to-l from-teal-400 to-sky-400 text-white"
                      : "bg-sky-200 hover:bg-sky-300 text-sky-800"
                  }`}
                  onClick={() => handleCourseClick(course.id, course.name)}
                >
                  {course.name}
                </button>
              ))}
            </div>

            <br></br>
            <br></br>
            <div className="p-5 rounded-2xl  shadow-[0px_5px_25px_0px_rgba(59,154,168,0.15)] bg-white custom-height">
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded-full ${
                    clickedBatchType === "syllabus"
                      ? "bg-[#35C69D] text-white"
                      : "bg-[#35C69D1A] text-[#35C69D]"
                  } `}
                  onClick={() => handleSyllabusClick(activeCourse)}
                >
                  Syllabus
                </button>
                <button
                  className={`px-4 py-2 rounded-full ${
                    clickedBatchType === "batches"
                      ? "bg-[#35C69D] text-white"
                      : "bg-[#35C69D1A] text-[#35C69D]"
                  } `}
                  onClick={() => handleBatchClick(activeCourse)}
                >
                  Batches
                </button>
              </div>

              <div className="week-list">
                {!showBatch &&
                  (showSyllabus || showBatch) &&
                  syllabusData !== null && (
                    <div>
                      {syllabusData.map((weekData, weekIndex) => (
                        <div key={weekIndex}>
                          <h2 className="text-center font-medium font-['Outfit']">
                            Week {weekData.week}
                          </h2>
                          <div
                            className="mb-5"
                            style={{
                              // height: "176.54px",
                              maxHeight: "600px",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <div className="flex flex-col mt-10 weekbox">
                              {weekData.days.map((day, dayIndex) => (
                                <div
                                  key={dayIndex}
                                  className={`flex pt-3 pb-3 pl-3 pr-12  mb-2 weeksinglebox smothanimation border rounded-lg bg-[#35C69D1A] ${
                                    expandedDays.includes(
                                      `${weekIndex}-${dayIndex}`
                                    )
                                      ? "border-emerald-400"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    toggleAccordion(weekIndex, dayIndex)
                                  }
                                  style={{
                                    cursor: "pointer",
                                    flexDirection: "column",
                                    height: "auto",
                                  }}
                                >
                                  <a href="#" className="dlbtn">
                                    <i
                                      class="fa fa-download"
                                      aria-hidden="true"
                                    ></i>
                                  </a>
                                  <span className="flex gap-2">
                                    Day {dayIndex + 1}:{" "}
                                    <p className="font-medium font-['Outfit']">
                                      {day.topic}
                                    </p>
                                  </span>
                                  {expandedDays.includes(
                                    `${weekIndex}-${dayIndex}`
                                  ) && (
                                    <div className="p-2  rounded-b-lg">
                                      <p>Description:</p>
                                      <br></br>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: formatTextWithLineBreaks(
                                            day.description
                                          ),
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                {showBatch && <Batch course_id={activeCourse} />}
              </div>
            </div>
          </div>
        ) : courses.length > 0 && !loading ? (
          <div className="xl:w-[calc(100%-320px)] w-full px-3">
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
                Alass! There are no courses assigned to you at the time! For
                more information, please contact the management team at
                support.maangcareers.com.
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="xl:w-[320px] w-full px-3">
          <div className="xl:overflow-visible sm:overflow-auto">
            <div className="xl:block sm:flex xl:mx-0 gap-x-4">
              <div className="xl:px-0 xl:w-full sm:w-6/12 w-full sm:mb-0 mb-4 sm:block hidden">
                <MentorCalendar />
              </div>
              <div className="xl:px-0 xl:w-full sm:w-6/12 w-full">
                <MentorPerformanceChart batchInfo={batchInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSyllabus;
