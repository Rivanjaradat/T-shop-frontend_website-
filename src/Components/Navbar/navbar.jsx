import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
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
              <NavLink className="nav-link text-white" to='/categories'>Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to='/signin'>Signin</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to='/signup'>Signup</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to='/products'>Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to='/cart'>Cart</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
