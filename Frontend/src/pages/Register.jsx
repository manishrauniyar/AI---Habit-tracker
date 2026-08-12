import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Sparkles, Sun, Moon, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import habitLogo from "../assets/habitLogo.png";

export default function Register() {
  const { user, register } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", });

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const set = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (form.password.length < 6) {
      setErr("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await register(form.name, form.email, form.password);
      navigate("/dashboard", { replace: true });

    } catch (e) {
      setErr(e.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 auth-shell">

      {/* Theme Toggle */}
      <button
        onClick={toggle}
        className="fixed top-4 right-4 p-2.5 rounded-xl glass z-20"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Register Card */}
      <div className="w-full max-w-md auth-form-panel rounded-3xl">
        <div className="auth-form-inner p-6 md:p-8">

          {/* Logo */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center brand-mark">
                <img
                  src={habitLogo}
                  alt="Habit Tracker"
                  className="w-full h-full object-contain"
                />
              </div>

              <span className="font-semibold text-lg">
                AI Habit Tracker
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300 mb-3">
              Create account
            </div>

            <h2 className="text-3xl font-semibold tracking-[-0.035em]">
              Start your first streak
            </h2>

            <p className="text-sm text-muted mt-2">
              Free forever. Takes about 30 seconds.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-4">

            <div>
              <label className="label">Name</label>

              <input
                className="input"
                type="text"
                value={form.name}
                onChange={set("name")}
                placeholder="Your name"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="label">Email</label>

              <input
                className="input"
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="label">Password</label>

              <input
                className="input"
                type="password"
                value={form.password}
                onChange={set("password")}
                placeholder="At least 6 characters"
                required
              />
            </div>

            {err && (
              <div className="text-sm text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                {err}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full py-3"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}

              {!loading && <ArrowRight size={15} />}
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-6 pt-5 border-t divider text-sm text-soft text-center">
            Already have an account?{" "}

            <Link
              to="/login"
              className="text-brand-700 dark:text-brand-300 font-semibold hover:underline underline-offset-4"
            >
              Log in
            </Link>
          </div>
            {/* Back To Home */}
          <div className="mt-5 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand-700 dark:hover:text-brand-300 transition"
            >
              <ArrowLeft size={16} />
              Return to home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}