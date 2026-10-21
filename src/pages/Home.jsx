import { useState } from "react";
import PostCard from "../components/PostCard";
import initialPosts from "../data/posts.json";
import PostForm from "../components/PostForm";

export default function Home() {
  const [showPosts, setShowPosts] = useState(false);
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
