import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../lib/config";

export default function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    fetch(`${API_URL}/api/auth/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then(async (r) => {
        setIsLoading(false);
        const data = await r.json();

        if (r.ok) {
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
          // Здесь можно добавить редирект или очистку формы
          setName("");
          setEmail("");
          setPassword("");
        } else {
          setErrors([data.message || "Ошибка при регистрации"]);
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
          <h2 className="text-2xl font-bold text-slate-900">Создать аккаунт</h2>
          <p className="text-sm text-slate-500 mt-2">
            Присоединяйтесь к нашему блогу прямо сейчас
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
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Ваше имя
            </label>
            <input
              type="text"
              id="name"
              required
              autoComplete="off"
              placeholder="Иван Иванов"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>

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
              autoComplete="off"
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
              autoComplete="new-password"
              placeholder="Минимум 8 символов"
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
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Уже есть аккаунт?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
