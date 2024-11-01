import React from "react";
import "./rules.css";
import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
const BatchCard = ({ batchName, days }) => {
  return (
    <div style={{ width: 125, height: 201, position: "relative" }}>
      <div
        style={{
          left: 30,
          top: 0,
          position: "absolute",
          textAlign: "center",
          color: "#3C4250",
          fontSize: 20,
          fontFamily: "Outfit",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
      >
        {batchName}
      </div>
      {days.map((day, index) => (
        <div
          key={index}
          style={{
            width: 125,
            height: 40,
            left: 0,
            top: 61 + index * 50,
            position: "absolute",
          }}
        >
          <div
            style={{
              width: 125,
              height: 40,
              left: 0,
              top: 0,
              position: "absolute",
              background: "#F9FFFD",
              borderRadius: 10,
              border: "1px #C5D9DC solid",
            }}
          />
          <div
            style={{
              left: 34,
              top: 10,
              position: "absolute",
              textAlign: "center",
              color: "#3C4250",
              fontSize: 16,
              fontFamily: "Outfit",
              fontWeight: "600",
              wordWrap: "break-word",
            }}
          >
            {day}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BatchCard;
