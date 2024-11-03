import React from "react";

function Sidebar({ accounts, selectedUserId, onSelectAccount }) {
  return (
    <div className="w-72 bg-gray-800 text-white p-6 border-r shadow-lg h-full overflow-y-scroll" style={{ backgroundColor: "rgb(10, 14, 45)" }}>      
      <div className="flex justify-center mb-6">
        <img
          src="/logo-syyclops.png"
          alt="Syyclops Logo"
          className="w-30 h-auto"
        />
      </div>
      
      <h2 className="text-xl font-semibold mb-6 text-orange-500">Accounts</h2>
      <ul className="space-y-2">
        {accounts.map((account) => (
          <li
            key={account.id}
            onClick={() => onSelectAccount(account.id)}
            className={`p-3 cursor-pointer transition-colors rounded-lg ${
              selectedUserId === account.id
                ? "text-orange-500 font-semibold"
                : "hover:text-orange-500"
            }`}
          >
            {account.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
