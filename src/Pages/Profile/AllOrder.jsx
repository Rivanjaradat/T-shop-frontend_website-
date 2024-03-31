import axios from 'axios';
import { useEffect, useState } from 'react';

// SVG for cancel button
const CancelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-x"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function AllOrder() {
  const [orders, setOrders] = useState([]);

  // Fetch all orders on component mount
  const getUserOrder = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.get('/order', {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      console.log(response.data.orders);
      setOrders(response.data.orders); // Set fetched orders to state
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Handle errors
    }
  };
 
  useEffect(() => {
    getUserOrder();
  }, []);
  
  const handleCancelOrder = async (orderId) => {
   
    const token = localStorage.getItem('userToken');
    try {
      const response = await axios.patch(`/order/cancel/${orderId}`, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });

      console.log(response.data);
      alert("Your Order has been Cancel ");
      window.location.reload();
    } catch (error) {
      console.error("Error cancelling order:", error);
      
    }
  };


  return (
    <div className="all-orders">
      <h2>All Orders</h2>
      <div className="orders-container">
        {orders.map(order => (
          <div key={order._Id} className="order-card">
            <div className="order-header">
              <h3 className="order-id">Order ID: {order._id}</h3>
              <button className="cancel-btn" onClick={() => handleCancelOrder(order._Id)}>
                <CancelIcon />
              </button>
            </div>
            <p>Total Price: ${order.finalPrice}</p>
            <p>Status: {order.status}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
}
