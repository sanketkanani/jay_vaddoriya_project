import React, { useState } from "react";
import logo from "../../assets/svg/footerlogo.svg";
import facebook from "../../assets/svg/socialmedia/facebook.svg";
import twitter from "../../assets/svg/socialmedia/twitter.svg";

import insta from "../../assets/svg/socialmedia/instagram.svg";
import linkdien from "../../assets/svg/socialmedia/linkdien.svg";
import youtube from "../../assets/svg/socialmedia/youtube.svg";
import fromImg from "../../assets/request-img.png";
import { Link, useLocation } from "react-router-dom";
import { CreateContact } from "../../services/Home.service";
import Swal from "sweetalert2";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  const videoLink =
    "https://videos.pexels.com/video-files/3209298/3209298-uhd_2560_1440_25fps.mp4";
  const videoLink2 =
    "https://cdn.pixabay.com/video/2020/01/05/30902-383991325_large.mp4";

  const location = useLocation();
  // State for form inputs and validation errors
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation function
  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid";
    }
    if (!formData.phone.trim()) {
      formErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      formErrors.phone = "Phone number should be 10 digits";
    }
    if (!formData.university.trim())
      formErrors.university = "University name is required";
    if (!formData.location.trim()) formErrors.location = "Location is required";

    setErrors(formErrors);
    setTimeout(() => {
      setErrors({});
    }, 2000);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      let response = await CreateContact(formData);
      console.log("========= response ===== ", response);
      document.getElementById("modal").classList.add("hidden");
      Swal.fire({
        title: "Successfully Submited",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay",
      }).then((result) => {
        if (result.isConfirmed) {
          setFormData({
            name: "",
            email: "",
            phone: "",
            university: "",
            location: "",
          });
        }
      });
    }
  };

  const removeFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/resetpassword" ||
    location.pathname === "/createpassword" ||
    location.pathname === "/resetsuccess" ||
    location.pathname === "/otpsuccess" ||
    location.pathname === "/otpvarify";

  if (removeFooter) {
    return null;
  }
  return (
    <>
      <div className=" bg-cnavy pt-28 pb-8">
        <div className="sub-section max-sm:text-base xl:text-base text-base text-start text-cgray font-normal border-b border-secondary pb-5 !w-[100%] footer_list_main">
          <div className="lg:grid-cols-5 xl:w-[88%] w-[96%] grid grid-cols-1 md:grid-cols-2 m-auto">
            <div className="max-lg:col-span-full">
              <ul className="!my-0 w-full">
                <img src={logo} alt="" className="text-xl" />
                <li className="my-4">
                  Explore the Limits MAANG Careers (OPC) Private Limited
                </li>
                <li className="flex gap-2 my-4">
                  <div className="border border-primary py-2 px-2 rounded-full">
                    <a
                      href="https://www.facebook.com/MaangCareers"
                      target="_blank"
                    >
                      <img src={facebook} alt="" />
                    </a>
                  </div>
                  <div className="border border-primary py-2 px-2 rounded-full">
                    <a href="https://twitter.com/CareersMaang" target="_blank">
                      <img src={twitter} alt="" />
                    </a>
                  </div>
                  <div className="border border-primary py-2 px-2 rounded-full">
                    <a
                      href="https://www.instagram.com/maang_careers/"
                      target="_blank"
                    >
                      <img src={insta} alt="" />
                    </a>
                  </div>
                  <div className="border border-primary py-2 px-2 rounded-full">
                    <a
                      href="https://www.linkedin.com/company/maang-careers/"
                      target="_blank"
                    >
                      <img src={linkdien} alt="" />
                    </a>
                  </div>
                  <div className="border border-primary py-2 px-2 rounded-full">
                    <a
                      href="https://www.youtube.com/channel/UCxjnOZ_xZFV9OAlvensnTLw"
                      target="_blank"
                    >
                      <img src={youtube} alt="" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <ul className="md:mx-auto max-md:mt-8 lg:w-[60%] m-auto ">
                <Link to="/" className="text-xl text-white font-medium">
                  Website
                </Link>
                <li className="my-4">
                  <Link to="/">Home</Link>
                </li>
                <li className="my-4">
                  <Link to="/Program">Programs</Link>
                </li>
                <li className="my-4">
                  <Link to="/course">All Courses</Link>
                </li>
                <li className="my-4">
                  {location.pathname === "/" ? (
                    <HashLink smooth to="#mentors">
                      Mentors
                    </HashLink>
                  ) : (
                    <Link to="/">Mentors</Link>
                  )}
                </li>
                <li className="my-4">
                  <Link to="/blog">Blogs</Link>
                </li>
                <li className="my-4">
                  <Link to="/faq">FAQ's</Link>
                </li>
                <li className="my-4">
                  {/* <Link to="/contest1">Contest</Link> */}
                  <Link to="#">Contest</Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="md:mx-auto max-md:mt-8">
                <li className="text-xl text-white font-medium">Company</li>
                <li className="my-4">
                  <Link to="/about">About Us</Link>
                </li>
                <li className="my-4">
                  <Link to="/works">How it works</Link>
                </li>
                <li className="my-4">
                  {location.pathname === "/" ? (
                    <HashLink smooth to="#media">
                      Media Coverage
                    </HashLink>
                  ) : (
                    <Link to="/">Media Coverage</Link>
                  )}
                </li>
                <li className="my-4" placement>
                  {location.pathname === "/" ? (
                    <HashLink smooth to="#placement">
                      Placement Story Videos
                    </HashLink>
                  ) : (
                    <Link to="/">Placement Story Videos</Link>
                  )}
                </li>
                <li className="my-4" placement>
                  {location.pathname === "/" ? (
                    <HashLink smooth to="#testimonial">
                      Testimonials
                    </HashLink>
                  ) : (
                    <Link to="/">Testimonials</Link>
                  )}
                </li>
                <li className="my-4">
                  <Link to="#">Career Portal</Link>
                  {/* <Link to="/careerportal">Career Portal</Link> */}
                </li>
                <li className="my-4">
                  {/* <Link to="/careerportal">Become an Instructor</Link> */}
                  <Link to="#">Become an Instructor</Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="md:mx-auto max-lg:mt-6">
                <li className="text-xl text-white font-medium">Legal</li>
                <li className="my-4">
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li className="my-4">
                  <Link to="/terms-condition">Terms and Conditions</Link>
                </li>
                <li className="my-4">
                  <Link to="/return">Return and Refund Policy</Link>
                </li>
                <li className="my-4">
                  <Link to="/shipping">Shipping & Delivery Policy</Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="md:ml-auto max-lg:mt-6">
                <li className="text-xl text-white font-medium">Contact Us</li>
                <li className="my-4">
                  <a href="tel:+91-6363092823">Customer Care: +91-6363092823</a>
                </li>
                <li className="my-4">
                  <a href="tel:+91-9182513789">
                    Business Enquiries: +91-9182513789
                  </a>
                </li>
                <li className="my-4">
                  <a href="mailto:support@maangcareers.com">
                    Email Us: support@maangcareers.com
                  </a>
                </li>
                <li className="my-4">
                  91springboard, ITPL Main Rd, Garudachar Palya, Mahadevapura,
                  Bengaluru, Karnataka, 560048
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="  text-lg text-[#B5B5B5] font-medium  p-3">
          <h1 className=" py-auto mt-5">
            {" "}
            © 2023 MAANG Careers (OPC) Private Limited. All rights reserved.
          </h1>
        </div>
      </div>

      <div
        id="videoModalPlayHome"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden z-50 videoModalPlayHome_class"
      >
        <div className="bg-white p-5 rounded-lg relative video_modal_wrapper">
          <button
            className="absolute text-black w-8 bg-primary text-white h-8 rounded-full -right-4 -top-2 text-lg p-0"
            onClick={() => {
              const videoModal = document.getElementById("videoModalPlayHome");
              const video = videoModal.querySelector("video");
              video.pause();
              video.currentTime = 0;
              videoModal.classList.add("hidden");
            }}
          >
            &times;
          </button>
          <video width="100%" controls>
            <source src={videoLink2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div
        id="modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden request_call_modal_main z-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg relative modal_main_wrapper z-30">
          <div className="from_wrapper text-left w-[50%]">
            <div className="inner_from_wrapper p-6">
              <div className="heading text-center">
                <h2 className="text-3xl font-bold mb-4">Request a Call Back</h2>
                <p className="mb-4 text-sm" style={{ color: "#494949" }}>
                  Simplify your workflow and boost your productivity with{" "}
                  <span className="font-semibold">MAANG Careers</span>. Get
                  started for free.
                </p>
              </div>
              <div className="form_holder mt-5">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      className="border p-2 w-full"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="border p-2 w-full"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      name="phone"
                      className="border p-2 w-full"
                      placeholder="Enter your number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="university"
                      className="border p-2 w-full"
                      placeholder="University name here"
                      value={formData.university}
                      onChange={handleChange}
                    />
                    {errors.university && (
                      <p className="text-red-500 text-sm">
                        {errors.university}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="location"
                      className="border p-2 w-full"
                      placeholder="Enter your location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                    {errors.location && (
                      <p className="text-red-500 text-sm">{errors.location}</p>
                    )}
                  </div>
                  <button
                    className="absolute text-black w-8 bg-primary text-white h-8 rounded-full -right-4 -top-2 text-lg p-0"
                    onClick={(event) => {
                      event.preventDefault(); // Prevent any default action
                      document.getElementById("modal").classList.add("hidden");
                    }}
                  >
                    &times;
                  </button>
                  <div className="flex justify-end mt-4">
                    <input
                      type="submit"
                      value="Submit"
                      className="bg-primary text-white px-4 py-2 rounded w-full cursor-pointer"
                    />
                  </div>
                </form>
              </div>
              <div>
                <p className="text-black text-sm text-center mt-6">
                  Not a member?{" "}
                  <Link to="/signup" className="" style={{ color: "#2DB2C4" }}>
                    Register now
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="form_img_wrapper p-7 w-[50%]">
            <div>
              <img src={fromImg} alt="" className="" />
            </div>
            <div className="text text-center mt-14">
              Make your work easier and organized <br /> with{" "}
              <span className="text-black font-semibold">MAANG Careers</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
