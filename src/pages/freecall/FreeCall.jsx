import React from "react";
import img from "../../assets/images/model.png";
import girl from "../../assets/svg/girl.svg";
import boy from "../../assets/svg/boycall.svg";
import ringper from "../../assets/svg/ringper.svg";
import close from "../../assets/svg/close.svg";
import { Link } from "react-router-dom";

const FreeCall = () => {
  return (
    <div className="">
      <section className=" w-[70%] mx-auto ">
        <img src={close} alt="" className=" bg-black p-2 ml-auto" />
        <div className=" max-w-10/12 custom-shadow p-5 flex max-md:flex-col-reverse justify-between items-start gap-10">
          <div className="flex-1">
            <form className=" form-horizontal  w-11/12 ">
              <h1 className=" 2xl:text-3xl font-semibold max-2xl:text-xl text-center">
                Request a free Call
              </h1>
              <p className=" font-medium 2xl:text-base max-2xl:text-sm text-secondary my-2">
                Simplify your workflow and boost your productivity with{" "}
                <span className=" text-cblack  font-semibold">
                  {" "}
                  MAANG Career
                </span>
                . Get started for free.
              </p>
              <div className="  mt-10 flex flex-col justify-start items-start gap-4">
                <input
                  type="text"
                  placeholder=" enter name"
                  className=" p-3 rounded-full w-full 2xl:text-base  max-2xl:text-sm font-medium border-cblack border-[1px] outline-none"
                />
                <input
                  type="email"
                  placeholder=" enter email"
                  className=" p-3 rounded-full w-full 2xl:text-base  max-2xl:text-sm font-medium border-cblack border-[1px] outline-none"
                />
                <input
                  type="number"
                  placeholder=" enter number"
                  className=" p-3 rounded-full w-full 2xl:text-base  max-2xl:text-sm font-medium border-cblack border-[1px] outline-none"
                />
                <input
                  type="text"
                  placeholder=" enter University Name Here"
                  className=" p-3 rounded-full w-full 2xl:text-base  max-2xl:text-sm font-medium border-cblack border-[1px] outline-none"
                />
                <button className=" custom-button bg-primary text-white w-full">
                  Submit
                </button>
                <div className=" mt-10 text-center mx-auto">
                  <h1 className=" text-base font-medium text-center">
                    Not a member?{" "}
                    <Link to="/signup" className=" text-primary">
                      Register Now
                    </Link>{" "}
                  </h1>
                </div>
              </div>
            </form>
          </div>
          <div className=" flex-1 max-md:hidden">
            <div className=" relative ">
              <img src={img} alt="" className=" w-10/12 mx-auto" />
              <img src={girl} alt="" className="  absolute top-1/3 -left-10" />
              <img src={boy} alt="" className=" absolute right-0 top-10" />
              <div className=" absolute top-3/4 -left-6">
                <div className=" p-4 border rounded-md custom-shadow bg-white border-cborder inline-block relative mr-auto">
                  <h1 className=" text-md text-cblack font-medium  text-start !leading-none">
                    Canva Design
                    <br />
                    <span className=" text-secondary mt-2">10 Task</span>
                  </h1>
                  <div className="  text-sm inline-block py-1 px-3 text-cblack font-medium mr-8   mt-5 border rounded-full border-secondary">
                    Design
                  </div>
                  <div className=" absolute top-10  right-0 ">
                    <img src={ringper} alt="" />
                    <span className=" text-sm font-semibold  relative -top-9 ">
                      84%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h1 className=" w-10/12 text-center 2xl:text-2xl  max-2xl:text-xl mt-10 font-medium text-cblack">
                Make your work easier and organized with{" "}
                <span class="w-10 font-semibold">MAANG Careers</span>{" "}
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeCall;
