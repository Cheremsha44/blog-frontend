import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useState } from "react";
import { getPost } from "../lib/api";
import { useEffect } from "react";

export default function Post() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getPost(id)
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <PostCard
        key={posts.id}
        id={posts.id}
        title={posts.title}
        content={posts.content}
      />
    </>
  );
}
