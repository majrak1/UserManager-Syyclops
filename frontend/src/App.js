import React, { useState } from "react";
import Sidebar from "./components/Sidebar.js";
import Content from "./components/Content.js";
import useFetchUsers from "./hooks/useFetchUsers.js";
import MenuButton from "./components/MenuButton.js";

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { users, setUsers, loading, error } = useFetchUsers();

  const selectedUser = users.find((user) => user.id === selectedUserId);
  
  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  const handleSelectAccount = (userId) => {
    setSelectedUserId(userId);
    if (window.innerWidth < 600) {
      setSidebarVisible(false);
    }
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className="flex h-screen">
      <MenuButton isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />

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

      <Content selectedAccount={selectedUser} onSave={handleUpdateUser} />
    </div>
  );
}

export default App;


