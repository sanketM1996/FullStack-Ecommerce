import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="min-h-[800px] flex flex-col items-center justify-center px-4">
      {/* Cart Icon */}
      <div className="flex flex-col items-center text-center">
        <MdShoppingCart
          size={90}
          className="mb-4 text-slate-400 drop-shadow-sm"
        />
        <h2 className="text-3xl font-extrabold text-slate-800">
          Your cart is empty
        </h2>
        <p className="text-lg text-slate-500 mt-2">
          Looks like you haven’t added anything yet.
        </p>
      </div>

      {/* CTA Button */}
      <div className="mt-8">
        <Link
          to="/products"
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium shadow-md 
          bg-gradient-to-r from-green-500 to-emerald-600 
          hover:from-green-600 hover:to-emerald-700 
          transition duration-300"
        >
          <MdArrowBack size={22} />
          <span>Start Shopping</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
