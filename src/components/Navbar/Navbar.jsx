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

  useEffect(() => {
    if (typeof getCart === "function") getCart();
  }, [getCart, token]);


  function toggleMenu(e) {
    e.stopPropagation();
    console.log("toggleMenu clicked — new state:", !menuOpen);
    setMenuOpen(prev => !prev);
  }

  function logout(e) {
    e?.preventDefault();
    localStorage.removeItem('userToken');
    setToken(null);
    setMenuOpen(false);
    navigate('/login');
  }

  useEffect(() => {
    function handleDocClick() {
      setMenuOpen(false);
    }
    if (menuOpen) document.addEventListener('click', handleDocClick);
    return () => document.removeEventListener('click', handleDocClick);
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="FreshCart Logo" />
        </NavLink>

        <div className="md:hidden flex items-center gap-2 z-50">
          {token && (
            <button
              type="button"
              onClick={logout}
              className="me-2 bg-slate-200 p-2 rounded-lg text-red-600 dark:text-red-400 hover:text-red-800"
            >
              LogOut
            </button>
          )}

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label="open menu"
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 relative z-50"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <FiMenu className="text-2xl text-gray-900 dark:text-white" />
          </button>
        </div>

        <div className="hidden md:flex md:order-2 items-center space-x-6 md:space-x-4 rtl:space-x-reverse">
          {token && (
            <div className="relative md:flex items-center me-4">
              <NavLink to="cart" className="relative flex items-center">
                <BsCart3 className="text-2xl text-gray-900 dark:text-white" />
                <span className="bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2">
                  {noOfCartItems || 0}
                </span>
              </NavLink>
            </div>
          )}

          {token ? (
            <button onClick={logout} className="bg-slate-200 p-2 rounded-lg text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 dark:text-white">
              LogOut
            </button>
          ) : (
            <>
              <NavLink to="login" className={({isActive}) => `block py-2 px-3 rounded-sm ${isActive ? 'text-green-700 font-bold' : 'text-gray-900 hover:bg-gray-100'}`}>Login</NavLink>
              <NavLink to="register" className={({isActive}) => `block py-2 px-3 rounded-sm ${isActive ? 'text-green-700 font-bold' : 'text-gray-900 hover:bg-gray-100'}`}>Register</NavLink>
            </>
          )}
        </div>

        {token && (
          <div className="hidden md:flex md:order-1 space-x-4">
            <NavLink to="/" className={({isActive}) => `text-gray-900 dark:text-white hover:text-green-700 ${isActive ? 'font-bold text-green-700' : ''}`}>Home</NavLink>
            <NavLink to="brands" className={({isActive}) => `text-gray-900 dark:text-white hover:text-green-700 ${isActive ? 'font-bold text-green-700' : ''}`}>Brands</NavLink>
            <NavLink to="categories" className={({isActive}) => `text-gray-900 dark:text-white hover:text-green-700 ${isActive ? 'font-bold text-green-700' : ''}`}>Categories</NavLink>
            <NavLink to="products" className={({isActive}) => `text-gray-900 dark:text-white hover:text-green-700 ${isActive ? 'font-bold text-green-700' : ''}`}>Products</NavLink>
            <NavLink to="wishlist" className={({isActive}) => `text-gray-900 dark:text-white hover:text-green-700 ${isActive ? 'font-bold text-green-700' : ''}`}>Wishlist</NavLink>
            <NavLink to="cart" className={({isActive}) => `text-gray-900 dark:text-white hover:text-green-700 ${isActive ? 'font-bold text-green-700' : ''}`}>Cart</NavLink>
          </div>
        )}

        <div className={`w-full md:hidden absolute left-0 top-full ${menuOpen ? 'block' : 'hidden'} z-40`}>
          <ul className="flex flex-col p-4 mt-2 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800">
            {token ? (
              <>
                <li><NavLink onClick={() => setMenuOpen(false)} to="/" className="block py-2 px-3">Home</NavLink></li>
                <li><NavLink onClick={() => setMenuOpen(false)} to="brands" className="block py-2 px-3">Brands</NavLink></li>
                <li><NavLink onClick={() => setMenuOpen(false)} to="cat" className="block py-2 px-3">Categories</NavLink></li>
                <li><NavLink onClick={() => setMenuOpen(false)} to="products" className="block py-2 px-3">Products</NavLink></li>
                <li><NavLink onClick={() => setMenuOpen(false)} to="wishlist" className="block py-2 px-3">Wishlist</NavLink></li>
                <li><NavLink onClick={() => setMenuOpen(false)} to="cart" className="block py-2 px-3">Cart</NavLink></li>
                <li><button onClick={logout} className="w-full text-start py-2 px-3 text-red-600">Logout</button></li>
              </>
            ) : (
              <>
                <li><NavLink onClick={() => setMenuOpen(false)} to="login" className="block py-2 px-3">Login</NavLink></li>
                <li><NavLink onClick={() => setMenuOpen(false)} to="register" className="block py-2 px-3">Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
