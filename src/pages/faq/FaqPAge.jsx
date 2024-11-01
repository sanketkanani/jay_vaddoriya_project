import React from "react";
import FaqDashboard from "../../components/faq/FaqDashboard";
import Banner from "../../components/Program/Banner";
import book_girl from "../../assets/svg/book_girl.png";
import { useNavigate } from "react-router-dom";

const FaqPAge = () => {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden w-full ">
      <Banner />
      <FaqDashboard />
      <div className=" max-md:hidden mb-[100px]  ">
        <div className="w-[80%] mx-auto ">
          <div className=" rounded-lg relative main_call_action  top-16 bg-primary p-4 mt-0 max-md:flex-col flex    h-full  justify-between gap-4 items-center">
            <div className="max-md:order-last">
              {" "}
              <img
                src={book_girl}
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
  );
};

export default FaqPAge;
