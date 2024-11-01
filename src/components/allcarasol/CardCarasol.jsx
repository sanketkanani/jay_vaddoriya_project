import card1 from "../../assets/images/card/card.png";
import card2 from "../../assets/images/card/card2.png";
import card3 from "../../assets/images/card/card3.png";
import share from "../../assets/svg/share.svg";
import phone from "../../assets/svg/phone/whitephone.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slider from "react-slick";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import dottcircle from "../../assets/svg/dotcircle.svg";
import solidround from "../../assets/svg/solidround.svg";
import bgTest from "../../assets/bg-test-01.jpg";
import PlayIcon from "../../assets/play-icon.svg";
import cardIcon from "../../assets/succes-elements.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetPlacementVideos } from "../../services/Home.service";

const CardCarasol = () => {
  const [placement, setPlacement] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");

  useEffect(() => {
    const getPlacement = async () => {
      try {
        const placementData = await GetPlacementVideos();
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
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "ease-in-out",
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
          centerPadding: "30px",
          arrows: false,
        },
      },
    ],
  };

  return (
    <div
      className="!w-full  relative bg_test success_stories_main"
      id="placement"
    >
      <section className="2xl:max-w-[1500px] mx-auto px-5 md:w-[80%] relative z-10">
        <h1 className=" title">
          Watch The Placement <br /> Success Stories
        </h1>
        <div className="pt-12">
          <Slider {...settings} className="xl:px-[65px]">
            {placement.map((item, index) => (
              <div className="relative z-10">
                <div className="custom-shadow bg-white xl:p-4 p-4 mb-8 w-[94%] m-auto">
                  <div className=" relative">
                    <div className="img_wrapper relative">
                      <img
                        src={item.thumbnail}
                        alt=""
                        className=" h-[250px] w-full object-cover object-top rounded-lg"
                      />
                      <span
                        className="w-14 h-14 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-all"
                        onClick={() => {
                          setSelectedVideo(item?.video_link);
                          document
                            .getElementById("videoModal")
                            .classList.remove("hidden");
                        }}
                      >
                        <img src={PlayIcon} alt="" />
                      </span>
                    </div>
                    {/* <a
                      href=""
                      className=" h-8 w-8 rounded-full bg-white absolute top-5 flex justify-center items-center right-5"
                    >
                      <img src={share} alt="" />
                    </a> */}
                  </div>
                  <div className="text-base text-start font-normal">
                    <p className=" text-secondary mt-3 media_paragraph">
                      <span className=" text-primary">Review</span>:{" "}
                      {item?.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="xl:mt-28 flex justify-center items-center glow_btn mt-12">
          <button
            onClick={() =>
              document.getElementById("modal").classList.remove("hidden")
            }
            style={{
              boxShadow: "rgba(45, 178, 196, 0.2) 0px 7px 29px 0px",
            }}
            className="custom-button bg-primary text-white flex items-center gap-2"
          >
            <img src={phone} alt="" className="" />
            <span>Request a call back</span>
          </button>
        </div>
      </section>

      <img
        src={dottcircle}
        alt=""
        className=" absolute  top-20 max-md:hidden left-16"
      />
      <img
        src={cardIcon}
        alt=""
        className=" absolute  top-24 max-md:hidden  right-8 w-80"
      />
      <img
        src={solidround}
        alt=""
        className=" absolute  top-[50%] max-md:hidden  -right-5"
      />

      <div style={{ display: "none" }}>
        <div id="hidden-content" style={{ padding: "20px", maxWidth: "600px" }}>
          <h2>Request a Call Back</h2>
          <p>Please fill out the form below to request a call back.</p>
          <form>
            <label>Name:</label>
            <input type="text" name="name" />
            <br />
            <label>Phone:</label>
            <input type="text" name="phone" />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
      <div
        id="videoModal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden z-50"
      >
        <div className="bg-white p-5 rounded-lg relative video_modal_wrapper max-w-[600px] h-[430px] w-full">
          <button
            className="absolute text-black w-8 bg-primary text-white h-8 rounded-full -right-4 -top-2 text-lg p-0"
            onClick={() => {
              const modal = document.getElementById("videoModal");
              const iframe = modal.querySelector("iframe");
              iframe.src = ""; // Stop the video by resetting the src attribute
              modal.classList.add("hidden");
            }}
          >
            &times;
          </button>
          <iframe
            width="100%"
            height="100%"
            src={selectedVideo}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <span className="glow_elements"></span>
      <span className="  right"></span>
    </div>
  );
};

export default CardCarasol;
