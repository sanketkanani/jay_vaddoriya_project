import dayjs from "dayjs";
import WelcomeCard from "./WelcomeCard";
import Meeting from "./Meeting";
import Calendar from "./Calendar";
import "./index.css";
import { useCookie } from "react-use";
import { useEffect, useState, useRef } from "react";
import MentorMeeting from "./MentorMeeting";
import { ApiBaseURL } from "../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../ApiConfig";

const MentorTimeTable = () => {
  const [loggedIn] = useCookie("maang");
  const [previousMeeting, setPreviousMeeting] = useState([]);
  const [upcomingBatch, setUpComingBatch] = useState([]);
  const [timetables, setTimeTables] = useState([]);
  const [classDate, setClassDate] = useState([]);
  const [classTime, setClassTime] = useState([]);
  const calendarRef = useRef(null);
  // const [eventDataToScroll, setEventDataToScroll] = useState({ id: 1 });

  const eventDataToScroll = {
    id: 1,
  };
  const eventColor = ["#35C69D", "#118EDE", "#40C3D5", "#F39F24"];

  useEffect(() => {
    if (loggedIn) {
      fetch(`${ApiBaseURL}mentor-management/inst-timetable/`, {
        headers: {
          Authorization: `Token ${JSON.parse(loggedIn).token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const { week_data: weekData } = data || { week_data: [] };

          const allEvents = getAllEvents(weekData);
          setTimeTables(allEvents);

          const currentDateTime = dayjs();
          const completedBatches = getCompletedBatches(
            weekData,
            currentDateTime
          );
          setPreviousMeeting(completedBatches);

          const upcomingBatches = getUpcomingBatches(weekData, currentDateTime);
          setUpComingBatch(upcomingBatches);
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (calendarRef.current && eventDataToScroll.id) {
      calendarRef.current.setEventData(eventDataToScroll);
    }
  }, [eventDataToScroll]);

  const getAllEvents = (weekData) => {
    const events = weekData.reduce((acc, week) => {
      const { date, courses } = week;
      const courseEvents = courses.map((course) => {
        const {
          id,
          batch__course__name: eventName,
          start_time,
          topic,
          day_topic,
          link,
        } = course;
        setClassDate(date);
        setClassTime(start_time);

        const colorId = Math.floor(Math.random() * 4);

        return {
          id,
          eventName,
          courseBatch: topic,
          venue: "Google Meets",
          timeText: start_time,
          meetingDate: date,
          day_topic: day_topic,

          start: `${date}T${start_time}`,
          color: eventColor[colorId],
          url: link || "",
        };
      });
      return [...acc, ...courseEvents];
    }, []);

    return events;
  };
  const getCompletedBatches = (weekData, currentDateTime) => {
    const completedBatches = weekData.reduce((acc, week) => {
      const { date, courses } = week;
      const completed = courses.filter((course) => {
        return dayjs(`${date} ${course.start_time}`).isBefore(
          currentDateTime.add(1, "day")
        );
      });
      return [...acc, ...completed];
    }, []);

    return completedBatches;
  };

  const getUpcomingBatches = (weekData, currentDateTime) => {
    const upcomingBatches = weekData.reduce((acc, week) => {
      const { date, courses } = week;
      const upcoming = courses.filter((course) => {
        return dayjs(`${date} ${course.start_time}`).isAfter(
          currentDateTime.add(1, "day")
        );
      });
      return [...acc, ...upcoming];
    }, []);

    return upcomingBatches;
  };

  useEffect(() => {
    const firstEventElement = document.querySelector(".full-calendar-event");
    if (firstEventElement) {
      firstEventElement.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <>
      <div className="p-5">
        <div class="flex flex-wrap -mx-3 gap-y-4">
          <div className="xl:w-[calc(100%-320px)] w-full px-3">
            <WelcomeCard />
            <Calendar
              timetables={timetables}
              classDate={classDate}
              classTime={classTime}
              ref={calendarRef}
              eventIdToScroll={eventDataToScroll.id}
            />
          </div>
          <div className="xl:w-[320px] w-full px-3">
            <MentorMeeting
              upcomingBatch={upcomingBatch}
              previousMeeting={previousMeeting}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorTimeTable;
