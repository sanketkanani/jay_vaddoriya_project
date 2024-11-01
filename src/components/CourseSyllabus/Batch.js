import React, { useState, useRef, useEffect } from "react";
// import { ApiBaseURL } from "../ApiConfig";
import { useCookie } from "react-use";
import Swal from "sweetalert2";
import dimondimg from './images/squirewithline.png';
import "./coursesyllabus.css";
import { ApiBaseURL } from "../../services/config/Endpoints";

const Batch = ({ course_id }) => {
  // console.log(course_id);
  const [activeCourse, setActiveCourse] = useState(course_id);
  // console.log(activeCourse);
  // console.log(activeCourse);
  const [showSyllabus, setShowSyllabus] = useState(true);
  const [previousCourses, setPreviousCourses] = useState([]);
  const [noticeCount, setNoticeCount] = useState(0);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [batchClick, setBatchClick] = useState(null);
  const [loggedIn] = useCookie("maang");

  const [myProgress, setMyProgress] = useState({
    classesRemaining: 0,
    classesCompleted: 0,
    totalClass: 0,
    endDate: null,
    startDate: null,
  });

  const handleOngoingBatchesClick = async () => {
    setBatchClick("ongoing");
    try {
      const response = await fetch(
        `${ApiBaseURL}mentor-management/batch-complete-view/?course_id=${activeCourse}`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      );
      // console.log(`Token ${JSON.parse(loggedIn).token}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const { ongoing_data, previous_data } = data || {};

      if (ongoing_data && ongoing_data.length > 0) {
        setPreviousCourses([]);
        setOngoingCourses(ongoing_data);
        setShowSyllabus(true);
      }

      if (ongoing_data && ongoing_data.length > 0) {
        const batchId = ongoing_data[0].batch_id;

        const getResponse = await fetch(
          `${ApiBaseURL}mentor-management/batch-request-ongoing?batch_id=${batchId}`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );

        if (!getResponse.ok) {
          throw new Error(`HTTP error! Status: ${getResponse.status}`);
        }

        const getData = await getResponse.json();

        // console.log("Get API response:", getData);
      }
    } catch (error) {
      // console.error("Error fetching ongoing courses:", error);
    }
  };

  const handlePreviousBatchesClick = async () => {
    setBatchClick("previous");
    try {
      const response = await fetch(
        `${ApiBaseURL}mentor-management/batch-complete-view/?course_id=${activeCourse}`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const { previous_data } = data || {};

      if (previous_data && previous_data.length > 0) {
        setOngoingCourses([]);
        setPreviousCourses(previous_data);
        setShowSyllabus(true);
      } else {
        Swal.fire({
          title: "No previous batches exists!",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Okay",
        }).then((result) => {
          if (result.isConfirmed) {
            handleOngoingBatchesClick();
          }
        });
      }

      if (previous_data && previous_data.length > 0) {
        const batchId = previous_data[0].batch_id;
        const getResponse = await fetch(
          `${ApiBaseURL}mentor-management/batch-request-ongoing?batch_id=${batchId}`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );

        if (!getResponse.ok) {
          throw new Error(`HTTP error! Status: ${getResponse.status}`);
        }

        const getData = await getResponse.json();
        setRequestData(getData);
        // Handle the received data as needed
        // console.log("Get API response:", getData);
        // Update your state or UI with the received data
      }
    } catch (error) {
      // console.error("Error fetching previous courses:", error);
    }
  };

  useEffect(() => {
    handleOngoingBatchesClick();
  }, [course_id]);
  const resetNotification = async () => {
    try {
      const token = JSON.parse(loggedIn).token;
      const response = await fetch(
        "https://django.maangcareers.com/user-management/reset_notice_count/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      if (responseData.message === "All notifications marked as read") {
        // console.log(
        //   "Successfully reset notification count:",
        //   responseData.message
        // );
      } else {
        // console.warn("Unexpected response:", responseData);
      }
    } catch (error) {
      // console.error("Error resetting notification count:", error);
    }
  };

  const handleNotificationIconClick = () => {
    resetNotification();
    setIsNotificationPanelOpen((prev) => !prev);
  };

  const handleBatchRequest = async (batchId) => {
    try {
      const token = JSON.parse(loggedIn).token;
      // console.log("batch", batchId);
      const formData = new FormData();
      formData.append("batch_id", batchId);

      const response = await fetch(
        ` ${ApiBaseURL}mentor-management/batch-request-ongoing/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      handleOngoingBatchesClick();

      // console.log("Batch request successful:", responseData);
    } catch (error) {
      // console.error("Error making batch request:", error);
    }
  };

  return (
    <div className="flex bg-[#f6fffe]">
      <div className="flex flex-col w-full">
        <div className="p-5 flex">
          <div className="sm:w-8/12 w-full">
            <div>
              {activeCourse && (
                <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700">
                  <ul className="flex flex-wrap -mb-px culsyllabus">
                    <li className="culsyllabus-active">
                      <a
                        href="#"
                        onClick={handleOngoingBatchesClick}
                        className={`focus:outline-none py-2 rounded-t-md ${
                          batchClick === "ongoing"
                            ? "text-[#35C69D] text-base font-medium font-['Outfit']"
                            : " text-black text-base font-medium font-['Outfit']"
                        }`}
                      >
                        On Going Batches
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={handlePreviousBatchesClick}
                        className={`focus:outline-none rounded-t-md ${
                          batchClick === "previous"
                            ? "text-[#35C69D] underline text-base font-medium font-['Outfit']"
                            : " text-black text-base font-medium font-['Outfit']"
                        }`}
                        aria-current="page"
                      >
                        Previous Batches
                      </a>
                    </li>
                  </ul>
                </div>
              )}

              {showSyllabus &&
                batchClick === "ongoing" &&
                ongoingCourses.length > 0 && (
                  <div>
                    {ongoingCourses.length > 0 ? (
                      ongoingCourses.map((ongoingCourse, index) => (
                        <div key={index} className="flex justify-between">
                          <div
                            className="flex-1"
                            style={{ marginRight: "1rem" }}
                          >
                            <h2 className="text-center font-bold batchtitle">
                              Batch {ongoingCourse.batch_id || "N/A"}
                            </h2>
                            <div
                              className="mb-5"
                              style={{
                                backgroundImage: "url('../../images/line.png')",
                                backgroundPosition: "center",
                                // backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                              }}
                            >
                              <div className="border border-[#C5D9DC] mt-4 bg-[#C5D9DC] batchbox">
                                <h3 className="text-center font-bold border pt-2 pb-2 pl-3 pr-2 border-[#C5D9DC] flex">
                                  {ongoingCourse.course__name || "N/A"}
                                </h3>
                                <div className="flex border pt-2 pb-2 pl-3 pr-2 border-[#C5D9DC] flex">
                                  Number of Students: {" "}
                                  <p className="font-bold">
                                    {" "}
                                    {ongoingCourse.no_of_students}
                                  </p>
                                </div>
                                <div className="flex border pt-2 pb-2 pl-3 pr-2 border-[#C5D9DC] flex">
                                  Course End Date: {" "}
                                  <p className="font-bold">
                                    {" "}
                                    {ongoingCourse.end_date || "Not available"}
                                  </p>
                                </div>

                                <div className="border pt-2 pb-2 pl-3 pr-2 border-[#C5D9DC] flex justify-between items-center">
                                  <span> Course Complete?</span>
                                  {/* <button
                                    className={`text-[#24b584] ml-8 border px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-[#24b584] transition-colors duration-300 ${
                                      ongoingCourse.completed_status ===
                                      "Completed"
                                        ? "bg-orange-300 text-orange-500"
                                        : ongoingCourse.completed_status ===
                                          "pending"
                                        ? `text-yellow-800 ml-8 border px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-yellow-500 transition-colors duration-300 bg-yellow-300`
                                        : "bg-[#c3f9e7] hover:bg-[#24b584] hover:text-white border-green-500"
                                    }`}
                                    onClick={() =>
                                      handleBatchRequest(ongoingCourse.batch_id)
                                    }
                                  >
                                    {ongoingCourse.completed_status ||
                                      "Request"}
                                  </button> */}
                                </div>
                                <div className="border pt-2 pb-2 pl-3 pr-2 flex justify-between items-center">
                                  <span>Release Certificate ~ </span>
                                  <button
                                    className={`text-[#24b584] ml-8 px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-[#24b584] transition-colors duration-300 ${
                                      ongoingCourse.b_certificate_status ===
                                      "Completed"
                                        ? "bg-orange-300 text-orange-500"
                                        : ongoingCourse.b_certificate_status ===
                                          "pending"
                                        ? `text-yellow-800 ml-8 border px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-yellow-500 transition-colors duration-300 bg-yellow-300`
                                        : "bg-[#c3f9e7] hover:bg-[#24b584] hover:text-white border-green-500"
                                    }`}
                                    onClick={() => {
                                      Swal.fire({
                                        title:
                                          "Are you sure about requesting batch completion?",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Yes",
                                        cancelButtonText: "No",
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          handleBatchRequest(
                                            ongoingCourse.batch_id
                                          );
                                        }
                                      });
                                    }}
                                    disabled={
                                      ongoingCourse.b_certificate_status ===
                                      "pending"
                                    }
                                  >
                                    {ongoingCourse.b_certificate_status ||
                                      "Request"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center mt-4">No data available</div>
                    )}
                  </div>
                )}
            </div>

            {showSyllabus &&
              batchClick === "previous" &&
              previousCourses.length > 0 && (
                <div>
                  {previousCourses
                    .reduce((rows, previousCourse, index) => {
                      if (index % 2 === 0) rows.push([]);
                      rows[rows.length - 1].push(previousCourse);
                      return rows;
                    }, [])
                    .map((row, rowIndex) => (
                      <div key={rowIndex} className="flex justify-between">
                        {row.map((previousCourse, index) => (
                          <div
                            key={index}
                            className="flex-1"
                            style={{ marginRight: "1rem" }}
                          >
                            <h2 className="text-center font-bold">
                              Batch {previousCourse.batch_id || "N/A"}
                            </h2>
                            <div className="border border-[#C5D9DC] p-2 mt-5 h-34 w-25 bg-[#35C69D1A] rounded ">
                              <h3 className="text-center mb-4 font-bold">
                                {previousCourse.course__name || "N/A"}
                              </h3>
                              <span className="flex">
                                Number of Students:{" "}
                                <p className="font-bold">
                                  {" "}
                                  {previousCourse.no_of_students}
                                </p>
                              </span>
                              <span className="flex">
                                Course End Date:{" "}
                                <p className="font-bold">
                                  {" "}
                                  {previousCourse.end_date || "Not available"}
                                </p>
                              </span>
                              <div className="border border-[#C5D9DC] p-2 flex justify-between items-center">
                                <span>Course Complete?</span>
                                {/* <button
                                  className={`text-orange-500 ml-8 border px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-orange-500 transition-colors duration-300 bg-orange-300`}
                                  onClick={() =>
                                    handleBatchRequest(previousCourse.batch_id)
                                  }
                                >
                                  {previousCourse.completed_status || "N/A"}
                                </button> */}
                              </div>
                              <div className="border p-2 flex justify-between items-center">
                                <span>Release Certificate ~ </span>
                                <button
                                  className={`text-orange-500 ml-8 border px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-orange-500 transition-colors duration-300 bg-orange-300`}
                                  onClick={() =>
                                    handleBatchRequest(previousCourse.batch_id)
                                  }
                                  disabled={previousCourse.b_certificate_status === 'Completed'}
                                >
                                  {previousCourse.b_certificate_status || "N/A "}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Batch;
