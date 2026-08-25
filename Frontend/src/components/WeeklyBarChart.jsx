import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../context/ThemeContext.jsx";

export default function WeeklyBarChart({ data, title = "Last 7 days" }) {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const grid = isDark? "rgba(247,242,233,0.08)" : "rgba(17,17,15,0.08)";

  const tick = isDark ? "#aaa095" : "#756e65";

  const tooltipBg = isDark
    ? "rgba(12,11,10,0.98)"
    : "rgba(255,253,248,0.98)";

  const tooltipBorder = isDark
    ? "rgba(247,242,233,0.12)"
    : "rgba(17,17,15,0.08)";

  const cursorFill = isDark
    ? "rgba(255,255,255,0.04)"
    : "rgba(15,15,27,0.04)";

  return (
    <div className="card p-5">
      <div className="text-sm font-medium mb-3">
        {title}
      </div>

      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <defs>
              <linearGradient
                id="wkbar"
                x1="0"
                y1="0"
                x2="0"
                y2="1">
                <stop offset="0%" stopColor="#dcc09a" />
                <stop offset="100%" stopColor="#745137" />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke={grid}
            />

            <XAxis
              dataKey="label"
              tick={{
                fontSize: 12,
                fill: tick,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fontSize: 12,
                fill: tick,
              }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />

            <Tooltip
              cursor={{
                fill: cursorFill,
              }}
              contentStyle={{
                background: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: 12,
                fontSize: 12,
                color: isDark ? "#f7f2e9" : "#11110f",
              }}
            />

            <Bar
              dataKey="count"
              fill="url(#wkbar)"
              radius={[6, 6, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}