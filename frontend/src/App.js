import React, { useState } from "react";
import Sidebar from "./components/Sidebar.js";
import Content from "./components/Content.js";
import useFetchUsers from "./hooks/useFetchUsers.js";

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { users, setUsers, loading, error } = useFetchUsers();

  const selectedUser = users.find((user) => user.id === selectedUserId);

  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className="flex h-screen">
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Sidebar accounts={users} onSelectAccount={setSelectedUserId} />
      )}
      <Content selectedAccount={selectedUser} onSave={handleUpdateUser} />
    </div>
  );
}

export default App;


