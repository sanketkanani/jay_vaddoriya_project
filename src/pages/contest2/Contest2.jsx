import React from 'react';
import circle from '../../assets/svg/circle.svg';
import dottcircle from '../../assets/svg/dotcircle.svg';
import clock from '../../assets/svg/clock.svg';
import date from '../../assets/svg/date.svg';
import database from '../../assets/svg/database.svg';
import compiled from '../../assets/svg/compiled.svg';
import yellowhex from '../../assets/svg/yellowhexagonel.svg';
import whitehexa from '../../assets/svg/whitehexagonel.svg';
import orangehexa from '../../assets/svg/whitehexagonel-2.svg';
import tikmark from '../../assets/svg/tikmark.svg';
import wave from '../../assets/svg/wave.svg';

const Contest2 = () => {
  return (
    <div className="relative">
      <section className="  bg-cnavy h-[700px] max-sm:h-[650px] relative !mt-0  -top-36 md:-z-10 flex justify-center items-center">
        <div className=" sub-section py-10 relative z-10">
          <div className=" max-w-mw1328 flex relative top-10 max-sm:top-20 mx-auto lg:gap-20 max-sm:gap-10 sm:gap-5 max-sm:flex-col  justify-between items-start pt-[150px]">
            <div className="text-start flex-1 mx-auto">
              <div className=" 2xl:text-2xl mx-auto font-medium text-primary max-lg:text-sm lg:text-sm">
                MAANG Careers Explore the Limit
              </div>
              <h4 className=" title !text-white mt-2">Coding Contest #100</h4>

              <p className=" 2xl:text-lg font-medium mt-2 text-white max-lg:text-sm lg:text-sm mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo con Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatu
              </p>
              <div className=" mt-8 flex gap-5 items-center">
                <button className="custom-button !bg-primary border-primary !text-white">
                  Register
                </button>
                <button className="custom-button bg-transparent text-primary border-primary border-solid">
                  {' '}
                  Your Submission
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center mx-auto  items-center my-auto  ">
              <div className=" mx-auto p-4 custom-shadow border border-primary text-start text-white ">
                <h1 className="fs24">Contest starts In</h1>
                <div className=" flex mt-5 gap-2 max-w-[420px] w-full">
                  <div className="bg-primary rounded-md text-center p-4 flex-1">
                    <h4 className="fs36">3 </h4>
                    <h3 className="fs16">Days</h3>
                  </div>
                  <div className="bg-primary rounded-md text-center p-4 flex-1">
                    <h4 className="fs36">5 </h4>
                    <h3 className="fs16">Hours</h3>
                  </div>
                  <div className="bg-primary rounded-md text-center p-4 flex-1">
                    <h4 className="fs36">20</h4>
                    <h3 className="fs16">Min</h3>
                  </div>
                  <div className="bg-primary rounded-md text-center p-4 flex-1">
                    <h4 className="fs36">54</h4>
                    <h3 className="fs16">Sec</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <img src={circle} alt="" className=" absolute -left-10 max-md:hidden" /> */}
        <img
          src={circle}
          alt=""
          className=" absolute top-[32%] -right-12 max-md:hidden"
        />
        <img
          src={circle}
          alt=""
          className=" absolute -left-10 max-md:hidden
         "
        />
        <img
          src={dottcircle}
          alt=""
          className=" absolute right-10 top-[40%] max-md:hidden"
        />
        <span className='glow_elements_con right-0 top-[30%] !opacity-[20%] max-md:hidden !w-[180px]'></span>
      </section>
      <section className=" sub-section relative -top-32">
        <h1 className=" title">Content Details</h1>
        <ul className=" mt-10 cust fs20  text-secondary grid grid-cols-4 max-sm:grid-cols-2 gap-3 flex-wrap justify-between items-start text-start">
          <li className="  bg-white custom-shadow   ">
            {' '}
            <div className="flex gap-3 items-center p-5">
              <span>
                <img src={date} alt="" />
              </span>{' '}
              1 February 2024
            </div>
            <span className="flex gap-3 items-center py-1 px-5 pb-5">
              {' '}
              <span>
                <img src={clock} alt="" />
              </span>{' '}
              7:00PM
            </span>
            <div className=" bg-primary px-1 py-2 text-center text-white fs16  mt-2  rounded-b-md">
              {' '}
              Date & Time
            </div>
          </li>
          <li className="  bg-white custom-shadow   ">
            {' '}
            <div className="flex gap-3 items-center p-5">
              <span>
                <img src={database} alt="" />
              </span>{' '}
              Data Structure
            </div>
            <span className="flex gap-3 items-center py-1 px-2 text-white">
              {' '}
              <span></span> 7:00PM
            </span>
            <div className=" bg-primary px-1 py-2 text-center text-white fs16  mt-2  rounded-b-md">
              {' '}
              Topic
            </div>
          </li>
          <li className="  bg-white custom-shadow   ">
            {' '}
            <div className="flex gap-3 items-center p-5">
              <span>
                <img src={clock} alt="" />
              </span>{' '}
              30:00 min
            </div>
            <span className="flex gap-3 items-center py-1 px-2 text-white">
              {' '}
              <span></span> 7:00PM
            </span>
            <div className=" bg-primary px-1 py-2 text-center text-white fs16  mt-2  rounded-b-md">
              {' '}
              Date & Time
            </div>
          </li>
          <li className="  bg-white custom-shadow   ">
            {' '}
            <div className="flex gap-3 items-center p-5 text-nowrap">
              <span>
                <img src={compiled} alt="" />
              </span>{' '}
              Coding in Compiled
            </div>
            <span className="flex gap-3 items-center py-1 px-2 text-white">
              {' '}
              <span></span> 7:00PM
            </span>
            <div className=" bg-primary px-1 py-2 text-center text-white fs16  mt-2  rounded-b-md">
              {' '}
              Content Style
            </div>
          </li>
        </ul>

        <p className=" fs20 font-medium  mt-5 text-start text-secondary">
          <span className=" text-cblack"> Subject:</span> Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore Ut enim ad
          minim veniam,
        </p>
        <div className=" mt-14 max-w-[1015px] mx-auto ">
          <h4 className=" title">Rewards</h4>
          <div className=" mx-auto flex justify-around w-[80%] items-center mt-5 ">
            <div className=" relative shrink-0">
              <img src={yellowhex} alt="" className="" class="img-fluid" />
              <div className=" absolute top-1/2 left-1/2 w-[51%]" style={{transform: 'translate(-50%,-50%)'}}>
                <h3 className=" text-white px-3  rounded-full inline  p-1 bg-black font-medium 2xl:text-base max-2xl:text-xs">
                  1<sup>st </sup> <span className="pl-1">Price</span>
                </h3>
                <div className=" flex items-center gap-2 text-xl font-semibold mt-3">
                  <h1 className="mx-auto px-2 bg-black rounded-full text-cyellow ">
                    ₹{' '}
                  </h1>
                  5000
                </div>
              </div>
            </div>
            <div className=" relative shrink-0">
              <img src={whitehexa} alt="" className="" class="img-fluid" />
              <div className=" absolute top-1/2 left-1/2 w-[51%]" style={{transform: 'translate(-50%,-50%)'}}>
                <h3 className=" text-white px-3  rounded-full inline  p-1 bg-black font-medium 2xl:text-base max-2xl:text-xs">
                  2<sup>nd </sup> <span className="pl-1">Price</span>
                </h3>
                <div className=" flex items-center gap-2 text-xl font-semibold mt-3">
                  <h1 className="mx-auto px-2 bg-black rounded-full text-white ">
                    ₹{' '}
                  </h1>
                  3000
                </div>
              </div>
            </div>
            <div className=" relative shrink-0">
              <img src={orangehexa} alt="" className="" class="img-fluid" />
              <div className=" absolute top-1/2 left-1/2 w-[51%]" style={{transform: 'translate(-50%,-50%)'}}>
                <h3 className=" text-white px-3  rounded-full inline  p-1 bg-black font-medium 2xl:text-base max-2xl:text-xs">
                  3<sup>rd </sup> <span className="pl-1">Price</span>
                </h3>
                <div className=" flex items-center gap-2 text-xl font-semibold mt-3">
                  <h1 className="mx-auto px-2 bg-black rounded-full text-corange ">
                    ₹{' '}
                  </h1>
                  5000
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-10 w-[90%] mx-auto flex justify-between items-start gap-10 max-md:flex-col  ">
            <ul className="my-2 text-cblack  mx-auto text-start bg-white custom-shadow p-8  ">
              <h1 className=" lg:text-[34px] text-3xl !font-bold pb-6 border-b border-gray-300">
                Contest Important Info
              </h1>
              <h4 className=" text-base font-normal text-secondary mt-5 mb-5">
                Information
              </h4>

              <li className=" text-sm lg:text-base font-medium my-2 flex items-center mb-5">
                <img src={tikmark} alt="" className="" />
                <span className="ml-2">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor s
                </span>
              </li>
              <li className=" text-sm lg:text-base font-medium my-2 flex items-center mb-5">
                <img src={tikmark} alt="" />
                <span className="ml-2">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor s
                </span>
              </li>
              <li className=" text-sm lg:text-base font-medium my-2 flex items-center mb-5">
                <img src={tikmark} alt="" />
                <span className="ml-2">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor s
                </span>
              </li>
              <li className=" text-sm lg:text-base font-medium my-2 flex items-center mb-5">
                <img src={tikmark} alt="" />
                <span className="ml-2">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor s
                </span>
              </li>
              <li className=" text-sm lg:text-base font-medium my-2 flex items-center mb-5">
                <img src={tikmark} alt="" />
                <span className="ml-2">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor s
                </span>
              </li>
              <li className=" text-sm lg:text-base font-medium my-2 flex items-center mb-5">
                <img src={tikmark} alt="" />
                <span className="ml-2">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor s
                </span>
              </li>
              <li className=" text-sm lg:text-base font-medium my-2 flex items-center mb-5">
                <img src={tikmark} alt="" />
                <span className="ml-2">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor s
                </span>
              </li>
              <li className=" text-sm lg:text-base font-medium my-2 flex items-center mb-5">
                <img src={tikmark} alt="" />
                <span className="ml-2">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor s
                </span>
              </li>
              <li className=" text-sm lg:text-base font-medium my-2 flex items-center">
                <img src={tikmark} alt="" />
                <span className="ml-2">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor s
                </span>
              </li>
            </ul>
            <ul className="my-2 text-cblack  text-start custom-shadow p-8 mx-auto">
              <h1 className="fs36 pb-6 !font-bold border-b border-gray-300">Rules & Restriction</h1>
              <h4 className=" text-base font-normal text-secondary mt-5 mb-5 ">
                Rules
              </h4>
              <li className=" text-sm lg:text-base font-medium my-2 flex items-center mb-5">
                <img src={tikmark} alt="" className="" />
                <span className="ml-2">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor s
                </span>
              </li>
              <li className=" text-sm lg:text-base font-medium my-2 flex items-center mb-5">
                <img src={tikmark} alt="" />
                <span className="ml-2">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor s
                </span>
              </li>
              <li className=" text-sm lg:text-base font-medium my-2 flex items-center mb-5">
                <img src={tikmark} alt="" />
                <span className="ml-2">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor s
                </span>
              </li>
              <li className=" text-sm lg:text-base font-medium my-2 flex items-center mb-5">
                <img src={tikmark} alt="" />
                <span className="ml-2">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor s
                </span>
              </li>
              <li className=" text-sm lg:text-base font-medium my-2 flex items-center mb-5">
                <img src={tikmark} alt="" />
                <span className="ml-2">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor s
                </span>
              </li>
              <li className=" text-sm lg:text-base font-medium my-2 flex items-center mb-5">
                <img src={tikmark} alt="" />
                <span className="ml-2">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor s
                </span>
              </li>
            </ul>
          </div>
        </div>
        <img
          src={circle}
          alt=""
          className=" absolute top-1/2 -left-36 max-md:hidden
         "
        />
        <img
          src={dottcircle}
          alt=""
          className=" absolute -left-10 top-1/2  max-md:hidden"
        />
        <img
          src={dottcircle}
          alt=""
          className=" absolute -right-10 bottom-[5%] max-md:hidden"
        />
        <span className='glow_elements_con -right-10 bottom-[0%] !opacity-[22%] !w-[180px]'></span>
        <img
          src={circle}
          alt=""
          className=" absolute -right-36 bottom-[15%] max-md:hidden
         "
        />
        <img
          src={wave}
          alt=""
          className=" absolute -left-28 bottom-[15%] max-md:hidden"
        />
        <span className='glow_elements_con -left-28 bottom-[20%] !opacity-[22%] !w-[180px]'></span>
      </section>
      <img
        src={dottcircle}
        alt=""
        className=" absolute right-10 top-[49%] max-md:hidden"
      />
      <img
          src={wave}
          alt=""
          className=" absolute top-[45%]  right-0 max-md:hidden"
        />
    </div>
  );
};

export default Contest2;
