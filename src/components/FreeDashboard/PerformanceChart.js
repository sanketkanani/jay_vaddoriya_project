// import React from "react";
// import "./ProgressCard/index.css";

// import Chart from "./ProgressCard/Chart";

// export default function PerformanceChart({
//   myProgress,
//   quizProgress,
//   mockProgress,
//   batchInfo
// }) {
//   console.log("quizProgress-------",quizProgress);
//   console.log("mockProgress-------",mockProgress);
//   console.log("BatchInfo-------",batchInfo);

//   return (
//       <div
//         className="bg-white p-2.5 rounded-lg flex flex-col items-center xl:h-auto h-full"
//         style={{
//           boxShadow: "0px 5px 25px 0px rgba(62, 144, 156, 0.10)",
//         }}
//       >
//         <div className="semicircle-map">
//           <div className="flex flex-col">
//             <span
//               className="text-xl font-semibold"
//               style={{ color: "#595F6E" }}
//             >
//               My Progress
//             </span>
//             <span
//               className="text-sm font-light mb-5"
//               style={{ color: "#595F6E" }}
//             >
//               Keep it up, You are doing great..
//             </span>
//           </div>
//           <Chart
//             myProgress={myProgress}
//             quizProgress={quizProgress}
//             mockProgress={mockProgress}
//             QuizTitle="Quiz"
//             MockTitle="Mock"
//             batchInfo={batchInfo}
//           />
//           {/* <Chart
//             myProgress={myProgress}
//             mockProgress={mockProgress}
//             title="Mock"
//           /> */}
//         </div>
//       </div>
//   );
// }

import React from "react";
import "./ProgressCard/index.css";
import Chart from "./ProgressCard/Chart";
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

export default function PerformanceChart({
  myProgress,
  quizProgress,
  mockProgress,
  batchInfo,
}) {
  const renderCharts = () => {
    if (
      Array.isArray(quizProgress) &&
      Array.isArray(mockProgress) &&
      Array.isArray(batchInfo) &&
      quizProgress.length > 0 &&
      mockProgress.length > 0 &&
      batchInfo.length > 0
    ) {
      if (quizProgress.length === 1) {
        return (
          <div className="semicircle-map w-full">
            <span
              className="text-sm font-light mb-5"
              style={{ color: "#595F6E" }}
            >
              {quizProgress[0].name}
            </span>
            <Chart
              myProgress={myProgress}
              quizProgress={quizProgress[0]}
              mockProgress={mockProgress[0]}
              QuizTitle={`Quiz`}
              MockTitle={`Mock`}
              batchInfo={batchInfo[0]}
            />
          </div>
        );
      } else {
        // If there is more than one set of data, render a carousel of charts

        return (
          <>
            <Slider {...progressBar}>
              {quizProgress.map((_, index) => (
                <div key={index}>
                  <div className="xl:h-auto h-full">
                    <div className="semicircle-map">
                      <div className="mb-3">
                        <span className="text-gray-600 text-sm font-light font-['Outfit']">
                          {quizProgress[index].name}
                        </span>
                      </div>
                      <Chart
                        myProgress={myProgress}
                        quizProgress={quizProgress[index]}
                        mockProgress={mockProgress[index]}
                        QuizTitle={`Quiz`}
                        MockTitle={`Mock`}
                        batchInfo={batchInfo[index]}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </>
        );
      }
    } else {
      return <div className="text-left">No progress data available.</div>;
    }
  };

  return (
    <div
      className="bg-white p-2.5 rounded-lg flex flex-col items-center  h-[430px] "
      style={{ boxShadow: "0px 5px 25px 0px rgba(62, 144, 156, 0.10)" }}
    >
      <div className="p-4 rounded-lg bg-white">
        <div className="Outfit text-xl font-semibold text-slate-600">
          My Progress
        </div>
      </div>{" "}
      {renderCharts()}
    </div>
  );
}
