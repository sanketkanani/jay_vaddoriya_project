import React from 'react';
import career from '../../assets/images/carreerblue.svg';
import payment from '../../assets/svg/faq/payemet.svg';
import corse from '../../assets/svg/faq/course.svg';
import Privacy from '../../assets/svg/faq/primary.svg';
import leftgreen from '../../assets/svg/Rightsidearrow/leftgreen.svg';
import rightwhite from '../../assets/svg/Rightsidearrow/whiteRightarrow.svg';
import wave from '../../assets/svg/wave.svg';
import circle from '../../assets/svg/circle.svg';
import dottecircle from '../../assets/svg/dotcircle.svg';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';

const ApplyApplication = () => {
  return (
    <div className="pt-5 relative ">
      <div className=" sub-section">
        <div className=" w-[95%] flex flex-col justify-center mx-auto jobdetailbanner h-[167px] text-start">
          <div className="ml-10  text-white ">
            <h6 className=" font-normal my-2 text-lg">Career Portal <span>> Sales caller</span></h6>{' '}
            <div className=" flex justify-start items-center gap-3">
              <h2 className=" bg-white p-2 rounded-full">
                <img src={career} alt="" />
              </h2>

              <h4 className=" text-3xl font-semibold   ">Sales Caller </h4>
            </div>
          </div>
        </div>

        <div className=" w-[95%] pb-16 mx-auto sm:grid grid-cols-12  gap-2 ">
          <div className=" col-span-3  custom-shadow p-4  mt-5">
            <ul className=" text-start   ">
              <Accordion>
                <AccordionItem
                  header={
                    <li className="2xl:text-2xl w-full flex gap-2 items-center p-2 rounded-md font-medium max-2xl:text-base  my-2 text-white bg-primary">
                      <img src={payment} alt="" />
                      <h4 className=" ">Details</h4>
                    </li>
                  }
                  className=""
                >
                  <form className=" sm:w-10/12 sm:ml-10 p-4  mt-4 w-full block sm:hidden">
                    <div className=" flex gap-5">
                      <div className=" text-start flex-1">
                        <label className=" 2xl:text-xl md:text-base  text-cslategray font-semibold">
                          Full Name
                        </label>{' '}
                        <input
                          type="text"
                          placeholder="Your Jane Cooper"
                          className="  2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full maxs-sm:rounded-full"
                        />
                      </div>
                      <div className=" text-start flex-1  ">
                        <label className=" 2xl:text-xl md:text-base  text-cslategray font-semibold">
                          Emaill
                        </label>{' '}
                        <input
                          type="email"
                          placeholder="Your Emaill"
                          className=" 2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full "
                        />
                      </div>
                    </div>
                    <div className=" flex gap-5 mt-6 max-sm:flex-col ">
                      <div className=" text-start  flex-1 ">
                        <label className=" 2xl:text-xl md:text-base  text-cslategray font-semibold">
                          Phone
                        </label>{' '}
                        <input
                          type="text"
                          placeholder="Your Number"
                          className=" 2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full maxs-sm:rounded-full"
                        />
                      </div>
                      <div className=" text-start flex-1  ">
                        <label className=" 2xl:text-xl md:text-base  text-cslategray font-semibold">
                          Location
                        </label>{' '}
                        <input
                          type="text"
                          placeholder="Your Adress"
                          className=" 2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full maxs-sm:rounded-full"
                        />
                      </div>
                    </div>
                    <div className=" flex gap-5 mt-6 max-sm:flex-col">
                      <div className=" text-start  flex-1 ">
                        <label className=" 2xl:text-xl md:text-base  text-cslategray font-semibold">
                          Application date
                        </label>{' '}
                        <input
                          type="date"
                          placeholder=""
                          className=" 2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full maxs-sm:rounded-full"
                        />
                      </div>
                      <div className=" text-start flex-1  ">
                        <div>
                        <label className=" 2xl:text-xl md:text-base  text-cslategray font-semibold">
                          Upload CV
                        </label>{' '}
                        <input
                          type="file"
                          placeholder="Your Adress"
                          className=" 2xl:text-base  !bg-transparent md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full maxs-sm:rounded-full"
                        />
                        </div>
                      
                      </div>
                    </div>
                  </form>
                </AccordionItem>
              </Accordion>

              <Accordion>
                <AccordionItem
                  header={
                    <li className="2xl:text-2xl flex gap-2 border-b border-cborder items-center p-2 rounded-md font-medium max-2xl:text-base text-secondary my-2 hover:text-white hover:bg-primary w-full">
                      <img src={corse} alt="" />
                      <h4 className=" ">Education</h4>
                    </li>
                  }
                >
                  <div className=" sm:hidden">Education</div>
                </AccordionItem>
              </Accordion>

              <Accordion>
                <AccordionItem
                  header={
                    <li className="2xl:text-2xl flex gap-2 border-b border-cborder items-center p-2 rounded-md font-medium max-2xl:text-base text-secondary my-2 hover:text-white hover:bg-primary w-full">
                      <img src={payment} alt="" />
                      <h4 className=" ">Qualification</h4>
                    </li>
                  }
                >
                  {' '}
                  <div className=" sm:hidden">Qualification</div>
                </AccordionItem>
              </Accordion>

              <Accordion>
                <AccordionItem
                  header={
                    <li className="2xl:text-2xl flex gap-2 border-b border-cborder items-center p-2 rounded-md font-medium max-2xl:text-base text-secondary my-2 hover:text-white hover:bg-primary w-full">
                      <img src={payment} alt="" />
                      <h4 className=" ">Certification</h4>
                    </li>
                  }
                >
                  {' '}
                  <div className=" sm:hidden">Certification</div>
                </AccordionItem>
              </Accordion>
              <Accordion>
                <AccordionItem
                  header={
                    <li className="2xl:text-2xl flex gap-2 border-b border-cborder items-center p-2 rounded-md font-medium max-2xl:text-base text-secondary my-2 hover:text-white hover:bg-primary w-full">
                      <img src={Privacy} alt="" />
                      <h4 className=" ">Summary</h4>
                    </li>
                  }
                >
                  {' '}
                  <div className=" sm:hidden">Summary</div>
                </AccordionItem>
              </Accordion>
            </ul>
          </div>
          <div className="col-span-9 text-start   mt-5    ">
          <div className="2xl:text-2xl  font-medium max-2xl:text-lg text-cblack ">
                {' '}
                <span>Application</span>
              </div>
            <div className=" p-4 custom-shadow mt-4 ">
             

              <form className=" sm:w-10/12 sm:ml-10 sm:block hidden   w-full ">
                <div className=" flex gap-5 ">
                  <div className=" text-start flex-1">
                    <label className=" 2xl:text-xl md:text-base  text-cslategray font-semibold">
                      Full Name
                    </label>{' '}
                    <input
                      type="text"
                      placeholder="Your Jane Cooper"
                      className="  2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full maxs-sm:rounded-full"
                    />
                  </div>
                  <div className=" text-start flex-1  ">
                    <label className=" 2xl:text-xl md:text-base  text-cslategray font-semibold">
                      Emaill
                    </label>{' '}
                    <input
                      type="email"
                      placeholder="Your Emaill"
                      className=" 2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full "
                    />
                  </div>
                </div>
                <div className=" flex gap-5 mt-6 max-sm:flex-col ">
                  <div className=" text-start  flex-1 ">
                    <label className=" 2xl:text-xl md:text-base  text-cslategray font-semibold">
                      Phone
                    </label>{' '}
                    <input
                      type="text"
                      placeholder="Your Number"
                      className=" 2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full maxs-sm:rounded-full"
                    />
                  </div>
                  <div className=" text-start flex-1  ">
                    <label className=" 2xl:text-xl md:text-base  text-cslategray font-semibold">
                      Location
                    </label>{' '}
                    <input
                      type="text"
                      placeholder="Your Adress"
                      className=" 2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full maxs-sm:rounded-full"
                    />
                  </div>
                </div>
                <div className=" flex gap-5 mt-6 max-sm:flex-col">
                  <div className=" text-start  flex-1 ">
                    <label className=" 2xl:text-xl md:text-base  text-cslategray font-semibold">
                      Application date
                    </label>{' '}
                    <input
                      type="date"
                      placeholder=""
                      className=" 2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full maxs-sm:rounded-full"
                    />
                  </div>
                  <div className=" text-start flex-1  ">
                    <label className=" 2xl:text-xl md:text-base  text-cslategray font-semibold">
                      Upload CV
                    </label>{' '}
                    <input
                      type="file"
                      placeholder="Your Adress"
                      className=" 2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full maxs-sm:rounded-full"
                    />
                  </div>
                </div>
              </form>
              <div className=" mt-10 flex justify-between items-center">
                <button className=" custom-button text-primary border-primary">
                  <img src={leftgreen} alt="" className=" mr-2" />
                  <span>Back</span>
                </button>
                <button className=" custom-button text-white bg-primary border-primary">
                  <a href="/contest1">Next</a>
                  <img src={rightwhite} alt="" className=" ml-2" />
                </button>
              </div>
            </div>
            <div className=" mt-10">
              <button className=" custom-button text-white bg-primary rounded-full mx-auto">
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </div>
      <img
        src={circle}
        alt=""
        className=" max-md:hidden absolute top-[20%]  -left-10"
      />
      <img
        src={circle}
        alt=""
        className=" max-md:hidden absolute top-[40%]  -right-10"
      />
      <img
        src={wave}
        alt=""
        className=" max-md:hidden absolute bottom-[15%]  -left-10"
      />
      <img
        src={dottecircle}
        alt=""
        className=" max-md:hidden absolute top-0  right-10"
      />
    </div>
  );
};

export default ApplyApplication;
