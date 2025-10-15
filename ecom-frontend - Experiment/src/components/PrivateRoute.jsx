import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ publicPage = false, adminOnly = false }) => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
  const isSeller = user && user?.roles?.includes("ROLE_SELLER");
  const location = useLocation();

  // Public pages (login, register) → redirect if logged in
  if (publicPage) {
    return user ? <Navigate to="/" /> : <Outlet />;
  }

  // Admin-only pages
  if (adminOnly) {
    if (isSeller && !isAdmin) {
      const sellerAllowedPaths = ["/admin/orders", "/admin/products"];
      const sellerAllowed = sellerAllowedPaths.some((path) =>
        location.pathname.startsWith(path)
      );
      if (!sellerAllowed) {
        return <Navigate to="/" replace />;
      }
    }
    return isAdmin || isSeller ? <Outlet /> : <Navigate to="/" />;
  }

  // ✅ Normal users can access here
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
