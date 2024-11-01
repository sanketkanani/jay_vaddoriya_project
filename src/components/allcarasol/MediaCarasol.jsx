import card1 from "../../assets/images/card/card2.png";
import rightArrow from "../../assets/rightarrow.svg";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import horglass from "../../assets/svg/horglass.svg";
import dottcircle from "../../assets/svg/dotcircle.svg";
import circle from "../../assets/svg/circle.svg";
import CalendarIcon from "../../assets/calender-icon.svg";
import { GetMediaCoverage } from "../../services/Home.service";

const MediaCarasol = ({ backgroundColor }) => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaData = await GetMediaCoverage();
        setMedia(mediaData);
      } catch (err) {
        console.log(err);
      }
    };
    getMedia();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 9000,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024, // Adjusting for tablet
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: "10px",
          arrows: true,
        },
      },
      {
        breakpoint: 768, // Adjusting for mobile
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "30px",
          arrows: true,
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

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <div
      style={{
        background: backgroundColor ? backgroundColor : "#ffffff",
      }}
      className={`relative  media_covarage_main`}
      id="media"
    >
      <section className=" 2xl:max-w-[1500px] max-w-[95%] mx-auto px-5   relative z-10">
        <h4 className="title">Media Coverage</h4>
        <p className=" sub-title">Check our latest news</p>
        <Slider {...settings} className="md:px-[65px] mt-10">
          {media.map((item, index) => (
            <div>
              <div className=" lg:max-w-[600px] mx-[10px]">
                <img
                  src={item?.thumbnail}
                  alt=""
                  className=" rounded-xl w-full"
                />
                <div className="custom-shadow rounded-xl  p-3 w-[90%]  !bg-white  mx-auto relative bottom-10 z-50">
                  <div className=" text-start flex  flex-col items-start gap-2">
                    {" "}
                    <span className="date_media text-sm text-secondary flex items-center gap-4 mb-5">
                      <span className="iocn inline-block">
                        <img src={CalendarIcon} alt="" />
                      </span>
                      {formatDate(item?.date)}
                    </span>
                    <h4 className="  lg:text-2xl md:text-sm text-base text-cblack font-medium media_covarage_heading">
                      {item?.caption}
                    </h4>
                    <p class="  lg:text-base md:text-[12px] text-[16px]  text-secondary font-normal mt-3 media_paragraph">
                      {item?.description}
                    </p>
                    <div className=" flex justify-between pt-2 items-center w-full">
                      <div className=" flex gap-2 items-center">
                        <img
                          src={item?.media_logo}
                          alt=""
                          className="w-[60px] object-cover"
                        />
                        <span class=" text-lg font-medium text-cblack">
                          {item?.media_name}
                        </span>
                      </div>
                      <a href={item?.news_link} target="_blank">
                        <img src={rightArrow} alt="" className="w-10" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      <img
        src={circle}
        alt=""
        className=" absolute top-[30%] -right-8 max-lg:hidden circle_png"
      />
      <img
        src={dottcircle}
        alt=""
        className=" absolute top-40 left-24 max-lg:hidden dot_elements"
      />
      <span className="glow_elements"></span>
    </div>
  );
};

export default MediaCarasol;
