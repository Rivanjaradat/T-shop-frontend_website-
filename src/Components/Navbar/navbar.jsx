import  { useContext, useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { UserContext } from '../../Context/User';
import axios from 'axios'; // Import axios
import './Navbar.css';

export default function Navbar() {
  const { userName, setUserName, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0); // State to store cart item count

  const logout = () => {
    setUserToken(null);
    setUserName(null);
    navigate('/signin');
    localStorage.removeItem('userToken');
  };

  // Fetch cart data to get the item count
  const fetchCartData = async () => {
    const token = localStorage.getItem('userToken');
    try {
      const { data } = await axios.get("/cart", {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCartItemCount(data.products.length); // Set cart item count
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchCartData(); // Fetch cart data on component mount
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navStyle fixed-top">
      <div className="container-md">
        <a className="navbar-brand text-white" href="#">T Shop</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to='/home'>Home</NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link text-white" to='/products'>Products</NavLink>
            </li>
            {userName ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to='/cart'>Cart ({cartItemCount})</NavLink> {/* Display cart item count */}
                </li>
                <li className="nav-item">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                      <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
               
              </>
            ) : (
              <li className="nav-item">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/signin">Signin</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/signup">Signup</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
