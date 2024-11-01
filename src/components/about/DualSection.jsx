import React from 'react';
import Button from '../button/Button';
import rightarrow from '../../assets/svg/Rightsidearrow/whiteRightarrow.svg';
import dualimg from '../../assets/images/about/dualsection.png';
import circle from '../../assets/svg/circle.svg';
import dottcircle from '../../assets/svg/dotcircle.svg';

const DualSection = () => {
  return (
    <div className=" relative bg-bannerbg">
      <section className="sub-section !w-[90%]">
        <div className=" max-w-mw1328 flex mx-auto lg:gap-20 max-sm:gap-10 sm:gap-5 max-sm:flex-col  justify-between items-center md:items-start">
          <div className="text-start flex-1 md:ml-20">
            <h4 className=" title">Become an instructor</h4>
            <h3 className=" text-base font-medium text-secondary ">
              let's join us with your knowledge
            </h3>
            <p className="  text-sm text-secondary font-normal mt-4  !pl-0 mb-8 ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore Ut enim ad minim veniam, Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore Ut enim ad minim veniam,Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore Ut enim ad minim veniam,
            </p>
            <Button
              text="Become An Instructor"
              isTextBeforeImage={true}
              
              image={rightarrow}
              bgColor="bg-primary"
              textColor="text-white"
              className="mt-4"
            />
          </div>
          <div className="flex-1 w-full text-left">
            <img src={dualimg} alt="" className="  xl:w-[80%] h-[300px] w-[100%] object-cover rounded-3xl object-center-top inline-block" />
          </div>
        </div>
      </section>
      <img
        src={circle}
        alt=""
        className=" absolute  -right-10 bottom-2 max-lg:hidden "
      />
      <img
        src={dottcircle}
        alt=""
        className=" absolute  right-10 -bottom-16 max-lg:hidden "
      />
    </div>
  );
};

export default DualSection;
