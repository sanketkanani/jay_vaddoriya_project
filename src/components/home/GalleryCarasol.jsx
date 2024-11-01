import card1 from '../../assets/images/card/card2.png';
import rightArrow from '../../assets/rightarrow.svg';
import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import image1 from '../../assets/images/gallery/gallery1.png';
import image2 from '../../assets/images/gallery/gallery2.png';
import image3 from '../../assets/images/gallery/gallery3card.png';
import dottcircle from '../../assets/svg/dotcircle.svg';
import circle from '../../assets/svg/circle.svg';
import { GetGallery } from '../../services/Home.service';

const GalleryCarasol = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const getGallery = async () => {
      try {
        const mediaData = await GetGallery();
        setGallery(mediaData);
      } catch (err) {
        console.log(err)
      }
    }
    getGallery();
  }, []);

  var settings = {
    dots: true,
    infinite: true,  // Ensure infinite scrolling is enabled
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,  // Scroll one slide at a time
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,  // Update responsive setting to match
          centerMode: true,
          centerPadding: '60px',
          arrows: false,
        }
      }
    ]
  };
  

  return (
    <>
      <div className=' bg-bannerbg relative our_gallery_slider pb-7'>
        <section className="2xl:max-w-[1500px] w-[80%] mx-auto">
          <h6 className=" 2xl:text-xl max-2xl:text-lg py-3 text-primary font-medium">
            PHOTOS
          </h6>
          <h4 className="title">Our Gallery</h4>
          <p className=" sub-title">
            On MAANG careers, instructors from all over the world <br /> who work
            at MAANG companies
          </p>
          <Slider {...settings} className='relative z-10 md:px-[65px]'>
            {gallery.map((item, index) => (
              <div key={index}>
                <div className="mx-auto p-2 w-full lg:max-w-[350px] mt-10 pb-7">
                  <img src={item?.image} alt="" className=" h-full w-full" />
                </div>
              </div>
            ))}
          </Slider>
        </section>
        <img
          src={circle}
          alt=""
          className=" absolute top-[10%]  -left-8 max-md:hidden"
        />
        <img
          src={dottcircle}
          alt=""
          className=" absolute top-40 left-16 max-md:hidden"
        />
      </div>
    </>
  );
};

export default GalleryCarasol;
