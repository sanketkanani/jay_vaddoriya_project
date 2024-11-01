import React from 'react';
import star from '../../assets/svg/startgray.svg';
import like from '../../assets/svg/likegray.svg';
import flag from '../../assets/svg/flag.svg';
import share from '../../assets/svg/sharegray.svg';
import img1 from '../../assets/images/contactsleft.png';
import img2 from '../../assets/images/contractsright.png';
import compile from '../../assets/svg/compiled.svg';
import file from '../../assets/svg/file.svg';
import downchevron from '../../assets/images/downchevron.svg';
import rightarrow from '../../assets/svg/Rightsidearrow/rightarrowgreen.svg';
import clock from '../../assets/svg/textarea/clockblue.svg';
import maxmin from '../../assets/svg/textarea/maximize-2.svg';
import save from '../../assets/svg/textarea/save.svg';
import command from '../../assets/svg/textarea/command.svg';
import leftturn from '../../assets/svg/textarea/corner-up-left.svg';
import setting from '../../assets/svg/textarea/settings.svg';
import group from '../../assets/svg/textarea/Group.svg';
import logo from '../../assets/images/Logo_White 1.svg';

const Contest4 = () => {
  return (
    <>
      <div className=" mt-20">
        <section className="2xl:max-w-[1950px] !pt-0   grid grid-cols-12 px-2 md:px-10 !grid-flow-row-reverse  gap-4 md:w-[100%] mx-auto">
          <div className="bg-white custom-shadow  col-span-9 pb-10 p-4 max-lg:col-span-12 ">
            <div className=" grid grid-cols-12 gap-3">
              <div className=" col-span-4 max-lg:col-span-12 text-start p-2">
                <img src={logo} alt="" className=" h-5" />
                <div className=" flex  justify-between items-center lg:hidden">
                  <div className="max-md:text-lg text-[12px] max-sm:text-lg p-2 bg-white rounded-full  text-primary flex gap-2 items-center">
                    <img src={clock} alt="" /> <span>59 Min: 45 Sec</span>
                  </div>
                  <h3 className="max-md:text-lg text-xs text-black ">
                    Total student count: 100
                  </h3>
                </div>
                <div className='lg:hidden'>
              <h1 className="fs24 text-cblack">Number Of Question</h1>
              <ul className=" grid grid-cols-6 gap-2 bg-white custom-shadow p-2  fs18 mt-5">
                <li className=" p-2 rounded-md bg-primary text-center text-white font-medium">
                  1
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  2
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  3
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  4
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  5
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  6
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  7
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  8
                </li>
                <li className="   hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  9
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  10
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  11
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  12
                </li>
              </ul>
              </div>

                <div className=" mt-5 font-medium flex  justify-start items-center gap-3 ">
                  <button className="text-xs text-white bg-primary py-1 px-3 rounded-full">
                    Problem
                  </button>
                  <button className="text-xs text-secondary py-1 px-3 rounded-full">
                    Hint
                  </button>
                  <button className="text-xs text-secondary py-1 px-3 rounded-full">
                    Submission
                  </button>
                </div>
                <div className=" mt-5  font-medium flex justify-between items-center">
                  <div className=" max-md:text-lg text-[10px] text-cblack text-nowrap ">
                    2.String to Integer (atoi)
                  </div>
                  <div className=" max-md:text-lg text-[10px] font-normal text-secondary text-nowrap">
                    Problem 2/4
                  </div>
                </div>
                <div className=" mt-5 flex gap-3 items-center">
                  <img src={share} alt="" />
                  <img src={like} alt="" />
                  <img src={flag} alt="" />
                  <img src={star} alt="" />
                </div>
                <div className=" mt-5 font-medium flex   justify-start items-center gap-1 overflow-x-scroll ">
                  <button className="max-md:text-lg bg-clightbg text-[10px] text-secondary p-1 rounded-full">
                    Facebook
                  </button>

                  <button className="max-md:text-lg text-[10px] bg-clightbg text-secondary p-1 rounded-full">
                    Google
                  </button>
                  <button className="max-md:text-lg text-[10px] bg-clightbg text-secondary p-1 rounded-full">
                    Amazon
                  </button>
                  <button className="max-md:text-lg text-[10px] bg-clightbg text-secondary p-1 rounded-full">
                    Linkedin
                  </button>
                  <button className="max-md:text-lg text-[10px]  text-white bg-primary    px-2 rounded-full">
                    +4
                  </button>
                </div>
                <div className=" mt-5 ">
                  <h5 className="text-sm max-md:text-lg text-primary  underline font-medium">
                    Show More
                  </h5>
                  <p className="text-xs font-normal text-secondary">
                    Lorem ipsum dolor sit amet consectetur. Non lorem curabitur
                    sit augue eu lacus donec. Faucibus arcu viverra eu sit
                  </p>
                </div>
                <div className=" mt-5 ">
                  <h5 className="text-sm max-md:text-lg text-cblack   font-medium">
                    Constraints
                  </h5>
                  <p className="text-xs font-normal text-secondary mt-2">
                    0 {' < '} n {' < '} 2 0 0 ,0 0 0{' '}
                    <span className=" ">n</span>
                    <span className=" ">is the length of</span>
                    <span className=" ">a</span>
                  </p>
                </div>
                <div className=" mt-5 ">
                  <h5 className="text-base text-cblack   font-medium">
                    Constraints
                  </h5>
                  <div className=" mt-3 flex justify-start items-start pr-5">
                    <img src={img1} alt="" className=" w-10/12  !object-cover" />
                    <img src={img2} alt="" className=" w-10/12 !object-cover" />
                  </div>
                  <div className=" mt-3 pl-2 ">
                    <h5 className="text-base text-cblack   font-medium">
                      Example 1
                    </h5>
                    <p className="text-xs mt-3 text-secondary font-medium ">
                      Input: s = "42" <br /> Output: 42 <br /> Explanation: The
                      underlined characters are what is read in, the caret is
                      the current reader position.Step 1: "42" (no characters
                      read because there is no leading whitespace)
                    </p>
                  </div>
                </div>
              </div>
              <div className=" col-span-8 p-4 !pt-0 px-5 max-lg:col-span-12">
                <div className=" flex justify-between items-center gap-1 flex-wrap">
                  {' '}
                  <h4 className=" border-b  border-secondary max-md:text-lg text-[10px] font-medium text-secondary flex justify-between gap-2">
                    <span>Console</span>
                    <img src={downchevron} alt="" />
                  </h4>
                  <h5 className=" max-md:text-lg text-[10px] font-medium text-secondary">
                    . Auto
                  </h5>
                  <div className="max-md:text-lg text-[10px] p-2 bg-white rounded-full max-lg:hidden text-primary flex gap-2 items-center">
                    <img src={clock} alt="" /> <span>59 Min: 45 Sec</span>
                  </div>
                  <h3 className="max-md:text-lg text-[10px] max-md:hidden">
                    Total student count: 100
                  </h3>
                  <div className=" flex items-center gap-2 max-sm:flex-wrap">
                    <img src={save} alt="" />
                    <img src={leftturn} alt="" />
                    <img src={command} alt="" />
                    <img src={group} alt="" />
                    <img src={setting} alt="" />
                    <img src={maxmin} alt="" />
                  </div>
                </div>

                <textarea
                  rows="15"
                  className=" mt-5 w-full text-cblack outline-none border border-secondary  p-2"
                ></textarea>

                <div className=" mt-5 font-medium flex   justify-between items-center w-full  ">
                  <div className="  flex  gap-3 items-center justify-start">
                    {' '}
                    <button className="text-sm max-md:text-lg  text-primary py-1 pr-3 underline">
                      Testcase
                    </button>
                    <button className="text-sm max-md:text-lg text-secondary py-1 px-3 rounded-full">
                      Result
                    </button>
                  </div>
                  <div className=" text-sm max-md:text-lg  font-medium text-secondary flex gap-2 items-center">
                    <img src={compile} alt="" />
                    <span>Source</span>
                    <img src={file} alt="" />
                  </div>
                </div>
                <div className=" mt-5 font-medium flex   justify-start items-center gap-3 ">
                  <button className="text-xs  text-white bg-primary rounded-full py-1 px-3 ">
                    Case 1
                  </button>
                  <button className="text-xs bg-clightbg text-secondary py-1 px-3 rounded-full">
                    Case 2
                  </button>
                  <button className="text-xs bg-clightbg text-secondary py-1 px-3 rounded-full">
                    Case 3
                  </button>
                  <button className="text-xs bg-cbglightgreen text-primary h-5 w-5 rounded-full">
                    +
                  </button>
                </div>
                <div className=" mt-5 text-start ml-1">
                  <h1 className=" text-xs font-medium text-secondary">$ =</h1>
                  <h1 className=" mt-2 max-md:text-lg text-[10px] rounded-full font-medium bg-cbglightgreen p-2 text-secondary ml-1">
                    “420”
                  </h1>
                </div>
                <div className=" mt-5  flex items-center justify-between">
                  <h4 className=" text-sm max-md:text-lg font-medium text-secondary flex justify-startgap-2">
                    <span>Console</span>
                    <img src={downchevron} alt="" />
                  </h4>
                  <div className="  font-medium flex   justify-start items-center gap-3 ">
                    <button className="text-sm max-md:text-lg text-secondary bg-cbglightgreen py-1 px-3 rounded-full">
                      Run{' '}
                    </button>
                    <button className="text-xs  text-white bg-primary rounded-full py-1 px-3 ">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-between mt-5">
              <button className=" custom-button text-white bg-secondary ">
                Exit Test
              </button>
              <button className=" custom-button  bg-white text-primary border-primary flex gap-2 items-center  ">
                <a href="/nextquestion" className="">
                  Next Question
                </a>
                <img src={rightarrow} alt="" />
              </button>
              <button className=" custom-button text-white bg-primary ">
                Finish Test
              </button>
            </div>
          </div>

          <div className=" p-4 custom-shadow col-span-3 max-lg:col-span-12 text-start">
            <div>
              <div className='max-lg:hidden'>
              <h1 className="fs24 text-cblack">Number Of Question</h1>
              <ul className=" grid grid-cols-6 gap-2 bg-white custom-shadow p-2  fs18 mt-5">
                <li className=" p-2 rounded-md bg-primary text-center text-white font-medium">
                  1
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  2
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  3
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  4
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  5
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  6
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  7
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  8
                </li>
                <li className="   hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  9
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  10
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  11
                </li>
                <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
                  12
                </li>
              </ul>
              </div>
              <div className="  mt-10 overflow-x-scroll p-2">
                <h1 className="fs24 text-cblack">All Rankings</h1>
                <table className=" mt-5 w-full overflow-x-scroll border-separate border-spacing-5">
                  <tr className=" fs16 text-secondary  ">
                    <th className=" text-start">Rank </th>
                    <th className=" text-start">Name</th>
                    <th className=" text-start">Languages</th>
                    <th className=" text-center">Point</th>
                  </tr>

                  <tr className=" text-cblack bg-white py-1 px-3 custom-shadow   ">
                    <td className="fs16 mt-5 ">
                      <span className="px-3 py-2 rounded-md bg-primary text-center text-white font-medium">
                        #1
                      </span>
                    </td>
                    <td className=" py-3  text-start fs16 text-cblack text-nowrap ">
                      Jane Cooper
                    </td>
                    <td className=" py-3  text-center fs16">C++</td>
                    <td className=" py-3  text-center fs16">50/100</td>
                  </tr>
                  <tr className=" text-cblack bg-white py-1 px-3 custom-shadow  ">
                    <td className="fs16 mt-5 ">
                      <span className="px-3 py-2 rounded-md bg-primary text-center text-white font-medium">
                        #1
                      </span>
                    </td>
                    <td className=" py-3  text-start fs16 text-cblack text-nowrap ">
                      Jane Cooper
                    </td>
                    <td className=" py-3  text-center fs16">C++</td>
                    <td className=" py-3  text-center fs16">50/100</td>
                  </tr>
                  <tr className=" text-cblack bg-white py-1 px-3 custom-shadow  ">
                    <td className="fs16 mt-5 ">
                      <span className="px-3 py-2 rounded-md bg-primary text-center text-white font-medium">
                        #1
                      </span>
                    </td>
                    <td className=" py-3  text-start fs16 text-cblack text-nowrap ">
                      Jane Cooper
                    </td>
                    <td className=" py-3  text-center fs16">C++</td>
                    <td className=" py-3  text-center fs16">50/100</td>
                  </tr>
                </table>
              </div>
              <div className=" mt-5 overflow-x-scroll">
                <h4 className=" text-base  !font-semibold">My ranking</h4>
                <table className=" border-separate w-full border-spacing-4 border border-primary mt-5 rounded-md ">
                  <tr className=" text-cblack  ">
                    <th className="fs16 mt-5 ">
                      <span className="px-3 py-2 rounded-md bg-primary text-center text-white font-medium">
                        #1
                      </span>
                    </th>
                    <th className=" py-3  text-start fs16 text-cblack text-nowrap ">
                      Jane Cooper
                    </th>
                    <th className=" py-3  text-center fs16">C++</th>
                    <th className=" py-3  text-center fs16">50/100</th>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contest4;
