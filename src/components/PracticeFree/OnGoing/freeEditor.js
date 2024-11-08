import React, { useEffect, useRef, useState } from "react";
import { useCookie } from "react-use";
import { ApiBaseURL } from "../../../services/config/Endpoints";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/webpack-resolver";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const editorStyle = {
  height: "500px", // Set your desired height
  width: "100%", // Set your desired width
};
const FreeEditor = ({
  selectedQs,
  isRun,
  setIsRun,
  consolePanel,
  setConsolPanel,
  sectionId,
  submitData,
  setSubmitData,
  topicId,
  clickedItems,
  isClicked,
  setIsClicked,
  activeTag,
  setActiveTag,
  scroll,
  fetchFreeQuestionList,
}) => {
  const [compilerData, setCompilerData] = useState([]);
  const [loggedIn] = useCookie("maang");
  const [activeLanguage, setActiveLanguage] = React.useState("Javascript");
  const [codeValue, setCodeValue] = useState("");
  const [outputTab, setOutputTab] = React.useState("Testcase");
  const [testLoading, setTestLoading] = useState(false);
  const [activeCaseId, setActiveCaseId] = React.useState(0);
  const [activeCase, setActiveCase] = React.useState({});
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!consolePanel) {
      setOutputTab("Testcase");
    }
  }, [consolePanel]);

  const getCompilerData = async () => {
    setCodeValue("");
    try {
      const token = JSON.parse(loggedIn).token;
      const response = await fetch(
        `${ApiBaseURL}/free-course-management/practice-compiler-question-load-template/?question_id=${selectedQs.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("*********** hello data", data);
      setCompilerData(data.main_data);
      setActiveLanguage(data.main_data[0].compiler);
      setCodeValue(data.main_data[0].load_template);
    } catch (error) {
      console.error("Error fetching compiler data:", error);
    }
  };

  const bytesToMB = (bytes) => {
    return Math.ceil(bytes / (1024 * 1024));
  };

  useEffect(() => {
    getCompilerData();
  }, [selectedQs]);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setActiveLanguage(selectedLanguage);
  };

  const getFirstWordLowerCase = (inputString) => {
    const match = inputString.match(/[^\s\[\]]+/);
    if (match) {
      const sanitizedWord =
        match[0].toLowerCase() === "c++" || match[0].toLowerCase() === "c++14"
          ? "c_cpp"
          : match[0].toLowerCase();
      return sanitizedWord;
    } else {
      return null; // or handle the case when no match is found
    }
  };

  const Layout = () => (
    <div className="code-output-layout">
      <img
        className="pr-3"
        src="/images/Practice/layout.svg"
        alt="layout icon"
      />
      <span>Source</span>
      <img
        className="pl-3 pr-3"
        src="/images/Practice/grid.svg"
        alt="grid icon"
      />
    </div>
  );

  const handleChange = (event, newValue) => {
    setOutputTab(newValue);
  };

  const {
    test_cases: { data },
  } = selectedQs;
  useEffect(() => {
    if (data && data.length > 0) {
      setActiveCaseId(data[0]?.test_case);
      setActiveCase(data[0]);
    }
  }, [selectedQs, data]);

  const handleSubmitCode = (buttonClicked) => {
    setIsRun(buttonClicked);
    setTestLoading(true);
    setConsolPanel(true);
    const formData = new FormData();
    formData.append("q_id", selectedQs.id);
    formData.append("course_id", 1);
    formData.append("syllabus_id", sectionId);
    formData.append("compiler", activeLanguage);
    formData.append("source_code", codeValue);
    formData.append("button_clicked", buttonClicked);
    fetch(
      `${ApiBaseURL}free-course-management/practice-compiler-question-attempt/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${JSON.parse(loggedIn).token}`,
        },
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        fetchFreeSubmitResponse(data.main_data, buttonClicked);
      })
      .catch((error) => {
        console.log("Error in submitting", error);
      });
  };

  const fetchFreeSubmitResponse = async (main_data, buttonClicked) => {
    if (loggedIn) {
      const apiUrl = `${ApiBaseURL}free-course-management/practice-compiler-question-attempt-response/?main_data_id=${main_data}`;
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
        setTestLoading(false);
        const data = await response.json();
        setSubmitData(data);
        setOutputTab("Result");
        if (buttonClicked !== "Run") {
          fetchFreeQuestionList();
          setActiveTag("Submission");
        }
        scroll();
        scrollToBottom();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    if (compilerData.length > 0) {
      const selectedCompiler = compilerData.find(
        (compiler) => compiler.compiler === activeLanguage
      );
      setCodeValue(selectedCompiler.load_template);
    }
  }, [compilerData, activeLanguage]);

  function extractLanguage(str) {
    return str.split(" ")[0];
  }

  return (
    <>
      <div className="right-code">
        <div className="right-code-header">
          <div className="flex items-center">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select value={activeLanguage} onChange={handleLanguageChange}>
                {compilerData &&
                  compilerData.length > 0 &&
                  compilerData.map((compiler) => (
                    <MenuItem key={compiler.compiler} value={compiler.compiler}>
                      {extractLanguage(compiler.compiler)}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <ul>
              <li>
                <span>Auto</span>
              </li>
            </ul>
          </div>
          <div className="action">
            <IconButton
              // onClick={() => handleResetCode()}
              className="pr-3"
              color="primary"
            >
              <AutorenewIcon />
            </IconButton>

            <img
              className="pr-3"
              src="/images/Practice/bookmark.svg"
              alt="bookmark icon"
            />
            <img
              className="pr-3"
              src="/images/Practice/corner-up-left.svg"
              alt="corner up left icon"
            />
            <img
              className="pr-3"
              src="/images/Practice/command.svg"
              alt="command icon"
            />
            <img
              className="pr-3"
              src="/images/Practice/curly-bracket.svg"
              alt="curly bracket icon"
            />
            <img
              className="pr-3"
              src="/images/Practice/settings.svg"
              alt="settings icon"
            />
            <img src="/images/Practice/maximize.svg" alt="maximize icon" />
          </div>
        </div>
        <div className="right-code-body relative tab-screen:h-[calc(100%-40px)] tab-screen:flex tab-screen:flex-col">
          {isClicked && (
            <div className="bg-[#f6fffe] text-left lg:rounded-r-lg rounded-lg absolute inset-0 -top-10 transform transition-all z-10 bg-opacity-95">
              <div className="flex flex-shrink-0 items-center justify-between lg:rounded-tr-md rounded-t-lg border-b border-solid border-[#c5d9dc] py-1.5 px-4 dark:border-opacity-50">
                <h5
                  className="text-lg font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                  id="exampleModalLabel"
                >
                  Submission
                </h5>
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss
                  aria-label="Close"
                  onClick={() => {
                    setIsClicked(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-4 pb-4 pt-3 md:px-6 h-full">
                <div className="submission-1">
                  <span
                    style={{
                      color:
                        clickedItems?.status === "Accepted" ? "green" : "red",

                      textTransform: "capitalize",
                    }}
                  >
                    {clickedItems?.status}
                  </span>
                </div>
                <div
                  className="submission-2"
                  style={{ flexDirection: "row", display: "flex" }}
                >
                  <div
                    className="network-wrapper"
                    style={{ paddingRight: "15px" }}
                  >
                    <div className="network-header">
                      <span>Runtime</span>
                      <span>Details</span>
                    </div>
                    <div className="network-body">
                      <span className="value">{clickedItems?.timer}</span>
                      <span className="type">ms</span>
                    </div>
                  </div>
                  <div className="network-wrapper">
                    <div className="network-header">
                      <span>Memory</span>
                      <span>Details</span>
                    </div>
                    <div className="network-body">
                      <span className="value">
                        {bytesToMB(clickedItems?.memory)}
                      </span>
                      <span className="type">MB</span>
                    </div>
                  </div>
                </div>
                <div className="h-[calc(100%-150px)] overflow-y-auto">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                        style={{ textAlign: "left" }}
                      >
                        Code
                      </h3>
                      <div className="mt-2" style={{ textAlign: "left" }}>
                        <pre className="text-sm text-gray-500">
                          {clickedItems?.student_ans}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="code-editor">
            <AceEditor
              placeholder="Placeholder Text"
              mode={getFirstWordLowerCase(activeLanguage)}
              theme="github"
              name="blah2"
              onChange={(code) => {
                setCodeValue(code);
              }}
              fontSize={16}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={codeValue}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
              }}
              style={editorStyle}
            />
          </div>
          {consolePanel && (
            <div className="code-output">
              <div className="code-output-tab">
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider" }}
                    className="code-output-tabs"
                  >
                    <Tabs
                      value={outputTab}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Testcase" value="Testcase" />
                      <Tab label="Result" value="Result" />
                    </Tabs>
                    <Layout />
                  </Box>
                </Box>
                {!testLoading ? (
                  <>
                    {outputTab === "Testcase" ? (
                      <div className="testcase pb-5">
                        <div className="w-full xl:h-[200px] overflow-y-auto">
                          <div className="flex items-center">
                            {data &&
                              data.length > 0 &&
                              data.map((caseItem, index) => (
                                <div
                                  key={caseItem.test_case}
                                  onClick={() => {
                                    setActiveCaseId(caseItem.test_case);
                                    setActiveCase(caseItem);
                                  }}
                                  className={
                                    caseItem.test_case === activeCaseId
                                      ? "active-testcase-box"
                                      : "testcase-box"
                                  }
                                >
                                  <span>Case {caseItem?.test_case}</span>
                                </div>
                              ))}
                          </div>
                          <div
                            key={activeCase.test_case}
                            className="testcase-result max-h-[180px] overflow-y-auto"
                          >
                            {activeCase?.input &&
                              activeCase?.input.length > 0 &&
                              activeCase?.input.map((item) => {
                                return (
                                  <div
                                    style={{
                                      borderRadius: "5px",
                                      background: "#e0f6f4",
                                      padding: "4px",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    <span>
                                      {item?.titel}
                                      <span>{JSON.stringify(item?.value)}</span>
                                    </span>
                                  </div>
                                );
                              })}
                            {activeCase?.expected &&
                              activeCase?.expected.length > 0 &&
                              activeCase?.expected.map((item) => {
                                return (
                                  <div
                                    style={{
                                      borderRadius: "5px",
                                      background: "#e0f6f4",
                                      padding: "4px",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    <span>
                                      {item?.titel}
                                      <span>{JSON.stringify(item?.value)}</span>
                                    </span>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                        <div ref={messagesEndRef} />
                      </div>
                    ) : (
                      <div className="testcase pb-5">
                        <div className="w-full h-[220px] overflow-y-auto">
                          {submitData?.api_result && (
                            <div
                              className="testcase-result max-h-[180px] overflow-y-auto"
                              style={{ padding: "10px 0" }}
                            >
                              <span
                                className="pl-3"
                                style={{
                                  textTransform: "capitalize",
                                  fontSize: "18px",
                                  color:
                                    submitData?.api_result?.status ===
                                    "Accepted"
                                      ? "green"
                                      : "red",
                                }}
                              >
                                {submitData?.api_result?.status}
                              </span>
                            </div>
                          )}

                          {(submitData?.api_result &&
                            submitData?.api_result.status === "Accepted") ||
                          (submitData?.api_result &&
                            submitData?.api_result?.status ===
                              "Wrong Answer") ? (
                            <>
                              <div className="flex items-center">
                                {data &&
                                  data.length > 0 &&
                                  data.map((caseItem, index) => (
                                    <div
                                      key={caseItem.test_case}
                                      onClick={() => {
                                        setActiveCaseId(caseItem.test_case);
                                        setActiveCase(caseItem);
                                      }}
                                      className={
                                        caseItem.test_case === activeCaseId
                                          ? "active-testcase-box"
                                          : "testcase-box"
                                      }
                                    >
                                      <span>
                                        Case {caseItem?.test_case}{" "}
                                        <span
                                          style={{
                                            color:
                                              submitData?.api_result &&
                                              submitData?.api_result.status ===
                                                "Accepted"
                                                ? "green"
                                                : "red",
                                          }}
                                        >
                                          ●
                                        </span>{" "}
                                      </span>
                                    </div>
                                  ))}
                              </div>

                              <div
                                key={activeCase.test_case}
                                className="testcase-result max-h-[180px] overflow-y-auto"
                              >
                                {activeCase?.input &&
                                  activeCase?.input.length > 0 &&
                                  activeCase?.input.map((item) => {
                                    return (
                                      <div
                                        style={{
                                          borderRadius: "5px",
                                          background: "#e0f6f4",
                                          padding: "4px",
                                          marginBottom: "5px",
                                        }}
                                      >
                                        <span>
                                          {item?.titel}
                                          <span>
                                            {JSON.stringify(item?.value)}
                                          </span>
                                        </span>
                                      </div>
                                    );
                                  })}
                                {activeCase?.expected &&
                                  activeCase?.expected.length > 0 &&
                                  activeCase?.expected.map((item) => {
                                    return (
                                      <div
                                        style={{
                                          borderRadius: "5px",
                                          background: "#e0f6f4",
                                          padding: "4px",
                                          marginBottom: "5px",
                                        }}
                                      >
                                        <span>
                                          {item?.titel}
                                          <span>
                                            {JSON.stringify(item?.value)}
                                          </span>
                                        </span>
                                      </div>
                                    );
                                  })}
                                <span className="pl-3">Actual Output =</span>
                                {submitData?.api_result &&
                                  submitData?.api_result?.data && (
                                    <span className="pl-3">
                                      {
                                        submitData?.api_result?.data[
                                          activeCaseId - 1
                                        ]
                                      }
                                    </span>
                                  )}
                              </div>
                              <div ref={messagesEndRef} />
                            </>
                          ) : (
                            <>
                              {submitData?.api_result && (
                                <div className="testcase-result max-h-[180px] overflow-y-auto">
                                  <span className="pl-3 pt-3">
                                    {" "}
                                    <pre>{submitData?.api_result?.data}</pre>
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="h-[240px] p-5">
                      <Skeleton count={8} />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <div className="testcase-action">
            <div
              className="left-action"
              onClick={() => {
                setConsolPanel(!consolePanel);
              }}
            >
              <span>Console</span>
              {!consolePanel ? (
                <img
                  className="pr-3"
                  src="/images/up.png"
                  alt="down icon"
                  style={{ height: "20px" }}
                />
              ) : (
                <img
                  className="pr-3"
                  src="/images/Practice/down.svg"
                  alt="down icon"
                />
              )}
            </div>
            <div className="right-action">
              <button
                className="btn-run"
                onClick={() => handleSubmitCode("Run")}
              >
                Run
              </button>
              <button
                className="btn-submit"
                onClick={() => handleSubmitCode("Submit")}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreeEditor;
