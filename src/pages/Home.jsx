import { useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [showPosts, setShowPosts] = useState(false);

  const posts = [
    { id: 1, title: "Первый пост", content: "Текст первого" },
    { id: 2, title: "Второй пост", content: "Текст второго" },
  ];

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
            <PostCard key={post.id} title={post.title} content={post.content} />
          ))}
        </div>
      )}
    </div>
  );
}
