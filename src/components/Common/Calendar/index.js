import React, { useState, useEffect, useMemo } from "react";
import { useCookie } from "react-use";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers";
import { Tooltip, Badge } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import "./../../Dashboard/Sidebar/sidebar.css";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loggedIn] = useCookie("maang");
  const [hoveredDate, setHoveredDate] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      if (loggedIn) {
        const response = await fetch(
          `${ApiBaseURL}course-management/stud-timetable-list/`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );

        if (!response.ok) {
          console.error(
            `Error fetching events data. Status: ${response.status}`
          );
          return;
        }

        const eventData = await response.json();
        // console.log("Calendar Data:", eventData);

        const eventsData = eventData.all_data || [];
        setEvents(eventsData);
      } else {
        console.error("User not logged in. Please handle this case.");
      }
    } catch (error) {
      console.error("Error fetching events data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      fetchEvents();
    }
  }, [loading, loggedIn]);

  const ServerDay = useMemo(() => {
    return (props) => {
      const { day, outsideCurrentMonth, ...other } = props;

      if (!day) {
        return null;
      }

      const date = day.format("YYYY-MM-DD");

      // Filter events for the specific date
      const eventsOnDay = events
        .filter((event) => event.date === date)
        .map((event) => event.course_names.join(", "));

      let dayStyle = {};

      const courseNames = eventsOnDay.join(", ");

      const showHoverPopup = eventsOnDay.length > 0 && date === hoveredDate;

      return (
        <Tooltip title={showHoverPopup ? courseNames : ""} placement="top">
          <Badge
            key={day.toString()}
            overlap="circular"
            onMouseEnter={() => setHoveredDate(date)}
            onMouseLeave={() => setHoveredDate(null)}
          >
            <PickersDay
              {...other}
              outsideCurrentMonth={outsideCurrentMonth}
              day={day}
              style={{ ...dayStyle }}
            />
          </Badge>
        </Tooltip>
      );
    };
  }, [events, hoveredDate]);

  return (
    <div className="calendar-content p-4 xl:px-0 bg-white xl:mb-5 xl:h-auto  shadow-[0px_5px_25px_0px_rgba(62,144,156,0.10)] text-left">
      <span className="pl-3 Outfit text-xl font-semibold text-slate-600">
        Calendar
      </span>
      <div className="calender-wrapper">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: ServerDay,
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Calendar;
