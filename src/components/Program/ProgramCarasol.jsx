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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import star from "../../assets/svg/star.svg";
import days from "../../assets/svg/days.svg";
import startpoint from "../../assets/svg/startpoint.svg";
import file from "../../assets/svg/file.svg";
import righarrow from "../../assets/svg/Rightsidearrow/whiteRightarrow.svg";
import { useCookie } from "react-use";
import {
  GetAllFreeCourses,
  GetAllFreeCourses1,
} from "../../services/Course.service";
import CourseCard from "../course/CourseCard";
import { useNavigate } from "react-router-dom";

const ProgramCarasol = () => {
  const [courses, setCourses] = useState([]);
  const [loggedIn] = useCookie("maang");
  const [selectedCourse, setSelectedCourse] = useState({});
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const navigation = useNavigate();

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
    <section className=" 2xl:max-w-[1500px] mt-0 xl:w-[65%] md:w-[80%] mx-auto mb-12">
      <div className=" flex justify-between items-center max-md:flex-col   gap-5">
        {" "}
        <h1 className=" title">Free Course with certificates</h1>
        <button
          className=" custom-button flex justify-between gap-2 items-center  bg-primary border-primary text-white"
          onClick={() => {
            navigation("/course");
          }}
        >
          Explore free Course{" "}
          <span>
            {" "}
            <img src={righarrow} alt="" />
          </span>
        </button>
      </div>

      <div className="mySwiper mx-auto py-10 !bg-transparent free_crouseslider_home">
        <Slider {...settings}>
          {courses.length > 0 &&
            courses.map((course) => {
              return (
                <CourseCard
                  course={course}
                  free={true}
                  setSelectedCourse={setSelectedCourse}
                  openInfoModal={openInfoModal}
                  setOpenInfoModal={setOpenInfoModal}
                  getAllCourses={getAllCourses}
                />
              );
              // <div>
              //   <div className=" custom-shadow mx-auto p-2 mt-10 ml-3 mr-3 mb-12 max-w-[400px]">
              //     <div className=" relative">
              //       <img src={certificate1} alt="" className=" h-full w-full " />
              //       <a
              //         href=""
              //         className=" h-10 w-10 rounded-full bg-white absolute top-5 flex justify-center items-center right-5"
              //       >
              //         <img src={share} alt="" />
              //       </a>
              //     </div>
              //     <div className=" text-start py-2 ">
              //       <div className=" flex justify-between items-center">
              //         <h4 className=" text-base font-medium  text-secondary">
              //           Software Development
              //         </h4>
              //         <button className="custom-button  !py-1 text-white gap-1 bg-primary flex justify-between items-center 2xl:!text-base  max-2xl:!text-xs !px-2">
              //           <img src={star} alt="" />
              //           <span>4.9</span>
              //         </button>
              //       </div>
              //       <h3 className=" text-xl mt-2 font-semibold text-cblack">
              //         Data Structures and Algorithms (C++)
              //       </h3>
              //       <ul className="flex justify-between items-center my-2 pr-4">
              //         <li className=" flex gap-2  ">
              //           <img src={days} alt="" />
              //           <span className=" font-medium 2xl:text-base max-2xl:text-sm text-secondary">
              //             3 Month
              //           </span>
              //         </li>
              //         <li className=" flex gap-2 ">
              //           <img src={startpoint} alt="" />
              //           <span className=" font-medium 2xl:text-base max-2xl:text-sm text-secondary mr-2">
              //             Lorem ispum
              //           </span>
              //         </li>
              //       </ul>
              //       <ul className="flex justify-between items-center my-2 pr-4">
              //         <li className=" flex gap-2  ">
              //           <img src={startpoint} alt="" />
              //           <span className=" font-medium 2xl:text-base max-2xl:text-sm text-secondary">
              //             3 Month
              //           </span>
              //         </li>
              //         <li className=" flex gap-2 ">
              //           <img src={file} alt="" />
              //           <span className=" font-medium 2xl:text-base max-2xl:text-sm text-secondary">
              //             Hybrid Classes
              //           </span>
              //         </li>
              //       </ul>
              //       <div className=" mt-3">
              //         <h4 className="text-xl font-bold">Free</h4>
              //         <div className=" mt-2 flex  justify-between  gap-3">
              //           <button className="  shrink-0 rounded-full py-1 flex-1  text-sm !font-medium border-primary text-primary !border !px-5">
              //             Learn more
              //           </button>
              //           <button className=" shrink-0 rounded-full py-1 flex-1   text-base border-primary text-white bg-primary !border !px-5">
              //             Buy Now
              //           </button>
              //         </div>
              //       </div>
              //     </div>
              //   </div>
              // </div>
            })}
        </Slider>
      </div>
    </section>
  );
};

export default ProgramCarasol;
