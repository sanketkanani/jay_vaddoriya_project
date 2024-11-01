import DatePickerComp from "../datepicker/DatePickerComp";
import React, { useEffect, useState } from "react";

import star from "../../assets/svg/star.svg";
import days from "../../assets/svg/days.svg";
import fillup from "../../assets/svg/file.svg";
import hybrid from "../../assets/svg/file.svg";
import AcordionComp from "../accordion/AcordionComp";
import tikmark from "../../assets/svg/greytikmark.svg";
import elementsBuy from "../../assets/buynow-elements.svg";
import { useUserStore } from "../../store/store";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CourseRegister,
  EnrollStudent,
  GetCourse,
  GetCourseEmi,
  GetCourseUpcomingDates,
  GetFreeCourse,
  GetStudentCourseEmi,
  GetUserBatch,
  StudentPayment,
} from "../../services/Course.service";
import { useCookie } from "react-use";
import dotsTop from "../../assets/deepblue-dots.svg";
import dotsTopright from "../../assets/program-left-dots.svg";
import InfoModal from "../course/infoModal";
import {
  DateSelectionModal,
  EmiSelectionModal,
  EmiVariantSelectionModal,
} from "../../pages/course/EmiModal";
import { RWebShare } from "react-web-share";
import Swal from "sweetalert2";

const BookCoursecomp = ({ paid }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [loggedIn, ,] = useCookie("maang");
  const [course, setCourse] = useState({});
  const [batches, setBatches] = useState([]);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [emi_details, setEmiDetails] = useState([]);
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [selectedEmi, setSelectedEmi] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedId, setSelectedId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [dateDetails, setDateDetails] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getCourse = async () => {
      try {
        let data;
        if (paid) {
          data = await GetCourse(id);
        } else {
          data = await GetFreeCourse(id);
        }
        setCourse(data);
        if (loggedIn) {
          let batchData = await GetUserBatch();
          setBatches(batchData.results);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCourse();
  }, [loggedIn, id]);

  console.log("Course", course);

  const req = course?.requirements;
  const discountedPrice = course
    ? course.price - (course.price * course.discount_percentage) / 100
    : 0;

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleEmiSelect = (emi) => {
    setSelectedEmi(emi);
    setIsVariantModalOpen(true);
  };

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setOpenInfoModal(true);
  };

  const handleCourseDates = async (selectedId) => {
    const data = await GetCourseUpcomingDates(selectedId);
    setDateDetails(data.data);
    console.log("Get slected date", data);
  };

  const handleGetEmi = async () => {
    const data = await GetCourseEmi(course?.id);
    setEmiDetails(data.results);
    setIsEmiModalOpen(true);
    console.log("Get Emi Data", data);
  };

  const handleGetStudentEmi = async (id) => {
    const data = await GetStudentCourseEmi(id);
    setSelectedEmi(data?.data);
    setIsVariantModalOpen(true);
  };

  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>>>> imran", course);
    if (course.id) {
      handleCourseDates(course?.id);
    }
  }, [course]);

  const handleEnrollment = async (variant) => {
    const course_id = course?.id; // Replace with actual course ID
    const emi_id = selectedEmi?.id; // Replace with actual EMI ID
    const chosen_date = selectedDate ? selectedDate : "2024-09-16"; // Replace with actual chosen date
    try {
      const response = await EnrollStudent(course_id, emi_id, chosen_date);
      handleStudentEnrollment();
      setOpenInfoModal(false);
      window.location.reload();
      console.log("Enrollment successful:");
    } catch (error) {
      console.error("Error enrolling student:", error.message);
    }
  };

  const infoModal = (courseNew) => {
    setSelectedCourse(courseNew);
    setDateModalOpen(true);
    setStep(1);
  };

  const handleStudentEnrollment = async () => {
    const course_id = course?.id;
    const amount = selectedVariant.amount;
    const payment_mode = "online_entry";
    const payment_id = "re24355";
    const payment_status = "True";
    const payment_url = "http://google.com";
    const json_response = "";
    const emi_number = selectedVariant.instalment;

    try {
      const response = await StudentPayment(
        course_id,
        amount,
        payment_mode,
        payment_id,
        payment_status,
        payment_url,
        json_response,
        emi_number
      );
      window.location.reload();
      console.log(">>>>>>>>>> response", response);
      console.log("Enrollment successful:");
    } catch (error) {
      console.error("Error enrolling student:", error.message);
    }
  };

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
        } else {
          window.location.reload();
        }
      });
      console.log("Registration Response:", response);
    } catch (error) {
      console.error("Registration Error:", error.message);
    } finally {
      // setLoading(false);
    }
  };

  const free = location.pathname.includes("free-course");

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

  const [step, setStep] = useState(0);
  return (
    <>
      <div className="margin_for_header">
        <div className="bg-cnavy h-[420px] max-md:h-[620px] absolute top-0 left-0 right-0 bg_course_height"></div>
        <div className="relative">
          <section className=" sub-section grid grid-cols-12  gap-3">
            <div className=" md:col-span-12 col-span-12  lg:col-span-8 md:w-11/12 w-[90%] m-auto">
              <div className="top-10 max-2xl:top-16 max-sm:top-2 relative">
                <div className=" text-start ">
                  <div className=" text-primary font-normal 2xl:text-xl max-2xl:text-sm flex gap-6 lg:gap-10 program_page_course_name">
                    <Link to="/program" className="list_items">
                      Program{" "}
                    </Link>
                    <Link to="/course" className="list_items">
                      All Course{" "}
                    </Link>
                    <a href="" className="list_items">
                      {course?.name}
                    </a>
                  </div>
                  <div className=" w-10/12">
                    <h1 className=" title my-2 !text-white">{course?.name}</h1>
                    <p className=" text-white 2xl:text-lg max-2xl:text-xs pr-10">
                      {course?.short_description}
                    </p>
                  </div>
                  <div className=" mt-3 flex justify-start items-center gap-4">
                    <button className="custom-button bg-transparent border-none custom-shadow  !py-1 text-white  flex justify-between items-center 2xl:!text-base  max-2xl:!text-xs !px-2">
                      Preparation
                    </button>
                    <button className="custom-button  border-primary  !py-1 text-white gap-1 bg-primary flex justify-between items-center  !px-2">
                      <img src={star} alt="" />
                      <span>4.9</span>
                    </button>
                  </div>
                  <ul className="mt-3 grid grid-cols-4 max-md:grid-cols-2 gap-3 justify-between items-center">
                    {/* <li className="text-white 2xl:text-lg max-2xl:text-xs font-medium flex justify-start items-center gap-2">
                  {" "}
                  <img src={days} alt="" />
                  <span>{course?.course_duration} Weeks</span>
                </li> */}
                    {!paid &&
                      course &&
                      course?.free_course_caption &&
                      course?.free_course_caption.length > 0 &&
                      course?.free_course_caption.map((data) => {
                        return (
                          <li className="text-white  xl:text-[16px]   md:text-[12px] font-medium flex  justify-start items-center gap-2">
                            {" "}
                            <img src={fillup} alt="" />
                            <span>{data.caption}</span>
                          </li>
                        );
                      })}
                    {paid &&
                      course &&
                      course?.course_topics &&
                      course?.course_topics.length > 0 &&
                      course?.course_topics.map((data) => {
                        return (
                          <li className="text-white max-md:text-white  xl:text-[16px]   md:text-[12px] font-medium flex justify-start items-center gap-2">
                            {" "}
                            <img
                              src={fillup}
                              alt=""
                              className="filter brightness-[100]"
                            />
                            <span>{data}</span>
                          </li>
                        );
                      })}
                  </ul>
                  <div className=" text-start  py-4 md:hidden block w-full   ">
                    {" "}
                    <div className=" flex items-start  gap-6 md:py-5 ">
                      <h4 className=" md:text-white text-black text-xl font-bold max-md:text-white">
                        ₹{discountedPrice}
                      </h4>
                      <h3 className="text-xl  gap-0 font-medium text-secondary lg:text-lg max-md:text-white   clear-both">
                        <span>₹{course.price} </span>
                        <br />
                        <p
                          className=" text-primary ml-2 leading-normal  max-md:text-[10px] max-md:float-right"
                          style={{ textDecorationLine: "unset" }}
                        >
                          50% Off
                        </p>
                      </h3>
                    </div>
                    <div className="flex gap-2 md:w-10/12 overflow-x-scroll max-md:mt-10">
                      <button
                        onClick={() =>
                          loggedIn ? infoModal(course) : navigate("/login")
                        }
                        className=" custom-button bg-primary border-primary text-white flex-1"
                      >
                        Buy this course
                      </button>
                      <RWebShare
                        data={{
                          text: course?.name || "Check out this course!",
                          url: window.location.href,
                          title: course?.name || "Course Details",
                        }}
                        onClick={() => console.log("Shared successfully!")}
                      >
                        <button className="custom-button text-primary bg-white flex-1">
                          Share
                        </button>
                      </RWebShare>
                    </div>
                  </div>
                </div>
                <div className="hidden text-start mt-5 px-8 max-md:block custom-shadow bg-white py-6 mt-[40px] !rounded-3xl">
                  <h4 className="text-cblack  my-3  w-full 2xl:text-2xl font-semibold max-2xl:text-xl">
                    This course Including
                  </h4>
                  <ul className="my-2  text-secondary">
                    {course &&
                      course?.includes?.length > 0 &&
                      course?.includes.map((data) => {
                        return (
                          <li className=" text-base font-normal my-2 flex items-center ">
                            <img src={tikmark} alt="" />

                            <span className="ml-2">{data}</span>
                          </li>
                        );
                      })}
                    {!paid &&
                      course &&
                      course?.free_course_includes?.length > 0 &&
                      course?.free_course_includes.map((data) => {
                        return (
                          <li className=" text-base font-normal my-2 flex items-center ">
                            <img src={tikmark} alt="" />

                            <span className="ml-2">{data?.include}</span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div className=" md:mt-3 max-md:mt-6  py-5 text-start">
                  <h4 className=" 2xl:text-2xl font-medium max-2xl:text-xl mt-5">
                    What Will You learn?
                  </h4>
                  <ul className="mt-3 list-disc  grid grid-cols-2 gap-3 ">
                    {paid &&
                      course &&
                      course.advantages &&
                      course.advantages.length > 0 &&
                      course.advantages.map((data) => {
                        return (
                          <li className="   max-2xl:text-sm 2xl:text-base text-secondary font-normal ml-5 marker:text-primary">
                            {data}{" "}
                          </li>
                        );
                      })}
                    {!paid &&
                      course &&
                      course?.free_course_advantages &&
                      course?.free_course_advantages.length > 0 &&
                      course.free_course_advantages.map((data) => {
                        return (
                          <li className="   max-2xl:text-sm 2xl:text-base text-secondary font-normal ml-5 marker:text-primary">
                            {data.point}{" "}
                          </li>
                        );
                      })}
                  </ul>
                  <div className="mt-10 relative z-10">
                    <h4 className=" 2xl:text-2xl font-medium max-2xl:text-xl">
                      Description
                    </h4>
                    <p className=" my-2 max-2xl:text-sm 2xl:text-base text-secondary font-normal">
                      {course.description}
                    </p>
                  </div>
                  <div className=" mt-10">
                    <h4 className=" 2xl:text-2xl font-medium max-2xl:text-xl">
                      Requirements
                    </h4>
                    <ul className="mt-5  grid  grid-cols-4 max-md:grid-cols-2 gap-3 items-center">
                      {/* <li className="text-secondary flex-1 2xl:text-lg max-2xl:text-xs font-medium flex justify-start items-center gap-2">
                    {" "}
                    <img src={days} alt="" />
                    <span>Laptop</span>
                  </li> */}
                      {req &&
                        req.split("\n").map((item, i) => (
                          <li
                            key={i}
                            className="text-secondary flex-1 2xl:text-lg max-2xl:text-xs font-medium flex justify-start items-center gap-2"
                          >
                            {" "}
                            <img src={fillup} alt="" />
                            <span>{item}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className=" !pl-0 text-start  mt-20 w-full">
                <h4 className=" 2xl:text-2xl font-medium max-2xl:text-xl">
                  Course content
                </h4>
                <div className="mt-5 w-full border-solid border-gray-300 p-6 border rounded-3xl">
                  <AcordionComp
                    syllabus={paid ? course?.syllabi : course?.course_syllabus}
                    paid={paid}
                  />
                </div>
              </div>
            </div>
            <div className=" lg:col-span-4 col-span-4 md:col-span-12  md:w-[90%] mx-auto  lg:mt-28 mt-10 col-span-12 max-md:hidden">
              <div className="bg-white custom-shadow pb-5">
                <div className=" text-start">
                  {" "}
                  <img
                    src={course?.thumbnail}
                    alt=""
                    className=" w-[100%] object-cover object-top-center relative  rounded-lg  object-cover h-[260px] max-lg:h-[232px]"
                  />
                  <div className=" flex items-start  gap-2 md:py-5 px-5 mt-6">
                    <h4 className=" text-cblack text-xl font-bold">
                      ₹{course?.price}
                    </h4>
                    <h3 className=" text-sm font-medium text-secondary line-through clear-both">
                      {(course?.price * 100) / course?.discount_percentage}{" "}
                      <br />
                      <span
                        className=" text-primary text-[10px] float-right"
                        style={{ textDecorationLine: "unset" }}
                      >
                        {course?.discount_percentage}% Off
                      </span>
                    </h3>
                  </div>
                  <div className="px-5 flex gap-2 w-full justify-center w-10/12 overflow-x-scroll">
                    {free ? (
                      <button
                        onClick={() =>
                          course?.is_registered
                            ? navigate("/free")
                            : handleClick(course.name)
                        }
                        className="text-nowrap custom-button rounded-full   flex-1 w-[50%] text-sm !font-medium text-[10px] border-primary text-white bg-primary  "
                      >
                        {course?.is_registered ? "Portal" : "Register Now"}
                      </button>
                    ) : Object.keys(user)?.length <= 1 ? (
                      <button
                        onClick={() =>
                          loggedIn ? infoModal(course) : navigate("/login")
                        }
                        className="text-nowrap custom-button rounded-full  flex-1 w-[50%] !font-medium text-sm text-[10px] border-primary shrink-0 text-white bg-primary  "
                      >
                        Buy Now
                      </button>
                    ) : course.full_payment_status ? (
                      <button
                        onClick={() => {
                          navigate("/student");
                        }} // Replace with your timetable function
                        className="text-nowrap rounded-full custom-button text-sm !font-medium text-[10px] w-[50%] border-primary text-white bg-primary  "
                      >
                        Portal
                      </button>
                    ) : batches?.some((e) => e?.course?.id === course?.id) ? (
                      <button
                        onClick={() => {
                          setSelectedCourse(course);
                          handleGetStudentEmi(course?.id);
                        }}
                        className="text-nowrap rounded-full custom-button text-sm !font-medium text-[10px] border-primary text-white bg-primary  "
                      >
                        Pay Emi
                      </button>
                    ) : (
                      <button
                        className="text-nowrap rounded-full custom-button text-sm !font-medium text-[10px] w-[50%] border-primary text-white bg-primary  "
                        onClick={() =>
                          loggedIn ? infoModal(course) : navigate("/login")
                        }
                      >
                        Buy Now
                      </button>
                    )}

                    <RWebShare
                      data={{
                        text: course?.name || "Check out this course!",
                        url: window.location.href,
                        title: course?.name || "Course Details",
                      }}
                      onClick={() => console.log("Shared successfully!")}
                    >
                      <button className="text-[10px] border custom-button lg:text-sm   rounded-full  font-medium text-nowrap text-primary border-primary flex-1 border-solid ">
                        Share
                      </button>
                    </RWebShare>
                  </div>
                </div>
                <div className=" text-start mt-5 px-3">
                  <h4 className="text-cblack  my-3  w-full 2xl:text-2xl font-semibold max-2xl:text-lg">
                    This course Including
                  </h4>
                  <ul className="my-2  text-secondary">
                    {course &&
                      course?.includes?.length > 0 &&
                      course?.includes.map((data) => {
                        return (
                          <li className=" text-base font-normal my-2 flex items-center ">
                            <img src={tikmark} alt="" />

                            <span className="ml-2">{data}</span>
                          </li>
                        );
                      })}
                    {!paid &&
                      course &&
                      course?.free_course_includes?.length > 0 &&
                      course?.free_course_includes.map((data) => {
                        return (
                          <li className=" text-base font-normal my-2 flex items-center ">
                            <img src={tikmark} alt="" />

                            <span className="ml-2">{data?.include}</span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              {/* <div className=" mt-5 md:text-start text-center max-md:hidden p-3">
            <h4 className="text-cblack max-md:hidden  my-3 md:text-start !text-center  w-full 2xl:text-2xl font-medium max-2xl:text-lg">
              This course Including
            </h4>
            <p className=" text-base font-normal my-2 flex items-center text-secondary">
              {course && course?.free_course_topics?.length > 0 && course?.free_course_topics.join(',')}{" "}
            </p>
          </div> */}
              <div className="">
                {paid && (
                  <div className="bg-white custom-shadow p-5 mt-8">
                    <DatePickerComp dates={dateDetails} />
                  </div>
                )}
              </div>
            </div>
            <img
              src={elementsBuy}
              alt=""
              className="absolute top-[33%] left-0 w-[200px] translate-x-[-54%]"
            />
            <img
              src={dotsTop}
              alt=""
              className="absolute top-[-60px] right-[26%] translate-y-[-50%] hidden top_dots_programs w-[80px] max-md:hidden"
            />
            <img
              src={dotsTopright}
              alt=""
              className="absolute lg:top-[60px] top-[20px] right-0 translate-y-[-50%] max-sm:hidden top_dots_programs md:w-[100px] lg:w-[150px] w-[100px] max-md:hidden"
            />
          </section>
        </div>
      </div>
      {/* <InfoModal
        name={course?.name}
        price={course?.price}
        discount_percentage={course?.discount_percentage}
        payment_id={course?.payment_id}
        openInfoModal={openInfoModal}
        setOpenInfoModal={setOpenInfoModal}
        key={course?.payment_id}
      /> */}
      <div className={`modal ${dateModalOpen ? "modal-open" : ""}`}>
        <div className="modal-content">
          <div className={`flex justify-between mb-4`}>
            {step !== 1 ? (
              <button
                onClick={(pre) => {
                  setStep(step - 1);
                }}
                style={{
                  background: "rgb(45 178 196)",
                  width: "30px",
                  height: "30px",
                  borderRadius: "100%",
                  color: "white",
                }}
              >
                🡠
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={() => {
                setStep(0);
                setDateModalOpen(false);
              }}
              style={{
                background: "rgb(45 178 196)",
                width: "30px",
                height: "30px",
                borderRadius: "100%",
                color: "white",
              }}
            >
              ✖
            </button>
          </div>
          {step === 1 && (
            <DateSelectionModal
              isOpen={dateModalOpen}
              onClose={() => setStep(2)}
              dateDetails={dateDetails}
              selectedDate={selectedDate}
              handleDateSelect={handleDateSelect}
              setDateModalOpen={setDateModalOpen}
              setIsEmiModalOpen={setIsEmiModalOpen}
              handleGetEmi={handleGetEmi}
            />
          )}
          {step === 2 && (
            <EmiSelectionModal
              isOpen={isEmiModalOpen}
              onClose={() => setStep(3)}
              emiDetails={emi_details}
              onEmiSelect={handleEmiSelect}
            />
          )}
          {step === 3 && (
            <EmiVariantSelectionModal
              isOpen={isVariantModalOpen}
              onClose={() => {
                setStep(0);
                setDateModalOpen(false);
                setOpenInfoModal(true);
              }}
              selectedEmi={selectedEmi}
              onVariantSelect={handleVariantSelect}
              setOpenInfoModal={setOpenInfoModal}
            />
          )}
        </div>
      </div>
      <InfoModal
        name={course?.name}
        price={selectedVariant?.amount}
        discount_percentage={0}
        payment_id={selectedVariant?.payment_id}
        openInfoModal={openInfoModal}
        setOpenInfoModal={setOpenInfoModal}
        key={selectedVariant?.payment_id}
        handleEnrollment={handleEnrollment}
        handleStudentEnrollment={handleStudentEnrollment}
        batches={batches}
        id={selectedCourse?.id}
      />
    </>
  );
};

export default BookCoursecomp;
