import React, { useEffect, useState } from "react";
import ListComponent from "./components/ListComponent";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Post List</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <ListComponent
          items={posts}
          renderItem={(post) => (
            <div>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default App;
