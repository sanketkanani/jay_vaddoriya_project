import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import resetsuccess from "../../assets/thankyou-main-img.png";

const ResetSuccessEmailComp = () => {
  const [countdown, setCountdown] = useState(30); // Initialize countdown to 50 seconds
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1); // Decrease countdown by 1 every second
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer); // Clear the timer
      navigate("/login"); // Redirect to the login page
    }

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [countdown, navigate]);

  return (
    <>
      <div className="flex-1 flex flex-col justify-center relative items-center">
        <img src={resetsuccess} alt="Success" width={200} height={200} />
        <h1 className="text-black font-semibold lg:text-[40px] md:text-xl mt-5 mb-4">
          Thank You!
        </h1>
        <h1 className="text-black font-semibold text-lg">
          Your Password reset link has been successfully sent to your email.
        </h1>
        <h1 className="text-secondary font-medium text-sm mt-2">
          You will be redirected to the login page in {countdown} seconds!
        </h1>
      </div>
    </>
  );
};

export default ResetSuccessEmailComp;
