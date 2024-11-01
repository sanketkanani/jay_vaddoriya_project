import React, { useContext, useEffect, useState } from "react";
import "./submission.css";

import dayjs from "dayjs";

import axios from "axios";
import Dayjs from "dayjs";
import JSZip from "jszip";
import { useCookie } from "react-use";
import Swal from "sweetalert2";
// import { ApiBaseURL } from "../ApiConfig";
import MentorCalendar from "../Common/Calendar/MentorCalendar";
import MentorPerformanceChart from "../Dashboard/MentorPerformanceChart";
import { mentorContext } from "../Mentor/context";

import { SearchResultContext } from "./SearchResultContext ";
import TableData from "./tableData";
import { ApiBaseURL } from "../../services/config/Endpoints";

const MentorSubmission = () => {
  const { searchResults } = useContext(SearchResultContext);
  const { batchInfo } = useContext(mentorContext);
  const [activeCourse, setActiveCourse] = useState(null);
  const [showSyllabus, setShowSyllabus] = useState(true);

  const [successMessage, setSuccessMessage] = useState("");
  const [tableData, setTableData] = useState([]);
  const [showBatch, setShowBatch] = useState(false);
  const [weekData, setWeekData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkData, setCheckData] = useState({});
  // searchResults.forEach((result) => {
  //   initialState[result.id] = result.status || ""; // Assuming result.status contains "Passed" or "Failed"
  // });

  // const [checkedSearchItems, setCheckedSearchItems] = useState(initialState);
  const [checkedSearchItems, setCheckedSearchItems] = useState({});
  const [changesToSave, setChangesToSave] = useState({});
  const [ongoingBatchIds, setOngoingBatchIds] = useState([]);
  const [previousBatchIds, setPreviousBatchIds] = useState([]);
  const [clickedBatchType, setClickedBatchType] = useState(null);
  const [selectedWeekId, setSelectedWeekId] = useState("");
  const [courses, setCourses] = useState([]);
  const [loggedIn] = useCookie("maang");
  const [timetables, setTimeTables] = useState([]);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [myProgress, setMyProgress] = useState({
    classesRemaining: 10,
    classesCompleted: 5,
    totalClass: 15,
    endDate: "2024-12-31",
    startDate: "2024-01-01",
  });
  // console.log(activeCourse);
  // console.log(checkedSearchItems);
  const [selectedTabId, setSelectedTabId] = useState(null);
  // console.log(selectedTabId);
  // console.log(searchResults);
  const [selectAll, setSelectAll] = useState(false);
  const [selectAllSearch, setSelectAllSearch] = useState(false);
  const [selectedBatchType, setSelectedBatchType] = useState("ongoing");
  const [topicList, setTopicList] = useState([]);
  const [selectAllTab, setSelectAllTab] = useState('');

  const handleSelectAll = () => {
    const newCheckedItems = {};
    if (!selectAll) {
      tableData.forEach((row) => (newCheckedItems[row.id] = true));
    }
    setCheckedItems(newCheckedItems);
    setSelectAll(!selectAll);
  };

  const handleSelect = () => {
    const newCheckedItemsSearch = { ...checkedItems };

    if (!selectAllSearch) {
      searchResults.forEach(
        (result) => (newCheckedItemsSearch[result.id] = true)
      );
    } else {
      searchResults.forEach(
        (result) => (newCheckedItemsSearch[result.id] = false)
      );
    }

    setCheckedSearchItems(newCheckedItemsSearch);
    setSelectAllSearch(!selectAllSearch);
  };

  useEffect(() => {
    const newCheckedSearchItems = {};
    searchResults.forEach((result) => {
      newCheckedSearchItems[result.id] = result.status || "";
    });
    setCheckedSearchItems(newCheckedSearchItems);
  }, [searchResults]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleTabClick = async (batchId) => {
    setSelectedTabId(batchId);

    try {
      const response = await axios.get(
        `${ApiBaseURL}mentor-management/batch-subission-data/?batch_id=${batchId}`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      );

      const { message, main_data } = response.data;

      if (message === 1) {
        if (
          Array.isArray(main_data) &&
          main_data.length > 0 &&
          selectedBatchType === "ongoing"
        ) {
          setTableData(main_data);
        } else if (
          Array.isArray(main_data) &&
          main_data.length > 0 &&
          selectedBatchType === "previous"
        ) {
          setTableData(main_data);
        } else {
          setTableData([]);
        }
      } else {
        setTableData([]);
      }
    } catch (error) {
      // console.error("Error fetching batch submission data:", error);
    }
  };






  const [selectedWeek, setSelectedWeek] = React.useState("");
  // console.log(selectedWeek);
  const handleWeekSelect = (selectedWeek) => {
    setSelectedWeek(selectedWeek);
    const selectedWeekObject = weekData.find(
      (week) => week.id === selectedWeek
    );
    if (selectedWeekObject) {
      setSelectedWeekId(selectedWeekObject.id);
    }
  };

  // console.log(weekData);

  const handleCheckboxChangeSearch = (id) => {
    setCheckedSearchItems((prevCheckedSearchItems) => {
      const updatedCheckedSearchItems = {
        ...prevCheckedSearchItems,
        [id]: !prevCheckedSearchItems[id],
      };

      setChangesToSave((prevChanges) => ({
        ...prevChanges,
        [id]: updatedCheckedSearchItems[id] ? "unchecked" : "checked",
      }));

      return updatedCheckedSearchItems;
    });
  };
  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = {
        ...prevCheckedItems,
        [id]: !prevCheckedItems[id],
      };

      setChangesToSave((prevChanges) => ({
        ...prevChanges,
        [id]: updatedCheckedItems[id] ? "unchecked" : "checked",
      }));

      return updatedCheckedItems;
    });
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${ApiBaseURL}mentor-management/inst-course-list/`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );

        const { message, courses } = response.data;

        if (message === 1 && courses && courses.length > 0) {
          const coursesData = courses.map(({ course_id, course__name }) => ({
            id: course_id,
            name: course__name,
          }));

          setCourses(coursesData);

          if (coursesData.length > 0) {
            handleCourseClick(coursesData[0].id);
            handleSyllabusClick(coursesData[0].id);
          }
        }
      } catch (error) {
        // console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [loggedIn]);


  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${ApiBaseURL}mentor-management/inst-course-list/`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      );

      const { message, courses } = response.data;

      if (message === 1 && courses && courses.length > 0) {
        const coursesData = courses.map(({ course_id, course__name }) => ({
          id: course_id,
          name: course__name,
        }));

        setCourses(coursesData);

        if (coursesData.length > 0) {
          handleCourseClick(coursesData[0].id);
          handleSyllabusClick(coursesData[0].id);
        }
      }
    } catch (error) {
      // console.error("Error fetching courses:", error);
    }
  };

  const handleBatchClick = async (batchType) => {
    setSelectedBatchType(batchType);
    setClickedBatchType(batchType);
    if(selectAllTab == 'all' && batchType === 'ongoing'){
        fetchCourses();
    }
    try {
      const response = await axios.get(
        `${ApiBaseURL}mentor-management/inst-get-batch/?course_id=${activeCourse}`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      );

      const { data } = response.data;
      // console.log(data);

      setOngoingBatchIds(data.ongoing_batches_ids.map((batch) => batch.id));
      setPreviousBatchIds(data.previous_batches_ids.map((batch) => batch.id));
    } catch (error) {
      // console.error("Error fetching batch IDs:", error);
    }
  };


  const handleAllClick = async (batchType) => {
    setSelectAllTab(batchType);
    try {
      const response = await axios.get(
        `${ApiBaseURL}mentor-management/all_batch-subission-data`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      );
      const { data } = response;
      const defaultTabId = data?.previous_data[0]?.batch_id;
      setSelectedTabId(defaultTabId);
      handleTabClick(defaultTabId);
      setPreviousBatchIds([...new Set(data.previous_data.map((batch) => batch.batch_id))]);
    } catch (error) {
      // console.error("Error fetching batch IDs:", error);
    }
  };



  useEffect(() => {
    handleBatchClick(selectedBatchType);
  }, [selectedBatchType, activeCourse]);

  useEffect(() => {
    if (ongoingBatchIds.length > 0 && selectedBatchType === "ongoing") {
      const defaultTabId = ongoingBatchIds[0];
      setSelectedTabId(defaultTabId);
      handleTabClick(defaultTabId);
    }
  }, [ongoingBatchIds, selectedBatchType]);


  useEffect(() => {
    if (previousBatchIds.length > 0 && selectedBatchType === "previous") {
      const defaultTabId = previousBatchIds[0];
      setSelectedTabId(defaultTabId);
      handleTabClick(defaultTabId);
    }
  }, [previousBatchIds, selectedBatchType]);

  const fetchDataForWeek = async (selectedTabId) => {
    // console.log(selectedTabId);
    // console.log(selectedWeek);
    try {
      const response = await axios.get(
        `${ApiBaseURL}mentor-management/all-subission-data/?batch_id=${selectedTabId}`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      );
      // console.log(selectedTabId);
      // console.log(selectedWeek);

      const { message, ongoing_data, previous_data } = response.data;

      if (message === 1) {
        if (Array.isArray(ongoing_data) && ongoing_data.length > 0) {
          setTableData(ongoing_data);
        } else if (Array.isArray(previous_data) && previous_data.length > 0) {
          setTableData(previous_data);
        } else {
          setTableData([]);
        }
      } else {
        setTableData([]);
      }
    } catch (error) {
      // console.error("Error fetching data for the selected week:", error);
    }
  };

  useEffect(() => {
    fetchDataForWeek(selectedWeek);
  }, [selectedWeek]);

  const handleRadioChange = async (rowId, value) => {
    const updatedCheckedItems = {
      ...checkData,
      [rowId]: value,
    };

    const submissionData = Object.keys(updatedCheckedItems).map((id) => ({
      submission_id: id,
      status: updatedCheckedItems[id],
    }));

    try {
      const response = await axios.post(
        `${ApiBaseURL}mentor-management/task-status/`,
        { submission_data: submissionData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(`Status updated to ${value} successfully`);
      } else {
        console.error(`Failed to update status to ${value}`);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }

    setCheckData(updatedCheckedItems);
  };

  useEffect(() => {
    setHighlightedDaysForCalendar();
  }, [timetables]);

  useEffect(() => {
    if (selectedTabId) {
      fetchDataForWeek(selectedTabId);
    }
  }, [selectedTabId]);

  useEffect(() => {
    if (selectedWeek && selectedTabId) {
      fetchDataForWeek(selectedTabId, selectedWeek);
    }
  }, [selectedWeek, selectedTabId]);

  useEffect(() => {
    const fetchWeekData = async () => {
      try {
        if (activeCourse) {
          const response = await axios.get(
            `${ApiBaseURL}mentor-management/week-topic-list/?course_id=${activeCourse}`,
            {
              headers: {
                Authorization: `Token ${JSON.parse(loggedIn).token}`,
              },
            }
          );

          const { main_data } = response.data;

          if (Array.isArray(main_data)) {
            setWeekData(main_data);
          } else {
            setWeekData([]);
          }
        }
      } catch (error) {
        // console.error("Error fetching week data:", error);
      }
    };

    fetchWeekData();
  }, [activeCourse, loggedIn]);

  const handleSaveChanges = async () => {
    const submissionData = Object.keys(checkedItems).map((id) => ({
      submission_id: id,
      status: checkedItems[id],
    }));

    try {
      const response = await fetch(
        `${ApiBaseURL}mentor-management/task-status/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
          body: JSON.stringify({ submission_data: submissionData }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Status updated successfully");
        // console.log("Status updated successfully");
        fetchDataForWeek(selectedTabId, selectedWeek);
        handleTabClick(selectedTabId);
      } else {
        setSuccessMessage("Failed to update status");
        // console.error("Failed to update status");
      }
    } catch (error) {
      setSuccessMessage("Error during API call");
      // console.error("Error during API call:", error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timerId = setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

      return () => clearTimeout(timerId);
    }
  }, [successMessage]);

  const setHighlightedDaysForCalendar = (currentDate = dayjs()) => {
    const timetables = [
      { start_date: "2024-01-05", start_time: "09:00:00" },
      { start_date: "2024-01-10", start_time: "10:00:00" },
      { start_date: "2024-01-15", start_time: "11:00:00" },
    ];

    let ongoingBatchesFiltered = timetables.filter((record) =>
      dayjs(`${record.start_date} ${record.start_time}`).isSame(
        currentDate,
        "month"
      )
    );

    const upcomingBatches = ongoingBatchesFiltered.map((x) =>
      dayjs(x.start_date).get("date")
    );

    setHighlightedDays(upcomingBatches);
  };

  const handleCourseClick = async (courseId) => {
    setOngoingBatchIds([]);
    setPreviousBatchIds([]);
    setActiveCourse(courseId);
    setShowSyllabus(false);
    setClickedBatchType("ongoing");
    setSelectAllTab('')
  };

  const handleSyllabusClick = async () => {
    setShowBatch(false);
    setShowSyllabus(true);
  };

  const handleDownloadAllClick = () => {
    const selectedFiles = Object.keys(checkedItems)
      .filter((id) => checkedItems[id])
      .map((id) => {
        return {
          id,
          fileName: `file_${id}.pdf`,
          fileLink: searchResults.find((result) => result.id === id)?.file,
        };
      });

    const zip = new JSZip();

    const promises = selectedFiles.map(({ fileName, fileLink }) => {
      return fetch(fileLink)
        .then((response) => response.blob())
        .then((blob) => zip.file(fileName, blob))
        .catch((error) => console.error(`Error fetching file: ${error}`));
    });

    Promise.all(promises)
      .then(() => {
        return zip.generateAsync({ type: "blob" });
      })
      .then((content) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "selected_files.zip";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      })
      .catch((error) => console.error(`Error creating zip file: ${error}`));
  };

  searchResults.map((result) => {
    // console.log("Result Status:", result.status);
    // console.log("Checked Status:", checkedSearchItems[result.id]);
    // console.log("Is Checked:", isChecked);
  });

  const getStatusColorClass = (status) => {
    switch (status) {
      case "Passed":
        return "bg-emerald-400 text-white";
      case "Failed":
        return "bg-red-400 text-white";
      case "Submitted":
        return "bg-yellow-400 text-black";
      default:
        return "bg-gray-300 text-black";
    }
  };


  const getAllTopic = async () => {
    try {
      if (activeCourse) {
        const response = await axios.get(
          `${ApiBaseURL}mentor-management/batch-subission-data/?batch_id=${selectedTabId}`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );
        setTopicList(response?.data?.topic_list)
        // console.log(" ***** hello get all topic ******** ", response);
      }
    } catch (error) {
      console.error("Error fetching topic data:", error);
    }
  }

  const filterAllTopic = async (value) => {
    const selectedData = topicList.find((data) => data.id === value);
    setSelectedWeek(selectedData)
    try {
      if (activeCourse) {
        const response = await axios.get(
          `${ApiBaseURL}mentor-management/batch-subission-data/?batch_id=${selectedTabId}&filter_id=${value}`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );
        setTableData(response?.data?.main_data);
        console.log(" ***** hello get all list ******** ", response);
      }
    } catch (error) {
      console.error("Error fetching topic data:", error);
    }
  }


  useEffect(() => {
    getAllTopic();
  }, [selectedTabId])

  return (
    <div className="p-5">
      <div className="flex flex-wrap -mx-3 gap-y-4">
        <div className="xl:w-[calc(100%-320px)] w-full px-3">
          <div className="inline-flex flex-wrap gap-3 p-2 bg-[#E0F6F4] rounded-[30px] mb-4">
            {courses.map((course) => (
              <button
                key={course.id}
                className={`px-5 py-2.5 text-base font-medium rounded-[25px] justify-center items-center bg-white gap-2.5 inline-flex ${activeCourse === course.id
                  ? "bg-gradient-to-l from-teal-400 to-sky-400 text-white"
                  : "bg-sky-200 hover:bg-sky-300 text-sky-800"
                  }`}
                onClick={() => handleCourseClick(course?.id)}
              >
                {course.name}
              </button>
            ))}
          </div>

          <br></br>
          <br></br>
          <div className="p-5 rounded-2xl  shadow-[0px_5px_25px_0px_rgba(59,154,168,0.15)] bg-white">
            <div>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                {activeCourse && (
                  <div className="flex space-x-4 mb-4 ">
                    <button
                      className={`px-4 py-2 rounded-md ${clickedBatchType === "ongoing"
                        ? "bg-[#35C69D] text-white"
                        : "bg-[#35C69D1A] text-[#35C69D]"
                        } `}
                      onClick={() => handleBatchClick("ongoing")}
                    >
                      On Going Batches
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md ${clickedBatchType === "previous"
                        ? "bg-[#35C69D] text-white"
                        : "bg-[#35C69D1A] text-[#35C69D]"
                        }  `}
                      onClick={() => {
                        const defaultTabId = previousBatchIds[0];
                        setSelectedTabId(defaultTabId);
                        handleBatchClick("previous");
                        if (previousBatchIds?.length === 0) {
                          Swal.fire({
                            title: "No previous batches exists!",
                            icon: "warning",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Okay",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleBatchClick("ongoing");
                            }
                          });
                        }
                      }}
                    >
                      Previous Batches
                    </button>

                  </div>
                )}
                <button
                  className={`px-4 py-2 rounded-md ${selectAllTab === "all"
                    ? "bg-[#35C69D] text-white"
                    : "bg-[#35C69D1A] text-[#35C69D]"
                    }  `} onClick={() => {
                      handleAllClick("all");
                    }}
                    style={{height:'40px'}}
                >
                  All Previous Batches
                </button>
              </div>


              <div className="flex mb-5">
                <div>
                  {selectAllTab !== 'all' && clickedBatchType === "ongoing" &&
                    ongoingBatchIds.length > 0 && (
                      <div className="tabs-container flex px-3">
                        {ongoingBatchIds.map((id) => (
                          <div
                            key={id}
                            className={`tab ${id === selectedTabId ? "active" : ""
                              }`}
                          >
                            <button
                              onClick={() => handleTabClick(id)}
                              className={`focus:outline-none px-4 py-2 rounded-t-md ${id === selectedTabId
                                ? "text-[#35C69D] underline text-base font-medium font-['Outfit']"
                                : "bg-white text-black text-base font-medium font-['Outfit']"
                                }`}
                            >
                              Batch {id}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                  {selectAllTab !== 'all' && clickedBatchType === "previous" &&
                    previousBatchIds.length > 0 && (
                      <div className="tabs-container flex px-3">
                        {previousBatchIds.map((id) => (
                          <div
                            key={id}
                            className={`tab ${id === selectedTabId ? "active" : ""
                              }`}
                          >
                            <button
                              onClick={() => {
                                handleTabClick(id);
                              }}
                              className={`focus:outline-none px-4 py-2 rounded-t-md ${id === selectedTabId
                                ? "text-[#35C69D] underline text-base font-medium font-['Outfit']"
                                : "bg-white text-black text-base font-medium font-['Outfit']"
                                }`}
                            >
                              Batch {id}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  {selectAllTab === "all" &&
                    previousBatchIds.length > 0 && (
                      <div className="tabs-container flex px-3">
                        {previousBatchIds.map((id) => (
                          <div
                            key={id}
                            className={`tab ${id === selectedTabId ? "active" : ""
                              }`}
                          >
                            <button
                              onClick={() => {
                                handleTabClick(id);
                              }}
                              className={`focus:outline-none px-4 py-2 rounded-t-md ${id === selectedTabId
                                ? "text-[#35C69D] underline text-base font-medium font-['Outfit']"
                                : "bg-white text-black text-base font-medium font-['Outfit']"
                                }`}
                            >
                              Batch {id}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
              <div className="flex items-center">
                <select
                  onChange={(e) => filterAllTopic(e.target.value)}
                  className="block ml-auto py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  value={selectedWeek}
                >
                  <option value="">--Select Topic--</option>
                  {topicList.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.topic_name}
                    </option>
                  ))}
                </select>
                <div className="ml-3">
                  <button
                    type="button"
                    className="px-3 py-1 bg-sky-500 bg-opacity-10 rounded-[5px] justify-center items-center gap-2.5 inline-flex text-sky-500 text-sm font-normal"
                    onClick={handleDownloadAllClick}
                  >
                    Download All
                  </button>
                  {"         "}
                  <button
                    type="button"
                    className="px-3 py-1 bg-emerald-400 bg-opacity-10 rounded-[5px] justify-center items-center gap-2.5 inline-flex text-emerald-400 text-sm font-normal"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                  <div className="ove">
                    {successMessage && (
                      <div className="text-green-500">{successMessage}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto mb-3 max-h-[500px] overflow-y-auto">
              {searchResults && searchResults.length > 0 && (
                <>
                  <h4 className="px-4 py-2 text-slate-800 text-base font-medium font-['Outfit']">
                    Search Results :
                  </h4>
                  <div className="week-list overflow-x-auto">
                    <div className="">
                      <table className="w-full border-collapse border-slate-400 mb-3">
                        <thead>
                          <tr>
                            <th className="px-4 py-2  bg-pink-100 border-slate-300 text-slate-800 text-base font-medium font-['Outfit']">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="w-5 h-5 bg-white rounded shadow-inner border border-slate-400"
                                  checked={selectAllSearch}
                                  onChange={handleSelect}
                                />
                                <span className="ml-2 text-gray-600">
                                  SL.NO
                                </span>
                              </div>
                            </th>
                            <th className="px-4 py-2  bg-pink-100 border-slate-300  text-slate-800 text-base font-medium font-['Outfit']">
                              Student Name
                            </th>
                            <th className="px-4 py-2  bg-pink-100 border-slate-300 text-slate-800 text-base font-medium font-['Outfit']">
                              Project Title
                            </th>
                            <th className="px-4 py-2  bg-pink-100 border-slate-300 text-slate-800 text-base font-medium font-['Outfit']">
                              Document
                            </th>
                            <th className="px-4 py-2  bg-pink-100 border-slate-300 text-slate-800 text-base font-medium font-['Outfit']">
                              Submission Date & Time
                            </th>
                            <th className="px-4 py-2  bg-pink-100 border-slate-300 text-slate-800 text-base font-medium font-['Outfit']">
                              Download
                            </th>
                            <th className="px-4 py-2  bg-pink-100 border-slate-300 text-slate-800 text-base font-medium font-['Outfit']">
                              Pass/Fail
                            </th>
                            {/* <th className="px-4 py-2 text-slate-800 text-base font-medium font-['Outfit']">
                              Pass
                            </th>
                            <th className="px-4 py-2 text-slate-800 text-base font-medium font-['Outfit']">
                              Fail
                            </th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults && searchResults.length > 0 ? (
                            searchResults.map((result) => (
                              <tr
                                key={result.id}
                                className="border-b border-gray-200 hover:bg-slate-100 text-sm font-medium text-gray-600 rounded-md"
                              >
                                <td className="px-4 py-2 border-slate-300">
                                  <div className="flex items-center">
                                    <input
                                      type="checkbox"
                                      className="w-5 h-5 bg-white rounded shadow-inner border border-slate-400"
                                      checked={!!checkedSearchItems[result.id]}
                                      onChange={() =>
                                        handleCheckboxChangeSearch(result.id)
                                      }
                                    />
                                    <span className="ml-2 text-gray-600">
                                      {result.id}
                                    </span>
                                  </div>
                                </td>

                                <td className="px-4 py-2 border-slate-300 font-['Outfit']">
                                  {`${result.student_first_name} ${result.student_last_name}`}
                                </td>
                                <td className="px-4 py-2 border-slate-300 font-['Outfit']">
                                  {result.assigned_project} [{" "}
                                  {result.assigned_topic} ]
                                </td>
                                <td className="px-4 py-2 flex border-slate-300 font-['Outfit']">
                                  <div className="w-6 h-6 bg-white rounded-[5px] shadow border border-slate-300 flex justify-center items-center">
                                    {/* <img
                                    src="/images/pdf-icon.svg"
                                    alt="pdf icon"
                                  /> */}
                                    <i class="bx bxs-file-doc"></i>
                                  </div>
                                  <a
                                    href={result.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ms-1 text-till-500 block hover:underline w-48 text-ellipsis truncate ..."
                                  >
                                    {result.file
                                      ? result.file.split("/").pop()
                                      : "File name not available"}
                                  </a>
                                </td>
                                <td className="px-4 py-2 border-slate-300 font-['Outfit']">
                                  {result.created_at
                                    ? `${Dayjs(result.created_at).format(
                                      "D MMM YYYY"
                                    )}, ${Dayjs(result.created_at).format(
                                      "h:mm A"
                                    )}`
                                    : "Date not available"}
                                </td>
                                <td className="px-4 py-2 border-slate-300">
                                  <div className="w-[30px] h-[30px] p-[7px] bg-emerald-400 rounded-lg justify-center items-center gap-2.5 inline-flex">
                                    <a
                                      href={result.file}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <i className="bx bx-download text-white px-2 py-1"></i>
                                    </a>
                                  </div>
                                </td>
                                <td>
                                  <span
                                    className={`px-3 py-1 rounded-2xl w-24 text-center inline-block ${getStatusColorClass(
                                      result.status
                                    )}`}
                                  >
                                    {result.status}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8" className="text-center py-4">
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {selectedTabId !== null && (
                <>
                  <h4 className="px-4 py-2 text-slate-800 text-base font-medium font-['Outfit']">
                    Batch Results :
                  </h4>
                  <div className="week-list overflow-x-auto">
                    <div className="">
                      <table className="w-full border-collapse border-slate-400 mb-3">
                        <thead>
                          <tr>
                            <th className="px-4 py-2  bg-[#E0F6F4] border-slate-300  text-slate-800 text-base font-medium font-['Outfit'] ">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6 bg-white rounded shadow-inner  border accent-[#3fd6ab] border-slate-400"
                                  checked={selectAll}
                                  onChange={handleSelectAll}
                                />
                                <span className="ml-2 text-gray-600">
                                  SL.NO
                                </span>
                              </div>
                            </th>
                            <th className="px-4 py-2 bg-[#E0F6F4] border-slate-300  text-slate-800 text-base font-medium font-['Outfit']">
                              Student Name
                            </th>
                            <th className="px-4 py-2   bg-[#E0F6F4] border-slate-300  text-slate-800 text-base font-medium font-['Outfit']">
                              Project Title
                            </th>
                            <th className="px-4 py-2   bg-[#E0F6F4] border-slate-300  text-slate-800 text-base font-medium font-['Outfit']">
                              Topic
                            </th>
                            <th className="px-4 py-2   bg-[#E0F6F4] border-slate-300  text-slate-800 text-base font-medium font-['Outfit']">
                              Submission Date & Time
                            </th>
                            <th className="px-4 py-2   bg-[#E0F6F4] border-slate-300  text-slate-800 text-base font-medium font-['Outfit']">
                              Download File
                            </th>
                            <th className="px-4 py-2   bg-[#E0F6F4] border-slate-300  text-slate-800 text-base font-medium font-['Outfit']">
                              Pass
                            </th>
                            <th className="px-4 py-2   bg-[#E0F6F4] border-slate-300  text-slate-800 text-base font-medium font-['Outfit'] ">
                              Fail
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData && tableData.length > 0 ? (
                            tableData.map((row) => (
                              <TableData row={row} handleCheckboxChange={handleCheckboxChange} checkData={checkData} handleRadioChange={handleRadioChange} checkedItems={checkedItems} selectAllTab={selectAllTab}/>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8" className="text-center py-4">
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="xl:w-[320px] w-full px-3">
          <MentorCalendar />
          <MentorPerformanceChart batchInfo={batchInfo} />
        </div>
      </div>
    </div>
  );
};

export default MentorSubmission;
