# Development Rules — savy-web

> Reference document for agents and developers.
> Complements and refines the general rules in `AGENTS.md`.
> In case of conflict, **this document takes priority**.

---

## 1. `.d.ts` files — when to create them and when not

`.d.ts` files are **global ambient declarations**. They have a cost: they pollute the project's global namespace.

**Create `.d.ts` ONLY when** the defined types will be used in **more than one file**.

**Do NOT create `.d.ts` for:**
- Props of a component that only that component uses.
- Local types of a hook, service, or util that are not shared.

**In those cases**, define the type directly in the `.tsx` or `.ts` file that uses it:

```tsx
// ✅ Correct — the type is only used by this component
type AccountRowProps = {
  account: Account;
};

export const AccountRow = ({ account }: AccountRowProps) => { ... };
```

```ts
// ✅ Correct — goes to .d.ts because multiple files need it
// src/services/accounts/accounts.d.ts
type Account = { ... };
```

---

## 2. Utility functions — `src/utils/`

### Search-first rule (MANDATORY)

**Before creating any utility function**, check `src/utils/` completely for:
1. Does exactly what I need already exist? → Use it.
2. Does something similar that can be extended? → Extend it in the same file.
3. Nothing like it exists? → Create it following the rules below.

### Structure

- One function per file.
- The file name is identical to the function name: `getDueDateLabel.ts` exports `getDueDateLabel`.
- Functions are grouped by domain in subfolders: `src/utils/accounts/`, `src/utils/transactions/`, `src/utils/errors/`.

```
src/utils/
├── errors/
│   └── getApiErrorMessage.ts
├── formatters/
│   ├── formatCurrency.ts
│   └── formatPercent.ts
└── accounts/
    └── getAccountTypeLabel.ts
```

### Naming

- Descriptive names, verb + noun: `getApiErrorMessage`, `formatCurrency`, `buildTransactionPayload`.
- Never generic names like `helper.ts`, loose `utils.ts`, or `formatStuff.ts`.

---

## 3. Constants and domain maps — `src/content/`

### What goes here

- Label maps: `{ critical: "Critical", warning: "Warning" }`.
- Badge variant maps, border colors, CSS classes associated with domain values.
- Select and filter options.
- Tab, section, and form step configuration.

### What does NOT go here

- Transformation logic (that goes in `src/utils/`).
- Reactive state (that goes in `src/storage/`).

### File naming convention

- The file is named `{domain}Map.ts` for maps: `accountsMap.ts`, `transactionMaps.ts`.
- The file is named `{domain}Options.ts` for select options: `accounts-options.ts`.
- Exported constant names are `SCREAMING_SNAKE_CASE` and descriptive:
  `ACCOUNT_TYPE_LABEL`, `TRANSACTION_STATUS_BADGE_CLASS`.

```
src/content/
├── accounts/
│   ├── accountsMap.ts
│   └── accounts-options.ts
└── transactions/
    └── transactionMaps.ts
```

---

## 4. Table headers — `src/content/tables/`

All header arrays for data tables live in `src/content/tables/{domain}/{domain}Table.ts`.

- File name: `{domain}Table.ts` with kebab-case folder, camelCase file.
- Exported constant name: descriptive `SCREAMING_SNAKE_CASE`.
- Never define headers inline in the component.

```ts
// src/content/tables/accounts/accountsTable.ts
export const ACCOUNTS_TABLE: TableColumn[] = [
  { label: "Account name", className: "w-full" },
];
```

```
src/content/tables/
├── accounts/
│   └── accountsTable.ts
└── transactions/
    └── transactionsTable.ts
```

---

## 5. Naming — anti magic-vars rule

Never use single-letter or meaningless abbreviated variable names in any context:

```ts
// ❌ Incorrect
const x = items.map((i) => i.id);
const sorted = list.sort((a, b) => a.date - b.date);
useAccountsFilters((s) => s.filters);

// ✅ Correct
const ids = items.map((item) => item.id);
const sorted = list.sort((prev, next) => prev.date - next.date);
useAccountsFilters((state) => state.filters);
```

This applies to: callbacks, iterators, Zustand selectors, reducers, and any anonymous function.

---

## 6. Checklist before creating UI (MANDATORY for agents)

Before writing any component that involves presentation logic, verify in order:

1. **`src/utils/`** — Does the function I need exist, or can one be extended?
2. **`src/content/`** — Do the label maps, options, or static configuration exist?
3. **`src/content/tables/`** — Do the table headers exist?
4. **`AGENTS.md`** — When does a `.d.ts` apply? What component conventions apply?
5. Only after those checks, create the missing files.