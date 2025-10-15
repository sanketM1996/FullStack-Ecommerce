import { Avatar, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { FaShoppingCart,FaUserShield } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BackDrop from "./BackDrop";
import { logOutUser } from "../store/actions";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const isAdmin = user && user?.roles.includes("ROLE_ADMIN");
    const isSeller = user && user?.roles.includes("ROLE_SELLER");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOutHandler = () => {
    dispatch(logOutUser(navigate));
  };

  // Get the first letter of username
  const userInitial = user?.username
    ? user.username.charAt(0).toUpperCase()
    : "";

  return (
    <div className="relative z-30">
      {/* User avatar button (no border now) */}
      <div
        className={`inline-flex items-center gap-1 rounded-full cursor-pointer transition text-slate-700 px-3 py-1 sm:px-3 sm:py-1.5 transform hover:scale-105 hover:shadow-lg max-w-fit`}
        onClick={user ? handleClick : undefined}
      >
        <Avatar
          alt={user?.username || "User"}
          src=""
          sx={{
            bgcolor: user ? "#16a34a" : "#9ca3af", // green if user exists, gray otherwise
            color: "white",
            fontWeight: "bold",
          }}
        >
          {userInitial || "?"}
        </Avatar>
      </div>

      {/* Dropdown Menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { width: 200 },
        }}
      >
        <Link to="/profile">
          <MenuItem className="flex gap-2" onClick={handleClose}>
            <BiUser className="text-xl text-emerald-600" />
            <span className="font-bold text-[16px] mt-1">
              {user?.username}
            </span>
          </MenuItem>
        </Link>

        <Link to="/profile/orders">
          <MenuItem className="flex gap-2" onClick={handleClose}>
            <FaShoppingCart className="text-xl text-emerald-600" />
            <span className="font-semibold">Orders</span>
          </MenuItem>
        </Link>
 { (isAdmin || isSeller) && (
          <Link to={isAdmin ? "/admin" : "/admin/orders"}>
            <MenuItem className="flex gap-2" 
                onClick={handleClose}>
                    <FaUserShield className='text-xl'/>
                    <span className='font-semibold'>
                        {isAdmin ? "Admin Panel" : "Seller Panel"}
                    </span>
            </MenuItem>
          </Link> )}
        <MenuItem className="flex gap-2" onClick={logOutHandler}>
          <div className="font-semibold w-full flex gap-2 items-center bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 px-4 py-1 text-white rounded-md transition transform hover:scale-105">
            <IoExitOutline className="text-xl" />
            <span className="font-bold text-[16px] mt-1">LogOut</span>
          </div>
        </MenuItem>
      </Menu>

      {/* Backdrop */}
      {open && <BackDrop />}
    </div>
  );
};

export default UserMenu;
