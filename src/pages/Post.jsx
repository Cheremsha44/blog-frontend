import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import posts from "../data/posts.json";

export default function Post() {
  const { id } = useParams();
  const findPost = posts.find((post) => post.id === Number(id));
  if (!findPost) {
    return "page not found";
  }
  return (
    <>
      <PostCard
        key={findPost.id}
        id={findPost.id}
        title={findPost.title}
        content={findPost.content}
      />
    </>
  );
}
