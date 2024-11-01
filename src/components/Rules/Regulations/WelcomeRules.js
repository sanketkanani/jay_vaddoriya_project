import React, { useState } from "react";
import axios from "axios";
import "./rules.css";
import BatchesType from "./BatchesType";
import { useCookie } from "react-use";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
import { useRules } from "../../../utils/RulesContext";
import { ApiBaseURL } from "../../../services/config/Endpoints";
export default function WelcomeRules() {
  const [loggedIn] = useCookie("maang");
  const [showContent, setShowContent] = useState(true);
  const [counter, setCounter] = useState(0);
  const { setIsRulesPage } = useRules(false);

  const handleAgreeAndNext = async () => {
    localStorage.setItem("appPath", "rules");
    setIsRulesPage(true);
    const formDataRules = new FormData();
    formDataRules.append("count", 2);

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

  const handleGoBack = () => {
    setShowContent(true);
  };

  return (
    <div>
      {showContent ? (
        <div className="custombox rounded-lg shadow-xl text-center lg:text-left">
          <div className="mb-8 text-gray-700 text-3xl font-semibold font-['Outfit']">
            Welcome to Maang Careers
          </div>

          <div className="flex flex-wrap -mx-4 gap-y-5">
            <div className="md:w-6/12 w-full px-4 custombox-left">
              <img
                src="/images/welcome2.png"
                alt=""
                className="inline-block max-w-full controlimgsize"
              />
            </div>
            <div className="md:w-6/12 w-full px-4 custombox-right">
              <div className="text-gray-700 text-3xl title-text font-semibold font-['Outfit']">
                Teaching quality is our top priority{" "}
              </div>
              <div className="text-gray-600 text-base font-normal font-['Outfit']">
                <p className="text-gray-600">
                Excel in providing outstanding education. Dedication and preparation are key. Clear delivery ensures success. Uphold our high standards.
                </p>
              </div>
            </div>
            <div className="md:w-12/12 w-full px-4">
              <div className="text-gray-600 text-base font-normal font-['Outfit']">
                <p className="text-gray-600"> Each lesson and feedback must show our commitment to quality. Stay dedicated, be precise, and maintain clarity. Together, we achieve greatness. </p>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center lg:text-right">
            <a
              className="inline-block nwbtn px-5 py-2.5 bg-emerald-400 rounded-[5px] text-white text-xl font-medium font-['Outfit']"
              onClick={handleAgreeAndNext}
            >
              Agree & Next
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <BatchesType />
        </div>
      )}
    </div>
  );
}
