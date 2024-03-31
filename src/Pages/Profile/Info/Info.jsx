
import  { useState, useEffect } from 'react';


import axios from 'axios';
export default function Info() {
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
            <div className="user-avatar">
              <img src={userData.image.secure_url} alt="User" />
            </div>
            <div className="user-info">
              <p><strong>Name:</strong> {userData.userName}</p>
              
            </div>
          </>
        )}
      </div>
  </>
  )
}
