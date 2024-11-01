// import React from "react";
// import "../../Sidebar/sidebar.css";

// const DisplayNotice = ({notices}) => {
//   return (
//     <div
//       className="notice-content bg-white mt-6 rounded-xl p-6"
//       style={{
//         boxShadow: "0px 5px 25px 0px rgba(62, 144, 156, 0.10)",
//         background: "#FFF",
//         borderRadius: "15px",
//         maxHeight: "250px",
//         overflowY: "auto",
//       }}
//     >
//       <span className="Outfit text-xl font-semibold text-slate-600">
//         Notice Board
//       </span>
//       <div className="flex flex-col">
//         {notices.map((notice, idx) => (
//           <div className="notice-info flex" key={idx}>
//             <div className="notice-img w-0/6 m-3 ml-0">
//               <div
//                 className={`notice-img w-20 h-20 bg-orange-100 flex justify-center ${
//                   idx % 2 === 0 ? "bg-orange-100" : "bg-green-100"
//                 }`}
//               >
//                 <h1
//                   className={`notice-id mt-6 font-bold text-xl  ${
//                     idx % 2 === 0 ? "text-orange-400" : "text-green-400"
//                   }`}
//                 >
//                   {idx + 1}
//                 </h1>
//               </div>
//             </div>
//             <div className="notice-wrapper w-6/6 mt-4">
//               <span className="notice-text Outline text-slate-700 text-base font-medium">
//                 {notice.title}
//               </span>{" "}
//               <br />
//               <span
//                 className="notice-desc text-slate-600"
//                 style={{ fontSize: "14px", lineHeight: "19px" }}
//               >
//                 {notice.content}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DisplayNotice;

// import React, { useEffect, useRef, useState } from "react";
// import { studentContext } from "../../../Student/context";
// import { useContext } from "react";
// import "../../Sidebar/sidebar.css";

// const DisplayNotice = ({ notices }) => {
//   const { selectedId } = useContext(studentContext);
//   const highlightedNoticeRef = useRef(null);
//   const [highlighted, setHighlighted] = useState(false);

//   // useEffect(() => {
//   //   if (
//   //     notices &&
//   //     notices.length > 0 &&
//   //     selectedId !== null &&
//   //     selectedId >= 0 &&
//   //     selectedId < notices.length
//   //   ) {
//   //     // Scroll to the highlighted notice within the component
//   //     const container = document.querySelector(".notice-content");
//   //     const offsetTop =
//   //       highlightedNoticeRef.current.offsetTop - container.offsetTop;

//   //     container.scrollTo({
//   //       top: offsetTop,
//   //       behavior: "smooth",
//   //     });

//   //     if (!highlighted) {
//   //       highlightedNoticeRef.current.style.backgroundColor = "#CDFBDC";
//   //       setHighlighted(true);
//   //       const timeoutId = setTimeout(() => {
//   //         if (highlightedNoticeRef.current) {
//   //           highlightedNoticeRef.current.style.backgroundColor = "";
//   //           setHighlighted(false);
//   //         }
//   //       }, 2000);
//   //       return () => clearTimeout(timeoutId);
//   //     }
//   //   }
//   // }, [notices, selectedId, highlighted]);

//   useEffect(() => {
//     if (
//       notices &&
//       notices.length > 0 &&
//       selectedId !== null &&
//       selectedId >= 0 &&
//       selectedId < notices.length
//     ) {
//       const container = document.querySelector(".notice-content");
//       const offsetTop =
//         highlightedNoticeRef.current.offsetTop - container.offsetTop;

//       container.scrollTo({
//         top: offsetTop,
//         behavior: "smooth",
//       });
//       highlightedNoticeRef.current.style.backgroundColor = "#CDFBDC";
//       setHighlighted(true);

//       const timeoutId = setTimeout(() => {
//         if (highlightedNoticeRef.current) {
//           highlightedNoticeRef.current.style.backgroundColor = "";
//           setHighlighted(false);
//         }
//       }, 2000);
//       console.log("Selected Notice Content:", notices[selectedId].content);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [notices, selectedId, highlighted]);

//   useEffect(() => {
//     console.log("NOTICES", notices);
//   }, [selectedId, notices]);

//   return (
//     <div
//       className="notice-content bg-white mt-6 rounded-xl p-6"
//       style={{
//         boxShadow: "0px 5px 25px 0px rgba(62, 144, 156, 0.10)",
//         background: "#FFF",
//         borderRadius: "15px",
//         maxHeight: "250px",
//         overflowY: "auto",
//       }}
//     >
//       <span className="Outfit text-xl font-semibold text-slate-600">
//         Notice Board
//       </span>
//       <div className="flex flex-col">
//         {notices.map((notice, idx) => (
//           <div
//             className={`notice-info flex ${
//               selectedId === notice.id ? "highlighted-notice" : ""
//             }`}
//             key={notice.id}
//             ref={selectedId === notice.id ? highlightedNoticeRef : null}
//             onClick={() => {
//               console.log("Comparison result:", selectedId === notice.id);
//               console.log("Clicked on notice with id:", notice.id);
//               console.log("Selected ID:", selectedId);
//             }}
//           >
//             <div className="notice-img w-0/6 m-3 ml-0">
//               <div
//                 className={`notice-img w-20 h-20 bg-orange-100 flex justify-center ${
//                   idx % 2 === 0 ? "bg-orange-100" : "bg-green-100"
//                 }`}
//               >
//                 <h1
//                   className={`notice-id mt-6 font-bold text-xl  ${
//                     idx % 2 === 0 ? "text-orange-400" : "text-green-400"
//                   }`}
//                 >
//                   {idx + 1}
//                 </h1>
//               </div>
//             </div>
//             <div className="notice-wrapper w-6/6 mt-4">
//               <span className="notice-text Outline text-slate-700 text-base font-medium">
//                 {notice.title}
//               </span>{" "}
//               <br />
//               <span
//                 className="notice-desc text-slate-600"
//                 style={{ fontSize: "14px", lineHeight: "19px" }}
//               >
//                 {notice.content}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DisplayNotice;

// -----------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { studentContext } from "../../../Student/context";
import { useContext } from "react";
import "../../Sidebar/sidebar.css";
import "./freeNoticeBoard.css";

const DisplayNotice = ({ notices }) => {
  const { selectedNotificationId } = useContext(studentContext);

  // const [highlightedId, setHighlightedId] = useState(null);

  // useEffect(() => {
  //   if (
  //     notices &&
  //     notices.length > 0 &&
  //     selectedNotificationId !== null &&
  //     selectedNotificationId >= 0
  //   ) {
  //     const container = document.querySelector(".notice-content");
  //     const noticeElement = document.getElementById(`notice-${selectedNotificationId}`);

  //     if (noticeElement) {
  //       const offsetTop = noticeElement.offsetTop - container.offsetTop;

  //       container.scrollTo({
  //         top: offsetTop,
  //         behavior: "smooth",
  //       });

  //       // Highlight the notice
  //       setHighlightedId(selectedNotificationId);

  //       // Remove the highlight after 2 seconds
  //       const timeoutId = setTimeout(() => {
  //         setHighlightedId(null);
  //       }, 2000);

  //       // Clear the timeout on component unmount or when the next notification is selected
  //       return () => clearTimeout(timeoutId);
  //     }
  //   }
  // }, [notices, selectedNotificationId]);

  useEffect(() => {
    if (
      notices &&
      notices.length > 0 &&
      selectedNotificationId !== null &&
      selectedNotificationId >= 0
    ) {
      const container = document.querySelector(".notice-content");
      const noticeElement = document.getElementById(
        `notice-${selectedNotificationId}`
      );

      if (noticeElement) {
        const offsetTop = noticeElement.offsetTop - container.offsetTop;

        container.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        noticeElement.classList.add("highlighted-notice");

        setTimeout(() => {
          noticeElement.classList.remove("highlighted-notice");
        }, 2000);
      }
    }
  }, [selectedNotificationId]);

  // useEffect(() => {
  //   if (
  //     notices &&
  //     notices.length > 0 &&
  //     selectedNotificationId !== null &&
  //     selectedNotificationId >= 0
  //   ) {
  //     const container = document.querySelector(".notice-content");
  //     const noticeElement = document.getElementById(`notice-${selectedNotificationId}`);

  //     if (noticeElement) {
  //       const offsetTop = noticeElement.offsetTop - container.offsetTop;

  //       container.scrollTo({
  //         top: offsetTop,
  //         behavior: "smooth",
  //       });

  //       // Check if the class is not already present before adding it
  //       if (!noticeElement.classList.contains("highlighted-notice")) {
  //         noticeElement.classList.add("highlighted-notice");

  //         setTimeout(() => {
  //           noticeElement.classList.remove("highlighted-notice");
  //         }, 2000);
  //       }
  //     }
  //   }
  // }, [notices, selectedNotificationId]);

  return (
    <div className="notice-content bg-white mt-6 rounded-2xl shadow-[0px_5px_25px_0px_rgba(62,144,156,0.10)] max-h-[360px] overflow-y-auto">
      <h2 className="text-start notice-header text-xl font-semibold text-slate-600 p-5 pt-4">
        Notice Board
      </h2>
      <div className="flex flex-col text-left">
        {notices?.length < 0 ? (
          <h2 className="text-center text-sm font-semibold text-slate-600 p-5 pt-4">
            No Records Found
          </h2>
        ) : (
          notices.map((notice, idx) => (
            <div
              className={`notice-info px-5 py-3 flex ${
                selectedNotificationId === notice.id ? "highlighted-notice" : ""
              }`}
              key={notice.id}
              id={`notice-${notice.id}`}
              onClick={() => {
                // console.log("Comparison result:", selectedNotificationId === notice.id);
                // console.log("Clicked on notice with id:", notice.id);
              }}
            >
              <div className="notice-img w-0/6 mr-3">
                <div
                  className={`notice-img w-16 h-16 rounded flex justify-center items-center border border-solid ${
                    idx % 2 === 0
                      ? "bg-orange-100 border-orange-300"
                      : "bg-green-100 border-green-300"
                  }`}
                >
                  <h1
                    className={`notice-id text-amber-500 text-2xl font-bold  ${
                      idx % 2 === 0 ? "text-orange-400" : "text-green-400"
                    }`}
                  >
                    {idx + 1}
                  </h1>
                </div>
              </div>
              <div className="notice-wrapper w-6/6 mb-1">
                <div className="notice-text Outline text-gray-700 text-base font-medium">
                  {notice.title}
                </div>{" "}
                <div
                  className="notice-desc text-slate-600"
                  style={{ fontSize: "14px", lineHeight: "19px" }}
                >
                  {notice.content}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayNotice;

// ---------------------------------------------------------
