import React, { useRef, useState } from 'react';
import card1 from '../../assets/images/blog/blog1.png';
import card2 from '../../assets/images/blog/blog2.png';
import card3 from '../../assets/images/blog/blog3.png';
import card4 from '../../assets/images/blog/blog4.png';
import Button from '../button/Button';
import eye from '../../assets/svg/eye.svg';
import liked from '../../assets/svg/likethumb.svg';
import message from '../../assets/svg/msg.svg';
import rightarrow from '../../assets/rightarrow.svg';
import bottomElemenst from '../../assets/blog-dtl-svg-01.svg';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
// Swiper.use([Grid, Pagination]);

const BlogsCards = () => {
  return (
    <div>
      {/* <Swiper
         slidesPerView={3}
      grid={{
        rows: 2,
      }}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper> */}
      <section className=" sub-section ">
        <h4 className=" title text-start mx-auto pl-2 w-[90%]">
          Must read blogs
        </h4>
        <div className=" w-[90%] mx-auto grid grid-cols-3 gap-2 max-md:grid-cols-2 max-sm:grid-cols-1">
          <div className="mx-auto  2xl:max-w-cardmw max-w-mw350 mt-10  overflow-hidden   ">
            <img
              src={card1}
              alt=""
              className="  max-h-[160px] h-full w-full object-cover rounded-xl"
            />
            <div className="custom-shadow max-w-96  p-3  !bg-white  mx-auto relative z-50">
              <div className=" text-start flex  flex-col items-start">
                {' '}
                <h3 className="2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  General March 3, 2024
                </h3>
                <h4 className=" 2xl:text-2xl md:text-sm lg:text-base max-md:text-sm text-cblack font-semibold ">
                  Tellus at urna condimentum mattis Tellus at urna condim
                </h4>
                <p class=" 2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et magna aliqua...
                </p>
                <div className=" flex justify-between items-center w-full mt-2 mt-4">
                  <ul className=" text-xs text-primary flex gap-2 justify-start items-center">
                    <li className=" flex gap-1 items-center">
                      <img src={eye} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={message} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={liked} alt="" /> <span>170 </span>
                    </li>
                  </ul>
                  <a
                    href=""
                    className=" bg-primary px-2 py-1 text-white rounded-full text-[8px] font-medium flex items-center"
                  >
                    <span>Read More</span>
                    <img src={rightarrow} alt="" className=" max-h-5 max-w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto  2xl:max-w-cardmw max-w-mw350 mt-10  overflow-hidden   ">
            <img
              src={card2}
              alt=""
              className="  max-h-[160px] h-full w-full object-cover rounded-xl"
            />

            <div className="custom-shadow max-w-96 p-3    !bg-white  mx-auto relative z-50">
              <div className=" text-start flex  flex-col items-start">
                {' '}
                <h3 className="2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  General March 3, 2024
                </h3>
                <h4 className=" 2xl:text-2xl md:text-sm lg:text-base max-md:text-sm text-cblack font-semibold ">
                  Tellus at urna condimentum mattis Tellus at urna condim
                </h4>
                <p class=" 2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et magna aliqua...
                </p>
                <div className=" flex justify-between items-center w-full mt-2 mt-4">
                  <ul className=" text-xs text-primary flex gap-2 justify-start items-center">
                    <li className=" flex gap-1 items-center">
                      <img src={eye} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={message} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={liked} alt="" /> <span>170 </span>
                    </li>
                  </ul>
                  <a
                    href=""
                    className=" bg-primary px-2 py-1 text-white rounded-full text-[8px] font-medium flex items-center"
                  >
                    <span>Read More</span>
                    <img src={rightarrow} alt="" className=" max-h-5 max-w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="custom-shadow mx-auto  2xl:max-w-cardmw max-w-mw350 mt-10  overflow-hidden   ">
            <img
              src={card3}
              alt=""
              className="  max-h-[160px] h-full w-full object-cover rounded-xl"
            />

            <div className="custom-shadow max-w-96  p-3  !bg-white  mx-auto relative z-50">
              <div className=" text-start flex  flex-col items-start">
                {' '}
                <h3 className="2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  General March 3, 2024
                </h3>
                <h4 className=" 2xl:text-2xl md:text-sm lg:text-base max-md:text-sm text-cblack font-semibold ">
                  Tellus at urna condimentum mattis Tellus at urna condim
                </h4>
                <p class=" 2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et magna aliqua...
                </p>
                <div className=" flex justify-between items-center w-full  mt-4">
                  <ul className=" text-xs text-primary flex gap-2 justify-start items-center">
                    <li className=" flex gap-1 items-center">
                      <img src={eye} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={message} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={liked} alt="" /> <span>170 </span>
                    </li>
                  </ul>
                  <a
                    href=""
                    className=" bg-primary px-2 py-1 text-white rounded-full text-[10px] md:text-[14px] font-medium flex items-center"
                  >
                    <span>Read More</span>
                    <img src={rightarrow} alt="" className=" max-h-5 max-w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="custom-shadow mx-auto  2xl:max-w-cardmw max-w-mw350 mt-10  overflow-hidden   ">
            <img
              src={card3}
              alt=""
              className="  max-h-[160px] h-full w-full object-cover rounded-xl"
            />

            <div className="custom-shadow max-w-96  p-3  !bg-white  mx-auto relative z-50">
              <div className=" text-start flex  flex-col items-start">
                {' '}
                <h3 className="2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  General March 3, 2024
                </h3>
                <h4 className=" 2xl:text-2xl md:text-sm lg:text-base max-md:text-sm text-cblack font-semibold ">
                  Tellus at urna condimentum mattis Tellus at urna condim
                </h4>
                <p class=" 2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et magna aliqua...
                </p>
                <div className=" flex justify-between items-center w-full mt-2 mt-4">
                  <ul className=" text-xs text-primary flex gap-2 justify-start items-center">
                    <li className=" flex gap-1 items-center">
                      <img src={eye} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={message} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={liked} alt="" /> <span>170 </span>
                    </li>
                  </ul>
                  <a
                    href=""
                    className=" bg-primary px-2 py-1 text-white rounded-full text-[10px] md:text-[14px] font-medium flex items-center"
                  >
                    <span>Read More</span>
                    <img src={rightarrow} alt="" className=" max-h-5 max-w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="custom-shadow mx-auto  2xl:max-w-cardmw max-w-mw350 mt-10  overflow-hidden   ">
            <img
              src={card3}
              alt=""
              className="  max-h-[160px] h-full w-full object-cover rounded-xl"
            />

            <div className="custom-shadow max-w-96  p-3  !bg-white  mx-auto relative z-50">
              <div className=" text-start flex  flex-col items-start">
                {' '}
                <h3 className="2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  General March 3, 2024
                </h3>
                <h4 className=" 2xl:text-2xl md:text-sm lg:text-base max-md:text-sm text-cblack font-semibold ">
                  Tellus at urna condimentum mattis Tellus at urna condim
                </h4>
                <p class=" 2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et magna aliqua...
                </p>
                <div className=" flex justify-between items-center w-full mt-2 mt-4">
                  <ul className=" text-xs text-primary flex gap-2 justify-start items-center">
                    <li className=" flex gap-1 items-center">
                      <img src={eye} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={message} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={liked} alt="" /> <span>170 </span>
                    </li>
                  </ul>
                  <a
                    href=""
                    className=" bg-primary px-2 py-1 text-white rounded-full text-[10px] md:text-[14px] font-medium flex items-center"
                  >
                    <span>Read More</span>
                    <img src={rightarrow} alt="" className=" max-h-5 max-w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="custom-shadow mx-auto  2xl:max-w-cardmw max-w-mw350 mt-10  overflow-hidden   ">
            <img
              src={card3}
              alt=""
              className="  max-h-[160px] h-full w-full object-cover rounded-xl"
            />

            <div className="custom-shadow max-w-96  p-3  !bg-white  mx-auto relative z-50">
              <div className=" text-start flex  flex-col items-start">
                {' '}
                <h3 className="2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  General March 3, 2024
                </h3>
                <h4 className=" 2xl:text-2xl md:text-sm lg:text-base max-md:text-sm text-cblack font-semibold ">
                  Tellus at urna condimentum mattis Tellus at urna condim
                </h4>
                <p class=" 2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et magna aliqua...
                </p>
                <div className=" flex justify-between items-center w-full mt-2 mt-4">
                  <ul className=" text-xs text-primary flex gap-2 justify-start items-center">
                    <li className=" flex gap-1 items-center">
                      <img src={eye} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={message} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={liked} alt="" /> <span>170 </span>
                    </li>
                  </ul>
                  <a
                    href=""
                    className=" bg-primary px-2 py-1 text-white rounded-full text-[10px] md:text-[14px] font-medium flex items-center"
                  >
                    <span>Read More</span>
                    <img src={rightarrow} alt="" className=" max-h-5 max-w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="custom-shadow mx-auto  2xl:max-w-cardmw max-w-mw350 mt-10  overflow-hidden   ">
            <img
              src={card3}
              alt=""
              className="  max-h-[160px] h-full w-full object-cover rounded-xl"
            />

            <div className="custom-shadow max-w-96  p-3  !bg-white  mx-auto relative z-50">
              <div className=" text-start flex  flex-col items-start">
                {' '}
                <h3 className="2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  General March 3, 2024
                </h3>
                <h4 className=" 2xl:text-2xl md:text-sm lg:text-base max-md:text-sm text-cblack font-semibold ">
                  Tellus at urna condimentum mattis Tellus at urna condim
                </h4>
                <p class=" 2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et magna aliqua...
                </p>
                <div className=" flex justify-between items-center w-full mt-2 mt-4">
                  <ul className=" text-xs text-primary flex gap-2 justify-start items-center">
                    <li className=" flex gap-1 items-center">
                      <img src={eye} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={message} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={liked} alt="" /> <span>170 </span>
                    </li>
                  </ul>
                  <a
                    href=""
                    className=" bg-primary px-2 py-1 text-white rounded-full text-[10px] md:text-[14px] font-medium flex items-center"
                  >
                    <span>Read More</span>
                    <img src={rightarrow} alt="" className=" max-h-5 max-w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="custom-shadow mx-auto  2xl:max-w-cardmw max-w-mw350 mt-10  overflow-hidden   ">
            <img
              src={card3}
              alt=""
              className="  max-h-[160px] h-full w-full object-cover rounded-xl"
            />

            <div className="custom-shadow max-w-96  p-3  !bg-white  mx-auto relative z-50">
              <div className=" text-start flex  flex-col items-start">
                {' '}
                <h3 className="2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  General March 3, 2024
                </h3>
                <h4 className=" 2xl:text-2xl md:text-sm lg:text-base max-md:text-sm text-cblack font-semibold ">
                  Tellus at urna condimentum mattis Tellus at urna condim
                </h4>
                <p class=" 2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et magna aliqua...
                </p>
                <div className=" flex justify-between items-center w-full mt-2 mt-4">
                  <ul className=" text-xs text-primary flex gap-2 justify-start items-center">
                    <li className=" flex gap-1 items-center">
                      <img src={eye} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={message} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={liked} alt="" /> <span>170 </span>
                    </li>
                  </ul>
                  <a
                    href=""
                    className=" bg-primary px-2 py-1 text-white rounded-full text-[10px] md:text-[14px] font-medium flex items-center"
                  >
                    <span>Read More</span>
                    <img src={rightarrow} alt="" className=" max-h-5 max-w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="custom-shadow mx-auto  2xl:max-w-cardmw max-w-mw350 mt-10  overflow-hidden   ">
            <img
              src={card3}
              alt=""
              className="  max-h-[160px] h-full w-full object-cover rounded-xl"
            />

            <div className="custom-shadow max-w-96  p-3  !bg-white  mx-auto relative z-50">
              <div className=" text-start flex  flex-col items-start">
                {' '}
                <h3 className="2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  General March 3, 2024
                </h3>
                <h4 className=" 2xl:text-2xl md:text-sm lg:text-base max-md:text-sm text-cblack font-semibold ">
                  Tellus at urna condimentum mattis Tellus at urna condim
                </h4>
                <p class=" 2xl:text-base max-md:text-xs md:text-xs text-secondary font-normal">
                  Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et magna aliqua...
                </p>
                <div className=" flex justify-between items-center w-full  mt-4">
                  <ul className=" text-xs text-primary flex gap-2 justify-start items-center">
                    <li className=" flex gap-1 items-center">
                      <img src={eye} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={message} alt="" /> <span>170 </span>
                    </li>
                    <li className=" flex gap-1 items-center ">
                      <img src={liked} alt="" /> <span>170 </span>
                    </li>
                  </ul>
                  <a
                    href=""
                    className=" bg-primary px-2 py-1 text-white rounded-full text-[10px] md:text-[14px] font-medium flex items-center"
                  >
                    <span>Read More</span>
                    <img src={rightarrow} alt="" className=" max-h-5 max-w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <img src={bottomElemenst} alt=""  className=''/>
    </div>
  );
};

export default BlogsCards;
