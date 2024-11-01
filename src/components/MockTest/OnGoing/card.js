import React, { useState, useEffect } from "react";

import CodeEditor from "./editor";
import Problem from "./problem";
import Submission from "./submission";
import Hint from "./hint";

const tags = ["Problem", "Submission"];

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
  setQuesData,
  setSelectedQs,
  consolePanel,
  setConsolPanel,
  testCase,
  setTestCase,
  fetchData
}) => {
  const renderLeftSideScreen = () => {
    if (activeTag === "Submission") {
      return <Submission compilerResult={compilerResult} />;
    }
    // if (activeTag === "Hint") {
    //   return <Hint problemData={problemData} />;
    // }
    return (
      <Problem
        selectedQs={selectedQs}
        setProblemId={setProblemId}
        setProblemData={setProblemData}
        testCase={testCase}
        setTestCase={setTestCase}
      />
    );
  };

  useEffect(() => {
    // console.log("problemId", problemId);
  }, [problemId]);

  return (
    <div className="code-wrapper tab-screen:h-[864px]">
      <div className="left-code">
        <div className="left-code-header">
          {tags.map((tag) => {
            const tagClass = tag === activeTag ? "active-tag tag" : "tag";
            return (
              <div
                onClick={() =>
                  tag === "Submission" && tagDisable
                    ? console.log("run the program")
                    : setActiveTag(tag)
                }
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
        setQuesData={setQuesData}
        problemData={problemData}
        setSelectedQs={setSelectedQs}
        consolePanel={consolePanel}
        setConsolPanel={setConsolPanel}
        testCase={testCase}
        setTestCase={setTestCase}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Card;
