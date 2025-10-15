import React from 'react'
import { formatRevenue } from '../../../utils/formatPrice';

const DashboardOverview = ({ title, amount, Icon, revenue = false }) => {
  const convertedAmount = revenue ? Number(amount).toFixed(2) : amount;

  return (
    <div className="xl:w-80 w-full space-y-2 text-center md:text-start px-3 py-4 md:px-5 md:py-6">
      {/* Title & Icon */}
      <div className="flex md:justify-start justify-center items-center gap-2">
        <p className="uppercase text-xs md:text-sm text-white font-medium">{title}</p>
        <Icon className="text-white text-sm md:text-base" />
      </div>

      {/* Amount */}
      <h1 className="font-semibold text-white text-sm md:text-lg">
        {revenue ? "$" : null}
        {revenue ? formatRevenue(convertedAmount) : convertedAmount}
      </h1>
    </div>
  );
};

export default DashboardOverview;
