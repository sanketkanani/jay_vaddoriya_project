import React from "react";
import phone from "../../assets/svg/phone/phone.svg";
import curveborder from "../../assets/svg/waveborder.svg";
import dottcircle from "../../assets/svg/dotcircle.svg";
import ring from "../../assets/svg/circle.svg";
import smallring from "../../assets/svg/smallring.svg";
import lineRoadMap from "../../assets/svg/line-v2.svg"
import ringAll from "../../assets/ringall.svg"
import AnimationData from "./AnimationData"
import { Link } from "react-router-dom";

const Developer = () => {
  return (
    <>
      <div className=" bg-white relative !mt-0 ">
        <section className="sub-section relative z-10">
          <div className=" flex justify-center items-start md:pl-10 xl:pl-0">
            <div className=" flex-1 text-start flex flex-col gap-4 ">
              <h6 className=" text-xl font-medium text-primary">
                Our interview preparation strategy
              </h6>
              <h1 className=" 2xl:text-f68 leading-[1.2]  text-3xl font-bold text-cblack  max-md:pr-2">
                Roadmap to become <br /> a software developer
              </h1>
              <p className="  text-lg text-secondary">
                {" "}
                Level up by boosting your coding skills
              </p>
              <div className=" flex items-center gap-4 mt-5 ">
                <Link className=" custom-button bg-primary text-white  max-sm:w-full" to="/program">
                  Get Started
                </Link>
                <button className=" custom-button text-cblack border-cblack flex max-sm:w-full gap-2 border-1 border-solid border-black" onClick={() =>document.getElementById('modal').classList.remove('hidden')}>
                  <span>
                    {" "}
                    <img src={phone} alt="" />
                  </span>
                  Book a free demo
                </button>
              </div>
            </div>
          </div>
          {/* <div className="wave h-[250px] relative ">
            <div className=" flex  flex-col justify-center items-center absolute -bottom-20 left-24">
              <h2 className=" h-3 w-3 rounded-full bg-primary text-center mx-auto"></h2>
              <div className=" flex justify-start items-center">
                <h2 className=" text-sm text-primary mt-5">
                  Language C++, <br /> Java, Python
                </h2>
                <h3 className=" text-7xl text-primary font-bold">
                  1
                </h3>
              </div>
            </div>
          </div> */}
        </section>
        <img
          src={dottcircle}
          alt=""
          className=" max-md:hidden absolute -left-16 top-[10%]"
        />
        <img
          src={ring}
          alt=""
          className=" max-md:hidden absolute right-10  -top-16"
        />
        <img
          src={ring}
          alt=""
          className=" max-md:hidden absolute -left-10  top-28"
        />
        <span className="big_ring">
          <img src={ringAll} alt="" />
        </span>
        <img
          src={smallring}
          alt=""
          className=" max-md:hidden absolute right-32  top-2"
        />
      </div>
      <div className="sub-section roadmap relative lg:max-w-[1430px] w-full">
        <AnimationData />
        <img
          src={dottcircle}
          alt=""
          className=" max-md:hidden absolute  right-[20%] bottom-8"
        />
        <img
          src={ring}
          alt=""
          className=" max-md:hidden absolute -right-24  -bottom-12"
        />
      </div>
    </>
  );
};

export default Developer;
