import React from "react";
import Dialog from "@mui/material/Dialog";
import "./index.css";
import { useNavigate } from "react-router-dom";

const PracticeModal = ({
  isOpenModal,
  setIsOpenModal,
  newtQs,
  setSelectedQs,
  setActiveTag,
  setTagDisable,
}) => {
  const navigate = useNavigate();
  return (
    <Dialog
      onClose={() => {
        setIsOpenModal(false);
      }}
      open={isOpenModal}
      className="practice-modal"
      style={{
        background: "#0F31754D",
      }}
    >
      <div className="practice-wrapper">
        <div className="modal-header">
          <img
            src="/images/TimeTable/close.svg"
            alt="close icon"
            onClick={() => setIsOpenModal(false)}
          />
        </div>
        <div className="modal-body">
          <img
            src="/images/Practice/bg-code-done.svg"
            className="mb-4"
            alt="bg icon"
          />
          <div className="modal-text">
            <span className="tag">WOW!</span>
            <span className="message">Your code is submitted</span>
          </div>
          <div className="modal-text">
            <span className="message">successfully.</span>
          </div>

          <div className="modal-action">
            <button
              onClick={() => {
                setIsOpenModal(false);
                navigate(`/mentor/teaching/${newtQs}/problem`);
              }}
            >
              Next Question
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PracticeModal;
