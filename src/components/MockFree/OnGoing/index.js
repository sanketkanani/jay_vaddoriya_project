import React, { useState, useEffect, useContext } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./index.css";
import Card from "./card";
import CodeEditor from "./editor";
import { useCookie } from "react-use";
import { useNavigate } from "react-router-dom";
import NotFound from "../../../pages/NotFound";
import { ApiBaseURL } from "../../../services/config/Endpoints";
import { freeContext } from "../../free/context";
import FreeCard from "./freeCard";
import FreeEditor from "./freeEditor";
import Swal from "sweetalert2";

const convertTimeToSeconds = (timeString) => {
  if (typeof timeString !== "string") {
    console.error("Invalid timerData type. Expected string.");
    return 0;
  }
  const timeArray = timeString.split(":").map(Number);
  if (timeArray.length !== 3 || timeArray.some(isNaN)) {
    console.error("Invalid time format. Expected 'HH:MM:SS'.");
    return 0;
  }
  const [hours, minutes, seconds] = timeArray;
  return hours * 3600 + minutes * 60 + seconds;
};

const OnGoing = ({ sectionId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn] = useCookie("maang");
  const [questionList, setQuestionList] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [isRun, setIsRun] = useState("");
  const [consolePanel, setConsolPanel] = useState(false);
  const [submitData, setSubmitData] = useState({});
  const [topicIdNew, setTopicIdNew] = useState("");
  const [timer, setTimer] = useState(1);
  const {
    timerData,
    setTimerData,
    resultData,
    setResultData,
    screen,
    setScreen,
    qsIdList,
    setQsIdList,
    selectedCourseIdForMock,
  } = useContext(freeContext);
  const [activeTag, setActiveTag] = useState("Problem");
  const [clickedItems, setClickedItems] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");

  const navigate = useNavigate();

  const CallTimerData = (timerData) => {
    if (timerData) {
      const convertedTime = convertTimeToSeconds(timerData);
      return isNaN(convertedTime) ? 0 : convertedTime;
    }
    return 0;
  };

  useEffect(() => {
    setTimer(CallTimerData(timerData));
    setScreen("start-mock");
  }, [timerData]);

  useEffect(() => {
    let intervalId;

    const startTimer = () => {
      intervalId = setInterval(() => {
        if (timer === 0) {
          clearInterval(intervalId);
          handleTimeout();
        } else {
          setTimer((prevTimer) => prevTimer - 1);
        }
      }, 1000);
    };

    startTimer();
    return () => clearInterval(intervalId);
  }, [timer]);

  const handleTimeout = () => {
    console.log("submit");
  };

  function secondsToHms(seconds) {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const hh = h.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    const ss = s.toString().padStart(2, "0");

    return `${hh}:${mm}:${ss}`;
  }

  const fetchFreeQuestionList = async () => {
    if (loggedIn) {
      const apiUrl = `${ApiBaseURL}free-course-management/mock-compiler-question-list/?syllabus_id=${sectionId}`;
      const token = JSON.parse(loggedIn).token;
      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data?.status === 200) {
          setIsLoading(false);
          setTimerData(secondsToHms(data.time));
          // alert(secondsToHms(data.time));
          setQuestionList(data.data);
          setSelectedQuestion(data?.data[0]?.questions[0]);
          const qIds = data.data[0].questions.map((item) => item.id.toString());
          setQsIdList(qIds);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    if (sectionId) {
      fetchFreeQuestionList();
    }
  }, [loggedIn, sectionId]);

  const Stepper = ({ steps, topicId }) => {
    return (
      <div className="stepper-box">
        {steps.map((step) => {
          const url = "/images/Practice/step.svg";
          return (
            <div className="step-item" key={step.q_id}>
              <div className="v-stepper">
                <div className="circle">
                  <img src={url} alt="steper" />
                </div>
                <div className="line"></div>
              </div>
              <div className="content">
                <button
                  className={
                    step.id === selectedQuestion.id ? "steper-topic-active" : ""
                  }
                  onClick={() => {
                    setSelectedQuestion(step);
                    setTopicIdNew(topicId);
                    setActiveTag("Problem");
                    setIsRun("");
                    setConsolPanel(false);
                    setSubmitData({});
                  }}
                  style={{ backgroundColor: step?.is_done ? "#35c69d1a" : "" }}
                >
                  <span style={{ color: step?.is_done ? "#21c496" : "" }}>
                    {step.ques_title}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const handleChangeTopic = (event) => {
    const selectedTopic = event.target.value;
    setSelectedTopic(selectedTopic);
  };

  const submitAll = async () => {
    const syllabus_id = 1;
    const formData = new FormData();

    // Adding data to FormData
    formData.append("course_id", parseInt(selectedCourseIdForMock));
    formData.append("syllabus_id", sectionId);
    formData.append("ques_id_list", JSON.stringify(qsIdList));

    try {
      const response = await fetch(
        `${ApiBaseURL}free-course-management/submit-all-mock-question/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
          body: formData,
          keepalive: true,
        }
      );

      const data = await response.json();
      setResultData(data.data);
      console.log("Data save!");
      setScreen("");
      navigate("/free/mock-test/" + sectionId + "/Result", {
        state: { sectionId },
      });
    } catch (error) {
      console.error("Error submitting code:", error);
    }
  };

  useEffect(() => {
    // Handle browser back/forward button with SweetAlert
    const handlePopState = () => {
      Swal.fire({
        title: "Confirm Exit",
        text: "Are you sure you want to leave?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, exit!",
        cancelButtonText: "No, stay!",
      }).then((result) => {
        if (result.isConfirmed) {
          submitAll();
        } else {
          window.history.pushState(null, null, window.location.href); // Prevent navigation.
        }
      });
    };

    // Handle browser reload/close button with SweetAlert
    const handleBeforeUnload = (event) => {
      event.preventDefault();

      // Show a SweetAlert to simulate confirmation on reload
      Swal.fire({
        title: "Confirm Reload",
        text: "Are you sure you want to reload this page?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reload!",
        cancelButtonText: "No, stay!",
      }).then((result) => {
        if (result.isConfirmed) {
          submitAll(); // Call your submit function.
        }
      });

      // Required for older browsers (though the message will not be displayed)
      event.returnValue = "";
      return ""; // Necessary for modern browsers to show the confirmation.
    };

    // Disable back button initially and trigger SweetAlert
    const disableBackButton = () => {
      window.history.pushState(null, null, window.location.href); // Push state to history stack.
      window.onpopstate = function () {
        handlePopState(); // Handle custom back button behavior.
      };
    };

    // Initialize behavior
    setTimeout(disableBackButton, 0);

    // Add event listeners for reload and back/forward navigation
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.onpopstate = handlePopState; // Set popstate listener

    return () => {
      // Cleanup event listeners on component unmount
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.onpopstate = null; // Reset popstate handler
    };
  }, [submitAll]);

  const handleExit = () => {
    const options = {
      title: "Confirm Exit",
      text: "Are you sure you want to exit?",
      icon: "warning", // 'type' has been changed to 'icon' in SweetAlert2
      title: "Confirm Exit",
      text: "Are you sure you want to exit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, exit!",
      cancelButtonText: "No, stay!",
      reverseButtons: true,
      focusCancel: true,
    };
    Swal.fire(options).then((result) => {
      if (result.isConfirmed) {
        submitAll();
      }
    });
  };

  useEffect(() => {
    if (screen === "result") {
      submitAll();
    }
  }, [screen]);

  const scroll = () => {
    window.scrollTo(0, 0);
  };

  const handleChangeTitle = (event) => {
    const selectedTitle = event.target.value;
    setSelectedTitle(selectedTitle);

    // Find the corresponding question ID based on the selected title
    const selectedQuestion = questionList
      .find((item) => item.topic === selectedTopic)
      ?.questions.find((topic) => topic.ques_title === selectedTitle);
    console.log("======== selectedQuestion ====== ", selectedQuestion);
    setSelectedQuestion(selectedQuestion);
    setTopicIdNew(selectedQuestion?.id);
    setIsClicked(false);
    setActiveTag("Problem");
    setIsRun("");
    setConsolPanel(false);
    setSubmitData({});
  };

  if (isLoading) {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  } else if (questionList.length === 0) {
    return <NotFound />;
  } else {
    return (
      <div className="practice-ongoing p-5">
        <div className="left">
          {questionList.map((item) => (
            <div className="step-box" key={item.topic}>
              <span className="step-title">{`${item.topic}`}</span>
              <Stepper steps={item.questions} topicId={item.id} />
            </div>
          ))}
          <div className="testcase-action">
            <div className="right-action">
              <button
                className="btn-submit"
                onClick={() => {
                  const options = {
                    title: "Confirm Submit",
                    text: "Are you sure you want to submit?",
                    icon: "warning",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, submit!",
                    cancelButtonText: "No, stay!",
                    reverseButtons: true,
                    focusCancel: true,
                  };
                  Swal.fire(options).then((result) => {
                    if (result.isConfirmed) {
                      submitAll();
                    }
                  });
                }}
              >
                Finish Test
              </button>
              <button
                className="exit-btn !py-1.5 !px-4 !h-auto text-red-500 ms-1 hover:bg-red-400 hover:text-white duration-150"
                onClick={handleExit}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="practice-count-down-for-mobile">
          <div className="count-down">
            <img src="/images/Practice/clock.svg" alt="header icon" />
            <span>
              {String(Math.floor(timer / 3600)).padStart(2, "0")} :{" "}
              {String(Math.floor((timer % 3600) / 60)).padStart(2, "0")} :{" "}
              {String(timer % 60).padStart(2, "0")}
            </span>
          </div>
        </div>
        <div className="practice-stepper-for-mobile-and-tablet">
          <FormControl sx={{ mb: 1, width: "100%" }}>
            <Select
              displayEmpty
              value={selectedTopic}
              name="daySelect"
              className="practice-select"
              onChange={handleChangeTopic}
              renderValue={(selected) =>
                selected
                  ? `${
                      questionList.find((item) => item.topic === selected)
                        ?.topic
                    }`
                  : "Select Topic"
              }
              sx={{ color: "black" }}
            >
              <MenuItem disabled value="">
                Select Topic
              </MenuItem>
              {questionList.map((item) => (
                <MenuItem key={item.id} value={item.topic}>
                  {item.topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedTopic && (
            <FormControl sx={{ mb: 1, width: "100%" }}>
              <Select
                displayEmpty
                value={selectedTitle}
                name="titleSelect"
                className="practice-normal-select"
                onChange={handleChangeTitle}
                renderValue={(selected) =>
                  selected ? selected : "Select Problem"
                }
              >
                <MenuItem disabled value="">
                  Select Problem
                </MenuItem>
                {questionList
                  .find((item) => item.topic === selectedTopic).
                  questions.map((topic) => (
                    <MenuItem key={topic.id} value={topic.ques_title}>
                      {topic.ques_title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
          <div className="testcase-action">
            <div className="right-action">
              <button
                className="btn-submit"
                onClick={() => {
                  const options = {
                    title: "Confirm Submit",
                    text: "Are you sure you want to submit?",
                    icon: "warning",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, submit!",
                    cancelButtonText: "No, stay!",
                    reverseButtons: true,
                    focusCancel: true,
                  };
                  Swal.fire(options).then((result) => {
                    if (result.isConfirmed) {
                      submitAll();
                    }
                  });
                }}
              >
                Finish Test
              </button>
              <button
                className="exit-btn !py-1.5 !px-4 !h-auto text-red-500 ms-1 hover:bg-red-400 hover:text-white duration-150"
                onClick={handleExit}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
        <div className="right">
          <FreeCard
            selectedQs={selectedQuestion}
            isRun={isRun}
            setIsRun={setIsRun}
            consolePanel={consolePanel}
            setConsolPanel={setConsolPanel}
            sectionId={sectionId}
            submitData={submitData}
            setSubmitData={setSubmitData}
            topicId={topicIdNew}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
            scroll={scroll}
            clickedItems={clickedItems}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            setClickedItems={setClickedItems}
            fetchFreeQuestionList={fetchFreeQuestionList}
          />
        </div>
        <div className="editor-for-mobile-and-tablet sm:mx-0 -mx-5">
          <FreeEditor
            selectedQs={selectedQuestion}
            isRun={isRun}
            setIsRun={setIsRun}
            consolePanel={consolePanel}
            setConsolPanel={setConsolPanel}
            sectionId={sectionId}
            submitData={submitData}
            setSubmitData={setSubmitData}
            topicId={topicIdNew}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
            scroll={scroll}
            clickedItems={clickedItems}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            setClickedItems={setClickedItems}
            fetchFreeQuestionList={fetchFreeQuestionList}
          />
        </div>
      </div>
    );
  }
};

export default OnGoing;
