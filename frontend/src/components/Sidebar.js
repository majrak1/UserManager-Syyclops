import React from "react";

function Sidebar({ accounts, onSelectAccount }) {
  return (
    <div className="w-72 bg-gray-800 text-white p-6 border-r shadow-lg h-full overflow-y-scroll" style={{backgroundColor: "rgb(10, 14, 45)"}}>
      {/* Logo at the top */}
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
          // uncomment the following line to use the dummy users (do accordingly in useFetchUsers.js, useUpdateUser.js, and Content.js as well)
          // <li
          //   key={account.id}
          //   onClick={() => onSelectAccount(account.id)}
          //   className="p-3 cursor-pointer hover:text-orange-500 transition-colors rounded-lg"
          // >
          //   {account.firstName} {account.lastName}
          // </li>
          <li
            key={account.id}
            onClick={() => onSelectAccount(account.id)}
            className="p-3 cursor-pointer hover:text-orange-500 transition-colors rounded-lg"
          >
            {account.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
