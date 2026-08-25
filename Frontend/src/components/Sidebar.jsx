import { NavLink } from "react-router-dom";
import habitLogo from "../assets/habitLogo.png";
import {
  LayoutDashboard,
  ListChecks,
  CalendarDays,
  Brain,
  BarChart3,
  LogOut,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import Modal from "./Modal.jsx";
import api from "../api/axios.js";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/habits", label: "Habits", icon: ListChecks },
  { to: "/weekly", label: "Weekly", icon: CalendarDays },
  { to: "/insights", label: "Insights", icon: Brain },
  { to: "/stats", label: "Statistics", icon: BarChart3 },
];

export default function Sidebar() {
  const { user, logout, updateUser } = useAuth();
  const { theme, toggle } = useTheme();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [morning, setMorning] = useState(user?.morningMotivation || false);
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);

    try {
      const res = await api.put("/auth/profile", {
        name,
        morningMotivation: morning,
      });

      updateUser(res.data.user);
      setSettingsOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 fixed inset-y-0 left-0 z-30 glass border-r sidebar-shell">
      {/* Logo */}
      <div className="px-6 py-5 border-b divider">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ink-900 to-brand-700 text-white flex items-center justify-center brand-mark">
            <img
              src={habitLogo}
              alt="Habit Tracker"
              width={36}
              height={36}
              className="w-full h-full object-contain"
              decoding="async"
            />
          </div>

          <div className="font-semibold text-lg tracking-tight">
            Habit Tracker
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? "nav-item-active bg-gradient-to-r from-brand-500/15 via-brand-300/10 to-transparent text-brand-700 dark:text-brand-300 ring-1 ring-brand-500/20"
                  : "text-soft hover:bg-[var(--surface-hover)]"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t divider space-y-1">
        {/* Theme */}
        <button
          onClick={toggle}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-soft hover:bg-[var(--surface-hover)] transition"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>

        {/* Settings */}
        <button
          onClick={() => setSettingsOpen(true)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-soft hover:bg-[var(--surface-hover)] transition"
        >
          <Settings size={18} />
          Settings
        </button>

        {/* User */}
        <div className="px-2 py-2 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ink-900 to-brand-700 text-white font-semibold flex items-center justify-center shadow-md shadow-black/15">
            {user?.avatar ||
              user?.name?.charAt(0).toUpperCase() ||
              "U"}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">
              {user?.name}
            </div>

            <div className="text-xs text-faint truncate">
              {user?.email}
            </div>
          </div>

          <button
            onClick={logout}
            title="Log out"
            className="p-2 rounded-lg text-soft hover:bg-[var(--surface-hover)]"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      <Modal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="Settings"
      >
        <div className="space-y-4">
          {/* Display name */}
          <div>
            <label className="label">Display name</label>

            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Morning motivation */}
          <label className="flex items-start gap-3 p-3 rounded-xl glass cursor-pointer hover:bg-[var(--surface-hover)]">
            <input
              type="checkbox"
              checked={morning}
              onChange={(e) => setMorning(e.target.checked)}
              className="mt-1 accent-brand-600"
            />

            <div>
              <div className="text-sm font-medium">
                Morning motivation
              </div>

              <div className="text-xs text-faint">
                Show a short personalised AI message every morning on the
                dashboard.
              </div>
            </div>
          </label>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              className="btn-secondary"
              onClick={() => setSettingsOpen(false)}
            >
              Cancel
            </button>

            <button
              className="btn-primary"
              onClick={save}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
    </aside>
  );
}