// import React from "react";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { DayCalendarSkeleton } from "@mui/x-date-pickers";
// import "./../../Dashboard/Sidebar/sidebar.css";

// const Calendar = ({ highlightedDays, ServerDay, handleMonthChange }) => {
//   return (
//     <div
//       className="calendar-content p-4 xl:px-0 bg-white xl:mb-5 xl:h-auto h-full"
//       style={{ boxShadow: "0px 5px 25px 0px rgba(62, 144, 156, 0.10)" }}
//     >
//       <span className="pl-3 Outfit text-xl font-semibold text-slate-600">
//         Calendar
//       </span>
//       <div className="calender-wrapper">
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DateCalendar
//             readOnly
//             onMonthChange={handleMonthChange}
//             renderLoading={() => <DayCalendarSkeleton />}
//             slots={{
//               day: ServerDay,
//             }}
//             slotProps={{
//               day: {
//                 highlightedDays,
//               },
//             }}
//           />
//         </LocalizationProvider>
//       </div>
//     </div>
//   );
// };

// export default Calendar;

// import React, { useState, useEffect } from "react";
// import { useCookie } from "react-use";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { DayCalendarSkeleton } from "@mui/x-date-pickers";
// import { Tooltip, Badge } from "@mui/material";
// import { PickersDay } from "@mui/x-date-pickers/PickersDay";
// import "./../../Dashboard/Sidebar/sidebar.css";

// const Calendar = () => {
//   const [events, setEvents] = useState([]);
//   const [loggedIn] = useCookie("maang");
//   const [hoveredDate, setHoveredDate] = useState(null);

//   const fetchEvents = async () => {
//     try {
//       if (loggedIn) {
//         const response = await fetch("https://devdevdjango.maangcareers.com/course-management/stud-timetable-list/", {
//           headers: {
//             Authorization: `Token ${JSON.parse(loggedIn).token}`,
//           },
//         });
//         console.log("HElllloooooooooooo Calendarrrrrrr!")
//         if (!response.ok) {
//           console.error(`Error fetching events data. Status: ${response.status}`);
//           return;
//         }

//         const eventData = await response.json();
//         console.log("Calendar Data:", eventData);

//         const eventsData = eventData.all_data || "";
//         setEvents(eventsData);
//       } else {
//         console.error("User not logged in. Please handle this case.");
//       }
//     } catch (error) {
//       console.error("Error fetching events data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, [loggedIn]);

// const ServerDay = (props) => {
//   const { day, outsideCurrentMonth, ...other } = props;

//   if (!day) {
//     return null;
//   }

//   console.log("day format:", day.format("YYYY-MM-DD"));

//   const eventsOnDay = events
//     .filter((event) => {
//       console.log("event date:", event.date);
//       return event.date === day.format("YYYY-MM-DD");
//     })
//     .map((event) => event.course_names.join(", "));

//   console.log("events on day:", eventsOnDay);

//   let dayStyle = {};

//   switch (day.format("dddd")) {
//     case "Monday":
//     case "Wednesday":
//     case "Friday":
//       dayStyle = {
//         background: "orange",
//         color: "white",
//         border: 0,
//       };
//       break;
//     case "Tuesday":
//     case "Thursday":
//     case "Saturday":
//       dayStyle = {
//         background: "rgb(64, 194, 212)",
//         color: "white",
//         border: 0,
//       };
//       break;
//     default:
//       dayStyle = {};
//       break;
//   }
//   const showHoverPopup = eventsOnDay.length > 0;

//   return (
//     <Tooltip title={showHoverPopup ? eventsOnDay : ""} placement="top">
//       <Badge key={day.toString()} overlap="circular">
//         <PickersDay
//           {...other}
//           outsideCurrentMonth={outsideCurrentMonth}
//           day={day}
//           style={{ ...dayStyle }}
//         />
//       </Badge>
//     </Tooltip>
//   );
// };

//   const ServerDay = (props) => {
//     const { day, outsideCurrentMonth, ...other } = props;

//     if (!day) {
//       return null;
//     }

//     console.log("day format:", day.format("YYYY-MM-DD"));

//     const date = day.format("YYYY-MM-DD");

//     // Filter events for the specific date
//     const eventsOnDay = events
//       .filter((event) => event.date === date)
//       .map((event) => event.course_names.join(", "));

//     console.log("events on day:", eventsOnDay);

//     let dayStyle = {};

//     switch (day.format("dddd")) {
//       case "Monday":
//       case "Wednesday":
//       case "Friday":
//         dayStyle = {
//           background: "orange",
//           color: "white",
//           border: 0,
//         };
//         break;
//       case "Tuesday":
//       case "Thursday":
//       case "Saturday":
//         dayStyle = {
//           background: "rgb(64, 194, 212)",
//           color: "white",
//           border: 0,
//         };
//         break;
//       default:
//         dayStyle = {};
//         break;
//     }

//     // Create a variable to store course names
//     const courseNames = eventsOnDay.join(", ");

//     const showHoverPopup = eventsOnDay.length > 0 && date === hoveredDate;

//     return (
//       <Tooltip title={showHoverPopup ? courseNames : ""} placement="top">
//         <Badge
//           key={day.toString()}
//           overlap="circular"
//           onMouseEnter={() => setHoveredDate(date)}
//           onMouseLeave={() => setHoveredDate(null)}
//         >
//           <PickersDay
//             {...other}
//             outsideCurrentMonth={outsideCurrentMonth}
//             day={day}
//             style={{ ...dayStyle }}
//           />
//         </Badge>
//       </Tooltip>
//     );
//   };

//   return (
//     <div
//       className="calendar-content p-4 xl:px-0 bg-white xl:mb-5 xl:h-auto h-full"
//       style={{ boxShadow: "0px 5px 25px 0px rgba(62, 144, 156, 0.10)" }}
//     >
//       <span className="pl-3 Outfit text-xl font-semibold text-slate-600">
//         Calendar
//       </span>
//       <div className="calender-wrapper">
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DateCalendar
//             readOnly
//             renderLoading={<DayCalendarSkeleton />}
//             slots={{
//               day: ServerDay,
//             }}
//           />
//         </LocalizationProvider>
//       </div>
//     </div>
//   );
// };

// export default Calendar;

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

const MentorCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loggedIn] = useCookie("maang");
  const [hoveredDate, setHoveredDate] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      if (loggedIn) {
        const response = await fetch(
          `${ApiBaseURL}mentor-management/inst-calender-view/`,
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
        console.log("EVENTSSS", events);
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

      switch (day.format("dddd")) {
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
    <div className="calendar-content p-4 xl:px-0 bg-white xl:mb-5 xl:h-auto h-full shadow-[0px_5px_25px_0px_rgba(62,144,156,0.10)]">
      <span className="pl-3 Outfit text-xl font-semibold text-slate-600">
        Calendar
      </span>
      <div className="calender-wrapper">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            readOnly
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

export default MentorCalendar;
