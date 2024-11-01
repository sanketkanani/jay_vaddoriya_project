// import Dayjs from "dayjs";
// import React, { useEffect, useState } from 'react'
// import SemiCircleProgressBar from "react-progressbar-semicircle";

// const Chart = ({ myProgress,quizProgress,mockProgress,title }) => {
//   const { classesCompleted = 0, classesRemaining = 0, totalClass = 0, endDate, startDate } = myProgress;

//   const [screenSize, setScreenSize] = useState(getCurrentDimension());

// console.log("quizProgress", quizProgress);
//   function getCurrentDimension() {
//     return {
//       width: window.innerWidth,
//       height: window.innerHeight
//     }
//   }

//   useEffect(() => {
//     const updateDimension = () => {
//       setScreenSize(getCurrentDimension())
//     }
//     window.addEventListener('resize', updateDimension);

//     return (() => {
//       window.removeEventListener('resize', updateDimension);
//     })
//   }, [screenSize])

//   const getPercentageFromData = (progressData) => {
//     const avgScore = parseFloat(progressData?.avg_score);
//     if (!isNaN(avgScore)) {
//       return Math.ceil(avgScore);
//     } else {
//       return 0;
//     }
//   };

//   const percentage = quizProgress ? getPercentageFromData(quizProgress) : mockProgress ? getPercentageFromData(mockProgress) : 0;

//   const getProgressBarColor = () => {
//     return percentage < 40 ? "#F39F24" : "#35C69D";
//   };

//   return (
//     <div className="pb-6 w-full">
//       <div className="chart-wrapper">
//         <div>
//           <div className="flex flex-col items-center justify-center performance-chart">
//           <span
//               className="text-xl font-semibold"
//               style={{ color: "#595F6E" }}
//             >
//               {title}
//             </span>

//           <SemiCircleProgressBar
//               percentage={percentage}
//               stroke={getProgressBarColor()}
//               background={"rgba(17, 142, 222, 0.05)"}
//               showPercentValue
//               strokeWidth={10}
//               diameter={screenSize.width > 700 ? 150 : 200}
//             />
//           </div>
//           {/* <span
//             className="chart-title font-normal text-md text-center w-auto pt-1 pb-3.5"
//             style={{ color: "#727885" }}
//           >
//             Interview Preparation Course
//           </span> */}
//         </div>
//         {/* <div
//           className="flex items-center rounded-lg justify-between performance-overview"
//           style={{
//             background: "rgba(17, 142, 222, 0.05)",
//             padding: "9px 20px 11px 20px",
//           }}
//         >
//           <div className="flex flex-col items-center">
//             <span className="font-bold	text-xl" style={{ color: "#35C69D" }}>
//               {classesCompleted}
//             </span>
//             <span className="font-light text-xs" style={{ color: "#727885" }}>
//               Completed Classes
//             </span>
//           </div>
//           <div className="flex flex-col items-center">
//             <span className="font-bold	text-xl" style={{ color: "#F39F24" }}>
//               {classesRemaining}
//             </span>
//             <span className="font-light text-xs" style={{ color: "#727885" }}>
//               Classes Remaining
//             </span>
//           </div>
//         </div> */}
//       </div>
//       <div className="chart-info-wrapper">
//         {/* <div className="flex items-center justify-between mt-3.5">
//           <div className="flex items-center">
//             <div
//               className="rounded flex items-center justify-center w-10 h-10 mr-2.5 date-bg-box"
//               style={{
//                 borderRadius: "5px",
//                 border: "1px solid rgba(64, 194, 212, 0.20)",
//                 background: "rgba(64, 194, 212, 0.05)",
//               }}
//             >
//               <img src="/images/sidebarsvgs/start-date.svg" alt="start date" />
//             </div>
//             <div className="flex flex-col justify-center">
//               <span
//                 className="font-light text-xs"
//                 style={{ color: "#727885" }}
//               >
//                 Start Date
//               </span>
//               <span
//                 className="text-sm font-medium"
//                 style={{ color: "#595F6E" }}
//               >
//                 {startDate ? Dayjs(startDate).format("DD-MMM-YYYY"):'-'}
//               </span>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <div
//               className="rounded flex items-center justify-center w-10 h-10 mr-2.5 date-bg-box"
//               style={{
//                 borderRadius: "5px",
//                 border: "1px solid rgba(242, 74, 112, 0.20)",
//                 background: "rgba(242, 74, 112, 0.05)",
//               }}
//             >
//               <img src="/images/sidebarsvgs/end-date.svg" alt="end date" />
//             </div>
//             <div className="flex flex-col justify-center">
//               <span
//                 className="font-light text-xs"
//                 style={{ color: "#727885" }}
//               >
//                 End Date
//               </span>
//               <span
//                 className="text-sm font-medium"
//                 style={{ color: "#595F6E" }}
//               >
//                 {endDate ?Dayjs(endDate).format("DD-MMM-YYYY"):'-'}
//               </span>
//             </div>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Chart;

import Dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import SemiCircleProgressBar from "react-progressbar-semicircle";

const Chart = ({
  quizProgress,
  mockProgress,
  QuizTitle,
  MockTitle,
  batchInfo,
}) => {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  const getPercentageFromData = (progressData) => {
    const avgScore = parseFloat(
      progressData?.avgScore || progressData?.classPercentage
    );

    if (!isNaN(avgScore)) {
      return Math.round(avgScore);
    } else {
      return 0;
    }
  };

  const quizPercentage = getPercentageFromData(quizProgress);
  const mockPercentage = getPercentageFromData(mockProgress);
  const studAttendPercentage = getPercentageFromData(batchInfo);

  const getProgressBarColor = (percentage) => {
    return percentage < 40 ? "#F39F24" : "#35C69D";
  };
  // if (batchInfo) {
  //   return (
  //     <div className="pb-6 w-full">
  //       <div className="chart-wrapper">
  //         <div>
  //           <div className="flex flex-col items-center justify-center performance-chart mb-2">
  //             <SemiCircleProgressBar
  //               percentage={studAttendPercentage}
  //               stroke={getProgressBarColor(studAttendPercentage)}
  //               background={"rgba(17, 142, 222, 0.05)"}
  //               showPercentValue
  //               strokeWidth={10}
  //               diameter={screenSize.width > 700 ? 150 : 200}

  //             />
  //           </div>

  //           <span
  //             className="text-xl font-semibold"
  //             style={{ color: "#595F6E" }}
  //           >
  //             Classes Completed
  //           </span>
  //         </div>
  //         <div
  //           className="flex items-center rounded-lg justify-between performance-overview"
  //           style={{
  //             background: "rgba(17, 142, 222, 0.05)",
  //             padding: "9px 20px 11px 20px",
  //           }}
  //         >
  //           <div className="flex flex-col items-center">
  //             <span className="font-bold	text-xl" style={{ color: "#35C69D" }}>
  //               {batchInfo.completedClasses}
  //             </span>
  //             <span className="font-light text-xs" style={{ color: "#727885" }}>
  //               Completed Classes
  //             </span>
  //           </div>
  //           <div className="flex flex-col items-center">
  //             <span className="font-bold	text-xl" style={{ color: "#F39F24" }}>
  //               {batchInfo.remainingClasses}
  //             </span>
  //             <span className="font-light text-xs" style={{ color: "#727885" }}>
  //               Classes Remaining
  //             </span>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="chart-info-wrapper">
  //         <div className="flex items-center justify-between mt-3.5">
  //           <div className="flex items-center">
  //             <div
  //               className="rounded flex items-center justify-center w-10 h-10 mr-2.5 date-bg-box"
  //               style={{
  //                 borderRadius: "5px",
  //                 border: "1px solid rgba(64, 194, 212, 0.20)",
  //                 background: "rgba(64, 194, 212, 0.05)",
  //               }}
  //             >
  //               <img src="/images/sidebarsvgs/start-date.svg" alt="start date" />
  //             </div>
  //             <div className="flex flex-col justify-center">
  //               <span
  //                 className="font-light text-xs"
  //                 style={{ color: "#727885" }}
  //               >
  //                 Start Date
  //               </span>
  //               <span
  //                 className="text-sm font-medium"
  //                 style={{ color: "#595F6E" }}
  //               >
  //                 {batchInfo.startDate ? Dayjs(batchInfo.startDate).format("DD-MMM-YYYY"):'-'}
  //                 {console.log("Start Date:-----------------------", batchInfo.startDate)}
  //               </span>
  //             </div>
  //           </div>
  //           <div className="flex items-center">
  //             <div
  //               className="rounded flex items-center justify-center w-10 h-10 mr-2.5 date-bg-box"
  //               style={{
  //                 borderRadius: "5px",
  //                 border: "1px solid rgba(242, 74, 112, 0.20)",
  //                 background: "rgba(242, 74, 112, 0.05)",
  //               }}
  //             >
  //               <img src="/images/sidebarsvgs/end-date.svg" alt="end date" />
  //             </div>
  //             <div className="flex flex-col justify-center">
  //               <span
  //                 className="font-light text-xs"
  //                 style={{ color: "#727885" }}
  //               >
  //                 End Date
  //               </span>
  //               <span
  //                 className="text-sm font-medium"
  //                 style={{ color: "#595F6E" }}
  //               >
  //                 {batchInfo.endDate ? Dayjs(batchInfo.endDate).format("DD-MMM-YYYY"):'-'}
  //               </span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // } else {

  return (
    <div className="w-full">
      <div className="chart-wrapper">
        <div className="w-full">
        {quizProgress && (
          <div className="mb-4">
            <div className="flex flex-col items-center justify-center performance-chart">
              <div className="text-xl font-semibold text-[#595F6E]">
                {QuizTitle}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SemiCircleProgressBar
                percentage={quizPercentage}
                stroke={getProgressBarColor(quizPercentage)}
                background={"rgba(17, 142, 222, 0.05)"}
                showPercentValue
                strokeWidth={10}
                diameter={screenSize.width > 700 ? 100 : 100}
              />
                <div className="w-full flex items-center rounded-lg justify-between gap-1 performance-overview px-2 py-1 bg-sky-500 bg-opacity-5">
                  <div className="text-left">
                    <div className="font-bold text-xl text-[#35C69D]">
                      {quizProgress.weekRunning}
                    </div>
                    <div
                      className="font-light text-xs text-[#727885]" >
                      Unlocked Weeks
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-xl text-[#F39F24]">
                      {quizProgress.weekAttempt}
                    </div>
                    <div
                      className="font-light text-xs text-[#727885]">
                      Attempted Weeks
                    </div>
                  </div>
                </div>
            </div>
          </div>
        )}
          
          {mockProgress && (
            <div className="mb-5">
              <div className="flex flex-col items-center justify-center performance-chart">
                <div className="text-xl font-semibold text-[#595F6E]">
                  {MockTitle}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <SemiCircleProgressBar
                  percentage={mockPercentage}
                  stroke={getProgressBarColor(mockPercentage)}
                  background={"rgba(17, 142, 222, 0.05)"}
                  showPercentValue
                  strokeWidth={10}
                  diameter={screenSize.width > 700 ? 100 : 100}
                />              
                <div className="w-full flex items-center rounded-lg justify-between gap-1 performance-overview px-2 py-1 bg-sky-500 bg-opacity-5">
                  <div className="text-left">
                      <div
                        className="font-bold text-xl text-[#35C69D]">
                        {mockProgress.weekRunning}
                      </div>
                      <div
                        className="font-light text-xs text-[#727885]">
                        Unlocked Weeks
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-xl text-[#F39F24]">
                        {mockProgress.weekAttempt}
                      </div>
                      <div
                        className="font-light text-xs text-[#727885]">
                        Attempted Weeks
                      </div>
                    </div>
                </div>
              </div>
            </div>
          )}
          
          {batchInfo && (
            <div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-xl font-semibold text-[#595F6E]">Classes</div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <div className="flex flex-col items-center justify-center performance-chart w-[100px]">
                    <SemiCircleProgressBar
                      percentage={studAttendPercentage}
                      stroke={getProgressBarColor(studAttendPercentage)}
                      background={"rgba(17, 142, 222, 0.05)"}
                      showPercentValue
                      strokeWidth={10}
                      diameter={screenSize.width > 700 ? 100 : 100}
                    />
                  </div>

                  <div className="text-gray-700 text-xs font-normal font-['Outfit']">
                    Completed
                  </div>
                </div>

                <div className="w-full flex items-center rounded-lg justify-between gap-1 performance-overview px-2 py-1 bg-sky-500 bg-opacity-5">
                  <div className="w-6/12 text-left">
                    <div className="font-bold text-xl text-[#35C69D]">
                      {batchInfo.completedClasses}
                    </div>
                    <div className="font-light text-xs">Completed Classes</div>
                  </div>
                  <div className="w-6/12 text-left">
                    <div className="font-bold	text-xl text-[#F39F24]">
                      {batchInfo.remainingClasses}
                    </div>
                    <div className="font-light text-xs">Classes Remaining</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="chart-info-wrapper">
                  <div className="w-full flex items-center justify-between mt-3.5 gap-3">
                    <div className="w-6/12 flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 mr-1.5 date-bg-box bg-teal-50 border border-solid border-teal-200 rounded-md"
                      >
                        <img
                          src="/images/sidebarsvgs/start-date.svg"
                          alt="start date"
                        />
                      </div>
                      <div className="text-left">
                        <div className="font-light text-xs">
                          Start Date
                        </div>
                        <div className="text-sm font-medium">
                          {batchInfo.startDate
                            ? Dayjs(batchInfo.startDate).format("DD-MMM-YYYY")
                            : "-"}
                        </div>
                      </div>
                    </div>
                    <div className="w-6/12 flex items-center">
                      <div
                        className="flex items-center justify-center w-10 h-10 mr-2.5 date-bg-box bg-red-50 border border-solid red-teal-200 rounded-md">
                        <img
                          src="/images/sidebarsvgs/end-date.svg"
                          alt="end date"
                        />
                      </div>
                      <div className="text-left">
                        <div
                          className="font-light text-xs"
                        >
                          End Date
                        </div>
                        <div
                          className="text-sm font-medium"
                        >
                          {batchInfo.endDate
                            ? Dayjs(batchInfo.endDate).format("DD-MMM-YYYY")
                            : "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          )}
        </div>
      </div>
      <div className="chart-info-wrapper">
        {/* Additional information if needed */}
      </div>
    </div>
  );
  // }
};

export default Chart;
