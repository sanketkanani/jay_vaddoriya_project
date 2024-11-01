import React, { useEffect, useState } from "react";
import certificate1 from "../../assets/images/certificatesimages/certificate.png";
import share from "../../assets/svg/share.svg";
import star from "../../assets/svg/star.svg";
import days from "../../assets/svg/days.svg";
import startpoint from "../../assets/svg/startpoint.svg";
import img1 from "../../assets/images/blog/blog1.png";
import img2 from "../../assets/images/blog/blog2.png";
import img3 from "../../assets/images/blog/blog3.png";

import file from "../../assets/svg/file.svg";
import medal from "../../assets/svg/Group 37433medal.svg";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/store";
import { useCookie } from "react-use";
import { CourseRegister, GetUserBatch } from "../../services/Course.service";
import InfoModal from "./infoModal";
import Swal from "sweetalert2";
import "./course.css";

const CourseFreeCard = ({
  course,
  free,
  setSelectedCourse,
  openInfoModal,
  setOpenInfoModal,
}) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [batches, setBatches] = useState([]);
  const [loggedIn, ,] = useCookie("maang");

  useEffect(() => {
    const getUserBatch = async () => {
      try {
        const batchData = await GetUserBatch();
        setBatches(batchData?.results);
      } catch (err) {
        console.log(err);
      }
    };
    if (loggedIn) getUserBatch();
  }, [loggedIn]);

  const handleRegister = async () => {
    try {
      const response = await CourseRegister(course?.id);
      Swal.fire({
        text: response.message,
        showCancelButton: true,
        confirmButtonText: "Portal",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/free");
        }
      });
      console.log("Registration Response:", response);
    } catch (error) {
      console.error("Registration Error:", error.message);
    } finally {
      // setLoading(false);
    }
  };

  const handleClick = (courseName) => {
    if (loggedIn) {
      Swal.fire({
        title: courseName,
        text: "This course seems perfect for you. Want to enroll?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, register me!",
      }).then((result) => {
        if (result.isConfirmed) {
          handleRegister();
        }
      });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    console.log("*******************", course);
  }, [course]);

  const infoModal = (courseNew) => {
    console.log("hello data>>>>>>>>>>>>>>>>>>", courseNew);
    setSelectedCourse(courseNew);
    setOpenInfoModal(true);
  };

  return (
    <>
      <div className="custom-shadow mx-auto p-2 lg:max-w-[260px] md:max-w-[90%] md:mt-10 mt-5 mb-8 bg-white min-h-[450px] max-sm:max-w-[95%]">
        <div className=" relative  ">
          <img
            src={course.thumbnail}
            alt=""
            className=" h-[200px] w-full !object-cover rounded-md "
          />
          <a
            href=""
            className=" h-6 w-6 rounded-full bg-white absolute top-3 flex justify-center items-center right-3"
          >
            <img src={share} alt="" />
          </a>
          <img src={medal} alt="" className=" absolute top-3 left-3" />
        </div>
        <div className=" text-start p-2 ">
          <div className=" flex justify-between items-center">
            <h4 className=" text-[10px] bg-clightbg px-2 py-1 rounded-full font-medium  text-secondary">
              Software Development
            </h4>
            <button className=" rounded-full  !py-1 text-white gap-1 bg-primary flex justify-between items-center text-xs !px-2">
              <img src={star} alt="" />
              <span>4.9</span>
            </button>
          </div>
          <h3 className=" text-base mt-2 font-semibold text-cblack">
            {course.name}
          </h3>
          <ul className="flex justify-between items-center my-2 ">
            <li className=" flex gap-2  ">
              <img src={days} alt="" />
              <span className=" font-medium text-xs text-secondary">
                {course.course_duration} Month
              </span>
            </li>
            <li className=" flex gap-2 mr-2 ">
              <img src={startpoint} alt="" />
              <span className=" font-medium text-xs  text-secondary">
                Lorem ispum
              </span>
            </li>
          </ul>
          <ul className="flex justify-between items-center my-2 ">
            <li className=" flex gap-2  ">
              <img src={startpoint} alt="" />
              <span className=" font-medium text-xs text-secondary">
                3 Month
              </span>
            </li>
            <li className=" flex gap-2 ">
              <img src={file} alt="" />
              <span className=" font-medium text-xs text-secondary">
                Hybrid Classes
              </span>
            </li>
          </ul>
          <div className=" mt-3">
            {!free && <h4 className="text-base font-bold">₹{course.price}</h4>}
            <div className=" mt-2 flex  justify-between w-full  gap-2 ">
              <Link
                to={
                  free
                    ? loggedIn
                      ? "/free-course/" + course.id
                      : "/login"
                    : "/course/" + course.id
                }
                className=" text-nowrap rounded-full py-1 w-[50%] py-2 font-semibold text-sm text-center text-[10px] !font-medium border-primary text-primary !border flex-1 !px-5"
              >
                Learn more
              </Link>
              {free ? (
                <button
                  onClick={() => handleClick(course.name)}
                  className="text-nowrap rounded-full py-1 flex-1 w-[50%] text-sm !font-medium text-[10px] border-primary text-white bg-primary !border !px-5"
                  disabled={course?.is_registered}
                >
                  {course?.is_registered ? "Registered" : "Register Now"}
                </button>
              ) : Object.keys(user)?.length <= 1 ? (
                <button
                  onClick={() =>
                    loggedIn ? infoModal(course) : navigate("/login")
                  }
                  className="  text-nowrap rounded-full py-1 flex-1 w-[50%] !font-medium text-sm text-[10px] border-primary shrink-0 text-white bg-primary !border !px-5"
                >
                  Buy Now
                </button>
              ) : batches?.some((e) => e?.course?.id === course?.id) ? (
                <button
                  onClick={() => navigate("/timetable")}
                  className="  text-nowrap rounded-full py-1  !font-medium text-[10px] text-sm  border-primary text-white bg-primary !border !px-5"
                >
                  Time Table
                </button>
              ) : (
                // Open the payment modal if logged in and course is not in batch
                <button
                  className="  text-nowrap rounded-full py-1 text-sm !font-medium text-[10px] w-[50%] border-primary text-white bg-primary !border !px-5"
                  onClick={() =>
                    loggedIn ? infoModal(course) : navigate("/login")
                  }
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseFreeCard;
