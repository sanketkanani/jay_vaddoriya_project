import React, { useState } from "react";
import JoinClass from "./JoinClass";
import { useCookie } from "react-use";
import axios from "axios";
import "./rules.css";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
export default function ArrangeClasses() {
  const [loggedIn] = useCookie("maang");
  const [showContent, setShowContent] = useState(true);

  const handleAgreeAndNext = async () => {
    const formDataRules = new FormData();
    formDataRules.append("count", 6);

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
              <img src="/images/arrange2.png" alt="" className="controlimgsize inline-block max-w-full" />
             <br />
         </div>
         <div className="md:w-6/12 w-full px-4 custombox-right">
           <div className="text-gray-700 text-3xl title-text font-semibold font-['Outfit']">
           Arrange the classes for a batch assigned!
           </div>
           <span className="mx-auto text-left">
             <div className="w-[305px] mt-1 text-sky-500 text-[1.2rem] font-semibold font-['Outfit']">
             Set link for classes using Google meets and update it in your timetable section.
             </div>
           </span>
         </div>
         <div className="md:w-12/12 w-full px-4">
           <div className="text-gray-600 text-base font-normal font-['Outfit']">
             <p className="text-gray-600"> Lorem ipsum dolor sit amet consectetur. Tristique nec amet
               amet purus. Posuere nisl enim felis turpis volutpat molestie
               ultricies. Lorem ipsum dolor sit amet consectetur. Tristique nec amet amet purus. Posuere nisl enim felis turpis volutpat molestie ultricies.</p>
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
