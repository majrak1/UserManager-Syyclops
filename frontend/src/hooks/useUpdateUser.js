import { useState } from "react";

function useUpdateUser() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateUser = async (userId, updatedData) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      // PUT request to update the user
      console.log("updateData: ", updatedData)
      const response = await fetch(`https://dummyjson.com/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      console.log(response);

      if (!response.ok) throw new Error("Failed to update user");

      const result = await response.json();
      console.log(result);

      // Return only the user data from the response
      return result.user; 
    } catch (error) {
      setUpdateError(error.message);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateUser, isUpdating, updateError };
}

export default useUpdateUser;
