import React from "react";
import img from "../../assets/images/contactleft.png";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CreateContact } from "../../services/Home.service";
import contactTopelements from "../../assets/contact_elements.svg";
import contactBottomelements from "../../assets/contact_elements-bottom.svg";
import contactBtnIcon from "../../assets/contact-btn-icon.svg";

const ContactForm = () => {
  const navigate = useNavigate();

  const submitHandler = async (values, { setSubmitting }) => {
    try {
      const {
        email,
        phone: phone_number,
        location,
        firstName,
        lastName,
        message,
      } = values;

      const payload = {
        email,
        name: `${firstName} ${lastName}`,
        message,
        location,
        phone_number,
      };

      await CreateContact(payload);
      navigate("/detailsubmit");
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      location: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .max(10, "Phone number must be less than 10 characters"),
      location: Yup.string().required("Location is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: submitHandler,
  });

  return (
    <section
      className="contact_us_main_page pt-16 relative"
      style={{
        background:
          "linear-gradient(rgb(45 124 196 / 4%) 0%, rgba(45, 151, 196, 0) 100%)",
        marginTop: "0",
      }}
    >
      <div className="2xl:sub-section w-[95%] mx-auto relative z-10 md:pt-[5rem] pt-[3rem]">
        <div
          className="flex  max-sm:flex-col justify-between gap-10 mx-auto "
          style={{ alignItems: "center" }}
        >
          <div className="text-start relative flex-1">
            <img src={img} alt="Contact" className="  w-ful  " />
            <div className="absolute top-0 left-24">
              <h4 className="2xl:text-4xl md:text-3xl text-cblack font-semibold">
                Contact Us
              </h4>
              <h3 className="2xl:text-xl md:text-sm md:w-[80%] text-secondary font-normal">
                Any question? We would be happy to help you!
              </h3>
            </div>
          </div>
          <div className="h-[100%]  border-cborder h-full flex-1 max-md:border-0">
            <form
              onSubmit={formik.handleSubmit}
              className="md:w-10/12 lg:pl-16   max-md:pl-0"
            >
              <div className="flex gap-2 flex-wrap xl:flex-nowrap">
                <div className="text-start w-full">
                  <label className="2xl:text-xl md:text-base text-cslategray font-semibold">
                    First Name:
                  </label>
                  <input
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder="Your first name"
                    className="2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-md border w-full"
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div className="text-start w-full">
                  <label className="2xl:text-xl md:text-base text-cslategray font-semibold">
                    Last Name:
                  </label>
                  <input
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder="Your last name"
                    className="2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-md border w-full"
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.lastName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex gap-5 mt-2 flex-wrap xl:flex-nowrap">
                <div className="text-start w-full">
                  <label className="2xl:text-xl md:text-base text-cslategray font-semibold">
                    Phone:
                  </label>
                  <input
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder="Your Number"
                    className="2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-md border w-full"
                    maxLength={10}
                    onInput={(e) =>
                      (e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..*?)\..*/g, "$1")
                        .replace(/^0[^.]/, "0"))
                    }
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>
                <div className="text-start w-full">
                  <label className="2xl:text-xl md:text-base text-cslategray font-semibold">
                    Location:
                  </label>
                  <input
                    name="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder="Your Address"
                    className="2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-md border w-full"
                  />
                  {formik.touched.location && formik.errors.location ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.location}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="text-start mt-2">
                <label className="2xl:text-xl md:text-base text-cslategray font-semibold">
                  Email:
                </label>
                <input
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="email"
                  placeholder="youremail@email.com"
                  className="2xl:text-base md:text-xs font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-md border w-full"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="text-start mt-2">
                <label className="2xl:text-xl md:text-base text-cslategray font-semibold">
                  Message:
                </label>
                <textarea
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  cols="30"
                  rows="4"
                  placeholder="Type your message here..."
                  className="2xl:text-base md:text-xs resize-none font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-md border w-full"
                ></textarea>
                {formik.touched.message && formik.errors.message ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.message}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className=" custom-button text-white bg-primary !rounded-md w-full mt-2 flex justify-center gap-4"
              >
                Send Message
                <span>
                  <img src={contactBtnIcon} alt="" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <img
        src={contactTopelements}
        alt="Contact Top Elements"
        className="absolute top-[18%] right-0 w-36 max-lg:hidden"
      />
      <img
        src={contactBottomelements}
        alt="Contact Bottom Elements"
        className="absolute md:bottom-[0%] left-0 w-[300px] max-lg:hidden"
      />
      <span className="glow_elements_con absolute -left-20 top-14 max-lg:hidden"></span>
      <span className="glow_elements_con absolute -right-20 bottom-4 max-lg:hidden"></span>
    </section>
  );
};

export default ContactForm;
