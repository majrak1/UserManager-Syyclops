import React, { useState } from "react";
import Sidebar from "./components/Sidebar.js";
import Content from "./components/Content.js";
import useFetchUsers from "./hooks/useFetchUsers.js";

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { users, loading, error } = useFetchUsers();

  const selectedUser = users.find((user) => user.id === selectedUserId);

  return (
    <div className="flex h-screen">
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Sidebar accounts={users} onSelectAccount={setSelectedUserId} />
      )}
      <Content selectedAccount={selectedUser} />
    </div>
  );
}

export default App;
