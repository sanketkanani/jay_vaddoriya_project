import React from "react";
import img1 from "../../assets/images/course page.png";
import phone from "../../assets/svg/Rightsidearrow/rightarrowgreen.svg";
import BlueDot from "../../assets/blue-bottom.png";

const CourseBanner = () => {
  return (
    <div className=" pb-0 max-md:mt-9 mt-10">
      <div className=" mx-auto  bg-transparent  sub-section">
        <div className="  mx-auto rounded-lg relative md:pr-10   md:h-[170px] overflow-hidden bg-primary   max-md:flex-col flex    justify-between gap-4 items-center">
          <div className="md:block hidden">
            {" "}
            <img
              src={img1}
              className=" max-w-72 h-10/12  w-full  object-cover relative top-4 "
              alt=""
            />
          </div>
          <div className=" text-2xl  md:text-start mx-auto max-md:mt-5   font-semibold text-white">
            Affordable online course & Learning <br /> Opportunities for you!
          </div>
          <div className=" py-3">
            <button className=" mx-auto text-nowrap  text-sm py-3 px-4 font-semibold rounded-full bg-white text-primary items-center flex gap-2 w-[10/12]">
              <span>Start Learning Today</span>
              <img src={phone} alt="" className=" my-auto" />
            </button>
          </div>
          <div className="block">
            {" "}
            <img
              src={img1}
              className=" max-w-72 h-[144px] h-full w-full object-cover hidden  max-md:block relative"
              alt=""
            />
          </div>
        </div>
      </div>
      <img src={BlueDot} alt="" className="mt-6 max-md:hidden" />
    </div>
  );
};

export default CourseBanner;
