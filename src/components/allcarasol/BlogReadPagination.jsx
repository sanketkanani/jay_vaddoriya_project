// PaginationGrid.js
import React, { useState, useEffect } from "react";
import eye from "../../assets/svg/eye.svg";
import message from "../../assets/svg/msg.svg";
import liked from "../../assets/svg/likethumb.svg";
import card2 from "../../assets/images/blog/blog2.png";

import carrer from "../../assets/images/carreer.svg";
import heart from "../../assets/images/heart.svg";
import leftarrow from "../../assets/leftarrow.svg";
import rightarrow from "../../assets/svg/Rightsidearrow/whiteRightarrow.svg";
import { Link } from "react-router-dom";
const cardContent = [
  {
    title: "Sales Caller",
    location: "USA",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod",
    positions: ["2 Position", "Full Time", "Onsite", "Full Time"],
  },
];
const BlogReadPagination = ({ blogs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Assuming 3 items per page

  // Calculate total pages dynamically based on blogs array length
  const totalPages = Math.ceil(blogs?.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, blogs?.length);

  const currentBlogs = blogs?.slice(startIndex, endIndex);

  console.log(currentBlogs);

  // Determine the heading based on the current page
  const currentPageTitle = currentPage === 1 ? null : `Page ${currentPage}`;

  // Generate an array of indices for the cards to render on the current page
  const cardIndices = Array.from({ length: 9 }).map((_, index) => index);

  // Render all cards on the first page
  const renderAllCardsOnFirstPage =
    currentPage === 1 && cardIndices.length === cardContent.length;

  const getDate = (dateString) => {
    const date = new Date(dateString);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedDate = `${months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;

    return formattedDate;
  };

  return (
    <div className="relative">
      <div className=" sub-section relative z-10">
        {/* {currentPageTitle && <h2>{currentPageTitle}</h2>} */}
        <h1 className=" text-3xl text-start font-semibold text-black pl-6">Must read blogs</h1>
        <div className="sm:grid grid-cols-3  mx-auto pb-5  career-portal-cards place-content-start place-items-start  p-2 flex justify-start items-center    !overflow-x-scroll  gap-4">
          {currentBlogs?.map((blog, index) => (
            <div
              key={blog.id}
              className="custom-shadow bg-white mx-auto w-full shrink-0 min-h-[500px] 2xl:max-w-cardmw max-w-mw350 mt-10  overflow-hidden   "
            >
              <img
                src={blog.photo}
                alt=""
                className="  max-h-[230px] h-full w-full object-cover rounded-xl"
              />
              <div className="max-w-96 px-3 mx-auto relative z-10 mt-4 pb-6">
                <div className=" text-start flex  flex-col items-start">
                  {" "}
                  <h3 className=" text-sm text-secondary font-normal">
                    General {getDate(blog?.date)}
                  </h3>
                  <h4 className="text-xl text-cblack font-semibold my-2">
                    {blog?.title?.slice(0, 50) + "..."}
                  </h4>
                  <p class=" text-sm text-secondary font-normal">
                    {blog?.text?.slice(0, 200) + "..."}
                  </p>
                  <div className="flex justify-between items-center w-full mt-5">
                    <ul className=" text-xs text-primary flex gap-3 justify-start items-center">
                      <li className=" flex gap-1 items-center">
                        <img src={eye} alt="" /> <span>{blog?.views}</span>
                      </li>
                      <li className=" flex gap-1 items-center ">
                        <img src={message} alt="" /> <span>170 </span>
                      </li>
                      <li className=" flex gap-1 items-center ">
                        <img src={liked} alt="" /> <span>170 </span>
                      </li>
                    </ul>
                    <Link
                      to={"/blog/" + blog?.id}
                      className=" bg-primary px-2 py-2 text-white gap-1 px-4 rounded-full text-[12px] font-medium flex items-center"
                    >
                      <span>Read More</span>
                      <img src={rightarrow} alt="" className=" max-h-5 max-w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 max-sm:hidden">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="mr-2 p-2 h-8 w-8 bg-primary text-white rounded-full"
          >
            <img src={leftarrow} alt="" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`mr-2 p-2 h-8 w-8 text-xs  ${currentPage === i + 1
                  ? " border border-primary rounded-full text-primary"
                  : " text-secondary"
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="ml-2 p-2 h-8 w-8 flex justify-center items-center bg-primary text-white rounded-full"
          >
            <img src={rightarrow} alt="" />
          </button>
        </div>
      </div>
      <span className='glow_elements_con bottom-0 -left-5 !w-[200px] !opacity-[15%] max-md:hidden'></span>
    </div>
  );
};

export default BlogReadPagination;
