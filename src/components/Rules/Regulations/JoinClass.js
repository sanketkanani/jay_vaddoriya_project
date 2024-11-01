import React, { useState } from "react";
import { useCookie } from "react-use";
import axios from "axios";
import "./rules.css";
import RecordClass from "./RecordClass";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
export default function JoinClass() {
  const [loggedIn] = useCookie("maang");
  const [showContent, setShowContent] = useState(true);

  const handleAgreeAndNext = async () => {
    const formDataRules = new FormData();
    formDataRules.append("count", 7);

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
           Join the class before 10 min and the accept the student invitations on google meets
           </div>
           <p className="text-gray-600"> At MAANG Careers, punctuality is paramount. Always be prepared and join the class ahead of time to set a professional tone.
           </p>
         </div>
         <div className="md:w-6/12 w-full px-4 custombox-right">
              <img src="/images/rename.png" alt="" className="controlimgsize inline-block max-w-full" />
             <br />
         </div>
         <div className="md:w-12/12 w-full px-4 mt-4">
           <div className="text-gray-600 text-base font-normal font-['Outfit']">
             <p className="text-gray-600"> Always be ready and join the class 10 minutes early. Ensure you are well-prepared and maintain professionalism throughout. Adhere strictly to our guidelines to uphold the quality of teaching. Accept student invitations on Google Meets promptly and engage actively. Your commitment to these practices ensures a seamless and productive learning environment, reflecting our high standards and dedication to excellence in education.</p>
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
          <RecordClass />
        </div>
      )}
    </div>
  );
}
