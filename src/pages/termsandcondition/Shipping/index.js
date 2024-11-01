import React, { useState } from "react";
import payment from "../../../assets/svg/faq/payemet.svg";
import corse from "../../../assets/svg/faq/course.svg";
import Privacy1 from "../../../assets/svg/faq/primary.svg";
import people from "../../../assets/svg/faq/people.svg";
import circle from "../../../assets/svg/circle.svg";
import dottcircle from "../../../assets/svg/dotcircle.svg";
import TermsCondComp from "../../../components/termsconditon/TermsCondComp";
import PrivacyPolicy from "../../../components/termsconditon/PrivacyPolicy";
import ReturnRefund from "../../../components/termsconditon/ReturnRefund";
import ShippingDeleviry from "../../../components/termsconditon/ShippingDeleviry";
import uparrow from "../../../assets/images/upwhite.svg";
import termsconditonImg from "../../../assets/trem&condition.svg";
import privecyImg from "../../../assets/privacyImg.svg";
import returnImg from "../../../assets/returnImg.svg";
import shippingImg from "../../../assets/shipping-img.svg";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("shipping"); // State to track active component

  return (
    <div className="relative pt-5 margin_for_header">
      <div className="sub-section">
        <div className="text-3xl  text-start rounded-md font-semibold  text-cblack">
          <span>Shipping & Delivery Policy</span>
        </div>
        <section className="grid grid-cols-12 max-lg:grid-cols-8 gap-2 place-items-start relative z-10 transition-all duration-500 ease-in-out mt-0">
          <div className="col-span-3 max-lg:col-span-8 custom-shadow w-full bg-white">
            <ul className="main_trams_part_page text-left">
              <li
                onClick={() => {
                  navigate("/terms-condition");
                }}
                className={
                  activeComponent === "terms"
                    ? "active text-white text-lg font-medium"
                    : "text-lg text-secondary font-medium"
                }
              >
                <button className="text-left flex items-center justify-between w-full px-3">
                  <div className="flex items-center gap-3">
                    <span className="icon">
                      <img src={termsconditonImg} alt="Terms & Conditions" />
                    </span>
                    Terms & conditions
                  </div>
                  <span className="heading_icon ml-2 font-medium text-3xl w-[30px] h-[30px] rounded-full border border-secondary line-height-[1] flex items-center justify-center lg:hidden">
                    {activeComponent === "terms" ? "-" : "+"}
                  </span>
                </button>
              </li>
              <div className="lg:hidden">
                {activeComponent === "terms" && <TermsCondComp />}
              </div>
              <li
                onClick={() => {
                  navigate("/privacy");
                }}
                className={
                  activeComponent === "privacy"
                    ? "active font-medium text-white text-lg"
                    : "font-medium text-secondary text-lg"
                }
              >
                <button className="text-left flex items-center justify-between w-full px-3">
                  <div className="flex items-center gap-3">
                    <span className="icon">
                      <img src={privecyImg} alt="Privacy Policy" />
                    </span>
                    Privacy Policy
                  </div>
                  <span className="heading_icon ml-2 font-medium text-3xl w-[30px] h-[30px] rounded-full border border-secondary line-height-[1] flex items-center justify-center lg:hidden">
                    {activeComponent === "privacy" ? "-" : "+"}
                  </span>
                </button>
              </li>
              <div className="lg:hidden">
                {activeComponent === "privacy" && <PrivacyPolicy />}
              </div>

              <li
                onClick={() => {
                  navigate("/return");
                }}
                className={
                  activeComponent === "return"
                    ? "active font-medium text-white text-lg"
                    : "font-medium text-secondary text-lg"
                }
              >
                <button className="text-left flex items-center justify-between w-full px-3">
                  <div className="flex items-center gap-3">
                    <span className="icon">
                      <img src={returnImg} alt="Return & Refund Policy" />
                    </span>
                    Return & refund policy
                  </div>
                  <span className="heading_icon ml-2 font-medium text-3xl w-[30px] h-[30px] rounded-full border border-secondary line-height-[1] flex items-center justify-center lg:hidden">
                    {activeComponent === "return" ? "-" : "+"}
                  </span>
                </button>
              </li>
              <div className="lg:hidden">
                {activeComponent === "return" && <ReturnRefund />}
              </div>
              <li
                onClick={() => {
                  navigate("/shipping");
                }}
                className={
                  activeComponent === "shipping"
                    ? "active font-medium text-white text-lg !border-0 !mb-0"
                    : "!border-0  font-medium text-secondary text-lg"
                }
              >
                <button className="text-left flex items-center justify-between w-full px-3">
                  <div className="flex items-center gap-3">
                    <span className="icon">
                      <img src={shippingImg} alt="Shipping & Delivery Policy" />
                    </span>
                    Shipping & Delivery Policy
                  </div>
                  <span className="heading_icon ml-2 font-medium text-3xl w-[30px] h-[30px] rounded-full border border-secondary line-height-[1] flex items-center justify-center lg:hidden">
                    {activeComponent === "shipping" ? "-" : "+"}
                  </span>
                </button>
              </li>
              <div className="lg:hidden">
                {activeComponent === "shipping" && <ShippingDeleviry />}
              </div>

              {/* Similarly for other list items */}
            </ul>
          </div>
          <div className="col-span-9 z-50  px-4 text-start max-lg:hidden max-lg:col-span-8">
            {activeComponent === "terms" && <TermsCondComp />}
            {activeComponent === "privacy" && <PrivacyPolicy />}
            {activeComponent === "return" && <ReturnRefund />}
            {activeComponent === "shipping" && <ShippingDeleviry />}
            {/* Render other components based on activeComponent */}
            <button
              className="custom-button mx-auto bg-primary text-white mt-5"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth", duration: 500 })
              }
            >
              Back to Top <img src={uparrow} alt="" className=" ml-2" />
            </button>
          </div>
        </section>
      </div>
      <img
        src={dottcircle}
        className=" absolute right-28 -z-10 top-[13%]  max-md:hidden"
        alt=""
      />
      <img
        src={circle}
        className=" absolute -right-12  top-[10%] max-md:hidden"
        alt=""
      />
      <img
        src={circle}
        className=" absolute -left-4  top-[32%] max-md:hidden"
        alt=""
      />
      <img
        src={dottcircle}
        className=" absolute left-10  top-[35%] max-md:hidden"
        alt=""
      />
      <img
        src={circle}
        className=" absolute right-10  top-[65%] max-md:hidden"
        alt=""
      />
      <img
        src={dottcircle}
        className=" absolute -right-10  top-[65%] max-md:hidden"
        alt=""
      />
      <img
        src={circle}
        className=" absolute -left-4  bottom-[10%] max-md:hidden"
        alt=""
      />
      <img
        src={dottcircle}
        className=" absolute left-10  bottom-[5%] max-md:hidden"
        alt=""
      />
      <span className="glow_elements_con top-6 -right-10 !opacity-[14%]"></span>
      <span className="glow_elements_con -right-10 !opacity-[14%] translate-y-1/2 top-[60%]"></span>
      <span className="glow_elements_con -left-12 top-[32%] !opacity-[10%]"></span>
      <span className="glow_elements_con -left-12 bottom-24 !opacity-[10%]"></span>
      {/* Additional code for images */}
    </div>
  );
};

export default Shipping;
