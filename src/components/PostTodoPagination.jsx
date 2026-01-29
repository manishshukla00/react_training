import React, { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10;

const PostTodoPagination = () => {
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  /* Fetch Posts with Pagination */
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${ITEMS_PER_PAGE}`,
        );
        const data = await res.json();

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prev) => [...prev, ...data]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  /* Fetch Todos */
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();
      setTodos(data.slice(0, ITEMS_PER_PAGE));
    };

    fetchTodos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Posts Section */}
      <h2 className="text-xl md:text-2xl font-semibold mb-4">📄 Posts</h2>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              {post.id}. {post.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base">{post.body}</p>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-6">
        {loading && <p className="text-blue-600 font-medium">Loading...</p>}

        {!loading && hasMore && (
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="
              px-6 py-2
              bg-blue-600
              text-white
              rounded-lg
              hover:bg-blue-700
              transition
            "
          >
            Load More
          </button>
        )}

        {!hasMore && <p className="text-gray-500 font-medium">No more posts</p>}
      </div>

      {/* Divider */}
      <hr className="my-8" />

      {/* Todos Section */}
      <h2 className="text-xl md:text-2xl font-semibold mb-4">
        ✅ Todos (First 10)
      </h2>

      <div className="space-y-3">
        {todos.map((todo) => (
          <label
            key={todo.id}
            className="
              flex items-center gap-3
              bg-gray-100
              p-3
              rounded-lg
            "
          >
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="w-4 h-4"
            />
            <span
              className={`text-sm md:text-base ${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {todo.title}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PostTodoPagination;
