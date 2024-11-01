import certificate1 from "../../assets/images/certificatesimages/certificate.png";
import certificate2 from "../../assets/images/certificatesimages/certificate2.png";
import certificate3 from "../../assets/images/certificatesimages/certificate3.png";
import share from "../../assets/svg/share.svg";
import phone from "../../assets/svg/phone/phone.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import star from "../../assets/svg/star.svg";
import days from "../../assets/svg/days.svg";
import startpoint from "../../assets/svg/startpoint.svg";
import file from "../../assets/svg/file.svg";
import circle from "../../assets/svg/circle.svg";
import {
  GetAllCourses,
  GetAllFreeCourses,
  GetAllFreeCourses1,
} from "../../services/Course.service";
import CourseCard from "./CourseCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCookie } from "react-use";

const CertificateCarasol = () => {
  const [courses, setCourses] = useState([]);
  const [loggedIn] = useCookie("maang");

  async function getAllCourses() {
    try {
      const data = loggedIn
        ? await GetAllFreeCourses1()
        : await GetAllFreeCourses();
      setCourses(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllCourses();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "linear",
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
    <div className=" bg-bannerbg relative max-md:pb-6">
      <section className=" 2xl:max-w-[1500px] xl:w-[65%] md:w-[80%]  mx-auto  ">
        <h1 className=" title">Free Course with certificates</h1>
        <p className="text-secondary text-sm mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore Ut enim{" "}
        </p>
        <Slider
          {...settings}
          className="mx-auto py-10  !bg-transparent freecrouse_slider_course"
        >
          {courses.length > 0 &&
            courses.map((course) => {
              return (
                <div key={course.id}>
                  <CourseCard
                    course={course}
                    free={true}
                    getAllCourses={getAllCourses}
                  />
                </div>
              );
            })}
        </Slider>
      </section>
      <img
        src={circle}
        alt=""
        className=" absolute top-[30%] -left-10 max-md:hidden"
      />
    </div>
  );
};

export default CertificateCarasol;
