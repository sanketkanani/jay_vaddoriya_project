import React from 'react';
import rightarrow from '../../assets/svg/Rightsidearrow/rightarrowgreen.svg';
import clock from '../../assets/svg/textarea/clockblue.svg';
import logo from '../../assets/images/Logo_White 1.svg';
const NextQuestion = () => {
  return (
    <div className="">
      <section className="2xl:max-w-[1950px] md:w-[90%] mx-auto grid grid-cols-12 divide-y-reverse gap-3 px-5">
        <div className=" col-span-9 max-md:col-span-12 p-2 bg-white custom-shadow">
          <div className=" ">
            {' '}
            <div className=" flex justify-between items-center md:gap-10 max-sm:flex-wrap ">
              <img src={logo} alt="" className=" h-5" />
              <div className=" fs16 ml-auto text-primary bg-white custom-shadow p-2 flex gap-2 items-center">
                <img src={clock} alt="" />{' '}
                <span className=" text-nowrap">59 Min: 45 Sec</span>
              </div>
              <h3 className="fs16 text-nowrap max-sm:ml-auto">
                Total student count: 100
              </h3>
            </div>
          </div>

          <div className="mx-auto w-full md:w-4/6 md:mt-20 mt-10">
            <div className=" p-6 border border-cslategray custom-shadow  text-lg font-semibold flex gap-3 items-start ">
              <span className=" text-cblack">15</span>{' '}
              <p className=" text-cslategray">
                Which Gas is the Lightest? Lorem ipsum dolor sit amet
                consectetur. Eu sed quis at natoque quam non
              </p>
            </div>
            <h4 className="fs24 text-secondary mt-5 ">
              Choose correct answer from below
            </h4>
            <div className=" mt-5 grid grid-cols-2 gap-5">
              <div className="  text-start   border-secondary p-3 fs18 w-full text-white bg-primary rounded-full ">
                <span className=" mr-2  rounded-full px-2 py-1 bg-white text-primary">
                  A
                </span>
                Hydrogen
              </div>
              <div className="  text-start border-secondary p-3 fs18 w-full text-secondary border  rounded-full ">
                <span className=" mr-2  rounded-full px-2 py-1 bg-white ">
                  B
                </span>
                Helium
              </div>
              <div className="  text-start border-secondary p-3 fs18 w-full text-secondary border  rounded-full ">
                <span className=" mr-2  rounded-full px-2 py-1 bg-white ">
                  C
                </span>
                Ammonia
              </div>
              <div className="  text-start border-secondary p-3 fs18 w-full text-secondary border  rounded-full ">
                <span className=" mr-2  rounded-full px-2 py-1 bg-white ">
                  D
                </span>
                Oxygen
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-between md:mt-36 mt-10">
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
        <div className=" md:col-span-3 col-span-12 ">
          <div className=" p-2  col-span-3 text-start">
            <div>
              <div className=" bg-white p-2 custom-shadow">
                <h1 className="fs16 text-cblack">Number Of Question</h1>
                <ul className=" grid grid-cols-6 gap-2  fs18 mt-5">
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
                  <li className="  hover:bg-primary hover:text-white p-2 rounded-md text-center text-secondary font-medium">
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

              <div className="  mt-10 overflow-x-scroll bg-white custom-shadow p-2">
                <h1 className="fs16 text-cblack">All Rankings</h1>
                <table className=" mt-5 w-full overflow-x-scroll border-separate border-spacing-1">
                  <tr className=" text-[10px] text-secondary  ">
                    <th className=" text-start">Rank </th>
                    <th className=" text-start">Name</th>
                    <th className=" text-start">Languages</th>
                    <th className=" text-center">Point</th>
                  </tr>

                  <tr className=" text-cblack  ">
                    <td className="fs16 mt-5 ">
                      <span className="px-2 py-1 rounded-md bg-primary text-center text-white font-medium">
                        #1
                      </span>
                    </td>
                    <td className=" py-3  text-start text-xs text-cblack text-nowrap ">
                      Jane Cooper
                    </td>
                    <td className=" py-3  text-center fs16">C++</td>
                    <td className=" py-3  text-center fs16">50/100</td>
                  </tr>
                  <tr className=" text-cblack  ">
                    <td className="fs16 mt-5 ">
                      <span className="px-2 py-1 rounded-md bg-primary text-center text-white font-medium">
                        #1
                      </span>
                    </td>
                    <td className=" py-3  text-start text-xs text-cblack text-nowrap ">
                      Jane Cooper
                    </td>
                    <td className=" py-3  text-center fs16">C++</td>
                    <td className=" py-3  text-center fs16">50/100</td>
                  </tr>
                  <tr className=" text-cblack  ">
                    <td className="fs16 mt-5 ">
                      <span className="px-2 py-1 rounded-md bg-primary text-center text-white font-medium">
                        #1
                      </span>
                    </td>
                    <td className=" py-3  text-start text-xs text-cblack text-nowrap ">
                      Jane Cooper
                    </td>
                    <td className=" py-3  text-center fs16">C++</td>
                    <td className=" py-3  text-center fs16">50/100</td>
                  </tr>
                </table>
              </div>
              <div className=" mt-5 overflow-x-scroll !w-full">
                <h4 className=" text-base  !font-semibold">My ranking</h4>
                <table className=" border-separate border-spacing-4 w-full border border-primary mt-5 rounded-md ">
                  <tr className=" text-cblack  ">
                    <th className="fs16 mt-5 ">
                      <span className="px-2 py-1 rounded-md bg-primary text-center text-white font-medium">
                        #1
                      </span>
                    </th>
                    <th className=" py-3  text-start text-xs text-cblack text-nowrap ">
                      Jane Cooper
                    </th>
                    <th className=" py-3  text-center fs16">C++</th>
                    <th className=" py-3  text-center fs16">50/100</th>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NextQuestion;
