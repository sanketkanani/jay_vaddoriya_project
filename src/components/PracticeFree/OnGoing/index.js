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
import blueSteps from "../../../assets/svg/blue-steps.svg";

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
  const [clickedItems, setClickedItems] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [activeTag, setActiveTag] = useState("Problem");
  const [selectedTitle, setSelectedTitle] = useState("");

  const navigate = useNavigate();

  const fetchFreeQuestionList = async () => {
    if (loggedIn) {
      const apiUrl = `${ApiBaseURL}free-course-management/practice-compiler-question-list/?syllabus_id=${sectionId}`;
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
          setQuestionList(data.data);
          setSelectedQuestion(data?.data[0]?.questions[0]);
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
          const url = `${blueSteps}`;
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
                    setIsClicked(false);
                    setActiveTag("Problem");
                    setIsRun("");
                    setConsolPanel(false);
                    setSubmitData({});
                  }}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    // boxShadow: "0px 5px 25px 0px #3e909c26",
                    boxShadow:step?.is_done ? "0px 5px 25px rgba(62, 144, 156, 0.15)" : "0px 5px 25px 0px #3e909c26",
                    backgroundColor: step?.is_done
                      ? "#35c69d1a"
                      : step.id === selectedQuestion.id
                      ? "steper-topic-active"
                      : "#ffffff",
                  }}
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
    // alert(selectedTopic);
    setSelectedTopic(selectedTopic);
  };

  const scroll = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    console.log("===== selected topic ====== ", selectedTopic);
  }, [selectedTopic]);

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
                  .find((item) => item.topic === selectedTopic)
                  .questions.map((topic) => (
                    <MenuItem key={topic.id} value={topic.ques_title}>
                      {topic.ques_title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
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
            clickedItems={clickedItems}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            setClickedItems={setClickedItems}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
            scroll={scroll}
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
            clickedItems={clickedItems}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            setClickedItems={setClickedItems}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
            scroll={scroll}
            fetchFreeQuestionList={fetchFreeQuestionList}
          />
        </div>
      </div>
    );
  }
};

export default OnGoing;
