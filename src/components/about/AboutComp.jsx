import React from "react";
import Homeimg from "../../assets/images/about/about.png";

import dotcircle from "../../assets/svg/dotcircle.svg";
import circle from "../../assets/svg/circle.svg";

const AboutComp = () => {
  return (
    <div className=" relative">
      <section className="sub-section !mt-0 margin_for_header pb-0">
        <div className=" flex justify-center md:items-start items-center max-md:flex-col gap-5 relative z-10 mt-6">
          <div className=" flex-1 text-start flex flex-col gap-4 max-lg:grow-0 max-lg:shrink-0 max-lg:basis-[60%]">
            <h6 className=" text-xl font-medium text-primary">About Us</h6>
            <h1 className=" lg:text-4xl md:text-[32px] text-3xl  font-semibold text-cblack  ">
              Transforming the way <br className=" max-lg:hidden" /> of learning
              coding <br className=" max-lg:hidden" /> creatively
            </h1>
            <p className=" text-sm text-secondary md:w-3/4">
              {" "}
              We are an ed-tech start-up company founded in August 2021 by a
              group of employees from MAANG companies to revolutionize the way
              of learning to code creatively. Our company focuses on engineering
              students to help them through the interview preparation process to
              get their dream job.
            </p>
          </div>
          <div className="flex-1  w-full">
            <img
              src={Homeimg}
              alt=""
              className=" h-[300px] xl:w-[85%] w-[100%] object-cover rounded-3xl object-top-center"
            />
          </div>
        </div>
      </section>
      <img
        src={circle}
        alt=""
        className=" absolute top-[25%] -right-10 max-lg:hidden"
      />
      <img
        src={dotcircle}
        alt=""
        className=" absolute top-[38%] right-12 max-lg:hidden"
      />
    </div>
  );
};

export default AboutComp;
