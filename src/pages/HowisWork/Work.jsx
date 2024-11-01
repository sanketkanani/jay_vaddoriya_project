import React from 'react';
import Banner from '../../components/Program/Banner';
import WorkMain from '../../components/Works/WorkMain';
import DashBoard from '../../components/Works/DashBoard';
import ImageBanner from '../../components/allbanner/ImageBanner';
import WorkBanner from '../../components/Works/WorkBanner';
import WorkImgBanner from '../../components/Works/WorkImgBanner';
import LastBanner from '../../components/Works/LastBanner';
import dashbordBGTop from '../../assets/how-its-top-bg.jpg'

const Work = () => {
  return (
    <div className=" ">
      <div className='xl:pt-[80px] pb-[80px] pt-0 for_mobile_display margin_for_header' style={{backgroundImage: `url(${dashbordBGTop})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
        <WorkBanner />

        <WorkMain />
      </div>
      <div className="">
        <WorkImgBanner />
      </div>

      <DashBoard />
      <div className="  relative top-20">
        <LastBanner />
      </div>
    </div>
  );
};

export default Work;
