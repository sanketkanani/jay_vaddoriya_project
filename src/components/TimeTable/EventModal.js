import React from "react";
import Dialog from "@mui/material/Dialog";
import dayjs from "dayjs";
const EventModal = ({ isOpenModal, eventData, setIsOpenModal }) => {
  // console.log("event modal", eventData);

  const formatDate = (date) => {
    return date ? dayjs(date).format("D MMM YYYY") : "Date not available";
  };

  const formatTime = (time) => {
    return time ? dayjs(time).format("h:mm A") : "Time not available";
  };

  return (
    <Dialog
      onClose={() => {
        setIsOpenModal(false);
      }}
      open={isOpenModal}
      className="calendar-modal"
      style={{
        background: "#0F31754D",
      }}
    >
      <div className="course-modal">
        <div className="modal-header">
          <span>{eventData?.eventName}</span>
          <img
            src="/images/TimeTable/close.svg"
            alt="close icon"
            onClick={() => setIsOpenModal(false)}
          />
        </div>
        <div className="course-info">
          {/* Modify or add information as needed */}
          <p>
            <span className="title">Topic:</span>
            <span className="value">{eventData?.day_topic}</span>
          </p>
          <p>
            <span className="title">Course Batch:</span>
            <span className="value">{eventData?.courseBatch}</span>
          </p>

          <p>
            <span className="title">Date:</span>
            <span className="value">{formatDate(eventData?.startDate)}</span>
          </p>
          <p>
            <span className="title">Time:</span>
            <span className="value">{formatTime(eventData?.startDate)}</span>
          </p>
          <p>
            <span className="title">Venue:</span>
            <span className="value">{eventData?.venue}</span>
          </p>

          <button
            disabled={!eventData?.url}
            className={`${!eventData?.url ? "btn-disabled" : ""}`}
            onClick={() => {
              if (eventData?.url) {
                window.open(eventData?.url);
              }
            }}
          >
            Join
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default EventModal;
