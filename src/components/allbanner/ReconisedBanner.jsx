import React from 'react';

import spheral from '../../assets/svg/reconisged/spheral.svg';
import luminos from '../../assets/svg/reconisged/luminos.svg';
import focalpoint from '../../assets/svg/reconisged/focal.svg';
import capsule from '../../assets/svg/reconisged/capsule.svg';
import ring from "../../assets/svg/circle.svg";

const ReconisedBanner = () => {
  return (
    <>
      <section className=" bg-bannerbg relative">
        <div className=" sub-section">
          <h4 className=" title">Recognised by</h4>
          <ul className=" text-lg font-bold text-secondary mt-10 flex sm:grid grid-cols-5 max-sm:grid-cols-3 justify-between items-center 2xl:gap-10 md:gap-5  gap-5">
            <li className="px-2 flex justify-center">
              <img src={capsule} className='reconisedimg' alt=""    />
            </li>
            <li className="px-2 flex justify-center">
              <img src={spheral} className='reconisedimg' alt="" />
            </li>
            <li className="px-2 flex justify-center">
              <img src={luminos} className='reconisedimg' alt="" />
            </li>
            <li className="px-2 flex justify-center sm:block hidden">
              <img src={focalpoint} className='reconisedimg' alt="" />
            </li>
            <li className="px-2 flex justify-center sm:block hidden">
              <img src={spheral} className='reconisedimg' alt="" />
            </li>
          </ul>
          <ul className='text-lg font-bold text-secondary mt-5 flex  justify-center items-center 2xl:gap-10 md:gap-5 '>
          <li className="px-2 flex justify-center sm:hidden block flex-1 ">
              <img src={focalpoint} className='reconisedimg mx-auto' alt=""/>
            </li>
            <li className="px-2 flex justify-center sm:hidden block flex-1">
              <img src={spheral} className='reconisedimg mx-auto' alt=""  />
            </li>
          </ul>
        </div>
        {/* <img
        src={ring}
        alt=""
        className=" max-md:hidden absolute right-10  -bottom-0"
      /> */}
      </section>
    </>
  );
};

export default ReconisedBanner;
