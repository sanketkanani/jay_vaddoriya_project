import React, { useState } from 'react'
import { useCookie } from 'react-use';

const FreeProblem = ({ selectedQs }) => {
    const [loggedIn] = useCookie("maang");
    const [showAll, setShowAll] = useState(false);
    const companies = ["google", "amazon", "microsoft", "meta", "linkedin", "uber", "adobe", "cred"];
    const companyArray = companies.filter(company => selectedQs[company]);
    selectedQs.companies = companyArray;

    console.log("*********** company array", selectedQs);

    const socialSitListToShow = showAll
        ? selectedQs.companies
        : selectedQs?.companies?.slice(0, 4);


    return (
        <React.Fragment>
            <div className="left-code-body tab-screen:h-[820px] max-h-[820px] overflow-y-auto">
                <div className="section-1">
                    <span className="topic">{selectedQs?.ques_title}</span>
                    <span className="total-problem">
                        Problem {selectedQs?.question_number}
                    </span>
                </div>
                <div className="section-2">
                    <img
                        className="pr-3"
                        src="/images/Practice/thumbs-up.svg"
                        alt="bookmark icon"
                    />
                    <img
                        className="pr-3"
                        src="/images/Practice/star.svg"
                        alt="bookmark icon"
                    />
                    <img
                        className="pr-3"
                        src="/images/Practice/share.svg"
                        alt="bookmark icon"
                    />
                    <img
                        className="pr-3"
                        src="/images/Practice/flag.svg"
                        alt="bookmark icon"
                    />
                </div>
                <div className="section-3">
                    {socialSitListToShow?.map((siteName, index) => (
                        <div key={index}>
                            <span>{siteName}</span>
                        </div>
                    ))}
                    {selectedQs?.companies?.length > 4 && !showAll && (
                        <div>
                            <span className="more" onClick={() => setShowAll(true)}>
                                +{selectedQs?.companies.length - 4}
                            </span>
                        </div>
                    )}
                </div>
                <div className="section-4">
                    {showAll && (
                        <button onClick={() => setShowAll(false)}>Show Less</button>
                    )}
                    {!showAll && (
                        <button onClick={() => setShowAll(true)}>Show More</button>
                    )}
                    <span style={{ whiteSpace: "pre-line" }}>{selectedQs?.prob_text}</span>
                </div>
                <div className="section-6 !block">
                    {selectedQs?.prob_pic !== "null" && (
                        <img
                            src={selectedQs?.prob_pic}
                            alt=""
                            className="pt-2 pb-2"
                        />
                    )}
                </div>
                <div className="section-7">
                    {selectedQs?.examples.map((example) => {
                        const { title, input, output, explanation } = example;
                        const correspondingPic =''
                            // selectedQs?.free_course_com_ques_ex_image?.example_pics.find(
                            //     (pic) => pic.name === title
                            // );
                        // console.log("correspondingPic", correspondingPic);
                        return (
                            <div className="example-card">
                                <span className="title">{title}</span>
                                {correspondingPic && (
                                    <img
                                        src={correspondingPic.example_pic}
                                        alt={`Example`}
                                        className="example-pic"
                                    />
                                )}
                                <div className="box">
                                    <div>
                                        <span className="label">Inputs:</span>
                                        <span className="text">{input}</span>
                                    </div>
                                    <div>
                                        <span className="label">Output:</span>
                                        <span className="text">{output}</span>
                                    </div>
                                    <div>
                                        <span className="label">Explanation:</span>
                                        <span className="text">{explanation}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="section-5">
                    <p className="text-gray-600 text-sm font-medium font-['Outfit'] leading-none">
                        Constraints
                    </p>
                    {selectedQs?.constraints &&
                        selectedQs?.constraints?.length > 0 &&
                        selectedQs.constraints.map((data) => (
                            <div className="syntax" key={data}>
                                <div className="syntax-box">
                                    <span>{data.constrain_value}</span>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="section-6 !block">
                   
                    {selectedQs?.const_pic !== "null" && (
                        <img src={selectedQs?.const_pic} className="pt-2 pb-2" alt=" " />
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}
export default FreeProblem