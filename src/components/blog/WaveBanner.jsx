import React from 'react';
import blogdots from '../../assets/svg/blogdots.svg';
import circle from '../../assets/svg/circle.svg';
import dottcircle from '../../assets/svg/dotcircle.svg';

const WaveBanner = () => {
  return (
    <div className=" relative mt-4">
      <div className="jobdetailbanner flex justify-center items-center  !w-[80%] mx-auto h-[200px]">
        <div className=" relative flex">
          <img src={blogdots} alt="" className=" relative -top-4 left-2" />
          <h2 className=" text-4xl  text-white font-semibold">Blog</h2>
        </div>
      </div>
   
      <img
        src={dottcircle}
        alt=""
        className="absolute top-28 right-8 hidden md:block"
      />
      <img
        src={circle}
        alt=""
        className=" absolute top-0 -right-10 hidden md:block "
      />
    </div>
  );
};

export default WaveBanner;
