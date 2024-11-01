import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

function Hint({ problemData }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // console.log("Hint problem", problemData);
  }, [problemData]);

  if (!problemData) {
    return null; // or render a loading state, depending on your requirements
  }

  const { video_solutions, approch_values } = problemData;
  const codeString =
    '"#include <iostream>\r\nusing namespace std;\r\n\r\nvoid add(int x,int y)\r\n{\r\n    //your code goes here\r\n    \r\n}"';

  return (
    <div className="hint-container tab-screen:h-[820px] max-h-[820px] overflow-y-auto">
      <div className="hint-video" style={{ marginTop: "10px" }}>
        <div className="left-code-body">
          <div className="section-1">
            <span className="topic">Video Solution</span>
          </div>
        </div>
        <Tabs>
          {video_solutions && video_solutions.length > 0 && (
            <div>
              {video_solutions.map((data, index) => (
                <TabPanel
                  key={index}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <iframe
                    width="100%"
                    height="auto"
                    src={data.video_links}
                    title="Hint Video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </TabPanel>
              ))}
            </div>
          )}
          <TabList
            style={{
              display: "flex",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
            selectedTabClassName="selected-tab" // Add this line
          >
            {video_solutions &&
              video_solutions.length > 0 &&
              video_solutions.map((data, index) => (
                <Tab
                  key={index}
                  style={{
                    marginRight: "10px",
                    cursor: "pointer",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "18px",
                  }}
                >
                  {data.video_title}
                </Tab>
              ))}
          </TabList>
        </Tabs>
      </div>
      <div
        className="left-code-body"
        style={{ borderBottom: "1px solid #35c69d" }}
      >
        <div className="section-1">
          <span className="topic">Solution Article:</span>
        </div>
      </div>

      {approch_values?.approch_flg &&
        approch_values?.approch_flg?.length > 0 &&
        approch_values.approch_flg.map((data) => {
          return (
            <>
              <div className="left-code-body">
                <div className="section-1">
                  <span className="topic">
                    Approch {data.id}: {data.approach_title}
                  </span>
                </div>
              </div>
              {data.approach_intuition && (
                <div className="left-code-body">
                  <div className="section-1">
                    <span className="topic">Intuition</span>
                  </div>
                </div>
              )}
              <div className="left-code-body" style={{ paddingTop: 0 }}>
                <div className="section-4">
                  {data.approach_intuition && (
                    <span>{data.approach_intuition}</span>
                  )}
                </div>
              </div>
              <div className="left-code-body">
                <div className="section-1">
                  <span className="topic">Algorithm</span>
                </div>
              </div>
              <div className="left-code-body" style={{ paddingTop: 0 }}>
                <div className="section-4">
                  {data.approach_algorithm && (
                    <span>{data.approach_algorithm}</span>
                  )}
                </div>
              </div>
              <div
                className="hint-code px-4"
              >
                <Tabs>
                  <TabList
                    style={{
                      display: "flex",
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                    }}
                    selectedTabClassName="selected-tab" // Add this line
                  >
                    {data.code_text_data &&
                      data.code_text_data.length > 0 &&
                      data.code_text_data.map((data, index) => (
                        <Tab
                          key={index}
                          style={{
                            marginRight: "10px",
                            cursor: "pointer",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "18px",
                          }}
                        >
                          {data.language}
                        </Tab>
                      ))}
                  </TabList>

                  {data.code_text_data && data.code_text_data.length > 0 && (
                    <div>
                      {data.code_text_data.map((data, index) => (
                        <TabPanel
                          key={index}
                          style={{
                            marginTop: "10px",
                          }}
                        >
                          <SyntaxHighlighter
                            language={data.language}
                            style={docco}
                            showLineNumbers
                          >
                            {data.code}
                          </SyntaxHighlighter>
                        </TabPanel>
                      ))}
                    </div>
                  )}
                </Tabs>
              </div>

              <div className="px-4">
                {data && data.code_imgs && data.code_imgs.length > 0 && (
                  <div>
                    {data.code_imgs[currentIndex]?.pic && (
                      <img
                        src={data.code_imgs[currentIndex]?.pic}
                        alt={`Slide ${currentIndex + 1}`}
                      />
                    )}
                    <div className="flex justify-between mt-2">
                      <button className="py-1 px-3 bg-teal-500 text-white text-sm rounded font-['Outfit']"
                        onClick={() => {
                          setCurrentIndex((prevIndex) =>
                            prevIndex === 0
                              ? data.code_imgs.length - 1
                              : prevIndex - 1
                          );
                        }}
                      >
                        Previous
                      </button>
                      <button className="py-1 px-3 bg-teal-500 text-white text-sm rounded font-['Outfit']"
                        onClick={() => {
                          setCurrentIndex((prevIndex) =>
                            prevIndex === data.code_imgs.length - 1
                              ? 0
                              : prevIndex + 1
                          );
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="left-code-body">
                <div className="section-1">
                  <span className="topic">Complexity Analysis</span>
                </div>
              </div>
              <div className="left-code-body" style={{ paddingTop: 0 }}>
                <div className="section-4">
                  {data.approach_complexity_analysis && (
                    <span>{data.approach_complexity_analysis}</span>
                  )}
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
}

export default Hint;
