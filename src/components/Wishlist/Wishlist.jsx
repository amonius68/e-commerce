import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../loader/Loader';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let { addToCart } = useContext(CartContext);

  async function fetchWishlist() {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
          token: localStorage.getItem('userToken')
        }
      });
      setWishlistItems(response.data.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeFromWishlist(productId) {
    const toastId = toast.loading('Removing from Wishlist...');
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: localStorage.getItem('userToken')
        }
      });
      setWishlistItems((prevItems) => prevItems.filter(item => item._id !== productId));
      toast.success('Item removed from Wishlist', { id: toastId });
    } catch (error) {
      toast.error('Failed to remove from Wishlist', { id: toastId });
      console.error('Error removing item from wishlist:', error);
    }
  }

  async function addProductToCart(productId) {
    await addToCart(productId);
    removeFromWishlist(productId);
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
        <meta charSet='utf-8' />
      </Helmet>
      <div className='container mx-auto px-4'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center my-6">Wishlist</h2>
            {wishlistItems.length === 0 ? (
              <p className='text-center'>Your wishlist is empty.</p>
            ) : (
              


            <table className="table-auto w-full border-collapse border border-gray-200 shadow-md rounded-lg mb-4">
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th className="border p-2 ">Image</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((product) => (
                  <tr key={product._id} className="border hover:bg-gray-50">
                    <td className="p-2">
                      <NavLink to={`/productdetails/${product.id}/${product.category.name}`}>
                        <img src={product.imageCover} alt={product.title} className="w-40 h-auto object-cover rounded-md" />
                      </NavLink>
                    </td>
                    <td className="p-2 text-sm text-gray-700 font-semibold">{product.category.name}</td>
                    <td className="p-2 text-base text-gray-900 font-medium truncate">{product.title}</td>
                    <td className="p-2 text-green-600 font-bold">EGP {product.price}</td>
                    <td className=" space-x-20">
                      
                      <button 
                        onClick={() => addProductToCart(product._id)} 
                        className=" bg-main text-white py-1 px-3 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-700 hover:scale-105">
                        Add To Cart
                      </button>
                      <button 
                        onClick={() => removeFromWishlist(product._id)}
                        className=" font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>



            )}
          </>
        )}
      </div>
    </>
  );
}
