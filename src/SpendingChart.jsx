import { Bar, BarChart, CartesianGrid, Cell, LabelList, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getColor } from './categoryColors.js'

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const lighten = (hex, amount) => {
  const num = parseInt(hex.slice(1), 16);
  const mix = (channel) => Math.round(channel + (255 - channel) * amount);
  const r = mix((num >> 16) & 255);
  const g = mix((num >> 8) & 255);
  const b = mix(num & 255);
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
};

function ChartCursor({ payload, categories, theme, ...rest }) {
  const category = payload?.[0]?.payload?.category;
  if (!category) {
    return <Rectangle {...rest} fill={theme === "dark" ? "#242b26" : "#eef0e8"} />;
  }
  const color = getColor(categories, category);
  const fill = theme === "dark" ? `${color}33` : lighten(color, 0.85);
  return <Rectangle {...rest} fill={fill} />;
}

function SpendingChart({ transactions, categories, theme }) {
  const totals = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(totals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);

  if (data.length === 0) {
    return null;
  }

  const ink = theme === "dark" ? "#eef1ec" : "#1c2420";
  const inkMuted = theme === "dark" ? "#8b968f" : "#63706a";
  const rule = theme === "dark" ? "#313a34" : "#d8dacc";
  const surface = theme === "dark" ? "#1e2420" : "#ffffff";

  return (
    <div className="category-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 24, right: 8, bottom: 8, left: 8 }}>
          <CartesianGrid vertical={false} stroke={rule} />
          <XAxis dataKey="category" tickFormatter={capitalize} tick={{ fontSize: 12, fill: ink }} axisLine={{ stroke: rule }} tickLine={false} />
          <YAxis tickFormatter={(value) => `$${value}`} tick={{ fontSize: 12, fill: inkMuted }} axisLine={{ stroke: rule }} tickLine={false} />
          <Tooltip
            formatter={(value) => [`$${value}`, "Spent"]}
            labelFormatter={capitalize}
            contentStyle={{ fontSize: 13, background: surface, border: `1px solid ${rule}`, borderRadius: 8, padding: "8px 12px" }}
            labelStyle={{ color: ink }}
            itemStyle={{ color: ink }}
            cursor={<ChartCursor categories={categories} theme={theme} />}
          />
          <Bar dataKey="total" radius={[4, 4, 0, 0]} barSize={80}>
            {data.map((entry) => (
              <Cell key={entry.category} fill={getColor(categories, entry.category)} />
            ))}
            <LabelList dataKey="total" position="top" formatter={(value) => `$${value}`} fontSize={12} fill={ink} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart
