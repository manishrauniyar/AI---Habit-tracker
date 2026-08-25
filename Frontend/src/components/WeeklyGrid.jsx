import { weekKeys } from "../utils/dateHelpers.js";
import { Check } from "lucide-react";

export default function WeeklyGrid({ habits, logsByHabit, days: customDays }) {
  const days = customDays || weekKeys();
  const todayKey = new Date().toISOString().slice(0, 10);

  if (!habits.length) {
    return (
      <div className="card p-5 w-full">
        <p className="text-sm text-muted text-center">
          Create a habit to see your weekly grid.
        </p>
      </div>
    );
  }
  return (
    <div className="card p-4 sm:p-5 w-full max-w-full min-w-0">
      <div className="w-full max-w-full overflow-x-auto">
        <div className="min-w-[650px]">
          <div className="grid grid-cols-[150px_repeat(7,minmax(55px,1fr))] gap-2 items-center pb-3">
            <div className="text-xs font-medium text-muted">Habit</div>

            {days.map((d) => (
              <div key={d.key} className={`text-center text-xs font-medium ${d.key === todayKey ? "text-brand-600 dark:text-brand-300" : "text-muted"}`}>
                <div>{d.label}</div>
                <div className="text-[10px] text-faint mt-0.5">{d.short}</div>
              </div>
            ))}
          </div>

          {habits.map((h) => {
            const done = new Set(logsByHabit[h._id] || []);

            return (
              <div key={h._id} className="grid grid-cols-[150px_repeat(7,minmax(55px,1fr))] gap-2 items-center py-2 border-t divider">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-base shrink-0" style={{ background: `${h.color}26`, color: h.color }}>
                    {h.icon}
                  </span>

                  <span className="text-sm truncate">{h.name}</span>
                </div>

                {days.map((d) => {
                  const isDone = done.has(d.key);
                  const future = d.key > todayKey;

                  return (
                    <div key={d.key} className="flex items-center justify-center">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition ${isDone ? "text-white shadow-md" : future ? "text-faint" : "text-faint"}`} style={isDone ? { background: h.color, boxShadow: `0 4px 12px ${h.color}55` } : { background: "var(--chip-bg)" }}>
                        {isDone && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}