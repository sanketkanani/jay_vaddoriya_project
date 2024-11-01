import React, { useEffect, useState } from "react";
import { Pagination, Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import ring from "../../assets/svg/circle.svg";
import waveLine from "../../assets/wave-line-01.svg";
import dottcircle from "../../assets/svg/dotcircle.svg";
import { GetMentors } from "../../services/Home.service";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HerosCarasol = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const getMentors = async () => {
      try {
        const mentorsData = await GetMentors();
        setMentors(mentorsData);
      } catch (err) {
        console.log(err);
      }
    };
    getMentors();
  }, []);

  console.log(mentors);

  const settings = {
    dots: true,
    infinite: mentors.length >= 4,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: mentors.length >= 4,
    autoplaySpeed: 8000,
    cssEase: "ease-in-out",
    arrows: mentors.length >= 4,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "20px", // Reduce the padding here for better centering
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className=" relative   bg-bannerbg py-[20px]" id="mentors">
      <section className="2xl:max-w-[1280px] md:max-w-[93%]  mx-auto">
        <h6 className=" 2xl:text-3xl max-2xl:text-lg text-primary font-medium">
          Mentors
        </h6>
        <h5 className="title mt-2">Meet The Heros</h5>
        <p className=" sub-title">
          On MAANG careers, instructors from all over the world <br /> who work
          at MAANG companies
        </p>
        <div className=" mt-8">
          <Slider {...settings} className="px-[10px] md:px-[40px]">
            {mentors?.map((mentor, idx) => (
              <div key={idx} className="relative z-10">
                <div
                  className="border max-w-[260px] mx-auto border-primary p-4 bg-white flex flex-col justify-center items-center  rounded-3xl   mb-8"
                  style={{
                    boxShadow: "rgba(45, 178, 196, 0.2) 0px 4px 12px",
                  }}
                >
                  <img
                    src={mentor?.photo}
                    alt=""
                    className="  h-20 w-20 rounded-full object-cover mb-5"
                  />
                  <h6 className=" 2xl:text-xl text-lg font-medium text-cblack my-1">
                    {mentor?.name}
                  </h6>
                  <h6 className=" 2xl:text-base text-sm text-secondary font-medium my-2 mb-5">
                    {mentor?.maintext} <br /> {mentor?.subtext}
                  </h6>
                  <p className=" 2xl:text-base text-sm text-secondary font-medium for_line_count">
                    {mentor?.comment}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <img
        src={ring}
        alt=""
        className=" absolute top-16 left-5 max-md:hidden about_mentor"
      />
      <img src={dottcircle} alt="" className=" absolute top-5 right-[10%]   " />
      <img
        src={ring}
        alt=""
        height={100}
        width={100}
        className=" absolute top-[15%] -right-10 max-lg:hidden"
      />
      <img
        src={ring}
        alt=""
        height={100}
        width={100}
        className="absolute top-[14%] left-[4%] translate-y-[-50%] for_display_none max-lg:hidden"
      />
      <span className="glow_elements"></span>
    </div>
  );
};

export default HerosCarasol;
