import { useState } from "react";
import PostCard from "../components/PostCard";
import initialPosts from "../data/posts.json";
import PostForm from "../components/PostForm";
import getData from "../lib/api";
import { useEffect } from "react";

export default function Home() {
  const [showPosts, setShowPosts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(initialPosts);

  const handleShowPosts = () => {
    setShowPosts(!showPosts);
  };
  const handleAddPost = (data) => {
    const { title, content } = data;
    const newPost = {
      id: Date.now(),
      title: title,
      content: content,
    };
    setPosts([...posts, newPost]);
  };

  useEffect(() => {
    getData()
      .then((data) => setPosts(data.posts))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Главная</h1>
      <PostForm onAdd={handleAddPost} />
      <button onClick={handleShowPosts}>Show posts</button>
      {showPosts && (
        <div>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
            />
          ))}
        </div>
      )}
    </div>
  );
}
