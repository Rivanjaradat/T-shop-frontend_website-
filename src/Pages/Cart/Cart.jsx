import { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css";
import { Link } from "react-router-dom";
import cartImg from "../../assets/image/public/cart.jpg";
import { toast } from "react-toastify";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [incrementLoading, setIncrementLoading] = useState(false);
  const [decrementLoading, setDecrementLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCart = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const { data } = await axios.get("/cart", {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCart(data.products);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const deleteCartItem = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(
        "/cart/removeItem",
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      // After deleting the item, refresh the cart
      getCart();
      toast.success(`Removed Successfully`);
    } catch (err) {
      console.log("Error in deleting the item");
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");
      await axios.patch(
        "/cart/clear",
        null,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setLoading(false);
      // After clearing the cart, refresh the cart
      getCart();
      toast.success(`Your cart has been cleared!`);
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error("Error clearing cart:", err);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const incrementQuantity = async (productId) => {
    try {
      setIncrementLoading(true); // Set loading state to true
      const token = localStorage.getItem("userToken");
      await axios.patch(
        "/cart/incraseQuantity",
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      // After incrementing the quantity, refresh the cart
      getCart();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIncrementLoading(false); // Set loading state back to false
    }
  };

  const decrementQuantity = async (productId) => {
    try {
      setDecrementLoading(true); // Set loading state to true
      const token = localStorage.getItem("userToken");
      await axios.patch(
        "/cart/decraseQuantity",
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      // After decrementing the quantity, refresh the cart
      getCart();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setDecrementLoading(false); // Set loading state back to false
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error fetching cart: {error.message}</h1>;
  }

  return (
    <div className="cart-container">
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div key={item._id} className="cart-item">
            <div className="left">
              <h3 className="cart-item-name">{item.details.name}</h3>
              <img
                src={item.details.mainImage.secure_url}
                alt={item.details.name}
                className="cart-item-image"
              />
            </div>
            <div className="cart-item-details">
              <p className="cart-item-price">Price: ${item.details.price}</p>
              <div className="quantity-controls">
                <button
                  disabled={decrementLoading} // Disable button when loading
                  onClick={() => decrementQuantity(item.productId)}
                >
                  {decrementLoading ? "Loading..." : "-"}
                </button>
                <p className="cart-item-quantity">{item.quantity}</p>
                <button
                  disabled={incrementLoading} // Disable button when loading
                  onClick={() => incrementQuantity(item.productId)}
                >
                  {incrementLoading ? "Loading..." : "+"}
                </button>
              </div>

              <p className="cart-item-total">
                Total: ${item.details.price * item.quantity}
              </p>
              <div className="delete">
                <svg
                  onClick={() => deleteCartItem(item.productId)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="24"
                  height="24"
                  fill="black"
                >
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </div>
            </div>
          </div>
        ))
      ) : (
        <img src={cartImg} />
      )}
      {cart.length > 0 && (
        <div className="checkout-btn-container">
          <button className="checkout-btn">
            <Link to="./order">Check Out Now!</Link>
          </button>
          <button onClick={clearCart}>clear cart !</button>
        </div>
      )}
    </div>
  );
}
