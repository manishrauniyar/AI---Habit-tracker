import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme } from "../context/ThemeContext.jsx";

const COLORS = [
  "#6f7b6c",
  "#5d8aa8",
  "#5f7c68",
  "#b48b5c",
  "#b05f49",
  "#8f6f65",
  "#9c7a55",
  "#78958b",
  "#a86f45",
];

export default function CategoryPieChart({ data }) {
  const { theme } = useTheme();

  return (
    <div className="card p-5">
      <div className="text-sm font-medium mb-3">Completions by category</div>

      {!data?.length ? (
        <div className="text-sm text-muted py-10 text-center">No data yet.</div>
      ) : (
        <div style={{ width: "100%", height: 240 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2} stroke={theme === "dark" ? "rgba(255,255,255,0.06)" : "#ffffff"} strokeWidth={2}>
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: theme === "dark" ? "rgba(10,14,28,0.96)" : "rgba(255,255,255,0.96)",
                  border: `1px solid ${theme === "dark" ? "rgba(167,139,250,0.14)" : "rgba(76,29,149,0.08)"}`,
                  borderRadius: 12,
                  fontSize: 12,
                  color: theme === "dark" ? "#f8fafc" : "#111827",
                  backdropFilter: "blur(12px)",
                }}
              />

              <Legend wrapperStyle={{ fontSize: 12, color: theme === "dark" ? "#b8b8c8" : "#4e4e59" }} iconType="circle" iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}