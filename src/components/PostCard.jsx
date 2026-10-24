import { Link } from "react-router-dom";

export default function PostCard({ title, content, id, badge, actions }) {
  return (
    <article className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col justify-between">
      {/* Кликабельная часть карточки — ведет на страницу поста */}
      <Link to={`/post/${id}`} className="block flex-1">
        {badge && <div className="mb-3">{badge}</div>}

        <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-3 line-clamp-2">
          {title}
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
          {content}
        </p>
      </Link>

      {/* Нижняя панель рендерится только если передали actions */}
      {actions && (
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          {actions}
        </div>
      )}
    </article>
  );
}
