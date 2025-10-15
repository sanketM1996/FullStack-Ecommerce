const btnStyles =
  "w-10 h-10 flex items-center justify-center border border-slate-800 rounded-md text-lg font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 hover:text-white";

const SetQuantity = ({
  quantity,
  cardCounter,
  handeQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
      {!cardCounter && (
        <div className="font-semibold text-slate-700 text-sm md:text-base">
          Quantity
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Decrease button */}
        <button
          disabled={quantity <= 1}
          className={btnStyles}
          onClick={handleQtyDecrease}
        >
          -
        </button>

        {/* Quantity display */}
        <div className="min-w-[40px] text-center text-lg font-semibold text-slate-900">
          {quantity}
        </div>

        {/* Increase button */}
        <button className={btnStyles} onClick={handeQtyIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
