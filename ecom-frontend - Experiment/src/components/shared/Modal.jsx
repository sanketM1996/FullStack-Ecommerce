import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { RxCross1 } from "react-icons/rx";

function Modal({ open, setOpen, children, title = "" }) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      {/* Backdrop with fade animation */}
      <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out data-[closed]:opacity-0" />

      {/* Panel Wrapper */}
      <div className="fixed inset-0 flex justify-end">
        <DialogPanel
          transition
          className="pointer-events-auto relative w-screen max-w-[800px] transform transition-all duration-500 ease-in-out data-[closed]:translate-x-full data-[enter]:opacity-100 data-[closed]:opacity-0"
        >
          {/* Main Modal Content */}
          <div className="flex h-full flex-col overflow-y-auto bg-white shadow-2xl rounded-l-2xl">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
              <DialogTitle className="text-lg font-semibold text-slate-900">
                {title || "Panel Title"}
              </DialogTitle>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 transition"
              >
                <RxCross1 className="text-slate-700 text-xl" />
              </button>
            </div>

            {/* Body */}
            <div className="relative flex-1 p-6 text-slate-800">{children}</div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default Modal;
