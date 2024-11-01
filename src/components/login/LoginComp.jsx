import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Login,
} from "../../services/Auth.service";
import { useCookie } from "react-use";
import { useUserStore } from "../../store/store";
import { handleAxiosError } from "../utils/HandleAxiosError";
import ToastUtils from "../utils/ToastUtils";
import axiosInstance from "../../services/config/ApiConfig";
import { ApiBaseURL } from "../../services/config/Endpoints";

const LoginComp = () => {
  const navigate = useNavigate();
  const [, updateLoggedIn] = useCookie("maang");
  const [error, setError] = useState(null);
  const updateUser = useUserStore((state) => state.updateUser);

  const LoginHandler = async (values, { setSubmitting }) => {
    try {
      const payload = {
        username: values.email,
        password: values.password,
      };
      const data = await Login(payload);
      updateLoggedIn(data);
      updateUser(data);
      ToastUtils.success("Welcome");
      if (data.user) {
        let instructorCheckResponse = await axiosInstance.get(
          `${ApiBaseURL}test-management/user-valid-check/`,
          {
            headers: {
              Authorization: `Token ${data.token}`,
            },
          }
        );        
        const role = instructorCheckResponse?.data?.role;
        if (role === "Instructor") {
          window.location.replace("/mentor");
          return;
        } else if (role === "Student") {
          window.location.replace("/");
          return;
        } else {
          window.location.replace("/login");
        }
      }
    } catch (err) {
      handleAxiosError(setError, err);
      const errData = err?.response?.data;
      if (errData?.err_code?.[0] === "not_verified") {
        ToastUtils.warning("Please verify your account.");
        navigate("/otpvarify", {
          state: {
            from: "login",
            email: values.email,
            password: values.password,
          },
        });
      } else if (errData?.err_code?.[0] === "Incorrect Credentials") {
        ToastUtils.warning("Wrong credentials");
      } else if (errData?.err_code?.[0] === "User Does not exists") {
        ToastUtils.warning("User does not exist");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .test("is-valid-email-or-username", "Invalid email or username", (value) => {
          // Check if the value is either a valid email or a valid username
          const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
          return emailRegex.test(value) || value.length >= 3; // Valid email or username of length >= 3
        }),
      password: Yup.string().required("Required"),
    }),
    onSubmit: LoginHandler,
  });

  return (
    <>
      <div className="flex justify-between items-center absolute top-5 right-0">
        <Link
          to="/signup"
          className="custom-button ml-auto max-sm:hidden border-cblack border font-bold"
        >
          Sign Up
        </Link>
      </div>
      <form
        className="p-4 lg:w-[80%] md:w-[95%]"
        onSubmit={formik.handleSubmit}
      >
        <div className="mt-4">
          <h4 className="text-start text-cblack text-2xl font-semibold">
            Log In
          </h4>
          {error && (
            <p className="text-base text-[#D83939] text-start font-normal mt-2">
              {error?.non_field_errors?.[0]}
            </p>
          )}
          <div className="text-start mt-2">
            <label className="text-base text-cblack font-semibold">
              Email or Username*
            </label>
            <input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="text"
              placeholder="Your Email or Username"
              className={`text-cslategray text-sm font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full ${
                formik.errors.email && formik.touched.email ? "border-red-500" : ""
              }`}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
            )}
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
              placeholder="Your Password"
              className={`text-cslategray text-sm font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full ${
                formik.errors.password && formik.touched.password ? "border-red-500" : ""
              }`}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-xs">{formik.errors.password}</p>
            )}
          </div>
        </div>
        <div className="mt-[10px]">
          <Link
            to="/resetpassword"
            className="text-[#2DB2C4] text-sm font-medium w-full flex justify-end !p-0"
          >
            Reset your password.
          </Link>
        </div>
        <div className="mt-4">
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className="bg-black text-white custom-button w-full mx-auto disabled:bg-gray-500 gap-3"
          >
            {formik.isSubmitting && <span className="loader"></span>}
            <span>Login</span>
          </button>
        </div>
        <div className="mt-4 text-sm text-secondary font-semibold">
          Don’t have an account?
          <Link to="/signup" className="text-primary ml-2">
            Signup
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginComp;
