import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./product.css";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Number of items to display per page
  const [reviews, setReviews] = useState({
    comment: "",
    rating: "",
  });
  const [loadingCart, setLoadingCart] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviews({
      ...reviews,
      [name]: value,
    });
  };

  const addReview = async (productId) => {
    const token = localStorage.getItem("userToken");

    const data = await axios.post(`/products/${productId}/review`, reviews, {
      headers: {
        Authorization: `Tariq__${token}`,
      },
    });
    setReviews({
      comment: "",
      rating: "",
    });
    console.log(data);
  };

  const getUserOrder = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.get("/order", {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setOrders(response.data.orders); // Set fetched orders to state
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data.product);
      setMainImageUrl(data.product.mainImage.secure_url);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const addToCart = async (productId) => {
    setLoadingCart(true);
    const token = localStorage.getItem("userToken");

    // Check if user is logged in
    if (!token) {
      setToastMessage("Please login to add items to your cart.");
      setLoadingCart(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `/cart`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      setToastMessage("Item added to cart successfully.");
      console.log(data.products);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setToastMessage("Failed to add item to cart.");
    }
    setLoadingCart(false);
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      // Initially display only the first two images
      setDisplayedImages(product.subImages.slice(0, 2));
    }
  }, [product]);

  const nextImages = () => {
    const nextPage = currentPage + 1;
    const indexOfLastItem = nextPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setDisplayedImages(
      product.subImages.slice(indexOfFirstItem, indexOfLastItem)
    );
    setCurrentPage(nextPage);
  };

  const prevImages = () => {
    const prevPage = currentPage - 1;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setDisplayedImages(
      product.subImages.slice(
        indexOfFirstItem - itemsPerPage,
        indexOfLastItem - itemsPerPage
      )
    );
    setCurrentPage(prevPage);
  };

  const handleSubImageClick = (index, imageUrl) => {
    setCurrentImageIndex(index);
    setMainImageUrl(imageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview(product._id);
  };

  return (
    <section>
      {product && (
        <div key={product.id} className="productDetails">
          <div className="leftSide-details">
            <img className="mainImage" src={mainImageUrl} alt="" />
            <div className="subImages-container">
              <button className="subimage-btn" onClick={prevImages}>
                &lt;
              </button>
              {displayedImages.map((subImage, index) => (
                <div
                  key={index}
                  className="subImage"
                  onClick={() =>
                    handleSubImageClick(currentImageIndex + index, subImage.secure_url)
                  }
                >
                  <img src={subImage.secure_url} alt="" className="zoomable" />
                </div>
              ))}
              <button className="subimage-btn" onClick={nextImages}>
                &gt;
              </button>
            </div>
          </div>
          <div className="rightSide-details">
            <h2>{product.name}</h2>
            <hr />
            <p>{product.description}</p>
            <div className="details-text">
              <h4>Stock:</h4>
              <span>{product.stock}</span>
            </div>
            <div className="details-text">
              <h4>Price:</h4>
              <span>{product.price}</span>
            </div>
            <div className="details-text">
              <h4>Sold :</h4>
              <span>{product.number_sellers}</span>
            </div>
            <div className="details-text">
              <h4>Discount :</h4>
              <span>{product.discount}</span>
            </div>
            <button
              onClick={() => addToCart(product._id)}
              className="btn-cart"
            >
              {loadingCart ? "Adding to Cart..." : "Add to Cart"}
            </button>
          </div>
        </div>
      )}

      <div className="makeReview">
        <form className="feedbackForm" onSubmit={handleSubmit}>
          <h3 className="text-center mt-5">Feedback</h3>
          <div className="container px-4 py-2 bg-light text-dark rounded">
            <label htmlFor="comment" className="form-label">
              Comment:
            </label>
            <textarea
              type="text"
              className="form-control"
              name="comment"
              value={reviews.comment}
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="feedback">
        {product &&
          product.reviews
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((review, index) => (
              <div key={index} className="review">
                <p>{review.comment}</p>
                <p>Rating: {review.rating}</p>
                <p>By: {review.createdBy.userName}</p>
              </div>
            ))}
      </div>
      {product && (
        <div className="feedback-controls">
          <button onClick={prevImages}>Previous</button>
          <button onClick={nextImages}>Next</button>
        </div>
      )}
      <div
        className="toast"
        style={{ display: toastMessage ? "block" : "none" }}
      >
        {toastMessage}
      </div>
    </section>
  );
}
