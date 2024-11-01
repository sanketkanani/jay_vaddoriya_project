import React from 'react';
import img1 from '../../assets/images/about/choosecomp1.png';
import img2 from '../../assets/images/about/choosecomp2.png';
import img3 from '../../assets/images/about/choosecomp3.png';
import img4 from '../../assets/images/about/choosecomp4.png';
import img5 from '../../assets/images/about/choosecomp5.png';
import img6 from '../../assets/images/about/choosecomp6.png';
import circle from '../../assets/svg/circle.svg';
import dottcircle from '../../assets/svg/dotcircle.svg';

const ChooseComp = () => {
  return (
    <div className=" relative pb-14 choose_about">
      <section className=" sub-section relative z-20">
        <div className=" mx-auto flex flex-col justify-center items-center">
          <h6 className=" text-xl text-primary font-medium">
            Why choose us
          </h6>
          <h4 className="title md:w-2/4 text-center mx-auto mt-2 !mr-auto">
            Our interview preparation strategy is cost and time effective
          </h4>
          <p className=" sub-title md:w-2/4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore Ut enim ad minim veniam,
          </p>
        </div>
        <div className=" mt-10 grid md:grid-cols-3 sm:grid-cols-2 gap-2 gap-y-10">
          <div className=" flex flex-col gap-1 justify-center items-center my-3">
            {' '}
            <img
              src={img1}
              className=" max-h-20 max-w-20 h-full w-full"
              alt=""
            />
            <h1 className=" 2xl:text-xl md:text-base  font-semibold max-md:text-sm mt-1 text-center ">
              Student Mentorship
            </h1>
            <p className="2xl:text-base md:text-xs max-md:text-xs font-normal text-secondary max-sm:w-4/5 max-sm:w-4/5">
              Boost skills via tailored mentorship, mastering interviews,
              strategic prep, and immersive training.
            </p>
          </div>
          <div className=" flex flex-col gap-1 justify-center items-center my-3">
            {' '}
            <img
              src={img2}
              className=" max-h-20 max-w-20 h-full w-full"
              alt=""
            />
            <h1 className=" 2xl:text-xl md:text-base  font-semibold max-md:text-sm mt-1 text-center ">
              Interactive with MAANG Employee
            </h1>
            <p className=" 2xl:text-base md:text-xs max-md:text-xs font-normal    text-secondary">
              Dive into mentor insights, excel, and unlock referral
              opportunities.
            </p>
          </div>
          <div className=" flex flex-col gap-1 justify-center items-center my-3">
            {' '}
            <img
              src={img3}
              className=" max-h-20 max-w-20 h-full w-full"
              alt=""
            />
            <h1 className=" 2xl:text-xl md:text-base  font-semibold max-md:text-sm mt-1 text-center ">
              Interactive group Sessions
            </h1>
            <p className="2xl:text-base md:text-xs max-md:text-xs font-normal text-secondary max-sm:w-4/5">
              Groups: 15-30 students, curated for optimal learning based on
              dates/schedules.
            </p>
          </div>
          <div className=" flex flex-col gap-1 justify-center items-center my-3">
            {' '}
            <img
              src={img4}
              className=" max-h-20 max-w-20 h-full w-full"
              alt=""
            />
            <h1 className=" 2xl:text-xl md:text-base  font-semibold max-md:text-sm mt-1 text-center ">
              Flexible Class Timings
            </h1>
            <p className="2xl:text-base md:text-xs max-md:text-xs font-normal text-secondary max-sm:w-4/5">
              Classes flexibly align with evenings, spanning Monday to Saturday
              inclusively.
            </p>
          </div>
          <div className=" flex flex-col gap-1 justify-center items-center my-3">
            {' '}
            <img
              src={img5}
              className=" max-h-20 max-w-20 h-full w-full"
              alt=""
            />
            <h1 className=" 2xl:text-xl md:text-base  font-semibold max-md:text-sm mt-1 text-center ">
              Unique code learning strategy
            </h1>
            <p className="2xl:text-base md:text-xs max-md:text-xs font-normal text-secondary max-sm:w-4/5">
              Over 30+ coding patterns, encompassing 500+ questions covered
            </p>
          </div>
          <div className=" flex flex-col gap-1 justify-center items-center my-3">
            {' '}
            <img
              src={img6}
              className=" max-h-20 max-w-20 h-full w-full"
              alt=""
            />
            <h1 className=" 2xl:text-xl md:text-base  font-semibold max-md:text-sm mt-1 text-center ">
              Upto date
            </h1>
            <p className="2xl:text-base md:text-xs max-md:text-xs font-normal text-secondary max-sm:w-4/5">
              Robust student portal: practice, quizzes, and mock tests for
              comprehensive learning.
            </p>
          </div>
        </div>
      </section>
      <img src={circle} alt="" className=" absolute -top-14 -right-10 max-lg:hidden" />
      <img src={dottcircle} alt="" className=" absolute top-10 right-10 max-lg:hidden" />
      <span className='glow_elements'></span>
    </div>
  );
};

export default ChooseComp;
