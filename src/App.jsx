import React from "react";
import Counter from "./components/Counter";
import Friends from "./components/Friends";
import Users from "./components/Users";
import PostTodoPagination from "./components/PostTodoPagination";
import SearchWithDebouncing from "./components/SearchWithDebouncing";
import HorizontalInfiniteList from "./components/HorizontalScroll";
import { NavLink, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="p-4">
      {/* Tabs */}
      <nav className="flex gap-4 border-b pb-2 mb-4">
        <Tab to="/" label="Infinite List" />
        <Tab to="/friends" label="Friends" />
        <Tab to="/counter" label="Counter" />
        <Tab to="/users" label="Users" />
        <Tab to="/posts" label="Posts" />
        <Tab to="/search" label="Search" />
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HorizontalInfiniteList />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/users" element={<Users />} />
        <Route path="/posts" element={<PostTodoPagination />} />
        <Route path="/search" element={<SearchWithDebouncing />} />
      </Routes>
    </div>
  );
};

/* Reusable Tab Component */
const Tab = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `px-4 py-2 rounded-t-md font-medium ${
          isActive
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`
      }
    >
      {label}
    </NavLink>
  );
};

export default App;
