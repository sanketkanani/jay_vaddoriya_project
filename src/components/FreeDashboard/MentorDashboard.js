import React, { useEffect, useState, useContext } from "react";
import { mentorContext } from "../Mentor/context";
import { useCookie } from "react-use";
import dayjs from "dayjs";
import MentorPerformanceChart from "./MentorPerformanceChart";
import "./Sidebar/sidebar.css";
import Dayjs from "dayjs";
import { PickersDay } from "@mui/x-date-pickers";
import { Badge, Tooltip } from "@mui/material";
import DisplayNotice from "./ProgressCard/Notice/DisplayNotice";
import Calendar from "./../Common/Calendar";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-modal";
import axios from "axios";
import MentorCalendar from "./../Common/Calendar/MentorCalendar";
import { ApiBaseURL } from "../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../ApiConfig";

const calculateSlidesToShow = (data) => {
  const totalItems = data.length;

  if (totalItems >= 3) {
    return 3;
  } else {
  }
};

const MentorDashboard = () => {
  const {
    batchInfo,
    setSelectedWeekIdForTeaching,
    setSelectedBatchIdForTeaching,
  } = useContext(mentorContext);
  const [loggedIn, ,] = useCookie("maang");
  // const navigate = useNavigate();
  // const {
  //   screen,
  //   setScreen,
  //   setSelectedCourseIdForProfile,
  //   setSelectedWeekIdForQuiz,
  //   setSelectedWeekIdForMock,
  //   setSelectedCourseIdForQuiz,
  //   setSelectedCourseIdForMock,
  // } = useContext(studentContext);
  const [notices, setNotices] = useState([]);
  const [ongoingBatch, setOnGoingBatch] = useState();
  const [upcomingBatch, setUpComingBatch] = useState();
  const [timetables, setTimeTables] = useState();
  const [highlightedDays, setHighlightedDays] = useState();
  const [courseDetail, setCourseDetail] = useState({
    courseName: "",
    courseTitle: "",
  });

  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(true);
  const [otherQuiz, setOtherQuiz] = useState([]);
  const [otherMock, setOtherMock] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [otherPractice, setOtherPractice] = useState([]);
  const [otherCardsData, setOtherCardsData] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(
    calculateSlidesToShow(otherCardsData)
  );

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const [hasNavigated, setHasNavigated] = useState(false);

  // console.log("TOKE----", JSON.parse(loggedIn).token);
  // console.log("TOKE----", batchInfo);

  useEffect(() => {
    const checkLoginAndTerms = async () => {
      if (!loggedIn) {
        navigate("/");
        return;
      }

      try {
        const termsResponse = await axios.get(
          `${ApiBaseURL}mentor-management/terms-condition/`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );

        const termsMessage = termsResponse.data.message;
        // console.log("Terms Message:", termsMessage);

        if (termsMessage === 0 && !hasNavigated) {
          navigate("/mentor");
          setShowTermsModal(true);
          setHasNavigated(true);
        } else if (termsMessage === 1 && !hasNavigated) {
          const rulesResponse = await axios.get(
            `${ApiBaseURL}mentor-management/rules-regulation/`,
            {
              headers: {
                Authorization: `Token ${JSON.parse(loggedIn).token}`,
              },
            }
          );

          const rulesMessage = rulesResponse.data.counter;
          // console.log("Rules Message:", rulesMessage);

          if (rulesMessage === 0) {
            navigate("/mentor/rules");
            setShowTermsModal(false);
            setHasNavigated(true);
          } else {
          }
        }
      } catch (error) {
        console.error("Error checking terms and rules:", error);
      }
    };

    checkLoginAndTerms();
  }, [loggedIn, hasNavigated, navigate]);

  // useEffect(() => {
  //   const checkLoginAndTerms = async () => {
  //     if (!loggedIn) {
  //       window.location.href = "/";
  //       return;
  //     }

  //     try {
  //       const response = await axios.get(
  //         "https://devdjango.maangcareers.com/mentor-management/terms-condition/",
  //         {
  //           headers: {
  //             Authorization: `Token ${JSON.parse(loggedIn).token}`,
  //           },
  //         }
  //       );

  //       const message = response.data.message;
  //       console.log(message);

  //       if (message === 0 && !hasNavigated) {
  //         navigate("/mentor");
  //         setShowTermsModal(true);
  //         setHasNavigated(true);
  //       } else if (message === 1 && !hasNavigated) {
  //         navigate("/mentor/rules");
  //         setShowTermsModal(false);
  //         setHasNavigated(true);
  //       }
  //     } catch (error) {
  //       console.error("Error checking terms acceptance:", error);
  //     }
  //   };

  //   checkLoginAndTerms();
  // }, [loggedIn]);

  const handleAcceptTerms = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleAgree = async () => {
    if (loggedIn) {
      try {
        const formDataTerms = new FormData();
        formDataTerms.append(
          "terms_conditions",
          termsAccepted ? "True" : "False"
        );

        const responseTerms = await axios.post(
          `${ApiBaseURL}mentor-management/terms-condition/`,
          formDataTerms,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // console.log(responseTerms.data);

        const apiMessageTerms = responseTerms.data.message;

        const formDataRules = new FormData();
        formDataRules.append("count", 1);

        const responseRules = await axios.post(
          `${ApiBaseURL}mentor-management/rules-regulation/`,
          formDataRules,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // console.log(responseRules.data);

        const apiMessageRules = responseRules.data.message;

        setShowTermsModal(false);
        navigate("/mentor/rules");
      } catch (error) {
        console.error("Error posting terms and conditions:", error);
      }
    }
  };

  const formatStartDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const dateParts = dateString.split("-");
    const day = parseInt(dateParts[2], 10);
    const monthIndex = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[0], 10);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedDate = `${day} ${months[monthIndex]} ${year}`;
    return formattedDate;
  };

  const formatStartTime = (timeString) => {
    if (!timeString) {
      return "";
    }

    const [hours, minutes] = timeString.split(":");
    let period = "AM";

    let formattedHours = parseInt(hours, 10);
    if (formattedHours >= 12) {
      period = "PM";
      if (formattedHours > 12) {
        formattedHours -= 12;
      }
    }

    const formattedTime = `${formattedHours}:${minutes} ${period}`;
    return formattedTime;
  };

  useEffect(() => {
    if (!loggedIn) navigate("/");
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ApiBaseURL}user-management/notice/`, {
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        });

        const data = await response.json();
        const sortedData = data.results.sort((a, b) => b.id - a.id);
        setNotices(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // console.log(`Token ${JSON.parse(loggedIn).token}`);
    fetchData();
  }, [loggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loggedIn) {
          const token = JSON.parse(loggedIn).token;
          const response = await fetch(
            `${ApiBaseURL}mentor-management/inst-ongoing-upcomig/`,
            {
              method: "GET",
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

          const data = await response.json();
          const ongoingDetails = data.response_data.ongoing;
          const upcomingDetails = data.response_data.upcoming;

          const currentDateTime = dayjs();

          // Filter ongoing batches based on current time and end_time
          const ongoingBatchesFiltered = ongoingDetails.filter(
            (record) =>
              dayjs(`${record.start_date} ${record.start_time}`).isSame(
                currentDateTime,
                "minute"
              ) ||
              (dayjs(`${record.start_date} ${record.start_time}`).isBefore(
                currentDateTime
              ) &&
                dayjs(`${record.start_date} ${record.end_time}`).isAfter(
                  currentDateTime
                ))
          );

          let courseTitle = "";

          if (ongoingBatchesFiltered.length > 0) {
            courseTitle = "Ongoing";
            setOnGoingBatch(ongoingBatchesFiltered[0]);
          } else if (upcomingDetails.length > 0) {
            courseTitle = "Next";
            setUpComingBatch(upcomingDetails[0]);
          }

          setCourseDetail({
            courseName: "",
            courseTitle: courseTitle,
          });

          setOnGoingBatch(ongoingDetails);
          setUpComingBatch(upcomingDetails);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [loggedIn]);

  useEffect(() => {
    setHighlightedDaysForCalendar();
  }, [timetables]);

  const displayOnGoingBatch = () => {
    // if (!ongoingBatch) return null;
    if (!ongoingBatch || ongoingBatch.length === 0) {
      return (
        <div className="lectures-info sm:px-3 sm:!w-6/12 !w-full h-full">
          <span className="card-title">
            {courseDetail?.courseTitle || "Ongoing"}
          </span>
          <div className="ongoing-container py-2 px-4">
            <div
              className="ongoing-container-header !p-0"
              style={{ display: "block" }}
            >
              <span className="ongoing-container-header-title py-2">
                There is no Ongoing Lectures
              </span>
            </div>
          </div>
        </div>
      );
    }

    const {
      link,
      week,
      batch_id,
      start_date,
      start_time,
      today_topic,
      time_table_topic,
      course,
    } = ongoingBatch[0];
    const courseDateTime = Dayjs(`${start_date} ${start_time}`).format(
      "DD-MMM-YYYY h:mm A"
    );
    return (
      <div className="lectures-info sm:px-3 sm:!w-6/12 !w-full h-full">
        <span className="card-title">
          {courseDetail?.courseTitle || "Ongoing"}
        </span>
        <div className="ongoing-container py-2 px-4">
          <div className="ongoing-container-header !p-0">
            <span className="ongoing-container-header-title">{course}</span>
            <span className="ongoing-container-header-online-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="5"
                viewBox="0 0 5 5"
                fill="none"
              >
                <circle cx="2.5" cy="2.5" r="2.5" fill="#35C69D" />
              </svg>
              <span className="ongoing-container-header-online-text">
                {link ? "Online" : "Offline"}
              </span>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="ongoing-container-field">
              Topic:&nbsp;
              <span className="ongoing-container-field-bold">
                {today_topic || "Schedule topic"}
              </span>
            </span>

            <span className="ongoing-container-field">
              Schedule:&nbsp;
              <span className="ongoing-container-field-bold">
                {time_table_topic}
              </span>
            </span>
            <span className="ongoing-container-field">
              Start date/time:&nbsp;
              <span className="ongoing-container-field-bold">
                {courseDateTime}
              </span>
            </span>
            <div className="ongoing-container-field extra-btns">
              <span>
                Venue:&nbsp;
                <span className="ongoing-container-field-bold">
                  Video Conference/Live classes
                </span>
              </span>
              <button
                className={`cta btn btn-add-reminder ${
                  !link || courseDetail?.courseTitle === "Next"
                    ? "btn-disabled"
                    : ""
                }`}
                onClick={() => {
                  if (courseDetail?.courseTitle === "Ongoing") {
                    setSelectedWeekIdForTeaching(week);
                    setSelectedBatchIdForTeaching(batch_id);
                  }
                  if (link || courseDetail?.courseTitle === "Ongoing") {
                    navigate("/mentor/teaching");
                  }
                }}
              >
                TEACH
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const displayUpcomingBatch = () => {
    // if (!upcomingBatch) return null;

    if (!upcomingBatch || upcomingBatch.length === 0) {
      return (
        <div className="lectures-info sm:px-3 sm:!w-6/12 !w-full h-full">
          <span className="card-title">Upcoming</span>
          <div className="ongoing-container py-2 px-4">
            <div
              className="ongoing-container-header !p-0"
              style={{ display: "block" }}
            >
              <span className="ongoing-container-header-title mb-3">
                There is no Upcoming Lectures
              </span>
            </div>
          </div>
        </div>
      );
    }

    const {
      link,
      start_date,
      start_time,
      today_topic,
      time_table_topic,
      course,
    } = upcomingBatch[0];
    const courseDateTime = Dayjs(`${start_date} ${start_time}`).format(
      "DD-MMM-YYYY h:mm A"
    );

    return (
      <div className="lectures-info sm:px-3 sm:!w-6/12 !w-full h-full">
        <span className="card-title">Upcoming</span>
        <div className="upcoming-container py-2 px-4">
          <div className="ongoing-container-header !p-0">
            <span className="upcoming-container-header-title">{course}</span>
            <span className="ongoing-container-header-online-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="5"
                viewBox="0 0 5 5"
                fill="none"
              >
                <circle cx="2.5" cy="2.5" r="2.5" fill="#F39F24" />
              </svg>
              <span className="upcoming-container-header-online-text">
                {link ? "Online" : "Offline"}
              </span>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="ongoing-container-field">
              Topic:&nbsp;
              <span className="ongoing-container-field-bold">
                {today_topic || "Schedule topic"}
              </span>
            </span>
            <span className="ongoing-container-field">
              Schedule:&nbsp;
              <span className="ongoing-container-field-bold">
                {time_table_topic}
              </span>
            </span>
            <span className="ongoing-container-field">
              Start date/time:&nbsp;
              <span className="ongoing-container-field-bold">
                {courseDateTime}
              </span>
            </span>
            <div className="ongoing-container-field extra-btns">
              <span>
                Venue:&nbsp;
                <span className="ongoing-container-field-bold">
                  Google Meets
                </span>
              </span>
              {/* <button
                className={`cta btn btn-add-reminder ${
                  !link ? "btn-disabled" : ""
                }`}
                onClick={() => {
                  if (link) {
                    window.location.href = link;
                  }
                }}
              >
                Add Reminder
              </button> */}
              {/* static for upcoming lecture */}
              <button className={`cta btn btn-add-reminder btn-disabled`}>
                TEACH
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  //disable and enable method
  const handleStartButtonClick = () => {
    // setScreen("quiz-week");
    setIsStartButtonDisabled(false);
    // console.log("Button Clicked!");
  };
  useEffect(() => {
    handleStartButtonClick();
  }, [isStartButtonDisabled]);

  const otherCards = (
    color,
    title,
    data = {},
    status,
    condition,
    next_q_id,
    next_q_week,
    course_id,
    week_id
  ) => {
    // if (selectedWeekId === null) {
    //   return null;
    // }
    // console.log("data===============================>", data);
    // console.log("courseID===============================>", course_id);
    if (!data) {
      // Display a default message when data is empty
      return (
        <div className={`other-cards-wrapper ${color}`}>
          <div className="other-cards-wrapper-header">
            <span className={`other-cards-wrapper-header-title ${color}`}>
              {title}
            </span>
            <div className="other-cards-wrapper-header-online">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="4"
                height="4"
                viewBox="0 0 4 4"
                fill="none"
              >
                <circle
                  cx="2"
                  cy="2"
                  r="2"
                  fill={
                    color === "blue"
                      ? "#118EDE"
                      : color === "cyan"
                      ? "#F39F24"
                      : "#35C69D"
                  }
                />
              </svg>
              <span className={`text ${color}`}>Online</span>
            </div>
          </div>
          <span className="other-cards-wrapper-subject-title">
            No data right now
          </span>
        </div>
      );
    }

    return (
      <div className={`other-cards-wrapper ${color}`}>
        <div className="other-cards-wrapper-header">
          <span className={`other-cards-wrapper-header-title ${color}`}>
            {title}
          </span>
          <div className="other-cards-wrapper-header-online">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
            >
              <circle
                cx="2"
                cy="2"
                r="2"
                fill={
                  color === "blue"
                    ? "#118EDE"
                    : color === "cyan"
                    ? "#F39F24"
                    : "#35C69D"
                }
              />
            </svg>
            <span className={`text ${color}`}>Online</span>
          </div>
        </div>
        <span className="other-cards-wrapper-subject-title">
          {/* Contest Subject */}
          {data.course_name_value}
        </span>
        <span className="other-cards-wrapper-subject-title">
          {/* Contest Subject */}
          Week {data.week_value}
        </span>
        <div className="other-cards-wrapper-subject-extra-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.18632 0C4.83833 0 4.55622 0.287998 4.55622 0.643263V1.28719H3.05257C1.92325 1.28719 1 2.18045 1 3.2919V12.9953C1 14.1067 1.92325 15 3.05257 15H13.0099C14.1392 15 15.0625 14.1067 15.0625 12.9953V3.2919C15.0625 2.18045 14.1392 1.28719 13.0099 1.28719H11.5063V0.643263C11.5063 0.287999 11.2242 0 10.8762 0C10.5282 0 10.2461 0.287999 10.2461 0.643263V1.28719H5.81641V0.643263C5.81641 0.287998 5.53431 0 5.18632 0ZM2.26019 3.2919C2.26019 2.87219 2.61066 2.52421 3.05257 2.52421H4.55622V3.54768C4.55622 3.90294 4.83833 4.19094 5.18632 4.19094C5.53431 4.19094 5.81641 3.90294 5.81641 3.54768V2.52421H10.2461V3.54768C10.2461 3.90294 10.5282 4.19094 10.8762 4.19094C11.2242 4.19094 11.5063 3.90294 11.5063 3.54768V2.52421H13.0099C13.4518 2.52421 13.8023 2.87219 13.8023 3.2919V5.80883H2.26019V3.2919ZM2.26019 12.9953V7.09536H13.8023V12.9953C13.8023 13.415 13.4518 13.763 13.0099 13.763H3.05257C2.61066 13.763 2.26019 13.415 2.26019 12.9953ZM13.0567 10.0927H10.8861V12.3086H13.0567V10.0927Z"
              fill="#595F6E"
            />
          </svg>
          {/* <span>&nbsp; &nbsp;12 July 2023</span> */}
          <span>
            &nbsp; &nbsp;
            {formatStartDate(data.start_date_value || data.start_date)}
          </span>
        </div>
        <div className="other-cards-wrapper-subject-extra-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.999756 7.99989C0.999756 4.14012 4.14007 0.999771 7.99988 0.999771C11.8597 0.999771 15 4.14012 15 7.99989C15 11.8599 11.8599 15.0002 7.99988 15.0002C4.1401 15.0002 0.999756 11.8599 0.999756 7.99989ZM2.26864 8.00014C2.26864 11.1604 4.83967 13.7316 7.99988 13.7316C11.1601 13.7316 13.7311 11.1605 13.7311 8.00014C13.7311 4.83994 11.1601 2.2689 7.99988 2.2689C4.83963 2.2689 2.26864 4.83994 2.26864 8.00014ZM8.25373 7.78838H9.94557C10.296 7.78838 10.58 8.0724 10.5801 8.42283C10.5801 8.77326 10.296 9.05729 9.94561 9.05729H7.61927C7.26884 9.05729 6.98481 8.77326 6.98481 8.42283V5.33516C6.98481 4.98473 7.26884 4.7007 7.61927 4.7007C7.9697 4.7007 8.25373 4.98473 8.25373 5.33516V7.78838Z"
              fill="#595F6E"
            />
          </svg>
          {/* <span>&nbsp;&nbsp;3:30 - 4:50PM</span> */}
          <span>
            &nbsp;&nbsp;
            {formatStartTime(data.start_time_value || data.start_time)}
          </span>
        </div>
        <div className="other-cards-footer flex items-center px-4 pb-4">
          <span
            className={`other-cards-footer-line w-full h-[1px] ${color}`}
          ></span>
          {/* <button className={`cta btn btn-start ${color} btn-disabled`} onClick={handleStartButtonClick}>
            START
          </button> */}
          <button
            className={`cta ml-2 btn btn-start whitespace-nowrap disabled:opacity-50 ${color} ${
              isStartButtonDisabled ? "btn-disabled" : ""
            }`}
            onClick={() => {
              let targetState;
              if (title === "Quiz Week") {
                // setSelectedWeekIdForQuiz(week_id);
                // setSelectedCourseIdForQuiz(course_id);
              } else if (title === "Mock Week") {
                // setSelectedWeekIdForMock(week_id);
                // setSelectedCourseIdForMock(course_id);
              }

              navigate(
                title === "Practice Week"
                  ? "/student/practice/" + next_q_id + "/problem"
                  : title === "Mock Week"
                  ? "/student/mock-test"
                  : "/student/quiz",
                {
                  state: {
                    week: next_q_week,
                    courseId: course_id,
                    q_id: next_q_id,
                  },
                }
              );
            }}
            title={condition !== "" ? condition : ""}
            disabled={condition !== ""}
          >
            {status}
          </button>
        </div>
      </div>
    );
  };

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

  const handleMonthChange = (date) => {
    setHighlightedDaysForCalendar(date);
  };

  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    setSlidesToShow(calculateSlidesToShow(otherCardsData));
  }, [otherCardsData]);
  const groupedData = {};
  [
    ...otherPractice.map((data, index) => ({
      type: "Practice",
      color: "blue",
      title: "Practice Week",
      details: data.contest_details[0],
      status: data.status,
      condition: data.condition,
      next_q_id: data?.last_info?.question__id,
      next_q_week: data?.last_info?.question__week,
      course_id: data?.course_id,
    })),
    ...otherQuiz.map((data, index) => ({
      type: "Quiz",
      color: "cyan",
      title: "Quiz Week",
      details: data.contest_details[0],
      status: data.status,
      condition: data.condition,
      next_q_id: data?.last_info?.question__id,
      next_q_week: data?.last_info?.question__week,
      course_id: data?.course_id,
    })),
    ...otherMock.map((data, index) => ({
      type: "Mock",
      color: "green",
      title: "Mock Week",
      details: data.contest_details[0],
      status: data.status,
      condition: data.condition,
      next_q_id: data?.last_info?.question__id,
      next_q_week: data?.last_info?.question__week,
      course_id: data?.course_id,
    })),
  ].forEach((item) => {
    const courseName = item.details.course_name_value;
    if (!groupedData[courseName]) {
      groupedData[courseName] = [];
    }
    groupedData[courseName].push(item);
  });

  return (
    <>
      {showTermsModal && (
        <div className="modal-overlay z-10 px-10">
          <div className="modal !w-auto xl:!max-w-[900px] md:!max-w-[730px] sm:!max-w-[600px] !max-w-[100%]">
            <div className="modal-content break-words">
              <div class="mb-4 text-gray-700 text-[25px] font-semibold font-['Outfit']">
                Terms & Conditions
              </div>
              <h4 class="mb-2 text-sky-500 text-xl font-semibold font-['Outfit']">
                1. Introduction
              </h4>
              <p>
                {" "}
                Welcome to MAANG Careers! We are dedicated to providing
                top-notch training to enhance your career prospects. Our classes
                are structured to offer a rich learning experience, blending
                instructional teaching with interactive sessions for clearing
                doubts.
              </p>
              <h5 className="text-lg font-semibold font-['Outfit']">
                Class Schedule and Format
              </h5>
              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  Each batch will have three classes per week. The specific days
                  will be communicated to you.
                </li>
                <li>
                  Each class is one and a half hours long, typically including
                  teaching and doubt clearing.
                </li>
                <li>
                  Access live classes through your student portal dashboard or
                  through the provided timetable.
                </li>
                <li>
                  We only offer live classes, and no recordings will be provided
                  throughout the course.
                </li>
              </ul>
              <h5 className="text-lg font-semibold font-['Outfit']">
                Practice and Performance
              </h5>
              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  Engage with all practice questions, quizzes, and mock tests to
                  improve your coding skills.
                </li>
                <li>
                  Your performance rating will benefit from active participation
                  in these activities.
                </li>
                <li>
                  We provide notes for your future reference, which you can find
                  in your student portal.
                </li>
              </ul>
              <h4 class="mb-2 text-sky-500 text-xl font-semibold font-['Outfit']">
                2. Terms of Service
              </h4>
              <h5 className="text-lg font-semibold font-['Outfit']">
                Interactions and Conduct
              </h5>
              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  Personal interactions between students and mentors outside of
                  official channels are not permitted, including the creation of
                  class WhatsApp groups or similar.
                </li>
                <li>
                  Sharing or recording course materials or data with external
                  parties (friends, relatives, teachers, etc.) is strictly
                  prohibited, and the company will take severe legal action as
                  per the law.
                </li>
                <li>
                  You are responsible for your conduct and adherence to these
                  rules.
                </li>
              </ul>
              <h5 className="text-lg font-semibold font-['Outfit']">
                Course Enrollment and Refunds
              </h5>
              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  Once enrolled in a course, you are responsible for your
                  participation. No refunds will be given.
                </li>
                <li>
                  Your access to your student portal will be revoked after one
                  month of completion of your course.
                </li>
              </ul>
              <h5 className="text-lg font-semibold font-['Outfit']">
                Performance and Placement
              </h5>
              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  Your performance in the course is your responsibility. We
                  provide training without ensuring any job guarantees.
                </li>
                <li>
                  Referrals for internships and placements will be judged based
                  on your performance metrics and mentor recommendations.
                </li>
              </ul>
              <h4 class="mb-2 text-sky-500 text-xl font-semibold font-['Outfit']">
                3. Specific Terms for Different Programs
              </h4>
              <h5 className="text-lg font-semibold font-['Outfit']">
                Training Program
              </h5>
              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  Enrollment in the training program is solely for educational
                  purposes and does not include job assistance.
                </li>
                <li>
                  Exceptional students may receive internship referrals based on
                  batch mentor suggestions.
                </li>
              </ul>
              <h5 className="text-lg font-semibold font-['Outfit']">
                Training and Placement Assistance Program
              </h5>
              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  The sole intention of this program is to make you
                  interview-ready, and the company reserves the right to decide
                  the number and type of companies for referrals based on your
                  performance, internal mock interview results, and conduct
                  during the program.
                </li>
                <li>
                  Eligibility for referrals is based on meeting a minimum of 90%
                  in the student portal progress bar and scoring at least 75% in
                  internal mock interviews.
                </li>
                <li>
                  Enrollment in this program does not guarantee a job, and
                  cracking a job completely depends on the student.
                </li>
                <li>
                  We assist you throughout the course and make you feel
                  confident in your preparation.
                </li>
                <li>
                  If you do not meet the criteria, you will not be referred for
                  placements.
                </li>
              </ul>
              <h4 class="mb-2 text-sky-500 text-xl font-semibold font-['Outfit']">
                4. Consequences of Non-Compliance
              </h4>

              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  Failure to comply with these terms may result in your being
                  removed from the batch and the termination of your student
                  contract with the company without refunds or prior notice.
                </li>
              </ul>
              <h4 class="mb-2 text-sky-500 text-xl font-semibold font-['Outfit']">
                5. Agreement and Acknowledgment
              </h4>

              <ul
                typeof="circle"
                className="list-outside list-disc mb-5 pl-5 text-gray-600 text-base font-normal font-['Outfit']"
              >
                <li>
                  By agreeing to these terms, you acknowledge that the company's
                  priority is to provide quality education and training.
                </li>
                <li>
                  You agree not to take any action against the company and to
                  focus on your preparation and learning.
                </li>
              </ul>
              <p className="mb-5 text-gray-600 text-base font-normal font-['Outfit']">
                By understanding and agreeing to these terms, you consent to
                abide by the rules and regulations of MAANG Careers as outlined
                above.
              </p>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={handleAcceptTerms}
                  className="w-5 h-5 bg-white rounded shadow-inner border border-slate-400 me-2"
                />
                <p className="text-gray-700 text-base font-medium font-['Outfit']">
                  Yes, I understand and agree to the above terms, and I consent
                  accordingly.{" "}
                </p>
              </div>
              <div className="text-right">
                <button
                  onClick={() => {
                    if (termsAccepted) {
                      handleAgree();
                    } else {
                      alert("Please agree to the terms to proceed.");
                    }
                  }}
                  className="w-[100px] h-10 bg-emerald-400 rounded-[5px] text-center text-white text-base font-medium font-['Outfit']"
                >
                  Agree
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="p-5">
        <div class="flex flex-wrap -mx-3 gap-y-4">
          <div className="xl:w-[calc(100%-320px)] w-full px-3">
            <div className="student-card rounded-2xl bg-white shadow-[0px_5px_25px_0px_rgba(62,144,156,0.10)]">
              <div className="lectures-cards sm:-mx-3 flex-wrap !gap-x-0">
                {displayOnGoingBatch()}
                {displayUpcomingBatch()}
              </div>
            </div>
            <div className="hidden sm:block">
              <DisplayNotice notices={notices} />
            </div>
          </div>
          <div className="xl:w-[320px] w-full px-3">
            <div className="xl:overflow-visible sm:overflow-auto">
              <div className="xl:block sm:flex xl:mx-0 gap-x-4">
                <div className="xl:px-0 xl:w-full sm:w-6/12 w-full sm:mb-0 mb-4 sm:block hidden">
                  {/* <Calendar
                    // highlightedDays={highlightedDays}
                    ServerDay={ServerDay}
                    // handleMonthChange={handleMonthChange}
                  /> */}
                  <MentorCalendar />
                  {/* updated progress bar */}
                </div>
                <div className="xl:px-0 xl:w-full sm:w-6/12 w-full">
                  <MentorPerformanceChart batchInfo={batchInfo} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block sm:hidden">
          <DisplayNotice notices={notices} />
        </div>
      </div>
    </>
  );
};

export default MentorDashboard;
