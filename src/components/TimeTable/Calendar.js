import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import EventModal from "./EventModal";
import "./index.css";

function Calendar({ timetables, ref, eventIdToScroll }) {
  // console.log(timetables);
  // console.log(eventIdToScroll);
  const calendarRef = useRef();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [eventData, setEventData] = useState();

  // useEffect(() => {
  //   if (ref && ref.current && eventData?.id) {
  //     ref.current.setEventData(eventData);
  //   }
  // }, [eventData, ref]);

  // useEffect(() => {
  //   if (
  //     eventIdToScroll &&
  //     calendarRef.current &&
  //     typeof window !== "undefined"
  //   ) {
  //     const eventElement = document.getElementById(`${eventIdToScroll}`);
  //     if (eventElement) {
  //       eventElement.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // }, [eventIdToScroll]);

  // useEffect(() => {
  //   const eventElement = document.getElementById(`${eventIdToScroll}`);
  //   console.log("event", eventElement);

  //   if (
  //     eventIdToScroll &&
  //     calendarRef.current &&
  //     typeof window !== "undefined"
  //   ) {
  //     if (eventElement) {
  //       setTimeout(() => {
  //         eventElement.scrollIntoView({ behavior: "smooth" });
  //       }, 0);
  //     } else {
  //       console.warn(
  //         `Element with ID ${eventIdToScroll} not found in the DOM.`
  //       );
  //     }
  //   }
  // }, [eventIdToScroll]);
  // useEffect(() => {
  //   const firstEventElement = document.querySelector(".full-calendar-event");
  //   if (firstEventElement) {
  //     firstEventElement.scrollIntoView({ behavior: "smooth" });
  //   }
  // });

  useEffect(() => {
    if (eventIdToScroll) {
      const eventElement = document.getElementById(".full-calendar-event");
      if (eventElement) {
        eventElement.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(
          `Element with ID ${eventIdToScroll} not found in the DOM.`
        );
      }
    }
  }, [eventIdToScroll]);

  // useEffect(() => {
  //   if (calendarRef.current && eventData?.id) {
  //     const eventId = `event-${eventData.id}`;
  //     const calendarApi = calendarRef.current.getApi();
  //     const eventElement = calendarApi.view?.el.querySelector(`#${eventId}`);

  //     if (eventElement) {
  //       const anchor = document.createElement("a");
  //       anchor.href = `#${eventId}`;
  //       anchor.style.position = "absolute";
  //       anchor.style.top = `${eventElement.offsetTop - 100}px`;

  //       document.body.appendChild(anchor);
  //       anchor.click();

  //       // Cleanup: remove the anchor element from the DOM
  //       document.body.removeChild(anchor);
  //     } else {
  //       console.warn(`Element with ID ${eventId} not found in the DOM.`);
  //     }
  //   }
  // }, [eventData?.id]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (calendarRef.current && eventData?.id) {
  //       const eventId = `event-${eventData.id}`;
  //       const calendarApi = calendarRef.current.getApi();

  //       setTimeout(() => {
  //         const eventElement = calendarApi.view?.el.querySelector(
  //           `#${eventId}`
  //         );
  //         console.log("event", eventElement);

  //         if (eventElement) {
  //           calendarApi.view?.el.scrollTo({
  //             top: eventElement.offsetTop - 100,
  //             behavior: "smooth",
  //           });
  //         } else {
  //           console.warn(`Element with ID ${eventId} not found in the DOM.`);
  //         }
  //       }, 0);
  //     }
  //   }
  // }, [eventData?.id]);

  // useEffect(() => {
  //   if (calendarRef.current && eventData?.id) {
  //     const eventId = `event-${eventData.id}`;
  //     const calendarApi = calendarRef.current.getApi();
  //     const eventElement = calendarApi.view?.el.querySelector(`#${eventId}`);

  //     if (eventElement) {
  //       calendarApi.view?.el.scrollTo({
  //         top: eventElement.offsetTop - 100,
  //         behavior: "smooth",
  //       });
  //     }
  //   }
  // }, [eventData?.id]);

  // useEffect(() => {
  //   if (calendarRef.current && eventData?.eventName) {
  //     const calendarApi = calendarRef.current.getApi();
  //     if (calendarApi) {
  //       const calendarElement = calendarApi.view?.el;
  //       if (calendarElement) {
  //         const eventElements =
  //           calendarElement.querySelectorAll(".fc-event-title");
  //         eventElements.forEach((element) => {
  //           if (element.innerText === eventData.eventName) {
  //             calendarElement.scrollTo({
  //               top: element.offsetTop - 100,
  //               behavior: "smooth",
  //             });
  //           }
  //         });
  //       }
  //     }
  //   }
  // }, [eventData?.eventName]);

  const customSlotContent = ({ date, view }) => {
    let lunchStartTime = new Date(date);
    lunchStartTime.setUTCHours(12, 0, 0);

    let lunchEndTime = new Date(date);
    lunchEndTime.setUTCHours(13, 0, 0);

    if (
      view.type === "timeGridWeek" &&
      date >= lunchStartTime &&
      date < lunchEndTime
    ) {
      return (
        <div
          className="lunch-break-section"
          style={{
            background: `url(/images/TimeTable/bg-full-lunch-break.png)`,
          }}
        ></div>
      );
    }

    return null;
  };

  return (
    <div className="ff-calendar-section xl:h-[650px]">
      <FullCalendar
        eventTimeFormat
        ref={calendarRef}
        plugins={[timeGridPlugin]}
        events={[
          ...timetables.map((event) => ({
            id: event.id,
            title: event.eventName,
            start: event.start,
            backgroundColor: event.color,
            url: event.url,
            day_topic: event.day_topic,
            date: event.date,
            start_time: event.start_time,
            courseBatch: event.courseBatch,
            venue: event.venue,
          })),
        ]}
        displayEventTime
        allDaySlot={false}
        nowIndicator
        slotDuration="01:00:00"
        dayHeaders
        displayEventEnd
        slotLaneContent={customSlotContent}
        eventContent={function (arg) {
          const { date, link, backgroundColor, timeText, event } = arg;
          const eventName = event?._def?.title;
          const eventId = event?.id;

          const topicName = event?.extendedProps?.day_topic;
          const courseName = event?.extendedProps?.topic;
          const courseBatch = event?.extendedProps?.courseBatch;
          const venue = event?.extendedProps?.venue;
          const startDate = event?.start;

          const eventInfo = {
            ...event?.extendedProps,

            topicName,
            date,
            courseBatch,
            startDate,
            courseName,
            venue,
            eventName,
            link,
            timeText,
            url: event?._def?.url,
          };

          return (
            <button id={`${eventId}`} className="full-calendar-event" onClick={() => {
              setEventData(eventInfo);
              setIsOpenModal(true);
            }}
              disabled={!eventInfo.url || eventInfo.url.trim() === ""}
              style={{
                opacity:
                  !eventInfo.url || eventInfo.url.trim() === "" ? 0.5 : 1,
              }}
            >
              <span className="full-calendar-event-name">{eventName}</span>
              <span className="full-calendar-event-time">{timeText}</span>
              <div className="full-calendar-even-cta-container absolute bottom-1 right-1">
                {/* <button
                  onClick={() => {
                    setEventData(eventInfo);
                    setIsOpenModal(true);
                  }}
                  className="full-calendar-event-cta"
                  style={{
                    color: backgroundColor,
                    cursor:
                      !eventInfo.url || eventInfo.url.trim() === ""
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      !eventInfo.url || eventInfo.url.trim() === "" ? 0.5 : 1,
                  }}
                  disabled={!eventInfo.url || eventInfo.url.trim() === ""}
                >
                  Join
                </button> */}
              </div>
            </button>
          );
        }}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
        }}
        dayHeaderContent={function (date) {
          const { text, isToday } = date;
          const currentDate = new Date(text);
          return (
            <div className="day-header">
              <span className={`full-calendar-span ${isToday ? "active" : ""}`}>
                {text.substr(0, 3)}
              </span>
              {text.includes("/") && (
                <span
                  className={`full-calendar-span ${isToday ? "active" : ""}`}
                >
                  {currentDate.getDate()}
                </span>
              )}
            </div>
          );
        }}
        expandRows
        // nowIndicatorContent={function () {
        //   return (
        //     <img
        //       src="/images/TimeTable/nowIndicator.svg"
        //       alt="now indicator icon"
        //     />
        //   );
        // }}
        headerToolbar={{
          left: "prev,next,title",
          className: "a",
          right: "timeGridWeek,timeGridDay",
        }}
        titleFormat={{
          day: "numeric",
          month: "long",
        }}
        views={{
          timeGridWeek: {
            slotMinTime: "09:00:00",
            slotMaxTime: "21:00:00",
          },
          timeGridDay: {
            slotMinTime: "09:00:00",
            slotMaxTime: "21:00:00",
          },
        }}
      />

      <EventModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        eventData={eventData}
      />
    </div>
  );
}

export default Calendar;
