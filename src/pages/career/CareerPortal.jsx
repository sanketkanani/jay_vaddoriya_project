import React from 'react';
import img1 from '../../assets/images/Career.jpg';
import uparrow from '../../assets/images/upchevron.svg';
import carrer from '../../assets/images/carreer.svg';
import heart from '../../assets/images/heart.svg';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState } from 'react';
import { Grid } from 'swiper/modules';
import rightsarrow from "../../assets/svg/Rightsidearrow/rightarrowgreen.svg"
import circle from "../../assets/svg/circle.svg"
import dottcircle from "../../assets/svg/dotcircle.svg"
import CareerPortalComp from '../../components/allcarasol/CareerPortalComp';


const CareerPortal = () => {
  return (
    <div className=" ">
      <section className=" sub-section !pt-0">
        <div className=" flex justify-between items-center   mx-auto  gap-3 relative">
          <div className=" text-start  flex-1  ">
            <h1 className=" title w-10/12">Looking for a New <br /> opportunities?</h1>
            <p className=" sub-title !p-0">Browse our latest job openings</p>
          </div>
          <div className=" flex-1">
            <img src={img1} alt="" className=" h-full w-[90%] ml-auto" />
          </div>
          <img src={circle} alt="" className=' absolute top-0 -right-[12%] max-md:hidden ' />
          <img src={dottcircle} alt="" className=' absolute top-[40%] -z-10 -right-[5%] max-md:hidden ' />

        </div>
        <div className=" mt-5 relative">
          <div className=" flex justify-between items-center max-sm:flex-col max-sm:items-start gap-3">
            {' '}
            <div className="2xl:text-2xl   text-start  rounded-md font-bold max-2xl:text-xl text-cblack">
              <span>Latest Job</span>
            </div>
            <div className=" flex gap-2 items-center">
              <button className=" bg-primary  border-primary text-white custom-button">
                Saved (2)
              </button>
              <button className=" bg-text flex items-center gap-2 text-primary border-primary custom-button">
                My Application
                <span><img src={rightsarrow} alt="" /></span>
              </button>
            </div>
          </div>

          <div className="  py-5 flex justify-start max-md:flex-col items-start  gap-5 max-md:gap-10 !mt-0">
            <div className=" flex-[3] shrink-0  w-full  custom-shadow p-4  ">
              <div className="2xl:text-2xl flex justify-between border-b gap-3 border-cborder text-nowrap   items-center pb-2  font-semibold max-2xl:text-base text-cblack my-2">
                <h4 className=" ">Filter Job</h4>
                <button className=" text-[9px] py-[0px] text-nowrap max-sm:hidden    px-2 font-medium rounded-full border border-primary text-primary">
                  Clear All
                </button>
              </div>
              <ul className=" text-start    ">
                <Accordion>
                  <AccordionItem
                    header={
                      <>
                        <li className="2xl:text-base flex justify-between items-center w-full p-1 font-bold max-2xl:text-sm text-cblack my-1">
                          <span>Job Type</span> <img src={uparrow} alt="" />
                        </li>
                      </>
                    }
                  >
                    <li className="2xl:text-sm flex justify-start gap-2  items-center p-1  font-semibold max-2xl:text-xs text-secondary my-1">
                      <input
                        type="checkbox"
                        className=" accent-primary !text-white"
                      />{' '}
                      <span> Job Type</span>
                    </li>
                    <li className="2xl:text-sm flex justify-start gap-2  items-center p-1  font-semibold max-2xl:text-xs text-secondary my-1">
                      <input
                        type="checkbox"
                        className=" accent-primary !text-white"
                      />{' '}
                      <span> Mentors</span>
                    </li>
                    <li className="2xl:text-sm flex justify-start gap-2  items-center p-1  font-semibold max-2xl:text-xs text-secondary my-1">
                      <input
                        type="checkbox"
                        className=" accent-primary !text-white"
                      />{' '}
                      <span> Admin</span>
                    </li>
                    <li className="2xl:text-sm flex justify-start gap-2  items-center p-1  font-semibold max-2xl:text-xs text-secondary my-1">
                      <input
                        type="checkbox"
                        className=" accent-primary !text-white"
                      />{' '}
                      <span> Others</span>
                    </li>
                  </AccordionItem>
                </Accordion>
              </ul>
              <ul className=" text-start  ">
                <Accordion>
                  <AccordionItem
                    header={
                      <>
                        <li className="2xl:text-base flex justify-between items-center w-full p-1 font-bold max-2xl:text-sm text-cblack my-1">
                          <span>Location</span> <img src={uparrow} alt="" />
                        </li>

                        {/* Additional content within the header */}
                      </>
                    }
                  >
                    <li className="2xl:text-sm flex justify-start gap-2  items-center p-1  font-semibold max-2xl:text-xs text-secondary my-1">
                      <input
                        type="checkbox"
                        className=" accent-primary !text-white"
                      />{' '}
                      <span> On site</span>
                    </li>
                    <li className="2xl:text-sm flex justify-start gap-2  items-center p-1  font-semibold max-2xl:text-xs text-secondary my-1">
                      <input
                        type="checkbox"
                        className=" accent-primary !text-white"
                      />{' '}
                      <span> Remote</span>
                    </li>
                  </AccordionItem>
                </Accordion>
              </ul>
              <ul className=" text-start  ">
                <Accordion>
                  <AccordionItem
                    header={
                      <>
                        <li className="2xl:text-base flex justify-between items-center w-full p-1 font-bold max-2xl:text-sm text-cblack my-1">
                          <span>Experience</span> <img src={uparrow} alt="" />
                        </li>

                        {/* Additional content within the header */}
                      </>
                    }
                  >
                    <li className="2xl:text-base flex justify-between  items-center p-1  font-bold max-2xl:text-sm text-cblack my-1">
                      <span> </span> <img src={uparrow} alt="" />
                    </li>
                    <li className="2xl:text-sm flex justify-start gap-2  items-center p-1  font-semibold max-2xl:text-xs text-secondary my-1">
                      <input
                        type="checkbox"
                        className=" accent-primary !text-white"
                      />{' '}
                      <span> Fresher</span>
                    </li>
                    <li className="2xl:text-sm flex justify-start gap-2  items-center p-1  font-semibold max-2xl:text-xs text-secondary my-1">
                      <input
                        type="checkbox"
                        className=" accent-primary !text-white"
                      />{' '}
                      <span> 1-2 Years</span>
                    </li>
                    <li className="2xl:text-sm flex justify-start gap-2  items-center p-1  font-semibold max-2xl:text-xs text-secondary my-1">
                      <input
                        type="checkbox"
                        className=" accent-primary !text-white"
                      />{' '}
                      <span>2 Years +</span>
                    </li>
                  </AccordionItem>
                </Accordion>
              </ul>

              <div className=" flex gap-3 ml-auto justify-end px-2 mt-5 sm:hidden">
                {' '}
                <button className=" text-xs py-1 px-2 font-medium rounded-full border border-primary text-primary">
                  Clear All
                </button>
                <a
                  href="/jobdetail"
                  class="  text-xs border py-1 px-3 rounded-full bg-primary text-white"
                >
                  Apply Now
                </a>
              </div>
            </div>
            <div className="mx-auto flex-[11]     text-start  ">
             <CareerPortalComp/>
            </div>
          <img src={circle} alt="" className=' absolute top-1/2 -left-[13%] max-md:hidden ' />


          </div>
        </div>


        {/*   for check  */}
      </section>
    </div>
  );
};

export default CareerPortal;






  







