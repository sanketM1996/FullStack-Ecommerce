import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
// import { registerNewUser } from '../../store/actions';
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";
import { registerNewUser } from "../../store/actions";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);
    dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
  };

  return (
 <div className="min-h-[60vh] flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">

      <form
        onSubmit={handleSubmit(registerHandler)}
        className="w-full max-w-md shadow-lg bg-white py-8 px-6 rounded-xl transition-transform duration-300 hover:scale-[1.01]"
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <FaUserPlus className="text-emerald-600 text-5xl animate-bounce" />
          <h1 className="text-slate-800 text-center font-montserrat text-2xl md:text-3xl font-bold">
            Register Here
          </h1>
        </div>

        <hr className="mt-4 mb-6 border-gray-300" />

        {/* Input Fields */}
        <div className="flex flex-col gap-4">
          <InputField
            label="UserName"
            required
            id="username"
            type="text"
            message="*UserName is required"
            placeholder="Enter your username"
            register={register}
            errors={errors}
          />

          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="Enter your email"
            register={register}
            errors={errors}
          />

          <InputField
            label="Password"
            required
            id="password"
            min={6}
            type="password"
            message="*Password is required"
            placeholder="Enter your password"
            register={register}
            errors={errors}
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loader}
          className={`mt-6 w-full flex gap-2 items-center justify-center font-semibold text-white py-2 rounded-md shadow-md transition-all duration-300 transform 
            ${
              loader
                ? "bg-gradient-to-r from-gray-400 to-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-[1.02] active:scale-95"
            }`}
          type="submit"
        >
          {loader ? (
            <>
              <Spinners /> Loading...
            </>
          ) : (
            <>Register</>
          )}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-slate-700 mt-6">
          Already have an account?
          <Link
            className="font-semibold underline hover:text-emerald-600 transition-colors"
            to="/login"
          >
            <span> Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
