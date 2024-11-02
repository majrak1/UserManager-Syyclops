import React, { useState, useEffect } from "react";
import useUpdateUser from "../hooks/useUpdateUser.js";

function Content({ selectedAccount, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { updateUser, isUpdating, updateError } = useUpdateUser();

  useEffect(() => {
    if (selectedAccount) {
      setFormData({
        firstName: selectedAccount.firstName,
        lastName: selectedAccount.lastName,
        age: selectedAccount.age,
        gender: selectedAccount.gender,
        email: selectedAccount.email,
        phone: selectedAccount.phone,
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

    if (!formData.firstName || !formData.lastName || !formData.age || !formData.gender || !formData.email || !formData.phone) {
      alert("All fields must contain text.");
      return;
    }

    try {
      await updateUser(selectedAccount.id, formData);
      onSave({ ...formData, id: selectedAccount.id });
      setIsEditing(false);
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
              <label className="text-gray-700 font-semibold">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="border p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Gender</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
            <h2 className="text-xl font-semibold text-gray-800">User Details</h2>
            <p className="text-gray-600"><span className="font-semibold">First Name:</span> {selectedAccount.firstName}</p>
            <p className="text-gray-600"><span className="font-semibold">Last Name:</span> {selectedAccount.lastName}</p>
            <p className="text-gray-600"><span className="font-semibold">ID:</span> {selectedAccount.id}</p>
            <p className="text-gray-600"><span className="font-semibold">Age:</span> {selectedAccount.age}</p>
            <p className="text-gray-600"><span className="font-semibold">Gender:</span> {selectedAccount.gender}</p>
            <p className="text-gray-600"><span className="font-semibold">Email:</span> {selectedAccount.email}</p>
            <p className="text-gray-600"><span className="font-semibold">Phone:</span> {selectedAccount.phone}</p>
            <button
              onClick={handleEditClick}
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:scale-105 duration-200 hover:bg-orange-400"
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
