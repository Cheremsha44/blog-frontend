import { useState } from "react";

export default function PostForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      return;
    }
    onAdd({ title: title, content: content });
    setTitle("");
    setContent("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">title:</label>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">content:</label>
        <input
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <button type="submit" value="Submit">
          Submit
        </button>
      </form>
    </>
  );
}
