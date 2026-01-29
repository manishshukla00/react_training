import React, { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10;

const PostTodoPagination = () => {
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();
      setTodos(data.slice(0, ITEMS_PER_PAGE));
    };

    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📄 Posts</h2>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            borderBottom: "1px solid #ddd",
            marginBottom: "10px",
          }}
        >
          <b>
            {post.id}. {post.title}
          </b>
          <p>{post.body}</p>
        </div>
      ))}

      {loading && <p>Loading...</p>}

      {!loading && hasMore && (
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          style={{ padding: "10px 15px", cursor: "pointer" }}
        >
          Load More
        </button>
      )}

      {!hasMore && <p>No more posts</p>}

      <hr />

      <h2>✅ Todos (First 10)</h2>

      {todos.map((todo) => (
        <div key={todo.id}>
          <input type="checkbox" checked={todo.completed} readOnly />{" "}
          {todo.title}
        </div>
      ))}
    </div>
  );
};

export default PostTodoPagination;
