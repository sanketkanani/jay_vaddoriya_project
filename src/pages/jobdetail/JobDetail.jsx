import React from 'react';
import carrer from '../../assets/images/carreer.svg';

import leftgreen from '../../assets/svg/Rightsidearrow/leftgreen.svg';
import rightwhite from '../../assets/svg/Rightsidearrow/whiteRightarrow.svg';
import people from '../../assets/images/bluepeople.svg';
import location from '../../assets/svg/location.svg';
import progress from '../../assets/svg/progress.svg';
import circle from "../../assets/svg/circle.svg"

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const JobDetail = () => {
  return (
    <>
      <div className=" relative sub-section  flex flex-col max-sm:w-[90%] justify-center mx-auto jobdetailbanner h-[120px] sm:h-[197px] text-start">
        <div className="ml-10  text-white ">
          <div className=" flex justify-start items-center gap-3">
            <h4 className=" text-3xl font-semibold   ">Job Details </h4>
          </div>
          <h6 className=" font-normal my-2 text-lg">
            Read your job everything{' '}
          </h6>{' '}
        </div>
        <img src={circle} alt="" className=' max-md:hidden absolute top-0 right-0' />
      </div>
      <div className=" mt-10">
        <div className=" sub-section grid grid-cols-12 gap-3">
          <div className=" col-span-8 max-md:col-span-12 md:px-5 p-4 custom-shadow  ">
            <div className=" flex justify-between items-center">
              {' '}
              <div className=" flex justify-start gap-2  items-center p-2 !pl-0 max-md:text-lg  font-bold text-2xl text-cblack my-2">
                <span className=" bg-primary p-2 rounded-full">
                  {' '}
                  <img src={carrer} alt="" />
                </span>
                <h4>Sales Caller</h4>
              </div>
              <a href="/applyapplication">
                <button className=" custom-button bg-primary text-white">
                  Apply Now
                </button>
              </a>
            </div>
            <ul className=" flex items-center p-2  justify-start mt-2  overflow-x-scroll text-xs gap-3 font-medium text-center text-secondary">
              <li className="px-2 bg-clightbg rounded-full text-center text-nowrap py-1">
                2 Position
              </li>
              <li className="px-2 bg-clightbg rounded-full text-center text-nowrap py-1">
                Full Time
              </li>
              <li className="px-2 bg-clightbg rounded-full text-center text-nowrap py-1">
                Onsite
              </li>
              <li className="px-2 bg-clightbg rounded-full text-center text-nowrap py-1">
                Full Time
              </li>
            </ul>
            <div className=" text-start   ">
              <Tabs className= " ">
                <TabList>
                  <Tab>
                    {' '}
                    <button className="font-semibold text-base pb-2 border-b-2 border-primary text-cblack mr-4">
                      Job Description
                    </button>
                  </Tab>
                  <Tab>
                    <button className="font-medium text-base text-secondary  ">
                      Progress
                    </button>
                  </Tab>
                </TabList>

                <TabPanel className=" ">
                  <p className="font-normal text-xs text-secondary text-start   mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo con Duis aute irure dolor in
                    reprehenderit in{' '}
                  </p>
                  <p className="font-normal text-xs text-secondary text-start   mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo con Duis aute irure dolor in
                    reprehenderit in{' '}
                  </p>
                  <ul className=" mt-5 text-start list-disc ">
                    <h4 className="font-semibold text-base   text-cblack">
                      Eligibility
                    </h4>
                    <li className="font-normal text-xs !text-primary text-start   my-3 ml-4">
                      <span className=" text-secondary">
                        {' '}
                        Lorem ipsum dolor sit amet, consecte Lorem ipsum dolor
                        sit amet, consecte Lorem ipsum dolor sit amet{' '}
                      </span>
                    </li>
                    <li className="font-normal text-xs !text-primary text-start   my-3 ml-4">
                      <span className=" text-secondary">
                        {' '}
                        Lorem ipsum dolor sit amet, consecte Lorem ipsum dolor
                        sit amet, consecte Lorem ipsum dolor sit amet{' '}
                      </span>
                    </li>
                    <li className="font-normal text-xs !text-primary text-start   my-3 ml-4">
                      <span className=" text-secondary">
                        {' '}
                        Lorem ipsum dolor sit amet, consecte Lorem ipsum dolor
                        sit amet, consecte Lorem ipsum dolor sit amet{' '}
                      </span>
                    </li>
                    <li className="font-normal text-xs !text-primary text-start   my-3 ml-4">
                      <span className=" text-secondary">
                        {' '}
                        Lorem ipsum dolor sit amet, consecte Lorem ipsum dolor
                        sit amet, consecte Lorem ipsum dolor sit amet{' '}
                      </span>
                    </li>
                    <li className="font-normal text-xs !text-primary text-start   my-3 ml-4">
                      <span className=" text-secondary">
                        {' '}
                        Lorem ipsum dolor sit amet, consecte Lorem ipsum dolor
                        sit amet, consecte Lorem ipsum dolor sit amet{' '}
                      </span>
                    </li>
                    <li className="font-normal text-xs !text-primary text-start   my-3 ml-4">
                      <span className=" text-secondary">
                        {' '}
                        Lorem ipsum dolor sit amet, consecte Lorem ipsum dolor
                        sit amet, consecte Lorem ipsum dolor sit amet{' '}
                      </span>
                    </li>
                  </ul>
                </TabPanel>
                <TabPanel>
                  <ul className=" mt-5 text-start  ">
                    <h4 className="font-semibold text-base   text-cblack">
                      <span className=" text-primary">Lorem ipsum</span> dolor
                      sit amet
                    </h4>
                    <li className="font-medium flex border-2 border-cborder rounded-md justify-between  p-3 gap-2 items-center text-base  text-start   my-3 ">
                   <div className=' flex items-center gap-2'>
                   <img src={progress} alt="" />
                      <span className=" !text-cblack">
                        {' '}
                        Lorem ipsum dolor sit amet, consecte
                      </span>
                   </div>
                   <div className=' text-sm font-medium text-secondary'>3 March, 2024</div>
                    </li>
                  </ul>
                  <h4 className="font-semibold text-base mt-5   text-cblack">
                      <span className=" text-primary">Lorem ipsum</span> dolor
                      sit amet
                    </h4>
                  <ul className=" mt-5 text-start border-2 border-cborder rounded-md px-3  ">
                   
                    <li className="font-medium flex gap-2 items-center text-base justify-between  text-start   my-3 ">
                    <div className=' flex items-center gap-2'>
                   <img src={progress} alt="" />
                      <span className=" !text-cblack">
                        {' '}
                        Lorem ipsum dolor sit amet, consecte
                      </span>
                   </div>
                   <div className=' text-sm font-medium text-secondary'>3 March, 2024</div>
                    </li>
                    <li className="font-medium flex gap-2 items-center text-base justify-between  text-start   my-3 ">
                    <div className=' flex items-center gap-2'>
                   <img src={progress} alt="" />
                      <span className=" !text-cblack">
                        {' '}
                        Lorem ipsum dolor sit amet, consecte
                      </span>
                   </div>
                   <div className=' text-sm font-medium text-secondary'>3 March, 2024</div>
                    </li>
                    <li className="font-medium flex gap-2 items-center text-base justify-between  text-start   my-3 ">
                    <div className=' flex items-center gap-2'>
                   <img src={progress} alt="" />
                      <span className=" !text-cblack">
                        {' '}
                        Lorem ipsum dolor sit amet, consecte
                      </span>
                   </div>
                   <div className=' text-sm font-medium text-secondary'>3 March, 2024</div>
                    </li>
                    <li className="font-medium flex gap-2 items-center text-base justify-between  text-start   my-3 ">
                    <div className=' flex items-center gap-2'>
                   <img src={progress} alt="" />
                      <span className=" !text-cblack">
                        {' '}
                        Lorem ipsum dolor sit amet, consecte
                      </span>
                   </div>
                   <div className=' text-sm font-medium text-secondary'>3 March, 2024</div>
                    </li>
                    <li className="font-medium flex gap-2 items-center text-base justify-between  text-start   my-3 ">
                    <div className=' flex items-center gap-2'>
                   <img src={progress} alt="" />
                      <span className=" !text-cblack">
                        {' '}
                        Lorem ipsum dolor sit amet, consecte
                      </span>
                   </div>
                   <div className=' text-sm font-medium text-secondary'>3 March, 2024</div>
                    </li>
                
                  </ul>
                </TabPanel>
              </Tabs>
            </div>

            <div className=" mt-10 flex justify-between items-center  max-md:hidden">
              <button className=" custom-button text-primary border-primary">
                <img src={leftgreen} alt="" className=" mr-2" />
                <span>Back</span>
              </button>
              <button className=" custom-button text-white bg-primary border-primary">
                <span>Next</span>
                <img src={rightwhite} alt="" className=" ml-2" />
              </button>
            </div>
          </div>
          <div className=" col-span-4 max-md:col-span-12 p-4 custom-shadow md:px-5">
            <div className=" mt-3">
              {' '}
              <h5 className=" font-semibold text-xl  text-start  text-cblack ">
                About MAANG Company
              </h5>
              <p className="font-normal text-xs text-secondary text-start   mt-2">
                Lorem ipsum dolor sit amet, consecte Lorem ipsum dolor sit amet,
                consecte Lorem ipsum dolor sit amet
              </p>
            </div>
            <div className="mt-3">
              {' '}
              <h5 className=" font-semibold text-xl  text-start  text-cblack ">
                Subject
              </h5>
              <p className="font-normal text-xs text-secondary text-start   mt-2">
                Lorem ipsum dolor sit amet, consecte Lorem ipsum dolor sit amet,
                consecte
              </p>
            </div>
            <div className=" mt-3 flex justify-start items-start gap-3">
              <div className="font-normal text-xs text-secondary text-start  flex gap-1 items-start ">
                <img src={people} alt="" />
                <span>10,000+ Employee</span>
              </div>
              <div className="font-normal text-xs text-secondary text-start  flex gap-1 items-start ">
                <img src={location} alt="" />
                <span>Royal Ln. Mesa, New Jersey 5241</span>
              </div>
            </div>
            <ul className=" mt-3 text-start list-disc  ">
              <h4 className="font-semibold text-lg   text-cblack">Review</h4>
              <li className="font-normal text-xs !text-primary text-start   my-3 ml-4">
                <span className=" text-secondary">
                  {' '}
                  Lorem ipsum dolor sit amet, consecte
                </span>
              </li>
              <li className="font-normal text-xs !text-primary text-start   my-3 ml-4">
                <span className=" text-secondary">
                  {' '}
                  Lorem ipsum dolor sit amet, consecte
                </span>
              </li>
              <li className="font-normal text-xs !text-primary text-start   my-3 ml-4">
                <span className=" text-secondary">
                  {' '}
                  Lorem ipsum dolor sit amet, consecte
                </span>
              </li>
              <li className="font-normal text-xs !text-primary text-start   my-3 ml-4">
                <span className=" text-secondary">
                  {' '}
                  Lorem ipsum dolor sit amet, consecte
                </span>
              </li>
            </ul>
            <div className=" text-start  mt-4">
              <h4 className="font-semibold text-lg  text-cblack">Benefit</h4>
              <div className=" flex justify-start items-start gap-3 flex-wrap  mt-4 ">
                <div className="font-normal flex-1 text-xs text-secondary flex-col text-start  flex gap-1 items-center ">
                  <img src={people} alt="" />
                  <span>Coffee</span>
                </div>
                <div className="font-normal flex-1 text-xs text-secondary flex-col text-start  flex gap-1 items-center ">
                  <img src={location} alt="" />
                  <span>Coffee</span>
                </div>
                <div className="font-normal flex-1 text-xs text-secondary flex-col text-start  flex gap-1 items-center ">
                  <img src={location} alt="" />
                  <span>Transportation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" sub-section py-10">
          <div className=" flex justify-between items-center md:hidden w-full">
            <button className=" custom-button text-primary border-primary">
              <img src={leftgreen} alt="" className=" mr-2" />
              <span>Back</span>
            </button>
            <button className=" custom-button text-white bg-primary border-primary">
              <span>Next</span>
              <img src={rightwhite} alt="" className=" ml-2" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetail;
