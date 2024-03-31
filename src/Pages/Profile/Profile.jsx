import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './profile.css';
import axios from 'axios';

import { Tab, Tabs } from 'react-bootstrap';
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

export default function Profile() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    const token = localStorage.getItem('userToken');

    try {
      const { data } = await axios.get('/user/profile', {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      setUserData(data.user); // Set user data to userData state
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
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
    // Implement cancel order functionality here
    const token = localStorage.getItem('userToken');
    try {
      const response = await axios.patch(`/order/cancel/${orderId}`, null, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });

      console.log(response.data);
      alert("Your Order has been Cancel ");
      window.location.reload();
    } catch (error) {
      console.error("Error cancelling order:", error);
      // Handle error gracefully, show error message to user, etc.
     // toast.error("Something went wrong when trying to cancel the order.");
    }
  };

  return (
    <div className="profile-container">
       <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="Information" title="Information">
      <div className="user-details">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="user-avatar">
              <img src={userData.image.secure_url} alt="User" />
            </div>
            <div className="user-info">
              <p><strong>Name:</strong> {userData.userName}</p>
              
            </div>
          </>
        )}
      </div>
      </Tab>
      <Tab eventKey="contact" title="contact">
      <div className="user-details">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            
            <div className="user-info">
          
              <p><strong>Email:</strong> {userData.email}</p>
            </div>
          </>
        )}
      </div>
      </Tab>
      <Tab eventKey="order" title="order" >
      <div className="all-orders">
      <h2>All Orders</h2>
      <div className="orders-container">
        {orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h3 className="order-id">Order ID: {order._id}</h3>
              <button className="cancel-btn" onClick={() => handleCancelOrder(order._id)}>
                <CancelIcon />
              </button>
            </div>
            <p>Total Price: ${order.finalPrice}</p>
            <p>Status: {order.status}</p>
           
           
          </div>
        ))}
      </div>
    </div>
      </Tab>
    </Tabs>

      
    </div>
  );
}
