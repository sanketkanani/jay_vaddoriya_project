import React from "react";
import img1 from "../../assets/images/works/woprk1.png";
import img2 from "../../assets/images/works/work2.png";
import img3 from "../../assets/images/works/work3.png";
import img4 from "../../assets/images/works/work4.png";
import img5 from "../../assets/images/works/work5.png";
import circle from "../../assets/svg/circle.svg";
import dotcircle from "../../assets/svg/dotcircle.svg";

const WorkMain = () => {
  return (
    <div className=" relative sub-section">
      <section className=" sm:max-w-[90%] xl:max-w-[70%]  mx-auto px-1 0">
        <div className=" flex justify-between items-center gap-5  max-md:flex-col-reverse ">
          <div className=" text-start flex flex-col justify-start items-start  ">
            {" "}
            <h4 className=" 2xl:text-base max-2xl:text-sm   text-primary  font-medium">
              81% Say that online classes are more effective
            </h4>
            <h1 className="2xl:text-2xl text-2xl font-semibold text-cblack mt-2">
              “Enroll now
            </h1>
            <p className=" 2xl:text-xl md:text-lg text-sm w-10/12  text-secondary font-normal border-l-2 border-primary pl-2 mt-3">
              Sign up and login to buy any program and you will be automatically
              enrolled
            </p>
          </div>
          <div className="  ">
            <img
              src={img1}
              alt=""
              className=" max-h-mh270  max-w-mw406 w-11/12"
            />
          </div>
        </div>
        <div className=" flex justify-between items-center gap-5 my-10  max-md:flex-col">
          <div className=" flex-1   ">
            <img src={img2} alt="" className=" max-w-60 max-h-60" />
          </div>
          <div className=" text-start  flex flex-col flex-1 ">
            {" "}
            <h4 className=" 2xl:text-base max-2xl:text-sm   text-primary  font-medium">
              73% MAANG asaspiahts are afraid to click job interviews
            </h4>
            <h1 className="2xl:text-2xl text-2xl font-semibold text-cblack mt-2">
              “Get a Timetable
            </h1>
            <p className=" 2xl:text-xl md:text-lg text-sm w-10/12  text-secondary font-normal border-l-2 border-primary pl-2 mt-3">
              View your timetable in the student portal which keeps you track on
              upcoming classes
            </p>
          </div>
        </div>
        <div className=" flex justify-between items-center gap-5  max-md:flex-col-reverse">
          <div className=" text-start flex flex-col justify-start items-start  ">
            {" "}
            <h4 className=" 2xl:text-base max-2xl:text-sm   text-primary  font-medium">
              60% Studies say coding is tough
            </h4>
            <h1 className="2xl:text-2xl text-2xl font-semibold text-cblack mt-2">
              “Attend live Classes
            </h1>
            <p className=" 2xl:text-xl md:text-lg text-sm w-10/12  text-secondary font-normal border-l-2 border-primary pl-2 mt-3">
              Join live classes on regular intervals and start solving problems
            </p>
          </div>
          <div className="  ">
            <img
              src={img3}
              alt=""
              className=" max-h-mh270  max-w-mw406 w-11/12"
            />
          </div>
        </div>
        <div className=" flex justify-between items-center my-10 gap-5  max-md:flex-col">
          <div className=" flex-1   ">
            <img src={img4} alt="" className=" max-w-60 max-h-60" />
          </div>
          <div className=" text-start  flex flex-col flex-1 ">
            {" "}
            <h4 className=" 2xl:text-base max-2xl:text-sm   text-primary  font-medium">
              60% Studies say coding is tough
            </h4>
            <h1 className="2xl:text-2xl text-2xl font-semibold text-cblack mt-2">
              “Connect with a Mentor
            </h1>
            <p className=" 2xl:text-xl md:text-base text-sm w-10/12  text-secondary font-normal border-l-2 border-primary pl-2 mt-3">
              Once enrolled, a mentor will be automatically assigned based on
              your program
            </p>
          </div>
        </div>
        <div className=" flex justify-between items-center gap-5  max-md:flex-col-reverse">
          <div className=" text-start flex flex-col justify-start items-start  ">
            {" "}
            <h4 className=" 2xl:text-base max-2xl:text-sm   text-primary  font-medium">
              90% Job aspirants don’t know what to prepare{" "}
            </h4>
            <h1 className="2xl:text-2xl text-2xl font-semibold text-cblack mt-2">
              “Get a course Completion Certificate{" "}
            </h1>
            <p className=" 2xl:text-xl md:text-lg text-sm w-10/12  text-secondary font-normal border-l-2 border-primary pl-2 mt-3">
              Complete the program to get a course certificate and Boom! you’re
              now ready to crack interviews
            </p>
          </div>
          <div className="  ">
            <img
              src={img5}
              alt=""
              className=" max-h-mh270  max-w-mw406 w-11/12"
            />
          </div>
        </div>
      </section>
      {/* <img src={circle} alt="" className=" absolute top-[45%] -right-5" /> */}
      <img src={dotcircle} alt="" className=" absolute top-[40%] left-20" />
      {/* <img src={circle} alt="" className=" absolute top-[88%] -right-10" /> */}
    </div>
  );
};

export default WorkMain;
