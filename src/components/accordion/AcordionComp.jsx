import React, { useState } from "react";
import {
  ControlledAccordion,
  AccordionItem,
  useAccordionProvider,
  useAccordionState,
  Accordion,
} from "@szhsin/react-accordion";

const AcordionComp = ({ syllabus, paid }) => {
  console.log("Syllabus", syllabus);
  const sortedSyllabus = syllabus?.sort((a, b) => {
    const aWeekNumber = a.name.match(/\d+/);
    const bWeekNumber = b.name.match(/\d+/);

    if (!aWeekNumber && !bWeekNumber) {
      return 0;
    } else if (!aWeekNumber) {
      return 1;
    } else if (!bWeekNumber) {
      return -1;
    } else {
      const aParsedNumber = parseInt(aWeekNumber[0]);
      const bParsedNumber = parseInt(bWeekNumber[0]);
      return aParsedNumber - bParsedNumber;
    }
  });
  const providerValue = useAccordionProvider({
    allowMultiple: true,
    transition: true,
    transitionTimeout: 250,
    unmountOnExit: false,
  });

  const freesortedSyllabus = syllabus?.sort((a, b) => {
    const aWeekNumber = a.name.match(/\d+/);
    const bWeekNumber = b.name.match(/\d+/);

    if (!aWeekNumber && !bWeekNumber) {
      return 0;
    } else if (!aWeekNumber) {
      return 1;
    } else if (!bWeekNumber) {
      return -1;
    } else {
      const aParsedNumber = parseInt(aWeekNumber[0]);
      const bParsedNumber = parseInt(bWeekNumber[0]);
      return aParsedNumber - bParsedNumber;
    }
  });

  return (
    <div>
      <Accordion transition transitionTimeout={200}>
        <CustomAccordionComponent sortedSyllabus={sortedSyllabus} paid={paid} />
      </Accordion>
    </div>
  );
};

const CustomAccordionComponent = ({ sortedSyllabus, paid }) => {
  const { getItemState } = useAccordionState();

  return sortedSyllabus?.map((item, index) => (
    <AccordionItem
      itemKey={`item-${index}`}
      key={index}
      header={
        <>
          {"Section " + (index + 1) + ": " + item?.name}
          <span
            className={`ml-4 h-6 w-6 p-2 rounded-full border flex justify-center text-xl items-center ${
              getItemState(`item-${index}`).isEnter
                ? "text-white bg-primary"
                : "text-primary bg-white border-primary"
            }`}
          >
            {getItemState(`item-${index}`).isEnter ? "-" : "+"}
          </span>
        </>
      }
      className="text-cblack  my-3 border-b border-cborder pb-2   2xl:text-2xl font-medium max-2xl:text-lg"
    >
      <ul className="list-disc">
        {paid &&
          item?.lessons.map((lesson, idx) => {
            return (
              <li className="max-2xl:text-sm my-2 2xl:text-base text-secondary font-normal ml-5 marker:text-primary">
                {lesson?.name}
              </li>
            );
          })}
        {!paid &&
          item?.syllabus_topics.map((lesson, idx) => {
            return (
              <li className="max-2xl:text-sm my-2 2xl:text-base text-secondary font-normal ml-5 marker:text-primary">
                {lesson?.title}
              </li>
            );
          })}
      </ul>
    </AccordionItem>
  ));
};

export default AcordionComp;
