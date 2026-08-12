import { Link, Navigate } from "react-router-dom";
import habitLogo from "../assets/habitLogo.png"
import {
  Sparkles,
  Flame,
  BarChart3,
  Brain,
  CheckCircle2,
  ArrowRight,
  Target,
  Activity,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import OrbitingHabits from "../components/OrbitingHabits.jsx";

const features = [
  {
    icon: CheckCircle2,
    title: "Track daily habits",
    desc: "One-click check-offs with progress rings, streaks and a 90-day heatmap.",
  },
  {
    icon: Brain,
    title: "AI weekly insights",
    desc: "Personalised reports on what worked, what struggled, and what to try next.",
  },
  {
    icon: Flame,
    title: "Streak recovery coach",
    desc: "When streaks break, AI generates a gentle 3-day comeback plan.",
  },
  {
    icon: BarChart3,
    title: "Beautiful statistics",
    desc: "See patterns across days, weeks, categories — with an AI chat built-in.",
  },
];

export default function Landing() {
  const { user } = useAuth();
  const { theme, toggle } = useTheme();
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    // <div className="landing-page">
    //   <div className="landing-nav-wrap">
    //     <header className="landing-nav px-6 flex items-center justify-between">
    //       <div className="flex items-center gap-3">
    //         <div className="w-9 h-9 rounded-lg flex items-center justify-center brand-mark">
    //           <Sparkles size={18} />
    //         </div>
    //         <span className="font-semibold text-lg tracking-[0.01em]">
    //           Habit Tracker
    //         </span>
    //       </div>
    <div className="landing-page">
      <div className="landing-nav-wrap">
        <header className="landing-nav px-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src={habitLogo}
                alt="Habit Tracker"
                className="w-full h-full object-contain"
              />
            </div>

            <span className="font-semibold text-lg tracking-[0.01em]">
              Habit Tracker
            </span>

          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={toggle}
              className="btn-ghost p-2.5"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link to="/login" className="btn-ghost hidden sm:inline-flex">
              Log in
            </Link>
            <Link to="/register" className="btn-primary">
              Get started
            </Link>
          </nav>
        </header>
      </div>

      <section className="landing-hero">
        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 py-16 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            <div className="lg:col-span-7 hero-copy text-center lg:text-left">
              <div className="hero-kicker mb-6">
                <Sparkles size={12} />
                AI-powered habit coach
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[5.2rem] font-medium tracking-[-0.055em] leading-[0.98]">
                A better way to
                <br />
                <span className="hero-title-gradient">build consistency.</span>
              </h1>

              <p className="mt-7 text-[1.05rem] md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 text-soft">
                Track your habits, protect your streaks, and let AI turn your
                real data into useful encouragement — without the noise.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link to="/register" className="btn-primary px-6 py-3.5 text-base">
                  Start free
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-medium text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  I have an account
                </Link>
              </div>

              <p className="mt-5 text-sm text-white/45">
                Simple setup. Clear progress. Smarter reflection.
              </p>
            </div>

            <div className="lg:col-span-5 hero-visual flex justify-center lg:justify-end">
              <div className="hero-visual-stage p-2 sm:p-4">
                <OrbitingHabits />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="landing-content">
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="mb-9 md:flex md:items-end md:justify-between md:gap-8">
            <div className="max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700 mb-3">
                Your day, beautifully organised
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.04em] leading-[1.03]">
                Everything important,
                <br className="hidden md:block" /> without feeling busy.
              </h2>
            </div>
            <p className="mt-4 md:mt-0 max-w-sm text-sm md:text-base text-soft leading-relaxed">
              A clean workspace for daily check-ins, weekly reflection, streaks,
              statistics, and AI guidance.
            </p>
          </div>

          <div className="preview-grid grid md:grid-cols-2 gap-6">
            <div className="card p-6 md:p-7 relative overflow-hidden preview-panel">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">
                    Today
                  </div>
                  <div className="mt-1 text-sm text-muted">3 habits planned</div>
                </div>
                <div className="rounded-full border border-black/10 bg-black px-3 py-1 text-xs font-semibold text-white">
                  2 complete
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { icon: "💧", name: "Drink 2L water", done: true, streak: 12 },
                  { icon: "📚", name: "Read 20 minutes", done: true, streak: 7 },
                  { icon: "🏃", name: "Morning run", done: false, streak: 3 },
                ].map((h, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-xl glass p-3.5 ${h.done ? "ring-1 ring-brand-500/30" : ""
                      }`}
                  >
                    <span className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                      {h.icon}
                    </span>
                    <div className="flex-1 text-sm font-medium">{h.name}</div>
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <Flame size={12} className="text-orange-500" />
                      {h.streak}
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition ${h.done
                          ? "bg-black text-white shadow-md"
                          : "border-2 border-black/10 bg-white/40"
                        }`}
                    >
                      {h.done && <CheckCircle2 size={15} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6 md:p-7 relative overflow-hidden preview-panel">
              <div
                className="absolute inset-0 pointer-events-none opacity-80"
                style={{
                  background:
                    "radial-gradient(circle at 0% 0%, rgba(202,167,120,0.28), transparent 56%), radial-gradient(circle at 100% 100%, rgba(17,17,15,0.06), transparent 50%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-700 mb-3">
                  <Sparkles size={12} />
                  AI Weekly Report
                </div>
                <p className="text-[0.95rem] leading-7">
                  Big week for hydration — 7/7 on <b>Drink 2L water</b>! Your
                  morning runs slipped to 3/5 on weekdays. You're strongest
                  Mon–Wed, so protect that momentum with a smaller Thursday goal.
                </p>
                <div className="mt-7 grid grid-cols-3 gap-3">
                  {[
                    { label: "Streaks", value: "4" },
                    { label: "This week", value: "86%" },
                    { label: "Best ever", value: "28d" },
                  ].map((s) => (
                    <div key={s.label} className="glass rounded-xl p-3.5">
                      <div className="text-xl font-semibold tracking-tight">{s.value}</div>
                      <div className="text-xs text-muted mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 md:py-20 border-t divider">
          <div className="grid lg:grid-cols-12 gap-8 mb-10">
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.04em] leading-[1.04]">
                Built to feel calm.
                <br />
                Designed to keep you moving.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-2">
              <p className="text-soft leading-relaxed">
                Clean tracking, deep stats, and AI features that understand your
                actual data — wrapped in a focused interface that stays out of
                your way.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <div key={f.title} className="card p-6 feature-card">
                <div className="feature-icon w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center mb-5 shadow-lg shadow-black/10">
                  <f.icon size={18} />
                </div>
                <div className="font-semibold text-base">{f.title}</div>
                <div className="text-sm text-soft mt-2 leading-relaxed">
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="editorial-cta p-9 md:p-14 rounded-[1.75rem]">
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-2 mb-5 text-[#e4c79d]">
                <Target size={18} />
                <Activity size={18} />
                <Sparkles size={18} />
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.045em] leading-[1.03]">
                Your first streak is
                <br className="hidden sm:block" /> only three clicks away.
              </h2>
              <p className="mt-5 text-white/62 max-w-xl leading-relaxed">
                Create your account, add a habit, check it off. That's the whole
                onboarding.
              </p>
              <Link
                to="/register"
                className="editorial-cta-button mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
              >
                Create my account
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <footer className="max-w-6xl mx-auto px-6 py-8 text-center text-xs text-faint border-t divider">
          Built with MERN · AI Habit Tracker © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
