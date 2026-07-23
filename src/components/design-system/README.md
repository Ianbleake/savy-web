# Design System

## Structure

### `primitives/`
Atomic components not provided by shadcn/ui (e.g. modal, actions-menu, confirm-dialog, steps, truncated-text).

### `patterns/`
Composed components grouped by concern:
- `animations/` — decorative motion components
- `data-display/` — tables, cards, info displays
- `feedback/` — toasts, skeletons, empty states, error boundaries
- `filters/` — filter selects, search inputs, date range pickers
- `forms/` — form fields, file dropzones, selects, signature pads
- `layouts/` — screen layouts, section titles, headers
- `navigation/` — breadcrumbs, tabs, pagination

## Classification rule

**Primitive**: Can I copy this to another project without changing a single line? → Yes → primitive
**Pattern**: Composes 2+ primitives or adds app-specific logic → pattern
**Domain**: Feature-specific component that depends on a single app's types → `src/components/{domain}/`