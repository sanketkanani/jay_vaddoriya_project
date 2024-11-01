import React, { useState, useEffect } from "react";

import CodeEditor from "./editor";
import Problem from "./problem";
import Submission from "./submission";
import Hint from "./hint";
import { useCookie } from "react-use";
import { useNavigate } from "react-router-dom";

const tags = ["Problem", "Hint", "Submission"];

const Card = ({
  selectedQs,
  problemId,
  setProblemId,
  setComplierresult,
  compilerResult,
  activeTag,
  setActiveTag,
  setProblemData,
  problemData,
  tagDisable,
  setTagDisable,
  testCase,
  setTestCase,
  setSelectedQs,
  consolePanel,
  setConsolPanel,
  setClickedItems,
  setIsClicked,
  clickedItems,
  isClicked,
  fetchProblemData,
  setIsRun,
  isRun,
  dayLength,
}) => {
  const [loggedIn] = useCookie("maang");
  const navigate = useNavigate();
  // const [isRun, setIsRun]=useState("");

  const renderLeftSideScreen = () => {
    if (activeTag === "Submission") {
      return (
        <Submission
          compilerResult={compilerResult}
          problemData={problemData}
          setClickedItems={setClickedItems}
          setIsClicked={setIsClicked}
          isRun={isRun}
          setIsRun={setIsRun}
        />
      );
    }
    if (activeTag === "Hint") {
      return <Hint problemData={problemData} />;
    }

    if (activeTag === "Problem") {
      return (
        <Problem
          selectedQs={selectedQs}
          setProblemId={setProblemId}
          setProblemData={setProblemData}
          problemData={problemData}
          testCase={testCase}
          setTestCase={setTestCase}
          dayLength={dayLength}
        />
      );
    }
  };

  useEffect(() => {
    // console.log("problemId imran", problemData);
  }, [problemData]);

  return (
    <div className="code-wrapper tab-screen:h-[864px]">
      <div className="left-code">
        <div className="left-code-header">
          {tags.map((tag) => {
            const tagClass = tag === activeTag ? "active-tag tag" : "tag";
            return (
              <div
                onClick={() => {
                  problemData?.previous_attempts?.length === 0
                    ? console.log("run the program")
                    : navigate(`/student/practice/${selectedQs}/${tag}`);
                }}
                className={tagClass}
              >
                {tag}
              </div>
            );
          })}
        </div>
        {renderLeftSideScreen()}
      </div>
      <CodeEditor
        selectedQs={selectedQs}
        problemId={problemId}
        key={problemId}
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
      />
    </div>
  );
};

export default Card;
