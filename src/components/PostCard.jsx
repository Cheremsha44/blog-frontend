import React, { useState } from "react";

const CounterLike = () => {
  const [count, setCount] = useState(0);

  const handleLike = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button>
      <p>Likes: {count}</p>
    </div>
  );
};

export default function PostCard({ title, content }) {
  return (
    <div className="post-card">
      <h2>{title}</h2>
      <p>{content}</p>
      <CounterLike />
    </div>
  );
}
