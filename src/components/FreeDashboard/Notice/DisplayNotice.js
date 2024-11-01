import React from "react";
import "../Sidebar/sidebar.css";

const DisplayNotice = ({notices}) => {
  return (
    <div
      className="notice-content bg-white mt-6 rounded-xl p-6"
      style={{
        boxShadow: "0px 5px 25px 0px rgba(62, 144, 156, 0.10)",
        background: "#FFF",
        borderRadius: "15px",
      }}
    >
      <span className="Outfit text-xl font-semibold text-slate-600">
        Notice Board
      </span>
      <div className="flex flex-col">
        {notices.map((notice, idx) => (
          <div className="notice-info flex" key={idx}>
            <div className="notice-img w-0/6 m-3 ml-0">
              <div
                className={`notice-img w-20 h-20 bg-orange-100 flex justify-center ${
                  idx % 2 === 0 ? "bg-orange-100" : "bg-green-100"
                }`}
              >
                <h1
                  className={`notice-id mt-6 font-bold text-xl  ${
                    idx % 2 === 0 ? "text-orange-400" : "text-green-400"
                  }`}
                >
                  {idx + 1}
                </h1>
              </div>
            </div>
            <div className="notice-wrapper w-6/6 mt-4">
              <span className="notice-text Outline text-slate-700 text-base font-medium">
                {notice.title}
              </span>{" "}
              <br />
              <span
                className="notice-desc text-slate-600"
                style={{ fontSize: "14px", lineHeight: "19px" }}
              >
                {notice.content}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default DisplayNotice
