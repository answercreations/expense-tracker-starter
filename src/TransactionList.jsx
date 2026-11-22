import { useState } from 'react'
import { getColor } from './categoryColors.js'

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  const handleDelete = (t) => {
    if (window.confirm(`Delete "${t.description}"?`)) {
      onDelete(t.id);
    }
  };

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{capitalize(cat)}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length === 0 && (
            <tr>
              <td colSpan={5} className="empty-row">No transactions match these filters.</td>
            </tr>
          )}
          {filteredTransactions.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>
                <span className="category-tag">
                  <span className="category-dot" style={{ background: getColor(categories, t.category) }} />
                  {capitalize(t.category)}
                </span>
              </td>
              <td className={t.type === "income" ? "income-amount" : "expense-amount"}>
                {t.type === "income" ? "+" : "-"}${t.amount}
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(t)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList
