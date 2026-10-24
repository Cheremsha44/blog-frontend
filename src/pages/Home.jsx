import { useState } from "react";
import PostCard from "../components/PostCard";
import { CounterLike } from "../components/CounterLike";
import initialPosts from "../data/posts.json";
import { Link } from "react-router-dom";
import PostForm from "../components/PostForm";
import getData from "../lib/api";
import { useAuth } from "../context/auth";

import { useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(initialPosts);

  const handleAddPost = (data) => {
    const { title, content } = data;
    const newPost = {
      id: Date.now(),
      title: title,
      content: content,
    };
    setPosts([...posts, newPost]);
  };

  useEffect(() => {
    getData()
      .then((data) => setPosts(data.posts))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Замени свой return в Home.jsx на этот (стейт showPosts и handleShowPosts можно удалить)
  return (
    <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Приветственный баннер */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Главная
        </h1>
        <p className="text-slate-500 mt-2 text-base">
          Делитесь мыслями, публикуйте статьи и оценивайте посты других
          участников.
        </p>
      </div>

      {user && (
        <>
          {/* Секция создания поста */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 mb-12">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-5 bg-indigo-600 rounded-full inline-block"></span>
              Создать новый пост
            </h2>
            <PostForm onAdd={handleAddPost} />
          </section>
        </>
      )}

      {/* Лента постов */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Последние публикации
          </h2>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            Всего: {posts.length}
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 font-medium">Постов пока нет</p>
            <p className="text-sm text-slate-400 mt-1">
              Напишите первый пост с помощью формы выше!
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
                actions={
                  <>
                    <CounterLike />
                    <Link
                      to={`/post/${post.id}`}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      Читать далее <span>→</span>
                    </Link>
                  </>
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
