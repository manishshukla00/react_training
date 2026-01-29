import React, { useEffect, useState } from "react";

const SearchWithDebouncing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data); // ❗
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedValue.trim() === "") {
      setFilteredUsers([]);
      return;
    }

    const result = users.filter((user) =>
      user.username.toLowerCase().includes(debouncedValue.toLowerCase()),
    );

    setFilteredUsers(result);
  }, [debouncedValue, users]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">
        🔍 Search Users with Debouncing
      </h2>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by username..."
        className="
          w-full md:w-96
          px-4 py-2
          border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          mb-4
        "
      />

      {loading && <p className="text-blue-600">Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && searchTerm === "" && (
        <p className="text-gray-400 text-center">
          Start typing to search users
        </p>
      )}
      <ul className="space-y-3 mt-4">
        {searchTerm !== "" && filteredUsers.length === 0 && !loading && (
          <p className="text-gray-500 text-center">No users found</p>
        )}

        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="
              p-3
              bg-white
              rounded-lg
              shadow
              flex flex-col
              sm:flex-row
              sm:justify-between
              sm:items-center
            "
          >
            <span className="font-medium">{user.username}</span>
            <span className="text-sm text-gray-600 break-all">
              {user.email}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchWithDebouncing;
