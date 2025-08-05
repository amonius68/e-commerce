import React, { useContext, useEffect, useState } from 'react';
import logo from "./../../assets/freshcart-logo.svg";
import { NavLink, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';
import { CartContext } from '../../Context/CartContext';
import { BsCart3 } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {

  let { noOfCartItems, getCart } = useContext(CartContext);
  let { token, setToken } = useContext(TokenContext);
  let navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function logout() {
    localStorage.removeItem('userToken');
    setToken(null); 
    navigate('/login'); 
  }

  useEffect(() => {
    getCart();
    if (localStorage.getItem("userToken") && !sessionStorage.getItem("reloaded")) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, [token]);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="FreshCart Logo" />
        </NavLink>

        <div className="md:hidden flex">
          {token && (
            <a
              href="#"
              onClick={logout}
              className="me-4 bg-slate-200 p-2 rounded-lg text-red-600 dark:text-red-400 hover:text-red-800"
            >
              LogOut
            </a>
          )}

          <button onClick={toggleMenu} className="text-3xl text-gray-900 dark:text-white">
            <FiMenu />
          </button>
        </div>

        <div className="hidden md:flex md:order-2 space-x-6 md:space-x-4 rtl:space-x-reverse items-center">
          {token && (
            <div className="relative hidden md:flex items-center me-4">
              <NavLink to="cart" className="relative flex items-center">
                <BsCart3 className="text-2xl text-gray-900 dark:text-white" />
                <span className="bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2">
                  {noOfCartItems}
                </span>
              </NavLink>
            </div>
          )}

          {token ? (
            <a
              href="#"
              onClick={logout}
              className="bg-slate-200 p-2 rounded-lg text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
            >
              LogOut
            </a>
          ) : (
            <>
              <NavLink
                to="login"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm ${
                    isActive
                      ? 'text-green-700 font-bold dark:text-green-500'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700'
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="register"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm ${
                    isActive
                      ? 'text-green-700 font-bold dark:text-green-500'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700'
                  }`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {token && (
          <div className="hidden md:flex md:order-1 space-x-4">
            <NavLink to="/" className={({ isActive }) =>
              `text-gray-900 dark:text-white hover:text-green-700 ${isActive ? 'font-bold text-green-700 dark:text-green-500' : ''}`}>Home</NavLink>
            <NavLink to="/brands" className={({ isActive }) =>
              `text-gray-900 dark:text-white hover:text-green-700 ${isActive ? 'font-bold text-green-700 dark:text-green-500' : ''}`}>Brands</NavLink>
            <NavLink to="/cat" className={({ isActive }) =>
              `text-gray-900 dark:text-white hover:text-green-700 ${isActive ? 'font-bold text-green-700 dark:text-green-500' : ''}`}>Categories</NavLink>
            <NavLink to="/products" className={({ isActive }) =>
              `text-gray-900 dark:text-white hover:text-green-700 ${isActive ? 'font-bold text-green-700 dark:text-green-500' : ''}`}>Products</NavLink>
            <NavLink to="/wishlist" className={({ isActive }) =>
              `text-gray-900 dark:text-white hover:text-green-700 ${isActive ? 'font-bold text-green-700 dark:text-green-500' : ''}`}>Wishlist</NavLink>
            <NavLink to="/cart" className={({ isActive }) =>
              `text-gray-900 dark:text-white hover:text-green-700 ${isActive? 'font-bold text-green-700 dark:text-green-500' : ''}`}>Cart</NavLink>
          </div>
        )}

        {token && (
          <div className={`w-full md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800">
              <li>
                <NavLink to="/" className={({ isActive }) =>
                  `block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive ? 'font-bold text-green-700 dark:text-green-500' : ''}`}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/brands" className={({ isActive }) =>
                  `block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive ? 'font-bold text-green-700 dark:text-green-500' : ''}`}>Brands</NavLink>
              </li>
              <li>
                <NavLink to="/cat" className={({ isActive }) =>
                  `block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive ? 'font-bold text-green-700 dark:text-green-500' : ''}`}>Categories</NavLink>
              </li>
              <li>
                <NavLink to="/products" className={({ isActive }) =>
                  `block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive ? 'font-bold text-green-700 dark:text-green-500' : ''}`}>Products</NavLink>
              </li>
              <li>
                <NavLink to="/wishlist" className={({ isActive }) =>
                  `block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive ? 'font-bold text-green-700 dark:text-green-500' : ''}`}>Wishlist</NavLink>
              </li>
              <li>
                <NavLink to="/cart" className={({ isActive }) =>
                  `block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive ? 'font-bold text-green-700 dark:text-green-500' : ''}`}>cart</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
