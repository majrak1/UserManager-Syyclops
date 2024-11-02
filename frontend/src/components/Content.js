import React, { useState, useEffect } from "react";
import useUpdateUser from "../hooks/useUpdateUser.js";

function Content({ selectedAccount }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { updateUser, isUpdating, updateError } = useUpdateUser();

  useEffect(() => {
    if (selectedAccount) {
      setFormData({
        name: selectedAccount.name,
        email: selectedAccount.email,
      });
    }
  }, [selectedAccount]);

  const handleEditClick = () => setIsEditing(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("All fields must contain text.");
      return;
    }

    try {
      await updateUser(selectedAccount.id, formData);
      setFormData({});
      setIsEditing(false);
  
      // Refresh the page after 100ms
      setTimeout(() => {
        window.location.reload();
      }, 50);
    } catch (error) {
      alert("Failed to update user details.");
    }
  };

  return (
    <div className="flex-grow w-full p-6">
      {selectedAccount ? (
        isEditing ? (
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block mt-2 border p-2 w-full"
              placeholder="Enter the name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block mt-2 border p-2 w-full"
              placeholder="Enter the email"
            />
            <button
              type="submit"
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:scale-105 duration-300 hover:bg-orange-400"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              // className="mt-4 ml-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:scale-105 duration-300 hover:bg-gray-400"
              className="mt-4 ml-2 bg-transparent border border-orange-500 text-orange-500 py-2 px-4 rounded-lg hover:scale-100 duration-300 scale-95"
              disabled={isUpdating || !formData.name || !formData.email} // Disable if either field is empty
            >
              Cancel
            </button>
            {updateError && <p className="text-red-500 mt-2">{updateError}</p>}
          </form>
        ) : (
          <>
            <h2 className="mt-2 text-gray-700 ">First Name: {selectedAccount.name}</h2>
            <p className="mt-2 text-gray-700">Email: {selectedAccount.email}</p>
            <button
              onClick={handleEditClick}
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:scale-105 duration-300 hover:bg-orange-400"
            >
              Edit
            </button>
          </>
        )
      ) : (
        <p className="text-gray-500">Select an account to see details</p>
      )}
    </div>
  );
}

export default Content;
