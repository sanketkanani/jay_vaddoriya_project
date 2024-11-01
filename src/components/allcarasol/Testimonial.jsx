import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import quates from "../../assets/svg/quates.svg";
import dotcircle from "../../assets/svg/dotcircle.svg";
import dotcircleLeft from "../../assets/testi-elements.svg";
import ring from "../../assets/svg/circle.svg";
import { GetTestimonials } from "../../services/Home.service";

const Testimonial = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let mainSliderRef = useRef(null);
  let navSliderRef = useRef(null);

  useEffect(() => {
    setNav1(mainSliderRef);
    setNav2(navSliderRef);
  }, []);
  const [testimonial, setTestimonial] = useState([]);

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        const data = await GetTestimonials();
        setTestimonial(data);
      } catch (err) {
        console.log(err);
      }
    };
    getTestimonials();
  }, []);

  const mainSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 5000,
    asNavFor: nav2,
    // beforeChange: (current, next) => navSliderRef.current.slickGoTo(next),
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  const thumbnailSliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    arrows: false,
    dots: false,
    infinite: true,
    focusOnSelect: true,
    asNavFor: nav1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="relative Testimonials_main_slider" id="testimonial">
      <section className="2xl:max-w-[648px] w-[80%] mx-auto mb-10 z-10 relative">
        <h6 className="2xl:text-3xl text-xl text-primary font-medium">
          Testimonial
        </h6>
        <h4 className="title">Our students Feedback</h4>

        <Slider
          ref={(slider) => (mainSliderRef = slider)}
          {...mainSliderSettings}
          className="main-slider"
        >
          {testimonial.length > 0 &&
            testimonial.map((data, index) => (
              <div key={index} className="my-auto pb-10 mt-7">
                <div className="mx-auto py-10 bg-white custom-shadow max-w-[600px] pb-[70px]">
                  <div className="mx-auto flex justify-center items-center flex-col">
                    <img src={quates} alt="" className="h-full text-center" />
                    <p className="text-sm text-secondary !py-4 w-[90%] mx-auto">
                      {data?.text}
                    </p>
                  </div>
                  <h3 className="text-base font-medium text-cblack">
                    {data?.name}
                  </h3>
                  <h4 className="text-sm font-medium text-primary">
                    Student, National University
                  </h4>
                </div>
              </div>
            ))}
        </Slider>

        <div className="main_face_slider mt-[-94px]">
          <Slider
            ref={(slider) => (navSliderRef = slider)}
            {...thumbnailSliderSettings}
            className="new_test_slider"
          >
            {testimonial.length > 0 &&
              testimonial.map((data, index) => (
                <div key={index}>
                  <div className="img_holder">
                    <img src={data?.photo} alt="" className="thumbnail-img" />
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </section>

      <img
        src={dotcircleLeft}
        alt=""
        className="max-lg:hidden absolute top-[0%] left-calc_unic w-[300px]"
      />
      <img
        src={dotcircle}
        alt=""
        className="max-lg:hidden absolute top-5 right-10"
      />
      <img
        src={ring}
        alt=""
        className="max-lg:hidden absolute bottom-24 -right-10"
      />
    </div>
  );
};

export default Testimonial;
