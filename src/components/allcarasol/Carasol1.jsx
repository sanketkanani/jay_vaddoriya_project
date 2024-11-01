import avtar from "../../assets/images/girl.png";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import linkdien from "../../assets/svg/liendien.svg";
import fullcircle from "../../assets/svg/solidround.svg";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import dottcircle from "../../assets/svg/dotcircle.svg";
import circleandDots from "../../assets/IconCircleanddot.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetPlacementComment } from "../../services/Home.service";

const Carasol1 = () => {
  const [placement, setPlacement] = useState([]);

  useEffect(() => {
    const getPlacement = async () => {
      try {
        const placementData = await GetPlacementComment();
        setPlacement(placementData);
      } catch (err) {
        console.log(err);
      }
    };
    getPlacement();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
    responsive: [
      {
        breakpoint: 1024, // Adjusting for tablet
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "50px",
          arrows: false,
        },
      },
      {
        breakpoint: 767, // Adjusting for mobile
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "30px",
          arrows: false,
        },
      },
      {
        breakpoint: 480, // Smaller mobile devices
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "10px",
          arrows: false,
        },
      },
    ],
  };

  console.log(placement);

  return (
    <div className=" bg-white relative placement_stories_slider">
      <section className=" 2xl:max-w-[1500px] mx-auto px-5   relative z-10">
        <h4 className="title">Placement Stories</h4>
        <h5 className="sub-title">
          Discover the alumni who walked the same path as you
        </h5>
        <div className="mt-8">
          <Slider {...settings} className="md:px-[65px]">
            {placement.map((item, index) => (
              <div key={index} className="relative z-10">
                <div className="mt-5 custom-shadow text-start relative z-10 pb-16 mb-7 rounded-s-3xl bg-white pl-7 w-[95%] m-auto">
                  <div className="flex gap-5 items-center md:flex-wrap md:gap-5  gap-0 xl:gap-5">
                    <img
                      src={item.photo}
                      alt=""
                      className=" xl:h-28 xl:w-28 w-[70px] h-[70px] rounded-full relative -top-5 object-cover object-top"
                    />
                    <div className=" font-sans md:mb-4 sm:mb-4">
                      <h4 className="xl:text-2xl text-black font-semibold text-lg">
                        {item.name}
                      </h4>
                      <h6 className=" 2xl:text-sm font-normal text-secondary text-[12px]">
                        {item.company_and_role}
                      </h6>
                    </div>
                  </div>
                  <p className="2xl:text-base text-secondary font-normal text-[13px] max-sm:text-sm decription pr-12">
                    {item.text}
                  </p>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      item?.linked_in_link.startsWith("http")
                        ? item.linked_in_link
                        : `https://${item.linked_in_link}`
                    }
                  >
                    <img
                      src={linkdien}
                      alt=""
                      className="w-10 h-10 absolute bottom-5 right-5"
                    />
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <img
        src={dottcircle}
        alt=""
        className=" absolute right-10 top-1 max-md:hidden"
      />
      <img
        src={circleandDots}
        alt=""
        className=" absolute left-10 -top-14 max-md:hidden w-64 h-96"
      />
      <img
        src={fullcircle}
        alt=""
        className=" absolute top-1/2 max-md:hidden  -left-8"
      />
      <span className="glow_elements"></span>
    </div>
  );
};

export default Carasol1;
