import { useState, useEffect } from "react";

function useFetchUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {

        // uncomment the following line (and comment the line after that) to fetch the dummy users (do accordingly in Sidebar.js, useUpdateUser.js, and Content.js as well)
        // const response = await fetch("https://dummyjson.com/users?limit=20");
        const response = await fetch("http://127.0.0.1:8000/users");

        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
}

export default useFetchUsers;
