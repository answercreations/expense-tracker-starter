function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-balance">
        <h3>Balance</h3>
        <p className="figure balance-amount">${balance}</p>
      </div>
      <div className="summary-split">
        <div>
          <h3>Income</h3>
          <p className="figure income-amount">${totalIncome}</p>
        </div>
        <div>
          <h3>Expenses</h3>
          <p className="figure expense-amount">${totalExpenses}</p>
        </div>
      </div>
    </div>
  );
}

export default Summary
