import React, { useEffect } from 'react';
import HomeMain from '../../components/home/HomeMain';
import Feature from '../../components/home/Feature';
import Testimonial from '../../components/allcarasol/Testimonial';
import BlogComp from '../../components/home/BlogComp';
import StepBanner from '../../components/home/StepBanner';

import CountingBanner from '../../components/allbanner/CountingBanner';
import CertificateCarasol from '../../components/allcarasol/CertificateCarasol';

import ReconisedBanner from '../../components/allbanner/ReconisedBanner';
import Developer from '../../components/home/Developer';
import LogosBanner from '../../components/allbanner/LogosBanner';
import GalleryCarasol from '../../components/home/GalleryCarasol';
import CompanyBanner from '../../components/allbanner/CompanyBanner';
import Carasol1 from '../../components/allcarasol/Carasol1';
import HerosCarasol from '../../components/allcarasol/HerosCarasol';
import CardCarasol from '../../components/allcarasol/CardCarasol';
import MediaCarasol from '../../components/allcarasol/MediaCarasol';
import ImageBanner from '../../components/allbanner/ImageBanner';

const Home = () => {

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // smooth scrolling
    });
  },[])
  return (
    <div className="">
      <HomeMain />
      <CountingBanner />
      <ReconisedBanner />
      <Developer />
      <LogosBanner />
      <Carasol1 />
      <CompanyBanner />
      <CardCarasol />
      <HerosCarasol />
      <MediaCarasol />
      <GalleryCarasol />
      <Feature />
      <CertificateCarasol />
      <Testimonial />
      <StepBanner />
      <BlogComp />
      <ImageBanner />
    </div>
  );
};

export default Home;
