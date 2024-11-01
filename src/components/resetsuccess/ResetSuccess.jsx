import React from "react";
import logo from "../../assets/images/logo.png";
import img1 from "../../assets/images/blog/blog1.png";
import img2 from "../../assets/images/blog/blog2.png";
import img3 from "../../assets/images/blog/blog3.png";
import arrowwhite from "../../assets/svg/whiteArrow.svg";
import { Link } from "react-router-dom";
import resetsuccess from "../../assets/thankyou-main-img.png";
import Button from "../button/Button";

const ResetSuccessComp = () => {
  return (
    <>
      <div className="flex-1 flex flex-col justify-center relative  items-center">
        <img src={resetsuccess} alt="" width={200} height={200} />
        <h1 className=" text-black font-semibold lg:text-[40px] md:text-xl mt-5 mb-4">Thank You !</h1>
        <h1 className=" text-black font-semibold text-lg ">
          Your Password is resetted successfully
        </h1>
        <h1 className=" text-secondary font-medium  text-sm mt-2 ">
          You will redirect to the login page
        </h1>
        <h1 className=" text-secondary font-medium  text-sm  mt-2">
          Redirecting to website in 50 seconds !
        </h1>
        <h1 className=" text-secondary font-medium  text-lg my-3">Or</h1>
        <div className=" px-2 py-2 bg-primary text-white text-lg rounded-full max-w-[200px] w-full">
          Log in now
        </div>
      </div>
    </>
  );
};

export default ResetSuccessComp;
