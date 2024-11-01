import dayjs from "dayjs";
import Calendar from "../Common/Calendar";
import { useCookie } from "react-use";
import { useEffect, useState, useContext } from "react";
import MentorSide from "../Dashboard/Sidebar/MentorSide";
import MentorsHeader from "../Common/Header/MentorsHeader";
import PerformanceChart from "../Dashboard/PerformanceChart";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mentorContext } from "../Mentor/context";
import WelcomeRules from "./Regulations/WelcomeRules";
import MentorCalendar from "../Common/Calendar/MentorCalendar";
import MentorPerformanceChart from "../Dashboard/MentorPerformanceChart";
import { ApiBaseURL } from "../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../ApiConfig";
const Rules = () => {
  const { batchInfo } = useContext(mentorContext);
  const [loggedIn] = useCookie("maang");
  const [previousMeeting, setPreviousMeeting] = useState([]);
  const [upcomingBatch, setUpComingBatch] = useState([]);
  const [timetables, setTimeTables] = useState([]);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();

  const hasRedirected = useRef(false);
  const eventColor = ["#35C69D", "#118EDE", "#40C3D5", "#F39F24"];
  const [myProgress, setMyProgress] = useState({
    classesRemaining: 0,
    classesCompleted: 0,
    totalClass: 0,
    endDate: null,
    startDate: null,
  });

  useEffect(() => {
    const fetchCounter = async () => {
      if (loggedIn && !hasRedirected.current) {
        try {
          const response = await axios.get(
            `${ApiBaseURL}mentor-management/rules-regulation/`,
            {
              headers: {
                Authorization: `Token ${JSON.parse(loggedIn).token}`,
              },
            }
          );

          const apiCounter = response.data.counter;
          setCounter(apiCounter);

          if (apiCounter === 2) {
            navigate("/mentor/rules").then((isNavigated) => {
              if (isNavigated) {
                hasRedirected.current = true;
              }
            });
          }
        } catch (error) {
          // console.error("Error fetching counter:", error);
        }
      }
    };

    fetchCounter();
  }, [loggedIn, navigate]);
  useEffect(() => {
    if (loggedIn) {
      fetch(`${ApiBaseURL}course-management/user-batch/`, {
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
            course,
            name: courseBatch,
            timetable: timeTablesData,
          } = data?.results?.[0] || {
            timetable: [],
            course: {
              name: "",
            },
            name: "",
          };

          const allEvents = getEvent({
            timeTablesData,
            courseBatch,
            eventName: course?.name,
          });

          setTimeTables(allEvents);

          const completedBatches = timeTablesData.filter((record) => {
            return dayjs(`${record.start_date} ${record.start_time}`).isBefore(
              currentDateTime.add(1, "day")
            );
          });

          setPreviousMeeting(completedBatches);

          const upcomingBatches = timeTablesData
            .filter((record) => {
              return dayjs(`${record.start_date} ${record.start_time}`).isAfter(
                currentDateTime.add(1, "day")
              );
            })
            .sort((a, b) => {
              return new Date(a.start_date) - new Date(b.start_date);
            });

          setUpComingBatch(upcomingBatches);
        });
      // .catch((err) => console.error(err));
    }
  }, []);

  const getEvent = ({ timeTablesData, courseBatch, eventName }) => {
    const events = timeTablesData.map((data) => {
      const { id, topic, start_date, start_time, link } = data;
      const colorId = Math.floor(Math.random() * 4);
      return {
        id,
        eventName,
        courseBatch,
        venue: "Google Meets",
        meetingTime: `${start_time}`,
        meetingDate: start_date,
        title: topic || "Meeting",
        start: `${start_date}T${start_time}`,
        color: eventColor[colorId],
        url: link || "",
      };
    });

    return events;
  };

  return (
    <>
      <div className="p-5">
        <div className="flex flex-wrap -mx-3 gap-y-4">
          <div className="xl:w-[calc(100%-320px)] w-full px-3">
            <WelcomeRules />
          </div>
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
    </>
  );
};

export default Rules;
