import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profile_icon from '../../assets/profile_icon.png';
import bag_icon from '../../assets/bag_icon.png';
import logout_icon from '../../assets/logout_icon.png';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.png';
import basket_icon from '../../assets/basket_icon.png';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowDropdown(false);
  };

  // ✅ Watch localStorage token immediately and set it to context if not set
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken && !token) {
      setToken(localToken);
    }
  }, [token, setToken]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target.alt !== "profile"
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
      </ul>

      <div className="navbar-right">
        <img src={search_icon} alt="search" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={basket_icon} alt="basket" />
          </Link>
          {getTotalCartAmount() !== 0 && <div className="dot"></div>}
        </div>

        {/* ✅ Show profile if logged in */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile" ref={dropdownRef}>
            <img
              src={profile_icon}
              alt="profile"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="navbar-profile-dropdown show">
                <ul>
                  <li>
                    <img src={bag_icon} alt="orders" />
                    <p>Orders</p>
                  </li>
                  <hr />
                  <li onClick={logout}>
                    <img src={logout_icon} alt="logout" />
                    <p>Logout</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
