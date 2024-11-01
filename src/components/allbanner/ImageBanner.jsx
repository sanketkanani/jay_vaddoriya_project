import React from "react";
import img1 from "../../assets/images/imagebannergirl.png";
import phone from "../../assets/svg/phone/bluephone.svg";

const ImageBanner = () => {
  return (
    <div className="w-[80%] mx-auto ">
      <div className=" rounded-lg relative main_call_action  top-16 bg-primary p-4 mt-16 max-md:flex-col flex    h-full  justify-between gap-4 items-center">
        <div className="max-md:order-last">
          {" "}
          <img
            src={img1}
            className=" max-w-40 max-h-64 h-full max-md:max-h-40 w-full object-cover relative -bottom-4 "
            alt=""
          />
        </div>
        <div className=" 2xl:text-2xl max-2xl:text-xl md:w-2/4   font-medium text-white">
          Still Confused which programs to choose ?
        </div>
        <button
          className=" custom-button bg-white text-primary flex gap-2 w-[10/12]"
          onClick={() =>
            window.document.getElementById("modal").classList.remove("hidden")
          }
        >
          <img src={phone} alt="" />
          <span>Request a free Call</span>
        </button>
      </div>
    </div>
  );
};

export default ImageBanner;
