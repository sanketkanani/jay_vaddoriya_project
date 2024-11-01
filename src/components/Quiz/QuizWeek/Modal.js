import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import "./index.css";


const PracticeModal = ({ isOpenModal, setIsOpenModal }) => {


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
          <img src="/images/Practice/bg-code-done.svg" className="mb-4" alt="bg icon" />
          <div className="modal-text">
            <span className="tag">Times Up!</span>
            <span className="message">You have submitted</span>
          </div>
          <div className="modal-text">
            <span className="message">the Quiz successfully.</span>
          </div>
          <div className="modal-action">
            <button>Next Question</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PracticeModal;
