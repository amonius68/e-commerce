import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Loader from '../loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { Heart, Search } from 'lucide-react';
import { Helmet } from 'react-helmet';

export default function FeatureProducts() {
  let { addToCart } = useContext(CartContext);
  const [wishlistState, setWishlistState] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  async function addProductToCart(productId) {
    try { await addToCart(productId); } catch (error) { toast.error('Failed to add to Cart'); console.error('Error adding item to cart:', error); }
  }

  async function toggleWishlist(productId) {
    const toastId = toast.loading(wishlistState[productId] ? 'Removing from Wishlist...' : 'Adding to Wishlist...');
    try {
      if (wishlistState[productId]) {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers: { token: localStorage.getItem('userToken') } });
      } else {
        await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers: { token: localStorage.getItem('userToken') } });
      }
      setWishlistState((prev) => ({ ...prev, [productId]: !prev[productId] }));
      toast.success(wishlistState[productId] ? 'Removed from Wishlist' : 'Added to Wishlist', { id: toastId });
    } catch (error) {
      toast.error('Failed to update Wishlist', { id: toastId });
      console.error('Error updating wishlist:', error);
    }
  }

  function getFeatureProducts() { return axios.get("https://ecommerce.routemisr.com/api/v1/products"); }

  async function getWishlist() {
    try { const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers: { token: localStorage.getItem('userToken') } });
      const wishlistIds = {}; data.data.forEach(product => wishlistIds[product._id] = true);
      setWishlistState(wishlistIds);
    } catch (error) { console.error('Error fetching wishlist:', error); }
  }

  useEffect(() => { getWishlist(); }, []);
  let { data, isError, isLoading, error } = useQuery({ queryKey: ["featureProducts"], queryFn: getFeatureProducts });

  const filteredProducts = data?.data.data.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Helmet><title>Featured Products</title></Helmet>
      <div className='container mx-auto px-4'>
        {isError ? <p>{error.message}</p> : null}
        {isLoading ? <Loader /> : (
          <> 
            <h2 className="text-2xl font-semibold text-center my-6">Featured Products</h2>
            <div className="flex mb-4 items-center">
              <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 p-2 border rounded-md" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredProducts.map((product) => (
                <div key={product._id} className='p-3 border rounded-lg shadow-md transition hover:shadow-lg relative'>
                  <NavLink to={`/productdetails/${product.id}/${product.category.name}`}>
                    <img src={product.imageCover} alt={product.title} className="w-full h-40 object-cover rounded-md" />
                    <h3 className="text-gray-700 font-semibold mt-2 text-sm truncate">{product.category.name}</h3>
                    <p className="text-gray-900 text-base font-medium truncate">{product.title}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-green-600 font-bold">EGP {product.price}</div>
                      <div className="flex items-center text-yellow-500">
                        <i className='fa fa-star'></i>
                        <span className="ml-1 text-sm">{product.ratingsAverage}</span>
                      </div>
                    </div>
                  </NavLink>
                  <button onClick={() => addProductToCart(product._id)} className="mt-3 w-full bg-main text-white py-2 rounded-lg font-semibold transition-all duration-300 ease-in-out shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-105">Add To Cart</button>
                  <button className="absolute top-2 right-2" onClick={() => toggleWishlist(product._id)}>
                    <Heart className={`w-6 h-6 transition-colors duration-300 ${wishlistState[product._id] ? 'fill-red-500 text-red-500' : 'fill-none text-gray-500'}`} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
