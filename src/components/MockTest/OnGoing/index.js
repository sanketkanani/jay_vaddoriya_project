import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./index.css";
import Card from "./card";
import CodeEditor from "./editor";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useCookie } from "react-use";
import { studentContext } from "../../Student/context";
import Swal from "sweetalert2";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL } from "../../ApiConfig";

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

const OnGoing = ({ courseId, week }) => {
  const navigate = useNavigate();
  const [loggedIn] = useCookie("maang");
  const [list, setList] = useState([]);
  const [day, setDay] = useState({
    day1: ["String to Integer (atoi)"],
    day2: [],
    day3: [],
  });
  const [selectedQs, setSelectedQs] = useState(null);
  const [qsIdList, setQsIdList] = useState([]);
  const [problemId, setProblemId] = useState(null);
  const [compilerResult, setComplierresult] = useState({});
  const [activeTag, setActiveTag] = useState("Problem");
  const [problemData, setProblemData] = useState({});
  const [tagDisable, setTagDisable] = useState(true);
  const [timer, setTimer] = useState(1);
  const { screen, timerData, setScreen, setMockQsIdList, mockQsIdList } =
    useContext(studentContext);
  const { pathname } = useLocation();
  const [ques_data, setQuesData] = useState([]);
  const [consolePanel, setConsolPanel] = useState(false);
  const [testCase, setTestCase] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isPromptActive, setIsPromptActive] = useState(true);

  const handleChangeTopic = (event) => {
    const selectedTopicValue = event.target.value;
    setSelectedTopic(selectedTopicValue);

    // Find the question ID for the selected topic
    const selectedQsForTopic = list.find(
      (item) => item.topics.title === selectedTopicValue
    )?.topics.q_id;

    // Set the selected question ID for the selected topic
    setSelectedQs(selectedQsForTopic || 0);
  };

  // console.log("Screen Name is ---------------->", screen);

  const handleTimeout = () => {
    if (pathname === "/student/quiz" && screen === "quiz-week") {
      setScreen("quiz-result");
    } else if (pathname === "/student/mock-test" && screen === "start") {
      submitAll();
      setScreen("result-new");
    }
  };

  const CallTimerData = (timerData) => {
    if (timerData) {
      const convertedTime = convertTimeToSeconds(timerData);
      return isNaN(convertedTime) ? 0 : convertedTime;
    }
    return 0;
  };

  useEffect(() => {
    setTimer(CallTimerData(timerData));
  }, [timerData]);

  // useEffect(() => {
  //   if (timer === 0) {
  //     handleTimeout();
  //   }
  // }, [timer]);

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (loggedIn) {
  //       const apiUrl = `${ApiBaseURL}test-management/std-mock-question-all/?course_id=${courseId}&week_id=${week}`;
  //       const token = JSON.parse(loggedIn).token;

  //       try {
  //         const response = await fetch(apiUrl, {
  //           headers: {
  //             Authorization: `Token ${token}`,
  //           },
  //         });

  //         if (!response.ok) {
  //           throw new Error("Failed to fetch data");
  //         }
  //         const data = await response.json();
  //         setList(data.main_data);
  //         setSelectedQs(data?.main_data[0]?.id);
  //         // question id storing
  //         const qIds = data.main_data.map((item) => item.topics.q_id);
  //         setQsIdList(qIds);
  //         setMockQsIdList(qIds);
  //         console.log("ques_data-----=====================", qsIdList);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [loggedIn, courseId, week, setList, setSelectedQs, setQsIdList, setMockQsIdList]);

  const fetchData = async () => {
    if (loggedIn) {
      const apiUrl = `${ApiBaseURL}test-management/std-mock-question-all/?course_id=${courseId}&week_id=${week}`;
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
        setList(data.main_data);
        setSelectedQs(data?.main_data[0]?.id);
        const qIds = data.main_data.map((item) => item.topics.q_id);
        setQsIdList(qIds);
        setMockQsIdList(qIds);
        // console.log("ques_data-----=====================", qIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();
  }, [
    loggedIn,
    courseId,
    week,
    setList,
    setSelectedQs,
    setQsIdList,
    setMockQsIdList,
  ]);

  useEffect(() => {
    // console.log("mockQsIdList:", mockQsIdList);
  }, [mockQsIdList]);

  const Stepper = ({ steps }) => {
    // console.log("step", steps.que_status);
    const url = steps.isOnGoing
      ? "/images/Practice/step-active.svg"
      : "/images/Practice/step.svg";
    // const activeClass = steps.isOnGoing
    //   ? "steper-topic-active"
    //   : "steper-topic";
    // console.log(`Step ${steps.title} - que_status: ${steps.que_status}`);
    const activeClass = steps.que_status ? "submitAns" : "steper-topic-active";
    return (
      <div className="stepper-box">
        <div className="step-item">
          <div className="v-stepper">
            <div className="circle">
              <img src={url} alt="steper" />
            </div>
            <div className="line"></div>
          </div>
          <div className="content">
            <a
              className={
                selectedQs === steps.q_id
                  ? activeClass
                  : steps.que_status
                  ? "submitAns"
                  : ""
              }
              onClick={() => {
                setSelectedQs(steps.q_id);
                setActiveTag("Problem");
              }}
              href="javascript:void(0)"
            >
              <span>{steps.title}</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDay({
      ...day,
      [event.target.name]: typeof value === "string" ? value.split(",") : value,
    });
  };

  const submitAll = async () => {
    // console.log("calling");
    let data = {
      all_q_list: qsIdList,
    };
    fetch(`${ApiBaseURL}test-management/std-mock-question-submission-all/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${JSON.parse(loggedIn).token}`,
      },
      body: JSON.stringify(data),
      keepalive: true,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Data save!");
        setScreen("result-new");
      })
      .catch((error) => {
        console.error("Error submitting code:", error);
      });
  };

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      const confirmationMessage = "Are you sure you want to leave?";
      event.returnValue = confirmationMessage;

      if (window.confirm(confirmationMessage)) {
        await submitAll();
      }
      return confirmationMessage;
    };

    const handlePopState = () => {
      const confirmationMessage = "Are you sure you want to leave?";

      Swal.fire({
        title: "Confirm Exit",
        text: confirmationMessage,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, exit!",
        cancelButtonText: "No, stay!",
      }).then((result) => {
        if (result.isConfirmed) {
          submitAll();
        }
      });
    };

    const handleUnload = () => {
      submitAll();
    };

    const disableBackButton = () => {
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
        window.history.go(1);
      };
    };

    setTimeout(disableBackButton, 0);

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("unload", handleUnload);
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

  return (
    <div className="practice-ongoing p-5">
      <div className="left">
        {list.map((item) => {
          // console.log("ongoong-------->", item);
          return (
            <div className="step-box">
              <Stepper steps={item.topics} />
            </div>
          );
        })}
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
      <div className="count-down-mobile">
        <img src="/images/Practice/clock.svg" alt="header icon" />
        <span>
          {String(Math.floor(timer / 3600)).padStart(2, "0")} :{" "}
          {String(Math.floor((timer % 3600) / 60)).padStart(2, "0")} :{" "}
          {String(timer % 60).padStart(2, "0")}
        </span>
      </div>
      <div className="practice-stepper-for-mobile-and-tablet">
        <FormControl sx={{ mb: 1, width: "100%" }} md={{ mb: 1, width: "50%" }}>
          <Select
            displayEmpty
            value={selectedTopic}
            className="practice-select"
            onChange={handleChangeTopic}
            renderValue={(selected) => selected || "Choose a question"}
          >
            <MenuItem disabled value="">
              <em>Choose a question</em>
            </MenuItem>
            {list.length > 0 &&
              list.map((item) => (
                <MenuItem key={item.topics.q_id} value={item.topics.title}>
                  {item.topics.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <div className="testcase-action">
          <div className="right-action flex gap-5">
            <button
              className="btn-submit"
              onClick={() => {
                const options = {
                  title: "Confirm Submit",
                  text: "Are you sure you want to submit?",
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
            <button className="exit-btn !py-2 !px-4" onClick={handleExit}>
              <span>Exit</span>
            </button>
          </div>
        </div>
      </div>

      <div className="right">
        {selectedQs && (
          <Card
            selectedQs={selectedQs}
            problemId={problemId}
            setProblemId={setProblemId}
            setComplierresult={setComplierresult}
            compilerResult={compilerResult}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
            setProblemData={setProblemData}
            problemData={problemData}
            tagDisable={tagDisable}
            setTagDisable={setTagDisable}
            setQuesData={setQuesData}
            setSelectedQs={setSelectedQs}
            consolePanel={consolePanel}
            setConsolPanel={setConsolPanel}
            testCase={testCase}
            setTestCase={setTestCase}
            key={selectedQs}
            fetchData={fetchData}
          />
        )}
      </div>
      <div className="editor-for-mobile-and-tablet sm:mx-0 -mx-5">
        {selectedQs && (
          <CodeEditor
            selectedQs={selectedQs}
            key={selectedQs}
            problemId={problemId}
            setComplierresult={setComplierresult}
            compilerResult={compilerResult}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
            tagDisable={tagDisable}
            setTagDisable={setTagDisable}
            setQuesData={setQuesData}
            problemData={problemData}
            setSelectedQs={setSelectedQs}
            consolePanel={consolePanel}
            setConsolPanel={setConsolPanel}
            testCase={testCase}
            setTestCase={setTestCase}
            fetchData={fetchData}
          />
        )}
      </div>
    </div>
  );
};

export default OnGoing;
