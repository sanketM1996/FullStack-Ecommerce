import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdPersonAdd, MdStorefront } from "react-icons/md";

import SellerTable from "./SellerTable";
import ErrorPage from "../../shared/ErrorPage";
import Loader from "../../shared/Loader";
import Modal from "../../shared/Modal";
import AddSellerForm from "./AddSellerForm";
import useSellerFilter from "./useSellerFilter";

const Sellers = () => {
  const [openModal, setOpenModal] = useState(false);
  const { sellers, pagination } = useSelector((state) => state.seller);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  // Fetch sellers with pagination
  useSellerFilter();

  const emptySellers = !sellers || sellers?.length === 0;

  if (errorMessage) return <ErrorPage message={errorMessage} />;

  return (
    <div className="p-6">
      {/* Header & Add Seller Button */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-center md:text-left bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
          Sellers
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700
                     text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-lg shadow-lg
                     transition-transform duration-200 transform hover:scale-105"
        >
          <MdPersonAdd className="text-xl" />
          Add Seller
        </button>
      </div>

      {/* Loader */}
      {isLoading ? (
        <Loader />
      ) : emptySellers ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <MdStorefront size={60} className="mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold">No Sellers Created Yet</h2>
          <p className="mt-2 text-gray-400">
            Click on "Add Seller" to create your first seller.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <SellerTable sellers={sellers} pagination={pagination} />
        </div>
      )}

      {/* Add Seller Modal */}
      <Modal open={openModal} setOpen={setOpenModal} title="Add New Seller">
        <AddSellerForm setOpen={setOpenModal} />
      </Modal>
    </div>
  );
};

export default Sellers;
