
import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../profile.css';
import axios from 'axios';
export default function Contact() {
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

  return (
  <>
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
  </>
  )
}
