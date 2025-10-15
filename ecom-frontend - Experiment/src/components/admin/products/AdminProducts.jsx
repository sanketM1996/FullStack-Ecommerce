import React, { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import Loader from "../../shared/Loader";
import Modal from "../../shared/Modal";
import DeleteModal from "../../shared/DeleteModal";
import ProductViewModal from "../../shared/ProductViewModel";

import AddProductForm from "./AddProductForm";
import ImageUploadForm from "./ImageUploadForm";
import { adminProductTableColumn } from "../../helper/tableColumn";
import { deleteProduct } from "../../../store/actions";
import { useDashboardProductFilter } from "../../../hooks/useProductFilter";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const { products, pagination } = useSelector((state) => state.products);
  const { isLoading } = useSelector((state) => state.errors);
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  useDashboardProductFilter();

  const [currentPage, setCurrentPage] = useState(pagination?.pageNumber + 1 || 1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const tableRecords = products?.map((item) => ({
    id: item.productId,
    productName: item.productName,
    description: item.description,
    discount: item.discount,
    image: item.image,
    price: item.price,
    quantity: item.quantity,
    specialPrice: item.specialPrice,
  }));

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenUpdateModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  };

  const handleImageUpload = (product) => {
    setSelectedProduct(product);
    setOpenImageUploadModal(true);
  };

  const handleProductView = (product) => {
    setSelectedProduct(product);
    setOpenProductViewModal(true);
  };

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const onDeleteHandler = () => {
    dispatch(
      deleteProduct(
        setLoader,
        selectedProduct?.id,
        toast,
        setOpenDeleteModal,
        isAdmin
      )
    );
  };

  const emptyProduct = !products || products?.length === 0;

  return (
    <div className="p-6">
      {/* Header & Add Product */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-center md:text-left
                       bg-gradient-to-r from-green-500 to-emerald-600
                       bg-clip-text text-transparent">
          Products
        </h1>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-600
                     hover:from-green-600 hover:to-emerald-700
                     text-white font-semibold py-2 px-5 flex items-center gap-2
                     rounded-xl shadow-md transition-transform duration-200 hover:scale-105"
        >
          <MdAddShoppingCart className="text-xl" />
          Add Product
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : emptyProduct ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <FaBoxOpen size={60} className="mb-4 text-emerald-600" />
          <h2 className="text-2xl font-semibold">No Products Created Yet</h2>
          <p className="mt-2 text-gray-400">
            Click on "Add Product" to create your first product.
          </p>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <DataGrid
            className="w-full"
            rows={tableRecords}
            columns={adminProductTableColumn(
              handleEdit,
              handleDelete,
              handleImageUpload,
              handleProductView
            )}
            paginationMode="server"
            rowCount={pagination?.totalElements || 0}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pagination?.pageSize || 10,
                  page: currentPage - 1,
                },
              },
            }}
            onPaginationModelChange={handlePaginationChange}
            disableRowSelectionOnClick
            disableColumnResize
            pageSizeOptions={[pagination?.pageSize || 10]}
            pagination
            paginationOptions={{
              showFirstButton: true,
              showLastButton: true,
              hideNextButton: currentPage === pagination?.totalPages,
            }}
          />
        </div>
      )}

      {/* Modals */}
      <Modal
        open={openAddModal || openUpdateModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
        title={openUpdateModal ? "Update Product" : "Add Product"}
      >
        <AddProductForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
          product={selectedProduct}
          update={openUpdateModal}
          currentPage={currentPage}
          pageSize={pagination?.pageSize || 10}
        />
      </Modal>

      <Modal
        open={openImageUploadModal}
        setOpen={setOpenImageUploadModal}
        title="Upload Product Image"
      >
        <ImageUploadForm setOpen={setOpenImageUploadModal} product={selectedProduct} />
      </Modal>

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        loader={loader}
        title="Delete Product"
        onDeleteHandler={onDeleteHandler}
      />

      <ProductViewModal
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default AdminProducts;
