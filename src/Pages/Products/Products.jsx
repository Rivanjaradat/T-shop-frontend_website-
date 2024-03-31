import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './product.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const { data } = await axios.get('/products?page=1&limit=10');
      // Assuming each product object in the response has a 'rating' field
      const productsWithRating = data.products.map(product => ({
        ...product,
        rating: Math.floor(Math.random() * 5) + 1 // Dummy rating for demonstration
      }));
      setProducts(productsWithRating);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };
  

  const addToCart = async (productId) => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      alert('Please login to add items to your cart.');
      return;
    }

    try {
      const { data } = await axios.post(`/cart`, { productId }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      console.log(data.products);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const remainder = rating - filledStars;
    const starIcons = [];
    for (let i = 0; i < filledStars; i++) {
      starIcons.push(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#FFD43B" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
      );
    }
    if (remainder > 0) {
      starIcons.push(
        <svg key="remainder" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.498 16.286" className="svg four-star-svg">
          <path d={`M0 0h${remainder * 99.498}v16.286H0z`} fill="#FFD700"/>
        </svg>
      );
    }
    return starIcons;
  };

  return (
    <div className="Allcard">
      {loading ? ( // Display loader if loading is true
        <div className="loader">Loading...</div>
      ) : (
        products.map((product) => (
          <div className="card" key={product._id}>
            <div className="image-container">
              <img src={product.mainImage.secure_url} alt={product.name} />
              <div className="price">{product.price}</div>
            </div>
            <label className="favorite">
              <input checked={true} type="checkbox"/>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
                <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z"></path>
              </svg>
            </label>
            <div className="content">
              <div className="product-name">{product.name}</div>
              <div className="rating">
                {renderStars(product.rating)}
              </div>
            </div>
            <div className="button-container">
              <button className="buy-button button">
                <Link className="link-style" to={`/products/${product.id}`}>Details</Link>
              </button>
              <button onClick={() => addToCart(product.id)} className="cart-button button">
                <svg viewBox="0 0 27.97 25.074" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,1.175A1.173,1.173,0,0,1,1.175,0H3.4A2.743,2.743,0,0,1,5.882,1.567H26.01A1.958,1.958,0,0,1,27.9,4.035l-2.008,7.459a3.532,3.532,0,0,1-3.4,2.61H8.36l.264,1.4a1.18,1.18,0,0,0,1.156.955H23.9a1.175,1.175,0,0,1,0,2.351H9.78a3.522,3.522,0,0,1-3.462-2.865L3.791,2.669A.39.39,0,0,0,3.4,2.351H1.175A1.173,1.173,0,0,1,0,1.175ZM6.269,22.724a2.351,2.351,0,1,1,2.351,2.351A2.351,2.351,0,0,1,6.269,22.724Zm16.455-2.351a2.351,2.351,0,1,1-2.351,2.351A2.351,2.351,0,0,1,22.724,20.373Z" id="cart-shopping-solid"></path>
                </svg>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
