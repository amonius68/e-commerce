import React, { useEffect, useState } from 'react';
import styles from "./BrandDetails.module.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../loader/Loader';

export default function BrandDetails() {
  let { id } = useParams();
  const [brandDetails, setBrandDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  async function getBrandDetails() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      setBrandDetails(response.data.data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getBrandDetails();
  }, [id]);

  return (
    <div className="container mx-auto mt-20">
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <div className="text-red-500 text-center">Error: {errorMessage}</div>
      ) : (
        <div className="text-center">
          <img src={brandDetails?.image} alt={brandDetails?.name} className="mx-auto w-40 h-40 object-cover rounded-full shadow-md" />
          <h1 className="text-black font-bold text-2xl my-5">{brandDetails?.name}</h1>
        </div>
      )}
    </div>
  );
}
