import { Grid } from "@mui/material";
import React from "react";

const QuizPoint = ({ quizList, step }) => {
  const getClassNameFromStatus = (quizItem) => {
    const { status, id } = quizItem;
    const stepId = step + 1;

    if (stepId === id) {
      return `quiz-ongoing`;
    }

    if (status === "attempted") {
      return `quiz-attempted`;
    }

    return `quiz-${status}`;
  };

  return (
    <div className="quiz-point-table">
      <span className="title">Questions </span>
      <div className="box">
        <Grid container spacing={1} className="gap-y-2 !-mx-1">
          {quizList?.map((quizItem) => {
            const className = getClassNameFromStatus(quizItem);
            return (
              <Grid className="!w-[65px] !max-w-[65px] px-1">
                <div
                  className={`h-[60px] flex justify-center items-center rounded-md quiz-number ${className} default-bg`}
                >
                  <span>{quizItem?.id}</span>
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
