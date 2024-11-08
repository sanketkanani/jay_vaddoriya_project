import React, { useContext, useEffect, useState } from "react";
import { useCookie } from "react-use";
import { ApiBaseURL } from "../../services/config/Endpoints";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DisplayNotice from "./ProgressCard/Notice/DisplayNotice";
import { studentContext } from "../Student/context";
import PerformanceChart from "./PerformanceChart";
import Calendar from "../Common/Calendar";
import { useNavigate } from "react-router-dom";

const calculateSlidesToShow = (data) => {
  const totalItems = data.length;

  if (totalItems >= 3) {
    return 3;
  } else {
    return totalItems;
  }
};

const createSlides = (data) => {
  const slides = [];
  const categories = { practice: [], mock: [], quiz: [] };
  console.log("========== nbnbnb========>", data);

  // Categorize the data
  data.forEach((item) => {
    if (item.details && item.details.syllabus_id !== undefined) {
      const type = item.type.toLowerCase();
      if (type === "practice week") {
        categories.practice.push(item);
      } else if (type === "mock week") {
        categories.mock.push(item);
      } else if (type === "quiz week") {
        categories.quiz.push(item);
      }
    }
  });

  // Create slides with the pattern: practice, mock, quiz
  while (
    categories.practice.length ||
    categories.mock.length ||
    categories.quiz.length
  ) {
    const slide = [];

    if (categories.practice.length) {
      slide.push(categories.practice.shift());
    }

    if (categories.mock.length) {
      slide.push(categories.mock.shift());
    }

    if (categories.quiz.length) {
      slide.push(categories.quiz.shift());
    }

    // Add the slide only if it has content
    if (slide.length > 0) {
      slides.push(slide);
    }
  }
  console.log("********** nnnnnn", slides);
  return slides;
};

const FreeDashboard = () => {
  const [loggedIn, ,] = useCookie("maang");
  const [otherCardsData, setOtherCardsData] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(
    calculateSlidesToShow(otherCardsData)
  );
  const [notices, setNotices] = useState([]);
  const { quizProgress, mockProgress, batchInfo } = useContext(studentContext);
  const navigate = useNavigate();

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
    fetchData();
  }, [loggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loggedIn) {
          const { token } = JSON.parse(loggedIn);
          const response = await fetch(
            `${ApiBaseURL}free-course-management/student-dashboard-free-course/`,
            {
              method: "GET",
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const { data } = await response.json();
          // console.log("API response:", data);

          const resultArray = [];

          data.forEach((item) => {
            // Extract details for quiz, practice, and mock
            const { course_id, course_name, quiz, practice, mock } = item;

            if (quiz) {
              resultArray.push({
                type: "Quiz Week",
                color: "cyan",
                title: "Quiz Week",
                status: quiz.is_lock ? "Locked" : "Unlocked",
                condition: quiz.msg || "No message",
                details: {
                  syllabus_id: quiz.syllabus_id,
                  syllabus_name: quiz.syllabus_name,
                  max_score: quiz.max_score,
                  attempt_number: quiz.attempt_number,
                  score: quiz.score,
                  time: quiz.time,
                },
                course_id,
                course_name,
              });
            }

            // Process practice
            if (practice) {
              resultArray.push({
                type: "Practice Week",
                color: "blue",
                title: "Practice Week",
                status: practice.is_lock ? "Locked" : "Unlocked",
                condition: practice.msg || "No message",
                details: {
                  syllabus_id: practice.syllabus_id,
                  syllabus_name: practice.syllabus_name,
                  max_score: practice.max_score,
                  attempt_number: practice.attempt_number,
                  score: practice.score,
                  time: practice.time,
                },
                course_id,
                course_name,
              });
            }

            // Process mock
            if (mock) {
              resultArray.push({
                type: "Mock Week",
                color: "green",
                title: "Mock Week",
                status: mock.is_lock ? "Locked" : "Unlocked",
                condition: mock.msg || "No message",
                details: {
                  syllabus_id: mock.syllabus_id,
                  syllabus_name: mock.syllabus_name,
                  max_score: mock.max_score,
                  attempt_number: mock.attempt_number,
                  score: mock.score,
                  time: mock.time,
                },
                course_id,
                course_name,
              });
            }
          });

          console.log("nnnnnnnnnnnnnnnnnnnn", data);

          console.log("IIIIiiiiiiiiiiii", resultArray);

          resultArray.sort((a, b) =>
            (a.details.syllabus_name || "").localeCompare(
              b.details.syllabus_name || ""
            )
          );

          setOtherCardsData(createSlides(resultArray));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loggedIn]);

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

  function formatTimestampToTime(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
  }

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

  const otherCards = (
    color,
    title,
    data = {},
    status,
    condition,
    next_q_id,
    next_q_week,
    course_id,
    week_id,
    course_name
  ) => {
    if (!data || Object.keys(data).length === 0) {
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
          {course_name ? `${course_name}` : "No Course Data"}
        </span>
        <span className="other-cards-wrapper-subject-title">
         {data.syllabus_name || "No Syllabus Name"}
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
          <span>
            &nbsp;&nbsp;
            {formatStartDate(data.time || "No Time")}
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
          <span>
            &nbsp;&nbsp;
            {formatTimestampToTime(data.time || "No Time")}
          </span>
        </div>
        <div className="other-cards-footer flex items-center px-4 pb-4">
          <span
            className={`other-cards-footer-line w-full h-[1px] ${color}`}
          ></span>
          <button
            className={`cta ml-2 btn btn-start whitespace-nowrap disabled:opacity-50 ${color}`}
            onClick={() => {
              navigate(
                title === "Practice Week"
                  ? "/free/practice/"
                  : title === "Mock Week"
                  ? "/free/mock-test"
                  : "/free/quiz"
              );
            }}
          >
            Retake
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log("*********** others data", otherCardsData);
  }, [otherCardsData]);

  return (
    <>
      <div className="p-5">
        <div class="flex flex-wrap -mx-3 gap-y-4">
          <div className="xl:w-[calc(100%-320px)] w-full px-3">
            <div className="student-card rounded-2xl bg-white shadow-[0px_5px_25px_0px_rgba(62,144,156,0.10)]">
              <div className="other-cards text-left">
                <span className="card-title">Others</span>
                <div className="other-cards-container grid gap-4 xs:grid-cols-2 xl:grid-cols-3">
                  {/* <Slider {...carouselSettings}> */}
                  {otherCardsData.map(
                    (card, cardIndex) =>
                      card &&
                      card.map((item, itemIndex) => (
                        <div key={itemIndex} className="  w-full">
                          {otherCards(
                            item.color,
                            item.title,
                            item?.details, // Assuming `details` is used for content
                            item?.details?.is_lock ? "Locked" : "Unlocked",
                            item?.details?.msg || "",
                            item?.details?.syllabus_id, // Use optional chaining
                            item?.details?.syllabus_name,
                            item?.course_id,
                            item?.details?.syllabus_id, // Assumed that `week_value` might be from syllabus_id
                            item?.course_name
                          )}
                        </div>
                      ))
                  )}
                  {/* </Slider> */}
                </div>
              </div>
            </div>
            <div>
              <DisplayNotice notices={notices} />
            </div>
          </div>
          <div className="xl:w-[320px] w-full px-3 right-side-section">
            <div className="xl:overflow-visible sm:overflow-auto">
              <div className="xl:block sm:flex xl:mx-0 gap-x-4">
                <div className="xl:px-0 xl:w-full sm:w-6/12 w-full sm:mb-0 mb-4 sm:block hidden">
                  <Calendar />
                </div>
                <div className="xl:px-0 xl:w-full sm:w-6/12 w-full ">
                  <PerformanceChart
                    quizProgress={quizProgress}
                    mockProgress={mockProgress}
                    batchInfo={batchInfo}
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

export default FreeDashboard;
