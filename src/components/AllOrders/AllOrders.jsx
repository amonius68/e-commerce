import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';

export default function AllOrders() {
  return (
    <>
      <Helmet>
        <title>Order Successful</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Congratulations!</h2>
          <p className="text-gray-600 mb-6">
            Your order was placed successfully. <br /> Thank you for shopping with us!
          </p>
          <NavLink to="/" className="inline-block bg-main text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
            Continue Shopping
          </NavLink>
        </div>
      </div>
    </>
  );
}
