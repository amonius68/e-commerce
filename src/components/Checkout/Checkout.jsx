import React, { useState, useContext, useEffect } from 'react';
import styles from "./Checkout.module.css";
import { useFormik } from 'formik';
import { CartContext } from "../../Context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

export default function Checkout() {
  let { onlinePayment, cashPayment, getCart, totalCartPrice } = useContext(CartContext);
  const [loading, setLoading] = useState(false); 
  const [paymentType, setPaymentType] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate(); 
  let { state } = useLocation();

  useEffect(() => {
    setPaymentType(state?.type || "Select Payment Method");

    // fetch cart items
    async function fetchCart() {
      let res = await getCart();
      if (res?.data?.data?.products) {
        setCartItems(res.data.data.products);
      }
    }
    fetchCart();
  }, [state, getCart]);

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: async (values) => {
      setLoading(true);
      await pay(values); 
      setLoading(false);

      navigate("/confirmation", {
        state: {
          order: {
            details: values.details,
            phone: values.phone,
            city: values.city,
            items: cartItems,
            totalPrice: totalCartPrice,
          }
        }
      });
    }
  });

  async function pay(values) {
    if (paymentType === "online Payment") {
      await onlinePayment(values); 
    } else {
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
            <label htmlFor="details" className="block mb-2 text-sm font-medium">Details</label>
            <input 
              name="details" 
              type="text" 
              id="details" 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.details} 
              className="border rounded-lg p-2 w-full" 
            />
          </div>

          <div className="my-2">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium">Phone</label>
            <input 
              name="phone" 
              type="tel" 
              id="phone" 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.phone} 
              className="border rounded-lg p-2 w-full" 
            />
          </div>

          <div className="my-2">
            <label htmlFor="city" className="block mb-2 text-sm font-medium">City</label>
            <input 
              name="city" 
              type="text" 
              id="city" 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.city} 
              className="border rounded-lg p-2 w-full" 
            />
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
