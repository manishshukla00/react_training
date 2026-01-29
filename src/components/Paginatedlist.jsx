// https://jsonplaceholder.typicode.com/posts?_page=1&_limit=12
// https://jsonplaceholder.typicode.com/todos
import React, { useEffect, useState } from "react";

const PaginatedList = ({ apiEndpoint, renderItem, itemsPerPage = 10 }) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${apiEndpoint}?_page=${currentPage}&_limit=${itemsPerPage}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchItems();
  }, [apiEndpoint, currentPage, itemsPerPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (loading) return <h3>Loading items...</h3>;
  if (error) return <h3>Error: {error}</h3>;
  return (
    <div>
      <div>
        {items.map((item) => (
          <div key={item.id}>{renderItem(item)}</div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default PaginatedList;
