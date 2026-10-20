import { useState } from "react";
import { Link } from "react-router-dom";

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

export default function PostCard({ title, content, id }) {
  return (
    <Link to={`/post/${id}`}>
      <div className="post-card">
        <h2>{title}</h2>
        <p>{content}</p>
        <CounterLike />
      </div>
    </Link>
  );
}
