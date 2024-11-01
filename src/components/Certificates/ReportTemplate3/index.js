import React from "react";
import './index4.css'

const ReportTemplate4 = ({ info }) => {
  return (
    <>
      <div id="certificate3" class="main_bg_start5" style={{ padding: 0 }}>
        <table width="100%" style={{ width: '100%', fontFamily: 'Zinaida', paddingTop: '30px' }}>
          <tbody>
            <tr style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
              <td
                width="49%"
                align="left"
                style={{
                  textAlign: 'left',
                  padding: 0,
                  paddingLeft: '2.5rem',
                  fontSize: '18px',
                  fontFamily: 'Cardo, serif',
                  fontWeight: 500,
                }}
              >
                Certificate No. 13082024
              </td>
              <td width="49%" align="right" style={{ textAlign: 'right', padding: '0', paddingRight: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <img src={require('./assets/qr-code.png')} alt="QR Code" />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="certificate_container_bg5">
          <table style={{ marginTop: '6rem', width: "80%" }}>
            <tr>
              <td colSpan="2" className="title" style={{ padding: 0, textAlign: 'center' }}>
                <img src={require('./assets/maang-logo-v2.png')} alt="" style={{ width: '130px', display: 'block', margin: '0 auto' }} />
              </td>
            </tr>
            <tr>
              <td height="0px"></td>
            </tr>
            <tr>
              <td colSpan="2" className="subtitle" style={{ fontSize: '80px', fontFamily: "'UnifrakturCook', cursive", lineHeight: 1, color: '#0c253c' }}>
                Certificate of Achievement
              </td>
            </tr>
            <tr>
              <td height="50px"></td>
            </tr>
            <tr>
              <td colSpan="2" style={{ padding: 0, textAlign: 'center' }}>
                <img src={require('./assets/down-border.png')} alt="" style={{ width: '130px', display: 'block', margin: '0 auto' }} />
              </td>
            </tr>
            <tr>
              <td height="10"></td>
            </tr>
            <tr>
              <td colSpan="2" className="content" style={{ fontSize: '18px', fontFamily: "'Cardo', serif", fontWeight: 500, color: '#11110f' }}>
                THIS CERTIFICATE IS PROUDLY PRESENTED TO
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="content" style={{ fontSize: '70px', fontFamily: "'Parisienne', cursive", fontWeight: 300, lineHeight: 1 }}>
                {info?.name}
              </td>
            </tr>
            <tr>
              <td height="25"></td>
            </tr>
            <tr>
              <td colSpan="3" align="center" width="100%">
                <hr style={{ borderBottom: '1px solid #4b526f', width: '75%', margin: '0 auto' }} />
              </td>
            </tr>
            <tr>
              <td height="15"></td>
            </tr>
            <tr>
              <td colSpan="2" className="content" style={{ fontFamily: "'the_seasonsregular'", fontSize: '26px', color: '#11110f' }}>
                for completing the <strong>{info?.course_name} <span style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}> </span> in
                {info?.certificateYear}</strong>
              </td>
            </tr>
            <tr>
              <td height="30"></td>
            </tr>
            <tr>
              <td>
                <table>
                  <tr style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <td align="left" width="100%">
                      <table align="center">
                        <tr>
                          <td>
                            <img src={require('./assets/akhil-signature.png')} alt="" style={{ maxWidth: '200px' }} />
                          </td>
                        </tr>
                        <tr>
                          <td className="footer" style={{ display: 'table-cell', width: '100%', padding: 0 }}>
                            <span style={{ fontSize: '22px', color: '#0c253c', fontFamily: "'UnifrakturCook', cursive" }}>
                              Akhil Gunti
                            </span>
                            <br />
                            <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', color: '#11110f' }}>
                              Course Manager
                            </span>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td style={{ display: 'flex', padding: 0, verticalAlign: 'middle', width: "100%", alignItems: 'center', justifyContent: 'center' }} >
                      <img src={require('./assets/batch-v2.png')} alt="" style={{ maxWidth: '80px' }} />
                    </td>
                    <td align="right" width="100%">
                      <table align="center">
                        <tr>
                          <td>
                            <img src={require('./assets/hemanth-signature.png')} alt="" style={{ maxWidth: '180px' }} />
                          </td>
                        </tr>
                        <tr>
                          <td className="footer" style={{ display: 'table-cell', padding: 0, width: '100%' }}>
                            <span style={{ fontSize: '22px', color: '#0c253c', fontFamily: "'UnifrakturCook', cursive" }}>
                              Hemanth T
                            </span>
                            <br />
                            <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', color: '#11110f' }}>
                              Instructor
                            </span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td height="10"></td>
            </tr>
          </table>
        </div>
      </div>

    </>
  );
};

export default ReportTemplate4;
