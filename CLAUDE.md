# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Starter project for the Code with Mosh Claude Code course. It is a React expense tracker that **intentionally** ships with a bug, poor UI, and messy code, which get fixed step by step during the course. Don't fix or refactor beyond what the current task asks for.

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
- `src/App.jsx` owns the `transactions` state (seeded with hard-coded sample data) and the shared `categories` array, and passes them down as props. Each transaction has `{ id, description, amount, type: "income" | "expense", category, date }`.
- Child components in `src/`:
  - `Summary.jsx` calculates the income, expense and balance totals from `transactions` during render.
  - `TransactionForm.jsx` owns its own form-field state and hands each new transaction to App through the `onAdd` callback.
  - `TransactionList.jsx` owns the type and category filter state and derives the filtered rows during render.
  - Categories come from a hard-coded `categories` array that both the add form and the category filter use.
- Styles: global styles in `src/index.css`, component styles in `src/App.css` (plain CSS, class names referenced directly in JSX).

## Gotchas

- `amount` must be stored as a **number**. Input values are strings, so `handleSubmit` converts them with `Number(amount)`. Storing a string makes the `reduce` totals concatenate instead of add.
- ESLint `no-unused-vars` ignores identifiers matching `^[A-Z_]`.
