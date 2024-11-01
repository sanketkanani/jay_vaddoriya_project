import React from "react";
import "./index.css";

function WelcomeCard() {
  return (
    <div className="welcome-wrapper">
      <div
        className="welcome-card"
        style={{
          background: `url(/images/TimeTable/bg-left-rectangle.png), url(/images/TimeTable/bg-right-rectangle.png)`,
        }}
      >
        <img src="/images/TimeTable/welcome.svg" alt="welcome card" />
        <div className="welcome-content">
          <p className="welcome-text">
            Welcome to your team timetable calendar
          </p>
          <p className="welcome-sub-text">
            Organise and schedule your study for the rest of the week. Drink
            water, stretch, code and repeat!”
          </p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
