import { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './categories.css';
import { useParams } from 'react-router-dom';


import { Link } from 'react-router-dom';
export default function Categories() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get('https://ecommerce-node4.vercel.app/categories/active?page=1&limit=10');
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }
 
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section id="categories" className="container categories">
      <div className="categories-row">
        {categories.map((category) => (
          <div key={category._id} className="category">
            <a href="">{category.name}</a>
            <img src={category.image.secure_url} alt={category.name} />
            <button><Link to={`/categories/${category._id}`}>View  Products</Link></button>
          </div>
        ))}
      </div>
      <button className='categories-btn' > Load More</button>
      
    </section>
  );
}
