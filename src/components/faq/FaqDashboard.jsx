import React, { useState } from "react";
import payment from "../../assets/svg/faq/payemet.svg";
import corse from "../../assets/svg/faq/course.svg";
import Privacy from "../../assets/svg/faq/primary.svg";
import people from "../../assets/svg/faq/people.svg";
import wave from "../../assets/svg/wave.svg";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import ring from "../../assets/svg/circle.svg";

const FaqDashboard = () => {
  const [clickItem, setClickItem] = useState("general");

  // Content for the General section
  const generalContent = (
    <div>
      <h4 className="font-medium text-xl mb-4 flex gap-2 max-md:hidden">
        <img src={payment} alt="" />
        General
      </h4>
      <Accordion transition transitionTimeout={200}>
        <AccordionItem
          itemKey={"what-is-maang-careers"}
          key={"what-is-maang-careers"}
          header={<>What is MAANG Careers?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            MAANG Careers is a specialized EdTech platform aimed at preparing
            students and professionals for high-paying jobs in MAANG companies
            (Meta, Amazon, Apple, Netflix, Google) and other top IT firms. We
            offer tailored courses designed to enhance coding skills and
            interview readiness.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"type-of-courses"}
          key={"type-of-courses"}
          header={<>What type of courses do you offer?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            We offer Fast-Track and Alpha programs focused on coding, algorithm
            design, and interview preparation, specifically tailored to help you
            crack job interviews at top-tier tech companies.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"course-eligibility"}
          key={"course-eligibility"}
          header={<>Who is eligible to take these courses?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            Our courses are open to anyone with a passion for software
            development. Fast-Track programs are ideal for pre-final year
            students, while the Alpha program is more suited for final-year
            students, recent graduates, and working professionals.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"maang-vs-other-platforms"}
          key={"maang-vs-other-platforms"}
          header={<>How is MAANG Careers different from other platforms?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            We provide a unique learning experience with a focus on high-impact
            coding patterns and hand-picked questions. Our courses are designed
            by industry experts and offer practical, real-world preparation for
            MAANG company interviews.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"student-support"}
          key={"student-support"}
          header={<>What support do you provide to students?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            We offer comprehensive support through personalized mentoring, mock
            interviews, and job referrals, ensuring that our students are
            well-prepared to secure high-paying jobs in the tech industry.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"balancing-course"}
          key={"balancing-course"}
          header={
            <>
              Can I balance these courses with my academic or work commitments?
            </>
          }
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            Yes, our courses are designed to be flexible, allowing students and
            working professionals to balance their studies or jobs with their
            coding preparation.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  );

  const courseContent = (
    <div>
      <h4 className="font-medium text-xl mb-4 flex gap-2 max-md:hidden">
        <img src={corse} alt="" />
        Courses
      </h4>
      <Accordion transition transitionTimeout={200}>
        <AccordionItem
          itemKey={"maximize-course-benefit"}
          key={"maximize-course-benefit"}
          header={<>How do I get the most out of the course?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            To maximize the benefits of the course, actively engage with the
            practice exercises, quizzes, and mock tests available in the student
            portal. You’ll have the opportunity to complete up to 350 coding
            questions, which will significantly enhance your preparation.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"course-structure"}
          key={"course-structure"}
          header={<>What is the structure of the course?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            Our courses are divided into modules that cover 30+ unique coding
            patterns and 500+ carefully selected questions. The entire
            curriculum is designed to be completed in 3 to 4 months. For more
            detailed information, visit our courses page to explore the
            syllabus.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"course-type"}
          key={"course-type"}
          header={<>Are the courses self-paced or instructor-led?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            We offer only instructor-led courses. However, after the classes,
            you can practice the questions explained by the mentor and solve
            more related practice questions in your student portal to get the
            best out of the course.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"access-materials"}
          key={"access-materials"}
          header={<>How do I access course materials?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            All course materials, including lectures, assignments, and quizzes,
            are available through our student portal. Once enrolled, you’ll
            receive login credentials to access all resources.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"job-guarantee"}
          key={"job-guarantee"}
          header={
            <>
              Is there a guarantee of landing a MAANG job after completing the
              course?
            </>
          }
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            We provide job referrals to students who excel in their mock
            interviews and complete at least 90% of the coding exercises with a
            high pass percentage.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"switch-course"}
          key={"switch-course"}
          header={<>Can I switch courses after enrolling?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            Yes, students can request to switch courses within the first week of
            enrollment if they feel another course is a better fit for their
            goals.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  );

  // Content for the Payments section
  const paymentContent = (
    <div>
      <h4 className="font-medium text-xl mb-4 flex gap-2 max-md:hidden">
        <img src={payment} alt="" />
        Payments
      </h4>
      <Accordion transition transitionTimeout={200}>
        <AccordionItem
          itemKey={"payment-methods"}
          key={"payment-methods"}
          header={<>What payment methods do you accept?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            We accept payments via credit/debit cards, net banking, UPI, and
            popular digital wallets. Payment options will be provided at
            checkout.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"payment-plans"}
          key={"payment-plans"}
          header={<>Are there any payment plans available?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            Yes, we offer flexible payment plans, including EMI options, to make
            our courses more accessible to all students.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"scholarships-discounts"}
          key={"scholarships-discounts"}
          header={<>Do you offer scholarships or discounts?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            Yes, we offer scholarships and discounts based on performance in our
            coding tests and interviews. These opportunities are merit-based and
            designed to reward talent.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"refund-policy"}
          key={"refund-policy"}
          header={<>Can I get a refund if I’m not satisfied with the course?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            We offer a refund policy within the first 7 days of course
            commencement, provided you have not accessed more than 10% of the
            course content.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"hidden-fees"}
          key={"hidden-fees"}
          header={<>Are there any hidden fees?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            No, we believe in transparency. All fees are clearly listed at the
            time of payment, and there are no hidden charges.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"payment-receipt"}
          key={"payment-receipt"}
          header={<>How do I get a receipt for my payment?</>}
          className="text-cblack my-3 border-b border-cborder pb-2 2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            A digital receipt will be emailed to you immediately after the
            payment is processed.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  );

  // Content for the Privacy section
  const privacyContent = (
    <div>
      <h4 className="font-medium text-xl mb-4 flex gap-2 max-md:hidden">
        <img src={people} alt="" />
        Privacy
      </h4>
      <Accordion transition transitionTimeout={200}>
        <AccordionItem
          itemKey={"privacy1"}
          key={"privacy1"}
          header={<>What personal information do you collect?</>}
          className="text-cblack  my-3 border-b border-cborder pb-2   2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            We collect basic personal information, such as your name, email
            address, and phone number, to create your account and process
            transactions securely.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"privacy2"}
          key={"privacy2"}
          header={<>How is my personal information used?</>}
          className="text-cblack  my-3 border-b border-cborder pb-2   2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            Your personal information is used to manage your account, process
            payments, and provide you with course access. We do not share your
            data with third parties without your consent.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"privacy3"}
          key={"privacy3"}
          header={<>Is my data secure?</>}
          className="text-cblack  my-3 border-b border-cborder pb-2   2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            Yes, we prioritize data security and use encryption and other
            advanced security measures to protect your personal information.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"privacy4"}
          key={"privacy4"}
          header={<>Can I delete my account?</>}
          className="text-cblack  my-3 border-b border-cborder pb-2   2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            Yes, you can request to delete your account at any time. Please note
            that deleting your account will remove all your course progress and
            access to the student portal.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"privacy5"}
          key={"privacy5"}
          header={<>How do you handle my payment information?</>}
          className="text-cblack  my-3 border-b border-cborder pb-2   2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            Payment information is processed through secure payment gateways. We
            do not store your credit card details on our servers.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"privacy6"}
          key={"privacy6"}
          header={<>Will I receive marketing emails after signing up?</>}
          className="text-cblack  my-3 border-b border-cborder pb-2   2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            You can opt-in to receive updates and offers from us during
            registration. You can unsubscribe from marketing emails at any time
            through your account settings.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  );

  // Content for the Contact Us section
  const contactContent = (
    <div>
      <h4 className="font-medium text-xl mb-4 flex gap-2 max-md:hidden">
        <img src={Privacy} alt="" />
        Contact Us
      </h4>

      <Accordion transition transitionTimeout={200}>
        <AccordionItem
          itemKey={"contact1"}
          key={"contact1"}
          header={<>How can I contact customer support?</>}
          className="text-cblack  my-3 border-b border-cborder pb-2   2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            You can reach our customer support team via email at
            support@maangcareers.com or click on the "Contact Us" button to fill
            in your details so our agent can reach out to you as soon as
            possible.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"contact2"}
          key={"contact2"}
          header={<>What is the response time for support queries?</>}
          className="text-cblack  my-3 border-b border-cborder pb-2   2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            Our support team typically responds to queries within 24 hours. For
            urgent issues, WhatsApp live chat offers immediate assistance.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"contact3"}
          key={"contact3"}
          header={<>Can I request a callback from your support team?</>}
          className="text-cblack  my-3 border-b border-cborder pb-2   2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            Yes, you can request a callback by filling out a form on our contact
            page. Our team will get back to you within 1-2 business days.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"contact4"}
          key={"contact4"}
          header={<> Where can I find the latest updates and announcements?</>}
          className="text-cblack  my-3 border-b border-cborder pb-2   2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            Stay updated by following our blog, social media channels (Instagram
            and LinkedIn), and checking the announcements section on the student
            portal.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"contact5"}
          key={"contact5"}
          header={<>How do I provide feedback about the course?</>}
          className="text-cblack  my-3 border-b border-cborder pb-2   2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            We value your feedback! You can submit your course feedback through
            the feedback form available on the student portal, or email us
            directly.
          </p>
        </AccordionItem>
        <AccordionItem
          itemKey={"contact6"}
          key={"contact6"}
          header={<>Is there a physical office I can visit?</>}
          className="text-cblack  my-3 border-b border-cborder pb-2   2xl:text-2xl font-medium max-2xl:text-lg"
        >
          <p className="text-secondary font-normal">
            Yes, we have a physical office located at Mahadevapura, Bangalore,
            India. You can visit us for in-person consultations. Please schedule
            an appointment in advance.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div className="faq_main_page_body overflow-hidden relative ">
      <section className="sub-section py-10 grid grid-cols-12  gap-4">
        <div className="col-span-4 max-md:col-span-12   ">
          <ul className="text-start max-md:max-w-full   bg-white custom-shadow !rounded-2xl">
            <Accordion>
              <AccordionItem
                style={{
                  marginTop: "0px",
                  paddingBottom: "0px",
                }}
                header={
                  <li
                    style={{
                      borderBottom: "1px solid #E7E7E7",
                    }}
                    className={`2xl:text-2xl  px-5 flex gap-2 w-full items-center px-5 py-4 rounded-2xl font-medium max-2xl:text-base   ${
                      clickItem === "general"
                        ? "text-white bg-primary"
                        : "text-secondary"
                    } cursor-pointer`}
                    onClick={() => setClickItem("general")}
                  >
                    <img
                      src={payment}
                      alt=""
                      className=""
                      style={{
                        filter: clickItem === "general" && "brightness(100)",
                      }}
                    />
                    <h4>General</h4>
                  </li>
                }
              >
                <div style={{ padding: "10px" }} className="md:hidden">
                  {generalContent}
                </div>
              </AccordionItem>
              <AccordionItem
                style={{
                  marginTop: "0px",
                  paddingBottom: "0px",
                }}
                header={
                  <li
                    style={{
                      borderBottom: "1px solid #E7E7E7",
                    }}
                    className={`2xl:text-2xl flex px-5 gap-2 w-full items-center px-5 py-4 rounded-2xl font-medium max-2xl:text-base   ${
                      clickItem === "course"
                        ? "text-white bg-primary"
                        : "text-secondary"
                    } cursor-pointer`}
                    onClick={() => setClickItem("course")}
                  >
                    <img
                      src={corse}
                      alt=""
                      style={{
                        filter: clickItem === "course" && "brightness(100)",
                      }}
                    />
                    <h4>Course</h4>
                  </li>
                }
              >
                <div style={{ padding: "10px" }} className="md:hidden">
                  {courseContent}
                </div>
              </AccordionItem>
              <AccordionItem
                style={{
                  marginTop: "0px",
                  paddingBottom: "0px",
                }}
                header={
                  <li
                    style={{
                      borderBottom: "1px solid #E7E7E7",
                    }}
                    className={`2xl:text-2xl px-5 flex gap-2 w-full items-center px-5 py-4 rounded-2xl font-medium max-2xl:text-base   ${
                      clickItem === "payments"
                        ? "text-white bg-primary"
                        : "text-secondary"
                    } cursor-pointer`}
                    onClick={() => setClickItem("payments")}
                  >
                    <img
                      src={payment}
                      alt=""
                      style={{
                        filter: clickItem === "payments" && "brightness(100)",
                      }}
                    />
                    <h4>Payments</h4>
                  </li>
                }
              >
                <div style={{ padding: "10px" }} className="md:hidden">
                  {paymentContent}
                </div>
              </AccordionItem>
              <AccordionItem
                style={{
                  marginTop: "0px",
                  paddingBottom: "0px",
                }}
                header={
                  <li
                    style={{
                      borderBottom: "1px solid #E7E7E7",
                    }}
                    className={`2xl:text-2xl px-5 flex gap-2 w-full items-center px-5 py-4 rounded-2xl font-medium max-2xl:text-base   ${
                      clickItem === "privacy"
                        ? "text-white bg-primary"
                        : "text-secondary"
                    } cursor-pointer`}
                    onClick={() => setClickItem("privacy")}
                  >
                    <img
                      src={people}
                      alt=""
                      style={{
                        filter: clickItem === "privacy" && "brightness(100)",
                      }}
                    />
                    <h4>Privacy</h4>
                  </li>
                }
              >
                <div style={{ padding: "10px" }} className="md:hidden">
                  {privacyContent}
                </div>
              </AccordionItem>
              <AccordionItem
                style={{
                  marginTop: "0px",
                  paddingBottom: "0px",
                }}
                header={
                  <li
                    className={`2xl:text-2xl flex px-5 gap-2 w-full items-center px-5 py-4 rounded-2xl font-medium max-2xl:text-base   ${
                      clickItem === "contact"
                        ? "text-white bg-primary"
                        : "text-secondary"
                    } cursor-pointer`}
                    onClick={() => setClickItem("contact")}
                  >
                    <img
                      src={Privacy}
                      alt=""
                      style={{
                        filter: clickItem === "contact" && "brightness(100)",
                      }}
                    />
                    <h4>Contact Us</h4>
                  </li>
                }
              >
                <div style={{ padding: "10px" }} className="md:hidden">
                  {contactContent}
                </div>
              </AccordionItem>
            </Accordion>
          </ul>
        </div>

        <div className="col-span-8 max-md:col-span-12 text-start  custom-shadow p-12 rounded-2xl max-md:hidden">
          {clickItem === "general" && generalContent}
          {clickItem === "course" && courseContent}
          {clickItem === "payments" && paymentContent}
          {clickItem === "privacy" && privacyContent}
          {clickItem === "contact" && contactContent}
        </div>

        <span className="glow_elements_con right-0 top-28 max-md:hidden"></span>
        <img
          src={wave}
          alt=""
          className=" absolute left-0  bottom-0 max-md:hidden"
        />
      </section>

      <img
        src={ring}
        alt=""
        className="absolute -left-10 top-8 max-md:hidden"
      />
      <img
        src={ring}
        alt=""
        className="absolute -right-8 bottom-8 max-md:hidden"
      />
    </div>
  );
};

export default FaqDashboard;
