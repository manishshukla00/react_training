import React, { useEffect, useState } from "react";

const SearchWithDebouncing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* 1️⃣ Fetch users ONCE */
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* 2️⃣ Debounce input */
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  /* 3️⃣ Filter users */
  useEffect(() => {
    const result = users.filter((user) =>
      user.username.toLowerCase().includes(debouncedValue.toLowerCase()),
    );
    setFilteredUsers(result);
  }, [debouncedValue, users]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔍 Search Users with Debouncing</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by username..."
        style={{ padding: "8px", width: "300px", marginBottom: "20px" }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {filteredUsers.length === 0 && !loading && <p>No users found</p>}

        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.username} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchWithDebouncing;
