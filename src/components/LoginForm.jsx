import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]); // Очищаем старые ошибки перед новым запросом

    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (r) => {
        setIsLoading(false);
        const data = await r.json(); // Читаем JSON один раз!

        if (r.ok) {
          if (data.token) {
            login(data);
            navigate("/");
          }
        } else {
          setErrors([data.message || "Ошибка при входе"]);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setErrors(["Ошибка сети. Проверьте подключение к серверу."]);
      });
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">С возвращением!</h2>
          <p className="text-sm text-slate-500 mt-2">
            Войдите в свой аккаунт, чтобы продолжить
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Блок ошибок */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {errors.map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2.5 px-4 rounded-xl transition-colors duration-200 shadow-sm cursor-pointer disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? "Загрузка..." : "Войти"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Нет аккаунта?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}
