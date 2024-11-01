import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import rightarrow from "../../assets/rightarrow.svg";
import blogmain from "../../assets/images/blog/blog.png";
import Button from "../button/Button";
import eye from "../../assets/svg/eye.svg";
import message from "../../assets/svg/msg.svg";
import liked from "../../assets/svg/likethumb.svg";
import { Link } from "react-router-dom";

const BlogDetail = ({ blogs }) => {
  const getDate = (dateString) => {
    const date = new Date(dateString);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedDate = `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;

    return formattedDate;
  };

  return (
    <div className="relative">
      <section className=" sub-section relative z-10">
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper mx-auto  "
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            650: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
          }}
        >
          {blogs?.slice?.(0, 6)?.map((blog, idx) => {
            return (
              <SwiperSlide key={blog?.id} className="bg-transparent">
                <div className=" w-[90%] max-w-mw1328 flex mx-auto lg:gap-10 max-sm:gap-10 sm:gap-5 max-md:flex-col justify-between items-stretch">
                  <div className="flex-1 ">
                    <img
                      src={blog?.photo}
                      alt=""
                      className="  w-full h-full  object-cover object-center rounded-xl   "
                    />
                  </div>
                  <div className="text-start flex-1">
                    <h3 className=" sub-title !text-sm  !pl-0 ">
                      General • {getDate(blog?.date)} • 4 min
                    </h3>
                    <h4 className="text-2xl lg:text-3xl font-semibold mb-4 mt-2">{blog?.title}</h4>
                    <p className=" text-sm text-secondary mt-2 mb-6 max-h-[100px] text-ellipsis whitespace-normal overflow-hidden ">
                      {blog?.text}
                    </p>
                    <Link to={"/blog/"+blog?.id} className="">
                      <Button
                        image={rightarrow}
                        text="Read More"
                        bgColor="bg-primary"
                        textColor="text-white"
                        isTextBeforeImage={true}
                      />
                    </Link>

                    <ul className=" text-base text-primary mt-5 flex gap-4 justify-start items-center">
                      <li className=" flex gap-2 px-2 text-nowrap text-sm">
                        <img src={eye} alt="" />{" "}
                        <span>{blog?.views} Views</span>
                      </li>
                      <li className=" flex gap-2 px-4 text-nowrap text-sm">
                        <img src={message} alt="" /> <span>170 Views</span>
                      </li>
                      <li className=" flex gap-2 px-4 text-nowrap text-sm">
                        <img src={liked} alt="" /> <span>170 Views</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      {/* <span className='glow_elements_con top-0 right-5 !w-[200px] !opacity-[100%] max-md:hidden'></span> */}
    </div>
  );
};

export default BlogDetail;
