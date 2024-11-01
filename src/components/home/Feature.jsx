import React from "react";
import imageleft from "../../assets/images/feature.png";
import video from "../../assets/svg/feature/video.svg";
import degree from "../../assets/svg/feature/degree.svg";
import guide1 from "../../assets/svg/feature/guide1.svg";
import guide2 from "../../assets/svg/feature/guide2.svg";
import guide3 from "../../assets/svg/feature/guide3.svg";
import leftsmallscreen from "../../assets/images/featureforsamll.png";
import dottcircle from "../../assets/svg/dotcircle.svg";
import circle from "../../assets/svg/circle.svg";
import solidring from "../../assets/svg/solidround.svg";
const Feature = () => {
  return (
    <div className=" bg-white relative overflow-hidden premium_student_main">
      <section className=" sub-section z-10 relative">
        <div className="xl:flex md:mt-28 max-md:flex-col gap-2 justify-between max-lg:gap-10 md:flex-wrap">
          <div className="xl:flex-1 md:px-10 mx-auto max-md:pb-10 md:flex-[1 1 100%] md:mb-10">
            <div className=" text-start md:hidden block pb-10 px-10">
              <h6 className=" 2xl:text-2xl max-2xl:text-xl text-primary font-normal">
                Program Features
              </h6>
              <h3 className=" title !text-3xl mt-2 ">Premium Student Portal</h3>
              <p className=" text-secondary text-sm !pl-0 md:w-8/12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <img
              src={leftsmallscreen}
              alt=""
              className=" h-full md:w-[500px] w-full md:hidden mx-auto"
            />
            <div className="bg-black max-md:w-11/12 p-2 max-md:hidden rounded-md relative inline-block shrink-0 ">
              <img
                src={imageleft}
                alt=""
                className="max-w-[550px]  w-full h-full max-h-[280px]"
              />
              <div className=" flex items-start absolute -top-20 left-16">
                <h4 className=" 2xl:text-xl max-2xl:text-lg text-primary font-medium  text-start ">
                  Live <br /> Classes
                </h4>
                <img src={guide2} alt="" />
              </div>
              <div className="  absolute top-24 -left-16">
                <img src={guide1} alt="" />
                <h4 className=" 2xl:text-xl max-2xl:text-lg !pt-0 text-primary font-medium  text-start ">
                  Mock
                  <br /> test
                </h4>
              </div>
              <div className="  absolute md:-top-20 md:-right-14 -top-24 -right-16  ">
                <div className="flex gap-2 flex-row-reverse relative items-start">
                  <img src={guide3} alt="" />
                  <h4 className=" 2xl:text-xl max-2xl:text-lg absolute  top-0 -left-10 !pt-0 text-primary font-medium  text-start ">
                    Student
                    <br /> Performance
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:flex-1 md:flex-[0 0 100%]">
            <div className=" text-start md:px-2 mx-auto ">
              <div className=" md:block hidden">
                <h6 className=" text-base text-primary font-normal uppercase text-2xl">
                  Program Features
                </h6>
                <h3 className=" title text-md/[50px] mt-2 mb-2 !font-semibold">
                  Premium Student Portal
                </h3>
                <p className=" text-secondary text-sm !pl-0 w-8/12">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <ul className=" mt-8 max-md:px-10">
                <li className=" flex items-start gap-4">
                  <h4 className=" bg-corange p-2 rounded-full">
                    {" "}
                    <img src={video} alt="" />
                  </h4>

                  <div>
                    <h4 className="  text-xl text-cblack font-semibold">
                      Join Our Live Classes
                    </h4>
                    <p className=" text-sm text-secondary font-normal   ">
                      Odio eu feugiat pretium nibh ipsum consequat nisl. Lectus
                      quam id leo in vitae turpis.
                    </p>
                  </div>
                </li>
                <li className=" flex items-start gap-4 my-4">
                  <h4 className=" bg-cblue p-2 rounded-full">
                    {" "}
                    <img src={degree} alt="" />
                  </h4>

                  <div>
                    <h4 className=" text-xl font-semibold text-cblack">
                      Join Our Live Classes
                    </h4>
                    <p className=" text-sm text-secondary font-normal  ">
                      Odio eu feugiat pretium nibh ipsum consequat nisl. Lectus
                      quam id leo in vitae turpis.
                    </p>
                  </div>
                </li>
                <li className=" flex items-start gap-4 my-4">
                  <h4 className=" bg-cpurple p-2 rounded-full">
                    {" "}
                    <img src={degree} alt="" />
                  </h4>

                  <div>
                    <h4 className=" text-xl font-medium text-cblack font-semibold">
                      Join Our Live Classes
                    </h4>
                    <p className=" text-sm text-secondary font-normal   ">
                      Odio eu feugiat pretium nibh ipsum consequat nisl. Lectus
                      quam id leo in vitae turpis.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <img
        src={circle}
        alt=""
        className=" absolute top-[40%]  -right-6 max-md:hidden"
      />
      <img
        src={dottcircle}
        alt=""
        className=" absolute top-2 -left-14 max-md:hidden"
      />
      <img
        src={dottcircle}
        alt=""
        className=" absolute -bottom-10 left-24 max-md:hidden"
      />
      <img
        src={dottcircle}
        alt=""
        className=" absolute -top-16  right-10 max-md:hidden"
      />
      <img
        src={solidring}
        alt=""
        className=" absolute bottom-[40%] -left-8 max-md:hidden"
      />
      <span className="glow_elements"></span>
    </div>
  );
};

export default Feature;
