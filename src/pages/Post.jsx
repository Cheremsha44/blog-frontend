import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import { CounterLike } from "../components/CounterLike";
import CommentsSection from "../components/CommentsSection";
import { API_URL } from "../lib/config";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // Стейт для комментариев из БД
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Загружаем и пост, и комментарии параллельно при открытии страницы
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const [postRes, commentsRes] = await Promise.all([
          fetch(`${API_URL}/api/posts/${id}`),
          fetch(`${API_URL}/api/posts/${id}/comments`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }), // <-- Твой эндпоинт, который вызывает getComments
        ]);

        if (!postRes.ok) throw new Error("Пост не найден");

        const postData = await postRes.json();
        setPost(postData);

        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          setComments(commentsData); // Записываем комменты в стейт
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  // Функция добавления нового комментария в список локально после отправки
  const handleAddComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

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

  const isOwner =
    user && (user.id === post.authorId || user.id === post.userId);

  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-10">
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

        <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg mb-8">
          {post.content}
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between mb-2">
          <CounterLike />
        </div>

        {/* Передаем загруженные из базы комментарии в компонент */}
        <CommentsSection
          postId={id}
          comments={comments}
          onAddComment={handleAddComment}
        />
      </article>
    </div>
  );
}
