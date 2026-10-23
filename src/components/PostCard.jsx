import { useState } from "react";
import { Link } from "react-router-dom";

const CounterLike = () => {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (liked) {
      setCount(count - 1);
      setLiked(false);
    } else {
      setCount(count + 1);
      setLiked(true);
    }
  };

  return (
    <button
      onClick={handleLike}
      type="button"
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
        liked
          ? "bg-rose-50 text-rose-600 border border-rose-200 shadow-sm"
          : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {/* Иконка сердечка */}
      <svg
        className={`w-4 h-4 transition-transform active:scale-125 duration-150 ${
          liked
            ? "fill-rose-500 text-rose-500 scale-110"
            : "fill-none text-slate-400"
        }`}
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>

      {/* Счетчик */}
      <span>{count}</span>
    </button>
  );
};

export default function PostCard({ title, content, id }) {
  return (
    <article className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col justify-between">
      {/* Кликабельная часть карточки — ведет на страницу поста */}
      <Link to={`/post/${id}`} className="block flex-1">
        <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-3 line-clamp-2">
          {title}
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
          {content}
        </p>
      </Link>

      {/* Нижняя панель с лайком и ссылкой (не перекидывает при клике на лайк) */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <CounterLike />

        <Link
          to={`/post/${id}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          Читать далее <span>→</span>
        </Link>
      </div>
    </article>
  );
}
