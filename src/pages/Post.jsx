import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { CounterLike } from "../components/CounterLike";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Замени на свой эндпоинт получения одного поста
    fetch(`/api/posts/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Пост не найден");
        return r.json();
      })
      .then((data) => setPost(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Ошибка</h2>
        <p className="text-slate-500 mb-6">{error || "Пост не найден"}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 font-medium hover:underline cursor-pointer"
        >
          ← Вернуться назад
        </button>
      </div>
    );
  }

  // Проверяем, наш ли это пост (подставь свое поле с бэка, например post.userId или post.authorId)
  const isOwner =
    user && (user.id === post.authorId || user.id === post.userId);

  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-10">
      {/* Верхняя навигация */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
        >
          <span>←</span> Назад
        </button>

        {isOwner && (
          <Link
            to={`/post/${post.id}/edit`}
            className="text-sm font-medium bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 px-4 py-2 rounded-xl transition-all shadow-xs"
          >
            ✏️ Редактировать пост
          </Link>
        )}
      </div>

      {/* Контент статьи */}
      <article className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-10">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-xs text-slate-400 pb-6 mb-6 border-b border-slate-100">
          <span>Автор: {post.author?.name || "Пользователь"}</span>
          <span>•</span>
          <span>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString()
              : "Недавно"}
          </span>
        </div>

        {/* whitespace-pre-wrap сохраняет абзацы и переносы строк из textarea */}
        <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg mb-8">
          {post.content}
        </div>

        {/* Подвал статьи с лайком */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <CounterLike />
        </div>
      </article>
    </div>
  );
}
