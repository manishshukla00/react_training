import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";

import Counter from "./components/Counter";
import Friends from "./components/Friends";
import Users from "./components/Users";
import PostTodoPagination from "./components/PostTodoPagination";
import SearchWithDebouncing from "./components/SearchWithDebouncing";
import HorizontalInfiniteList from "./components/HorizontalScroll";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tabs */}
      <nav className="sticky top-0 z-50 bg-white border-b">
        <div
          className="
            flex gap-2 px-3 py-2
            overflow-x-auto
            whitespace-nowrap
            md:justify-center
            scrollbar-hide
          "
        >
          <Tab to="/" label="Horizontal Scroll" />
          <Tab to="/friends" label="Friends" />
          <Tab to="/counter" label="Counter" />
          <Tab to="/users" label="Users" />
          <Tab to="/posts" label="Posts" />
          <Tab to="/search" label="Debouncing-Search" />
        </div>
      </nav>

      {/* Page Content */}
      <div className="p-3 md:p-6">
        <Routes>
          <Route path="/" element={<HorizontalInfiniteList />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<PostTodoPagination />} />
          <Route path="/search" element={<SearchWithDebouncing />} />
        </Routes>
      </div>
    </div>
  );
};

/* Responsive Tab */
const Tab = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
        shrink-0
        px-4 py-2
        rounded-lg
        text-sm md:text-base
        font-medium
        transition-all duration-200
        ${
          isActive
            ? "bg-blue-600 text-white shadow"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }
        `
      }
    >
      {label}
    </NavLink>
  );
};

export default App;
