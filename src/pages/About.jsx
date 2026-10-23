export default function About() {
  const stats = [
    { label: "Технологии", value: "React + Vite" },
    { label: "Стилизация", value: "Tailwind CSS" },
    { label: "Архитектура", value: "Fullstack REST API" },
  ];

  return (
    <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 sm:p-10">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          О проекте
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-6">
          Платформа для тех, кто любит код и технологии
        </h1>

        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            Привет! Это мой авторский блог-проект, созданный с нуля. Здесь я
            делюсь мыслями о веб-разработке, разбираю интересные задачи, пишу
            заметки об архитектуре приложений и тестирую новые фичи современного
            фронтенда и бэкенда.
          </p>
          <p>
            Бэкенд и фронтенд написаны полностью самостоятельно: от
            проектирования API и системы авторизации с токенами до реактивного
            интерфейса с маршрутизацией.
          </p>
        </div>

        {/* Карточки со стеком */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-slate-50 p-5 rounded-xl border border-slate-100"
            >
              <p className="text-xs font-medium text-slate-400 uppercase">
                {item.label}
              </p>
              <p className="text-lg font-bold text-slate-900 mt-1">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Блок об авторе */}
        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Разработчик проекта — Cheremsha44
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Исходный код моих проектов и другие репозитории можно посмотреть
              на GitHub.
            </p>
          </div>
          <a
            href="https://github.com/Cheremsha44"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            Мой GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}
