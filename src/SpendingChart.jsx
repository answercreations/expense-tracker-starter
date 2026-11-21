import { Bar, BarChart, CartesianGrid, Cell, LabelList, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const categoryColors = [
  "#2a78d6", // blue
  "#eb6834", // orange
  "#1baf7a", // aqua
  "#eda100", // yellow
  "#e87ba4", // magenta
  "#008300", // green
  "#6250d6", // violet
  "#e34948", // red
];

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const lighten = (hex, amount) => {
  const num = parseInt(hex.slice(1), 16);
  const mix = (channel) => Math.round(channel + (255 - channel) * amount);
  const r = mix((num >> 16) & 255);
  const g = mix((num >> 8) & 255);
  const b = mix(num & 255);
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
};

const getColor = (categories, category) => categoryColors[categories.indexOf(category) % categoryColors.length];

function ChartCursor({ payload, categories, ...rest }) {
  const category = payload?.[0]?.payload?.category;
  const fill = category ? lighten(getColor(categories, category), 0.85) : "#e1e0d9";
  return <Rectangle {...rest} fill={fill} />;
}

function SpendingChart({ transactions, categories }) {
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

  return (
    <div className="category-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 24, right: 8, bottom: 8, left: 8 }}>
          <CartesianGrid vertical={false} stroke="#e1e0d9" />
          <XAxis dataKey="category" tickFormatter={capitalize} tick={{ fontSize: 12, fill: "#333" }} axisLine={{ stroke: "#c3c2b7" }} tickLine={false} />
          <YAxis tickFormatter={(value) => `$${value}`} tick={{ fontSize: 12, fill: "#898781" }} axisLine={{ stroke: "#c3c2b7" }} tickLine={false} />
          <Tooltip
            formatter={(value) => [`$${value}`, "Spent"]}
            labelFormatter={capitalize}
            contentStyle={{ fontSize: 13 }}
            cursor={<ChartCursor categories={categories} />}
          />
          <Bar dataKey="total" radius={[4, 4, 0, 0]} barSize={80}>
            {data.map((entry) => (
              <Cell key={entry.category} fill={getColor(categories, entry.category)} />
            ))}
            <LabelList dataKey="total" position="top" formatter={(value) => `$${value}`} fontSize={12} fill="#52514e" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart
