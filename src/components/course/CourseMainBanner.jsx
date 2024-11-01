import React from "react";
import dottedcircle from "../../assets/svg/whitdotcircle.svg";
import greendot from "../../assets/svg/dotcircle.svg";
import phone from "../../assets/svg/phone/bluephone.svg";
import ring from "../../assets/svg/circle.svg"

const CourseMainBanner = () => {
  return (
    <div className=" relative mt-6">
      <div className=" max-w-[1320px] mx-auto w-[80%] max-md:w-[92%]">
        <div className="   bg-primary mx-auto  rounded-lg py-8 px-6 flex justify-between items-center max-sm:flex-col">
          <div className=" text-white text-start">
            <h5 className=" text-base font-normal">COURSES</h5>
            <h1 className="  font-semibold my-2  text-4xl">Premium Courses</h1>
            <h3 className=" text-base ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod <br className=" max-md:hidden" /> tempor incididunt ut
              labore Ut enim ad minim veniam,
            </h3>
          </div>
          <div className=" relative left-0 right-0">
            {/* <img src={dottedcircle} alt="" /> */}
            <img
              src={dottedcircle}
              alt=""
              className=" absolute -top-8 left-12"
            />
          </div>
          <button className=" custom-button bg-white text-primary flex gap-2 w-[10/12]" onClick={() =>document.getElementById('modal').classList.remove('hidden')}>
            <img src={phone} alt="" />
            <>
              <span>Request a call back</span>
            </>
          </button>
        </div>
      </div>
      <img src={greendot} alt="" className=" max-md:hidden absolute bottom-8 right-0"/>
      <img src={ring} alt="" className=" max-md:hidden absolute -top-2 -right-10"/>

    </div>
  );
};

export default CourseMainBanner;
