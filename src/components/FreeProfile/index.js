import React, { useEffect, useState, useContext } from "react";
import { studentContext } from "../Student/context";
import { useCookie } from "react-use";
import dayjs from "dayjs";
import PerformanceChart from "../Dashboard/PerformanceChart";
import { PickersDay } from "@mui/x-date-pickers";
import { Badge, Tooltip } from "@mui/material";
import ProfileCard from "./ProfileCard";
import "./index.css";
import Calendar from "../Common/Calendar";
// import { ApiBaseURL } from "../ApiConfig";

const FreeProfile = () => {
  const { quizProgress, mockProgress, batchInfo } = useContext(studentContext);
  const [loggedIn] = useCookie("maang");
  const [timetables, setTimeTables] = useState();
  const [highlightedDays, setHighlightedDays] = useState();
  const [events, setEvents] = useState([]);
  const [myProgress, setMyProgress] = useState([]);
  // const [quizProgress, setQuizProgress] = useState(null);
  // const [mockProgress, setMockProgress] = useState(null);
  // // const [tags, setTags] = useState([]);
  // const [tag, setTag] = useState([]);
  // const [selectedCourseId, setSelectedCourseId] = useState(null);
  // const [myProgress, setMyProgress] = useState({
  //   classesRemaining: 0,
  //   classesCompleted: 0,
  //   totalClass: 0,
  //   endDate: null,
  //   startDate: null,
  // });
  // const [batchInfo, setBatchInfo] = useState({
  //   batchId: null,
  //   courseName: "",
  //   startDate: null,
  //   endDate: null,
  //   totalClasses: 0,
  //   completedClasses: 0,
  //   remainingClasses: 0,
  //   classPercentage: "0.00",
  //   status: "Not Available",
  // });
  // console.log(
  //   "selectedCourseIdForProfile----------",
  //   selectedCourseIdForProfile
  // );

  // useEffect(() => {
  //   fetchStudentAttendanceProgress(selectedCourseIdForProfile);
  //   console.log(
  //     "selectedCourseIdForProfile----------",
  //     selectedCourseIdForProfile
  //   );
  // }, [batchInfo, selectedCourseIdForProfile]);

  // const handleCourseClick = (courseId) => {
  //   setSelectedCourseId(courseId);
  //   fetchStudentAttendanceProgress(courseId);
  //   fetchQuizProgress(courseId);
  //   fetchMockProgress(courseId);
  // };

  // useEffect(() => {
  //   if (loggedIn) {
  //     const apiUrl =
  //       "${ApiBaseURL}test-management/std-all-courese/";
  //     const token = JSON.parse(loggedIn).token;

  //     fetch(apiUrl, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const courseNames = data?.Main_Course?.map((course) => ({
  //           id: course.id,
  //           name: course.name,
  //         }));

  //         setTag(courseNames);
  //         const defaultCourseId =
  //           courseNames.length > 0 ? courseNames[0].id : null;
  //         setSelectedCourseId(defaultCourseId);
  //         fetchQuizProgress(defaultCourseId);
  //         fetchMockProgress(defaultCourseId);
  //         fetchStudentAttendanceProgress(defaultCourseId);
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [loggedIn]);

  // const fetchStudentAttendanceProgress = async (selectedCourseIdForProfile) => {
  //   if (loggedIn) {
  //     const token = JSON.parse(loggedIn).token;
  //     try {
  //       // Fetch Quiz Progress data
  //       const response = await fetch(
  //         `${ApiBaseURL}test-management/stud-attend/?course_id=${selectedCourseIdForProfile}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Token ${token}`,
  //           },
  //         }
  //       );

  //       const studentAttendProgressData = await response.json();
  //       console.log("studentAttendProgressData", studentAttendProgressData);

  //       if (
  //         studentAttendProgressData.coursewise_attendance &&
  //         studentAttendProgressData.coursewise_attendance.length > 0
  //       ) {
  //         const {
  //           batch_id,
  //           course_name,
  //           start_date,
  //           end_date,
  //           total_class,
  //           num_of_completed_classes,
  //           remaining_classes,
  //           cls_percentage,
  //           status,
  //         } = studentAttendProgressData.coursewise_attendance[0];

  //         setBatchInfo({
  //           batchId: batch_id || null,
  //           courseName: course_name || "",
  //           startDate: start_date || null,
  //           endDate: end_date || null,
  //           totalClasses: total_class || 0,
  //           completedClasses: num_of_completed_classes || 0,
  //           remainingClasses: remaining_classes || 0,
  //           classPercentage: cls_percentage || "0.00",
  //           status: status || "Not Available",
  //         });

  //         console.log("setBatchInfo------------->", batchInfo);
  //       } else {
  //         console.error(
  //           "Error in attendance progress response:",
  //           studentAttendProgressData
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching attendance progress for course:", error);
  //     }
  //   }
  // };
  // const fetchQuizProgress = async (courseId) => {
  //   if (loggedIn) {
  //     const token = JSON.parse(loggedIn).token;
  //     try {
  //       // Fetch Quiz Progress data
  //       const response = await fetch(
  //         `${ApiBaseURL}test-management/quizprogress/?course_id=${courseId}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Token ${token}`,
  //           },
  //         }
  //       );

  //       const quizProgressData = await response.json();
  //       console.log("quizProgressData", quizProgressData);

  //       if (quizProgressData.message === 1) {
  //         // setQuizProgress(quizProgressData.data[0] || []);
  //         const {
  //           name,
  //           message,
  //           start_date,
  //           end_date,
  //           avg_score,
  //           rem_score,
  //           running_week,
  //         } = quizProgressData;
  //         setQuizProgress({
  //           name,
  //           message,
  //           start_date,
  //           end_date,
  //           avg_score,
  //           rem_score,
  //           running_week,
  //         });
  //       } else {
  //         console.error("Error in quiz progress response:", quizProgressData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching quiz progress for course:", error);
  //     }
  //   }
  // };
  // const fetchMockProgress = async (courseId) => {
  //   if (loggedIn) {
  //     const token = JSON.parse(loggedIn).token;
  //     try {
  //       // Fetch Quiz Progress data
  //       const response = await fetch(
  //         `${ApiBaseURL}test-management/mockprogress/?course_id=${courseId}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Token ${token}`,
  //           },
  //         }
  //       );

  //       const mockProgressData = await response.json();
  //       console.log("quizProgressData", mockProgressData);

  //       if (mockProgressData.message === 1) {
  //         // setMockProgress(mockProgressData.data[0] || []);
  //         const {
  //           name,
  //           message,
  //           start_date,
  //           end_date,
  //           avg_score,
  //           rem_score,
  //           running_week,
  //         } = mockProgressData;
  //         setMockProgress({
  //           name,
  //           message,
  //           start_date,
  //           end_date,
  //           avg_score,
  //           rem_score,
  //           running_week,
  //         });
  //       } else {
  //         console.error("Error in quiz progress response:", mockProgressData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching quiz progress for course:", error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (loggedIn) {
  //     fetch(
  //       "${ApiBaseURL}course-management/stud-timetable-list/",
  //       {
  //         headers: {
  //           Authorization: `Token ${JSON.parse(loggedIn).token}`,
  //         },
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const currentDateTime = dayjs();

  //         const timeTablesData = data?.all_data || [];

  //         setTimeTables(timeTablesData);

  //         const completedBatches = timeTablesData.filter((record) => {
  //           return dayjs(record.date).isBefore(currentDateTime.add(1, "day"));
  //         });

  //         const upcomingBatches = timeTablesData
  //           .filter((record) => {
  //             return dayjs(record.date).isAfter(currentDateTime.add(1, "day"));
  //           })
  //           .sort((a, b) => {
  //             return new Date(a.date) - new Date(b.date);
  //           });

  //         setMyProgress({
  //           classesCompleted: completedBatches?.length,
  //           classesRemaining: upcomingBatches?.length,
  //           totalClass: timeTablesData?.length,
  //           endDate: null, // Update this with the appropriate property from the API response
  //           startDate: null, // Update this with the appropriate property from the API response
  //         });
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, []);

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
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         const currentDateTime = dayjs();
  //         const {
  //           end_date,
  //           start_date,
  //           timetable: timeTablesData,
  //         } = data?.results?.[0] || {
  //           timetable: [],
  //           end_date: null,
  //           start_date: null,
  //         };

  //         setTimeTables(timeTablesData);

  //         const completedBatches = timeTablesData.filter((record) => {
  //           return dayjs(`${record.start_date} ${record.start_time}`).isBefore(
  //             currentDateTime.add(1, "day")
  //           );
  //         });

  //         const upcomingBatches = timeTablesData
  //           .filter((record) => {
  //             return dayjs(`${record.start_date} ${record.start_time}`).isAfter(
  //               currentDateTime.add(1, "day")
  //             );
  //           })
  //           .sort((a, b) => {
  //             return new Date(a.start_date) - new Date(b.start_date);
  //           });

  //         setMyProgress({
  //           classesCompleted: completedBatches?.length,
  //           classesRemaining: upcomingBatches?.length,
  //           totalClass: timeTablesData?.length,
  //           endDate: end_date,
  //           startDate: start_date,
  //         });
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, []);

  // useEffect(() => {
  //   setHighlightedDaysForCalendar();
  // }, [timetables]);

  // const fetchEvents = async () => {
  //   try {
  //     const response = await fetch("${ApiBaseURL}course-management/stud-timetable-list/",
  //     {
  //       headers: {
  //         Authorization: `Token ${JSON.parse(loggedIn).token}`,
  //       },
  //     });
  //     const eventData = await response.json();
  //     console.log("calendaarrrrr0------------------->", eventData);
  //     const eventsData = eventData.all_data || [];
  //     setEvents(eventsData);
  //     console.log("calendaarrrrr dataaaa--", events);
  //   } catch (error) {
  //     console.error("Error fetching events data:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchEvents();
  // }, [events]);

  const handleMonthChange = (date) => {
    setHighlightedDaysForCalendar(date);
  };

  // function ServerDay(props) {
  //   const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  //   const isSelected =
  //     !props.outsideCurrentMonth &&
  //     highlightedDays.indexOf(props.day.date()) >= 0;

  //   return isSelected ? (
  //     <Tooltip title="Course">
  //       <Badge key={props.day.toString()} overlap="circular">
  //         <PickersDay
  //           {...other}
  //           outsideCurrentMonth={outsideCurrentMonth}
  //           day={day}
  //           style={{ background: "#40C2D4", color: "white", border: 0 }}
  //         />
  //       </Badge>
  //     </Tooltip>
  //   ) : (
  //     <Badge key={props.day.toString()} overlap="circular">
  //       <PickersDay
  //         {...other}
  //         outsideCurrentMonth={outsideCurrentMonth}
  //         day={day}
  //       />
  //     </Badge>
  //   );
  // }

  function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const dayOfWeek = day.format("dddd");

    const isSelected =
      !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

    let dayStyle = {};

    switch (dayOfWeek) {
      case "Monday":
      case "Wednesday":
      case "Friday":
        dayStyle = {
          background: "orange",
          color: "white",
          border: 0,
        };
        break;
      case "Tuesday":
      case "Thursday":
      case "Saturday":
        dayStyle = {
          background: "rgb(64, 194, 212)",
          color: "white",
          border: 0,
        };
        break;
      default:
        dayStyle = {};
        break;
    }

    return isSelected ? (
      <Tooltip title="Course">
        <Badge key={day.toString()} overlap="circular">
          <PickersDay
            {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
            style={{ ...dayStyle }}
          />
        </Badge>
      </Tooltip>
    ) : (
      <Badge key={day.toString()} overlap="circular">
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          style={{ ...dayStyle }}
        />
      </Badge>
    );
  }

  // const setHighlightedDaysForCalendar = (currentDate = dayjs()) => {
  //   if (!timetables || timetables.length <= 0) {
  //     setHighlightedDays([]);
  //     return;
  //   }

  //   const upcomingBatches = timetables
  //     .filter((record) =>
  //       dayjs(record.date).isSame(currentDate, "month")
  //     )
  //     .map((x) => dayjs(x.date).get("date"));

  //   setHighlightedDays(upcomingBatches);
  // };

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

  return (
    // <>
    //   <div className="profile-left-side-content">
    //     <ProfileCard />
    //   </div>
    //   <div className="profile-right-side-content">
    //     <Calendar
    //       highlightedDays={highlightedDays}
    //       ServerDay={ServerDay}
    //       handleMonthChange={handleMonthChange}
    //     />
    //     <PerformanceChart batchInfo={batchInfo} />
    //   </div>
    // </>
    <>
      <div className="p-5">
        <div class="flex flex-wrap -mx-3 gap-y-4">
          <div className="xl:w-[calc(100%-320px)] w-full px-3 ">
            {/* <div className="course-tags">
              {tag.map(({ id, name }) => (
                <div
                  key={id}
                  className={id === selectedCourseId ? "active-tag" : ""}
                  onClick={() => handleCourseClick(id)}
                >
                  <span>{name}</span>
                </div>
              ))}
            </div> */}
            <ProfileCard />
          </div>
          <div className="xl:w-[320px] w-full px-3 right-side-section">
            <div className="xl:overflow-visible sm:overflow-auto">
              <div className="xl:block sm:flex xl:mx-0 gap-x-4">
                <div className="xl:px-0 xl:w-full sm:w-6/12 w-full sm:mb-0 mb-4 sm:block hidden">
                  {/* <Calendar
                    highlightedDays={highlightedDays}
                    ServerDay={ServerDay}
                    handleMonthChange={handleMonthChange}
                  /> */}
                  <Calendar />
                </div>
                <div className="xl:px-0 xl:w-full sm:w-6/12 w-full">
                  <PerformanceChart
                    batchInfo={batchInfo}
                    quizProgress={quizProgress}
                    mockProgress={mockProgress}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreeProfile;
