import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./rules.css";
import { useCookie } from "react-use";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
import axios from "axios";
import { useRules } from "../../../utils/RulesContext";
import { ApiBaseURL } from "../../../services/config/Endpoints";

export default function Terms() {
  const navigate = useNavigate();

  const [loggedIn] = useCookie("maang");
  const [showContent, setShowContent] = useState(true);
  const { setIsRulesPage } = useRules();

  const handleSubmit = async () => {
    localStorage.removeItem("appPath");
    setIsRulesPage(false);
    if (loggedIn) {
      try {
        const formDataRules = new FormData();
        formDataRules.append("count", 10);

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

        const responsePageVisit = await axios.post(
          `${ApiBaseURL}/mentor-management/page-visit-count/`,
          null,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );

        // console.log(responsePageVisit.data);

        setShowContent(false);
        navigate("/mentor", { replace: true });
        setShowContent(false);
      } catch (error) {
        // console.error("Error hitting API:", error);
      }
    }
  };

  return (
    <div>
      <div className="custombox rounded-lg shadow-xl text-center lg:text-left">
        <div className="flex flex-wrap -mx-4 gap-y-1">
          <div className="md:w-6/12 w-full px-4 custombox-left">
            <img src="/images/terms.png" alt="" className="controlimgsize inline-block max-w-full" />
          </div>

          <div className="md:w-6/12 w-full px-4 custombox-right">
            <div className="text-gray-700 text-3xl title-text font-semibold font-['Outfit']">
              Privacy Terms
            </div>
            <div className="alineli text-gray-600 text-xl font-normal font-['Outfit']">
              <li>
                {" "}
                Personal interactions with students is strictly prohibited and its against the company policy.
              </li>

              <li>
                {" "}
                Company internal data cannot be collected or shared with external parties.              </li>
            </div>
          </div>

          <div className="md:w-12/12 mt-1 w-full px-4 mt-4">
            <div className="text-gray-600 text-base font-normal font-['Outfit']">
              <p>Mentors must not reveal or store class recordings, notes, or any internal data on personal devices. In such cases, MAANG Careers retains the sole right to take legal action. By acknowledging this, mentors agree to follow the rules and accept any legal consequences for violations. It is crucial to maintain privacy and adhere to company policies to ensure a secure and professional learning environment. Any breach of these terms will be subject to strict legal measures to protect the integrity of our educational services and the privacy of our students.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 text-center lg:text-right">
          <a className="inline-block nwbtn px-5 py-2.5 bg-emerald-400 rounded-[5px] text-white text-xl font-medium font-['Outfit']"
            onClick={handleSubmit}
          >
            Finished
          </a>
        </div>
      </div>
    </div>
  );
}
