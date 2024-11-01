import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./index.css";
import Card from "./card";
import CodeEditor from "./editor";
import { useState, useEffect, useContext } from "react";
import { useCookie } from "react-use";
import { mentorContext } from "../../Mentor/context";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "../../../pages/NotFound";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL } from "../../ApiConfig";

const OnGoing = ({ courseId, week, selectedQsId }) => {
  const [loggedIn] = useCookie("maang");
  const {
    selectedWeekIdForNavTeaching,
    setSelectedWeekIdForNavTeaching,
    selectedQsIdForTeaching,
    setSelectedQsIdForTeaching,
  } = useContext(mentorContext);
  const { pathname } = useLocation();
  const [list, setList] = useState([]);
  const [day, setDay] = useState({
    day1: ["String to Integer (atoi)"],
    day2: [],
    day3: [],
  });
  const [isRun, setIsRun] = useState("");
  const [selectedQs, setSelectedQs] = useState(parseInt(selectedQsId));
  const [problemId, setProblemId] = useState(null);
  const [compilerResult, setComplierresult] = useState({});
  const [activeTag, setActiveTag] = useState("problem");
  const [problemData, setProblemData] = useState({});
  const [tagDisable, setTagDisable] = useState(true);
  const [testCase, setTestCase] = useState([]);
  const [consolePanel, setConsolPanel] = useState(false);
  const [fakeData, setFakeData] = useState([]);
  const [clickedItems, setClickedItems] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

  useEffect(() => {
    // Extract the tab name from the URL
    const tab = pathname.split("/").pop();
    setActiveTag(tab);
  }, [pathname]);

  const handleChangeDay = (event) => {
    const selectedDay = event.target.value;
    setSelectedDay(selectedDay);
    setSelectedTitle("");
  };

  const handleChangeTitle = (event) => {
    const selectedTitle = event.target.value;
    setSelectedTitle(selectedTitle);

    // Find the corresponding question ID based on the selected title
    const selectedQuestion = list
      .find((item) => item.name === selectedDay)
      ?.topics.find((topic) => topic.title === selectedTitle);

    // Update selectedQs with the new question ID
    setSelectedQs(selectedQuestion?.q_id || null);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn) {
        // const apiUrl = `${ApiBaseURL}test-management/std-practice-question-all/?course_id=${courseId}&week_id=${week}`;
        const apiUrl = `${ApiBaseURL}mentor-management/inst-practice-question-all/?course_id=${courseId}&week_id=${week}`;
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
          // console.log("hola", data.main_data);
          if (data.main_data.length > 0) {
            const firstDay = data.main_data[0].name;
            setSelectedDay(firstDay);
            const defaultDay =
              data.main_data.find((item) => item.name === "day1") ||
              data.main_data[0];
            const firstTitle =
              defaultDay.topics.find((topic) => topic.isOnGoing)?.title || "";
            setSelectedTitle(firstTitle);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [loggedIn]);

  const Stepper = ({ steps }) => {
    // console.log(steps);
    return (
      <div className="stepper-box">
        {steps.map((step) => {
          const url = step.isOnGoing
            ? "/images/Practice/step-active.svg"
            : "/images/Practice/step.svg";
          // const activeClass = step.isOnGoing
          //   ? "steper-topic-active"
          //   : "steper-topic";
          const activeClass = step.que_status
            ? "submitAns"
            : "steper-topic-active";
          return (
            <div className="step-item">
              <div className="v-stepper">
                <div className="circle">
                  <img src={url} alt="steper" />
                </div>
                <div className="line"></div>
              </div>
              <div className="content">
                <a
                  // className={selectedQs === step?.q_id ? activeClass : ""}
                  className={
                    selectedQs === step?.q_id
                      ? activeClass
                      : step.que_status
                      ? "submitAns"
                      : ""
                  }
                  onClick={() => {
                    navigate(`/mentor/teaching/${step?.q_id}/problem`);
                    setTagDisable(true);
                  }}
                  href="javascript:void(0)"
                >
                  <span>{step.title}</span>
                </a>
              </div>
            </div>
          );
        })}
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

  const fetchData = async (url, onSuccess) => {
    try {
      const token = JSON.parse(loggedIn).token;
      const response = await fetch(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      onSuccess(data?.main_data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, show a message to the user, etc.
    }
  };

  useEffect(() => {
    const fetchFakeData = async () => {
      if (loggedIn) {
        // console.log("Qssss IDDDD", selectedQs);
        setSelectedQsIdForTeaching(selectedQs);
        setSelectedWeekIdForNavTeaching(week);
        const apiUrl = `${ApiBaseURL}mentor-management/inst-practice-question/?q_id=${selectedQs}`;
        fetchData(apiUrl, (data) => {
          setFakeData(data);
          setIsLoading(false);
        });
      }
    };

    fetchFakeData();
  }, [
    loggedIn,
    selectedWeekIdForNavTeaching,
    selectedQsIdForTeaching,
    selectedQs,
    week,
  ]);

  useEffect(() => {
    // console.log("problemData-------------------->", fakeData);
    // console.log("clciked ITEMSSSS-------------------->", clickedItems);
    // console.log("is clicked-------------------->", isClicked);
  }, [problemData, clickedItems, isClicked]);

  const fetchProblemData = async () => {
    if (loggedIn) {
      const apiUrl = `${ApiBaseURL}mentor-management/inst-practice-question/?q_id=${selectedQs}`;
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
        setProblemId(data?.main_data[0]?.problem_id);
        setProblemData(data?.main_data[0]);
        setTestCase(data?.main_data[0]?.test_case);
        // console.log("Question Data--->", data.main_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchProblemData();
  }, [loggedIn, selectedQs, setProblemId]);

  if (isLoading) {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  } else if (fakeData && fakeData.length === 0) {
    return <NotFound />;
  } else if (fakeData && fakeData.length > 0) {
    return (
      <div className="practice-ongoing p-5">
        <div className="left">
          {list &&
            list.length > 0 &&
            list.map((item) => {
              return (
                <div className="step-box">
                  <span className="step-title">{`DAY ${item.day}`}</span>
                  <Stepper steps={item.topics} />
                </div>
              );
            })}
        </div>
        {/* <div className="practice-count-down-for-mobile">
          <div className="count-down">
            <img src="/images/Practice/clock.svg" alt="header icon" />
            <span>1 : 20 : 48</span>
          </div>
        </div> */}
        <div className="practice-stepper-for-mobile-and-tablet">
          <FormControl sx={{ mb: 1, width: "100%" }}>
            <Select
              displayEmpty
              value={selectedDay}
              name="daySelect"
              className="practice-select"
              onChange={handleChangeDay}
              renderValue={(selected) =>
                selected
                  ? `Day ${list.find((item) => item.name === selected)?.day}`
                  : "Select Day"
              }
              sx={{ color: "black" }}
            >
              <MenuItem disabled value="">
                Select Day
              </MenuItem>
              {list.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {"Day " + item.day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedDay && (
            <FormControl sx={{ mb: 1, width: "100%" }}>
              <Select
                displayEmpty
                value={selectedTitle}
                name="titleSelect"
                className="practice-normal-select"
                onChange={handleChangeTitle}
                renderValue={(selected) =>
                  selected ? selected : "Select Title"
                }
              >
                <MenuItem disabled value="">
                  Select Title
                </MenuItem>
                {list
                  .find((item) => item.name === selectedDay)
                  ?.topics.filter((topic) => topic.isOnGoing)
                  .map((topic) => (
                    <MenuItem key={topic.q_id} value={topic.title}>
                      {topic.title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </div>

        <div className="right">
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
            testCase={testCase}
            setTestCase={setTestCase}
            setSelectedQs={setSelectedQs}
            consolePanel={consolePanel}
            setConsolPanel={setConsolPanel}
            key={selectedQs}
            setClickedItems={setClickedItems}
            setIsClicked={setIsClicked}
            clickedItems={clickedItems}
            isClicked={isClicked}
            fetchProblemData={fetchProblemData}
            setIsRun={setIsRun}
            isRun={isRun}
          />
        </div>
        <div className="editor-for-mobile-and-tablet sm:mx-0 -mx-5">
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
            testCase={testCase}
            setTestCase={setTestCase}
            problemData={problemData}
            setSelectedQs={setSelectedQs}
            consolePanel={consolePanel}
            setConsolPanel={setConsolPanel}
            clickedItems={clickedItems}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            fetchProblemData={fetchProblemData}
            setIsRun={setIsRun}
            isRun={isRun}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="practice-ongoing p-5">
        <div className="left">
          {list.map((item) => {
            return (
              <div className="step-box">
                <span className="step-title">{`DAY ${item.day}`}</span>
                <Stepper steps={item.topics} />
              </div>
            );
          })}
        </div>
        <div className="practice-stepper-for-mobile-and-tablet">
          {list.map((item, index) => {
            const value = day[item.name];
            const className = item.active === true ? "active-select" : "";
            return (
              <FormControl
                sx={{ mb: 1, width: "100%" }}
                className={className}
                key={item.day}
              >
                <Select
                  displayEmpty
                  value={value}
                  name={item.name}
                  className={
                    item.name === "day1"
                      ? "practice-select"
                      : "practice-normal-select"
                  }
                  onChange={handleChange}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return `Day ${item.day}`;
                    }

                    return selected.join(", ");
                  }}
                >
                  <MenuItem disabled value="">
                    {`Day ${item.day}`}
                  </MenuItem>
                  {item.topics.map(
                    (topic) =>
                      topic.isOnGoing && (
                        <MenuItem key={topic.q_id} value={topic.title}>
                          {topic.title}
                        </MenuItem>
                      )
                  )}
                </Select>
              </FormControl>
            );
          })}
        </div>
        <NotFound />
      </div>
    );
  }
};

export default OnGoing;
