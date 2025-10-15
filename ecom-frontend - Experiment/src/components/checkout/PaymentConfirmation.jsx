import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { stripePaymentConfirmation } from '../../store/actions';
import toast from 'react-hot-toast';
import Skeleton from '../shared/Skeleton';

const PaymentConfirmation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { cart } = useSelector((state) => state.carts);
  const [loading, setLoading] = useState(false);

  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");

  const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
    ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
    : [];

  useEffect(() => {
    if (
      paymentIntent &&
      clientSecret &&
      redirectStatus &&
      cart &&
      cart?.length > 0
    ) {
      const sendData = {
        addressId: selectedUserCheckoutAddress.addressId,
        pgName: "Stripe",
        pgPaymentId: paymentIntent,
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful",
      };
      dispatch(stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast));
    }
  }, [paymentIntent, clientSecret, redirectStatus, cart]);

  // Redirect after success
  useEffect(() => {
    if (!loading && paymentIntent) {
      const timer = setTimeout(() => {
        navigate("/"); // redirect to home
      }, 4000); // wait 4 sec before redirect

      return () => clearTimeout(timer);
    }
  }, [loading, paymentIntent, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {loading ? (
        <div className="max-w-xl mx-auto w-full">
          <Skeleton />
        </div>
      ) : (
        <div className="p-8 rounded-2xl shadow-lg text-center w-full max-w-md 
                        bg-gradient-to-r from-green-500 to-emerald-600 
                        text-white transform transition-all duration-300 
                        hover:from-green-600 hover:to-emerald-700">
          <div className="mb-4 flex justify-center animate-bounce">
            <FaCheckCircle size={72} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-lg opacity-90 mb-6">
            Thank you for your purchase 🎉  
            We’re processing your order.
          </p>
          <p className="text-sm opacity-80">
            Redirecting you to the home page...
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentConfirmation;
