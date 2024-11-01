import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import img1 from "../../assets/images/blog/blog1.png";
import img2 from "../../assets/images/blog/blog2.png";
import img3 from "../../assets/images/blog/blog3.png";
import arrowwhite from "../../assets/svg/whiteArrow.svg";

const AuthLayout = () => {
  return (
    <div>
      <section className=" sub-section md:h-[95vh]  overflow-hidden   p-2 bg-white flex justify-center items-center  max-md:gap-7 gap-6 lg:gap-14 max-md:flex-col pt-[100px]">
        <div className=" bg-cnavy  flex flex-col w-full justify-center items-start   flex-1 rounded-md px-4  h-full">
          {/* <img src={logo} alt="" className=" mt-6  h-[30px]" /> */}
          <div className=" text-start flex  grow flex-col justify-center  mt-5 w-full  items-start gap-2 text-white max-sm:pl-8 md:pl-14 xl:pl-20 h-full">
            <h1 className=" xl:text-5xl text-4xl max-md:text-2xl text-start mt-2 !leading-[1.2]  font-bold text-white max-md:pr-2">
              Welcome to <br /> Our Community
            </h1>
            <p className=" text-base  font-normal  mt-2">
              Sign Up or login to continue to the website
            </p>
            <div className=" mt-4 w-[85%] flex justify-between max-xl:flex-col items-start  ">
              <div>
                <div className="flex justify-start items-center mt-2">
                  <img
                    src={img1}
                    className=" h-10 w-10 rounded-full object-cover z-50"
                    alt=""
                  />
                  <img
                    src={img2}
                    className=" h-10 w-10 rounded-full object-cover z-40 -ml-2"
                    alt=""
                  />
                  <img
                    src={img3}
                    className=" h-10 w-10 rounded-full object-cover z-30 -ml-2"
                    alt=""
                  />
                  <span className=" ml-2 text-base font-normal ">
                    1,00,000+ Users
                  </span>
                </div>
                <div className="mt-5 flex w-full justify-between  text-sm font-normal ">
                  EXPLORE THE LIMITS
                </div>
              </div>
              <img src={arrowwhite} alt="" className=" relative  ml-auto" />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center  w-full relative">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;
