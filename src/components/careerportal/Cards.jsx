import React from 'react'
import carrer from "../../assets/images/carreer.svg";
import heart from "../../assets/images/heart.svg";

const Cards = () => {
  return (
    <>
        <div class="  max-w-mw350 custom-shadow border border-gray-50 bg-white p-3 relative mx-auto">
                <div className="2xl:text-2xl flex justify-start gap-2  items-center   font-bold max-2xl:text-base text-cblack my-2">
                  <span className=" bg-primary p-2 rounded-full">
                    {" "}
                    <img src={carrer} alt="" />
                  </span>
                  <h4>
                    Sales Caller <br />{" "}
                    <span className=" text-xs text-secondary">USA</span>
                  </h4>
                </div>
                <p className=" my-2 max-2xl:text-sm 2xl:text-base text-secondary font-medium ">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
                  eiusmod
                </p>
                <ul className=" mt-3 flex flex-wrap gap-2">
                  <li className=" px-2   text-xs py-1 text-secondary font-normal   bg-clightbg rounded-full">
                    2 Position
                  </li>
                  <li className=" px-2   text-xs py-1 text-secondary font-normal   bg-clightbg rounded-full">
                    Full Time
                  </li>
                  <li className=" px-2   text-xs py-1 text-secondary font-normal   bg-clightbg rounded-full">
                    Onsite
                  </li>
                  <li className=" px-2   text-xs py-1 text-secondary font-normal   bg-clightbg rounded-full">
                    Full Time
                  </li>
                </ul>
                <div class=" mt-3 flex  justify-between items-center gap-2">
                  <a
                    href="/jobdetail"
                    class="  text-xs border py-1 px-3 rounded-full bg-primary text-white"
                  >
                    Apply Now
                  </a>
                  <button class="  text-xs border py-1 px-3 rounded-full text-primary border-primary bg-white">
                    View Details
                  </button>
                </div>
                <div className=" bg-primary inline-block p-2 rounded-full absolute top-6 right-2">
                  {" "}
                  <img src={heart} alt="" />
                </div>
              </div>
        
    </>
  )
}

export default Cards