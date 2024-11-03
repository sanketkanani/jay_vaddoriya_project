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
// import { ApiBaseURL } from "../../ApiConfig";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import ht from "date-fns/esm/locale/ht/index.js";
// import ReportTemplate1 from "../ReportTemplate1";
// import ReportTemplate3 from "../ReportTemplate2";
// import ReportTemplate4 from "../ReportTemplate3";

const tags = ["Interview Preparation Course", "Course Name 2", "Course Name 3"];

const CertificateCard = () => {
  const isAllowdFilter = false;
  const reportTemplateRef = useRef(null);
  const [tag, setTag] = useState("Interview Preparation Course");
  const [loggedIn] = useCookie("maang");
  const [certificates, setCertificates] = useState([]);
  const [info, setInfo] = useState();
  const [studName, setStudName] = useState("");
  const userData = JSON.parse(loggedIn);

  useEffect(() => {
    console.log("============ userData ======= ", userData);
  }, [userData]);

  useEffect(() => {
    if (loggedIn) {
      fetch(`${ApiBaseURL}free-course-management/get-certificate`, {
        headers: {
          Authorization: `Token ${userData.token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("alert *******", data);
          const certificateList =
            data && data.data && data.data.length > 0
              ? data.data
              : DUMMY_CERTIFICATES;
          setCertificates(certificateList);
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

  const handleGeneratePdf = async () => {
    const element = reportTemplateRef.current;
    try {
      // Capture the HTML content as an image
      const canvas = await html2canvas(element, {
        useCORS: true, // Enable CORS for external images
        scale: 9, // Increase scale for better quality
      });
      const imgData = canvas.toDataURL("image/png");
      // Create a PDF document using jsPDF
      const pdf = new jsPDF({
        format: "a4",
        unit: "pt",
        orientation: "landscape",
      });

      const imgWidth = 840; // A4 width in mm
      const imgHeight = 650; // A4 height in mm
      // const pageHeight = 297; // A4 height in mm

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // // Calculate the scale factor
      const pdfWidth = pdf.internal.pageSize.width;
      const pdfHeight = pdf.internal.pageSize.height - 100;
      const scale = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);

      const newWidth = pdfWidth * scale;
      const newHeight = pdfHeight * scale;

      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

      pdf.save("certificate.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // const handleGeneratePdf = () => {
  //   const doc = new jsPDF({
  //     format: "a4",
  //     unit: "pt",
  //     orientation: "l",
  //   });

  //   doc.setFont("Inter-Regular", "normal");
  //   doc.html(reportTemplateRef.current, {
  //     margin: [0, 20, 0, 25],
  //     async callback(doc) {
  //       await doc.save("maang-certificate");
  //     },
  //   });
  // };

  const downloadCertificate = () => {
    const certificate = document.getElementById("certificate");
    var opt = {
      jsPDF: { unit: "pt", format: "letter", orientation: "landscape" },
    };
    html2pdf().from(certificate).set(opt).save("certificate.pdf");
  };

  const Layout = ({
    children,
    isDisabled,
    message,
    certificateYear,
    isShowDownloadCTA,
    course_name,
  }) => {
    console.log("*****helloo ", isShowDownloadCTA);
    if (!isShowDownloadCTA) {
      return (
        <div className="certificate-disabled">
          <div className="certificate-disabled-content">
            <img src="/images/Practice/lock.svg" alt="lock icon" />
            <span>{message}</span>
          </div>
          {/* <div className="certificate-disabled-footer">
            <button disabled>
              <img
                src="/images/Certificates/download.svg"
                alt="download icon"
              />
              Download
            </button>
          </div> */}
          {children}
        </div>
      );
    } else {
    }

    return (
      <div className="certificate-open">
        <div className="certificate-open-footer">
          <button
            onClick={() => {
              setInfo({
                //name: userData?.user?.username || "", //old value get
                name: studName,
                message,
                certificateYear,
                course_name: course_name,
              });
              downloadCertificate();
            }}
          >
            <img
              src="/images/Certificates/download.svg"
              alt="download icon"
              className="pr-1"
            />
            Download
          </button>
        </div>
        {children}
      </div>
    );
  };

  return (
    <>
      {/* {<Tags />} */}

      <div className="certificate-box 22">
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {certificates &&
            certificates.length > 0 &&
            certificates.map((item, idx) => {
              console.log("******", item);
              const { course_name, end_date, certificate_status } = item;
              const certificateYear = format(new Date(end_date), "MMMM yyyy");
              return (
                <Grid item xs={6} key={idx}>
                  <Layout
                    message={course_name}
                    isDisabled={!end_date}
                    certificateYear={certificateYear}
                    isShowDownloadCTA={certificate_status}
                    course_name={course_name}
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
            idownloadCertificatenfo={downloadCertificate}
            userData={userData}
          />
        </div>
      </div>
    </>
  );
};

export default CertificateCard;
