import React from "react";
import rightarrow from "../../assets/svg/Rightsidearrow/rightarrowgreen.svg";
import dottedcircle from "../../assets/svg/whitdotcircle.svg";
import greendot from "../../assets/svg/dotcircle.svg";
import elementsTop from "../../assets/faq-top.svg";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className=" relative margin_for_header">
      <div className=" sub-section mt-10">
        <div className="  bg-primary  rounded-lg py-8 px-6 flex justify-between items-center max-sm:flex-col">
          <div className=" text-white text-start">
            <h5 className=" text-lg font-normal">Explore Programs</h5>
            <h1 className=" text-4xl font-semibold my-2 max-sm:text-xl">
              Our Premium Programs
            </h1>
            <h3 className=" text-base font-normal">
              Skill Up for the top product Based black company
            </h3>
          </div>
          <div className=" relative">
            <img src={dottedcircle} alt="" />
            <img
              src={dottedcircle}
              alt=""
              className=" absolute -top-8 left-12"
            />
          </div>
          <button
            className=" custom-button border-white bg-white text-primary"
            onClick={() => {
              navigate("/course");
            }}
          >
            <span className="pr-2">View All Programs</span>
            <img src={rightarrow} alt="" />{" "}
          </button>
        </div>
      </div>
      <img
        src={greendot}
        alt=""
        className=" right-2 absolute bottom-4 w-[100px] for_display_none lg:hidden xl:block"
      />
    </div>
  );
};

export default Banner;
