import React, { useState } from 'react'
import FreeProblem from './freeProblem';
import FreeHint from './freeHint';
import FreeSubmission from './freeSubmission';
import FreeEditor from './freeEditor';

const FreeCard = ({ selectedQs, isRun, setIsRun, consolePanel,
    setConsolPanel, sectionId, submitData,
    setSubmitData, topicId, activeTag, setActiveTag, scroll, setClickedItems,
    setIsClicked,
    clickedItems,
    isClicked, fetchFreeQuestionList }) => {
    const tags = ["Problem", "Submission"];

    const renderLeftSideScreen = () => {
        if (activeTag === "Problem") {
            return (
                <FreeProblem selectedQs={selectedQs} />
            );
        }
        if (activeTag === "Hint") {
            return <FreeHint selectedQs={selectedQs} />;
        }
        if (activeTag === "Submission") {
            return (
                <FreeSubmission selectedQs={selectedQs} isRun={isRun} setIsRun={setIsRun} submitData={submitData} setClickedItems={setClickedItems}
                setIsClicked={setIsClicked}/>
            );
        }

    }
    return (
        <React.Fragment>
            <div className="code-wrapper tab-screen:h-[864px]">
                <div className="left-code">
                    <div className="left-code-header">
                        {tags.map((tag) => {
                            const tagClass = tag === activeTag ? "active-tag tag" : "tag";
                            if (tag === 'Submission' && isRun !== 'Submit') {
                                return (
                                    <div className={tagClass}
                                    >
                                        {tag}
                                    </div>
                                )
                            } else {
                                return (
                                    <div className={tagClass} onClick={() => {
                                        setActiveTag(tag);
                                    }}
                                    >
                                        {tag}
                                    </div>
                                );
                            }
                        })}
                    </div>
                    {renderLeftSideScreen()}
                </div>
                <FreeEditor
                    selectedQs={selectedQs}
                    isRun={isRun}
                    setIsRun={setIsRun}
                    consolePanel={consolePanel}
                    setConsolPanel={setConsolPanel}
                    sectionId={sectionId}
                    submitData={submitData}
                    setSubmitData={setSubmitData}
                    topicId={topicId}
                    activeTag={activeTag}
                    setActiveTag={setActiveTag}
                    scroll={scroll}
                    clickedItems={clickedItems}
                    isClicked={isClicked}
                    setIsClicked={setIsClicked}
                    fetchFreeQuestionList={fetchFreeQuestionList}
                />
            </div>
        </React.Fragment>
    )
}

export default FreeCard