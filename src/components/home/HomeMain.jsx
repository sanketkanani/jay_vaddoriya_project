import React from "react";
import Homeimg from "../../assets/images/girl.png";
import graph from "../../assets/svg/home/graph.svg";
import people from "../../assets/svg/home/people.svg";
import men from "../../assets/svg/home/men.svg";
import question from "../../assets/svg/home/question.svg";
import phone from "../../assets/svg/phone/phone.svg";
import arrowe from "../../assets/svg/home/arrow.svg";
import playbutton from "../../assets/svg/plabuttonsvg.svg";
import sideimg from "../../assets/main-side-img-02.png";
import ring from "../../assets/svg/circle.svg";
import dottcircle from "../../assets/svg/dotcircle.svg";
import { useNavigate } from "react-router-dom";

const HomeMain = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative banner_main_index overflow-hidden z-10 margin_for_header"
      style={{
        background:
          "linear-gradient(rgb(45 124 196 / 8%) 40%, rgba(45, 151, 196, 0) 100%)",
      }}
    >
      <div className=" sub-section   md:!px-2 xl:!px-0 !max-md:pt-0">
        <section className="sub-section   !md:pt-0">
          <div className=" flex justify-center items-start ">
            <div className=" text-start flex justify-start flex-col gap-4 flex-1 md:mt-0 xl:mt-10">
              <h6 className=" text-base font-medium text-primary">
                EXPLORE THE LIMITS
              </h6>
              <h1 className=" 2xl:text-f68 !leading-[1.2] max-md:text-[30px] lg:text-4xl xl:text-f68 md:text-2xl  font-bold text-cblack">
                Get Your <span className=" text-primary ">Dream Job</span> by{" "}
                <br className=" hidden md:block" />
                learning from our world <br className=" hidden md:block" />{" "}
                class mentors.
              </h1>
              <p className=" text-xl text-secondary max-md:text-[14px]">
                {" "}
                Improve your career with coding skils.
              </p>
              <div className=" flex items-center gap-4 mt-3">
                <button
                  className=" custom-button bg-primary text-white max-sm:w-full"
                  onClick={() => {
                    navigate("/program");
                  }}
                  style={{
                    boxShadow: "rgba(45, 178, 196, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  Explore Programs
                </button>
                <button
                  className=" custom-button text-cblack border-cblack max-sm:w-full flex items-center gap-2 border-solid"
                  onClick={() =>
                    document.getElementById("modal").classList.remove("hidden")
                  }
                >
                  <img src={phone} alt="" /> <span>Book a free demo</span>
                </button>
              </div>
              <div className="mt-2 flex gap-4 items-center relative z-10 ">
                <button
                  className="p-2 bg-white shadow-xl h-10 w-10 flex justify-center items-center rounded-full"
                  onClick={() =>
                    document
                      .getElementById("videoModalPlayHome")
                      .classList.remove("hidden")
                  }
                >
                  <img src={playbutton} alt="" />
                </button>
                <a href=" " className=" text-xl text-cblack font-bold ">
                  Play Video{" "}
                  <span className=" 2xl:text-base text-xs text-black font-mono max-md:ml-4 inline-block">
                    (How It Works)
                  </span>
                </a>
              </div>
            </div>

            <div className="  max-md:hidden  w-full  flex-1 ">
              {/* <div className=" rounded-full  relative max-lg:h-[250px] max-lg:w-[250px] text-primary h-[330px] w-[350px] border-primary border-2">
              <img
                src={Homeimg}
                alt=""
                className=" absolute -top-14 right-0    "
              />
              <div className=" custom-shadow  flex p-2  gap-1 items-center absolute -left-24 bg-white top-10 ">
                <div className=" bg-corange rounded-md p-2 flex justify-center items-center">
                  <img src={question} alt="" />
                </div>
                <div className=" text-start">
                  <h5 className=" 2xl:text-base text-xs text-cblack font-semibold">
                    1000+ <br /> Coding Questions
                  </h5>
                </div>
              </div>
              <div className=" custom-shadow  flex p-2  gap-1 items-center absolute -right-16 bg-white top-0 ">
                <div className=" bg-cblue rounded-md p-2 flex justify-center items-center">
                  <img src={men} alt="" />
                </div>
                <div className=" text-start">
                  <h5 className=" 2xl:text-base text-xs text-cblack font-semibold">
                    Hybrid <br /> Classes
                  </h5>
                </div>
              </div>
              <div className=" custom-shadow  flex flex-col p-2  gap-1 items-start absolute  -left-8 bg-white -bottom-16 ">
                <div className=" bg-cpurple rounded-md p-2 flex justify-center items-center">
                  <img src={people} alt="" />
                </div>
                <div className=" text-start">
                  <h5 className=" 2xl:text-base text-xs text-cblack font-semibold">
                    Mock <br /> Interviews
                  </h5>
                </div>
              </div>
              <div className=" custom-shadow  flex  p-2  gap-1  absolute -right-28 bg-white bottom-0 ">
                <div className=" bg-primary rounded-md p-2 flex justify-center ">
                  <img src={people} alt="" />
                </div>
                <div className=" text-start">
                  <h5 className=" 2xl:text-base text-xs text-cblack font-semibold">
                    Real Time <br /> Industry <br /> Projects
                  </h5>
                </div>
              </div>
            </div> */}
              <img src={sideimg} alt="" className=" flex-1 w-full" />
            </div>
          </div>
          <div className=" text-center flex justify-center items-center left-10  relative lg:-top-28 max-md:mt-6">
            <img src={arrowe} alt="" className="max-md:h-[65px]" />
          </div>
        </section>
        <img
          src={dottcircle}
          alt=""
          className=" max-md:hidden absolute xl:-left-10 md:-left-20  md:bottom-[10%] xl:bottom-[25%] z-[3]"
        />
        <img
          src={ring}
          alt=""
          className=" max-md:hidden absolute xl:-left-10 md:-left-10 md:bottom-[6%] xl:bottom-[20%] z-[3]"
        />
      </div>
    </div>
  );
};

export default HomeMain;
