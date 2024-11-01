import React from "react";
import avatar1 from "../../assets/images/blog/blog1.png";
import ImageBanner from "../../components/allbanner/ImageBanner";
import CardCarasol from "../../components/allcarasol/CardCarasol";
import GalleryCarasol from "../../components/home/GalleryCarasol";
import Feature from "../../components/home/Feature";
import Testimonial from "../../components/allcarasol/Testimonial";
import trophy from "../../assets/svg/prize.svg";
import img1 from "../../assets/images/pngegg (5)contes6banner.png";
import phone from "../../assets/svg/Rightsidearrow/rightarrowgreen.svg";
import circle from "../../assets/svg/circle.svg";
import dottcircle from "../../assets/svg/dotcircle.svg";
import wave from "../../assets/svg/wave.svg";

const Contest5 = () => {
  return (
    <div className="margin_for_header overflow-x-hidden relative w-full">
      <div>
        <section className=" sub-section !pt-0 ">
          <div className=" flex flex-col justify-center  mx-auto jobdetailbanner h-[197px] text-start">
            <div className="ml-10  text-white ">
              <h4 className=" text-3xl font-semibold   ">Leadership Board </h4>
              <h6 className=" font-normal my-2 text-lg">
                Unlock your coding potential to win
              </h6>{" "}
            </div>
          </div>
          <div className=" mt-20 md:block hidden">
            <h4 className=" title sm:text-center text-start !lg:text-[50px]">
              Contest winners
            </h4>
            <div className=" p-2 text-start px-10 flex justify-center max-md:flex-col items-center gap-5">
              <div className=" bg-cmustard max-w-96 mx-auto md:p-8 p-4 rounded-3xl w-full mt-8 text-white">
                <div className="flex gap-5 justify-start items-center">
                  <img
                    src={avatar1}
                    alt=""
                    className=" h-14 w-14 object-cover  rounded-full "
                  />
                  <div>
                    {" "}
                    <h4 className="fs24 text-white">Ajay Gunty</h4>
                    <h5 className="fs16 text-white">Language: C++</h5>
                  </div>
                </div>
                <div className=" flex justify-between mt-8">
                  {" "}
                  <div className=" flex gap-2 items-center">
                    <h1 className=" fs24 text-white !leading-none">
                      #1 <br />
                      <span className="fs16 text-white">Rank</span>
                    </h1>
                  </div>
                  <div className=" text-end">
                    <h4 className="fs24">95/100</h4>
                    <h6 className="fs16">Points</h6>
                  </div>
                </div>
              </div>
              <div className=" bg-cpink max-w-96 mx-auto md:p-8 p-4 rounded-3xl w-full mt-8 text-white">
                <div className="flex gap-5 justify-start items-center">
                  <img
                    src={avatar1}
                    alt=""
                    className=" h-14 w-14 object-cover  rounded-full "
                  />
                  <div>
                    {" "}
                    <h4 className="fs24 text-white">Ajay Gunty</h4>
                    <h5 className="fs16 text-white">Language: C++</h5>
                  </div>
                </div>
                <div className=" flex justify-between mt-8">
                  {" "}
                  <div className=" flex gap-2 items-center">
                    <h1 className=" fs24 text-white !leading-none">
                      #1 <br />
                      <span className="fs16 text-white">Rank</span>
                    </h1>
                  </div>
                  <div className=" text-end">
                    <h4 className="fs24">95/100</h4>
                    <h6 className="fs16">Points</h6>
                  </div>
                </div>
              </div>
              <div className=" bg-cpurple max-w-96 mx-auto md:p-8 p-4 rounded-3xl w-full mt-8 text-white">
                <div className="flex gap-5 justify-start items-center">
                  <img
                    src={avatar1}
                    alt=""
                    className=" h-14 w-14 object-cover  rounded-full "
                  />
                  <div>
                    {" "}
                    <h4 className="fs24 text-white">Ajay Gunty</h4>
                    <h5 className="fs16 text-white">Language: C++</h5>
                  </div>
                </div>
                <div className=" flex justify-between mt-8">
                  {" "}
                  <div className=" flex gap-2 items-center">
                    <h1 className=" fs24 text-white !leading-none">
                      #1 <br />
                      <span className="fs16 text-white">Rank</span>
                    </h1>
                  </div>
                  <div className=" text-end">
                    <h4 className="fs24">95/100</h4>
                    <h6 className="fs16">Points</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="  mt-10 overflow-x-scroll">
            <h1 className="text-2xl font-semibold text-cblack text-start">
              All Rankings
            </h1>
            <table className=" mt-5 w-full overflow-x-scroll max-sm:hidden border-separate border-spacing-5">
              <tr className=" fs16 text-secondary    ">
                <th className=" text-start ml-5">
                  <div className=" ml-5">Rank</div>{" "}
                </th>
                <th className=" text-start">Name</th>
                <th className=" text-center">Languages</th>
                <th className=" text-center">Question solved</th>
                <th className=" text-center">Completed Time</th>

                <th className=" text-start">Point</th>
              </tr>

              <tr className=" text-cblack  bg-white custom-shadow p-2 ">
                <td className="fs16 mt-5  text-start  ">
                  <span className="px-3 py-2 rounded-md bg-primary text-start text-white font-medium ml-4">
                    #1
                  </span>
                </td>
                <td className=" py-5  text-start fs16 text-cblack text-nowrap ">
                  Jane Cooper
                </td>
                <td className=" py-5  text-center fs16">C++</td>
                <td className=" py-5  text-center fs16">3/10</td>
                <td className=" py-5  text-center fs16">25 Min</td>
                <td className=" py-5  text-start fs16">95/100</td>
              </tr>

              <tr className=" text-cblack  bg-white custom-shadow p-2 ">
                <td className="fs16 mt-5  text-start  ">
                  <span className="px-3 py-2 rounded-md bg-primary text-start text-white font-medium ml-4">
                    #1
                  </span>
                </td>
                <td className=" py-5  text-start fs16 text-cblack text-nowrap ">
                  Jane Cooper
                </td>
                <td className=" py-5  text-center fs16">C++</td>
                <td className=" py-5  text-center fs16">3/10</td>
                <td className=" py-5  text-center fs16">25 Min</td>
                <td className=" py-5  text-start fs16">95/100</td>
              </tr>

              <tr className=" text-cblack  bg-white custom-shadow p-2 ">
                <td className="fs16 mt-5  text-start  ">
                  <span className="px-3 py-2 rounded-md bg-primary text-start text-white font-medium ml-4">
                    #1
                  </span>
                </td>
                <td className=" py-5  text-start fs16 text-cblack text-nowrap ">
                  Jane Cooper
                </td>
                <td className=" py-5  text-center fs16">C++</td>
                <td className=" py-5  text-center fs16">3/10</td>
                <td className=" py-5  text-center fs16">25 Min</td>
                <td className=" py-5  text-start fs16">95/100</td>
              </tr>

              <tr className=" text-cblack bg-white custom-shadow p-2  ">
                <td className=" fs16 mt-5  text-start  ">
                  <span className="px-3 py-2 ml-4 rounded-md bg-primary text-start text-white font-medium">
                    #1
                  </span>
                </td>
                <td className=" py-5  text-start fs16 text-cblack text-nowrap ">
                  Jane Cooper
                </td>
                <td className=" py-5  text-center fs16">C++</td>
                <td className=" py-5  text-center fs16">3/10</td>
                <td className=" py-5  text-center fs16">25 Min</td>
                <td className=" py-5  text-start fs16">95/100</td>
              </tr>
            </table>
            <div className=" px-6 pt-5 pb-8 mt-5 custom-shadow !rounded-xl sm:hidden border border-cborder  mx-auto w-[97%]   bg-white grid gap-5 grid-cols-3">
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Rank
                  </span>{" "}
                </h1>
                <h4 className=" mt-4">
                  {" "}
                  <span className="px-3 py-3 rounded-md bg-primary text-start text-white font-medium ">
                    #1
                  </span>
                </h4>
              </div>
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Name
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    Jane Cooper
                  </span>
                </h4>
              </div>
              <div className=" ml-auto text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Languages
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    C++
                  </span>
                </h4>
              </div>
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Rank
                  </span>{" "}
                </h1>
                <h4 className=" mt-4">
                  {" "}
                  <span className="px-3 py-3 rounded-md bg-primary text-start text-white font-medium ">
                    #1
                  </span>
                </h4>
              </div>
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Name
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    Jane Cooper
                  </span>
                </h4>
              </div>
              <div className=" ml-auto text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Languages
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    C++
                  </span>
                </h4>
              </div>
            </div>
            <div className=" px-6 pt-5 pb-8 mt-5 custom-shadow !rounded-xl sm:hidden border border-cborder  mx-auto w-[97%]   bg-white grid gap-5 grid-cols-3">
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Rank
                  </span>{" "}
                </h1>
                <h4 className=" mt-4">
                  {" "}
                  <span className="px-3 py-3 rounded-md bg-primary text-start text-white font-medium ">
                    #1
                  </span>
                </h4>
              </div>
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Name
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    Jane Cooper
                  </span>
                </h4>
              </div>
              <div className=" ml-auto text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Languages
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    C++
                  </span>
                </h4>
              </div>
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Rank
                  </span>{" "}
                </h1>
                <h4 className=" mt-4">
                  {" "}
                  <span className="px-3 py-3 rounded-md bg-primary text-start text-white font-medium ">
                    #1
                  </span>
                </h4>
              </div>
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Name
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    Jane Cooper
                  </span>
                </h4>
              </div>
              <div className=" ml-auto text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Languages
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    C++
                  </span>
                </h4>
              </div>
            </div>
            <div className=" px-6 pt-5 pb-8 mt-5 custom-shadow !rounded-xl sm:hidden border border-cborder  mx-auto w-[97%]   bg-white grid gap-5 grid-cols-3">
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Rank
                  </span>{" "}
                </h1>
                <h4 className=" mt-4">
                  {" "}
                  <span className="px-3 py-3 rounded-md bg-primary text-start text-white font-medium ">
                    #1
                  </span>
                </h4>
              </div>
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Name
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    Jane Cooper
                  </span>
                </h4>
              </div>
              <div className=" ml-auto text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Languages
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    C++
                  </span>
                </h4>
              </div>
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Rank
                  </span>{" "}
                </h1>
                <h4 className=" mt-4">
                  {" "}
                  <span className="px-3 py-3 rounded-md bg-primary text-start text-white font-medium ">
                    #1
                  </span>
                </h4>
              </div>
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Name
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    Jane Cooper
                  </span>
                </h4>
              </div>
              <div className=" ml-auto text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Languages
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    C++
                  </span>
                </h4>
              </div>
            </div>
            <div className=" px-6 pt-5 pb-8 mt-5 custom-shadow !rounded-xl sm:hidden border border-cborder  mx-auto w-[97%]   bg-white grid gap-5 grid-cols-3">
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Rank
                  </span>{" "}
                </h1>
                <h4 className=" mt-4">
                  {" "}
                  <span className="px-3 py-3 rounded-md bg-primary text-start text-white font-medium ">
                    #1
                  </span>
                </h4>
              </div>
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Name
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    Jane Cooper
                  </span>
                </h4>
              </div>
              <div className=" ml-auto text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Languages
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    C++
                  </span>
                </h4>
              </div>
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Rank
                  </span>{" "}
                </h1>
                <h4 className=" mt-4">
                  {" "}
                  <span className="px-3 py-3 rounded-md bg-primary text-start text-white font-medium ">
                    #1
                  </span>
                </h4>
              </div>
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Name
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    Jane Cooper
                  </span>
                </h4>
              </div>
              <div className=" ml-auto text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Languages
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    C++
                  </span>
                </h4>
              </div>
            </div>
          </div>
          <div className=" mt-5 overflow-x-scroll w-full max-sm:hidden">
            <h4 className=" text-base  !font-semibold text-start">
              My ranking
            </h4>
            <table className=" border-separate border-spacing-5 w-full !border-0 mt-5">
              <tr className=" text-cblack  bg-white custom-shadow p-2">
                <td className="border-primary rounded-2xl border">
                  <table className="w-full">
                    <tr>
                      <th className="fs16 mt-5 text-start ">
                        <span className="px-3 py-2 rounded-md bg-primary text-start text-white font-medium ml-4">
                          #1
                        </span>
                      </th>
                      <td className=" py-5  text-start fs16 text-cblack text-nowrap ">
                        Jane Cooper
                      </td>
                      <td className=" py-5  text-center fs16">C++</td>
                      <td className=" py-5  text-center fs16">3/10</td>
                      <td className=" py-5  text-center fs16">25 Min</td>
                      <td className=" py-5  text-start fs16">95/100</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
          {/* <ImageBanner /> */}
          <div className=" mx-auto">
            <div className=" rounded-lg relative md:pr-10  h-[170px]  top-16 overflow-hidden bg-primary  mt-16 max-md:flex-col flex    justify-between gap-4 items-center">
              <div className="md:block hidden">
                {" "}
                <img
                  src={img1}
                  className=" max-w-72 h-10/12  w-full  object-cover relative top-4 "
                  alt=""
                />
              </div>
              <div className=" text-2xl  md:text-start mx-auto max-md:mt-5   font-semibold text-white">
                Affordable online course & Learning <br /> Opportunities for
                you!
              </div>
              <div className=" py-3">
                <button className=" mx-auto text-nowrap  text-sm py-3 px-4 font-semibold rounded-full bg-white text-primary items-center flex gap-2 w-[10/12]">
                  <span>Start Learning Today</span>
                  <img src={phone} alt="" className=" my-auto" />
                </button>
              </div>
              <div className="md:hidden block">
                {" "}
                <img
                  src={img1}
                  className=" max-w-72 max-h-64 h-full w-full object-cover md:hidden block relative -top-1 "
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className=" mt-28  md:text-center  mx-auto py-10">
            <h1 className="title  ">
              Best coding platform to improve career <br /> in software
              Engineering
            </h1>
            <p className="  sub-title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore Ut enim <br /> ad minim
              veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt <br /> ut labore Ut enim ad minim
              veniam,{" "}
            </p>
          </div>
        </section>
        <CardCarasol />
        <GalleryCarasol />
        <div className="lg:pt-[80px] pt-[50px]">
          <Testimonial />
        </div>
        <div className=" pt-10 flex gap-5 sm:gap-10 justify-center my-7 mb-[150px]">
          <button className=" text-xs sm:text-sm font-semibold text-white py-2 px-6 bg-primary  border-primary  rounded-full">
            Go To Contest Page
          </button>
          <button className=" text-xs sm:text-sm font-semibold text-primary py-2 px-6 bg-white  border-primary !border hover:bg-bannerbg  rounded-full border-solid">
            Go To Home page
          </button>
        </div>
      </div>
      <img
        src={circle}
        alt=""
        className=" absolute top-[2.5%] -right-8 max-md:hidden
         "
      />
      <img
        src={dottcircle}
        alt=""
        className=" absolute top-[5%] right-0  max-md:hidden"
      />
      <img
        src={circle}
        alt=""
        className=" absolute top-1/2 -left-36 max-md:hidden
         "
      />
      <img
        src={wave}
        alt=""
        className="absolute top-[32%] -left-2 max-md:hidden"
      />
      <img
        src={circle}
        alt=""
        className=" absolute top-[40%] -right-5 max-md:hidden
         "
      />
      <img
        src={dottcircle}
        alt=""
        className=" absolute left-10 bottom-[5%] max-md:hidden"
      />
      <img
        src={circle}
        alt=""
        className=" absolute bottom-[8%] -left-6 max-md:hidden
         "
      />
      <span className="glow_elements_con left-10 bottom-[0%] !opacity-[22%] !w-[180px]"></span>
      <img
        src={circle}
        alt=""
        className=" absolute -right-36 bottom-[15%] max-md:hidden
         "
      />
      <img
        src={wave}
        alt=""
        className=" absolute -left-28 bottom-[15%] max-md:hidden"
      />
      <span className="glow_elements_con -left-28 bottom-[20%] !opacity-[22%] !w-[180px]"></span>
    </div>
  );
};

export default Contest5;
