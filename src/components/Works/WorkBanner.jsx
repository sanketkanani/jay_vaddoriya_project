import React, { useState } from 'react';
import rightarrow from '../../assets/svg/Rightsidearrow/rightarrowgreen.svg';
import dottedcircle from '../../assets/svg/whitdotcircle.svg';
import greendot from '../../assets/svg/dotcircle.svg';
import phone from '../../assets/svg/phone/bluephone.svg';
import FreeCall from '../../pages/freecall/FreeCall';
import ring from "../../assets/svg/circle.svg"

const WorkBanner = () => {
  const [freecall, setFreeCall] = useState(false);

  const OpenModel = () => {
    setFreeCall(!freecall);
  };
  return (
    <div className=" relative lg:mt-12 mt-3 z-10">
      <div className=" sub-section">
        <div className="  bg-primary  rounded-lg py-8 px-6 flex justify-between items-center max-sm:flex-col">
          <div className=" text-white text-start">
            <h5 className=" text-base font-normal">
              ENROLLMENT PROCESS

            </h5>
            <h1 className="  font-semibold my-2 text-4xl">
              How to join a program
            </h1>
            <h3 className=" text-sm ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
          <button className=" custom-button bg-white text-primary flex gap-2 w-[10/12]" onClick={() =>document.getElementById('modal').classList.remove('hidden')}>
            <img src={phone} alt="" />
            <>
              <span>Request a call back</span>
            </>
          </button>
        </div>
      </div>
      {/* <img src={greendot} alt="" className=" right-6 absolute -bottom-8" />
      <img src={ring} alt="" className=" -right-8 absolute top-4" /> */}
      {freecall && (
        <div className=" absolute  ">
          <FreeCall />
        </div>
      )}
    </div>
  );
};

export default WorkBanner;
