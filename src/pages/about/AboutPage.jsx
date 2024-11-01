import React from "react";
import AboutComp from "../../components/about/AboutComp";
import CountingBanner from "../../components/allbanner/CountingBanner";
import LogosBanner from "../../components/allbanner/LogosBanner";
import ChooseComp from "../../components/about/ChooseComp";
import HerosCarasol from "../../components/allcarasol/HerosCarasol";
import NumberCount from "../../components/about/NumberCount";
import MediaCarasol from "../../components/allcarasol/MediaCarasol";
import Testimonial from "../../components/allcarasol/Testimonial";
import DualSection from "../../components/about/DualSection";
import topBg from "../../assets/aboutPage-bg-01.png";
import bookwithBoy from "../../assets/bookwithBoy.png";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div
        className="pt-[] about_us_top_section"
        style={{ backgroundImage: `url(${topBg})` }}
      >
        <AboutComp />
        <CountingBanner />
      </div>
      <LogosBanner />
      <ChooseComp />
      <HerosCarasol />
      <NumberCount />
      <div>
        <MediaCarasol backgroundColor={"#F4F6FB"} />
      </div>
      <div className="testi_about relative">
        <Testimonial />
        <span className="glow_elements"></span>
        <span className="glow_elements left"></span>
      </div>
      <div className="about_inner_knowledge">
        <DualSection />
      </div>
      <div className="about_img_banner  ">
        <div className=" max-md:hidden mb-[100px]  ">
          <div className="w-[80%] mx-auto ">
            <div className=" rounded-lg relative main_call_action  top-16 bg-primary p-4 mt-0 max-md:flex-col flex    h-full  justify-between gap-4 items-center">
              <div className="max-md:order-last">
                {" "}
                <img
                  src={bookwithBoy}
                  className=" max-w-40 max-h-64 h-full max-md:max-h-40 w-full object-cover relative -bottom-4 "
                  alt=""
                />
              </div>
              <div className=" 2xl:text-2xl max-2xl:text-xl md:w-2/4   font-medium text-white">
                Affordable online course & Learning Opportunities for you!
              </div>
              <button
                className=" custom-button bg-white text-primary flex gap-2 w-[10/12]"
                onClick={() => navigate("/course")}
              >
                <span>Start Learning Today</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
