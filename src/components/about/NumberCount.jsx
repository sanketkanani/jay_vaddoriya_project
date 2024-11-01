import React from 'react';
import img1 from '../../assets/svg/about/numbercount1.svg';
import img2 from '../../assets/svg/about/numbercount2.svg';
import img3 from '../../assets/svg/about/countin3.svg';
import img4 from '../../assets/svg/about/numbercount4.svg';
import circle from '../../assets/svg/circle.svg';
import ring from '../../assets/svg/smallring.svg';
import dottcircle from '../../assets/svg/dotcircle.svg';
import mew from '../../assets/svg/mew.svg';

const NumberCount = () => {
  return (
    <div className=" relative ">
      <section className="sub-section">
        <div className=" grid grid-cols-4 place-items-center max-sm:grid-cols-2 justify-center items-start 2xl:gap-10 md:gap-5 max-md:flex-wrap gap-5 ">
          <div className=" flex justify-start items-start gap-3">
            <img src={img1} alt="" />
            <div className=" flex justify-center items-start flex-col mt-1">
              <h5 className=" text-4xl font-bold text-center">
                100+
              </h5>
              <h6 className=" font-normal text-sm text-secondary text-nowrap mt-1">
                Mentors
              </h6>
            </div>
          </div>
          <div className="flex justify-start items-start gap-3">
            <img src={img2} alt="" />
            <div className=" flex justify-center items-start flex-col mt-1">
              <h5 className="text-4xl font-bold">
                5+
              </h5>
              <h6 className=" font-normal text-sm text-secondary text-nowrap mt-1">
                Years experience
              </h6>
            </div>
          </div>
          <div className="flex justify-start items-start gap-3">
            <img src={img3} alt="" />
            <div className=" flex justify-center items-start flex-col mt-1">
              <h5 className="text-4xl font-bold">
                50+
              </h5>
              <h6 className=" font-normal text-sm text-secondary text-nowrap mt-1">
                Company
              </h6>
            </div>
          </div>
          <div className="flex justify-start items-start gap-3">
            {' '}
            <img src={img4} alt="" />
            <div className=" flex justify-center items-start flex-col mt-1">
              <h5 className="text-4xl font-bold">
                62+
              </h5>
              <h6 className=" font-normal text-sm text-secondary text-nowrap mt-1">
                Org collaborations
              </h6>
            </div>
          </div>
        </div>
      </section>
      <img src={circle} alt="" className=" absolute -right-10 top-0 -z-10 max-lg:hidden " />
      <img src={ring} alt="" className=" absolute left-20 top-12 max-lg:hidden" />
      <img src={ring} alt="" className=" absolute right-1/4 bottom-0 max-lg:hidden" />
      <img src={dottcircle} alt="" className=" absolute right-20 top-14 max-lg:hidden" />
      <img src={mew} alt="" className=" absolute left-1/4 top-0 max-lg:hidden" />
    </div>
  );
};

export default NumberCount;
