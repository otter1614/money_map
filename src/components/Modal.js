import React from "react";

export default function Modal({
  open = false,
  onClose = () => {},
  title,
  children,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* semi-transparent backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* modal panel */}
      <div className="relative w-full max-w-lg mx-4">
        {/* small centered bar like Musinsa */}
        <div className="flex justify-center -mt-6 pointer-events-none">
          <div className="w-16 h-1.5 bg-gray-300 rounded-full shadow-sm" />
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-lg font-medium text-gray-800">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
