import React, { useEffect } from "react";

const network = [
  {
    title: "Runtime",
  },
  {
    title: "Memory",
  },
];

const submissionList = [
  {
    status: "Accepted",
    languages: "C++",
    time: "a few seconds ago",
  },
  {
    status: "Accepted",
    languages: "C++",
    time: "an hours ago",
  },
  {
    status: "Accepted",
    languages: "C++",
    time: "3 hours ago",
  },
  {
    status: "Accepted",
    languages: "C++",
    time: "3 hours ago",
  },
  {
    status: "Accepted",
    languages: "C++",
    time: "3 hours ago",
  },
];

const Submission = ({ compilerResult }) => {
  useEffect(() => {
    // console.log("submission", compilerResult);
  }, [compilerResult]);
  // console.log("shelllllllllllllllllllllll", compilerResult);
  const millisecondsToSeconds = (milliseconds) => {
    return milliseconds / 1000;
  };

  const timeAgo = (timestamp) => {
    const currentDate = new Date();
    const previousDate = new Date(timestamp);
    const timeDifference = currentDate - previousDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };

  function extractLanguage(str) {
    return str.split(' ')[0];
  }

  return (
    <div className="left-code-body tab-screen:h-[820px] max-h-[820px] overflow-y-auto">
      {compilerResult?.main_data?.items[0]?.result?.status?.name && (
        <div className="submission-1">
          {compilerResult?.main_data?.items[0]?.result?.status?.name ===
            "Accepted" && (
            <img
              className="mr-2"
              src="/images/Practice/checked.svg"
              alt="checked icon"
            />
          )}
          <span
            style={{
              color:
                compilerResult?.main_data?.items[0]?.result?.status?.name ===
                "Accepted"
                  ? ""
                  : "red",
            }}
          >
            {compilerResult?.main_data?.items[0]?.result?.status?.name}
          </span>
        </div>
      )}
      <div className="submission-2">
        <div className="network-wrapper">
          <div className="network-header">
            <span>Runtime</span>
            <span>Details</span>
          </div>
          <div className="network-body">
            <span className="value">
              {compilerResult?.main_data?.items[0]?.result?.time}
            </span>
            <span className="type">ms</span>
          </div>
          
        </div>
        <div className="network-wrapper">
          <div className="network-header">
            <span>Memory</span>
            <span>Details</span>
          </div>
          <div className="network-body">
            <span className="value">
              {millisecondsToSeconds(
                compilerResult?.main_data?.items[0]?.result?.memory
              )}
            </span>
            <span className="type">s</span>
          </div>
          
        </div>
        {/* {network.map((item) => (
          <div className="network-wrapper">
            <div className="network-header">
              <span>{item.title}</span>
              <span>Details</span>
            </div>
            <div className="network-body">
              <span className="value">4</span>
              <span className="type">ms</span>
            </div>
            <div className="network-footer">
              <span className="value">Beats 63.95%</span>
              <span className="type">of users with C++</span>
            </div>
          </div>
        ))} */}
      </div>
      {/* <div className="submission-3">
        <span className="submission-title">Next Question</span>
        <div className="submission-3-body">
          <div className="circle"></div>
          <span>475. Max Consecutive Ones II</span>
        </div>
      </div>
      <div className="submission-4">
        <span className="submission-title">More challenges</span>
        <div className="submission-4-body">
          <div className="circle"></div>
          <span>475. Can I Win</span>
        </div>
      </div> */}
      <div className="submission-5">
        <table>
          <tr>
            <th>
              <div className="flex items-center">
                <span>All statuses</span>
                <img
                  className="pl-2"
                  src="/images/Practice/down.svg"
                  alt="down icon"
                />
              </div>
            </th>
            <th>
              <div className="flex items-center">
                <span>All languages</span>
                <img
                  className="pl-2"
                  src="/images/Practice/down.svg"
                  alt="down icon"
                />
              </div>
            </th>
            <th>
              <span>Time</span>
            </th>
          </tr>
          {compilerResult?.previous_attempts &&
            compilerResult?.previous_attempts.length > 0 &&
            compilerResult?.previous_attempts.map((item) => (
              <tr>
                <td>
                  {/* <span
                    className="status"
                    style={!item.status ? { color: "red" } : {}}
                  >
                    {item.status ? "Accepted" : "Rejected"}
                  </span> */}
                  <span
                    className="status"
                    style={item.status !== 'Accepted' ? { color: "red" } : {}}
                  >
                    <a>{item.status}</a>
                  </span>
                </td>
                <td>
                  <span className="languages">
                    {extractLanguage(item.load_template__compiler)}
                  </span>
                </td>
                <td>
                  <span className="time">{timeAgo(item.practic_time)}</span>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default Submission;
