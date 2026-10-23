import { useAuth } from "../context/auth";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  const { user, loading, logout } = useAuth();
  if (loading) return null;
  // Функция для стилизации активной и неактивной ссылки в меню
  const navLinkStyles = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-indigo-600 font-semibold"
        : "text-slate-600 hover:text-indigo-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <Link
            to="/"
            className="text-xl font-bold text-slate-900 tracking-tight"
          >
            Мой<span className="text-indigo-600">Блог</span>
          </Link>

          {/* Навигация */}
          <nav>
            <ul className="flex items-center space-x-8">
              <li>
                <NavLink to="/" className={navLinkStyles}>
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={navLinkStyles}>
                  О нас
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={navLinkStyles}>
                  Контакты
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Кнопки авторизации */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span>Привет, {user.name}</span>
                <button onClick={logout}>Выйти</button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Войти
                </Link>
                <Link
                  to="/Registration"
                  className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
