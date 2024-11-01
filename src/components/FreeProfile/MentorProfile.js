// import React, { useEffect, useState } from "react";
// import { useCookie } from "react-use";
// import dayjs from "dayjs";
// import PerformanceChart from "../Dashboard/PerformanceChart";
// import { PickersDay } from "@mui/x-date-pickers";
// import { Badge, Tooltip } from "@mui/material";
// import "./index.css";
// import Calendar from "../Common/Calendar";
// import MentorSide from "../Dashboard/Sidebar/MentorSide";
// import MentorsHeader from "../Common/Header/MentorsHeader";
// import MentorProfileCard from "./ProfileCard/MentorProfileCard";

// const MentorProfile = () => {
//   const [loggedIn] = useCookie("maang");
//   const [timetables, setTimeTables] = useState();
//   const [highlightedDays, setHighlightedDays] = useState();
//   const [myProgress, setMyProgress] = useState({
//     classesRemaining: 0,
//     classesCompleted: 0,
//     totalClass: 0,
//     endDate: null,
//     startDate: null,
//   });

//   useEffect(() => {
//     if (loggedIn) {
//       fetch(
//         "https://devdevdjango.maangcareers.com/course-management/user-batch/",
//         {
//           headers: {
//             Authorization: `Token ${JSON.parse(loggedIn).token}`,
//           },
//         }
//       )
//         .then((res) => {
//           return res.json();
//         })
//         .then((data) => {
//           const currentDateTime = dayjs();
//           const {
//             end_date,
//             start_date,
//             timetable: timeTablesData,
//           } = data?.results?.[0] || {
//             timetable: [],
//             end_date: null,
//             start_date: null,
//           };

//           setTimeTables(timeTablesData);

//           const completedBatches = timeTablesData.filter((record) => {
//             return dayjs(`${record.start_date} ${record.start_time}`).isBefore(
//               currentDateTime.add(1, "day")
//             );
//           });

//           const upcomingBatches = timeTablesData
//             .filter((record) => {
//               return dayjs(`${record.start_date} ${record.start_time}`).isAfter(
//                 currentDateTime.add(1, "day")
//               );
//             })
//             .sort((a, b) => {
//               return new Date(a.start_date) - new Date(b.start_date);
//             });

//           setMyProgress({
//             classesCompleted: completedBatches?.length,
//             classesRemaining: upcomingBatches?.length,
//             totalClass: timeTablesData?.length,
//             endDate: end_date,
//             startDate: start_date,
//           });
//         })
//         .catch((err) => console.error(err));
//     }
//   }, []);

//   useEffect(() => {
//     setHighlightedDaysForCalendar();
//   }, [timetables]);

//   const handleMonthChange = (date) => {
//     setHighlightedDaysForCalendar(date);
//   };

//   function ServerDay(props) {
//     const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

//     const isSelected =
//       !props.outsideCurrentMonth &&
//       highlightedDays.indexOf(props.day.date()) >= 0;

//     return isSelected ? (
//       <Tooltip title="Course">
//         <Badge key={props.day.toString()} overlap="circular">
//           <PickersDay
//             {...other}
//             outsideCurrentMonth={outsideCurrentMonth}
//             day={day}
//             style={{ background: "#40C2D4", color: "white", border: 0 }}
//           />
//         </Badge>
//       </Tooltip>
//     ) : (
//       <Badge key={props.day.toString()} overlap="circular">
//         <PickersDay
//           {...other}
//           outsideCurrentMonth={outsideCurrentMonth}
//           day={day}
//         />
//       </Badge>
//     );
//   }

//   const setHighlightedDaysForCalendar = (currentDate = dayjs()) => {
//     if (!timetables || timetables.length <= 0) {
//       setHighlightedDays([]);
//       return;
//     }

//     let ongoingBatchesFiltered = timetables.filter((record) =>
//       dayjs(`${record.start_date} ${record.start_time}`).isSame(
//         currentDate,
//         "month"
//       )
//     );

//     const upcomingBatches = ongoingBatchesFiltered.map((x) => {
//       return dayjs(x.start_date).get("date");
//     });

//     setHighlightedDays(upcomingBatches);
//   };

//   return (
//     <div className="flex bg-[#f6fffe]">
//       <div className="flex flex-col w-full">
//         <div className="p-4">
//           <div className="flex flex-wrap -mx-2 gap-y-4">
//             <div className="md:w-[calc(100%-320px)] w-full px-2">
//               <div className="p-4 rounded-md bg-white">
//                 <MentorProfileCard />
//               </div>
//             </div>
//             <div className="md:w-[320px] w-full px-2">
//               <Calendar
//                 highlightedDays={highlightedDays}
//                 ServerDay={ServerDay}
//                 handleMonthChange={handleMonthChange}
//               />
//               <PerformanceChart myProgress={myProgress} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorProfile;
import React, { useEffect, useState, useContext } from "react";
import { mentorContext } from "../Mentor/context";
import { useCookie } from "react-use";
import dayjs from "dayjs";
import { PickersDay } from "@mui/x-date-pickers";
import { Badge, Tooltip } from "@mui/material";
import MentorProfileCard from "./ProfileCard/MentorProfileCard";
import "./index.css";
import Calendar from "../Common/Calendar";
import MentorCalendar from "../Common/Calendar/MentorCalendar";
import MentorPerformanceChart from "../Dashboard/MentorPerformanceChart";
// import { ApiBaseURL, ApiEndpoints } from "../ApiConfig";

const MentorProfile = () => {
  const { batchInfo } = useContext(mentorContext);
  const [loggedIn] = useCookie("maang");
  const [timetables, setTimeTables] = useState();
  const [highlightedDays, setHighlightedDays] = useState();
  const [events, setEvents] = useState([]);
  const [myProgress, setMyProgress] = useState([]);

  useEffect(() => {
    // console.log(`Token ${JSON.parse(loggedIn).token}`);
    // console.log("Token", batchInfo);
  }, [loggedIn, batchInfo]);



  return (
    <>
      <div className="p-5">
        <div class="flex flex-wrap -mx-3 gap-y-4">
          <div className="xl:w-[calc(100%-320px)] w-full px-3">
            {/* <ProfileCard /> */}
            <MentorProfileCard />
          </div>
          <div className="xl:w-[320px] w-full px-3 hidden md:block">
            <div className="xl:overflow-visible sm:overflow-auto">
              <div className="xl:block sm:flex xl:mx-0 gap-x-4">
                <div className="xl:px-0 xl:w-full sm:w-6/12 w-full sm:mb-0 mb-4 sm:block hidden">
                  {/* <Calendar
                    highlightedDays={highlightedDays}
                    ServerDay={ServerDay}
                    handleMonthChange={handleMonthChange}
                  /> */}
                  {/* <Calendar /> */}
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
    </>
  );
};

export default MentorProfile;
