import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaStore, FaCartPlus, FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import UserMenu from "../UserMenu";

const Navbar = () => {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
const {cart} =useSelector((state)=>state.carts);
const { user } = useSelector((state) => state.auth);

  const handleLinkClick = () => {
    setNavbarOpen(false); // close menu after clicking a link
  };

  return (
    <div className="h-[70px] bg-gradient-to-r from-black via-gray-900 to-black text-white z-50 flex items-center sticky top-0 shadow-lg">
      <div className="lg:pl-14 sm:px-8 px-4 w-full flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl sm:text-xl font-bold animate-pulse" onClick={handleLinkClick}>
          <FaStore className="mr-2 text-3xl sm:text-2xl text-green-400" />
          <span className="font-[Poppins] text-white drop-shadow-[0_0_10px_#34d399]">
            E-Store
          </span>
        </Link>

        {/* Hamburger button (mobile) */}
        <div className="lg:hidden text-2xl cursor-pointer" onClick={() => setNavbarOpen(!navbarOpen)}>
          {navbarOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Nav Links */}
        <ul
          className={`lg:flex lg:items-center lg:gap-6 absolute lg:static left-0 top-[70px] lg:top-0 w-full lg:w-auto 
          bg-black lg:bg-transparent transition-all duration-300 ease-in-out 
          ${navbarOpen ? "opacity-100 visible" : "opacity-0 invisible lg:opacity-100 lg:visible"}`}
        >
          <li className="font-[500] transition-all duration-300 px-6 py-3 lg:p-0 text-lg sm:text-base">
            <Link onClick={handleLinkClick} className={`${path === "/" ? "text-green-400 font-semibold" : "text-gray-200"} hover:text-green-400`} to="/">
              Home
            </Link>
          </li>
          <li className="font-[500] transition-all duration-300 px-6 py-3 lg:p-0 text-lg sm:text-base">
            <Link onClick={handleLinkClick} className={`${path === "/products" ? "text-green-400 font-semibold" : "text-gray-200"} hover:text-green-400`} to="/products">
              Products
            </Link>
          </li>
          <li className="font-[500] transition-all duration-300 px-6 py-3 lg:p-0 text-lg sm:text-base">
            <Link onClick={handleLinkClick} className={`${path === "/about" ? "text-green-400 font-semibold" : "text-gray-200"} hover:text-green-400`} to="/about">
              About
            </Link>
          </li>
          <li className="font-[500] transition-all duration-300 px-6 py-3 lg:p-0 text-lg sm:text-base">
            <Link onClick={handleLinkClick} className={`${path === "/contact" ? "text-green-400 font-semibold" : "text-gray-200"} hover:text-green-400`} to="/contact">
              Contact
            </Link>
          </li>
          <li className="font-[500] transition-all duration-300 px-6 py-3 lg:p-0 text-lg sm:text-base">
            <Link onClick={handleLinkClick} className={`${path === "/cart" ? "text-green-400 font-semibold" : "text-gray-200"} hover:text-green-400`} to="/cart">
              <Badge showZero badgeContent={cart?.length || 0} color="primary" overlap="circular" anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <FaCartPlus size={22} />
              </Badge>
            </Link>
          </li>
          {user && user.id ? (
            <li className="px-6 py-3 lg:p-0">
              <UserMenu />
            </li>
          ):( <li className="px-6 py-3 lg:p-0">
            <Link
              onClick={handleLinkClick}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 px-4 py-2 rounded-xl text-white font-semibold text-sm shadow-md transition-all duration-300"
              to="/login"
            >
              <FaSignInAlt />
              <span>Login</span>
            </Link>
          </li>)}
         
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
