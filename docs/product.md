# Product — Visual Design Language

> Source of truth for Savy's visual identity.
> All UI work must follow this guide. In case of conflict with component defaults, **this document takes priority**.

---

## 1. Brand color

Primary is **teal** defined in OKLCH tokens (`--primary`).

- Light: `oklch(0.511 0.096 186.391)`
- Dark: `oklch(0.437 0.078 188.216)`

**Never hardcode emerald, green, or hex values.** Always use `bg-primary`, `text-primary`, `border-primary`, etc.

The `Brand` component uses `bg-primary` for its icon container — not `bg-emerald-*`.

---

## 2. Typography

- **Font**: Inter Variable (`--font-sans`), no other fonts.
- **Scale**: Tailwind defaults — `text-xs` through `text-4xl`.
- **Weights**: `font-bold` for headings, `font-semibold` for subheadings and labels, `font-medium` for buttons and navigation, `font-normal` for body.
- **Line height**: `leading-[1.1]` for hero headings, `leading-relaxed` for body copy.
- **Tracking**: `tracking-tight` for headings, default for body.

---

## 3. Glass surfaces — `GlassCard`

The core visual element. A frosted glass card that extends shadcn's `Card` with a `data-glass` attribute.

### Light variant (default)

```
bg-white/30
backdrop-blur-2xl
border border-white/25
shadow-[0_8px_32px_rgba(0,0,0,0.04)]
```

### Dark variant

```
bg-white/[0.08]
backdrop-blur-2xl
border border-white/[0.14]
shadow-[0_8px_32px_rgba(0,0,0,0.3)]
ring-1 ring-inset ring-white/[0.08]
```

### Key principles

- **Transparency is mandatory.** The background must show through the card. `bg-white/30` is the sweet spot for light mode — higher values lose the glass feel.
- **Border must be subtle.** `border-white/25` — barely visible. No `ring` on light variant.
- **No gradient fills on the card itself.** The tint comes from the background blobs showing through the blur, not from the card's own background.
- **`data-glass` attribute** enables automatic styling of inner form elements via CSS (see §5).

### Usage

```tsx
import { GlassCard } from "@/components/design-system/patterns/glass-card";

<GlassCard variant="light" className="p-6">
  {/* Content */}
</GlassCard>
```

---

## 4. Background decoration

Rich, distributed blobs that give the glass surfaces something to show through.

### Pattern

```
Base gradient:    from-primary/8 via-primary/4 to-primary/15
Blobs:            5 distributed at corners + center
                  opacity primary/10–18, blur 100–140px
                  overflow edges (-left-[15%], -right-[10%], etc.)
Grid overlay:     primary lines at opacity 0.03–0.04, 40px spacing
```

### Glow behind cards

3 small distributed blobs positioned at corners of the card area:

```
Top-left:      -left-20 -top-12    size-[300px]  bg-primary/15  blur-[80px]
Bottom-right:  -bottom-16 -right-16 size-[280px]  bg-primary/12  blur-[70px]
Bottom-center: -bottom-8 left-[20%] size-[200px]  bg-primary/10  blur-[60px]
```

### Anti-patterns

- **Single centered glow** — looks like a border, not organic depth.
- **High opacity blobs** (`primary/25+`) — too saturated, overwhelms the glass.
- **Centered-only blobs** — looks concentrated; distribute across the full viewport.
- **Hard edges** — blobs must be large enough with enough blur that they never show a visible boundary.

---

## 5. Form elements inside glass

Styled automatically via `[data-glass]` CSS selectors in `globals.css`. No need to pass extra classes.

### Inputs

```css
[data-glass] [data-slot="input"] {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  border-color: rgba(255, 255, 255, 0.35);
}

[data-glass] [data-slot="input"]:focus-visible {
  background: rgba(255, 255, 255, 0.6);
}
```

### Select triggers

Same treatment as inputs — `bg-white/50`, `backdrop-blur`, `border-white/35`.

### Muted containers

Summary boxes and helper backgrounds: `bg-white/25` with `backdrop-blur-sm`.

---

## 6. Step progress (stepper)

Used for multi-step wizards. A connecting line runs between circles.

### Connecting line

```
Base:     bg-border/40, h-0.5
Progress: bg-primary/60, transition duration-500
```

### Circles (`size-10`)

| State     | Style                                                                      |
| --------- | -------------------------------------------------------------------------- |
| Completed | `bg-primary text-primary-foreground shadow-md shadow-primary/20` + `Check` icon |
| Active    | `bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-primary/15` |
| Pending   | `bg-white/60 text-muted-foreground shadow-sm shadow-black/5 border border-border/30` |

---

## 7. Elevation and depth

Depth comes from **transparency + blur + background richness**, not from heavy shadows.

| Level     | Recipe                                                  |
| --------- | ------------------------------------------------------- |
| Flat      | No shadow, no blur — regular `bg-card` surfaces         |
| Subtle    | `shadow-sm shadow-black/5` — pending stepper circles    |
| Glass     | `backdrop-blur-2xl` + translucent bg + distributed glow |
| Elevated  | `shadow-lg shadow-primary/30` — active elements         |

### Anti-patterns

- `box-shadow` with high spread as primary depth cue — looks cheap.
- `ring` + `border` stacked on the same element — creates double border.
- Inset shadows or 3D-looking effects — breaks the sober tone.

---

## 8. Motion

Restrained and purposeful. Four reusable primitives:

| Primitive          | Effect                           | Duration    |
| ------------------ | -------------------------------- | ----------- |
| `ScaleFadeIn`      | opacity 0→1, scale 0.95→1       | 0.6s        |
| `ScrollReveal`     | opacity 0→1, y 20px→0           | 0.4s        |
| `SlideUp`          | opacity 0→1, y 24px→0           | 0.35s       |
| `StaggerContainer` | stagger children by 0.12s        | per-child   |

### Rules

- All use `easeOut` — never `linear` for UI transitions.
- All respect `useReducedMotion()` — mandatory.
- Max `0.6s` duration. Nothing slower.
- Animate only `opacity` and `transform` — never `width`, `height`, or `top`.
- One animation per view transition — don't stack.

---

## 9. Color tokens (reference)

### Light mode

| Token                | Value                          |
| -------------------- | ------------------------------ |
| `--background`       | `oklch(1 0 0)` (white)         |
| `--foreground`       | `oklch(0.148 0.004 228.8)`     |
| `--primary`          | `oklch(0.511 0.096 186.391)`   |
| `--muted`            | `oklch(0.963 0.002 197.1)`     |
| `--muted-foreground` | `oklch(0.56 0.021 213.5)`      |
| `--border`           | `oklch(0.925 0.005 214.3)`     |
| `--card`             | `oklch(1 0 0)`                 |
| `--destructive`      | `oklch(0.577 0.245 27.325)`    |

### Dark mode

| Token          | Value                          |
| -------------- | ------------------------------ |
| `--background` | `oklch(0.148 0.004 228.8)`     |
| `--card`       | `oklch(0.218 0.008 223.9)`     |
| `--primary`    | `oklch(0.437 0.078 188.216)`   |
| `--border`     | `oklch(1 0 0 / 10%)`           |

---

## 10. Radius scale

Base: `--radius: 0.625rem` (10px).

| Token        | Value      |
| ------------ | ---------- |
| `rounded-sm` | 0.375rem   |
| `rounded-md` | 0.5rem     |
| `rounded-lg` | 0.625rem   |
| `rounded-xl` | 0.875rem   |
| `rounded-2xl`| 1.125rem   |

Cards use `rounded-xl`. Inputs use `rounded-md`. Buttons use `rounded-md`.

---

## 11. Icons

- **Library**: Lucide React — no other icon libraries.
- **Never** use emojis as icons.
- **Sizes**: `size-4` (16px) default, `size-5` (20px) for feature icons, `size-6`+ for brand.
- **Color**: `text-primary` for accent icons, `text-muted-foreground` for secondary.
