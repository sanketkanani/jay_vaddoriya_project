import React, { useState } from "react";
import { useCookie } from "react-use";
import Terms from "./Terms";
import axios from "axios";
import "./rules.css";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
export default function CertifyWeek() {
  const [loggedIn] = useCookie("maang");
  const [showContent, setShowContent] = useState(true);

  const handleAgreeAndNext = async () => {
    const formDataRules = new FormData();
    formDataRules.append("count", 9);

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

    // const apiMessageRules = responseRules.data.message;

    setShowContent(false);
  };

  return (
    <div>
      {showContent ? (
        <div className="custombox rounded-lg shadow-xl text-center lg:text-left">
        <div className="flex flex-wrap -mx-4 gap-y-1">
         <div className="md:w-6/12 w-full px-4 custombox-left">
           <div className="text-gray-700 text-3xl title-text font-semibold font-['Outfit']">
           Complete all classes and release certificates from the courses tab.
           </div>
           <p className="text-gray-600"> Mentors, please adhere to the following instructions carefully to maintain smooth and hassle-free class conduction. </p>
         </div>
         <div className="md:w-6/12 w-full px-4 custombox-right">
              <img src="/images/certify.png" alt="" className="controlimgsize inline-block max-w-full" />
             <br />
         </div>
         <div className="md:w-12/12 w-full px-4 mt-6">
           <div className="text-gray-600 text-base font-normal font-['Outfit']">
             <p className="text-gray-600"> Please ensure you complete all classes for the assigned batches. After the final class of a batch, go to the Courses tab and raise a request to the Admin to 'close this batch from management side and release the certificates to students.' It is the mentor's responsibility to follow this process after every batch completion to help management track everything properly.</p>
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
          <Terms />
        </div>
      )}
    </div>
  );
}
