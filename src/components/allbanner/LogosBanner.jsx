import React from "react";

import spheral from "../../assets/svg/reconisged/spheral.svg";
import luminos from "../../assets/svg/reconisged/luminos.svg";
import focalpoint from "../../assets/svg/reconisged/focal.svg";
import amazon from "../../assets/svg/amazon.svg";
import google from "../../assets/svg/google.svg";
import wave from "../../assets/svg/wave.svg";
import circle from "../../assets/svg/circle.svg";
import dottcircle from "../../assets/svg/dotcircle.svg";

const LogosBanner = () => {
  return (
    <>
      <section className="bg-bannerbg relative logo_section_about py-14">
        <div className=" mx-auto max-w-[1271px] logos-banner relative z-10">
          <h4 className=" title"> Most Trusted Platform</h4>
          <h5 className="sub-title">By 100+ Lorem ipsum dolor sit amet, </h5>
          <ul className=" text-lg font-bold text-secondary mt-10 w-full flex justify-center items-center sm:grid grid-cols-5 max-sm:grid-cols-3   place-items-center  2xl:gap-10 md:gap-5 gap-5">
            <li className="px-4">
              <img src={amazon} className="logos-img" alt="" />
            </li>
            <li className="px-4">
              <img src={google} className="logos-img" alt="" />
            </li>
            <li className="px-4">
              <img src={luminos} className="logos-img" alt="" />
            </li>
            <li className="px-4 sm:block hidden ">
              <img src={focalpoint} className="logos-img" alt="" />
            </li>
            <li className="px-4 sm:block hidden">
              <img src={spheral} className="logos-img" alt="" />
            </li>
          </ul>
          <ul className="sm:hidden justify-center items-center gap-5 mt-5  w-full flex">
            <li className="px-4 ">
              <img src={focalpoint} className="logos-img" alt="" />
            </li>
            <li className="px-4 ">
              <img src={spheral} className="logos-img" alt="" />
            </li>
          </ul>
        </div>
        <img
          src={circle}
          alt=""
          className=" absolute -top-10 -left-10 logos-img max-xl:hidden"
        />
        <img
          src={dottcircle}
          alt=""
          className=" max-lg:hidden absolute left-12 top-3"
        />
        <span className="glow_elements"></span>
      </section>
    </>
  );
};

export default LogosBanner;
