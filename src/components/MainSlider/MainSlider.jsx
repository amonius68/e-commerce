import React from 'react'
import slider1 from "./../../assets/grocery-banner.png"
import slider2 from "./../../assets/grocery-banner-2.jpeg"
import slider3 from "./../../assets/slider-image-1.jpeg"
import slider4 from "./../../assets/slider-image-2.jpeg"
import slider5 from "./../../assets/slider-image-3.jpeg"
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="container mx-auto my-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-3">
          <Slider {...settings}>
            <img src={slider3} className='h-[300px] w-full object-cover' alt="" />
            <img src={slider4} className='h-[300px] w-full object-cover' alt="" />
            <img src={slider5} className='h-[300px] w-full object-cover' alt="" />
          </Slider>
        </div>
        <div className="flex flex-col">
          <img src={slider1} className='h-[150px] w-full object-cover' alt="" />
          <img src={slider2} className='h-[150px] w-full object-cover' alt="" />
        </div>
      </div>
    </div>
  )
}
