import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";
import { authenticateSignInUser } from "../../store/actions";

const Login = () => {
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

  const loginHandler = async (data) => {
    // console.log("Login Click");
    dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-full max-w-md shadow-lg py-8 sm:px-8 px-5 rounded-2xl bg-white"
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <AiOutlineLogin className="text-emerald-600 text-5xl animate-bounce" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Login Here
          </h1>
        </div>

        <hr className="mt-4 mb-6 border-gray-300" />

        {/* Input Fields */}
        <div className="flex flex-col gap-5">
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
            label="Password"
            required
            id="password"
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
          className={`mt-6 flex gap-2 items-center justify-center font-semibold text-white w-full py-3 rounded-xl transition-all duration-300 transform ${
            loader
              ? "bg-gradient-to-r from-gray-400 to-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-[1.02] active:scale-[0.98] shadow-md"
          }`}
          type="submit"
        >
          {loader ? (
            <>
              <Spinners /> Loading...
            </>
          ) : (
            <>Login</>
          )}
        </button>

        {/* SignUp Link */}
        <p className="text-center text-sm text-slate-700 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            className="font-semibold underline hover:text-emerald-700 transition-colors"
            to="/register"
          >
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
