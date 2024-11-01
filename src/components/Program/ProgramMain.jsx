import React, { useEffect, useState } from "react";
import circle from "../../assets/svg/circle.svg";
import lock from "../../assets/svg/lock.svg";
import dottcircle from "../../assets/svg/dotcircle.svg";
import { GetAllPrograms } from "../../services/Program.service";
import { useNavigate } from "react-router-dom";

const ProgramMain = () => {
  const navigate = useNavigate();
  const [program, setProgram] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState([]);
  useEffect(() => {
    async function getAllProgram() {
      try {
        const data = await GetAllPrograms();
        setProgram(data.results);
        setSelectedProgram(data.results[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getAllProgram();
  }, []);

  return (
    <div className=" bg-white relative mt-10 programpage_main_inner">
      <section className=" mx-auto  md:w-[60%] 2xl:max-w-[950px]   px-2">
        <h1 className=" title">All Preparation Programs</h1>
        <p className=" text-xs text-secondary font-normal mt-2">
          Unlock your coding potential to become a software developer
        </p>
        <h5 className=" text-primary font-semibold mt-2 text-sm">
          Choose your programs
        </h5>
        <div className=" my-5  flex xl:justify-center gap-1 overflow-x-scroll hide-scrollbar  ">
          {program &&
            program.length > 0 &&
            program.map((item) => {
              return (
                <button
                  className={`custom-shadow text-[14px] text-nowrap py-4 px-5 px-2 text-sm !rounded-full ${
                    selectedProgram === item
                      ? "bg-primary text-white !border-primary"
                      : "bg-white text-primary "
                  } !border-[#d1d5db]`}
                  onClick={() => {
                    setSelectedProgram(item);
                  }}
                >
                  {item.name}
                </button>
              );
            })}

          {/* <button className="  text-[10px] text-nowrap py-1 px-2 rounded-full font-medium border border-cborder  flex justify-start items-center   text-secondary">
            <span>
              <img src={lock} alt="" className=" mr-1" />
            </span>
            Web Development
          </button> */}
          {/* <button className="  text-[10px] text-nowrap flex justify-start items-center py-1 px-2 rounded-full font-medium  border border-cborder    text-secondary">
            <span>
              <img src={lock} alt="" className=" mr-1" />
            </span>
            Data Science
          </button> */}
          {/* <button className="  text-[10px] text-nowrap py-1 px-2 rounded-full border font-medium border-cborder   text-secondary">
            Internship
          </button> */}
        </div>
        <div className=" mt-6 flex gap-6 justify-center   mx-auto max-md:flex-col relative z-20">
          {/* left side */}
          {selectedProgram && selectedProgram?.courses?.length > 0 && (
            <div className="bg-white rounded-lg shadow-[rgba(0,0,0,0.1)_0px_10px_15px_-3px,rgba(0,0,0,0.05)_0px_4px_6px_-2px] py-4 px-6 text-start  w-full  md:max-w-[320px] lg:max-w-[454px] max-w-[454px] h-full">
              <div className=" flex justify-between items-center border-b border-[#d1d5db] pb-6">
                <h3 className=" max-2xl:text-lg 2xl:text-3xl font-semibold">
                  {selectedProgram?.courses[0]?.name}{" "}
                </h3>
                <h4 className=" 2xl:text-xl max-2xl:text-sm font-semibold">
                  {selectedProgram?.courses[0]?.course_duration_in_months +
                    " Month"}{" "}
                  <br />{" "}
                  <span className=" 2xl:!text-sm max-2xl:!text-xs text-secondary text-center font-medium">
                    Duration
                  </span>
                </h4>
              </div>
              <div className=" text-base   my-6">
                Eligibility: Bachelors 1 , 2, 3, Jrs Cording Lore ipsum dolor
                sit amet
              </div>
              <div className="  text-[10px]  font-medium text-secondary my-5 flex gap-1 overflow-x-scroll hide-scrollbar ">
                {selectedProgram?.courses[0].course_topics &&
                  selectedProgram?.courses[0].course_topics.length > 0 &&
                  selectedProgram?.courses[0].course_topics.map((data) => {
                    return (
                      <button className=" p-3 py-1  bg-clightbg rounded-full text-nowrap text-sm">
                        {data}
                      </button>
                    );
                  })}
              </div>
              <ul className="my-5 text-cblack">
                <h4 className=" text-base font-normal text-secondary mb-5">
                  Programs Including
                </h4>
                {selectedProgram?.courses[0].includes &&
                  selectedProgram?.courses[0].includes.length > 0 &&
                  selectedProgram?.courses[0].includes.map((data) => {
                    return (
                      <li className=" text-base font-medium my-5 flex items-center ">
                        <input
                          checked
                          type="checkbox"
                          className=" h-5 w-5 !rounded-full  !text-white checkbox-green  "
                        />
                        <span className="ml-2">{data}</span>
                      </li>
                    );
                  })}
              </ul>
              <div className="">
                {" "}
                <button
                  className=" mx-auto text-white custom-button border-primary bg-primary mt-10 "
                  onClick={() => {
                    navigate(`/course/${selectedProgram?.courses[0]?.id}`);
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          )}
          {selectedProgram && selectedProgram?.courses?.length > 0 && (
            <div className="rounded-lg shadow-[rgba(0,0,0,0.1)_0px_10px_15px_-3px,rgba(0,0,0,0.05)_0px_4px_6px_-2px] py-4 px-6 text-start w-full  md:max-w-[320px]  lg:max-w-[454px] max-w-[454px]  bg-primary text-white h-full">
              <div className=" flex justify-between items-center border-b border-white pb-6">
                <h3 className=" max-2xl:text-lg 2xl:text-3xl font-semibold">
                  {selectedProgram?.courses[1]?.name}{" "}
                </h3>
                <h4 className=" 2xl:text-xl max-2xl:text-sm font-semibold">
                  {selectedProgram?.courses[1]?.course_duration_in_months} Month{" "}
                  <br />{" "}
                  <span className=" 2xl:!text-sm max-2xl:!text-xs text-wite font-medium">
                    Duration
                  </span>
                </h4>
              </div>
              <div className=" text-base  font-medium my-6">
                Eligibility: Bachelors 1 , 2, 3, Jrs Cording Lore ipsum dolor
                sit amet
              </div>
              <div className="text-[10px] font-medium text-white my-5 flex gap-1 overflow-x-scroll hide-scrollbar">
                {selectedProgram?.courses[1].course_topics &&
                  selectedProgram?.courses[1].course_topics.length > 0 &&
                  selectedProgram?.courses[1].course_topics.map((data) => {
                    return (
                      <button className=" p-3 py-1  bg-cgreensky rounded-full text-nowrap text-sm ">
                        {data}
                      </button>
                    );
                  })}
              </div>
              <ul className="my-5 text-white">
                <h4 className=" text-base font-normal text-white mb-5">
                  Programs Including
                </h4>
                {selectedProgram?.courses[1].includes &&
                  selectedProgram?.courses[1].includes.length > 0 &&
                  selectedProgram?.courses[1].includes.map((data) => {
                    return (
                      <li className=" text-base font-medium my-5 flex items-center ">
                        <input
                          type="checkbox"
                          checked
                          className=" h-5 w-5 !rounded-full accent-white !text-primary checkbox-white"
                        />
                        <span className="ml-2">{data}</span>
                      </li>
                    );
                  })}
              </ul>
              <div className="">
                <button
                  className=" mx-auto text-primary custom-button border-white bg-white mt-10 "
                  onClick={() => {
                    navigate(`/course/${selectedProgram?.courses[1]?.id}`);
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <div className=" absolute top-60 -left-10 max-md:hidden">
        {" "}
        <img src={circle} alt="" />
      </div>
      <div className=" absolute top-10 -right-10 max-md:hidden">
        {" "}
        <img src={circle} alt="" />
      </div>
      <img
        src={dottcircle}
        alt=""
        className=" bottom-1/4 absolute -left-10 max-md:hidden "
      />
      <img
        src={dottcircle}
        alt=""
        className=" bottom-28 absolute right-10 max-md:hidden"
      />
      <span className="glow_elements"></span>
      <span className="glow_elements"></span>
    </div>
  );
};

export default ProgramMain;
