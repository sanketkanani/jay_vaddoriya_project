import React, { useEffect, useState } from "react";

import img from "../../assets/Loginsuccess.png";
import circle from "../../assets/svg/circle.svg";
import greendot from "../../assets/svg/dotcircle.svg";
import { Link, useNavigate } from "react-router-dom";

const DetailSubmit = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(50);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
      navigate("/");
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startTimer = () => {
    setIsActive(true);
  };

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <>
      <div className=" relative margin_for_header">
        <section className=" sub-section">
          <div className=" flex flex-col justify-center items-center gap-3">
            <img src={img} alt="" />
            <h4 className=" 2xl:text-5xl sm:text-3xl font-semibold max-sm:text-lg">
              Thank You !
            </h4>
            <h5 className=" font-semibold 2xl:text-3xl sm:text-lg max-sm:text-base ">
              Your details has been submited
            </h5>
            <p className=" 2xl:text-xl sm:text-xs max-sm:text-sm font-normal text-secondary leading-1">
              We will get tin touch with you in 1-2 business days <br />
              Redirect to website in {seconds} seconds !
            </p>
            <Link
              to="/"
              className=" custom-button text-white bg-primary border-primary mt-7"
            >
              Go Back Home
            </Link>
          </div>
        </section>
        <img
          src={circle}
          alt=""
          className=" absolute top-2/4 -left-10 max-md:hidden"
        />
        <img
          src={circle}
          alt=""
          className=" absolute top-2/4 -right-10 max-md:hidden"
        />
        <img
          src={greendot}
          alt=""
          className=" right-2 absolute top-[55%] translate-y-1/2 w-[100px] max-md:hidden xl:block"
        />
      </div>
    </>
  );
};

export default DetailSubmit;
