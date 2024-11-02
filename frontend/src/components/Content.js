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
    <div className="flex-grow w-full p-8 bg-gray-200 rounded-lg shadow-lg mx-6 my-4">
      {selectedAccount ? (
        isEditing ? (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter the name"
              />
            </div>
            <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter the email"
              />
            </div>
            <div className="flex items-center space-x-4 mt-6">            
              <button
                type="submit"
                className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-400"
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
            {updateError && <p className="text-red-500 mt-2">{updateError}</p>}
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600"><span className="font-semibold">Name:</span> {selectedAccount.name}</p>
            <p className="text-gray-600"><span className="font-semibold">Email:</span> {selectedAccount.email}</p>
            <button
              onClick={handleEditClick}
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:scale-105 duration-300 hover:bg-orange-400"
            >
              Edit
            </button>
          </div>
        )
      ) : (
        <p className="text-gray-500">Select an account to see details</p>
      )}
    </div>
  );
}

export default Content;
