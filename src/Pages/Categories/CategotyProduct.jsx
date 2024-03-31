import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './categories.css';

export default function CategoryProduct() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);

    const getProduct = async () => {
        const { data } = await axios.get(`/products/category/${id}`);
        setProducts(data.products);
    };

    useEffect(() => {
        getProduct();
        return () => {
            console.log('clean up');
        };
    }, []);

    const addToCart = async (productId) => {
        const token = localStorage.getItem('userToken');

        // Check if user is logged in
        if (!token) {
            alert('Please login to add items to your cart.');
            return;
        }

        try {
            const { data } = await axios.post(`/cart`, {
                productId
            }, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });
            console.log(data);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <>
            <div className="Allcard">
                {products.map((product) => (
                    <div className="card" key={product._id}>
                        <div className="image-container">
                            <img src={product.mainImage.secure_url} alt={product.name} />
                            <div className="price">{product.price}</div>
                        </div>
                        <label className="favorite">
                            <input checked={true} type="checkbox" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
                                <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z"></path>
                            </svg>
                        </label>
                        <div className="content">
                            <div className="product-name">{product.name}</div>
                            <div className="rating">
                                <svg viewBox="0 0 99.498 16.286" xmlns="http://www.w3.org/2000/svg" className="svg four-star-svg">
                                    {/* Rating stars */}
                                </svg>
                            </div>
                        </div>
                        <div className="button-container">
                            <button className="buy-button button"><Link className="link-style" to={`/products/${product.id}`}>Details</Link></button>
                            <button onClick={() => addToCart(product.id)} className="cart-button button">
                                <svg viewBox="0 0 27.97 25.074" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0,1.175A1.173,1.173,0,0,1,1.175,0H3.4A2.743,2.743,0,0,1,5.882,1.567H26.01A1.958,1.958,0,0,1,27.9,4.035l-2.008,7.459a3.532,3.532,0,0,1-3.4,2.61H8.36l.264,1.4a1.18,1.18,0,0,0,1.156.955H23.9a1.175,1.175,0,0,1,0,2.351H9.78a3.522,3.522,0,0,1-3.462-2.865L3.791,2.669A.39.39,0,0,0,3.4,2.351H1.175A1.173,1.173,0,0,1,0,1.175ZM6.269,22.724a2.351,2.351,0,1,1,2.351,2.351A2.351,2.351,0,0,1,6.269,22.724Zm16.455-2.351a2.351,2.351,0,1,1-2.351,2.351A2.351,2.351,0,0,1,22.724,20.373Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
