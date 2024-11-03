import { Grid } from "@mui/material";
import React from "react";

const QuizPoint = ({ quizList, step, currentQuestion,handleExit }) => {
  const getClassNameFromStatus = (quizItem) => {
    const { status, id } = quizItem;
    // const stepId = step + 1;
    if (currentQuestion.id === id) {
      return `quiz-ongoing`;
    }
    if (status === "attempted") {
      return `quiz-attempted`;
    }

    return `quiz-${status}`;
  };

  return (
    <div className="quiz-point-table">
      <div className="flex justify-between" style={{alignItems:"center"}}>
        <span className="title" style={{margin:0}}>Questions </span>
              <button
                type="button"
                className="exit-button-block exit-button flex items-center px-4 py-3 rounded-md text-white bg-red-500 hover:bg-red-700 duration-150"
                onClick={() => {
                  handleExit();
                }}
              >
                <span>EXIT</span>
              </button>
      </div>
      <div className="box">
        <Grid container spacing={1} className="gap-y-2 !-mx-1">
          {quizList &&
            quizList.length > 0 &&
            quizList.map((quizItem, index) => {
              const className = getClassNameFromStatus(quizItem);
              return (
                <Grid className="!w-[65px] !max-w-[65px] px-1">
                  <div
                    className={`h-[60px] flex justify-center items-center rounded-md quiz-number ${className} default-bg`}
                  >
                    <span>{index + 1}</span>
                  </div>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
};

export default QuizPoint;
