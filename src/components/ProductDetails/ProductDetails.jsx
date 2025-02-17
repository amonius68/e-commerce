import React, { useContext, useEffect, useState } from 'react';
import styles from "./ProductDetails.module.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../loader/Loader';
import Slider from "react-slick";
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  
  let { id, category } = useParams();
  let { addToCart } = useContext(CartContext);

  async function addProductToCart(productId) {
    await addToCart(productId);
  }

  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  async function getProductDetails() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(response.data.data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function getRelatedProducts() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      const filteredProducts = response.data.data.filter((product) => product.category?.name === category);
      setRelatedProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getProductDetails();
    getRelatedProducts();
  }, [id, category]);

  return (
    <div className="container mx-auto mt-20">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex">
          <div className="w-1/4 me-10">
            <Slider {...settings}>
              {productDetails?.images?.map((src, index) => (
                <img key={index} src={src} className='h-96' alt={`Product Image ${index + 1}`} />
              ))}
            </Slider>
          </div>
          <div className="w-3/4 mt-10">
            <h1 className="text-black font-bold text-2xl my-5">{productDetails?.title}</h1>
            <h3 className="text-gray-700 my-5">{productDetails?.description}</h3>
            <p className="my-5">{productDetails?.category?.name}</p>

            <div className="flex justify-between items-center mt-2">
              <div className="text-green-600 font-bold">EGP {productDetails?.price}</div>
              <div className="flex items-center text-yellow-500">
                <i className="fa fa-star"></i>
                <span className="ml-1 text-sm">{productDetails?.ratingsAverage}</span>
              </div>
            </div>

            <button 
              onClick={() => addProductToCart(productDetails?._id)}
              className="mt-7 w-full bg-main text-white py-2 rounded-lg font-semibold 
                        transition-all duration-300 ease-in-out shadow-md 
                        hover:bg-blue-700 hover:shadow-lg hover:scale-105">
              Add To Cart
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-center my-6">Related Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {relatedProducts.map((product) => (
                <div key={product._id} className="p-3 border rounded-lg shadow-md transition hover:shadow-lg">
                  <NavLink to={`/productdetails/${product._id}/${product.category?.name}`}>
                    <img 
                      src={product.imageCover} 
                      alt={product.title} 
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h3 className="text-gray-700 font-semibold mt-2 text-sm truncate">{product.category?.name}</h3>
                    <p className="text-gray-900 text-base font-medium truncate">{product.title}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-green-600 font-bold">EGP {product.price}</div>
                      <div className="flex items-center text-yellow-500">
                        <i className="fa fa-star"></i>
                        <span className="ml-1 text-sm">{product.ratingsAverage}</span>
                      </div>
                    </div>
                  </NavLink>

                  <Helmet>
                    <meta charSet='utf-8'/>
                    <title>{productDetails?.title}</title>
                  </Helmet>

                  <button 
                    onClick={() => addProductToCart(product._id)} 
                    className="mt-3 w-full bg-main text-white py-2 rounded-lg font-semibold 
                               transition-all duration-300 ease-in-out shadow-md 
                               hover:bg-blue-700 hover:shadow-lg hover:scale-105">
                    Add To Cart
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}