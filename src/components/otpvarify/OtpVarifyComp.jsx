import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import img1 from "../../assets/images/blog/blog1.png";
import img2 from "../../assets/images/blog/blog2.png";
import img3 from "../../assets/images/blog/blog3.png";
import arrowwhite from "../../assets/svg/whiteArrow.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import resetsuccess from "../../assets/svg/Loginsuccess.svg";
import Button from "../button/Button";
import {
  IsUserValid,
  resendOtp,
  validateOtp,
} from "../../services/Auth.service";
import { useCookie } from "react-use";
import { useUserStore } from "../../store/store";
import ToastUtils from "../utils/ToastUtils";

const OtpInput = ({ length, onOtpChange, otp, setOtp, otpHandler }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    const value = e.target.value.slice(-1);
    if (value === "") {
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
      newOtp[index] = value;
      setOtp(newOtp);
      onOtpChange(newOtp.join(""));
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    onOtpChange(newOtp.join(""));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      const newOtp = [...otp];
      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
        onOtpChange(newOtp.join(""));
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        onOtpChange(newOtp.join(""));
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1].focus();
        }
      }
    } else if (e.key === "ArrowRight") {
      if (index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    } else if (e.key === "ArrowLeft") {
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }else if (e.key === "Enter") {
      // Call the form submit function when Enter is pressed
      otpHandler(e);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text/plain").slice(0, length);
    const newOtp = [...otp];
    for (let i = 0; i < length; i++) {
      newOtp[i] = data[i] || "";
    }
    setOtp(newOtp);
    const nextIndex = data.length;
    if (nextIndex < length && inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus();
    }
    onOtpChange(newOtp.join(""));
  };

  return (
    <div className=" flex gap-1 justify-center items-center">
      {otp.map((value, index) => (
        <input
        key={index}
        type="tel"
        value={value}
        maxLength={1}
        onChange={(e) => handleChange(e, index)}
        onPaste={handlePaste}
        onKeyDown={(e) => handleKeyDown(e, index)}
        ref={(el) => (inputRefs.current[index] = el)}
        className="text-cslategray text-sm font-semibold py-2 px-4 outline-none mt-2 border-cgray rounded-[12px] border h-[50px] w-[50px] for_opt_verify pl-5"
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
        }}
      />      
      ))}
    </div>
  );
};

const OtpComp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const from = location.state?.from;
  const password = location.state?.password;
  const payloadFromSignup = location.state?.payloadFromSignUp;
  const [, updateLoggedIn] = useCookie("maang");
  const updateUser = useUserStore((state) => state.updateUser);

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [finalOtp, setFinalOtp] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));

  const [globalErr, setGlobalErr] = useState(null);

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (!email) {
  //     navigate("/signup");
  //   }

  //   const handleBeforeUnload = (e) => {
  //     const message = "Are you sure you want to leave?";
  //     e.returnValue = message;
  //     return message;
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [email, navigate]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    if (timer <= 1) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (otp) => {
    setGlobalErr(null);
    setFinalOtp(otp);
  };

  const handleSendResetOtp = async () => {
    try {
      const payload = {
        email,
        extra_key: from === "signup" ? "registration" : "login",
      };
      await resendOtp(payload);
      ToastUtils.success("Otp send successfully!");
      setTimer(30);
      setCanResend(false);
      setOtp(Array(6).fill(""))
      setFinalOtp("");
      setGlobalErr('');
    } catch (err) {
      console.log(err);
    }
  };

  const otpHandler = async (e) => {
    setLoading(true);
    setGlobalErr(null);
    e.preventDefault();
    try {
      if (from === "signup") {
        const payload = {
          otp: finalOtp,
          email,
          extra_key: "registration",
          payload: payloadFromSignup,
        };
        const data = await validateOtp(payload);
        if (data.err_code) {
          if (data.err_code === "INVALID_OTP") setGlobalErr("INVALID");
          return;
        }
        navigate("/otpsuccess", {
          state: {
            email,
            from,
          },
        });
      } else if (from === "login") {
        const payload = {
          otp: finalOtp,
          email,
          password,
          extra_key: "registration",
        };
        const respData = await validateOtp(payload);
        updateLoggedIn(respData);
        updateUser(respData);
        ToastUtils.success("Welcome");
        if (respData.user) {
          let instructorCheckResponse = await IsUserValid();
          const role = instructorCheckResponse?.data?.role;
          if (role === "Instructor") {
            window.location.replace("/mentor");
            return;
          }

          if (role === "Student") {
            window.location.replace("/");
            return;
          }
          navigate("/");
        }
      }
    } catch (err) {
      const errResp = err?.response?.data;
      if (errResp) {
        if (errResp.err_code === "INVALID_OTP") {
          setGlobalErr("INVALID");
        } else if (errResp.err_code === "EXPIRED") {
          setGlobalErr("EXPIRED");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col justify-center relative  items-center">
        <form className="p-4  max-auto  flex justify-center items-center  ">
          <div className=" mt-4  w-full md:w-[100%] text-center   ">
            <h4 className=" text-center text-cblack  text-3xl font-semibold ">
              Verify your email OTP
            </h4>{" "}
            {/* <h4 className=" text-center text-cblack  text-3xl font-semibold ">
              Wrong OTP
              </h4>{" "} */}
            {/* <h4 className=" text-center text-cblack  text-3xl font-semibold ">
               OTP time is up
              </h4>{" "} */}
            <p className=" text-sm text-secondary  text-center  font-normal  mt-2 !leading-[1.8]">
              We have send you 6 digit OTP on your email{" "} <br />
              <span className=" text-white text-base font-semibold bg-primary px-1">{email}</span> , <br />
              Please verify your email.
            </p>
            {globalErr === "INVALID" && timer > 0 && (
              <p className=" text-sm text-red-500  text-center  font-normal  mt-2 !leading-[1.8]">
                The OTP you submitted is wrong, please try again.
              </p>
            )}
            {/* <p className=" text-sm text-secondary  text-center  font-normal  mt-2 !leading-[1.8]">
              The OTP you submitted is wrong, please try again.
            </p> */}
            {timer <= 0 && (
              <p className=" text-sm text-red-500  text-center  font-normal  mt-2 !leading-[1.8]">
                OTP time is up
              </p>
            )}
            {globalErr === "EXPIRED" && (
              <p className=" text-sm text-red-500 text-center  font-normal  mt-2 !leading-[1.8]">
                OTP time is up
              </p>
            )}
            {/* <p className=" text-sm text-secondary  text-center  font-normal  mt-2 !leading-[1.8]">
            OTP time is up
              </p> */}
            {/* <p className=" text-sm text-secondary  text-center  font-normal  mt-2 !leading-[1.8]">
           The OTP submition time is up, please try again.
              </p> */}
            <div className=" text-start mt-4">
              <OtpInput length={6} onOtpChange={handleOtpChange} otp={otp} setOtp={setOtp} otpHandler={otpHandler}/>
            </div>
           {!canResend && <p className=" text-sm text-secondary  text-center  font-normal  mt-6 !leading-[1.8]">
              If you didn’t get the OTP you can try request again <br /> after
              {" " + timer} sec.
            </p> }
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSendResetOtp();
              }}
              disabled={!canResend}
              className=" text-sm text-primary  text-center  font-normal  mt-2 disabled:text-gray-400"
            >
              Resend OTP.
            </button>
            <div className=" mt-8 w-full">
              <button
                disabled={loading}
                onClick={(e)=>{
                  if(canResend){
                    e.preventDefault();
                    ToastUtils.warning("Otp time is expired");
                  }else{
                    otpHandler(e)
                  }
                }}
                type="submit"
                className=" bg-black text-white flex justify-center  text-[20px] p-3 font-semibold rounded-full  !w-full  mx-auto disabled:bg-gray-500 gap-3 py-4"
              >
                {loading && <span className="loader"></span>}
                <span>Submit</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default OtpComp;
