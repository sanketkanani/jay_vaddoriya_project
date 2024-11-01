import React from 'react';
import circle from '../../assets/svg/circle.svg';
import dottcircle from '../../assets/svg/dotcircle.svg';
import avatar1 from '../../assets/images/blog/blog1.png';
import wave from '../../assets/svg/wave.svg';
const Contest3 = () => {
  return (
    <div className="relative">
      <section className="bg-cnavy h-[700px] max-sm:h-[650px] relative !mt-0  -top-36 md:-z-10 flex justify-center items-center relative z-10">
        <div className=" sub-section py-10 relative z-10">
          <div className=" max-w-mw1328 flex relative top-10 max-sm:top-20 mx-auto lg:gap-20 max-sm:gap-10 sm:gap-5 max-sm:flex-col  justify-between items-start pt-[150px]">
            <div className="text-start flex-1 mx-auto">
              <div className=" 2xl:text-2xl mx-auto font-medium text-primary max-lg:text-sm lg:text-sm">
                MAANG Careers Explore the Limit
              </div>
              <h4 className=" title !text-white mt-2">Coding Contest #100</h4>

              <p className=" 2xl:text-lg font-medium mt-2 text-white max-lg:text-sm lg:text-sm mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo con Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatu
              </p>
              <div className=" mt-8 flex gap-5 items-center">
                <button className="custom-button !bg-primary border-primary !text-white">
                  Register
                </button>
                <button className="custom-button bg-transparent text-primary border-primary border-solid">
                  {' '}
                  Your Submission
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center mx-auto  items-center my-auto  ">
              <div className=" mx-auto p-4 custom-shadow border border-primary text-start text-white ">
                <h1 className="fs24">Contest starts In</h1>
                <div className=" flex mt-5 gap-2 max-w-[420px] w-full">
                  <div className="bg-primary rounded-md text-center p-4 flex-1">
                    <h4 className="fs36">3 </h4>
                    <h3 className="fs16">Days</h3>
                  </div>
                  <div className="bg-primary rounded-md text-center p-4 flex-1">
                    <h4 className="fs36">5 </h4>
                    <h3 className="fs16">Hours</h3>
                  </div>
                  <div className="bg-primary rounded-md text-center p-4 flex-1">
                    <h4 className="fs36">20</h4>
                    <h3 className="fs16">Min</h3>
                  </div>
                  <div className="bg-primary rounded-md text-center p-4 flex-1">
                    <h4 className="fs36">54</h4>
                    <h3 className="fs16">Sec</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <img src={circle} alt="" className=" absolute -left-10 max-md:hidden" /> */}
        <img
          src={circle}
          alt=""
          className=" absolute top-[32%] -right-12 max-md:hidden"
        />
        <img
          src={circle}
          alt=""
          className=" absolute -left-10 max-md:hidden
         "
        />
        <img
          src={dottcircle}
          alt=""
          className=" absolute right-10 top-[40%] max-md:hidden"
        />
        <span className='glow_elements_con right-0 top-[30%] !opacity-[20%] max-md:hidden !w-[180px]'></span>
      </section>
      <div className=" relative -top-14">
        <section className=" sub-section">
          <h1 className="title">Submission</h1>
          
          <div className=" mt-10 hidden sm:block">
            <table className=" mt-5 w-full ml-5 overflow-x-scroll">
              <tr className=" fs16 text-secondary  ">
                <th className=" text-start">Rank</th>
                <th className=" text-start">Name</th>
                <th className=" text-start">Languages</th>
                <th className=" text-start">Question solved</th>
                <th className=" text-start">Completed Time</th>
                <th className=" text-start">Point</th>
              </tr>

              <tr className=" text-cblack bg-white custom-shadow relative top-5 !border-0">
                <td className=" py-3  text-start fs16">#96</td>
                <td className=" py-3  text-start fs16">Jane Cooper</td>
                <td className=" py-3  text-start fs16 text-cblack">C++</td>
                <td className=" py-3  text-start fs16">3/10</td>
                <td className=" py-3  text-start fs16">25 Min</td>
                <td className=" py-3  text-start fs16">95/100</td>
              </tr>
            </table>
          </div>
          <div className=" px-6 pt-5 pb-8 mt-5 custom-shadow  !rounded-xl sm:hidden border border-cborder  mx-auto w-[100%]   bg-white grid gap-5 grid-cols-3">
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                    Rank
                  </span>{" "}
                </h1>
                <h4 className="mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                    #96
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
              <div className="  text-start">
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
                  Question solved
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className="rounded-md text-lg  text-start text-black font-semibold">
                  3/10
                  </span>
                </h4>
              </div>
              <div className=" text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                  Completed time
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                  25 Min
                  </span>
                </h4>
              </div>
              <div className="  text-start">
                <h1 className="">
                  {" "}
                  <span className="text-lg  bg-white text-secondary font-semibold ">
                  Point
                  </span>{" "}
                </h1>
                <h4 className=" mt-1">
                  {" "}
                  <span className=" rounded-md text-lg  text-start text-black font-semibold ">
                  95/100
                  </span>
                </h4>
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
                    {' '}
                    <h4 className="fs24 text-white">Ajay Gunty</h4>
                    <h5 className="fs16 text-white">Language: C++</h5>
                  </div>
                </div>
                <div className=" flex justify-between mt-8">
                  {' '}
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
                    {' '}
                    <h4 className="fs24 text-white">Ajay Gunty</h4>
                    <h5 className="fs16 text-white">Language: C++</h5>
                  </div>
                </div>
                <div className=" flex justify-between mt-8">
                  {' '}
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
                    {' '}
                    <h4 className="fs24 text-white">Ajay Gunty</h4>
                    <h5 className="fs16 text-white">Language: C++</h5>
                  </div>
                </div>
                <div className=" flex justify-between mt-8">
                  {' '}
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
            <div className=" mt-10">
              {' '}
              <button className=" custom-button text-white bg-primary mx-auto">
                Return to Home
              </button>
            </div>
          </div>
          <div className=" mt-20 md:hidden block ">
            <h4 className="title text-start">Contest winners</h4>
            <div className=" flex-1 p-2 text-start md:hidden block  w-full">
              <div className=" bg-cmustard md:p-4 p-6 rounded-md w-full flex mt-5 gap-3 text-white justify-between items-center">
                <div className="flex gap-2 justify-start items-center">
                  <img
                    src={avatar1}
                    alt=""
                    className=" h-14 w-14 object-cover  rounded-full border-2 border-white"
                  />
                  <div>
                    {' '}
                    <h4 className="text-xl font-medium text-white">
                      Ajay Gunty
                    </h4>
                    <h5 className="text-lg text-white">Language: C++</h5>
                  </div>
                </div>
                <div className=" flex gap-2 items-center">
                  <h1 className=" text-2xl font-medium text-white !leading-none">
                    #1 <br />
                    <span className="text-lg text-white">Rank</span>
                  </h1>
                </div>
                <div className=" text-end">
                  <h4 className="fs24">95/100</h4>
                  <h6 className="fs16">Points</h6>
                </div>
              </div>
              <div className=" bg-cpink md:p-4 p-6 rounded-md w-full flex mt-5 gap-3 text-white justify-between items-center">
                <div className="flex gap-2 justify-start items-center">
                  <img
                    src={avatar1}
                    alt=""
                    className=" h-14 w-14 object-cover  rounded-full border-2 border-white"
                  />
                  <div>
                    {' '}
                    <h4 className="text-xl font-medium text-white">
                      Ajay Gunty
                    </h4>
                    <h5 className="text-lg text-white">Language: C++</h5>
                  </div>
                </div>
                <div className=" flex gap-2 items-center">
                  <h1 className=" text-2xl font-medium text-white !leading-none">
                    #1 <br />
                    <span className="text-lg text-white">Rank</span>
                  </h1>
                </div>
                <div className=" text-end">
                  <h4 className="fs24">95/100</h4>
                  <h6 className="fs16">Points</h6>
                </div>
              </div>
              <div className=" bg-cpurple md:p-4 p-6 rounded-md w-full flex mt-5 gap-3 text-white justify-between items-center">
                <div className="flex gap-2 justify-start items-center">
                  <img
                    src={avatar1}
                    alt=""
                    className=" h-14 w-14 object-cover  rounded-full border-2 border-white"
                  />
                  <div>
                    {' '}
                    <h4 className="text-xl font-medium text-white">
                      Ajay Gunty
                    </h4>
                    <h5 className="text-lg text-white">Language: C++</h5>
                  </div>
                </div>
                <div className=" flex gap-2 items-center">
                  <h1 className=" text-2xl font-medium text-white !leading-none">
                    #1 <br />
                    <span className="text-lg text-white">Rank</span>
                  </h1>
                </div>
                <div className=" text-end">
                  <h4 className="fs24">95/100</h4>
                  <h6 className="fs16">Points</h6>
                </div>
              </div>
            </div>
            <div className=" p-2 hidden  text-start lg:px-10 md:flex justify-center max-md:flex-col items-center gap-5">
              <div className=" bg-cmustard md:max-w-96 mx-auto md:p-4 p-2 rounded-md w-full  mt-5  text-white  ">
                <div className="flex gap-5 justify-start items-center">
                  <img
                    src={avatar1}
                    alt=""
                    className=" h-14 w-14 object-cover  rounded-full "
                  />
                  <div>
                    {' '}
                    <h4 className="text-2xl font-medium text-white">
                      Ajay Gunty
                    </h4>
                    <h5 className="text-lg text-white">Language: C++</h5>
                  </div>
                </div>
                <div className=" flex justify-between mt-5">
                  {' '}
                  <div className=" flex gap-2 items-center">
                    <h1 className=" text-2xl font-medium text-white !leading-none">
                      #1 <br />
                      <span className="text-lg text-white">Rank</span>
                    </h1>
                  </div>
                  <div className=" text-end">
                    <h4 className="text-2xl font-medium">95/100</h4>
                    <h6 className="text-lg">Points</h6>
                  </div>
                </div>
              </div>
              <div className=" bg-cpink md:max-w-96 mx-auto md:p-4 p-2 rounded-md w-full  mt-5  text-white  ">
                <div className="flex gap-5 justify-start items-center">
                  <img
                    src={avatar1}
                    alt=""
                    className=" h-14 w-14 object-cover  rounded-full "
                  />
                  <div>
                    {' '}
                    <h4 className="text-2xl font-medium text-white">
                      Ajay Gunty
                    </h4>
                    <h5 className="text-lg text-white">Language: C++</h5>
                  </div>
                </div>
                <div className=" flex justify-between mt-5">
                  {' '}
                  <div className=" flex gap-2 items-center">
                    <h1 className=" text-2xl font-medium text-white !leading-none">
                      #1 <br />
                      <span className="text-lg text-white">Rank</span>
                    </h1>
                  </div>
                  <div className=" text-end">
                    <h4 className="text-2xl font-medium">95/100</h4>
                    <h6 className="text-lg">Points</h6>
                  </div>
                </div>
              </div>
              <div className=" bg-cpurple md:max-w-96 mx-auto md:p-4 p-2 rounded-md w-full  mt-5  text-white  ">
                <div className="flex gap-5 justify-start items-center">
                  <img
                    src={avatar1}
                    alt=""
                    className=" h-14 w-14 object-cover  rounded-full "
                  />
                  <div>
                    {' '}
                    <h4 className="text-2xl font-medium text-white">
                      Ajay Gunty
                    </h4>
                    <h5 className="text-lg text-white">Language: C++</h5>
                  </div>
                </div>
                <div className=" flex justify-between mt-5">
                  {' '}
                  <div className=" flex gap-2 items-center">
                    <h1 className=" text-2xl font-medium text-white !leading-none">
                      #1 <br />
                      <span className="text-lg text-white">Rank</span>
                    </h1>
                  </div>
                  <div className=" text-end">
                    <h4 className="text-2xl font-medium">95/100</h4>
                    <h6 className="text-lg">Points</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className=" mt-10">
              {' '}
              <button className=" custom-button text-white bg-primary mx-auto">
                Return to Home
              </button>
            </div>
          </div>
        </section>
        <img
          src={circle}
          alt=""
          className=" absolute bottom-1/2 -right-10 max-md:hidden"
        />
        <img
          src={wave}
          alt=""
          className=" absolute bottom-1/4  -left-10 max-md:hidden"
        />
        <img
          src={wave}
          alt=""
          className=" absolute bottom-1/4  -left-10 max-md:hidden"
        />
      </div>
    </div>
  );
};

export default Contest3;
