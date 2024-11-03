import React, { useState } from "react";
import Sidebar from "./components/Sidebar.js";
import Content from "./components/Content.js";
import useFetchUsers from "./hooks/useFetchUsers.js";

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { users, loading, error } = useFetchUsers();

  const selectedUser = users.find((user) => user.id === selectedUserId);

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  const handleSelectAccount = (userId) => {
    setSelectedUserId(userId);
    if (window.innerWidth < 600) {
      setSidebarVisible(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="sm:hidden absolute top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="bg-orange-600 text-white p-3 rounded-full shadow-md focus:outline-none flex items-center justify-center w-10 h-10 duration-300 hover:bg-orange-500"
        >
          {isSidebarVisible ? (
            <span className="absolute inset-0 flex items-center justify-center font-bold text-lg">&#x2715;</span>
          ) : (
            <div className="space-y-1">
              <span className="block w-5 h-0.5 bg-white"></span>
              <span className="block w-5 h-0.5 bg-white"></span>
              <span className="block w-5 h-0.5 bg-white"></span>
            </div>
          )}
        </button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div
          className={`${
            isSidebarVisible ? "fixed inset-0 z-40 w-full h-full" : "hidden sm:block"
          }`}
        >
          <Sidebar accounts={users} onSelectAccount={handleSelectAccount} />
        </div>
      )}

      <Content selectedAccount={selectedUser} />
    </div>
  );
}

export default App;




