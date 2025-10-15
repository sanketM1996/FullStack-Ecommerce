import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  getUserById,
  clearSingleUser,
} from "../../../store/actions";
import toast from "react-hot-toast";
import Modal from "./Modal";

export default function UserList({ onEdit }) {
  const dispatch = useDispatch();
  const { users, pagination, loading, singleUser, success } = useSelector(
    (state) => state.users
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < (pagination?.totalPages || 0)) {
      setCurrentPage(page);
    }
  };

  const handleView = (id) => {
    dispatch(getUserById(id));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(clearSingleUser());
  };

  useEffect(() => {
    if (success && openModal) {
      handleCloseModal();
      dispatch({ type: "RESET_SUCCESS" });
    }
  }, [success, openModal, dispatch]);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
        Users
      </h2>

      {/* Users Table */}
      {loading && !users?.length ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <table className="table-auto w-full border rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr
                key={u.userId}
                className="border-t hover:bg-green-50 transition duration-200"
              >
                <td className="px-4 py-3">{u.userId}</td>
                <td className="px-4 py-3">{u.userName}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => onEdit(u)}
                    className="px-3 py-1 rounded-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-transform transform hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleView(u.userId)}
                    className="px-3 py-1 rounded-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-transform transform hover:scale-105"
                  >
                    View
                  </button>
                  <button
                    onClick={() => dispatch(deleteUser(u.userId, toast))}
                    className="px-3 py-1 rounded-lg text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 transition-transform transform hover:scale-105"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {pagination?.totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded-xl text-white transition ${
              currentPage === 0
                ? "bg-gradient-to-r from-gray-400 to-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105"
            }`}
          >
            Prev
          </button>
          {Array.from({ length: pagination.totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx)}
              className={`px-4 py-2 rounded-xl text-white transition ${
                idx === currentPage
                  ? "bg-gradient-to-r from-green-600 to-emerald-700"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage + 1 === pagination.totalPages}
            className={`px-4 py-2 rounded-xl text-white transition ${
              currentPage + 1 === pagination.totalPages
                ? "bg-gradient-to-r from-gray-400 to-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* User Details Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        {loading && !singleUser ? (
          <p className="text-center text-gray-500">Loading user...</p>
        ) : singleUser ? (
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-green-700">
              User Details
            </h3>
            <p><strong>ID:</strong> {singleUser.userId}</p>
            <p><strong>Name:</strong> {singleUser.userName}</p>
            <p><strong>Email:</strong> {singleUser.email}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">No user data found.</p>
        )}
      </Modal>
    </div>
  );
}
