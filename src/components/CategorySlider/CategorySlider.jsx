import React from 'react';
import styles from "./CategorySlider.module.css";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ]
  };

  async function getCatSlider() {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    return response.data; 
  }

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCatSlider,
  });

  return (
    <div className="container my-10 mx-auto">
      <h1 className="text-xl font-bold mb-5">Show Popular Categories:</h1>
      <Slider {...settings}>
        {data?.data.map((cat) => (
          <div key={cat._id} className="text-center ">
            <img src={cat.image} className="h-[200px] mx-auto rounded-lg shadow-md" alt={cat.name} />
            <p className="mt-2 font-medium">{cat.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
