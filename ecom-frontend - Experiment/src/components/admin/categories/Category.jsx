import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { FaFolderOpen, FaThList } from "react-icons/fa";
import toast from "react-hot-toast";

import Modal from "../../shared/Modal";
import AddCategoryForm from "./AddCategoryForm";
import Loader from "../../shared/Loader";
import { DeleteModal } from "../../shared/DeleteModal";
import useCategoryFilter from "../../../hooks/useCategoryFilter";
import ErrorPage from "../../shared/ErrorPage";
import { deleteCategoryDashboardAction } from "../../../store/actions";
import { categoryTableColumns } from "../../helper/tableColumn";

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);

  // ---------- Local State ----------
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // ---------- Redux State ----------
  const { categoryLoader, errorMessage } = useSelector((state) => state.errors);
  const { categories, pagination } = useSelector((state) => state.products);

  // Fetch categories
  useCategoryFilter();

  const tableRecords = categories?.map((c) => ({
    id: c.categoryId,
    categoryName: c.categoryName,
    version: c.version,
  }));

  // ---------- Handlers ----------
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenEditModal(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  };

  const onDeleteHandler = () => {
    dispatch(
      deleteCategoryDashboardAction(
        setOpenDeleteModal,
        selectedCategory?.id,
        toast
      )
    );
  };

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1; // DataGrid is 0-based
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const emptyCategories = !categories || categories.length === 0;

  if (errorMessage) return <ErrorPage message={errorMessage} />;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Header & Add Category */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {!emptyCategories && (
          <h1 className="text-4xl font-bold text-center md:text-left
                       bg-gradient-to-r from-green-500 to-emerald-600
                       bg-clip-text text-transparent">
            All Categories
          </h1>
        )}
        <button
          onClick={() => setOpenAddModal(true)}
          className="inline-flex items-center gap-2 rounded-xl
                     bg-gradient-to-r from-green-500 to-emerald-600
                     hover:from-green-600 hover:to-emerald-700
                     text-white font-semibold py-2 px-5 shadow-md
                     transition-transform duration-200 hover:scale-105"
        >
          <FaThList className="text-lg" />
          Add Category
        </button>
      </div>

      {/* Loader / Empty / Table */}
      {categoryLoader ? (
        <Loader />
      ) : emptyCategories ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <FaFolderOpen size={60} className="mb-4 text-emerald-500" />
          <h2 className="text-2xl font-semibold">No Categories Created Yet</h2>
          <p className="mt-2 text-gray-400 text-center">
            Click “Add Category” to create your first one.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl rounded-2xl bg-white shadow-lg p-6">
          <DataGrid
            autoHeight
            className="w-full"
            rows={tableRecords}
            columns={categoryTableColumns(handleEdit, handleDelete)}
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
            pageSizeOptions={[pagination?.pageSize || 10]}
          />
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        open={openAddModal || openEditModal}
        setOpen={openEditModal ? setOpenEditModal : setOpenAddModal}
        title={openEditModal ? "Update Category" : "Add Category"}
      >
        <AddCategoryForm
          setOpen={openEditModal ? setOpenEditModal : setOpenAddModal}
          open={categoryLoader}
          category={selectedCategory}
          update={openEditModal}
        />
      </Modal>

      {/* Delete Modal */}
      <DeleteModal
        open={openDeleteModal}
        loader={categoryLoader}
        setOpen={setOpenDeleteModal}
        title="Are you sure you want to delete this category?"
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
};

export default Category;
