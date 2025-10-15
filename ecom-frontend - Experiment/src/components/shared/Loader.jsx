import React from 'react'

const Loader = () => {
  return (
      <div className="flex justify-center items-center h-[200px]">
  <svg
    className="animate-spin h-8 w-8 text-green-500 mr-3"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 text-lg font-medium">
    Loading...
  </span>
</div>
  )
}

export default Loader