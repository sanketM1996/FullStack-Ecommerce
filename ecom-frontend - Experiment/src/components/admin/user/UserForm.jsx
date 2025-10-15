import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../../../store/actions";
import toast from "react-hot-toast";

export default function UserForm({ selectedUserId, clearSelection,}) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  // Populate form when editing
  useEffect(() => {
    if (selectedUserId) {
      const user = users.find((u) => u.userId === selectedUserId);
      if (user) {
        setFormData({
          userName: user.userName || "",
          email: user.email || "",
          password: "", // keep empty
        });
      }
    } else {
      setFormData({ userName: "", email: "", password: "" });
    }
  }, [selectedUserId, users]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.email) {
      toast.error("User name and email are required");
      return;
    }

    const afterSuccess = () => {
      clearSelection();
    };

    if (selectedUserId) {
      dispatch(updateUser(selectedUserId, formData, toast, afterSuccess));
    } else {
      dispatch(
        createUser(formData, toast, () => {
          setFormData({ userName: "", email: "", password: "" });
          afterSuccess();
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h2 className="text-2xl font-bold text-gray-800">
        {selectedUserId ? "Update User" : "Create User"}
      </h2>
      <input
        type="text"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        placeholder="User Name"
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password (leave blank to keep current)"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {selectedUserId ? "Update" : "Create"}
      </button>
    </form>
  );
}
