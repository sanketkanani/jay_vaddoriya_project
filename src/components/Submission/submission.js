import axios from "axios";
import Dayjs from "dayjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useCookie } from "react-use";
import Swal from "sweetalert2";
// import { ApiBaseURL } from "../ApiConfig";
import Note from "../Practice/Note";
import { SearchResultContext } from "./SearchResultContext ";
import "./submission.css";
import { ApiBaseURL } from "../../services/config/Endpoints";
const Submission = () => {
  const { searchResults } = useContext(SearchResultContext);
  const [tableData, setTableData] = useState([]);
  // console.log("search", searchResults);
  const [submitErrorMessage, setSubmitErrorMessage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const [fileSubmitted, setFileSubmitted] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [paused, setPaused] = useState(false);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fileAdded, setFileAdded] = useState(false);
  const [droppedFile, setDroppedFile] = useState(false);
  console.log(droppedFile);
  const [weekData, setWeekData] = useState([]);
  const [showSelectAll, setShowSelectAll] = useState(true);
  const [itemsPerPage] = useState(5);
  const [activeCourse, setActiveCourse] = useState(null);
  const [showSyllabus, setShowSyllabus] = useState(true);
  const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isDoneDisabled, setIsDoneDisabled] = useState(true);
  const [loggedIn] = useCookie("maang");
  const [showModal, setShowModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicsForSelectedWeek, setTopicsForSelectedWeek] = useState([]);
  const [fileSubmittedSuccess, setFileSubmittedSuccess] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [projectData, setProjectData] = useState([]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState('');

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files).map((file, index) => ({
      id: file.name + index,
      label: file.name,
      size: file.size,
      file: file,
      isChecked: true,
      url: URL.createObjectURL(file),
      selectedProject: selectedProject,
    }));
    setCheckboxes((prevCheckboxes) => [...prevCheckboxes, ...selectedFiles]);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    if (event.target.files.length > 0) {
      setFileAdded(true);
    } else {
      setFileAdded(false);
    }
    if (files.length > 0) {
      setFileAdded(true);
      setShowSelectAll(true);
    }
  };

  useEffect(() => {
    const currentRoute = window.location.pathname;
    if (currentRoute === "/student/submission") {
      setShowCourseModal(true);
    }
  }, []);

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

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // setDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const selectedFiles = droppedFiles.map((file, index) => ({
      id: file.name + index,
      label: file.name,
      size: file.size,
      file: file,
      isChecked: true,
      url: URL.createObjectURL(file),
      selectedProject: selectedProject,
    }));

    setDroppedFile(droppedFiles);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setCheckboxes((prevCheckboxes) => [...prevCheckboxes, ...selectedFiles]);

    setShowModal(true);
    setFileAdded(droppedFiles.length > 0);

    if (droppedFiles.length > 0) {
      setFileAdded(true);
    } else {
      setFileAdded(false);
    }

    setFileAdded(true);
  };

  const handleWeekSelect = (week) => {
    const topicsForSelected = projectData[selectedWeek];
    const isDisabled = !selectedWeek || !selectedTopic;
    setSelectedWeek(week);
    setTopicsForSelectedWeek(topicsForSelected);
    setIsDoneDisabled(isDisabled);
  };

  const handleSelectProjectCourse = async (selectedprojectId) => {
    const selectedProjectObject = projectData.find(
      (project) => project.project_id.toString() === selectedprojectId
    );
    setSelectedProject(selectedProjectObject);
    setSelectedProjectId(selectedProjectObject?.project_id);
    setSelectedTopicId(selectedProjectObject?.topic_id);
  }

  useEffect(() => {
    if (selectedWeek && projectData[selectedWeek]) {
      setTopicsForSelectedWeek(projectData[selectedWeek]);
      setIsDoneDisabled(!selectedWeek || !selectedTopic);
    }
  }, [selectedWeek, projectData, selectedTopic]);



  useEffect(() => {
    if (loggedIn) {
      const { token } = JSON.parse(loggedIn);
      // console.log("token", token);

      const fetchCoursesAndWeekData = async () => {
        try {
          const courseResponse = await fetch(
            `${ApiBaseURL}test-management/std-all-courese`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

          if (!courseResponse.ok) {
            throw new Error("Failed to fetch courses");
          }

          const courseData = await courseResponse.json();
          const fetchedCourses = courseData.Main_Course;
          handleCourseClick(fetchedCourses[0]?.id, fetchedCourses[0]?.name)
          setCourses(fetchedCourses);
          // console.log("token", token);
          if (courseId) {
            const weekResponse = await fetch(
              `${ApiBaseURL}test-management/upload-task-for-user/?course_id=${courseId}`,
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );

            if (!weekResponse.ok) {
              throw new Error("Failed to fetch week data");
            }

            const weekDataResponse = await weekResponse.json();
            // console.log("week", weekDataResponse);
            const fetchedWeekData = weekDataResponse.main_data;
            // console.log("week", fetchedWeekData);
            setWeekData(fetchedWeekData);
            console.log(weekData);
          }
        } catch (error) {
          // console.error("Error fetching data:", error);
        }
      };

      fetchCoursesAndWeekData();
    }
  }, [loggedIn, courseId]);




  const fetchProjectData = async () => {
    const { token } = JSON.parse(loggedIn);
    const response = await fetch(
      `${ApiBaseURL}test-management/stud-submission-topic/?course_id=${courseId}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    const fetchProjectData = await response.json();
    if (fetchProjectData?.status === 200) {
      setProjectData(fetchProjectData?.main_data);
    }
  }




  useEffect(() => {
    fetchProjectData();
  }, [courseId, loggedIn])






  useEffect(() => {
    if (loggedIn && courseId) {
      const { token } = JSON.parse(loggedIn);

      const fetchWeekData = async () => {
        try {
          const weekResponse = await fetch(
            `${ApiBaseURL}test-management/upload-task-for-user/?course_id=${courseId}`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

          if (!weekResponse.ok) {
            throw new Error("Failed to fetch week data");
          }

          const weekDataResponse = await weekResponse.json();
          const fetchedWeekData = weekDataResponse.main_data;
          setWeekData(fetchedWeekData);
        } catch (error) {
          // console.error("Error fetching week data:", error);
        }
      };

      fetchWeekData();
    }
  }, [loggedIn, courseId]);

  const [pdfLink, setPdfLink] = useState("");

  const handleCourseClick = async (courseId, courseName) => {
    setCourseId(courseId);
    setActiveCourse(courseId);
    setShowSyllabus(false);
    setSelectedCourseName(courseName);

    if (loggedIn) {
      try {
        const response = await axios.get(
          `${ApiBaseURL}test-management/view-upload-task/?course_id=${courseId}`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );

        setUploadedFile(response.data);
        setTableData(response.data.results);

        if (response.data.results.length > 0) {
          setPdfLink(response.data.results[0].file);
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    }
  };

  const handleCheckboxChange = (event, checkboxId) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === checkboxId
        ? {
          ...checkbox,
          isChecked: event.target.checked,
        }
        : checkbox
    );
    setCheckboxes(updatedCheckboxes);
    setSelectAllChecked(
      updatedCheckboxes.every((checkbox) => checkbox.isChecked)
    );

    const anyCheckboxChecked = checkboxes.some(
      (checkbox) => checkbox.isChecked
    );

    setIsAnyCheckboxChecked(anyCheckboxChecked);
  };

  const handleSelectAllChange = (event) => {
    const updatedCheckboxes = checkboxes.map((checkbox) => ({
      ...checkbox,
      isChecked: event.target.checked,
    }));
    setCheckboxes(updatedCheckboxes);
    setSelectAllChecked(event.target.checked);
    setIsAnyCheckboxChecked(event.target.checked);
  };

  <input
    type="checkbox"
    checked={selectAllChecked}
    onChange={(event) => {
      setSelectAllChecked(event.target.checked);
      handleSelectAllChange(event);
    }}
  />;

  const handleAddFilesClick = () => {
    setShowModal(true);
  };
  const handleAddFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const isSubmitEnabled =
    isAnyCheckboxChecked || checkboxes.some((checkbox) => checkbox.isChecked);

  const handleClose = () => {
    setShowCourseModal(false);
  };

  const handleDoneClick = () => {
    if (selectedProject && files.length > 0) {
      setShowModal(false);
    } else if (files.length === 0) {
      Swal.fire({ text: 'Please select at least one file.', confirmButtonColor: 'rgb(20,184,166)', })
    } else {
      Swal.fire({ text: 'Please select both project and topic.', confirmButtonColor: 'rgb(20,184,166)', })
    }
    handleStartUpload();
    setFileSubmitted(false);
  };


  const handleStartUpload = async () => {
    if (!uploading) {
      setUploading(true);
      setUploadProgress(0);

      const selectedFiles = checkboxes.filter((checkbox) => checkbox.isChecked);

      selectedFiles.map((file) => {
        return new Promise((resolve) => {
          let currentProgress = 0;
          const fileUploadTimer = setInterval(() => {
            setUploadProgress((prevProgress) => {
              if (prevProgress >= 100) {
                clearInterval(fileUploadTimer);
                resolve(file.id);
                return 100;
              }
              currentProgress = Math.min(currentProgress + 10, 100);
              return currentProgress;
            });
          }, 500);

          setTimeout(() => {
            clearInterval(fileUploadTimer);
            if (currentProgress === 100) {
              const updatedCheckboxes = checkboxes.map((cb) =>
                cb.id === file.id ? { ...cb, isChecked: true } : cb
              );
              setCheckboxes(updatedCheckboxes);
            }
          }, 3000);
        });
      });

      Promise.all(selectedFiles.map((file) => file.id)).then(
        (completedFileIds) => {
          const updatedCheckboxes = checkboxes.map((checkbox) =>
            completedFileIds.includes(checkbox.id) && checkbox.isChecked
              ? { ...checkbox, uploadCompleted: true }
              : checkbox
          );
          setCheckboxes(updatedCheckboxes);

          const allFilesUploaded = updatedCheckboxes.every(
            (cb) => cb.isChecked && cb.uploadCompleted
          );
          if (allFilesUploaded) {
            setUploading(false);
          }
        }
      );
    }
  };


  const handleFileSubmit = async () => {
    if (loggedIn) {
      if (selectedProject) {
        try {
          const formData = new FormData();
          formData.append("course_id", courseId);
          const selectedFiles = checkboxes.filter(
            (checkbox) => checkbox.isChecked
          );
          // console.log(" ******** selected files data ********* ", selectedFiles);
          // if (
          //   selectedFiles.some(
          //     (file) => file.selectedProject == null || file.id == null
          //   )
          // ) {
          //   alert(
          //     "Some files couldn't be uploaded. Please check your selections."
          //   );
          //   return;
          // }

          selectedFiles.forEach((file, index) => {
            formData.append(`file_${index + 1}`, file.file, file.label);
          });
          formData.append("project_topics_id", selectedTopicId);
          formData.append("submited_project_id", selectedProjectId);
          formData.append("counter", selectedFiles.length);


          const response = await axios.post(
            `${ApiBaseURL}test-management/upload-task-for-user/`,
            formData,
            {
              headers: {
                Authorization: `Token ${JSON.parse(loggedIn).token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (fileSubmittedSuccess) {
            setShowSelectAll(false);
          } else {
            setShowSelectAll(true);
          }

          setFileSubmittedSuccess(true);
          setShowSelectAll(false);

          setSelectAllChecked(false);
          setSelectedProject(null);
          setFiles([]);
          setSelectAllChecked(false);
          setCheckboxes([]);

          // console.log("File upload successful:", response.data);

          const updatedResponse = await axios.get(
            `${ApiBaseURL}test-management/view-upload-task/?course_id=${courseId}&page=1`,
            {
              headers: {
                Authorization: `Token ${JSON.parse(loggedIn).token}`,
              },
            }
          );

          setUploadedFile(updatedResponse.data);
          setTableData(updatedResponse.data.results);

          if (updatedResponse.data.results.length > 0) {
            setPdfLink(updatedResponse.data.results[0].file);
          }

          setFileSubmittedSuccess(true);
          setFileSubmitted(true);

          const updatedCheckboxes = checkboxes.filter(
            (checkbox) => !selectedFiles.includes(checkbox)
          );

          setCheckboxes(updatedCheckboxes);

          setTimeout(() => {
            setFileSubmittedSuccess(false);
          }, 2000);
        } catch (error) {
          // console.error("Error uploading file:", error);
        }
      } else {
        alert("Please select both week and topic before submitting.");
      }
    }
  };

  const handleCancelUpload = () => {
    setPaused(true);
    setUploading(false);
    setUploadProgress(0);
  };

  const handleDeleteFiles = () => {
    const updatedFiles = files.filter((file) => {
      setFileSubmitted(true);
      const checkbox = checkboxes.find((checkbox) => checkbox.id === file.id);
      return checkbox && !checkbox.isChecked;
    });

    const updatedCheckboxes = checkboxes.filter(
      (checkbox) => !checkbox.isChecked
    );

    setFiles(updatedFiles);
    setCheckboxes(updatedCheckboxes);
  };

  const handleDownloadFiles = () => {
    const selectedFiles = checkboxes.filter((checkbox) => checkbox.isChecked);

    selectedFiles.forEach((file) => {
      const fileURL = file.url;
      const downloadLink = document.createElement("a");
      downloadLink.href = fileURL;
      downloadLink.setAttribute("download", file.label);
      downloadLink.click();
    });
  };

  const handleCancelUploadIndividual = (checkboxId) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === checkboxId && checkbox.uploadCompleted
        ? { ...checkbox, isChecked: false }
        : checkbox
    );
    setCheckboxes(updatedCheckboxes);
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case "Passed":
        return "bg-emerald-400 text-white";
      case "Failed":
        return "bg-red-400 text-white";
      case "Submitted":
        return "bg-sky-new-400 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap -mx-3 gap-y-4">
        <div className="xl:w-[calc(100%-320px)] lg:w-[calc(100%-260px)] w-full px-3">
          <div className="flex flex-wrap gap-3 p-2 text-left">
            {courses.map((course) => (
              <div className="bg-[#E0F6F4] rounded-[30px] mb-4 p-2">
                <button
                key={course.id}
                className={`px-5 py-2.5 text-base font-medium rounded-[25px] justify-center items-center bg-white gap-2.5 inline-flex ${activeCourse === course.id
                  ? "bg-gradient-to-l from-teal-400 to-sky-400 text-white"
                  : "bg-sky-200 hover:bg-sky-300 text-sky-800"
                  }`}
                onClick={() => handleCourseClick(course.id, course.name)}
              >
                {course.name}
              </button>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-2xl shadow-[0px_5px_25px_0px_rgba(59,154,168,0.15)] bg-white">
            <h2 className="text-gray-600 text-xl font-semibold font-['Outfit'] text-left mb-2">
              Upload File
            </h2>
            <div className="flex flex-wrap -mx-2 gap-y-4">
              <div
                className={`file-drop-area ${dragging ? "dragging" : ""
                  } md:w-[calc(100%-220px)] w-full px-2`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div class="flex items-center justify-center w-full h-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full p-3 bg-white rounded-[10px] border-2 border-dashed border-slate-400"
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <button
                        onClick={handleAddFilesClick}
                        className="w-[60px] h-[60px] bg-sky-500 bg-opacity-20 rounded-full flex justify-center items-center"
                      >
                        <img src="/images/upload.svg" alt="" />
                      </button>
                      <div class="mb-2 text-center text-gray-600 text-lg font-medium">
                        Drag & Drop files here
                      </div>
                      <span>OR</span>
                      <button
                        onClick={handleAddFilesClick}
                        className="mt-2 h-10 px-5 py-2.5 bg-emerald-400 bg-opacity-10 rounded-[10px] justify-center items-center gap-2.5 inline-flex text-center text-emerald-400 text-base font-medium"
                      >
                        Select File
                      </button>
                      <input
                        id="fileInput"
                        ref={fileInputRef}
                        type="file"
                        onChange={(event) => handleFileChange(event)}
                        multiple
                        style={{ display: "none" }}
                      />
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" />
                  </label>
                </div>
              </div>
              <div className="information md:w-[220px] w-full px-2">
                <div className="p-3 bg-slate-50 rounded-[10px] border-2 border-slate-300 h-full text-left">
                  <p className="flex items-start gap-1"><span>1.</span> You can upload only .PDF files</p>
                  <br></br>
                  <p className="flex items-start gap-1"><span>2.</span>The size of the PDF’s file must be less than 10 mb</p>
                  <br></br>
                  <p className="flex items-start gap-1"><span>2.</span>Select the file and click upload button.</p>
                </div>
              </div>
            </div>
            <div>
              <div className="my-3 flex flex-wrap items-center gap-2">
                {!fileSubmittedSuccess && showSelectAll && fileAdded && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={fileAdded && selectAllChecked}
                      onChange={(event) => {
                        setSelectAllChecked(event.target.checked);
                        handleSelectAllChange(event);
                      }}
                      className="rounded h-4 w-4 bg-transparent
          focus:ring-0 focus:ring-offset-0 checked:bg-green-400
          border-slate-300 border"
                    />
                    <label className="ms-1 text-gray-600 text-sm font-medium">
                      Select All
                    </label>
                  </div>
                )}

                <button
                  className="download px-[15px] py-2.5 bg-emerald-400 bg-opacity-20 rounded-[5px] justify-start items-center gap-2.5 inline-flex text-emerald-400 text-sm font-normal"
                  onClick={handleDownloadFiles}
                >
                  <i className="bx bx-download bx-sm"></i> Download
                </button>
                <button
                  className="add-files px-[15px] py-2.5 bg-sky-400 bg-opacity-20 rounded-[5px] justify-start items-center gap-2.5 inline-flex text-sky-400 text-sm font-normal"
                  onClick={handleAddFilesClick}
                >
                  <i className="bx bx-plus bx-sm"></i> Add Files
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      handleFileChange(event);
                    }}
                    multiple
                  />
                </button>

                {/* <button
                  className="upload px-[15px] py-2.5 bg-sky-500 bg-opacity-20 rounded-[5px] justify-start items-center gap-1.5 inline-flex text-sky-500 text-sm font-normal"
                  onClick={handleStartUpload}
                >
                  <i className="bx bx-upload bx-sm"></i> Start Upload
                </button> */}

                <button
                  className="cancel px-[15px] py-2.5 bg-amber-500 bg-opacity-20 rounded-[5px] justify-start items-center inline-flex text-amber-500 text-sm font-normal"
                  onClick={handleCancelUpload}
                >
                  <i className="bx bx-x bx-sm"></i> Cancel Upload
                </button>
                {"      "}
                <button
                  className="delete px-[15px] py-2.5 bg-rose-600 bg-opacity-20 rounded-[5px] justify-start items-center gap-1.5 inline-flex text-rose-600 text-sm font-normal"
                  onClick={handleDeleteFiles}
                >
                  <i class="bx bx-trash bx-sm"></i> Delete
                </button>
              </div>

              <div className="max-h-[420px] overflow-y-auto ">
                {checkboxes.map((checkbox) => (
                  <div className="p-2 bg-[#F8FFFD] rounded-[10px] border border-[#C5D8DB] mb-3">
                    <div
                      key={checkbox.id}
                      className="checkbox-container flex flex-wrap items-center gap-3"
                    >
                      <input
                        type="checkbox"
                        checked={checkbox.isChecked}
                        onChange={(event) =>
                          handleCheckboxChange(event, checkbox.id)
                        }
                        className="rounded h-4 w-4 bg-transparent
                      focus:ring-0 focus:ring-offset-0 checked:bg-green-400
                      border-slate-300 border"
                      />{" "}
                      <div className="flex items-center 2xl:w-[400px] w-40 ">
                        <div className="w-11 h-11 bg-white rounded-[5px] shadow border border-slate-300 flex justify-center items-center">
                          <img src="/images/pdf-icon.svg" />
                        </div>
                        <div className="w-[calc(100%-2.75rem)] ms-2 text-gray-600 text-sm font-medium text-ellipsis truncate ...">
                          {checkbox.label}
                        </div>
                      </div>
                      <div className="file-size text-gray-600 text-sm font-medium ms-auto whitespace-nowrap">
                        {(checkbox.size / 1024).toFixed(2)} KB
                      </div>
                      <div className="flex items-center">
                        {checkbox.isChecked && uploading && (
                          <div class="h-2 xl:w-48 md:w-24 w-20 rounded-full bg-[#35C69D1A]">
                            <div
                              className="upload-progress-inner h-2 rounded-full bg-emerald-400 w-[60%]"
                              style={{ width: `${uploadProgress}%` }}
                            >
                              {" "}
                            </div>
                            <div className="text-sm font-medium text-gray-600 text-center">
                              {uploadProgress}%
                            </div>
                          </div>
                        )}
                      </div>
                      {uploadProgress === 100 && checkbox.uploadCompleted && (
                        <p className="text-green-600 font-medium">
                          Uploaded file
                        </p>
                      )}
                      {uploadProgress < 100 && (
                        <button
                          className={`px-3 py-[7px] bg-opacity-20 rounded-[5px] justify-center items-center gap-2.5 inline-flex text-sm font-normal duration-150 sm:ms-2 ms-auto whitespace-nowrap ${checkbox.uploadCompleted && checkbox.isChecked
                            ? "bg-red-600 text-white"
                            : "bg-amber-500 text-amber-500"
                            }`}
                          onClick={() =>
                            handleCancelUploadIndividual(checkbox.id)
                          }
                          disabled={uploadProgress === 100}
                        >
                          {checkbox.uploadCompleted && checkbox.isChecked
                            ? "Uploaded"
                            : "Cancel Upload"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {fileSubmittedSuccess && (
                  <div className="success-message text-green-400 text-center mb-2">
                    File submitted successfully!
                  </div>
                )}
                <div>
                  {submitErrorMessage && (
                    <div className="text-red-500 mb-2">
                      {submitErrorMessage}
                    </div>
                  )}
                  {!fileSubmitted &&
                    fileAdded &&
                    checkboxes.some((checkbox) => checkbox.isChecked) &&
                    isSubmitEnabled &&
                    projectData &&
                    projectData.length > 0 && (
                      <div className="text-center mb-3">
                        <button
                          className="upload px-[15px] py-2.5 bg-teal-500 text-white rounded-[5px] justify-start items-center gap-1.5 inline-flex text-green-500 text-sm font-normal"
                          onClick={handleFileSubmit}
                          disabled={
                            !checkboxes.some((checkbox) => checkbox.isChecked)
                          }
                        >
                          <i className="bx bxs-send"></i>Submit
                        </button>
                      </div>
                    )}

                  {!fileSubmitted &&
                    fileAdded &&
                    (!projectData ||
                      projectData.length <= 0 ||
                      !checkboxes.some((checkbox) => checkbox.isChecked) ||
                      !isSubmitEnabled) && (
                      <div className="text-center mb-3 text-red-500">
                        {!projectData || projectData.length <= 0 ? (
                          <p>Error: File id not found . Select again</p>
                        ) : null}
                      </div>
                    )}
                </div>

                <div className="overflow-x-auto mb-3">
                  {searchResults && searchResults.data ? (
                    <table className="w-full border-collapse border-slate-400 mb-3">
                      <thead>
                        <tr>
                          <th className="p-3 text-start bg-pink-100 border-slate-300 text-sm font-semibold text-gray-600 rounded-l-md">
                            Sl.No
                          </th>
                          <th className="p-3 text-start bg-pink-100 border-slate-300 text-sm font-semibold text-gray-600">
                            File Name
                          </th>
                          <th className="p-3 text-start bg-pink-100 border-slate-300 text-sm font-semibold text-gray-600">
                            Week
                          </th>
                          <th className="p-3 text-start bg-pink-100 border-slate-300 text-sm font-semibold text-gray-600">
                            Topic
                          </th>
                          <th className="p-3 text-start bg-pink-100 border-slate-300 text-sm font-semibold text-gray-600">
                            Batch
                          </th>

                          <th className="p-3 text-start bg-pink-100 border-slate-300 text-sm font-semibold text-gray-600 ">
                            Uploaded Date & Time
                          </th>
                          <th className="p-3 text-start bg-pink-100 border-slate-300 text-sm font-semibold text-gray-600 rounded-r-md">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.data.map((result, index) => (
                          <tr
                            key={result.id}
                            className="border-b border-gray-200 hover:bg-slate-100 text-sm font-medium text-gray-600 rounded-md"
                          >
                            <td className="p-3 border-slate-300">
                              {index + 1}
                            </td>

                            <td className="p-3 border-slate-300 w-52">
                              <div className="flex items-center">
                                <div className="w-11 h-11 bg-white rounded-[5px] shadow border border-slate-300 flex justify-center items-center">
                                  <img
                                    src="/images/pdf-icon.svg"
                                    alt="pdf icon"
                                  />
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
                              </div>
                            </td>
                            <td className="p-3 border-slate-300 text-sm font-medium text-gray-600">
                              {result.week}
                            </td>
                            <td className="px-3 py-2 border-slate-300 text-sm font-medium text-gray-600">
                              {result.course_submission_topic}
                            </td>
                            <td className="p-3 border-slate-300 text-sm font-medium text-gray-600">
                              {result.batch_id}
                            </td>

                            <td className="p-3 border-slate-300 text-sm font-medium text-gray-600">
                              {result.created_at
                                ? `${Dayjs(result.created_at).format(
                                  "D MMM YYYY"
                                )}, ${Dayjs(result.created_at).format(
                                  "h:mm A"
                                )}`
                                : "Date not available"}
                            </td>
                            <td>
                              <span
                                className={`px-3 py-1 rounded-2xl w-24 text-center inline-block ${getStatusColorClass(
                                  result.status
                                )}`}
                              >
                                {" "}
                                {result.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="mb-3">
                      {tableData && tableData.length === 0 ? (
                        <p>No files uploaded yet</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border-slate-400 mb-3">
                            <thead>
                              <tr>
                                <th className="px-3 py-2 text-start bg-[#F8FFFD] text-sm font-semibold text-gray-600 rounded-l-md">
                                  Sl.No
                                </th>
                                <th className="px-3 py-2 text-start bg-[#F8FFFD] text-sm font-semibold text-gray-600">
                                  File Name
                                </th>
                                <th className="px-3 py-2 text-start bg-[#F8FFFD] text-sm font-semibold text-gray-600">
                                  Project
                                </th>
                                <th className="px-3 py-2 text-start bg-[#F8FFFD] text-sm font-semibold text-gray-600">
                                  Topic
                                </th>
                                {/* <th className="px-3 py-2 text-start bg-[#F8FFFD] text-sm font-semibold text-gray-600">
                                  Batch
                                </th> */}

                                <th className="px-3 py-2 text-start bg-[#F8FFFD] text-sm font-semibold text-gray-600 rounded-r-md">
                                  Uploaded Date & Time
                                </th>
                                <th className="px-3 py-2 text-start bg-[#F8FFFD] text-sm font-semibold text-gray-600">
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {tableData
                                .slice()
                                .reverse()
                                .map((data, index) => (
                                  <tr
                                    key={data.id}
                                    className="border-b border-gray-200 hover:bg-slate-100 text-sm font-medium text-gray-600 rounded-md"
                                  >
                                    <td className="px-3 py-2 border-slate-300">
                                      {index + 1}
                                    </td>
                                    <td className="px-3 py-2 border-slate-300 w-52">
                                      <div className="flex items-center">
                                        <div className="w-11 h-11 bg-white rounded-[5px] shadow border border-slate-300 flex justify-center items-center">
                                          <img
                                            src="/images/pdf-icon.svg"
                                            alt="pdf icon"
                                          />
                                        </div>
                                        <a
                                          href={data.file}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="ms-1 text-till-500 block hover:underline w-48 text-ellipsis truncate ..."
                                        >
                                          {data.file
                                            ? data.file.split("/").pop()
                                            : "File name not available"}
                                        </a>
                                      </div>
                                    </td>
                                    <td className="px-3 py-2 border-slate-300 text-sm font-medium text-gray-600">
                                      {data.project}
                                    </td>
                                    <td className="px-3 py-2 border-slate-300 text-sm font-medium text-gray-600">
                                      {data.topic}
                                    </td>
                                    {/* <td className="px-3 py-2 border-slate-300 text-sm font-medium text-gray-600">
                                      {data.batch}
                                    </td> */}

                                    <td className="px-3 py-2 border-slate-300 text-sm font-medium text-gray-600">
                                      {data.created_at
                                        ? `${Dayjs(data.created_at).format(
                                          "D MMM YYYY"
                                        )}, ${Dayjs(data.created_at).format(
                                          "h:mm A"
                                        )}`
                                        : "Date not available"}
                                    </td>
                                    <td>
                                      <span
                                        className={`px-3 py-1 rounded-2xl w-24 text-center inline-block ${getStatusColorClass(
                                          data.status
                                        )}`}
                                      >
                                        {" "}
                                        {data.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:w-[320px] lg:w-[260px] w-full px-3 right-side-section">
          <Note courseInfoName={selectedCourseName} courseId={courseId} />
        </div>
      </div>
      {showModal && (
        <Modal
          isOpen={showModal}
          onRequestClose={() => {
            setSelectedProject(null);
            setFiles([]);
            setSelectAllChecked(false);
            setCheckboxes([]);
            setShowModal(false);
          }}
          className="w-[600px] absolute left-[50%] top-[50%]  translate-x-[-50%] translate-y-[-50%] bg-white p-5 rounded-lg shadow-lg "
        >
          <div>
            <h3 className="justify-center items-center text-teal-500 text-lg font-bold">
              <i class="bx bx-book-reader"></i> Selected Course : {"    "}
              {selectedCourseName}
            </h3>
            <h4 className=" py-2.5 text-base font-medium  justify-center items-center">
              Select Project and Topic Before Selecting Files :
            </h4>
            <div className="flex items-center gap-x-2 ">
              <select
                onChange={(e) => handleSelectProjectCourse(e.target.value)}
                className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              // value={selectedWeek}
              >
                <option value="">--Select Project & Topic--</option>

                {projectData.map((project) => (
                  <option key={project.project_id} value={project.project_id}>
                    Project {project.project_name}-{project.topic_name}
                  </option>
                ))}
              </select>
             {!dragging && <div
                className={`file-drop-area ${dragging ? "dragging" : ""
                  } md:w-[calc(100%-220px)] w-full px-2`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <button
                  className="add-files px-[15px] py-2.5 bg-sky-400 bg-opacity-20 rounded-[5px] justify-start items-center gap-1 inline-flex text-sky-400 text-sm font-normal whitespace-nowrap"
                  onClick={handleAddFiles}
                >
                  <i className="bx bx-plus bx-sm"></i> Add Files
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      handleFileChange(event);
                    }}
                    multiple
                  />
                </button>
              </div>}
              <button
                onClick={handleDoneClick}
                className="upload px-[15px] py-3  bg-teal-500 text-white rounded-[5px] justify-start items-center gap-1.5 inline-flex text-sm font-normal "
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
      )}

      
      {showCourseModal && (
        <Modal
          isOpen={showCourseModal}
          className={`sm:w-[360px] w-[300px] p-5 rounded-lg bg-white absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4`}
        >
          <div className="text-center">
            <h2 className="text-teal-500 text-lg leading-6 font-bold">
              Select The Course Before Uploading Your Files
            </h2>

            <div>
              <img className="inline" src="/images/sidebarsvgs/images.jpg" />
            </div>

            <button
              onClick={handleClose}
              className="bg-teal-500 hover:bg-teal-700 text-base text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              OK
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Submission;
