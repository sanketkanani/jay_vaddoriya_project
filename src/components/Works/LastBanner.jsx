import React from "react";
import rightarrow from "../../assets/svg/Rightsidearrow/rightarrowgreen.svg";
import dottedcircle from "../../assets/svg/whitdotcircle.svg";
import greendot from "../../assets/svg/dotcircle.svg";
import phone from "../../assets/svg/phone/bluephone.svg";
import fromImg from "../../assets/request-img.png";
import { Link } from "react-router-dom";

const LastBanner = () => {
  return (
    <>
      <div className=" relative">
        <div className=" sub-section">
          <div className="  bg-primary  rounded-lg py-8 px-6 flex justify-between items-center max-sm:flex-col">
            <div className=" text-white text-start">
              <h1 className=" text-2xl  font-semibold md:w-[70%] my-2 max-sm:text-xl">
                MAANG your learning journey Book call today and unlock Limitless
                Educations
              </h1>
            </div>
            <div className=" relative">
              <img src={dottedcircle} alt="" />
              <img
                src={dottedcircle}
                alt=""
                className=" absolute -top-8 left-12"
              />
            </div>
            <button
              className=" custom-button bg-white text-primary flex gap-2 w-[10/12]"
              onClick={() =>
                window.document
                  .getElementById("modal")
                  .classList.remove("hidden")
              }
            >
              <img src={phone} alt="" />
              <span>Book a Call</span>
            </button>
          </div>
        </div>
        {/* <img src={greendot} alt="" className=" right-0 absolute top-0" /> */}
      </div>
      <div
        id="modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden request_call_modal_main z-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg relative modal_main_wrapper z-30">
          <div className="from_wrapper text-left w-[50%]">
            <div className="inner_from_wrapper p-6">
              <div className="heading text-center">
                <h2 h2 className="text-3xl font-bold mb-4">
                  Request a Call Back
                </h2>
                <p className="mb-4 text-sm " style={{ color: "#494949" }}>
                  Simplify your workflow and boost your productivity with{" "}
                  <span className="font-semibold">MAANG Careers</span>. Get
                  started for free.
                </p>
              </div>
              <div className="form_holder mt-5">
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      className="border p-2 w-full"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="phone"
                      className="border p-2 w-full"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      name="phone"
                      className="border p-2 w-full"
                      placeholder="Enter your number"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      name="phone"
                      className="border p-2 w-full "
                      placeholder="University name here"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="phone"
                      className="border p-2 w-full "
                      placeholder="Enter your location"
                    />
                  </div>
                  <button
                    className="absolute text-black w-8 bg-primary text-white h-8 rounded-full -right-4 -top-2 text-lg p-0"
                    onClick={(event) => {
                      event.preventDefault(); // Prevent any default action
                      document.getElementById("modal").classList.add("hidden");
                    }}
                  >
                    &times;
                  </button>
                  <div className="flex justify-end mt-4">
                    <input
                      type="submit"
                      value="Submit"
                      className="bg-primary text-white px-4 py-2 rounded w-full cursor-pointer"
                    />
                  </div>
                </form>
              </div>
              <div>
                <p className="text-black text-sm text-center mt-6">
                  Not a member?{" "}
                  <Link to="/signup" className="" style={{ color: "#2DB2C4" }}>
                    Register now
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="form_img_wrapper p-7 w-[50%]">
            <div>
              <img src={fromImg} alt="" className="" />
            </div>
            <div className="text text-center mt-14">
              Make your work easier and organized <br /> with{" "}
              <span className="text-black font-semibold">MAANG Careers</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LastBanner;
