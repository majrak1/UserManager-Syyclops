import React from "react";

function MenuButton({ isSidebarVisible, toggleSidebar }) {
  return (
    <div className="sm:hidden absolute top-4 left-4 z-50">
      <button
        onClick={toggleSidebar}
        className="bg-orange-600 text-white p-3 rounded-full shadow-md focus:outline-none flex items-center justify-center w-10 h-10 duration-300 hover:bg-orange-500"
      >
        {isSidebarVisible ? (
          <span className="absolute inset-0 flex items-center justify-center font-bold text-lg">
            &#x2715;
          </span>
        ) : (
          <div className="space-y-1">
            <span className="block w-5 h-0.5 bg-white"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
          </div>
        )}
      </button>
    </div>
  );
}

export default MenuButton;
