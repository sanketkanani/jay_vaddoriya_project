import React from "react";
import "./ProgressCard/index.css";
import MentorChart from "./ProgressCard/MentorChart";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const progressBar = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
};

export default function MentorPerformanceChart({ batchInfo }) {
    // console.log("BATCH INFO", batchInfo);
  const renderCharts = () => {
    if (Array.isArray(batchInfo) && batchInfo.length > 0) {
      if (batchInfo.length === 1) {
        return (
          <div
            className="bg-white p-2.5 rounded-lg flex flex-col items-center xl:h-auto h-full"
            style={{ boxShadow: "0px 5px 25px 0px rgba(62, 144, 156, 0.10)" }}
          >
            <div className="semicircle-map w-full">
              <div className="flex flex-col">
                <span
                  className="text-xl font-semibold"
                  style={{ color: "#595F6E" }}
                >
                  My Progress
                </span>
                <span
                  className="text-sm font-light mb-5"
                  style={{ color: "#595F6E" }}
                >
                  {batchInfo[0].courseName}
                </span>
                <span
                  className="text-sm font-light mb-5"
                  style={{ color: "#595F6E" }}
                >
                  Batch ID: {batchInfo[0].batchId}
                </span>

              </div>
              <MentorChart batchInfo={batchInfo[0]} />
            </div>
          </div>
        );
      } else {
        return (
          <>
            <div className="p-4 rounded-lg bg-white">
              <div className="Outfit text-xl font-semibold text-slate-600">
                My Progress
              </div>
              <Slider {...progressBar}>
                {batchInfo.map((_, index) => (
                  <div key={index}>
                    <div className="xl:h-auto h-full">
                      <div className="semicircle-map">
                        <div className="mb-3">
                          <span className="text-gray-600 text-sm font-light font-['Outfit']" >
                            {batchInfo[index].courseName}
                          </span>
                          <br/>
                          <span className="text-gray-600 text-sm font-light font-['Outfit']">
                            Batch ID: {batchInfo[index].batchId}
                          </span>
                        </div>
                        <MentorChart batchInfo={batchInfo[index]} />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </>
        );
      }
    } else {
      return <div>No progress data available.</div>;
    }
  };

  return renderCharts();
}
