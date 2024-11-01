import React, { useState } from "react";
import WhereStart from "./WhereStart";
import { useCookie } from "react-use";
import axios from "axios";
import "./rules.css";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";

export default function ClassTiming(counter) {
  const [loggedIn] = useCookie("maang");
  const [showContent, setShowContent] = useState(true);

  const handleAgreeAndNext = async () => {
    const formDataRules = new FormData();
    formDataRules.append("count", 4);

    const responseRules = await axios.post(
      `${ApiBaseURL}mentor-management/rules-regulation/`,
      formDataRules,
      {
        headers: {
          Authorization: `Token ${JSON.parse(loggedIn).token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // console.log(responseRules.data);

    setShowContent(false);
  };
  // const handleAgreeAndNext = async () => {
  //   if (loggedIn) {
  //     try {
  //       await axios.post(
  //         "https://devdjango.maangcareers.com/mentor-management/rules-regulation/",
  //         null,
  //         {
  //           headers: {
  //             Authorization: `Token ${JSON.parse(loggedIn).token}`,
  //           },
  //         }
  //       );

  //       // If the request is successful, update the state and proceed to the next step
  //       setShowContent(false);
  //     } catch (error) {
  //       console.error("Error hitting API:", error);
  //     }
  //   }
  // };

  return (
    <div>
      {showContent ? (
        <div className="custombox rounded-lg shadow-xl text-center lg:text-left">
         <div className="flex flex-wrap -mx-4 gap-y-1">
          <div className="md:w-6/12 w-full px-4 custombox-left">
            <img
                src="/images/time.png" alt="" className="controlimgsize inline-block max-w-full" />
              <br />
          </div>
          <div className="md:w-6/12 w-full px-4 custombox-right">
            <div className="text-gray-700 text-3xl title-text font-semibold font-['Outfit']">
            Typical class timings
            </div>
            <div className="text-gray-600 text-base font-normal font-['Outfit']">
              <p>
              Conduct 2-hour classes: 1.5 hrs for teaching and coding, 30 mins for addressing doubts.
              </p>
            </div>
            <span className="mx-auto text-left">
              <div className="w-[305px] mt-3 text-sky-500 text-[25px] font-semibold font-['Outfit']">
                2 hrs per class
              </div>
              <div className="alineli">
                <li>1 hr 30 min ---Teaching</li>
                <li>30 min ---Doubt Discussion</li>{" "}
              </div>
            </span>
          </div>
          <div className="md:w-12/12 w-full px-4">
            <div className="text-gray-600 text-base font-normal font-['Outfit']">
              <p className="text-gray-600"> You need to take each class for 2 hours. Spend the first 1 hour and 30 minutes explaining concepts and solving coding questions in front of the students. Use the remaining 30 minutes to patiently address every student's doubts and questions.</p>
            </div>
          </div>
        </div>

        <div className="mt-5 text-center lg:text-right">
            <a className="inline-block nwbtn px-5 py-2.5 bg-emerald-400 rounded-[5px] text-white text-xl font-medium font-['Outfit']" onClick={handleAgreeAndNext} >
              Next
            </a>
          </div>
      </div>
      ) : (
        <div className="text-center">
          <WhereStart />
        </div>
      )}
    </div>
  );
}
