import React, { useEffect, useState } from "react";
import { useCookie } from "react-use";
import NotFound from "../../../pages/NotFound";
// import { ApiBaseURL } from "../../ApiConfig";
import { useLocation } from "react-router-dom";
import { ApiBaseURL } from "../../../services/config/Endpoints";

const Problem = ({
  selectedQs,
  setProblemId,
  setProblemData,
  testCase,
  setTestCase,
}) => {
  const [loggedIn] = useCookie("maang");
  const [qsData, setQsData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn) {
        const apiUrl = `${ApiBaseURL}test-management/std-practice-question/?q_id=${selectedQs}`;
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
          setQsData(data.main_data);
          setProblemId(data?.main_data[0]?.problem_id);
          setProblemData(data?.main_data[0]);
          setTestCase(data?.main_data[0]?.test_case);
          // console.log("Question Data--->", data.main_data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [loggedIn, selectedQs, setProblemId]);

  const socialSitListToShow = showAll
    ? qsData[0]?.socialSitList
    : qsData[0]?.socialSitList?.slice(0, 4);

  return (
    qsData &&
    qsData.length > 0 && (
      <div className="left-code-body tab-screen:h-[820px] max-h-[820px] overflow-y-auto text-left">
        <div className="section-1">
          <span className="topic">{qsData[0]?.question_name}</span>
          <span className="total-problem">
            Problem {qsData[0]?.question_number}/{qsData[0]?.week_day_q_count}
          </span>
        </div>
        <div className="section-2">
          <img
            className="pr-3"
            src="/images/Practice/thumbs-up.svg"
            alt="bookmark icon"
          />
          <img
            className="pr-3"
            src="/images/Practice/star.svg"
            alt="bookmark icon"
          />
          <img
            className="pr-3"
            src="/images/Practice/share.svg"
            alt="bookmark icon"
          />
          <img
            className="pr-3"
            src="/images/Practice/flag.svg"
            alt="bookmark icon"
          />
        </div>
        <div className="section-3">
          {socialSitListToShow?.map((siteName, index) => (
            <div key={index}>
              <span>{siteName}</span>
            </div>
          ))}
          {qsData[0]?.socialSitList?.length > 4 && !showAll && (
            <div>
              <span className="more" onClick={() => setShowAll(true)}>
                +{qsData[0]?.socialSitList.length - 4}
              </span>
            </div>
          )}
        </div>
        <div className="section-4">
          {showAll && (
            <button className="!w-auto !py-2 !text-center border-primary border-solid border-2 !h-auto" onClick={() => setShowAll(false)}>Show Less</button>
          )}
          {!showAll && (
            <button className="!w-auto !py-2 !text-center border-primary border-solid border-2 !h-auto" onClick={() => setShowAll(true)}>Show More</button>
          )}
          <span style={{ whiteSpace: "pre-line" }}>{qsData[0]?.prob_text}</span>
        </div>
        <div className="section-6 !block">
          {qsData[0]?.prob_pic !== "null" && (
            <img
              src={qsData[0]?.prob_pic}
              alt=""
              className="pt-2 pb-2"
            />
          )}
        </div>
        <div className="section-7">
          {qsData[0]?.examples.map((example) => {
            const { title, input, output, explanation } = example;
            const correspondingPic =
              qsData[0]?.approch_values?.example_pics.find(
                (pic) => pic.name === title
              );
            // console.log("correspondingPic", correspondingPic);
            return (
              <div className="example-card">
                <span className="title">{title}</span>
                {correspondingPic && (
                  <img
                    src={correspondingPic.example_pic}
                    alt={`Example`}
                    className="example-pic"
                  />
                )}
                <div className="box">
                  <div>
                    <span className="label">Inputs:</span>
                    <span className="text">{input}</span>
                  </div>
                  <div>
                    <span className="label">Output:</span>
                    <span className="text">{output}</span>
                  </div>
                  <div>
                    <span className="label">Explanation:</span>
                    <span className="text">{explanation}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="section-5">
          <p className="text-gray-600 text-sm font-medium font-['Outfit'] leading-none">
            Constraints
          </p>
          {qsData[0]?.constrains &&
            qsData[0]?.constrains?.length > 0 &&
            qsData[0].constrains.map((data) => (
              <div className="syntax" key={data}>
                <div className="syntax-box">
                  <span>{data.constrain_value}</span>
                </div>
              </div>
            ))}
        </div>
        <div className="section-6 !block">
          {/* <p className="text-gray-600 text-sm font-medium font-['Outfit'] leading-none">
            Constraints
          </p> */}
          {qsData[0]?.const_pic !== "null" && (
            <img src={qsData[0]?.const_pic} className="pt-2 pb-2" alt=" " />
          )}
        </div>
        <span style={{ fontWeight: "bold" }}>
          Follow-up:{"  "}
          <span style={{ fontWeight: "normal", fontSize: "14px" }}>
            {qsData[0]?.Challenge}
          </span>{" "}
        </span>
      </div>
    )
  );
};

export default Problem;
