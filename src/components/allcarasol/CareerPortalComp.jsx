// PaginationGrid.js
import React, { useState, useEffect } from "react";

import carrer from "../../assets/images/carreer.svg";
import heart from "../../assets/images/heart.svg";
import leftarrow from "../../assets/leftarrow.svg"
import rightarrow from "../../assets/svg/Rightsidearrow/whiteRightarrow.svg"
const cardContent = [
  {
    title: 'Sales Caller',
    location: 'USA',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod',
    positions: ['2 Position', 'Full Time', 'Onsite', 'Full Time']
  },
 
];
const CareerPortalComp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(3); // Assuming you have a total of 9 pages
  const itemsPerPage = 3; // Assuming 3 items per page

  const handleNextPage = () => {
    setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, cardContent.length);

  // Determine the heading based on the current page
  const currentPageTitle = currentPage === 1 ? null : `Page ${currentPage}`;

  // Generate an array of indices for the cards to render on the current page
  const cardIndices = Array.from({ length: 9 }).map((_, index) => index);

  // Render all cards on the first page
  const renderAllCardsOnFirstPage = currentPage === 1 && cardIndices.length === cardContent.length;



  return (
    <div>
      {currentPageTitle && <h2>{currentPageTitle}</h2>}
      <div className="sm:grid grid-cols-3  career-portal-cards w-full p-2 flex justify-start items-center  !overflow-x-scroll  gap-4">
        {cardIndices.map((index) => (
          <div key={index} className=" !w-full shrink-0    max-w-[450px] custom-shadow border border-gray-50 bg-white p-3 relative mx-auto">
            <div className="2xl:text-2xl flex justify-start gap-2 items-start font-bold max-2xl:text-base text-cblack my-2">
              <span className="bg-primary p-2 rounded-full">
                <img src={carrer} alt="" className=" h-[15px] w-[15px]" />
              </span>
              <h4 className="lg:text-lg md:text-base text-wrap text-lg">
                {cardContent[0].title} <br />
                <span className="lg:text-sm md:text-xs text-sm !leading-[0] text-secondary">{cardContent[0].location}</span>
              </h4>
            </div>
            <p className="my-2 lg:text-sm text-sm md:text-[11px] text-secondary font-medium ">
              {cardContent[0].description}
            </p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {cardContent[0].positions.map((position, index) => (
                <li key={index} className="px-2 text-xs py-1 text-secondary font-normal  bg-clightbg rounded-full">
                  {position}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between items-center gap-2">
              <a href="/jobdetail" className="text-[10px] text-nowrap  flex-1 text-center   border py-2 px-2 rounded-full bg-primary text-white">
                Apply Now
              </a>
              <button className="text-[10px] text-nowrap border py-2 px-2 flex-1  rounded-full text-primary border-primary bg-white">
                View Details
              </button>
            </div>
            <div className="bg-primary inline-block p-2 rounded-full absolute top-6 right-2">
              <img src={heart} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 max-sm:hidden">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="mr-2 p-2 h-8 w-8 bg-primary text-white rounded-full">
          <img src={leftarrow} alt="" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => handlePageChange(i + 1)} className={`mr-2 p-2 h-8 w-8 text-xs  ${currentPage === i + 1 ? ' border border-primary rounded-full text-primary' : ' text-secondary'}`}>
            {i + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="ml-2 p-2 h-8 w-8 flex justify-center items-center bg-primary text-white rounded-full">
        <img src={rightarrow} alt="" />
        </button>
      </div>
    </div>
  );
};

export default CareerPortalComp;
