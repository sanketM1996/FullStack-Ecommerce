import React, { useEffect, useState } from "react";
import DashboardOverview from "./DashboardOverview";
import { FaBoxOpen, FaDollarSign, FaShoppingCart, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { analyticsAction } from "../../../store/actions";
import Loader from "../../shared/Loader";
import ErrorPage from "../../shared/ErrorPage";
import UserForm from "../user/UserForm";
import Modal from "../user/Modal";
import UserList from "../user/UserList";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  // ---------- User Modal State ----------
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userModalOpen, setUserModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const {
    analytics: { productCount, totalRevenue, totalOrders, userCount },
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(analyticsAction());
  }, [dispatch]);

  // ---------- Modal Handlers ----------
  const openUserCreate = () => {
    setSelectedUserId(null);
    setUserModalOpen(true);
  };
  const openUserEdit = (user) => {
    setSelectedUserId(user.userId);
    setUserModalOpen(true);
  };

  if (isLoading) return <Loader />;
  if (errorMessage) return <ErrorPage message={errorMessage} />;

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* ---- Dashboard Header ---- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            📊 Admin Dashboard
          </h1>
          <button
            onClick={openUserCreate}
            className="mt-4 sm:mt-0 px-6 py-3 rounded-xl text-white shadow-md
                       bg-gradient-to-r from-green-500 to-emerald-600
                       hover:from-green-600 hover:to-emerald-700
                       transition-transform transform hover:scale-105"
          >
            ➕ Add User
          </button>
        </div>

        {/* ---- KPI Cards ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Total Products", amount: productCount, Icon: FaBoxOpen },
            { title: "User Count", amount: userCount, Icon: FaUsers },
            { title: "Total Orders", amount: totalOrders, Icon: FaShoppingCart },
            { title: "Total Revenue", amount: totalRevenue, Icon: FaDollarSign, revenue: true },
          ].map(({ title, amount, Icon, revenue }) => (
            <div
              key={title}
              className="relative p-6 rounded-2xl text-white
                         bg-gradient-to-b from-green-500 to-emerald-600
                         shadow-md hover:shadow-xl
                         transform hover:scale-105 transition-all duration-300"
            >
              <DashboardOverview
                title={title}
                amount={amount}
                Icon={Icon}
                revenue={revenue}
                small
                className="text-white"
              />
            </div>
          ))}
        </div>

        {/* ---- User Management Section ---- */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
            <FaUsers className="mr-2 text-green-600" /> Manage Users
          </h2>
          <p className="text-gray-500 mb-6">
            View, edit, and delete users or create new ones.
          </p>

          <UserList onEdit={openUserEdit} />
        </div>
      </div>

      {/* ---- User Modal ---- */}
      <Modal open={userModalOpen} onClose={() => setUserModalOpen(false)}>
        <UserForm
          selectedUserId={selectedUserId}
          clearSelection={() => {
            setSelectedUserId(null);
            setUserModalOpen(false);
          }}
        />
      </Modal>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Dashboard;
