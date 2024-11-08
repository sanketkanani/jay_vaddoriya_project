import React from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "./whiteboard.css";

function Whiteboard() {
  return (
    <div className="wrapper">
      <div id="title">
        <a href="#">
          <img
            src="/images/logo-lg.png"
            alt="MAANG CAREERS"
            style={{ height: "50px" }}
          />
        </a>
      </div>
      <div className="excalidraw-container">
        <Excalidraw />
      </div>
    </div>
  );
}

export default Whiteboard;
