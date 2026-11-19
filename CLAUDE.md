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
- All app logic and UI live in the single `App` component in `src/App.jsx`:
  - The transaction list is seeded with hard-coded sample data in `useState`. Each transaction has `{ id, description, amount, type: "income" | "expense", category, date }`.
  - Form fields and the two filters (type, category) are separate `useState` hooks.
  - Totals (income, expenses, balance) and the filtered list are derived during render, not stored in state.
  - Categories come from a hard-coded `categories` array that both the add form and the category filter use.
- Styles: global styles in `src/index.css`, component styles in `src/App.css` (plain CSS, class names referenced directly in JSX).

## Gotchas

- `amount` is stored as a **string**, both in the seed data and from the number input. The totals use `reduce((sum, t) => sum + t.amount, 0)`, so they concatenate strings instead of adding numbers. This is the known bug the course fixes.
- ESLint `no-unused-vars` ignores identifiers matching `^[A-Z_]`.
