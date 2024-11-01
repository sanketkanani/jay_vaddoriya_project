import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DatePickerComp = ({ dates }) => {
  const [value, onChange] = useState(new Date());

  const isHighlighted = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return dates.includes(dateString);
  };
  return (
    <div>
      <h4 className="font-semibold md:text-xl sm:text-sm text-left mb-7">
        Dates this course available on
      </h4>
      <div className=" text-start flex border-secondary p-2 rounded-lg">
        <Calendar
          onChange={onChange}
          value={value}
          className=" !border-none !mx-auto"
          tileClassName={({ date, view }) =>
            view === "month" && isHighlighted(date) ? "highlight" : null
          }
        />
      </div>
    </div>
  );
};

export default DatePickerComp;
