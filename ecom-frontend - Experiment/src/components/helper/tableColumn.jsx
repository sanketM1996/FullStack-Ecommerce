import { FaEdit, FaEye, FaImage, FaTrashAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";




export const adminProductTableColumn = (
  handleEdit,
  handleDelete,
  handleImageUpload,
  handleProductView
) => [
  {
    disableColumnMenu: true,
    sortable: false,
    field: "id",
    headerName: "ID",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span className="text-center">Product ID</span>,
  },
  {
    disableColumnMenu: true,
    field: "productName",
    headerName: "Product Name",
    align: "center",
    width: 260,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: () => <span>Product Name</span>,
  },
  {
    disableColumnMenu: true,
    field: "price",
    headerName: "Price",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span className="text-center">Price</span>,
  },
  {
    disableColumnMenu: true,
    field: "quantity",
    headerName: "Quantity",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span className="text-center">Quantity</span>,
  },
  {
    disableColumnMenu: true,
    field: "specialPrice",
    headerName: "Special Price",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span className="text-center">Special Price</span>,
  },
  {
    sortable: false,
    field: "description",
    headerName: "Description",
    headerAlign: "center",
    align: "center",
    width: 200,
    editable: false,
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: () => <span>Description</span>,
  },
  {
    sortable: false,
    field: "image",
    headerName: "Image",
    headerAlign: "center",
    align: "center",
    width: 200,
    editable: false,
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span>Image</span>,
  },
  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    width: 440,
    renderHeader: () => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-center items-center gap-2 h-full">
          {/* Upload Image */}
          <button
            onClick={() => handleImageUpload(params.row)}
            className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 
              hover:from-green-600 hover:to-emerald-700 text-white px-3 py-1.5 h-9 
              rounded-xl shadow-md text-sm font-medium transition-transform duration-200 hover:scale-105"
          >
            <FaImage className="text-sm" />
            Image
          </button>

          {/* Edit */}
          <button
            onClick={() => handleEdit(params.row)}
            className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-600 
              hover:from-blue-600 hover:to-indigo-700 text-white px-3 py-1.5 h-9 
              rounded-xl shadow-md text-sm font-medium transition-transform duration-200 hover:scale-105"
          >
            <FaEdit className="text-sm" />
            Edit
          </button>

          {/* Delete */}
          <button
            onClick={() => handleDelete(params.row)}
            className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-rose-600 
              hover:from-red-600 hover:to-rose-700 text-white px-3 py-1.5 h-9 
              rounded-xl shadow-md text-sm font-medium transition-transform duration-200 hover:scale-105"
          >
            <FaTrashAlt className="text-sm" />
            Delete
          </button>

          {/* View */}
          <button
            onClick={() => handleProductView(params.row)}
            className="flex items-center gap-1 bg-gradient-to-r from-gray-700 to-gray-900 
              hover:from-gray-800 hover:to-black text-white px-3 py-1.5 h-9 
              rounded-xl shadow-md text-sm font-medium transition-transform duration-200 hover:scale-105"
          >
            <FaEye className="text-sm" />
            View
          </button>
        </div>
      );
    },
  },
];




export const adminOrderTableColumn = (handleEdit) => [
  { 
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "Order ID",
    minWidth: 180,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold ",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: () => <span className="text-center">Order ID</span>
  },
  {
    field: "email",
    headerName: "Email",
    disableColumnMenu: true,
    align: "center",
    width: 250,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold  ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: () => <span>Email</span>,
  },
  {
    field: "totalAmount",
    headerName: "Total Amount",
    disableColumnMenu: true,
    align: "center",
    width: 200,
    editable: false,
    sortable: true,
    headerAlign: "center",
    headerClassName: "text-black bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: () => <span>Total Amount</span>,
    renderCell: (params) => (
      <span className="font-semibold text-emerald-600">
        ${params.value}
      </span>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    disableColumnMenu: true,
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: () => <span>Status</span>,
    renderCell: (params) => {
      let colorClasses = "bg-gray-500 text-white"; // default
      if (params.value === "Pending") {
        colorClasses = "bg-yellow-500 text-white";
      } else if (params.value === "Shipped") {
        colorClasses = "bg-blue-500 text-white";
      } else if (params.value === "Delivered") {
        colorClasses = "bg-green-600 text-white";
      } else if (params.value === "Cancelled") {
        colorClasses = "bg-red-500 text-white";
      }

      return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClasses}`}>
          {params.value}
        </span>
      );
    },
  },
  {
    field: "date",
    headerName: "Order Date",
    disableColumnMenu: true,
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: () => <span>Order Date</span>,
  },
  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    width: 250,
    renderHeader: () => <span>Action</span>,
    renderCell: (params) => (
      <div className="flex justify-center items-center space-x-2 h-full pt-2">
        <button
          onClick={() => handleEdit(params.row)}
          className="flex items-center px-4 h-9 rounded-md text-sm font-medium 
                     text-white bg-gradient-to-r from-green-500 to-emerald-600 
                     hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
        >
          <FaEdit className="mr-2" />
          Edit
        </button>
      </div>
    ),
  },
];



//table column for categories in admin panel
export const categoryTableColumns = (handleEdit, handleDelete) => [
  {
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "CategoryId",
    minWidth: 300,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">CategoryId</span>,
  },
  {
    disableColumnMenu: true,
    field: "categoryName",
    headerName: "Category Name",
    align: "center",
    width: 400,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>Category Name</span>,
  },

  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    width: 400,
    renderHeader: (params) => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-center space-x-2 h-full pt-2">
          <button
            onClick={() => handleEdit(params.row)}
            className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md "
          >
            <FaEdit className="mr-2" />
            Edit
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(params.row)}
            className="flex items-center bg-red-500 text-white px-4   h-9 rounded-md"
          >
            <FaTrashAlt className="mr-2" />
            Delete
          </button>
        </div>
      );
    },
  },
];


//table column for seller in admin panel
export const sellerTableColumns = [
  {
    disableColumnMenu: true,
    field: "id",
    headerName: "ID",
    minWidth: 400,
    headerAlign: "center",
    align: "center",
    editable: false,

    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">SellerID</span>,
  },
  {
    disableColumnMenu: true,
    field: "username",
    headerName: "UserName",
    minWidth: 400,
    headerAlign: "center",
    align: "center",
    editable: false,
    sortable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">UserName</span>,
  },
  {
    disableColumnMenu: true,
    field: "email",
    headerName: "Email",
    align: "center",
    width: 400,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>Email</span>,
    renderCell: (params) => {
      return (
        <div className="flex items-center justify-center gap-1">
          <span>
            <MdOutlineEmail className="text-slate-700 text-lg" />
          </span>
          <span>{params?.row?.email}</span>
        </div>
      );
    },
  },
];