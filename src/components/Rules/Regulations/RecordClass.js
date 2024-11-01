import React, { useState } from "react";
import axios from "axios";
import "./rules.css";
import { useCookie } from "react-use";
import CertifyWeek from "./CertifyWeek";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";

export default function RecordClass() {
  const [loggedIn] = useCookie("maang");
  const [showContent, setShowContent] = useState(true);

  const handleAgreeAndNext = async () => {
    const formDataRules = new FormData();
    formDataRules.append("count", 8);

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
          <img src="/images/record.png" alt="" className="controlimgsize inline-block max-w-full" />
             <br />
         </div>
         <div className="md:w-6/12 w-full px-4 custombox-right">
           <div className="text-gray-700 text-3xl title-text font-semibold font-['Outfit']">
           Make sure to record the classes
           </div>
           <p className="text-gray-600">Mentors, please follow the instructions below clearly to ensure quality and professionalism in all classes.</p>
         </div>
         <div className="md:w-12/12 w-full px-4">
           <div className="text-gray-600 text-base font-normal font-['Outfit']">
             <p className="text-gray-600">At MAANG Careers, mentors must always record their classes. These recordings allow management to conduct quality checks and provide feedback. If teaching quality is unsatisfactory, management can revoke your contract. Any misbehaviour, rudeness, or failure to respond professionally to student queries may result in legal action. Please maintain professional behaviour throughout the class and ensure all sessions are recorded.</p>
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
          <CertifyWeek />
        </div>
      )}
    </div>
  );
}
