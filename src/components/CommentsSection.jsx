import { useState } from "react";
import { useAuth } from "../context/auth";
import { API_URL } from "../lib/config";

export default function CommentsSection({
  postId,
  comments = [],
  onAddComment,
}) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    fetch(`${API_URL}/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: text,
        author: user ? user.name : "Гость",
        postId: postId,
      }),
    });

    const newComment = {
      id: Date.now(),
      text: text,
      author: {
        name: user ? user.name : "Гость",
      },
      createdAt: new Date().toISOString(),
    };

    if (onAddComment) {
      onAddComment(newComment);
    }

    setText("");
    setIsSubmitting(false);
  };

  return (
    <section className="mt-10 pt-8 border-t border-slate-100">
      <h3 className="text-xl font-bold text-slate-900 mb-6">
        Комментарии ({comments.length})
      </h3>

      {/* Форма отправки комментария */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm shrink-0 border border-indigo-200">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="flex-1">
              <textarea
                rows="3"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Напишите комментарий..."
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 text-sm resize-none bg-slate-50/50"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-xl text-sm transition-colors shadow-sm cursor-pointer disabled:bg-indigo-300"
                >
                  {isSubmitting ? "Отправка..." : "Отправить"}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-8 text-center text-sm text-slate-600">
          Чтобы оставлять комментарии, пожалуйста,{" "}
          <a
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            войдите в аккаунт
          </a>
          .
        </div>
      )}

      {/* Список комментариев */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-6">
            Пока никто не оставил комментарий. Будьте первыми!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 sm:p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">
                    {comment.author?.name
                      ? comment.author.name.charAt(0).toUpperCase()
                      : "G"}
                  </div>
                  <span className="text-sm font-bold text-slate-900">
                    {comment.author?.name || "Аноним"}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  {comment.createdAt
                    ? new Date(comment.createdAt).toLocaleDateString()
                    : "Только что"}
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed pl-9">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
