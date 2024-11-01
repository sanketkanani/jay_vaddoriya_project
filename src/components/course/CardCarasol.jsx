import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GetAllCourses } from "../../services/Course.service";
import CourseCard from "./CourseCard";
import ring from "../../assets/svg/circle.svg";
import InfoModal from './infoModal';

const CardCarasol = ({ openInfoModal, setOpenInfoModal, selectedCourse, setSelectedCourse, setIsEmiModalOpen, setSelectedId, dateModalOpen,
  setDateModalOpen,
  handleGetStudentEmi
}) => {
  const [courses, setCourses] = useState([]);

  async function getAllCourses() {
    try {
      const data = await GetAllCourses();
      setCourses(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllCourses();
  }, []);

  console.log("All Course", courses);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 6000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '30px',
          arrows: false,
        }
      }
    ]
  };



  return (
    <>
      <div className="relative">
        <div className="2xl:max-w-[1500px] xl:w-[63%] md:w-[80%] mx-auto my-20">
          <Slider {...settings} className='premium_slider_main'>
            {courses.length > 0 &&
              courses.map((course) => (
                <div key={course.id}>
                  <CourseCard
                    course={course}
                    free={false}
                    setSelectedCourse={setSelectedCourse}
                    openInfoModal={openInfoModal}
                    setOpenInfoModal={setOpenInfoModal}
                    setIsEmiModalOpen={setIsEmiModalOpen}
                    setSelectedId={setSelectedId}
                    setDateModalOpen={setDateModalOpen}
                    dateModalOpen={dateModalOpen}
                    handleGetStudentEmi={handleGetStudentEmi}
                    getAllCourses={getAllCourses}
                  />
                </div>
              ))}
          </Slider>
        </div>
        <img src={ring} alt="" className="max-md:hidden absolute bottom-20 -left-10" />
      </div>
    </>
  );
};

export default CardCarasol;
