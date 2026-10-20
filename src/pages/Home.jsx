import { useState } from "react";
import PostCard from "../components/PostCard";
import posts from "../data/posts.json";

export default function Home() {
  const [showPosts, setShowPosts] = useState(false);

  const handleShowPosts = () => {
    setShowPosts(!showPosts);
  };

  return (
    <div>
      <h1>Главная</h1>
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
