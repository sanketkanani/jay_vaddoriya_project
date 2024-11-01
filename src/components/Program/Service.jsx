import React from 'react';
import image1 from '../../assets/images/services/service1.png';
import image2 from '../../assets/images/services/serviceimg1.png';
import image3 from '../../assets/images/services/serviceimg2.png';
import image4 from '../../assets/images/services/serviceimg3.png';
import circle from '../../assets/svg/circle.svg';

const Service = () => {
  return (
    <div className="relative bg-bannerbg">
      <section className=" sub-section mx-auto flex gap-10    items-center max-md:flex-col justify-center">
        <div className=" text-start px-10 mx-auto flex-1">
          <h6 className=" text-lg font-medium text-primary">Our services</h6>
          <h1 className="leading-[1] mt-2 text-3xl font-bold text-cblack max-md:pr-2">
            Who’s Eligible for this <br /> Programs?
          </h1>
          <p className="text-lg text-secondary mt-2">
            {' '}
            Choose who want to become a surf war developers at product based
            companies
          </p>
          <img
            src={image1}
            className=" relative w-9/12 xl:-top-5 mt-7 mx-auto "
            alt=""
          />
        </div>
        <div className="flex justify-center items-start gap-3 mx-auto   flex-1">
          <div className="flex-1 relative mx-auto">
            <img
              src={image2}
              alt=""
              className=" max-w-mw350 w-full  max-h-mh540 h-full"
            />
            <div className=" text-start px-4 absolute bottom-5">
              <h1 className=" text-white text-xl font-semibold ">
                Students
              </h1>
              <p className=" text-sm font-normal text-white ">
                Lorem ipsum dolor sit aconsectetur adipiscing elit, sed do eiusm
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4 mx-auto">
            <div className=" relative">
              <img
                src={image3}
                alt=""
                className=" max-h-64 h-full max-w-mw350 w-full"
              />
              <div className=" text-start px-4 absolute bottom-5">
                <h1 className=" text-white text-xl font-semibold ">
                  Students
                </h1>
                <p className=" text-sm font-normal text-white overflow-hidden h-[40px]">
                  Lorem ipsum dolor sit aconsectetur adipiscing elit, sed do
                  eiusm
                </p>
              </div>
            </div>
            <div className=" relative">
              <img
                src={image4}
                alt=""
                className="max-h-64 h-full max-w-mw350 w-full"
              />
              <div className=" text-start px-4 absolute bottom-5">
                <h1 className=" text-white text-xl font-semibold ">
                  Students
                </h1>
                <p className=" text-sm font-normal text-white overflow-hidden h-[40px]">
                  Lorem ipsum dolor sit aconsectetur adipiscing elit, sed do
                  eiusm
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className=" absolute bottom-32 -right-10 max-md:hidden">
        {' '}
        <img src={circle} alt=""  className='lg:hidden xl:block for_display_none'/>
      </div>
    </div>
  );
};

export default Service;
