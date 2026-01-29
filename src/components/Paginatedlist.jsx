import React, { useEffect, useState } from "react";

const PaginatedList = ({ apiEndpoint, renderItem, itemsPerPage = 10 }) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${apiEndpoint}?_page=${currentPage}&_limit=${itemsPerPage}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [apiEndpoint, currentPage, itemsPerPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  if (loading)
    return (
      <p className="text-center text-blue-600 font-medium">Loading items...</p>
    );

  if (error)
    return (
      <p className="text-center text-red-600 font-medium">Error: {error}</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4">
            {renderItem(item)}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="
            px-5 py-2
            rounded-lg
            bg-gray-200
            text-gray-700
            hover:bg-gray-300
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          Previous
        </button>

        <span className="text-sm md:text-base font-medium">
          Page {currentPage}
        </span>

        <button
          onClick={handleNextPage}
          className="
            px-5 py-2
            rounded-lg
            bg-blue-600
            text-white
            hover:bg-blue-700
            transition
          "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedList;
