import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useCookie } from "react-use";
import jsPDF from "jspdf";
// import format from "date-fns";
import { Grid } from "@mui/material";
import ReportTemplate from "../ReportTemplate";
import { format } from "date-fns";
import { DUMMY_CERTIFICATES } from "../../../utils/index";
import { ApiBaseURL } from "../../../services/config/Endpoints";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import ht from "date-fns/esm/locale/ht/index.js";
import ReportTemplate3 from "../ReportTemplate2";
import ReportTemplate4 from "../ReportTemplate3";
// import { ApiBaseURL } from "../../ApiConfig";

const tags = ["Interview Preparation Course", "Course Name 2", "Course Name 3"];

const CertificateCard = () => {
  const isAllowdFilter = false;
  const reportTemplateRef = useRef(null);
  const reportTemplateRef1 = useRef(null);
  const reportTemplateRef2 = useRef(null);

  const [tag, setTag] = useState("Interview Preparation Course");
  const [loggedIn] = useCookie("maang");
  const [certificates, setCertificates] = useState([]);
  const [info, setInfo] = useState();
  const [studName, setStudName] = useState("");
  const userData = JSON.parse(loggedIn);

  useEffect(() => {
    if (loggedIn) {
      fetch(
        `${ApiBaseURL}course-management/list-certificates`,
        {
          headers: {
            Authorization: `Token ${userData.token}`,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const certificateList =
            data && data.length > 0 ? data : DUMMY_CERTIFICATES;
          setCertificates(certificateList);

          //set student full name for certificate
          const first_name = userData?.user?.first_name || "";
          const last_name = userData?.user?.last_name || "";
          setStudName(`${first_name} ${last_name}`);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const Tags = () => {
    return (
      <>
        <div className="certificate-tags">
          {tags.map((tagName) => (
            <div
              key={tagName}
              className={tagName === tag ? "active-tag" : ""}
              onClick={() => setTag(tagName)}
            >
              <span>{tagName}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  const handleGeneratePdf = () => {
    const certificate = document.getElementById("certificate");
    var opt = {
      jsPDF: { unit: 'pt', format: 'letter', orientation: 'landscape' }
    };
    html2pdf().from(certificate).set(opt).save("Alpha-Intership-Certificate.pdf");
  };

  const handleGeneratePdf1 = () => {
    const certificate = document.getElementById("certificate2");
    var opt = {
      jsPDF: { unit: 'pt', format: 'letter', orientation: 'landscape' }
    };
    html2pdf().from(certificate).set(opt).save("Fast-Track-Certificate.pdf");
  };

  const handleGeneratePdf2 = () => {
    const certificate = document.getElementById("certificate3");
    var opt = {
      jsPDF: { unit: 'pt', format: 'letter', orientation: 'landscape' }
    };
    html2pdf().from(certificate).set(opt).save("Alpha-Certificate.pdf");
  };

  const Layout = ({
    children,
    isDisabled,
    message,
    certificateYear,
    isShowDownloadCTA = false,
    course_name,
    second
  }) => {
    if (isDisabled) {
      return (
        <div className="certificate-disabled">
          <div className="certificate-disabled-content">
            <img src="/images/Practice/lock.svg" alt="lock icon" />
            <span>{message}</span>
          </div>
          <div className="certificate-disabled-footer">
            {isShowDownloadCTA && (
              <button disabled>
                <img
                  src="/images/Certificates/download.svg"
                  alt="download icon"
                />
                Download
              </button>
            )}
          </div>
          {children}
        </div>
      );
    }

    return (
      <div className="certificate-open">
        <div className="certificate-open-footer">
          {course_name === 'Fast Track' ? <button
            onClick={() => {
              setInfo({
                //name: userData?.user?.username || "", //old value get
                name: studName,
                message,
                certificateYear,
                course_name: course_name
              });
              handleGeneratePdf1();
            }}
          >
            <img
              src="/images/Certificates/download.svg"
              alt="download icon"
              className="pr-1"
            />
            Download
          </button> : second ? <button
            onClick={() => {
              setInfo({
                //name: userData?.user?.username || "", //old value get
                name: studName,
                message,
                certificateYear,
                course_name: course_name
              });
              handleGeneratePdf();
            }}
          >
            <img
              src="/images/Certificates/download.svg"
              alt="download icon"
              className="pr-1"
            />
            Download
          </button> : <button
            onClick={() => {
              setInfo({
                //name: userData?.user?.username || "", //old value get
                name: studName,
                message,
                certificateYear,
                course_name: course_name
              });
              handleGeneratePdf2();
            }}
          >
            <img
              src="/images/Certificates/download.svg"
              alt="download icon"
              className="pr-1"
            />
            Download
          </button>}
        </div>
        {children}
      </div>
    );
  };

  return (
    <>
      {isAllowdFilter && <Tags />}

      <div className="certificate-box 11">
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {certificates &&
            certificates.length > 0 &&
            certificates.map((item, idx) => {
              const {
                course_name,
                end_date,
                is_show_download_action = true,
                certificate_count
              } = item;
              const certificateYear = format(new Date(end_date), "MMMM yyyy");
              return (
                certificate_count === 2 ? <>
                  <Grid item xs={6} key={idx}>
                    <Layout
                      message={course_name}
                      isDisabled={!end_date}
                      certificateYear={certificateYear}
                      isShowDownloadCTA={is_show_download_action}
                      course_name={course_name}
                      second={false}
                    >
                      <div className="certificate-card"></div>
                    </Layout>
                  </Grid>
                  <Grid item xs={6} key={idx}>
                    <Layout
                      message={course_name}
                      isDisabled={!end_date}
                      certificateYear={certificateYear}
                      isShowDownloadCTA={is_show_download_action}
                      course_name={course_name}
                      second={true}
                    >
                      <div className="certificate-card"></div>
                    </Layout>
                  </Grid>

                </> : <Grid item xs={6} key={idx}>
                  <Layout
                    message={course_name}
                    isDisabled={!end_date}
                    certificateYear={certificateYear}
                    isShowDownloadCTA={is_show_download_action}
                    course_name={course_name}
                    second={false}
                  >
                    <div className="certificate-card"></div>
                  </Layout>
                </Grid>
              );
            })}
        </Grid>
      </div>
      <div style={{ display: "none" }}>
        <div ref={reportTemplateRef}>
          <ReportTemplate
            info={info}
            idownloadCertificatenfo={handleGeneratePdf}
            userData={userData}
          />
        </div>
      </div>
      <div style={{ display: "none" }}>
        <div ref={reportTemplateRef1}>
          <ReportTemplate3
            info={info}
            idownloadCertificatenfo={handleGeneratePdf1}
            userData={userData}
          />
        </div>
      </div>
      <div style={{ display: "none" }}>
        <div ref={reportTemplateRef2}>
          <ReportTemplate4
            info={info}
            idownloadCertificatenfo={handleGeneratePdf2}
            userData={userData}
          />
        </div>
      </div>
    </>
  );
};

export default CertificateCard;
