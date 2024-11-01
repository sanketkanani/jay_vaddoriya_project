import React from 'react';
import CountUp from 'react-countup';
import dottcircle from "../../assets/svg/dotcircle.svg"

const CountingBanner = () => {
  return (
    <div className="count_section bg-white relative xl:mt-0 mt-8 pt-10">
      <div
        className="sub-section lg:w-[75%] md-w-[755px] pb-10 relative z-10">
        <div className="  mx-auto grid grid-cols-4 max-sm:grid-cols-2 justify-center items-start 2xl:gap-10 md:gap-5 max-md:flex-wrap gap-5 relative z-10">
          <div className=" flex justify-center items-center flex-col">
            <h5 className="2xl:text-4xl font-bold max-2xl:text-4xl max-md:text-xl text-center">
              <CountUp end={10000} duration={5} separator="," />
              +
            </h5>
            <h6 className=" font-normal text-lg text-secondary text-nowrap mt-2">
              Students Trained
            </h6>
          </div>
          <div className=" flex justify-center items-center flex-col">
            <h5 className="2xl:text-4xl font-bold max-2xl:text-4xl max-md:text-xl">
              <CountUp end={99} duration={5} separator="," />%
            </h5>
            <h6 className=" font-normal text-lg text-secondary text-nowrap mt-2 ">
              Students Satisfaction
            </h6>
          </div>
          <div className=" flex justify-center items-center flex-col">
            <h5 className="2xl:text-4xl font-bold max-2xl:text-4xl max-md:text-xl">
              <CountUp end={75} duration={5} separator="," />+
            </h5>
            <h6 className=" font-normal text-lg text-secondary text-nowrap mt-2 ">
              MAANG Mentors
            </h6>
          </div>
          <div className=" flex justify-center items-center flex-col">
            <h5 className="2xl:text-4xl font-bold max-2xl:text-4xl max-md:text-xl">
              <CountUp end={100} duration={5} separator="," />+
            </h5>
            <h6 className=" font-normal text-lg text-secondary text-nowrap mt-2 ">
              Collab Organizations
            </h6>
          </div>
        </div>
      </div>
      {/* <img src={dottcircle} alt=''  className=' max-lg:hidden absolute -right-10 bottom-[52%] z-[3]'/> */}
      <span className='side_elements'></span>
      <span className='side_elements left'></span>
    </div>
  );
};

export default CountingBanner;
