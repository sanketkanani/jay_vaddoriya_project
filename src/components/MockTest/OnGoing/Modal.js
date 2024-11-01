import React from "react";
import Dialog from "@mui/material/Dialog";
import "./index.css";

const PracticeModal = ({
  isOpenModal,
  setIsOpenModal,
  selectedQs,
  newtQs,
  setSelectedQs,
  setActiveTag,
  setTagDisable,
}) => {
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

          {selectedQs !== newtQs && (
            <div className="modal-action">
              <button
                onClick={() => {
                  setSelectedQs(newtQs);
                  setActiveTag("Problem");
                  setTagDisable(true);
                  setIsOpenModal(false);
                }}
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default PracticeModal;
