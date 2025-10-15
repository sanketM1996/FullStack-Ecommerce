import React from "react";
import { formatPriceCalculation } from "../../utils/formatPrice";

const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
 

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-8/12 space-y-6">
          {/* Billing Address */}
          <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Billing Address
            </h2>
            <div className="space-y-1 text-gray-700 text-sm md:text-base">
              <p>
                <strong>Building Name: </strong>
                {address?.buildingName || "N/A"}
              </p>
              <p>
                <strong>City: </strong>
                {address?.city || "N/A"}
              </p>
              <p>
                <strong>Street: </strong>
                {address?.street || "N/A"}
              </p>
              <p>
                <strong>State: </strong>
                {address?.state || "N/A"}
              </p>
              <p>
                <strong>Pincode: </strong>
                {address?.pincode || "N/A"}
              </p>
              <p>
                <strong>Country: </strong>
                {address?.country || "N/A"}
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Payment Method
            </h2>
            <p className="text-gray-700 text-sm md:text-base">
              <strong>Method: </strong>
              {paymentMethod || "N/A"}
            </p>
          </div>

          {/* Order Items */}
          <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Order Items
            </h2>
            <div className="space-y-3">
              {cart?.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item?.productId}
                    className="flex items-center gap-3 border-b pb-2 last:border-none"
                  >
                    <img
                      src={`${import.meta.env.VITE_BACK_END_URL}/images/${
                        item?.image
                      }`}
                      alt="Product"
                      className="w-12 h-12 md:w-16 md:h-16 rounded-sm object-cover"
                    />
                    <div className="text-gray-600 text-sm md:text-base">
                      <p className="font-medium">{item?.productName}</p>
                      <p>
                        {item?.quantity} x ${item?.specialPrice} = $
                        {formatPriceCalculation(
                          item?.quantity,
                          item?.specialPrice
                        )}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items in cart.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Section (Order Summary) */}
        <div className="w-full lg:w-4/12">
          <div className="border rounded-lg shadow-md p-4 bg-white flex flex-col justify-between h-full">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-gray-700 text-sm md:text-base">
              <div className="flex justify-between">
                <span>Products</span>
                <span>${formatPriceCalculation(totalPrice, 1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (0%)</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>SubTotal</span>
                <span>${formatPriceCalculation(totalPrice, 1)}</span>
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
