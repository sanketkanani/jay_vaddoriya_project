import React, { useState } from "react";
import ArrangeClasses from "./ArrangeClasses";
import { useCookie } from "react-use";
import axios from "axios";
import "./rules.css";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
import JoinClass from "./JoinClass";
import { ApiBaseURL } from "../../../services/config/Endpoints";
export default function WhereStart(counter) {
  const [loggedIn] = useCookie("maang");
  const [showContent, setShowContent] = useState(true);

  const handleAgreeAndNext = async () => {
    const formDataRules = new FormData();
    formDataRules.append("count", 5);

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

  return (
    <div>
      {showContent ? (
        <div className="custombox rounded-lg shadow-xl text-center lg:text-left">
        <div className="flex flex-wrap -mx-4 gap-y-1">
         <div className="md:w-6/12 w-full px-4 custombox-left">
           <div className="text-gray-700 text-3xl title-text font-semibold font-['Outfit']">
           Where to start
           </div>
           <span className="mx-auto text-left">
             <div className="text-sky-500 text-[1.2rem] font-semibold font-['Outfit']">
             Prepare the upcoming topic before a day, to avoid last minute rush.
             </div>
           </span>
           <p className="mt-2 text-gray-600"> At MAANG Careers, we strictly discourage basic or unprofessional teaching. Follow the guidelines below for improved teaching quality.
           </p>
         </div>
         <div className="md:w-6/12 w-full px-4 custombox-right">
              <img src="/images/start.png" alt="" className="controlimgsize inline-block max-w-full" />
             <br />
         </div>
         <div className="md:w-12/12 w-full px-4">
           <div className="text-gray-600 text-base font-normal font-['Outfit']">
             <p className="text-gray-600"> Visit the Courses tab to review the syllabus, then head to the Teaching tab to solve, prepare, and revise all the questions for class explanations. Ensure thorough preparation before each class to avoid last-minute rush and maintain a professional appearance.</p>
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
          <JoinClass />
        </div>
      )}
    </div>
  );
}
