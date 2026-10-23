import { useState } from "react";
import { Link } from "react-router-dom";

const CounterLike = () => {
  const [count, setCount] = useState(0);

  const handleLike = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button>
      <p>Likes: {count}</p>
    </div>
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
