import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]); // Initialize categories with an empty array
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Initialize page state for pagination

  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/categories/active?page=${page}&limit=6`);
      setCategories((prevCategories) => [...prevCategories, ...data.categories]); // Append new categories to existing ones
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const loadMoreCategories = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number to fetch the next set of categories
  }

  useEffect(() => {
    getCategories();
  }, [page]); // Trigger useEffect whenever page state changes

  return (
    <section id="categories" className="container categories">
      {loading && <p>Loading...</p>}
      {error && <h2>Failed to load categories. Please try again later.</h2>}
      <div className="categories-row">
        {categories.map((category) => (
          <div key={category._id} className="category">
            <p>{category.name}</p>
            <img src={category.image.secure_url} alt={category.name} />
            <button><Link to={`/categories/${category._id}`}>View Products</Link></button>
          </div>
        ))}
      </div>
      <button onClick={loadMoreCategories} className="load-more">Load More</button>
    </section>
  );
}
