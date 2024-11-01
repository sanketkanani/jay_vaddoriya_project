import React from "react";
import google from "../../assets/svg/companyclr/googlecl.svg";
import amazon from "../../assets/svg/companyclr/amazonclr.svg";
import microsoft from "../../assets/svg/companyclr/microsoft.svg";
import iphone from "../../assets/svg/companyclr/iphone.svg";
import netflix from "../../assets/svg/companyclr/netflix.svg";
import capsule from "../../assets/svg/reconisged/capsule.svg";
import sperul from "../../assets/svg/reconisged/spheral.svg";
import luminous from "../../assets/svg/reconisged/luminos.svg";
import focal from "../../assets/svg/reconisged/focal.svg";
import dottcircle from "../../assets/svg/dotcircle.svg";
import ring from "../../assets/svg/circle.svg";
import Meta from "../../assets/Meta-Logo.png";
import Abobe from "../../assets/Adobe-logo.png";
import Atlassian from "../../assets/atlassian-01.png";
import Walmart from "../../assets/walmart-01.png";
import LInkdin from "../../assets/LinkedIn-Logo.png";

const CompanyBanner = () => {
  return (
    <div className="bg-bannerbg relative">
      <section className="sub-section text-center">
        <h5 className="title leading-tight sm:leading-[1.3]">
          Land your dream job at soft <br className="max-sm:hidden" /> MAANG
          Companies
        </h5>
        <ul className="mt-10 grid sm:grid-cols-3 xl:grid-cols-5 gap-4 md:grid-cols-5  justify-items-center items-center">
          {" "}
          <li>
            <img src={google} alt="Google" className="w-[100px] h-auto" />
          </li>
          <li>
            <img src={amazon} alt="Amazon" className="w-[100px] h-auto" />
          </li>
          <li>
            <img src={iphone} alt="iPhone" className="w-[100px] h-auto" />
          </li>
          <li>
            <img src={microsoft} alt="Microsoft" className="w-[100px] h-auto" />
          </li>
          <li>
            <img src={Meta} alt="Meta" className="w-[130px] h-auto" />
          </li>
          <li>
            <img src={Abobe} alt="Adobe" className="w-[130px] h-auto" />
          </li>
          <li>
            <img src={Atlassian} alt="Atlassian" className="w-[130px] h-auto" />
          </li>
          <li>
            <img src={Walmart} alt="Walmart" className="w-[130px] h-auto" />
          </li>
          <li>
            <img src={LInkdin} alt="LinkedIn" className="w-[130px] h-auto" />
          </li>
          <li>
            <img src={netflix} alt="Netflix" className="w-[100px] h-auto" />
          </li>
        </ul>
      </section>
      <img
        src={ring}
        alt=""
        className=" max-md:hidden absolute -left-12  top-16"
      />
      <img
        src={ring}
        alt=""
        className=" max-md:hidden absolute -right-10  -top-8"
      />

      <img
        src={dottcircle}
        alt=""
        className=" max-md:hidden absolute right-10 top-[15%]"
      />
    </div>
  );
};

export default CompanyBanner;
