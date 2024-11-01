import React from 'react'

const FreeSubmission = ({ selectedQs, isRun, setIsRun, submitData, setClickedItems, setIsClicked }) => {

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

    const bytesToMB = (bytes) => {
        return Math.ceil(bytes / (1024 * 1024));
    };

    const handleClick = (item) => {
        // console.log("Clicked on item with ID:", item);
        setClickedItems(item);
        setIsClicked(true);
    };

    function extractLanguage(str) {
        return str.split(' ')[0];
    }

    return (
        <React.Fragment>
            <div className="left-code-body tab-screen:h-[820px] max-h-[820px] overflow-y-auto">
                {isRun === "Submit" && isRun !== "" && submitData?.main_data?.items[0]?.result?.status?.name && (
                    <div className="submission-1">
                        {submitData?.main_data?.items[0]?.result?.status?.name ===
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
                                    submitData?.main_data?.items[0]?.result?.status?.name ===
                                        "Accepted"
                                        ? ""
                                        : "red",

                                textTransform: "capitalize",
                            }}
                        >
                            {submitData?.main_data?.items[0]?.result?.status?.name}
                        </span>
                    </div>
                )}
                {isRun === "Submit" && isRun !== "" && submitData?.main_data?.items?.length > 0 && (
                    <div className="submission-2">
                        <div className="network-wrapper">
                            <div className="network-header">
                                <span>Runtime</span>
                                <span>Details</span>
                            </div>
                            <div className="network-body">
                                <span className="value">
                                    {submitData?.main_data?.items[0]?.result?.time}
                                </span>
                                <span className="type">ms</span>
                            </div>
                            {/* <div className="network-footer">
                                <span className="value">Beats 63.95%</span>
                                <span className="type">
                                    of users with{" "}
                                    {submitData?.main_data?.items[0]?.compiler?.name}
                                </span>
                            </div> */}
                        </div>
                        <div className="network-wrapper">
                            <div className="network-header">
                                <span>Memory</span>
                                <span>Details</span>
                            </div>
                            <div className="network-body">
                                <span className="value">
                                    {bytesToMB(submitData?.main_data?.items[0]?.result?.memory)}
                                </span>
                                <span className="type">MB</span>
                            </div>
                            {/* <div className="network-footer">
                                <span className="value">Beats 63.95%</span>
                                <span className="type">
                                    of users with{" "}
                                    {submitData?.main_data?.items[0]?.compiler?.name}
                                </span>
                            </div> */}
                        </div>
                    </div>
                )}
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
                                <div className="flex items-center">
                                    <span>Runtime</span>
                                    <img
                                        className="pl-2"
                                        src="/images/Practice/down.svg"
                                        alt="down icon"
                                    />
                                </div>
                            </th>
                            <th>
                                <div className="flex items-center">
                                    <span>Memory</span>
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
                        {submitData?.previous_attempts &&
                            submitData?.previous_attempts.length > 0 &&
                            submitData?.previous_attempts.map((item) => (
                                <tr>
                                    <td>
                                        <span
                                            className="status"
                                            style={item.status !== 'Accepted' ? { color: "red" } : {}}
                                        >
                                            <a onClick={() => handleClick(item)} style={{ cursor: "pointer" }}>{item.status}</a>
                                        </span>
                                    </td>
                                    <td>
                                        <span className="languages">
                                            {extractLanguage(item.load_template__compiler)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="languages">{item.timer}ms</span>
                                    </td>
                                    <td>
                                        <span className="languages">{bytesToMB(item?.memory)}MB</span>
                                    </td>
                                    <td>
                                        <span className="time">{timeAgo(item.practic_time)}</span>
                                    </td>
                                </tr>
                            ))}
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

export default FreeSubmission