import React, { useEffect } from "react";
import "./index.css";
import { useCookie } from "react-use";

const ReportTemplate = ({ info }) => {
  const [loggedIn] = useCookie("maang");
  const userData = JSON.parse(loggedIn);

  // useEffect(()=>{
  //   console.log("Updated info data", info);
  // },[info])
  return (
    <>
      <div id="certificate" class="main_bg_start4">
        <div class="top_qr" style={{ position: 'absolute', right: '30px' }}>
          <table width="100%" style={{ width: '100%', fontFamily: 'Zinaida', display: 'flex', justifyContent: 'flex-end' }}>
            <tbody>
              <tr>
                <td width="100%" align="right" style={{ textAlign: 'right', padding: '0', paddingRight: '0.5rem', fontSize: '18px', fontFamily: 'Arial' }}>Certificate No. 13082024</td>
              </tr>
              <tr>
                <td height={'15px'} style={{ height: '15px' }}></td>
              </tr>
              <tr>
                <td width="100%" align="right" style={{ textAlign: 'right', padding: '0', paddingRight: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <img src={require('./assets/qr-code-2.png')} alt="" style={{ maxWidth: '200px' }} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <table className="certificate_container_bg">
          <tbody>
            <tr>
              <td colSpan="3" className="title" style={{ padding: 0, textAlign: 'center' }}>
                <img src={require('./assets/maang-logo-v2.png')} alt="" style={{ width: '130px', display: 'block', margin: '0 auto' }} />
              </td>
            </tr>
            <tr>
              <td height={'40px'}></td>
            </tr>
            <tr>
              <td colSpan="3" className="subtitle" style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 600, fontSize: '42px', color: '#11110f' }}>
                Certificate of Appreciation
              </td>
            </tr>
            <tr>
              <td height={'10px'} style={{ height: '10px' }}></td>
            </tr>
            <tr>
              <td colSpan="3" style={{
                textAlign: 'center',
                fontSize: '30px',
                fontFamily: 'Cardo, serif',
                fontWeight: 500,
                color: '#11110f',
                width: '100%'
              }}>
                This awarded certify that
              </td>
            </tr>
            <tr>
              <td height={'20px'} style={{ height: '20px' }}></td>
            </tr>
            <tr>
              <td colSpan="3" style={{
                fontSize: '70px',
                fontFamily: 'Great Vibes, cursive',
                fontWeight: 400,
                lineHeight: 1,
                padding: '10px 0px 0px'
              }}>
                {userData?.user?.first_name} {userData?.user?.last_name}
              </td>
            </tr>
            <tr>
              <td height={'60px'} style={{ height: '60px' }}></td>
            </tr>
            <tr>
              <td colSpan="3" style={{ textAlign: 'center', width: '100%' }}>
                <hr style={{ borderBottom: '1px solid #4b526f', width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td height={'15px'} style={{ height: '15px' }}></td>
            </tr>
            <tr style={{ textAlign: 'center' }}>
              <td colSpan="3" style={{
                fontFamily: 'the_seasonsregular',
                fontSize: '26px',
                color: '#11110f',
                textAlign: 'center',
                verticalAlign: 'middle',
                width: '100%'
              }}>
                for completing the <strong>Free Course on {info?.course_name} <br /> in {info?.certificateYear}</strong>.
              </td>
            </tr>
            <tr>
              <td height="40px"></td>
            </tr>
            <tr style={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'100%'}}>
              <td align="center" width="30%" style={{verticalAlign:'middle' }}>
                <table align="right">
                  <tbody>
                    <tr>
                      <td>
                        <img src={require('./assets/akhil-signature.png')} alt="Akhil Gunti Signature" style={{ maxWidth: '200px' }} />
                      </td>
                    </tr>
                    <tr>
                      <td className="footer" style={{ display: 'table-cell', width: '100%', padding: 0 }}>
                        <span style={{ fontSize: '22px', color: '#11110f', fontFamily: 'Cardo, serif', fontWeight: 600 }}>Akhil Gunti</span><br />
                        <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', color: '#11110f' }}>Course Manager</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style={{ display: 'flex', padding: 0, verticalAlign: 'middle', alignItems:'center', justifyContent:'center' }} width="25%">
                <img src={require('./assets/batch-3.png')} alt="Batch 3" style={{ maxHeight: '150px' }} />
              </td>
              <td align="center" width="30%" style={{ verticalAlign: 'middle' }}>
                <table align="left">
                  <tbody>
                    <tr>
                      <td>
                        <img src={require('./assets/hemanth-signature.png')} alt="Hemanth T Signature" style={{ maxWidth: '200px' }} />
                      </td>
                    </tr>
                    <tr>
                      <td className="footer" style={{ display: 'table-cell', padding: 0, width: '100%' }}>
                        <span style={{ fontSize: '22px', color: '#11110f', fontFamily: 'Cardo, serif', fontWeight: 600 }}>Hemanth T</span><br />
                        <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', color: '#11110f' }}>Instructor</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td height="30px"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReportTemplate;
