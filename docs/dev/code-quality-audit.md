# Code Quality Audit Reference

Reference document for auditing and refactoring components in savy-web.
Ensures every screen and feature module meets the project's architecture, design-system,
and TypeScript conventions defined in `AGENTS.md`.

---

## Philosophy

Code quality is not cosmetic — it is structural. Every violation in this checklist
creates one of three problems:

1. **Duplication** — reimplemented logic that the design-system already solves.
2. **Coupling** — state, types, or helpers tangled inside components instead of
   living in their dedicated layer.
3. **Fragility** — missing guards, magic variables, or implicit types that break
   silently when the backend changes.

The audit fixes these problems **inside-out**: children first, parent last.
Each rule targets a specific failure mode and includes detection + fix instructions.

---

## Quick-reference checklist

| #  | Rule                        | Detects                                            | Severity |
|----|-----------------------------|----------------------------------------------------|----------|
| 1  | Design-system components    | Reimplemented patterns that already exist           | High     |
| 2  | Componentization            | Files >150 lines, multiple components per file      | High     |
| 3  | No `utils.ts`               | Helper files inside component folders               | Medium   |
| 4  | Badge config maps           | Inline ternaries for variant/label by status        | Medium   |
| 5  | Controller pattern          | `useState` for filter/pagination in components      | High     |
| 6  | Early states                | Raw `Spinner` or `<p>` for loading/error/empty      | Medium   |
| 7  | Toolbar extraction          | Search + filters + buttons mixed into the screen    | Medium   |
| 8  | Guards in config map lookups| `Record<Enum, T>` accessed without fallback         | High     |
| 9  | TypeScript conventions      | Missing generics, magic vars, `any`, wrong imports  | High     |
| 10 | FormProvider / useFormContext | `form` prop drilled through multiple components    | Medium   |

---

## Rule 1: Design-system components

### Problem

Developers reimplement patterns that already exist in the design-system: a raw `Input`
with a `Search` icon and manual debounce instead of `SearchInput`, raw
`Tabs`/`TabsList`/`TabsTrigger`/`TabsContent` instead of `AppTabs`, or a hand-rolled
loading spinner in a table instead of `AppTable`'s built-in skeleton.

### How to detect

- `Input` + `Search` icon + `useEffect`/`setTimeout` debounce → should be `SearchInput`
- `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent` composed manually → should be `AppTabs`
- Manual `Spinner` centered inside a data grid → `AppTable` handles loading via `isLoading`
- Hand-built empty states with raw `<p>` → should be `Empty`
- Custom pagination controls → should be `AppTable` pagination or `TablePagination`
- Raw `Select` for filters → should be `FilterSelect`
- Manual filter toggle logic → should be `FiltersWrapper`

### Available design-system components

> Full catalog in `docs/dev/UI-usage.md`. Key replacements:

| Instead of...                                      | Use                     | Path                                                                 |
|----------------------------------------------------|-------------------------|----------------------------------------------------------------------|
| `Input` + `Search` icon + debounce                 | `SearchInput`           | `@/components/design-system/patterns/filters/search-input`           |
| Raw `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`  | `AppTabs`               | `@/components/design-system/patterns/navigation/app-tabs`            |
| Manual table + loading spinner + empty              | `AppTable`              | `@/components/design-system/patterns/data-display/app-table`         |
| Raw `<p>No results</p>`                            | `Empty`                 | `@/components/design-system/patterns/feedback/empty`                 |
| Custom pagination buttons                          | `TablePagination`       | `@/components/design-system/patterns/navigation/table-pagination`    |
| Raw `Select` for filter dropdowns                  | `FilterSelect`          | `@/components/design-system/patterns/filters/filter-select`          |
| Manual filter expand/collapse                      | `FiltersWrapper`        | `@/components/design-system/patterns/filters/filters-wrapper`        |
| Raw date range inputs                              | `FilterDateRangePicker` | `@/components/design-system/patterns/filters/filter-date-range-picker` |
| Custom confirmation modal                          | `ConfirmDialog`         | `@/components/design-system/primitives/confirm-dialog`               |
| Breadcrumb assembly                                | `AppBreadcrumbs`        | `@/components/design-system/patterns/navigation/app-breadcrumbs`     |
| Screen header with icon + title + actions          | `Screen`                | `@/components/design-system/patterns/layouts/screen`                 |
| Form slide-over panel                              | `FormSheet`             | `@/components/design-system/patterns/forms/form-sheet`               |
| Manual KPI display                                 | `KpiCard`               | `@/components/design-system/patterns/data-display/kpi-card`          |
| Manual progress indicator                          | `ProgressBar`           | `@/components/design-system/patterns/data-display/progress-bar`     |
| Manual donut/pie chart wrapper                     | `DonutChart`            | `@/components/design-system/patterns/data-display/donut-chart`       |
| Context menu / dropdown actions                    | `ActionsMenu`           | `@/components/design-system/primitives/actions-menu`                 |
| Manual form field + label + error                  | `FormField`             | `@/components/design-system/patterns/forms/form-field`               |
| Manual form select + label + error                 | `FormSelect`            | `@/components/design-system/patterns/forms/form-select`              |
| Header skeleton placeholder                        | `PageHeaderSkeleton`    | `@/components/design-system/patterns/feedback/skeletons/page-header-skeleton` |
| Title skeleton placeholder                         | `PageTitleSkeleton`     | `@/components/design-system/patterns/feedback/skeletons/page-title-skeleton` |

### How to fix

Replace the hand-rolled implementation with the design-system component.

```tsx
// BEFORE — reimplemented search
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const [search, setSearch] = useState<string>("");

useEffect(() => {
  const timer = setTimeout(() => onSearch(search), 300);
  return () => clearTimeout(timer);
}, [search]);

<div className="relative">
  <Input value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8" />
  <Search className="absolute left-2 top-2 h-4 w-4" />
</div>

// AFTER — design-system
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";

<SearchInput
  value={searchQuery}
  onCommit={setSearchQuery}
  placeholder="Buscar cuentas..."
/>
```

---

## Rule 2: Componentization

### Problem

Files contain more than one component definition, exceed 150 lines with extractable
sections, or define sub-components inline (`const AccountRow = () => ...` inside the
parent file).

### How to detect

- More than one `export const` or `const ... = (...): React.ReactElement` in a single `.tsx`
- File exceeds ~150 lines and has clearly separable sections (toolbar, table, form, summary)
- Inline component definitions used only in JSX (should be their own files)

### How to fix

Split into the standard folder structure. **All folder names use lowercase kebab-case.**

```
account-list/
├── index.tsx                  # orchestrator
├── account-list.d.ts          # shared types (only if 2+ files need them)
└── components/
    ├── account-toolbar/
    │   └── index.tsx
    ├── account-row/
    │   └── index.tsx
    └── account-summary/
        └── index.tsx
```

The `index.tsx` orchestrator pattern:

```tsx
// account-list/index.tsx
import type React from "react";
import { useBanks } from "@/hooks/banks/useBanks";
import { useBanksController } from "@/storage/banksController";
import { AccountToolbar } from "./components/account-toolbar";
import { AccountTable } from "./components/account-table";
import { AccountSummary } from "./components/account-summary";

export const AccountList = (): React.ReactElement => {
  // 1. Hooks
  const { data, isLoading } = useBanks();
  const searchQuery = useBanksController((state) => state.searchQuery);

  // 2. Derived state / handlers
  const filtered = (data ?? []).filter((account) =>
    account.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 3. Composition — no logic in JSX
  return (
    <div className="flex flex-col gap-4">
      <AccountToolbar />
      <AccountSummary accounts={filtered} />
      <AccountTable accounts={filtered} isLoading={isLoading} />
    </div>
  );
};
```

Key rules:
- The orchestrator calls hooks, computes derived state, and composes children.
- Children receive only the data they need — they do NOT call parent-level hooks.
- If a child needs filter state, it reads from the controller store directly.

---

## Rule 3: No `utils.ts`

### Problem

A `utils.ts` file exists inside a component folder. This creates coupling between
the component and its helpers, making reuse impossible and testing harder.

### How to detect

- Any file named `utils.ts` or `helpers.ts` inside a component folder
- Functions defined in a component file that are not React components

### How to fix

Move functions to `src/utils/{domain}/functionName.ts` — one function per file,
filename matches function name.

Move constants, label maps, and static configuration to `src/content/{domain}/`.

```
# BEFORE
src/screens/app/banks/utils.ts          # contains enrichBanksWithStats + formatBalance

# AFTER
src/utils/banks/enrichBanksWithStats.ts  # one function
src/utils/formatters/formatBalance.ts    # generic formatter
```

```tsx
// src/utils/banks/enrichBanksWithStats.ts
import type { Bank } from "@/services/banks/banks.d";

export const enrichBanksWithStats = (banks: Bank[]): BankWithStats[] => {
  return banks.map((bank) => ({
    ...bank,
    totalBalance: bank.accounts.reduce(
      (sum, account) => sum + account.balance, 0
    ),
    accountCount: bank.accounts.length,
  }));
};
```

---

## Rule 4: Badge config maps

### Problem

Inline ternary chains determine badge variant and label based on a status value.
This scatters presentation logic across JSX and is hard to maintain when new
statuses are added.

### How to detect

```tsx
// This pattern in JSX:
<Badge variant={status === "active" ? "default" : status === "inactive" ? "secondary" : "destructive"}>
  {status === "active" ? "Activa" : status === "inactive" ? "Inactiva" : "Suspendida"}
</Badge>
```

### How to fix

Create a config map in `src/content/{domain}/` and a lookup helper.

```tsx
// src/content/accounts/accountStatusConfig.ts

type BadgeConfig = {
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
};

export const ACCOUNT_STATUS_CONFIG: Record<AccountStatus, BadgeConfig> = {
  ACTIVE:    { label: "Activa",     variant: "default" },
  INACTIVE:  { label: "Inactiva",   variant: "secondary" },
  SUSPENDED: { label: "Suspendida", variant: "destructive" },
};

export const getAccountStatusBadge = (status: AccountStatus): BadgeConfig =>
  ACCOUNT_STATUS_CONFIG[status] ?? { label: status, variant: "outline" };
```

```tsx
// In the component:
import { getAccountStatusBadge } from "@/content/accounts/accountStatusConfig";

const badge = getAccountStatusBadge(account.status);

<Badge variant={badge.variant}>{badge.label}</Badge>
```

---

## Rule 5: Controller pattern with Zustand

### Problem

Filter state (`search`, `sortBy`, `statusFilter`, `page`, `per_page`) is managed with
`useState` inside the screen component. This prevents sub-components (like the toolbar)
from reading/writing filters without prop drilling.

### How to detect

- `useState` for search query, sort, order, status filter, page, or per_page in a screen
- Filter values passed as props from screen → toolbar → individual filter components
- `onSearch`, `onSort`, `onFilter` callback props threading through 2+ levels

### How to fix

Create a Zustand controller store in `src/storage/`. Types go in a `.d.ts` file in
the same folder.

```tsx
// src/storage/accounts.d.ts
type AccountsController = {
  searchQuery: string;
  sortBy: "name" | "createdAt" | "balance";
  order: "asc" | "desc";
  statusFilter: "all" | "active" | "inactive";
  page: number;
  per_page: number;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: AccountsController["sortBy"]) => void;
  setOrder: (order: AccountsController["order"]) => void;
  setStatusFilter: (filter: AccountsController["statusFilter"]) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
};
```

```tsx
// src/storage/accountsController.ts
import { create } from "zustand";

const DEFAULTS = {
  searchQuery: "",
  sortBy: "name" as const,
  order: "asc" as const,
  statusFilter: "all" as const,
  page: 1,
  per_page: 10,
};

export const useAccountsController = create<AccountsController>()((set) => ({
  ...DEFAULTS,

  setSearchQuery: (query: string): void => {
    set({ searchQuery: query, page: 1 }); // auto-reset page
  },

  setSortBy: (sortBy): void => {
    set({ sortBy, page: 1 });
  },

  setOrder: (order): void => {
    set({ order, page: 1 });
  },

  setStatusFilter: (filter): void => {
    set({ statusFilter: filter, page: 1 });
  },

  setPage: (page: number): void => {
    set({ page });
  },

  resetFilters: (): void => {
    set({ ...DEFAULTS });
  },
}));
```

Key rules:
- Every setter that changes filter criteria **auto-resets `page` to 1**.
- `per_page` lives in the controller defaults, not as a magic number in the component.
- Store suffix is `Controller.ts` (UI state only, no domain data).
- Store suffix is `Storage.ts` when it persists domain data (e.g. `authStorage.ts`).

---

## Rule 6: Early states — Skeleton and Empty

### Problem

Loading states use a centered `Spinner` component. Error and empty states use raw
`<p>` tags or ad-hoc markup instead of the design-system `Empty` component.

### How to detect

- `<Spinner />` or `<Loader />` rendered as the sole loading indicator for a data section
- `<p className="text-center text-gray-500">No hay resultados</p>` or similar
- Missing loading/empty/error handling entirely (renders nothing while fetching)

### How to fix

**When to use `Spinner` vs `Skeleton`:**

| Context                        | Use           | Why                                           |
|-------------------------------|---------------|-----------------------------------------------|
| Full-page initial load        | `Skeleton`    | Preserves layout, reduces perceived wait      |
| Table / list body             | `Skeleton`    | `AppTable` has built-in `AppTableSkeleton`    |
| Button action in progress     | `Spinner`     | Small inline indicator is appropriate          |
| Form submission               | `Spinner`     | Inside the button via `disabled` + spinner    |
| Lazy-loaded route             | `Spinner`     | Suspense fallback, brief transition           |

**Loading state:**

```tsx
// BEFORE
if (isLoading) return <div className="flex justify-center py-8"><Spinner /></div>;

// AFTER — for tables, AppTable handles it:
<AppTable
  elements={accounts}
  isLoading={isLoading}
  // ... AppTableSkeleton renders automatically
/>

// AFTER — for custom sections, use Skeleton:
import { Skeleton } from "@/components/ui/skeleton";

if (isLoading) {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
```

**Empty / error state:**

```tsx
// BEFORE
if (accounts.length === 0) return <p>No hay cuentas registradas</p>;

// AFTER
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Wallet } from "lucide-react";

if (accounts.length === 0) {
  return (
    <Empty
      icon={Wallet}
      title="Sin cuentas"
      description="Aún no has registrado ninguna cuenta bancaria."
      action={{
        label: "Agregar cuenta",
        onClick: () => setSheetOpen(true),
        icon: Plus,
      }}
    />
  );
}
```

---

## Rule 7: Toolbar extraction

### Problem

The toolbar area (search input + filter controls + action buttons like "Agregar") is
defined inline inside the screen component. This inflates the screen, mixes filter
UI with data logic, and makes the toolbar impossible to reuse.

### How to detect

- `SearchInput` + `FilterSelect` + `Button` all rendered directly in the screen's JSX
- Screen component imports filter-related design-system components
- 30+ lines of toolbar JSX inside the screen

### How to fix

Extract into a sub-component. The toolbar reads filter state directly from the
controller store — it does NOT receive filter values as props.

It receives only:
- Permission flags (e.g. `canCreate: boolean`) if applicable
- Callbacks for opening sheets/modals (e.g. `onAddAccount: () => void`)

```tsx
// account-list/components/account-toolbar/index.tsx
import type React from "react";
import { Plus } from "lucide-react";
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";
import { FilterSelect } from "@/components/design-system/patterns/filters/filter-select";
import { Button } from "@/components/ui/button";
import { useAccountsController } from "@/storage/accountsController";

type Props = {
  onAddAccount: () => void;
};

export const AccountToolbar = ({ onAddAccount }: Props): React.ReactElement => {
  const searchQuery = useAccountsController((state) => state.searchQuery);
  const setSearchQuery = useAccountsController((state) => state.setSearchQuery);
  const statusFilter = useAccountsController((state) => state.statusFilter);
  const setStatusFilter = useAccountsController((state) => state.setStatusFilter);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <SearchInput
          value={searchQuery}
          onCommit={setSearchQuery}
          placeholder="Buscar cuentas..."
        />
        <FilterSelect
          label="Estado"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { label: "Todos", value: "all" },
            { label: "Activas", value: "active" },
            { label: "Inactivas", value: "inactive" },
          ]}
        />
      </div>

      <Button onClick={onAddAccount}>
        <Plus className="mr-1 h-4 w-4" />
        Agregar cuenta
      </Button>
    </div>
  );
};
```

```tsx
// In the orchestrator:
<AccountToolbar onAddAccount={() => setSheetOpen(true)} />
```

---

## Rule 8: Guards in config map lookups

### Problem

Accessing a `Record<Enum, T>` without a fallback crashes when the backend sends
an unexpected value or when the key is `undefined`.

### How to detect

```tsx
// Dangerous — crashes if account.type is not in the map:
const label = ACCOUNT_TYPE_LABELS[account.type];
const columns = COLUMNS_BY_TAB[activeTab];
const items = TRANSACTION_CATEGORIES[category];
```

### How to fix

Always use nullish coalescing with a sensible default.

```tsx
// Safe:
const label = ACCOUNT_TYPE_LABELS[account.type] ?? account.type;
const columns = COLUMNS_BY_TAB[activeTab] ?? [];
const items = TRANSACTION_CATEGORIES[category] ?? [];
const badge = getAccountStatusBadge(account.status); // helper already has ?? inside
```

For arrays that feed `.map()` or `.length`, the default is `[]`.
For strings, the default is the raw key or a fallback label.
For objects, the default is a sensible empty config.

---

## Rule 9: TypeScript conventions

### Problem

TypeScript usage is inconsistent: missing generics on `useState`, magic variable names
in callbacks, `any` types, incorrect import syntax, or `.d.ts` files created
unnecessarily.

### How to detect

| Violation                             | Pattern to search for                          |
|---------------------------------------|------------------------------------------------|
| Missing `useState` generic            | `useState(false)`, `useState("")`, `useState(0)` |
| Magic variable names                  | `(s) =>`, `(a) =>`, `(b) =>`, `(j) =>`        |
| `any` type                            | `: any`, `as any`, `<any>`                     |
| Missing `import type`                 | `import { SomeType }` where only used as type  |
| Unnecessary `.d.ts`                   | `.d.ts` file with types used by only one file  |
| Props defined in `.d.ts`              | `Props` type in `.d.ts` instead of inline      |
| `Record<boolean>`                     | `Record<boolean, ...>`                         |

### How to fix

```tsx
// useState — ALWAYS explicit generic
const [isOpen, setIsOpen] = useState<boolean>(false);
const [count, setCount] = useState<number>(0);
const [name, setName] = useState<string>("");
const [selected, setSelected] = useState<Account | null>(null);
const [items, setItems] = useState<Transaction[]>([]);

// NEVER:
const [isOpen, setIsOpen] = useState(false);
```

```tsx
// Variables — descriptive names
accounts.filter((account) => account.isActive);
transactions.sort((prev, next) => prev.date - next.date);
banks.map((bank) => bank.name);

// NEVER:
accounts.filter((a) => a.isActive);
transactions.sort((a, b) => a.date - b.date);

// Exception: (m) => in lazy routes is acceptable
const Dashboard = lazy(() => import("./dashboard").then((m) => ({ default: m.Dashboard })));
```

```tsx
// import type — for type-only imports
import type { Account } from "@/services/accounts/accounts.d";
import type React from "react";
import type { LucideIcon } from "lucide-react";

// NEVER:
import { Account } from "@/services/accounts/accounts.d";
```

```tsx
// Props — inline when used by only one component
type Props = {
  accounts: Account[];
  isLoading: boolean;
  onSelect: (account: Account) => void;
};

export const AccountTable = ({ accounts, isLoading, onSelect }: Props): React.ReactElement => {
  // ...
};

// Shared types — .d.ts only when 2+ files use them
// Reference external types with inline import():
// account-list.d.ts
type AccountListItem = {
  account: import("@/services/accounts/accounts.d").Account;
  isSelected: boolean;
};
```

```tsx
// Record<boolean> is INVALID — use string literal union
// WRONG:
type FeatureFlags = Record<boolean, string>;

// CORRECT:
type FeatureFlags = Record<"true" | "false", string>;
```

---

## Rule 10: FormProvider / useFormContext

### Problem

The `form` object (from `useForm`) is passed as a prop through multiple component
levels. This creates tight coupling and noisy interfaces.

### How to detect

- `form` appears in a component's props AND that component passes it to its children
- More than one level of `form={form}` prop threading
- Sub-components receive `form` just to pass it to `FormField`, `FormSelect`, etc.

### How to fix

Wrap with `FormProvider` in the orchestrator. Sub-components access the form via
`useFormContext<T>()`.

**Important**: Design-system form components (`FormField`, `FormSelect`, `FormSwitch`,
`FormDatePicker`, `FormTextarea`, `FormMultiSelect`, `FormAsyncSelect`, `FormAsyncMultiSelect`)
still require `form` as a prop — sub-components get it from context and pass it to those
components.

```tsx
// account-form/index.tsx (orchestrator)
import type React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountBasicFields } from "./components/account-basic-fields";
import { AccountBalanceFields } from "./components/account-balance-fields";

export const AccountForm = (): React.ReactElement => {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: { name: "", type: "DEBIT", balance: 0 },
  });

  const onSubmit = (values: AccountFormValues): void => {
    // mutation call
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <AccountBasicFields />
        <AccountBalanceFields />
        <Button type="submit">Guardar</Button>
      </form>
    </FormProvider>
  );
};
```

```tsx
// account-form/components/account-basic-fields/index.tsx
import type React from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { ACCOUNT_TYPE_OPTIONS } from "@/content/banks/bankContent";

export const AccountBasicFields = (): React.ReactElement => {
  const form = useFormContext<AccountFormValues>();

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        form={form}
        name="name"
        label="Nombre de la cuenta"
        placeholder="Ej: Cuenta principal"
      />
      <FormSelect
        form={form}
        name="type"
        label="Tipo de cuenta"
        options={ACCOUNT_TYPE_OPTIONS}
      />
    </div>
  );
};
```

---

## Execution workflow

### 1. Exploration

Scan the target screen/module to identify which rules are violated.
If the module spans **4+ files**, delegate exploration to a sub-agent.

### 2. Refactor inside-out

Always fix children before parents. The parent's final shape depends on what
children expose.

### 3. Execution order

Apply rules in this sequence to avoid rework:

| Step | Rule | Why this order                                            |
|------|------|----------------------------------------------------------|
| 1    | 3    | Remove `utils.ts` — move functions before restructuring   |
| 2    | 5    | Create controller store — filters move out of component   |
| 3    | 4    | Create badge config maps — move to `src/content/`         |
| 4    | 9    | Fix TS conventions — clean foundation before splitting    |
| 5    | 2    | Componentize — split files now that deps are extracted     |
| 6    | 1    | Replace with design-system — children are now isolated     |
| 7    | 6    | Fix early states — loading/empty use correct components    |
| 8    | 7    | Extract toolbar — reads from controller, clean interface   |
| 9    | 10   | Apply FormProvider — form prop drilling cleaned up         |
| 10   | 8    | Add guards — final pass for runtime safety                 |

### 4. Verify after each block

```bash
bunx biome check <path> --write
bunx tsc --noEmit
```

Run both after completing each rule's changes. Do not batch multiple rules
before verifying.

### 5. Commit per logical block

Use conventional commits. One commit per rule or per logical group:

```
refactor(accounts): extract filter state to accountsController
refactor(accounts): replace inline badge ternaries with config map
refactor(accounts): split AccountList into sub-components
refactor(accounts): replace raw Tabs with AppTabs
fix(accounts): add guard to status config lookup
```

### 6. Delegate when touching 2+ non-trivial files

If a single rule's fix requires editing 2 or more files with non-trivial changes,
consider delegating to a sub-agent with clear instructions.

---

## Appendix: Common TypeScript errors

| Error message                                                    | Cause                              | Fix                                                    |
|-----------------------------------------------------------------|------------------------------------|---------------------------------------------------------|
| `File 'X.d.ts' is not a module`                                | Importing from ambient `.d.ts`     | Don't `import` from `.d.ts` — types are ambient, use directly. Use `import()` inside `.d.ts` for external refs. |
| `Type 'boolean' does not satisfy constraint 'string \| number'` | `Record<boolean, T>`               | Use `Record<"true" \| "false", T>` — Record keys must be `string \| number \| symbol`. |
| `Cannot read properties of undefined (reading 'length')`        | Array from Record lookup is `undefined` | Add `?? []` fallback: `ITEMS_BY_TYPE[type] ?? []`      |
| `Type 'X' is not assignable to type 'Y'`                       | Missing generic on `useState`      | Add explicit generic: `useState<Y>(initialValue)`      |
| `Parameter 'x' implicitly has an 'any' type`                   | Callback parameter not typed       | Add type annotation: `(account: Account) => ...`       |
| `'X' is declared but its value is never read`                   | Unused import or variable          | Remove it — `noUnusedLocals` and `noUnusedParameters` are enabled. |
| `All imports in import declaration are unused`                  | Non-type import used only as type  | Switch to `import type { X } from "..."` — `verbatimModuleSyntax` is enabled. |
