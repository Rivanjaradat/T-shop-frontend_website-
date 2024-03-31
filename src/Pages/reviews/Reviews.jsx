import axios from 'axios';
import  { useState } from 'react';

export default function Reviews() {
  const [reviews, setReviews] = useState({
    comment: "",
    rating: "",
  });
  
    
  const handelChange = (e) => {
    const { name, value } = e.target;
    setReviews({
      ...reviews,
      [name]: value,
    });
  };

  const addReview = async (productId) => {
    const token = localStorage.getItem('userToken');

    const data = await axios.post(`/products/${productId}/review`, reviews, {
      headers: {
        Authorization: `Tariq__${token}`
      }
    });
    setReviews({
      comment: "",
      rating: "",
    })
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    addReview("66099d695c69bd62330f3e0b"); // Call the addReview function
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className="text-center mt-5">Leave a Review</h3>
        <div className="container px-4 py-2 bg-light text-dark rounded">
          <label htmlFor="comment" className="form-label">
            Comment:
          </label>
          <textarea
            type="text"
            className="form-control"
            name="comment"
            value={reviews.comment}
            onChange={handelChange}
          />
          <label htmlFor="rating" className="form-label mt-3">
            Rating:
          </label>
          <input
            type="number"
            className="form-control"
            name="rating"
            min="1"
            max="5"
            value={reviews.rating}
            onChange={handelChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
