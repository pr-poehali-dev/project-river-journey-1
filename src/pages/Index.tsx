import { useState } from "react";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/f3243e53-ce43-493c-bd8c-0a515bcbbbe1/bucket/23bcb886-0878-49b7-829e-1600944a91e8.jpg";
const SEND_ANKETA_URL = "https://functions.poehali.dev/ee066273-f0e7-47d5-bdd9-2ea3f2abf934";

export default function Index() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    genre: "",
    vision: "",
    budget: "",
    bandlink: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(SEND_ANKETA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Ошибка отправки");
      setSubmitted(true);
    } catch {
      setError("Не удалось отправить анкету. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-black">
        <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <img src={LOGO_URL} alt="YALT REC" className="w-10 h-10 object-cover" />
            <span className="text-xl font-bold tracking-tighter">YALT REC</span>
          </a>
          <div className="hidden md:flex space-x-8">
            <a href="#work" className="text-sm uppercase tracking-widest hover:text-amber-800 transition-colors">
              Наши работы
            </a>
            <a href="#about" className="text-sm uppercase tracking-widest hover:text-amber-800 transition-colors">
              О нас
            </a>
            <a href="#contact" className="text-sm uppercase tracking-widest hover:text-amber-800 transition-colors">
              Анкета
            </a>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-black">
            <a href="#work" onClick={() => setMenuOpen(false)} className="block px-6 py-4 text-sm uppercase tracking-widest border-b border-neutral-100 hover:text-amber-800 transition-colors">
              Наши работы
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)} className="block px-6 py-4 text-sm uppercase tracking-widest border-b border-neutral-100 hover:text-amber-800 transition-colors">
              О нас
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="block px-6 py-4 text-sm uppercase tracking-widest hover:text-amber-800 transition-colors">
              Анкета
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 container mx-auto">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-7 mb-8 md:mb-0">
            <h1 className="text-8xl md:text-9xl font-bold tracking-tighter leading-none mb-6">
              YALT
              <br />
              <span className="text-amber-800">REC</span>
            </h1>
            <p className="text-xl max-w-xl">
              От идеи до релиза — быстро, чётко, хорошо.
            </p>
            <div className="flex gap-4 mt-8">
              <a
                href="#contact"
                className="bg-black text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-amber-800 transition-colors"
              >
                Оставить заявку
              </a>
              <a
                href="#work"
                className="border border-black px-8 py-3 text-sm uppercase tracking-widest hover:border-amber-800 hover:text-amber-800 transition-colors"
              >
                Наши работы
              </a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 flex items-center justify-center">
            <div className="relative w-full aspect-square">
              <img
                src={LOGO_URL}
                alt="YALT REC"
                className="w-full h-full object-cover"
              />

            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-4 md:px-8 bg-black text-white">
        <div className="container mx-auto">
          <h2 className="text-6xl font-bold tracking-tighter mb-4">НАШИ РАБОТЫ</h2>
          <p className="text-neutral-400 mb-12 max-w-xl">Послушайте, что мы создали — и решите, совпадает ли наш звук с вашим.</p>

          <div className="flex items-center justify-center py-16 border border-neutral-700">
            <p className="text-neutral-500 uppercase tracking-widest text-sm">Работы скоро появятся</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
              <h2 className="text-6xl font-bold tracking-tighter mb-8">О НАС</h2>
              <div className="aspect-[4/5] relative mb-8 md:mb-0 overflow-hidden">
                <img src={LOGO_URL} alt="YALT REC" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-6 py-4">
                  <p className="text-white text-3xl font-bold tracking-tighter">YALT REC</p>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 md:pt-24">
              <p className="text-xl mb-6">
                YALT REC — продюсерский лейбл, который работает с артистами, готовыми к серьёзному звуку. Мы не просто записываем — мы выстраиваем музыкальный образ от первой ноты до релиза.
              </p>
              <p className="mb-6">
                Каждый проект — это отдельная история. Мы погружаемся в ваш материал, понимаем вашу аудиторию и создаём продакшн, который работает на стримингах, радио и живых выступлениях.
              </p>
              <p className="mb-6">
                Сингл или полноформатный альбом — мы доводим каждый трек до коммерческого качества без потери авторского голоса.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-12">
                <div>
                  <h3 className="text-sm uppercase tracking-widest mb-2">Принципы</h3>
                  <ul className="space-y-2">
                    <li>Авторский звук</li>
                    <li>Коммерческое качество</li>
                    <li>Сроки без компромиссов</li>
                    <li>Прозрачная работа</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest mb-2">Услуги</h3>
                  <ul className="space-y-2">
                    <li>Продюссирование синглов</li>
                    <li>Продюссирование альбомов</li>
                    <li>Сведение и мастеринг</li>
                    <li>Релиз-стратегия</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Questionnaire Section */}
      <section id="contact" className="py-20 px-4 md:px-8 bg-amber-800 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-6xl font-bold tracking-tighter mb-8">АНКЕТА</h2>
              <p className="text-xl mb-8">
                Расскажите о своём проекте — и наш менеджер свяжется с вами в течение 24 часов.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-bold leading-none">01</span>
                  <p>Заполните анкету — это займёт 2 минуты</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-bold leading-none">02</span>
                  <p>Менеджер изучит заявку и свяжется с вами</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-bold leading-none">03</span>
                  <p>Обсудим ваш проект и начнём работу</p>
                </div>
              </div>
            </div>
            <div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="text-6xl font-bold mb-4">✓</div>
                  <h3 className="text-2xl font-bold tracking-tighter mb-4">Анкета отправлена!</h3>
                  <p className="text-white/80">Наш менеджер свяжется с вами в течение 24 часов.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm uppercase tracking-widest mb-2">
                      Имя артиста / группа
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-white py-2 px-0 focus:outline-none focus:border-black placeholder-white/50"
                      placeholder="Ваше имя или псевдоним"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm uppercase tracking-widest mb-2">
                      Почта
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-white py-2 px-0 focus:outline-none focus:border-black placeholder-white/50"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm uppercase tracking-widest mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-white py-2 px-0 focus:outline-none focus:border-black placeholder-white/50"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label htmlFor="genre" className="block text-sm uppercase tracking-widest mb-2">
                      Жанр / стиль
                    </label>
                    <input
                      type="text"
                      id="genre"
                      required
                      value={formData.genre}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-white py-2 px-0 focus:outline-none focus:border-black placeholder-white/50"
                      placeholder="Поп, хип-хоп, R&B..."
                    />
                  </div>
                  <div>
                    <label htmlFor="vision" className="block text-sm uppercase tracking-widest mb-2">
                      Расскажите о проекте
                    </label>
                    <textarea
                      id="vision"
                      rows={3}
                      required
                      value={formData.vision}
                      onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-white py-2 px-0 focus:outline-none focus:border-black placeholder-white/50 resize-none"
                      placeholder="Сингл или альбом? Что хотите передать слушателю?"
                    />
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm uppercase tracking-widest mb-2">
                      Бюджет
                    </label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-amber-800 border-b-2 border-white py-2 px-0 focus:outline-none focus:border-black text-white"
                    >
                      <option value="" className="bg-amber-900">Выберите диапазон</option>
                      <option value="up-30" className="bg-amber-900">До 30 000 ₽</option>
                      <option value="30-100" className="bg-amber-900">30 000 — 100 000 ₽</option>
                      <option value="100-300" className="bg-amber-900">100 000 — 300 000 ₽</option>
                      <option value="300plus" className="bg-amber-900">От 300 000 ₽</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bandlink" className="block text-sm uppercase tracking-widest mb-2">
                      Ссылка на Bandlink
                      <span className="ml-2 normal-case tracking-normal font-normal text-white/60">— по желанию</span>
                    </label>
                    <input
                      type="url"
                      id="bandlink"
                      value={formData.bandlink}
                      onChange={(e) => setFormData({ ...formData, bandlink: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-white py-2 px-0 focus:outline-none focus:border-black placeholder-white/50"
                      placeholder="https://band.link/..."
                    />
                  </div>
                  {error && (
                    <p className="text-white bg-black/30 px-4 py-2 text-sm">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-colors mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Отправляем..." : "Отправить анкету"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 border-t border-black">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="YALT REC" className="w-8 h-8 object-cover" />
            <span className="font-bold tracking-tighter">YALT REC</span>
          </div>
          <span className="text-sm text-neutral-500 uppercase tracking-widest">Продюссирование синглов и альбомов</span>
          <span className="text-sm text-neutral-400">© 2024 YALT REC. Все права защищены.</span>
        </div>
      </footer>
    </main>
  );
}