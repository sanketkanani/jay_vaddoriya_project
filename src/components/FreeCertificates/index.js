import React, { useEffect, useState, useContext } from "react";
import { useCookie } from "react-use";
import { studentContext } from "../Student/context";
import dayjs from "dayjs";
import PerformanceChart from "../Dashboard/PerformanceChart";
import { PickersDay } from "@mui/x-date-pickers";
import { Badge, Tooltip } from "@mui/material";
import Calendar from "../Common/Calendar";
import "./index.css";
import CertificateCard from "./CertificateCard";
import { ApiBaseURL } from "../../services/config/Endpoints";
// import { ApiBaseURL } from "../ApiConfig";

const FreeCertificates = () => {
  const { quizProgress, mockProgress, batchInfo } = useContext(studentContext);
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

  useEffect(() => {
    if (loggedIn) {
      // fetch("${ApiBaseURL}course-management/user-batch/", {
      fetch(`${ApiBaseURL}free-course-management/get-certificate/`, {
        headers: {
          Authorization: `Token ${JSON.parse(loggedIn).token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const currentDateTime = dayjs();
          const {
            end_date,
            start_date,
            timetable: timeTablesData,
          } = data?.results?.[0] || {
            timetable: [],
            end_date: null,
            start_date: null,
          };

          setTimeTables(timeTablesData);

          const completedBatches = timeTablesData.filter((record) => {
            return dayjs(`${record.start_date} ${record.start_time}`).isBefore(
              currentDateTime.add(1, "day")
            );
          });

          const upcomingBatches = timeTablesData
            .filter((record) => {
              return dayjs(`${record.start_date} ${record.start_time}`).isAfter(
                currentDateTime.add(1, "day")
              );
            })
            .sort((a, b) => {
              return new Date(a.start_date) - new Date(b.start_date);
            });

          setMyProgress({
            classesCompleted: completedBatches?.length,
            classesRemaining: upcomingBatches?.length,
            totalClass: timeTablesData?.length,
            endDate: end_date,
            startDate: start_date,
          });
        })
        .catch((err) => console.error(err));
    }
  }, []);

  useEffect(() => {
    setHighlightedDaysForCalendar();
  }, [timetables]);

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
    <>
      <div className="p-5">
        <div class="flex flex-wrap -mx-3 gap-y-4">
          <div className="xl:w-[calc(100%-320px)] w-full px-3">
            <CertificateCard />
          </div>
          <div className="xl:w-[320px] w-full px-3 hidden md:block right-side-section">
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
                <div className="xl:px-0 xl:w-full sm:w-6/12 w-full ">
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

export default FreeCertificates;
