import React, { useState } from "react";
import Sidebar from "../shared/Sidebar";
import { Outlet } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { RxCross1 } from "react-icons/rx";
import { FaBars } from "react-icons/fa";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar as a Toggler Drawer (All screen sizes) */}
      <Dialog
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition-all duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 p-2.5 text-white shadow-md hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105"
                >
                  <span className="sr-only">Close Sidebar</span>
                  <RxCross1 className="text-xl" />
                </button>
              </div>
            </TransitionChild>
            <Sidebar />
          </DialogPanel>
        </div>
      </Dialog>

      {/* Top bar with Menu button (All screens) */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-white shadow-sm p-4">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105"
        >
          <FaBars className="text-lg" />
          <span className="font-semibold">Menu</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="min-h-screen">
        <div className="p-4 sm:p-6 xl:p-8 animate-fadeIn">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
