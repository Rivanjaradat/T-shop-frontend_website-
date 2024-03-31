import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./order.css";

export default function Order() {
  const [loader, setLoader] = useState(false);
  const [order, setOrder] = useState({
    couponName: "",
    address: "",
    phone: "",
  });

 
  const handelChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.post("/order", order, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });

      setOrder({
        couponName: "",
        address: "",
        phone: "",
      });

      console.log(data);
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while placing the order."
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="order-container">
      <h1>Order</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Coupon name"
          onChange={handelChange}
          name="couponName"
          value={order.couponName}
        />
        <input
          type="text"
          placeholder="Address"
          required
          onChange={handelChange}
          name="address"
          value={order.address}
        />
        <input
          type="text"
          placeholder="Phone number"
          required
          onChange={handelChange}
          name="phone"
          value={order.phone}
        />
        <button type="submit" disabled={loader}>
          {loader ? "Placing Order..." : "Order"}
        </button>
      </form>
    </div>
  );
}
