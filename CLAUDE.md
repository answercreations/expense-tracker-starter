# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Starter project for the Code with Mosh Claude Code course. It is a React expense tracker that **intentionally** shipped with a bug, poor UI, and messy code, which get fixed step by step during the course. So far the totals bug is fixed and the single `App` component has been split into child components. Don't fix or refactor beyond what the current task asks for.

## Commands

```bash
npm install
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the built dist/
npm run lint     # ESLint (flat config in eslint.config.js)
```

There is no test framework or test script configured.

## Architecture

- Vite 7 + React 19, plain JavaScript (JSX), ES modules. No router, no state library, no backend or persistence.
- `index.html` → `src/main.jsx` (mounts `<App />` inside `StrictMode`) → `src/App.jsx`.
- Components live flat in `src/`, one per file, each a function component with a default export. There is no `components/` folder.

### Component tree and data flow

```
App                 owns: transactions (useState, seeded with sample data)
├── Summary         props: transactions
├── TransactionForm props: categories, onAdd   owns: description, amount, type, category
└── TransactionList props: transactions, categories, onDelete   owns: filterType, filterCategory
```

- **App is the single source of truth** for `transactions`. Children never modify it directly: `TransactionForm` builds a complete transaction object and passes it to App's `onAdd` callback, and App appends it with a functional `setTransactions(prev => …)` update. Likewise, each row's Delete button in `TransactionList` asks for confirmation with `window.confirm` and, if the user clicks OK, passes the transaction's `id` to App's `onDelete`, which filters it out.
- **UI-only state stays in the child that uses it.** Form field values live in `TransactionForm` and reset after a submit; filter selections live in `TransactionList`. Lift state into App only when a sibling needs it.
- **Derived values are calculated during render, never stored in state.** `Summary` computes income, expenses and balance; `TransactionList` computes the filtered rows.
- `categories` is a module-level constant in `App.jsx`, shared by the form's category picker and the list's category filter. Add new categories there.
- A transaction is `{ id, description, amount, type: "income" | "expense", category, date }`. `id` is `Date.now()`; `date` is a `YYYY-MM-DD` string.

### Styles

Plain CSS: global styles in `src/index.css`, and every component's styles in `src/App.css`, which only `App.jsx` imports. Child components use those class names directly without importing a stylesheet.

## Gotchas

- `amount` must be stored as a **number**. Input values are strings, so `handleSubmit` in `TransactionForm.jsx` converts them with `Number(amount)`. Storing a string makes the `reduce` totals concatenate instead of add.
- ESLint `no-unused-vars` ignores identifiers matching `^[A-Z_]`.
- Formatting is not consistent yet, and there is no Prettier config or format script in the repo. `App.jsx` uses Prettier-style formatting (double quotes, semicolons, one property per line in multi-line objects), while the other components use single-quoted imports and leave the semicolon off imports and `export default`. Match the style of the file you're editing.
