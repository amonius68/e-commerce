import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import { Helmet } from "react-helmet";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        setCategories(categoryResponse.data.data);
        const subcategoryResponse = await axios.get("https://ecommerce.routemisr.com/api/v1/subcategories");
        setSubcategories(subcategoryResponse.data.data);
      } catch (err) {
        setError("Failed to fetch categories or subcategories. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category._id} className="border p-4 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
            <img src={category.image} alt={category.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <h2 className="text-lg font-semibold">{category.name}</h2>
          </div>
        ))}
      </div>
      <Helmet>
        <title>Categories</title>
        <meta charSet='utf-8' />
      </Helmet>
      <h2 className="text-2xl font-bold text-center my-6">Subcategories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subcategories.map((sub) => (
          <div key={sub._id} className="border p-4 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-lg font-semibold">{sub.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
