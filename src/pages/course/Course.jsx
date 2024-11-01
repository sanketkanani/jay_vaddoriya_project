import React, { useEffect, useState } from "react";
import rightarrow from "../../assets/svg/Rightsidearrow/rightarrowgreen.svg";
import dottedcircle from "../../assets/svg/whitdotcircle.svg";
import greendot from "../../assets/svg/dotcircle.svg";
import phone from "../../assets/svg/phone/bluephone.svg";
import CardCarasol from "../../components/course/CardCarasol";
import CertificateCarasol from "../../components/allcarasol/CertificateCarasol";
import CourseBanner from "../../components/course/CourseBanner";
import CourseMainBanner from "../../components/course/CourseMainBanner";
import FreeCourse from "../../components/course/FreeCourse";
import InfoModal from "../../components/course/infoModal";
import {
  DateSelectionModal,
  EmiSelectionModal,
  EmiVariantSelectionModal,
} from "./EmiModal";
import {
  EnrollStudent,
  GetCourseEmi,
  GetCourseUpcomingDates,
  GetStudentCourseEmi,
  GetUserBatch,
  StudentPayment,
} from "../../services/Course.service";
import { RWebShare } from "react-web-share";
import { useUserStore } from "../../store/store";
import { useCookie } from "react-use";

const Course = () => {
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
    // handleEnrollment(variant);
  };

  const handleCourseDates = async (selectedId) => {
    const data = await GetCourseUpcomingDates(selectedId);
    setDateDetails(data.data);
    console.log("Get slected date", data);
  };

  const handleGetEmi = async () => {
    const data = await GetCourseEmi(selectedCourse?.id);
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
    if (selectedCourse) {
      handleCourseDates(selectedCourse?.id);
    }
  }, [selectedCourse]);

  // useEffect(()=>{
  //   console.log(">>>>>>>>>>>>>>>>>>>", selectedVariant);
  // },[selectedVariant])

  const handleEnrollment = async (variant) => {
    const course_id = selectedCourse?.id; // Replace with actual course ID
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

  const handleStudentEnrollment = async () => {
    const course_id = selectedCourse?.id;
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

  const [step, setStep] = useState(0);

  return (
    <>
      <div className="  !pt-0 pb-10 program_main_page relative">
        <div
          className=" "
          style={{
            background:
              "linear-gradient(rgb(45 124 196 / 8%) 0%, rgba(45, 151, 196, 0) 100%)",
            paddingTop: "100px",
          }}
        >
          <div className="">
            <CourseMainBanner />
          </div>
          <CardCarasol
            openInfoModal={dateModalOpen}
            setOpenInfoModal={setDateModalOpen}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            setIsEmiModalOpen={setIsEmiModalOpen}
            setSelectedId={setSelectedId}
            dateModalOpen={dateModalOpen}
            setDateModalOpen={setDateModalOpen}
            handleGetStudentEmi={handleGetStudentEmi}
          />
          {/* <CertificateCarasol /> */}
          <FreeCourse />
          <CourseBanner />
        </div>
        <span className="glow_elements"></span>
      </div>
      <InfoModal
        name={selectedCourse?.name}
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
      <div className={`modal ${dateModalOpen ? "modal-open" : ""}`}>
        <div className="modal-content">
          <div className="flex justify-between mb-4">
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
    </>
  );
};

export default Course;
