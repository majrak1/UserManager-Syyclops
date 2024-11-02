import React from "react";

function Header({ toggleSidebar }) {
  return (
    <header className="bg-gray-800 text-white flex items-center justify-between p-4 md:hidden">
      <button onClick={toggleSidebar} className="focus:outline-none">
        <span className="material-icons">menu</span>
      </button>
      <div className="flex justify-center flex-grow">
        <img
          src="/logo-syyclops.png"
          alt="Syyclops Logo"
          className="h-10"
        />
      </div>
      <div className="w-10"></div>
    </header>
  );
}

export default Header;
