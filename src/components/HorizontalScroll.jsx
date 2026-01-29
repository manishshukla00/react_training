import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const ITEMS_PER_PAGE = 10;
const DEBOUNCE_DELAY = 500;

const HorizontalInfiniteList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const debounceRef = useRef(null);
  const scrollRef = useRef(null);

  // Fetch data
  const fetchData = async (pageNo) => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: pageNo,
            _limit: ITEMS_PER_PAGE,
          },
        },
      );

      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...res.data]);
      }
    } catch (err) {
      console.error("API Error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleLoadMore = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setPage((prev) => prev + 1);

      scrollRef.current?.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }, DEBOUNCE_DELAY);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Title */}
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        ➡️ Horizontal Infinite Scroll
      </h2>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="
          flex gap-4
          overflow-x-auto
          scroll-smooth
          pb-4
          scrollbar-thin
          scrollbar-thumb-gray-400
          scrollbar-track-gray-100
        "
      >
        {items.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="
              min-w-[240px]
              sm:min-w-[280px]
              md:min-w-[320px]
              lg:min-w-[360px]
              bg-white
              rounded-xl
              shadow
              p-4
              flex-shrink-0
              transition-transform
              hover:scale-105
            "
          >
            <h3 className="font-semibold mb-2 text-sm md:text-base">
              {item.id}. {item.title.slice(0, 40)}
            </h3>

            <p className="text-xs md:text-sm text-gray-600">
              {item.body.slice(0, 90)}...
            </p>
          </div>
        ))}

        {loading && (
          <div className="min-w-[240px] sm:min-w-[280px] flex items-center justify-center text-gray-500">
            Loading...
          </div>
        )}
      </div>

      {/* Button */}
      <div className="flex justify-center md:justify-start">
        {hasMore && (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="
              mt-4
              px-6 py-2
              bg-blue-600
              text-white
              rounded-lg
              hover:bg-blue-700
              disabled:opacity-50
              transition
            "
          >
            {loading ? "Loading..." : "Show More"}
          </button>
        )}
      </div>

      {!hasMore && (
        <p className="mt-3 text-center md:text-left text-gray-500">
          No more items 🚫
        </p>
      )}
    </div>
  );
};

export default HorizontalInfiniteList;
