import certificate1 from "../../assets/images/certificatesimages/certificate.png";
import certificate2 from "../../assets/images/certificatesimages/certificate2.png";
import certificate3 from "../../assets/images/certificatesimages/certificate3.png";
import share from "../../assets/svg/share.svg";
import phone from "../../assets/svg/phone/phone.svg";
import Slider from "react-slick";
import React, { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
import CourseCard from "../course/CourseCard";
import { useCookie } from "react-use";
import InfoModal from "../course/infoModal";

const CertificateCarasol = () => {
  const [courses, setCourses] = useState([]);
  const [loggedIn] = useCookie("maang");
  const [selectedCourse, setSelectedCourse] = useState({});
  const [openInfoModal, setOpenInfoModal] = useState(false);

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
    autoplaySpeed: 8000,
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
    <>
      <div className=" bg-bannerbg bg_test relative z-10">
        <section className=" 2xl:max-w-[1500px] mt-0 xl:w-[65%] md:w-[80%] mx-auto">
          <h1 className=" title">Free Course with certificates</h1>
          <h3 className="mt-4">Explore Our Free Courses</h3>
          <div className="mySwiper mx-auto py-10 !bg-transparent free_crouseslider_home">
            <Slider {...settings} className="">
              {courses.length > 0 &&
                courses.map((course) => {
                  return (
                    <div key={course.id}>
                      <CourseCard
                        course={course}
                        free={true}
                        setSelectedCourse={setSelectedCourse}
                        openInfoModal={openInfoModal}
                        setOpenInfoModal={setOpenInfoModal}
                        getAllCourses={getAllCourses}
                      />
                    </div>
                  );
                })}
            </Slider>
          </div>
        </section>
        <img
          src={circle}
          alt=""
          className=" absolute top-[30%] -left-10 max-md:hidden"
        />
        <span className="right "></span>
      </div>
      <InfoModal
        name={selectedCourse?.name}
        price={selectedCourse?.price}
        discount_percentage={selectedCourse?.discount_percentage}
        payment_id={selectedCourse?.payment_id}
        openInfoModal={openInfoModal}
        setOpenInfoModal={setOpenInfoModal}
      />
    </>
  );
};

export default CertificateCarasol;
