import React, { useState , useContext , useEffect } from 'react';
import styles from "./Checkout.module.css";
import { useFormik } from 'formik';
import { CartContext } from "../../Context/CartContext"
import { useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet';

export default function Checkout() {
  let {onlinePayment , cashPayment} = useContext(CartContext)
  const [loading, setLoading] = useState(false); 
    const [paymentType, setPaymentType] = useState(null)


  let { state } = useLocation();
  useEffect(() => {
    setPaymentType(state?.type || "Select Payment Method");
  }, [state]);
  

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: (values) => {
      setLoading(true);
      payOnline(values)

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  });

  async function payOnline(values){
    if(paymentType == "online Payment" ){
      await onlinePayment(values); 
    }else{
      await cashPayment(values);
      
    }
  }

  return (
    <>
      <Helmet>
        <title>Checkout</title>
        <meta charSet='utf-8' />
      </Helmet>
      <div className="w-1/2 mx-auto">
      <h1 className='text-main text-lg font-extrabold'>{paymentType}</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="my-2">
            <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
            <input 
              name="details" 
              type="text" 
              id="details" 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.details} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            />
            {formik.touched.details && formik.errors.details && (
              <p className="text-red-500 text-sm">{formik.errors.details}</p>
            )}
          </div>

          <div className="my-2">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
            <input 
              name="phone" 
              type="tel" 
              id="phone" 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.phone} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            )}
          </div>

          <div className="my-2">
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
            <input 
              name="city" 
              type="text" 
              id="city" 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.city} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-500 text-sm">{formik.errors.city}</p>
            )}
          </div>

          <div className='my-4 text-end'>
            <button 
              type='submit' 
              className='bg-main text-white px-4 py-2 rounded-lg flex items-center justify-center'
              disabled={loading || !(formik.isValid && formik.dirty)}
            >
              {loading ? <i className='fa fa-spinner fa-spin mr-2'></i> : null}
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
