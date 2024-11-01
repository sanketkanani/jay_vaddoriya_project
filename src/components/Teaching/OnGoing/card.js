import React, { useState, useEffect } from "react";

import CodeEditor from "./editor";
import Problem from "./problem";
import Submission from "./submission";
import Hint from "./hint";
import { useCookie } from "react-use";
import { useNavigate } from "react-router-dom";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
const tags = ["problem", "hint", "submission"];

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
}) => {
  const [loggedIn] = useCookie("maang");
  const navigate = useNavigate();

  const renderLeftSideScreen = () => {
    if (activeTag === "submission") {
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
    if (activeTag === "hint") {
      return <Hint problemData={problemData} />;
    }

    if (activeTag === "problem") {
      return (
        <Problem
          selectedQs={selectedQs}
          setProblemId={setProblemId}
          setProblemData={setProblemData}
          problemData={problemData}
          testCase={testCase}
          setTestCase={setTestCase}
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
            const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
            const tagClass = tag === activeTag ? "active-tag tag" : "tag";
            return (
              <div
                onClick={() => {
                  problemData?.previous_attempts?.length === 0
                    ? console.log("run the program")
                    : navigate(`/mentor/teaching/${selectedQs}/${tag}`);
                }}
                className={tagClass}
              >
                {capitalizedTag}
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
