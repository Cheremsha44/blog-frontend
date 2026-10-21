import { useState } from "react";

export default function PostForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setTitle(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle === "") {
      setError("Поле не должно быть пустым!");
      return;
    }
    onAdd({ title: trimmedTitle, content: content });
    setTitle("");
    setContent("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">title:</label>
        <input name="title" value={title} onChange={handleInputChange} />
        <label htmlFor="content">content:</label>
        <input
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <button type="submit" value="Submit">
          Submit
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
}
