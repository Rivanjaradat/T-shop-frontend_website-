import { useState, useEffect } from 'react';
import axios from 'axios'; // Don't forget to import axios
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './categories.css';

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
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {categories.map((category) => (
        <SwiperSlide key={category._id} className='categories'>
          <div className="category">
            <a href="">{category.name}</a>
            <img src={category.image.secure_url} alt={category.name} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
