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

export default function MonthlyBarChart({ data }) {
  const { theme } = useTheme();
  const grid = theme === "dark" ? "rgba(247,242,233,0.08)" : "rgba(17,17,15,0.08)";
  const tick = theme === "dark" ? "#aaa095" : "#756e65";
  return (
    <div className="card p-5">
      <div className="text-sm font-medium mb-3">Last 30 days</div>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <defs>
              <linearGradient id="monbar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="100%" stopColor="#b48b5c" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: tick }}
              axisLine={false}
              tickLine={false}
              interval={3}
            />
            <YAxis
              tick={{ fontSize: 12, fill: tick }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(15,15,27,0.04)" }}
              contentStyle={{
                background: theme === "dark" ? "rgba(12,11,10,0.98)" : "rgba(255,253,248,0.98)",
                border: `1px solid ${grid}`,
                borderRadius: 12,
                fontSize: 12,
                color: theme === "dark" ? "#f7f2e9" : "#11110f",
                backdropFilter: "blur(12px)",
              }}
            />
            <Bar dataKey="count" fill="url(#monbar)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
