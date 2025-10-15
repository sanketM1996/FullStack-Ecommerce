import React, { useEffect } from "react";
import InputField from "../shared/InputField";
import { useForm } from "react-hook-form";
import { FaAddressCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Spinners from "../shared/Spinners";
import toast from "react-hot-toast";
import { addUpdateUserAddress } from '../../store/actions';

const AddAddressForm = ({ address, setOpenAddressModal }) => {
  const dispatch = useDispatch();
  const { btnLoader } = useSelector((state) => state.errors);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSaveAddressHandler = async (data) => {
    dispatch(addUpdateUserAddress(
      data,
      toast,
      address?.addressId,
      setOpenAddressModal
    ));
  };

  useEffect(() => {
    if (address?.addressId) {
      setValue("buildingName", address?.buildingName);
      setValue("city", address?.city);
      setValue("street", address?.street);
      setValue("state", address?.state);
      setValue("pincode", address?.pincode);
      setValue("country", address?.country);
    }
  }, [address]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 sm:p-8">
      <form
        onSubmit={handleSubmit(onSaveAddressHandler)}
        className="flex flex-col gap-5"
      >
        {/* Header */}
        <div className="flex justify-center items-center mb-4 font-semibold text-2xl sm:text-3xl text-slate-800">
          <FaAddressCard className="mr-2 text-emerald-600 text-3xl sm:text-4xl" />
          {!address?.addressId ? "Add Address" : "Update Address"}
        </div>

        {/* Input Fields in grid (responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Building Name"
            required
            id="buildingName"
            type="text"
            message="*Building Name is required"
            placeholder="Enter Building Name"
            register={register}
            errors={errors}
          />

          <InputField
            label="City"
            required
            id="city"
            type="text"
            message="*City is required"
            placeholder="Enter City"
            register={register}
            errors={errors}
          />

          <InputField
            label="State"
            required
            id="state"
            type="text"
            message="*State is required"
            placeholder="Enter State"
            register={register}
            errors={errors}
          />

          <InputField
            label="Pincode"
            required
            id="pincode"
            type="text"
            message="*Pincode is required"
            placeholder="Enter Pincode"
            register={register}
            errors={errors}
          />

          <InputField
            label="Street"
            required
            id="street"
            type="text"
            message="*Street is required"
            placeholder="Enter Street"
            register={register}
            errors={errors}
          />

          <InputField
            label="Country"
            required
            id="country"
            type="text"
            message="*Country is required"
            placeholder="Enter Country"
            register={register}
            errors={errors}
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={btnLoader}
          className={`mt-6 w-full flex gap-2 items-center justify-center font-semibold text-white py-2 rounded-lg shadow-md transition-all duration-300 transform
            ${
              btnLoader
                ? "bg-gradient-to-r from-gray-400 to-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-[1.02] active:scale-95"
            }`}
          type="submit"
        >
          {btnLoader ? (
            <>
              <Spinners /> Saving...
            </>
          ) : (
            <>Save Address</>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAddressForm;
