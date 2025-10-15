import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  createCategoryDashboardAction,
  updateCategoryDashboardAction,
} from "../../../store/actions";
import InputField from "../../shared/InputField";

const AddCategoryForm = ({ setOpen, open, category, update = false }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  // ---------- Submit Handler ----------
  const addNewCategoryHandler = (data) => {
    if (!update) {
      dispatch(createCategoryDashboardAction(data, setOpen, reset, toast));
    } else {
      dispatch(
        updateCategoryDashboardAction(data, setOpen, category.id, reset, toast)
      );
    }
  };

  // ---------- Prefill on Edit ----------
  useEffect(() => {
    if (update && category) {
      setValue("categoryName", category?.categoryName);
    }
  }, [update, category, setValue]);

  return (
    <div className="py-6 relative h-full bg-white rounded-xl shadow-lg">
      <form
        className="space-y-6 px-4 sm:px-6"
        onSubmit={handleSubmit(addNewCategoryHandler)}
      >
        {/* ---- Header ---- */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {update ? "Update Category" : "Add New Category"}
        </h2>

        {/* ---- Category Input ---- */}
        <div className="flex flex-col gap-4">
          <InputField
            label="Category Name"
            required
            id="categoryName"
            type="text"
            message="This field is required*"
            placeholder="Enter category name"
            register={register}
            errors={errors}
          />
        </div>

        {/* ---- Action Buttons ---- */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-5 py-2 rounded-lg border border-gray-300
                       text-gray-700 hover:bg-gray-100 transition-colors
                       font-medium shadow-sm"
          >
            Cancel
          </button>

          <button
            disabled={open}
            type="submit"
            className={`px-6 py-2 rounded-lg text-white font-medium shadow-md
                        bg-gradient-to-r from-green-500 to-emerald-600
                        hover:from-green-600 hover:to-emerald-700
                        transition-all duration-200
                        ${open ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {open ? "Saving..." : update ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
