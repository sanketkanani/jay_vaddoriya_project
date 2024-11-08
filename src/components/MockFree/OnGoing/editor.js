import React, { useState, useEffect } from "react";
// import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import "prismjs/components/prism-clike";
// import "prismjs/components/prism-javascript";
// import "prismjs/themes/prism.css";
import PracticeModal from "./Modal";
import { useCookie } from "react-use";
import IconButton from "@mui/material/IconButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/webpack-resolver";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL } from "../../ApiConfig";

const languageOptions = ["Java", "PHP", "Javascript"];
const editorStyle = {
  height: "500px", // Set your desired height
  width: "100%", // Set your desired width
};

const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");

const CodeEditor = ({
  selectedQs,
  problemId,
  setComplierresult,
  compilerResult,
  activeTag,
  setActiveTag,
  tagDisable,
  setTagDisable,
  testCase,
  problemData,
  setSelectedQs,
  consolePanel,
  setConsolPanel,
  clickedItems,
  isClicked,
  setIsClicked,
  fetchProblemData,
  setIsRun,
  dayLength,
}) => {
  const [codeValue, setCodeValue] = useState("");
  const [initialCodeValue, setInitialCodeValue] = useState("");
  const [loggedIn] = useCookie("maang");
  const [outputTab, setOutputTab] = React.useState("Testcase");
  const [isCodeSubmitted, setIsCodeSubmitted] = React.useState(false);
  const [caseList, setCaseList] = React.useState([
    "Case 1",
    "Case 2",
    "Case 3",
  ]);
  const [activeCaseId, setActiveCaseId] = React.useState(0);
  const [activeCase, setActiveCase] = React.useState({});

  const [activeLanguage, setActiveLanguage] = React.useState("Javascript");
  const [language, setLanguage] = React.useState([]);
  const [compilers, setCompilers] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedComp, setSelectedComp] = useState({});
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [testList, setTestList] = useState([]);
  const [testLoading, setTestLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [saveCodeId, setSaveCodeId] = useState(null);
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();

  const fetchDataFromApi = async () => {
    if (!selectedQs) return;

    setLoading(true);
    try {
      const token = JSON.parse(loggedIn).token;
      const response = await fetch(
        `${ApiBaseURL}test-management/std-practice-question-temp/?question_id=${selectedQs}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      const compilersData = data.main_data;

      if (compilersData.length > 0) {
        setSaveCodeId(compilersData[0].save_code_id);
        setCompilers(compilersData);
        setActiveLanguage(compilersData[0].compilers_name);

        const codeValue =
          problemData.pre_code || compilersData[0].load_template;
        setCodeValue(codeValue);
        setReset(!problemData.pre_code);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataFromApiDelete = async (compilerId) => {
    if (!selectedQs) return;
    setLoading(true);
    try {
      const token = JSON.parse(loggedIn).token;
      const response = await fetch(
        `${ApiBaseURL}test-management/std-practice-question-temp/?question_id=${selectedQs}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      const compilersData = data.main_data;
      const compilerDataSingle = compilersData.find(
        (item) => item.save_code_id === compilerId
      );

      if (compilersData.length > 0) {
        setSaveCodeId(compilerDataSingle.save_code_id);
        setCompilers(compilersData);
        setActiveLanguage(compilerDataSingle.compilers_name);

        const codeValue =
          problemData.pre_code || compilerDataSingle.load_template;
        setCodeValue(codeValue);
        setReset(!problemData.pre_code);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataFromApiQs = async () => {
    if (!selectedQs) return;

    setLoading(true);
    try {
      const token = JSON.parse(loggedIn).token;
      const response = await fetch(
        `${ApiBaseURL}test-management/std-practice-question-temp/?question_id=${selectedQs}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      const compilersData = data.main_data;

      if (compilersData.length > 0) {
        setCompilers(compilersData);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [loggedIn]);

  useEffect(() => {
    setSelectedProblemId(problemId);
  }, [problemId]);

  useEffect(() => {
    if (compilers.length > 0) {
      const selectedCompiler = compilers.find(
        (compiler) => compiler.compilers_name === activeLanguage
      );
      setSelectedComp(selectedCompiler);
      setCodeValue(selectedCompiler.load_template);
      setSaveCodeId(selectedCompiler.save_code_id);
      setInitialCodeValue(
        selectedCompiler ? selectedCompiler.load_template : ""
      );
      if (testCase && testCase.length > 0) {
        setTestList(testCase);
      }
    }
  }, [compilers, activeLanguage, testCase]);

  useEffect(() => {
    fetchDataFromApiQs();
  }, [activeLanguage]);

  const handleChange = (event, newValue) => {
    setOutputTab(newValue);
  };

  const deleteCode = async (qId, compilerId) => {
    const requestBody = {
      q_id: qId,
      compliler_id: compilerId,
    };

    // console.log("FORM DATA----->", requestBody);

    try {
      const response = await fetch(
        `${ApiBaseURL}test-management/std-practice-delete-code/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const responseData = await response.json();

      // console.log(
      //   "Response Data:000000000000000000000000000000000000",
      //   responseData
      // );

      if (!response.ok) {
        throw new Error(`Failed to delete code: ${response.status}`);
      }

      // console.log("Code deleted successfully");
      fetchDataFromApiDelete(compilerId);
    } catch (error) {
      console.error("Error deleting code:", error);
    }
  };

  const handleResetCode = () => {
    deleteCode(selectedQs, saveCodeId);
    setReset(true);
    setCodeValue(initialCodeValue);
    fetchProblemData();
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setActiveLanguage(selectedLanguage);
  };

  const getFirstWordLowerCase = (inputString) => {
    // Extract the first word in lowercase
    const match = inputString.match(/[^\s\[\]]+/);
    // console.log(" match[0].toLowerCase()", match);
    // Check if a match is found
    if (match) {
      // Handle special case for "C++"
      const sanitizedWord =
        match[0].toLowerCase() === "c++" || match[0].toLowerCase() === "c++14"
          ? "c_cpp"
          : match[0].toLowerCase();
      return sanitizedWord;
    } else {
      return null; // or handle the case when no match is found
    }
  };

  const handleSubmitCode = (buttonClicked) => {
    //submit trigger
    if (buttonClicked === "Run") {
      setIsRun("Run");
    }
    setTestLoading(true);
    setConsolPanel(true);
    const formData = new FormData();
    formData.append("q_id", selectedQs);
    formData.append("source_code", codeValue);
    formData.append("problem_id", selectedProblemId);
    formData.append("compiler_id", selectedComp?.compilers_id);
    formData.append("compiler", selectedComp?.compiler);
    formData.append("coding_language", activeLanguage);
    formData.append("button_clicked", buttonClicked);

    // console.log("FORM DATA RESULT_------------>",formData);

    fetch(`${ApiBaseURL}test-management/std-practice-question-submission/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${JSON.parse(loggedIn).token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Data------>",data);
        getCompilerData(data.main_data, buttonClicked);
        setTagDisable(false);
        setOutputTab("Result");
      })
      .catch((error) => {
        console.error("Error submitting code:", error);
      });
  };

  const getCompilerData = async (main_data_id, buttonClicked) => {
    try {
      const result = await fetch(
        `${ApiBaseURL}test-management/std-practice-question-submission-responce/?main_data_id=${main_data_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      );

      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      const data = await result.json();
      if (
        data?.api_result?.length > 0 &&
        data?.api_result[0]?.status === "accepted" &&
        buttonClicked === "Submit"
      ) {
        setIsCodeSubmitted(true);
      }
      setComplierresult(data);
      if (buttonClicked !== "Run") {
        fetchProblemData();
        setIsRun("Submit");
        navigate("/student/practice/" + selectedQs + "/Submission");
        setConsolPanel(false);
      }
      setTestLoading(false);
      if (testCase && testCase.length > 0) {
        setTestList(testCase);
        setActiveCaseId(testCase[0]?.test_case);
        setActiveCase(testCase[0]);
      }
    } catch (error) {
      setTestLoading(false);
      console.error("Error fetching compiler data:", error.message);
    }
  };

  useEffect(() => {
    if (testCase && testCase.length > 0) {
      setTestList(testCase);
      setActiveCaseId(testCase[0]?.test_case);
      setActiveCase(testCase[0]);
    }
    // console.log("compilers Result", testCase);
  }, [testCase]);

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

  const autoSave = async () => {
    const formData = new FormData();
    formData.append("q_id", selectedQs);
    formData.append("code", codeValue);
    formData.append("compliler_id", selectedComp.save_code_id);
    fetch(`${ApiBaseURL}test-management/std-practice-save-code/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${JSON.parse(loggedIn).token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Data save!");
      })
      .catch((error) => {
        console.error("Error submitting code:", error);
      });
  };

  const bytesToMB = (bytes) => {
    return Math.ceil(bytes / (1024 * 1024));
  };

  useEffect(() => {
    setClicked(isClicked);
  }, [testCase, clickedItems, isClicked]);

  // console.log("clicked state:", isClicked);

  return (
    <div className="right-code">
      <div className="right-code-header">
        <div className="flex items-center">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select value={activeLanguage} onChange={handleLanguageChange}>
              {compilers.map((compiler) => (
                <MenuItem
                  key={compiler.compilers_name}
                  value={compiler.compilers_name}
                >
                  {compiler.compilers_name}
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
            onClick={() => handleResetCode()}
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
                      clickedItems?.status === "accepted" ? "green" : "red",

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
                  <div className="network-footer">
                    <span className="value">Beats 63.95%</span>
                    <span className="type">
                      of users with {clickedItems?.load_template__compiler}
                    </span>
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
                  <div className="network-footer">
                    <span className="value">Beats 63.95%</span>
                    <span className="type">
                      of users with {clickedItems?.load_template__compiler}
                    </span>
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
                    <div className="mt-2 " style={{ textAlign: "left" }}>
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
              autoSave();
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
                {!testLoading ? (
                  <>
                    {outputTab === "Testcase" ? (
                      <div className="testcase pb-5">
                        <div className="w-full h-[220px] overflow-y-auto">
                          <div className="flex items-center">
                            {testList &&
                              testList.length > 0 &&
                              testList.map((caseItem, index) => (
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
                      </div>
                    ) : (
                      <div className="testcase pb-5">
                        <div className="w-full h-[220px] overflow-y-auto">
                          {compilerResult?.api_result?.length > 0 &&
                            compilerResult?.api_result.map((data) => {
                              return (
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
                                        data?.status === "accepted"
                                          ? "green"
                                          : "red",
                                    }}
                                  >
                                    {data?.status}
                                  </span>
                                </div>
                              );
                            })}
                          {(compilerResult?.api_result &&
                            compilerResult?.api_result.length > 0 &&
                            compilerResult?.api_result[0]?.status ===
                              "accepted") ||
                          (compilerResult?.api_result &&
                            compilerResult?.api_result.length > 0 &&
                            compilerResult?.api_result[0]?.status ===
                              "wrong answer") ? (
                            <>
                              <div className="flex items-center">
                                {testList &&
                                  testList.length > 0 &&
                                  testList.map((caseItem, index) => (
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
                                              compilerResult?.api_result &&
                                              compilerResult?.api_result
                                                .length > 0 &&
                                              compilerResult?.api_result[0]
                                                .status === "accepted"
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
                                <span className="pl-3">Output=</span>
                                {compilerResult?.api_result &&
                                  compilerResult?.api_result.length > 0 &&
                                  compilerResult?.api_result[0]?.data && (
                                    <span className="pl-3">
                                      {
                                        compilerResult?.api_result[0]?.data[
                                          activeCaseId - 1
                                        ]
                                      }
                                    </span>
                                  )}
                              </div>
                            </>
                          ) : (
                            <>
                              {compilerResult?.api_result?.length > 0 &&
                                compilerResult?.api_result.map((data) => {
                                  return (
                                    <div className="testcase-result max-h-[180px] overflow-y-auto">
                                      <span className="pl-3 pt-3">
                                        {" "}
                                        <pre>{data?.data}</pre>
                                      </span>
                                    </div>
                                  );
                                })}
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
              </Box>
            </div>
          </div>
        )}
        <div className="testcase-action mt-auto">
          <div className="left-action">
            <span>Console</span>
            {!consolePanel ? (
              <img
                className="pr-3"
                src="/images/up.png"
                alt="down icon"
                style={{ height: "20px" }}
                onClick={() => {
                  setConsolPanel(!consolePanel);
                }}
              />
            ) : (
              <img
                className="pr-3"
                src="/images/Practice/down.svg"
                alt="down icon"
                onClick={() => {
                  setConsolPanel(!consolePanel);
                }}
              />
            )}
          </div>
          <div className="right-action">
            <button className="btn-run" onClick={() => handleSubmitCode("Run")}>
              Run
            </button>
            <button
              className="btn-submit"
              onClick={() => {
                handleSubmitCode("Submit");
              }}
            >
              Submit
            </button>
          </div>
        </div>
        <PracticeModal
          setIsOpenModal={setIsCodeSubmitted}
          isOpenModal={isCodeSubmitted}
          newtQs={problemData.next_q_id}
          setSelectedQs={setSelectedQs}
          setActiveTag={setActiveTag}
          setTagDisable={setTagDisable}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
