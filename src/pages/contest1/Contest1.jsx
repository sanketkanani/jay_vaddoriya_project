import React from 'react';
import contest from '../../assets/images/contest1.png';
import avatar1 from '../../assets/images/blog/blog1.png';
import trophy from '../../assets/svg/prize.svg';
import circle from "../../assets/svg/circle.svg"
import dottcircle from "../../assets/svg/dotcircle.svg"


const Contest1 = () => {
  return (
    <div className=" relative margin_for_header" style={{background: 'linear-gradient(rgb(45 124 196 / 8%) 0%, rgba(45, 151, 196, 0) 100%)'}}>
      <div className=" sub-section flex flex-col justify-center  mx-auto jobdetailbanner h-[197px] mt-8 text-start">
        <div className="ml-10  text-white ">
          <h4 className=" text-3xl font-semibold   ">Contests </h4>
          <h6 className=" font-normal my-2 text-lg">
            Unlock your coding potential to win{' '}
          </h6>{' '}
        </div>
      </div>
      <section className=" sub-section mt-0 pt-5 !px-0 max-md:!px-2">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5 lg:p-8 p-4 custom-shadow text-start border !border-primary !rounded-3xl">
            <h1 className="fs36">On going contests</h1>
            <h3 className="fs20 text-secondary">Coding contest #100"</h3>
            <div className="mt-2 text-center">
              {' '}
              <img src={contest} alt="" className="mx-auto max-h-[240px]" />
              <h4 className="fs24 mt-1">Contest will starting </h4>
              <h6 className="fs18 text-secondary mt-1">20 H : 12 M: 32 S</h6>
              <button className="mt-3 custom-button bg-primary text-white mx-auto lg:px-[50px]">
                Register
              </button>
            </div>
          </div>
          <div className="md:col-span-7 mt-4">
            <div className="text-left">
              <h1 className=" fs36">Previous Contest winner</h1>
              <h2 className=" fs20 text-secondary">Coding contest #100"</h2>
            </div>
            <div className=" bg-cmustard md:p-4 p-2 rounded-xl w-full flex mt-5 gap-3 text-white justify-between items-center min-h-[100px]">
              <div className="flex gap-2 justify-start items-center">
                <img
                  src={avatar1}
                  alt=""
                  className=" h-[80px] w-[80px] object-cover  rounded-full border-4 border-white"
                />
                <div>
                  {' '}
                  <h4 className="fs24 text-white">Ajay Gunty</h4>
                  <h5 className="fs16 text-white">Language: C++</h5>
                </div>
              </div>
              <div className=" flex gap-2 items-center">
                <img src={trophy} alt="" className="h-[35px] w-[35px]" />
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
            <div className=" bg-cpink md:p-4 p-2 rounded-xl w-full flex mt-5 gap-3 text-white justify-between items-center min-h-[100px]">
              <div className="flex gap-2 justify-start items-center">
                <img
                  src={avatar1}
                  alt=""
                  className="h-[80px] w-[80px] object-cover  rounded-full border-4 border-white"
                />
                <div>
                  {' '}
                  <h4 className="fs24 text-white">Ajay Gunty</h4>
                  <h5 className="fs16 text-white">Language: C++</h5>
                </div>
              </div>
              <div className=" flex gap-2 items-center">
                <img src={trophy} alt="" className="h-[35px] w-[35px]" />
                <h1 className=" fs24 text-white !leading-none ">
                  #2 <br />
                  <span className="fs16 text-white">Rank</span>
                </h1>
              </div>
              <div className=" text-end">
                <h4 className="fs24">95/100</h4>
                <h6 className="fs16">Points</h6>
              </div>
            </div>
            <div className=" bg-cpurple md:p-4 p-2 rounded-xl w-full flex mt-5 gap-3 text-white justify-between items-center min-h-[100px]">
              <div className="flex gap-2 justify-start items-center">
                <img
                  src={avatar1}
                  alt=""
                  className="h-[80px] w-[80px] object-cover  rounded-full border-4 border-white"
                />
                <div>
                  {' '}
                  <h4 className="fs24 text-white">Ajay Gunty</h4>
                  <h5 className="fs16 text-white">Language: C++</h5>
                </div>
              </div>
              <div className=" flex gap-2 items-center">
                <img src={trophy} alt="" className="h-[35px] w-[35px]" />
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
        <div className=" mt-5">
          <h4 className="fs24 text-start ">Upcoming Contest </h4>

          <div className=" max-md:overflow-x-scroll w-full ">
            {' '}
            <table className="mt-3 w-full ml-5 max-sm:hidden mb-4">
              <thead>
                <tr className="fs16 text-secondary">
                  <th className="text-start">Contest Name</th>
                  <th className="text-start">Topic</th>
                  <th className="text-start">Date</th>
                  <th className="text-start">Time</th>
                  <th className="text-start">Action</th>
                </tr>
              </thead>
            </table>
            <table className="w-full">
              <tr className="text-cblack bg-white custom-shadow relative rounded-2xl mt-4 z-10">
                <td className="py-3 text-start fs16 pl-6">
                  <span>Coding Contest #101</span>
                  <h1 className="text-secondary">MAANG Careers</h1>
                </td>
                <td className="py-3 text-end fs16">Date Study</td>
                <td className="py-3 text-end fs16 text-cblack">13 Jan, 2024</td>
                <td className="py-3 text-end fs16">7:00 PM</td>
                <td className="py-3 text-center fs16">
                  <button className="custom-button bg-primary rounded-full text-white !inline-block">
                    View details
                  </button>
                </td>
              </tr>
            </table>
            <table className='w-full mt-4 bg-white custom-shadow relative rounded-2xl z-10'>
              <tr className="text-cblack">
                <td className='w-full'>
                  <table className='w-full'>
                    <tr>
                      <td className="py-3 text-start fs16 pl-6">
                        <span>Coding Contest #101</span>
                        <h1 className="text-secondary">MAANG Careers</h1>
                      </td>
                      <td className="py-3 text-end fs16">Date Study</td>
                      <td className="py-3 text-end fs16 text-cblack">13 Jan, 2024</td>
                      <td className="py-3 text-end fs16">7:00 PM</td>
                      <td className="py-3 text-center fs16">
                        <button className="custom-button bg-primary rounded-full text-white !inline-block">
                          View details
                        </button>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <div className="sm:hidden w-[95%] mx-auto mt-5">
              <div className="  mx-auto my-5 p-3 custom-shadow bg-white">
                <div className="fs16  text-start  flex justify-between items-start  w-full">
                  <div className=" text-start !font-bold   ">
                    <h3 className="text-secondary">Contest Name</h3>
                    <h6 className=" text-black mt-2">
                      Coding Contest #101 <br />{' '}
                      <span className=" text-secondary font-normal">
                        MAANG Careers
                      </span>
                    </h6>
                  </div>
                  <div className=" text-start !font-bold   ">
                    <h3 className="text-secondary">Topic</h3>
                    <h6 className=" text-black mt-2">Date Study</h6>
                  </div>
                  <div className=" text-start !font-bold   ">
                    <h3 className="text-secondary">Date</h3>
                    <h6 className=" text-black mt-2">13 Jan, 2024</h6>
                  </div>
                </div>
                <div className=" mt-5  flex justify-between items-start ">
                  <div className=" text-start !font-bold">
                    <h3 className="text-secondary">Time</h3>
                    <h6 className=" text-black mt-2">7 :00Pm</h6>
                  </div>
                  <div className="text-start !font-bold">
                    <button className="  custom-button bg-primary rounded-full text-white">
                      View details
                    </button>
                  </div>
                </div>
              </div>
              <div className="  mx-auto my-5 p-3 custom-shadow bg-white">
                <div className="fs16  text-start  flex justify-between items-start  w-full">
                  <div className=" text-start !font-bold   ">
                    <h3 className="text-secondary">Contest Name</h3>
                    <h6 className=" text-black mt-2">
                      Coding Contest #101 <br />{' '}
                      <span className=" text-secondary font-normal">
                        MAANG Careers
                      </span>
                    </h6>
                  </div>
                  <div className=" text-start !font-bold   ">
                    <h3 className="text-secondary">Topic</h3>
                    <h6 className=" text-black mt-2">Date Study</h6>
                  </div>
                  <div className=" text-start !font-bold   ">
                    <h3 className="text-secondary">Date</h3>
                    <h6 className=" text-black mt-2">13 Jan, 2024</h6>
                  </div>
                </div>
                <div className=" mt-5  flex justify-between items-start ">
                  <div className=" text-start fs16 !font-bold">
                    <h3 className="text-secondary">Time</h3>
                    <h6 className=" text-black mt-2">7 :00Pm</h6>
                  </div>
                  <div className="text-start !font-bold">
                    <button className="  custom-button bg-primary rounded-full text-white">
                      View details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-5">
          <div className=" flex justify-between">
            {' '}
            <h4 className="fs24 text-start ">Previous Contest </h4>
            <button className=" custom-button bg-white text-primary border-primary">
              See All
            </button>
          </div>

          <div className=" max-md:overflow-x-scroll ">
            <table className=" w-full ml-5 overflow-x-scroll  max-sm:hidden">
              <tr className=" fs16 text-secondary  mb-4">
                <th className=" text-start w-[24%]">Contest Name</th>
                <th className=" text-start w-[15%]">Topic</th>
                <th className=" text-start w-[16%]">Date</th>
                <th className=" text-start w-[12%]">Time</th>
                <th className=" text-start w-[14%]">point</th>
                <th className=" text-start">rank</th>
              </tr>
            </table>
            <table className='w-full mt-4 bg-white custom-shadow relative !rounded-2xl z-10 !border-0'>
              <tr className="text-cblack">
                <td className='w-full'>
                  <table className='w-full'>
                    <tr>
                      <td className="py-3 text-start fs16 pl-6 w-[25%]">
                        <span>Coding Contest #101</span>
                        <h1 className="text-secondary">MAANG Careers</h1>
                      </td>
                      <td className="py-3 text-left fs16">Date Study</td>
                      <td className="py-3 text-left fs16 text-cblack w-[8%]">13 Jan, 2024</td>
                      <td className="py-3 text-end fs16">7:00 PM</td>
                      <td className="py-3 text-end fs16">7:00 PM</td>
                      <td className="py-3 text-center fs16">
                        <button className="custom-button bg-primary rounded-full text-white !inline-block">
                          View details
                        </button>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <div className="sm:hidden w-[95%] mx-auto mt-5 max-h-[150px]">
              <div className="  mx-auto my-5 p-3 custom-shadow bg-white">
                <div className="fs16  text-start  flex justify-between items-start  w-full">
                  <div className=" text-start !font-bold   ">
                    <h3 className="text-secondary">Contest Name</h3>
                    <h6 className=" text-black mt-2">
                      Coding Contest #101 <br />{' '}
                      <span className=" text-secondary font-normal">
                        MAANG Careers
                      </span>
                    </h6>
                  </div>
                  <div className=" text-start !font-bold   ">
                    <h3 className="text-secondary">Topic</h3>
                    <h6 className=" text-black mt-2">Date Study</h6>
                  </div>
                  <div className=" text-start !font-bold   ">
                    <h3 className="text-secondary">Date</h3>
                    <h6 className=" text-black mt-2">13 Jan, 2024</h6>
                  </div>
                </div>
                <div className=" mt-5  flex justify-between items-start ">
                  <div className=" text-start !font-bold">
                    <h3 className="text-secondary">Time</h3>
                    <h6 className=" text-black mt-2">7 :00Pm</h6>
                  </div>
                  <div className="text-start !font-bold">
                    <button className="  custom-button bg-primary rounded-full text-white">
                      View details
                    </button>
                  </div>
                </div>
              </div>
              <div className="  mx-auto my-5 p-3 custom-shadow bg-white">
                <div className="fs16  text-start  flex justify-between items-start  w-full">
                  <div className=" text-start !font-bold   ">
                    <h3 className="text-secondary">Contest Name</h3>
                    <h6 className=" text-black mt-2">
                      Coding Contest #101 <br />{' '}
                      <span className=" text-secondary font-normal">
                        MAANG Careers
                      </span>
                    </h6>
                  </div>
                  <div className=" text-start !font-bold   ">
                    <h3 className="text-secondary">Topic</h3>
                    <h6 className=" text-black mt-2">Date Study</h6>
                  </div>
                  <div className=" text-start !font-bold   ">
                    <h3 className="text-secondary">Date</h3>
                    <h6 className=" text-black mt-2">13 Jan, 2024</h6>
                  </div>
                </div>
                <div className=" mt-5  flex justify-between items-start ">
                  <div className=" text-start fs16 !font-bold">
                    <h3 className="text-secondary">Time</h3>
                    <h6 className=" text-black mt-2">7 :00Pm</h6>
                  </div>
                  <div className="text-start !font-bold">
                    <button className="  custom-button bg-primary rounded-full text-white">
                      View details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <img src={circle} alt="" className=' absolute top-[14%] -left-10 max-md:hidden' />
      <img src={circle} alt="" className=' absolute top-[6%] -right-10 max-md:hidden' />
      <img src={dottcircle} alt="" className=' absolute top-[10%] right-10 max-md:hidden' />
      <img src={circle} alt="" className=' absolute bottom-20 -left-10 max-md:hidden' />
      <img src={dottcircle} alt="" className=' absolute bottom-[22%] left-10 max-md:hidden' />
      <img src={circle} alt="" className=' absolute bottom-[34%] -right-10 max-md:hidden' />



    </div>
  );
};

export default Contest1;
