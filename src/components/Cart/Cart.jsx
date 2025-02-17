import React, { useContext, useEffect, useState } from 'react';
import styles from "./Cart.module.css";
import { CartContext } from '../../Context/CartContext';
import Loader from '../loader/Loader';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  let { getCart, removeCartItem, updateProduct, clearCart, totalCartPrice } = useContext(CartContext);

  async function getAllCart() {
    let response = await getCart();
    setIsLoading(false);
    setCartItems(response.data.data.products);
  }

  async function removeProduct(productId) {
    let response = await removeCartItem(productId);
    setCartItems(response.data.data.products);
  }

  async function updateCartProduct(productId, count) {
    let response = await updateProduct(productId, count);
    setCartItems(response.data.data.products);
  }

  async function clearAllCart() {
    await clearCart();
    setCartItems([]);
  }

  useEffect(() => {
    getAllCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
        <meta charSet='utf-8' />
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative container mx-auto px-4 sm:rounded-lg">
          <div className="text-right">
            <button onClick={() => clearAllCart()} className="bg-red-700 text-white px-3 py-2 rounded-xl my-3">
              Clear Cart
            </button>
          </div>

          <table className="table-auto w-full border-collapse border border-gray-200 shadow-md rounded-lg mb-10">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="border p-2">Image</th>
                <th scope="col" className="border p-2">Product</th>
                <th scope="col" className="border p-2">Qty</th>
                <th scope="col" className="border p-2">Unit Price</th>
                <th scope="col" className="border p-2">Total Price</th>
                <th scope="col" className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={item.product.imageCover} className="w-20 sm:w-40 h-auto" alt={item.product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button onClick={() => updateCartProduct(item.product.id, item.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-4 w-4 sm:h-6 sm:w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100">
                        -
                      </button>
                      <span>{item.count}</span>
                      <button onClick={() => updateCartProduct(item.product.id, item.count + 1)} className="inline-flex items-center justify-center h-4 w-4 sm:h-6 sm:w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100">
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.price} EGP
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.price * item.count} EGP
                  </td>
                  <td className="px-6 py-4">
                    <a onClick={() => removeProduct(item.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                      Remove
                    </a>
                  </td>
                </tr>
              ))}
              <tr className="bg-white border-b text-center font-extrabold text-black text-xl dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td>Total Price</td>
                <td colSpan="4">{totalCartPrice} EGP</td>
                <td className="p-5">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-white bg-main focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                  >
                    Checkout
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-100">
                      <ul className="py-2 text-sm text-black font-extrabold">
                        <li>
                          <NavLink to="/checkout" state={{ type: "online Payment" }} className="block px-4 py-2 hover:bg-gray-100">
                            Online
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/checkout" state={{ type: "Cash on Delivery" }} className="block px-4 py-2 hover:bg-gray-100">
                            Cash
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
