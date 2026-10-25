import { useState } from "react";
import { API_URL } from "../lib/config";

export default function PostForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [error, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setTitle(e.target.value);
    if (error) setErrors("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors("");

    const trimmedTitle = title.trim();
    if (trimmedTitle === "") {
      setErrors("Поле не должно быть пустым!");
      return;
    }

    setIsLoading(true);

    fetch(`${API_URL}/api/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: trimmedTitle,
        content: content,
        published: isPublished,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при создании поста");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Пост успешно создан:", data);
        onAdd(data);
        setIsLoading(false);
        setTitle("");
        setContent("");
        setIsPublished("");
      })
      .catch((error) => {
        setErrors(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Блок ошибки, если она есть */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            autoComplete="off"
            placeholder="Введите заголовок поста..."
            value={title}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            required
            rows="4"
            placeholder="О чем ваш новый пост?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 bg-white resize-none"
          />
        </div>

        {/* Чекбокс «Опубликовать сразу» / «Черновик» */}
        <div className="flex items-center gap-3 pt-1">
          <input
            type="checkbox"
            id="isPublished"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
          />
          <label
            htmlFor="isPublished"
            className="text-sm font-medium text-slate-700 cursor-pointer select-none"
          >
            Опубликовать сразу (иначе сохранится в черновики)
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors duration-200 shadow-sm cursor-pointer"
        >
          {isPublished ? "Publish" : "Save as Draft"}
        </button>
      </form>
    </>
  );
}
