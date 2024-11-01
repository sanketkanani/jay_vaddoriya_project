import React from "react";
import img1 from "../../assets/images/dashboard/dashboard1.png";
import img2 from "../../assets/images/dashboard/dashboard2.png";
import img3 from "../../assets/images/dashboard/dashboard3.png";
import img4 from "../../assets/images/dashboard/dashboard4.png";
import img5 from "../../assets/images/dashboard/dashboard5.png";
import circle from "../../assets/svg/circle.svg";
import circledot from "../../assets/svg/dotcircle.svg";
import wave from "../../assets/svg/wave.svg";
import dashbordBG from "../../assets/how_works_bg.jpg";

const DashBoard = () => {
  return (
    <div
      className="main_student_portal md:mt-24 md:pb-5 for_mobile_display"
      style={{
        backgroundImage: `url(${dashbordBG})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat ",
      }}
    >
      <div className=" relative sub-section ">
        <section className=" mx-auto  ">
          <div className=" text-start">
            <h1 className="2xl:text-4xl text-2xl font-semibold text-cblack mt-2">
              Student Portal Features
            </h1>
            <p className=" 2xl:text-base md:text-xs text-sm   text-secondary font-normal mt-1">
              Unlock the full advantages online Learning
            </p>
          </div>

          <div className=" sm:px-5 sm:max-w-[90%] xl:max-w-[80%] mx-auto ">
            <div className=" mt-8 flex gap-5 justify-center  items-center mx-auto max-md:flex-col ">
              <div className="  h-11/12  shrink-0 flex-1 ">
                <img src={img1} alt="" className="  h-full w-full " />
              </div>
              <div className=" text-start flex-1  ! ">
                <h1 className="2xl:text-2xl  md:text-3xl max-md:text-xl font-semibold text-cblack mt-2">
                  #Dashboard
                </h1>
                <p className="  2xl:text-xl max-md:text-sm md:text-lg text-base w-12/12  text-secondary font-normal   mt-1">
                  Students are able to access an overview of key information
                  such as course advantages..Students are able to access an
                  overview of key information such as course advantages
                </p>
              </div>
            </div>
            <div className=" mt-8 flex gap-5 justify-center  items-center mx-auto max-md:flex-col-reverse ">
              <div className=" text-start flex-1  ">
                <h1 className="2xl:text-2xl  md:text-3xl max-md:text-xl font-semibold text-cblack mt-2">
                  #Time Table
                </h1>
                <p className="  2xl:text-xl max-md:text-sm md:text-lg text-base w-12/12  text-secondary font-normal   mt-1">
                  All the upcoming classes can be seen here. This helps to stay
                  organized and set penalty..All the upcoming classes can be
                  seen here. This helps to stay organized and set penalty.
                </p>
              </div>
              <div className="  h-11/12  shrink-0 flex-1 ">
                <img src={img2} alt="" className=" h-full w-full" />
              </div>
            </div>
            <div className=" mt-8 flex gap-5 justify-between  items-center mx-auto max-md:flex-col ">
              <div className="  h-11/12  shrink-0 flex-1 ">
                <img src={img3} alt="" className="  h-full w-full " />
              </div>
              <div className=" text-start flex-1  ">
                <h1 className="2xl:text-2xl  md:text-3xl max-md:text-xl font-semibold text-cblack mt-2">
                  #Practice coding
                </h1>
                <p className="  2xl:text-xl max-md:text-sm md:text-lg text-base w-12/12  text-secondary font-normal   mt-1">
                  Lorem ipsum dolor sit amet, consect adipiscing elit, sed do
                  eiusmod tempor incididunt ..Lorem ipsum dolor sit amet,
                  consect adipiscing elit, sed do eiusmod tempor incididunt .
                </p>
              </div>
            </div>
            <div className=" mt-8 flex gap-5 justify-center  items-center mx-auto max-md:flex-col-reverse ">
              <div className=" text-start flex-1  ">
                <h1 className="2xl:text-2xl  md:text-3xl max-md:text-xl font-semibold text-cblack mt-2">
                  #Quiz Question
                </h1>
                <p className="  2xl:text-xl max-md:text-sm md:text-lg text-base w-12/12  text-secondary font-normal   mt-1">
                  Lorem ipsum dolor sit amet, consect adipiscing elit, sed do
                  eiusmod tempor incididunt ..Lorem ipsum dolor sit amet,
                  consect adipiscing elit, sed do eiusmod tempor incididunt .
                </p>
              </div>
              <div className="  h-11/12  shrink-0  flex-1">
                <img src={img4} alt="" className=" h-full w-full" />
              </div>
            </div>
            <div className=" mt-8 flex gap-5 justify-center  items-center mx-auto max-md:flex-col ">
              <div className="  h-11/12  shrink-0 flex-1 ">
                <img src={img5} alt="" className="  h-full w-full " />
              </div>
              <div className=" text-start flex-1  ">
                <h1 className="2xl:text-2xl  md:text-3xl max-md:text-xl font-semibold text-cblack mt-2">
                  #Assignment Submission
                </h1>
                <p className=" 2xl:text-xl  max-md:text-sm md:text-lg text-base w-12/12  text-secondary font-normal   mt-1">
                  Stay Updated with mentors Assignment and submit it on
                  time..Stay Updated with mentors Assignment and submit it on
                  time..
                </p>
              </div>
            </div>
          </div>
        </section>
        <img src={circle} alt="" className=" absolute hidden top-96 -left-10" />
        <img src={circle} alt="" className=" absolute hidden top-1/3  " />
        <img
          src={circle}
          alt=""
          className=" absolute hidden top-3/4 -right-12"
        />
        <img
          src={circledot}
          alt=""
          className=" absolute hidden top-1/3  right-16"
        />
        <img
          src={wave}
          alt=""
          className=" absolute hidden top-[82%]  -left-28"
        />
      </div>
    </div>
  );
};

export default DashBoard;
