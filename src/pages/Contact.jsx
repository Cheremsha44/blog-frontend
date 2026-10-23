import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Свяжитесь со мной
        </h1>
        <p className="text-slate-500 mt-3">
          Есть вопросы по проекту, идеи для сотрудничества или просто хотите
          поздороваться? Напишите мне через форму или в соцсетях.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Левая колонка с инфой */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              GitHub
            </h3>
            <a
              href="https://github.com/Cheremsha44"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-indigo-600 hover:underline mt-1 block"
            >
              github.com/Cheremsha44
            </a>
            <p className="text-xs text-slate-500 mt-2">
              Репозитории, пет-проекты и контрибьюции.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Email
            </h3>
            <p className="text-base font-semibold text-slate-900 mt-1">
              hello@myblog.dev
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Отвечаю в течение 24 часов по рабочим дням.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Локация
            </h3>
            <p className="text-base font-semibold text-slate-900 mt-1">
              Remote / Worldwide 🌍
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Открыт к интересным предложениям и совместным проектам.
            </p>
          </div>
        </div>

        {/* Правая колонка с формой */}
        <div className="md:col-span-3 bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Написать сообщение
          </h2>

          {sent && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
              ✨ Спасибо! Ваше сообщение успешно отправлено.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Ваше имя
              </label>
              <input
                type="text"
                required
                placeholder="Александр"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email для ответа
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Сообщение
              </label>
              <textarea
                rows="4"
                required
                placeholder="Напишите, о чем бы вы хотели пообщаться..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
