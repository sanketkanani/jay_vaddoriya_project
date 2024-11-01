import React from "react";
import phone from "../../assets/images/phone.png";
import yellowhex from "../../assets/svg/stepperbanner/yellowhexagonel.svg";
import whitehexa from "../../assets/svg/stepperbanner/whitehexagonel.svg";
import orangehexa from "../../assets/svg/stepperbanner/orangehexagonel.svg";
import righarrow from "../../assets/svg/stepperbanner/rightchevron.svg";
import circle from "../../assets/svg/circle.svg";
import dotcircle from "../../assets/svg/dotcircle.svg";
import solidcircle from "../../assets/svg/solidround.svg";
import ring from "../../assets/svg/circle.svg";

const StepBanner = () => {
  return (
    <>
      <div className=" relative bg-bannerbg bottom-shadow  py-5">
        <div className="2xl:sub-section md:w-[80%] px-4 md:max-h-[550px] py-10 stepper-bg rounded-xl flex max-md:flex-col justify-center gap-5 mx-auto overflow-hidden my-10">
          <h4 className=" 2xl:text-5xl max-2xl:text-3xl text-white font-semibold md:hidden pb-4">
            #Contest Announcement
          </h4>
          <h6 className=" 2xl:text-3xl max-2xl:text-xl text-white font-normal md:hidden pb-4">
            Chance to win 5k every Friday nist
          </h6>
          <div className=" md:px-10 flex flex-col max-md:flex-row  items-center max-md:justify-center">
            <div className=" custom-shadow bg-white text-center p-2 max-w-52 w-full ">
              <h5 className=" text-xl text-primary font-bold  text-nowrap ">
                Step 1
              </h5>
              <h6 className=" text-base text-secondary font-normal">
                Register
              </h6>
            </div>
            <div className="  border border-x flex flex-nowrap md:border-y md:h-6 max-md:w-20 "></div>

            <div className=" custom-shadow bg-white text-center p-2 !max-w-52 w-full">
              <h5 className=" text-xl text-primary font-bold  text-nowrap text-nowrap">
                Step 2
              </h5>
              <h6 className=" text-base text-nowrap text-secondary font-normal">
                Complete contest
              </h6>
            </div>
            <div className="  border border-x  md:border-y md:h-6 max-md:w-20 "></div>
            <div className=" custom-shadow bg-white text-center p-2 !max-w-52 w-full">
              <h5 className="text-xl text-primary font-bold  text-nowraptext-nowrap">
                Step 3
              </h5>
              <h6 className=" text-base text-secondary font-normal">Win</h6>
            </div>
          </div>
          <div className=" mx-auto ">
            <img
              src={phone}
              alt=""
              className=" relative top-10 h-full  mx-auto object-top-center xl:mb-0 mb-9"
            />
          </div>
          <div className=" my-auto relative">
            <h4 className=" 2xl:text-4xl max-2xl:text-3xl text-white font-semibold max-md:hidden">
              #Contest Announcement
            </h4>
            <h6 className=" 2xl:text-2xl max-2xl:text-xl text-white font-normal max-md:hidden">
              Chance to win 5k every Friday nist
            </h6>
            <div className=" mx-auto flex flex-col justify-center items-center my-2">
              <div className=" relative">
                <img src={yellowhex} alt="" className="" class="img-fluid" />
                <div className=" absolute top-12 left-4">
                  <h3 className=" text-white px-3  rounded-full inline  p-1 bg-black font-medium 2xl:text-base max-2xl:text-xs">
                    1<sup>st </sup> <span className="pl-1">Price</span>
                  </h3>
                  <div className=" flex items-center gap-2 text-xl font-semibold mt-3">
                    <h1 className="mx-auto px-2 bg-black rounded-full text-cyellow ">
                      ₹{" "}
                    </h1>
                    5000
                  </div>
                </div>
              </div>
              <div className=" flex gap-2 -mt-10">
                <div className=" relative">
                  <img src={whitehexa} alt="" className="" class="img-fluid" />
                  <div className=" absolute top-12 left-4">
                    <h3 className=" text-white px-3  rounded-full inline  p-1 bg-black font-medium 2xl:text-base max-2xl:text-xs">
                      2<sup>nd </sup> <span className="pl-1">Price</span>
                    </h3>
                    <div className=" flex items-center gap-2 text-xl font-semibold mt-3 md:text-base md:leading-[18px]">
                      <h1 className="mx-auto px-2 bg-black rounded-full text-white">
                        ₹{" "}
                      </h1>
                      3000
                    </div>
                  </div>
                </div>
                <div className=" relative">
                  <img src={orangehexa} alt="" className="" class="img-fluid" />
                  <div className=" absolute top-12 left-4">
                    <h3 className=" text-white px-3  rounded-full inline  p-1 bg-black font-medium 2xl:text-base max-2xl:text-xs">
                      3<sup>rd </sup> <span className="pl-1">Price</span>
                    </h3>
                    <div className=" flex items-center gap-2 text-xl font-semibold mt-3 md:text-base md:leading-[18px]">
                      <h1 className="mx-auto px-2 bg-black rounded-full text-corange ">
                        ₹{" "}
                      </h1>
                      5000
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <button className=" custom-button font-semibold text-base mx-auto bg-white text-primary flex items-center gap-2 border-white mt-5">
                <span>View Contest</span>
                <img src={righarrow} alt="" />
              </button>
            </div>
          </div>
        </div>
        <img
          src={solidcircle}
          alt=""
          className=" max-md:hidden absolute top-20  -right-5 z-50"
        />

        <img
          src={dotcircle}
          alt=""
          className=" max-md:hidden absolute top-[40%] left-5"
        />
        <img
          src={ring}
          alt=""
          className=" max-md:hidden absolute top-[50%] -left-5"
        />
        <span className="bottom-bg"></span>
      </div>
    </>
  );
};

export default StepBanner;
