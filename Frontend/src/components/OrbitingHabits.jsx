import { Sparkles } from "lucide-react";
import { FaDroplet, FaPersonRunning, FaBookOpen, FaDumbbell, FaPenNib, FaBullseye } from "react-icons/fa6";
import { GiMeditation } from "react-icons/gi";
import { useTheme } from "../context/ThemeContext.jsx";

const HABITS = [
  { Icon: FaDroplet, color: "#5d8aa8", orbit: "outer", delay: 0 },
  { Icon: FaPersonRunning, color: "#b05f49", orbit: "outer", delay: -10 },
  { Icon: FaBookOpen, color: "#6f7b6c", orbit: "outer", delay: -20 },
  { Icon: GiMeditation, color: "#9c7a55", orbit: "middle", delay: -4, reverse: true },
  { Icon: FaDumbbell, color: "#b48b5c", orbit: "middle", delay: -16, reverse: true },
  { Icon: FaPenNib, color: "#8f6f65", orbit: "inner", delay: -2 },
  { Icon: FaBullseye, color: "#5f7c68", orbit: "inner", delay: -10 },
];

const ORBITS = {
  outer: { inset: "0%", duration: 32, planet: 52 },
  middle: { inset: "18%", duration: 24, planet: 46 },
  inner: { inset: "36%", duration: 18, planet: 40 },
};

const STARS = Array.from({ length: 14 }).map((_, i) => ({
  top: `${Math.round(Math.random() * 95)}%`,
  left: `${Math.round(Math.random() * 95)}%`,
  size: 2 + Math.round(Math.random() * 3),
  delay: -Math.random() * 3,
}));

export default function OrbitingHabits() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const sunGradient = isDark
    ? "radial-gradient(circle at 30% 25%, rgba(248,244,236,0.96), rgba(220,192,154,0.58) 52%, rgba(116,81,55,0.42))"
    : "radial-gradient(circle at 30% 25%, #fffdf8, #f4eadb 45%, #dcc09a 100%)";

  const sunShadow = isDark
    ? "inset 0 1px 0 rgba(255,255,255,0.5), 0 8px 28px rgba(202,167,120,0.26)"
    : "inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 28px rgba(116,81,55,0.20), 0 2px 7px rgba(17,17,15,0.10)";

  const sunBorder = isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.8)";
  const sunIconColor = isDark ? "#ead8be" : "#745137";

  const haloBg = isDark
    ? "radial-gradient(circle, rgba(220,192,154,0.24), transparent 70%)"
    : "radial-gradient(circle, rgba(180,139,92,0.20), transparent 70%)";

  return (
    <div className="relative mx-auto w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[460px] lg:h-[460px]">
      {STARS.map((s, i) => (
        <span key={i} className="absolute rounded-full bg-brand-300/70 dark:bg-brand-200/70" style={{ top: s.top, left: s.left, width: s.size, height: s.size, animation: `twinkle ${2.5 + (i % 3)}s ease-in-out ${s.delay}s infinite` }} />
      ))}

      {Object.entries(ORBITS).map(([k, o]) => (
        <div key={k} className="absolute rounded-full border border-dashed border-[var(--surface-border)] dark:border-white/10" style={{ inset: o.inset }} />
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: "34%", height: "34%", background: haloBg, animation: "pulse-ring 4.5s ease-in-out infinite" }} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] rounded-full flex items-center justify-center backdrop-blur-xl" style={{ background: sunGradient, boxShadow: sunShadow, border: sunBorder, color: sunIconColor }}>
        <Sparkles className="w-1/2 h-1/2" strokeWidth={1.5} />
      </div>

      {HABITS.map((h, i) => {
        const o = ORBITS[h.orbit];
        const Icon = h.Icon;

        return (
          <div key={i} className="absolute rounded-full" style={{ inset: o.inset, animation: `${h.reverse ? "orbit-reverse" : "orbit"} ${o.duration}s linear ${h.delay}s infinite` }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl flex items-center justify-center backdrop-blur-md glass-strong" style={{ width: o.planet, height: o.planet, background: `${h.color}33`, borderColor: `${h.color}55`, boxShadow: `0 8px 28px ${h.color}55, 0 0 0 1px ${h.color}33`, color: h.color, animation: `${h.reverse ? "orbit" : "orbit-reverse"} ${o.duration}s linear ${h.delay}s infinite` }}>
              <Icon size={o.planet * 0.45} />
            </div>
          </div>
        );
      })}
    </div>
  );
}