import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import resetsuccess from "../../assets/svg/Loginsuccess.svg";

const OtpSuccessComp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/login");
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [email, navigate]);

  const handleLoginNowClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex-1 flex flex-col justify-center relative items-center">
      <img src={resetsuccess} alt="" width={200} height={200} />
      <h1 className="text-black font-semibold text-2xl my-3">Thank You!</h1>
      <h1 className="text-black font-semibold text-lg">
        Your OTP has been submitted
      </h1>
      <h1 className="text-secondary font-medium text-sm mt-2">
        You will be redirected to the login page
      </h1>
      <h1 className="text-secondary font-medium text-sm mt-2">
        Redirecting to website in {countdown} seconds!
      </h1>
    </div>
  );
};

export default OtpSuccessComp;
