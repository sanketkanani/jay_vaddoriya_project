import React, { forwardRef, useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import "./PhoneNumberInput.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import logo from "../../assets/images/logo.png";
import img1 from "../../assets/images/blog/blog1.png";
import img2 from "../../assets/images/blog/blog2.png";
import img3 from "../../assets/images/blog/blog3.png";
import { Link, useNavigate } from "react-router-dom";
import arrowwhite from "../../assets/svg/whiteArrow.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Signup, resendOtp } from "../../services/Auth.service";
import ToastUtils from "../utils/ToastUtils";

const SignupComp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [value, setValue] = useState("");
  const [phoneError, setPhoneError] = useState(null);

  const SignupHandler = async (values, { setSubmitting }) => {
    if (phoneError) {
      setSubmitting(false);
      return;
    }
    try {
      const payload = {
        user: {
          username: values.email,
          email: values.email,
          first_name: values.username.split(" ")[0],
          last_name: values.username.split(" ").slice(1).join(" "),
          password: values.password,
        },
        phone_num: +value.slice(3),
      };

      await Signup(payload);
      setSubmitting(false);
      ToastUtils.success("Verify your mail");
      navigate("/otpvarify", {
        state: { email: values.email, from: "signup" },
      });
    } catch (error) {
      let errResp = error.response.data;

      if (errResp?.err_code?.[0] === "user is not verified.") {
        const payload = {
          email: values.email,
          extra_key: "registration",
        };
        await resendOtp(payload);
        ToastUtils.warning("Verify first please");
        navigate("/otpvarify", {
          state: {
            from: "signup",
            email: values?.email,
            payloadFromSignUp: {
              user: {
                username: values.email,
                email: values.email,
                first_name: values.username.split(" ")[0],
                last_name: values.username.split(" ").slice(1).join(" "),
                password: values.password,
              },
              phone_num: +value.slice(3),
            },
          },
        });
      }

      if (
        errResp?.err_code?.[0] === "A user with that username already exists."
      ) {
        ToastUtils.warning("User already Exists");
        navigate("/login");
      }
      if (error.response.status === 400)
        setError("Email address already in use");
      else setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values, actions) => {
      if (!value || !isValidPhoneNumber(value)) {
        setPhoneError("Phone number is not valid");
        actions.setSubmitting(false);
      } else {
        setPhoneError(null);
        SignupHandler({ ...values, phone: value }, actions);
      }
    },
  });

  return (
    <>
      <div className="flex-1">
        <form className="p-4 w-full" onSubmit={formik.handleSubmit}>
          <div className="flex justify-between items-center">
            <h4 className="text-cblack text-2xl font-semibold">Sign Up</h4>
            <Link
              to="/login"
              className="custom-button border-cblack max-sm:hidden border font-bold"
            >
              Login
            </Link>
          </div>
          <div className="mt-4 max-md:w-[100%] w-[95%]">
            <div className="text-start mt-2">
              <label className="text-base text-cblack font-semibold">
                Full Name*
              </label>
              <input
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                type="text"
                placeholder="Your Full name"
                className="text-cslategray text-sm font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full"
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div className="text-start mt-2">
              <label className="text-base text-cblack font-semibold">
                Email*
              </label>
              <input
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                type="text"
                placeholder="Your Full Email"
                className="text-cslategray text-sm font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="text-start mt-2">
              <label className="text-base text-cblack font-semibold">
                Phone
              </label>
              <PhoneInput
                name="phone"
                placeholder="Your Full Number"
                value={value}
                onChange={(value) => {
                  console.log(value);
                  setValue(value);
                  if (value && isValidPhoneNumber(value)) {
                    setPhoneError(null);
                  } else {
                    setPhoneError("Phone number is not valid");
                  }
                }}
              />
              {phoneError ? (
                <div className="text-red-500 text-sm mt-1">{phoneError}</div>
              ) : null}
            </div>
            <div className="text-start mt-2">
              <label className="text-base text-cblack font-semibold">
                Password*
              </label>
              <input
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                type="password"
                placeholder="Your Full password"
                className="text-cslategray text-sm font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="text-start mt-2">
              <label className="text-base text-cblack font-semibold">
                Confirm Password*
              </label>
              <input
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                type="password"
                placeholder="Your Full Confirm Password*"
                className="text-cslategray text-sm font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div className="mt-4">
              <button
                disabled={
                  phoneError ||
                  !!formik.errors.username ||
                  !!formik.errors.email ||
                  !!formik.errors.password ||
                  !!formik.errors.confirmPassword ||
                  !!formik.isSubmitting
                }
                type="submit"
                className="flex bg-black text-white custom-button w-full mx-auto cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500 gap-3"
              >
                {formik.isSubmitting && <span className="loader"></span>}
                <span>Create an account</span>
              </button>
            </div>
            <div className="mt-4 text-sm text-secondary font-semibold">
              Already have an account?{" "}
              <Link to="/login" className="text-primary ml-2">
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupComp;
