import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">🍳</span>
          <span className="logo-text">Ingredient Chef</span>
        </div>
        <div className="navbar-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            end
          >
            My Fridge
          </NavLink>
          <NavLink 
            to="/box" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            My Recipe Box
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
