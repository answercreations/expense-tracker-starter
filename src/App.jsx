import { useEffect, useState } from "react";
import "./App.css";
import Summary from "./Summary.jsx";
import SpendingChart from "./SpendingChart.jsx";
import TransactionForm from "./TransactionForm.jsx";
import TransactionList from "./TransactionList.jsx";

const categories = [
  "food",
  "housing",
  "utilities",
  "transport",
  "entertainment",
  "salary",
  "other",
];

function App() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: "Salary",
      amount: 5000,
      type: "income",
      category: "salary",
      date: "2025-01-01",
    },
    {
      id: 2,
      description: "Rent",
      amount: 1200,
      type: "expense",
      category: "housing",
      date: "2025-01-02",
    },
    {
      id: 3,
      description: "Groceries",
      amount: 150,
      type: "expense",
      category: "food",
      date: "2025-01-03",
    },
    {
      id: 4,
      description: "Freelance Work",
      amount: 800,
      type: "expense",
      category: "salary",
      date: "2025-01-05",
    },
    {
      id: 5,
      description: "Electric Bill",
      amount: 95,
      type: "expense",
      category: "utilities",
      date: "2025-01-06",
    },
    {
      id: 6,
      description: "Dinner Out",
      amount: 65,
      type: "expense",
      category: "food",
      date: "2025-01-07",
    },
    {
      id: 7,
      description: "Gas",
      amount: 45,
      type: "expense",
      category: "transport",
      date: "2025-01-08",
    },
    {
      id: 8,
      description: "Netflix",
      amount: 15,
      type: "expense",
      category: "entertainment",
      date: "2025-01-10",
    },
  ]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="app">
      <div className="app-header">
        <div>
          <h1>Finance Tracker</h1>
          <p className="subtitle">Track your income and expenses</p>
        </div>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
          )}
        </button>
      </div>

      <Summary transactions={transactions} />

      <div className="panels">
        <SpendingChart transactions={transactions} categories={categories} theme={theme} />
        <TransactionForm categories={categories} onAdd={addTransaction} />
      </div>

      <TransactionList
        transactions={transactions}
        categories={categories}
        onDelete={deleteTransaction}
      />
    </div>
  );
}

export default App;
