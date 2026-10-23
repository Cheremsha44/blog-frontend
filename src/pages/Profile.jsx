import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { getMyPosts } from "../lib/api";

export default function Profile() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddPost = (data) => {
    const { title, content } = data;
    const newPost = {
      id: Date.now(),
      title: title,
      content: content,
    };
    setPosts([newPost, ...posts]); // Добавляем новый пост в начало списка
  };

  useEffect(() => {
    getMyPosts()
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl text-sm font-medium">
          Ошибка загрузки профиля: {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Требуется авторизация
        </h2>
        <p className="text-slate-500">
          Пожалуйста, войдите в систему, чтобы просмотреть профиль.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Шапка профиля */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-extrabold text-3xl flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        <div className="space-y-1.5 flex-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {user.name}
          </h1>
          <p className="text-sm text-slate-500 flex items-center gap-2">
            <span>✉️ {user.email}</span>
            <span>•</span>
            <span>
              📅 На сайте с{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "недавно"}
            </span>
          </p>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 px-4 py-3 rounded-2xl text-center shrink-0">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            Постов
          </p>
          <p className="text-2xl font-black text-indigo-700 mt-0.5">
            {posts.length}
          </p>
        </div>
      </div>

      {/* Форма создания поста */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80 mb-12">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-2 h-5 bg-indigo-600 rounded-full inline-block"></span>
          Создать новый пост
        </h2>
        <PostForm onAdd={handleAddPost} />
      </section>

      {/* Лента постов пользователя */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Ваши публикации</h2>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            Всего: {posts.length}
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3 text-xl">
              ✍️
            </div>
            <p className="text-slate-700 font-semibold">Постов пока нет</p>
            <p className="text-sm text-slate-400 mt-1">
              Напишите свой первый пост с помощью формы выше!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
