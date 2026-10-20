# {Brand} Design System

Single source of truth for **Rivermark.ai** (screen generation) and the **coding agent** (implementation). If a value isn't here, don't invent one: pick the nearest token, or flag it as an open question.

> **Provenance.** Derived from the repo READMEs (`README.md`, `WebApp/README.md`, empty `Design/*`). No `src/`, Tailwind config, or CSS was visible, so anything about styling setup is marked **(Recommendation)** and needs confirming. Nothing in the app is redesigned by this file.

**Known stack:** React + Vite + TypeScript, Supabase (auth/DB), Vercel, Razorpay, shadcn/ui.
**Decided:** Tailwind CSS v4 + shadcn/ui set up from scratch (no `components.json` yet) · dark mode in v1 · fonts Plus Jakarta Sans + Manrope · 2D layered-SVG keyboard preview (no 3D).
**Assumed (Recommendation):** `lucide-react` icons.

---

## 1. Product & visual direction

{Brand} sells **repairable, fully customizable keyboards** (case, hot-swap sockets, PCB, controller, battery). Users configure a board, preview it in 2D, buy via Razorpay (INR), and track the order.

**Direction: "Calm workshop."** A quiet, lavender-tinted canvas where the keyboard is the only loud thing. Warm and trustworthy, like a well-lit desk, not a gamer RGB store.

**Principles**
1. **Product first.** UI recedes; the keyboard preview and swatches carry the colour.
2. **Calm by default.** One accent, soft surfaces, generous space, no gradients on UI chrome.
3. **Repairable = legible.** Parts, compatibility, and prices are always explicit. No hidden steps.
4. **Honest.** Say "Final product may vary slightly" next to the preview. Never fake urgency.
5. **Few decisions per screen.** One primary action per view.

**Palette name.** *Sakura* is pink; what you describe (lavender white + violet) is closer to **wisteria / fuji**. Recommendation: **lavender-white surfaces + muted violet primary**, with a *tiny* sakura-pink as a decorative tint only. It keeps the keyboard-hobby feel without looking candy-pink.

---

## 2. Colour tokens

Use shadcn variable names so components work unchanged. **Never use raw hex in components**; use `bg-background`, `text-muted-foreground`, etc.

### Light
| Token | Hex | Use |
|---|---|---|
| `--background` | `#FAF8FD` | Page |
| `--foreground` | `#2A2233` | Body text (13:1) |
| `--card` / `--popover` | `#FFFFFF` | Cards, dialogs, menus |
| `--card-foreground` | `#2A2233` | Text on cards |
| `--primary` | `#6B4FBB` | Main CTA, links, active nav (6.1:1 w/ white) |
| `--primary-foreground` | `#FFFFFF` | Text on primary |
| `--secondary` | `#EFE9FA` | Secondary buttons, chips |
| `--secondary-foreground` | `#3F2F73` | Text on secondary |
| `--muted` | `#F1EDF8` | Subtle fills, skeletons, table headers |
| `--muted-foreground` | `#675E75` | Helper text (5.7:1) |
| `--accent` | `#EDE6F9` | Hover/selected surface (shadcn meaning) |
| `--accent-foreground` | `#3F2F73` | Text on accent |
| `--border` | `#E4DDF0` | Dividers, card borders |
| `--input` | `#D6CCE6` | Input borders (3:1 vs card) |
| `--ring` | `#8466D1` | Focus ring |
| `--destructive` | `#B3263E` | Errors, delete |
| `--success` | `#2F7D5B` | Paid, in stock, saved |
| `--warning` | `#8A5A00` | Low stock, delays (on `--warning-soft`) |
| `--info` | `#3A62B8` | Neutral notices |
| `--sakura` | `#F4C9DA` | Decorative only: badges like "New", illustration tints. Never text, never a button |

Soft feedback backgrounds: `--success-soft #E6F4EC`, `--warning-soft #FFF3D6`, `--destructive-soft #FBE9EC`, `--info-soft #E7EEFB`.

### Dark
`--background #17131F` · `--foreground #F1ECF8` · `--card #1F1A2A` · `--primary #A58BF0` (fg `#17131F`) · `--secondary #2B2340` · `--muted #272033` · `--muted-foreground #B3A9C4` · `--accent #322A47` · `--border #332B45` · `--input #4A3F63` · `--ring #A58BF0` · `--destructive #F27A8D` · `--success #6CCB9D` · `--warning #E8B04A` · `--info #8FB0F0`.

### Rules
- Primary violet appears on **at most one filled element per view** plus links/active states.
- Meaning is never colour-only; pair with icon + text.
- Keyboard colourways (user-chosen swatches) are *product data*, not theme. Render them inside swatch components only.
- **Tailwind v4:** expose tokens with `@theme inline { --color-primary: var(--primary); … }` so classes like `bg-primary` work.
- **Dark mode (v1):** class-based (`.dark` on `<html>`), `@custom-variant dark (&:is(.dark *));`. Options: Light / Dark / System, default **System**, stored in `localStorage`. Apply the class in an inline script in `index.html` before first paint to avoid a flash. Every screen must be designed and checked in both themes.

---

## 3. Typography

| Role | Font | Weights | Use |
|---|---|---|---|
| Display | **Plus Jakarta Sans** | 600–700, tracking `-0.01em` | Headings, prices, hero |
| Body / UI | **Manrope** | 400 / 500 / 600 | Everything else |
| Mono | **JetBrains Mono** | 400 / 500 | Part numbers, SKUs, order IDs, layout names |

Both sans fonts are geometric and friendly, so hierarchy comes from **weight and size**, not from font contrast. Don't use Plus Jakarta Sans below 18px or Manrope for headings. Self-host with `@fontsource-variable/plus-jakarta-sans`, `@fontsource-variable/manrope`, `@fontsource-variable/jetbrains-mono`, `font-display: swap`.

### Scale (rem, 16px base)
| Token | Size / line-height | Weight | Use |
|---|---|---|---|
| `display` | 3rem / 1.1 (2.25rem mobile) | display 700 | Landing hero only |
| `h1` | 2.25rem / 1.15 (1.75rem mobile) | display 700 | Page title |
| `h2` | 1.5rem / 1.25 | display 700 | Section |
| `h3` | 1.125rem / 1.4 | body 600 | Card title |
| `body` | 1rem / 1.6 | 400 | Default |
| `small` | 0.875rem / 1.5 | 400/500 | Helper text, table cells |
| `caption` | 0.75rem / 1.4 | 500 | Labels, badges (never below 12px) |

Rules: max one `h1` per page; line length ≤ 70ch; sentence case everywhere; prices use `tabular-nums` and display font off.

---

## 4. Spacing, layout, sizing

- **Grid:** 4px base. Allowed spacing steps: `1 2 3 4 6 8 12 16` (4–64px). No arbitrary `p-[13px]`.
- **Component padding:** card `p-6` (`p-4` mobile) · dialog `p-6` · input `px-3` · section gap `gap-8` (`gap-12` landing).
- **Container:** `max-w-6xl` (1152px), `px-4 sm:px-6 lg:px-8`. Reading content `max-w-prose`.
- **Page grid:** 12 columns desktop, 4 mobile, `gap-6`.
- **Control heights:** `sm 32px` · `default 40px` · `lg 48px` (primary checkout/CTA). Minimum touch target **44×44px** on touch.
- **Configurator layout** (Recommendation): 2D keyboard preview (sticky, 7/12) + options panel (5/12) on `lg+`; preview on top (≈ 40vh) with bottom-sheet options on mobile.

### Radius, border, shadow
| Token | Value | Use |
|---|---|---|
| `--radius` | `0.75rem` | Base. `rounded-lg`=radius, `md`=−2px, `sm`=−4px |
| Buttons, inputs | `rounded-md` | |
| Cards, dialogs | `rounded-xl` | |
| Badges, swatches | `rounded-full` | |

Borders: `1px solid var(--border)`. Prefer border **or** shadow, rarely both.

| Shadow | Value | Use |
|---|---|---|
| `shadow-xs` | `0 1px 2px rgb(60 40 110 / .06)` | Inputs, buttons |
| `shadow-sm` | `0 2px 8px rgb(60 40 110 / .08)` | Cards (hover) |
| `shadow-lg` | `0 12px 32px rgb(60 40 110 / .14)` | Dialogs, popovers, sheets |

### Icons
`lucide-react`, 1.5px stroke, sizes **16** (inline), **20** (buttons/nav), **24** (empty states). Inherit `currentColor`. Icon-only buttons need `aria-label`. No emoji as UI icons.

### Motion
`--duration-fast 150ms`, `--duration-base 250ms`, easing `cubic-bezier(.2,.7,.2,1)`. Animate opacity/transform only. Under `prefers-reduced-motion: reduce`: remove transitions/transforms, replace spinners' motion with static text where possible.

---

## 5. Responsive behaviour

Mobile-first breakpoints (Tailwind defaults): `sm 640` · `md 768` · `lg 1024` · `xl 1280`.
- `< md`: single column; nav collapses to `Sheet` menu; tables become stacked cards; dialogs become bottom `Drawer`.
- `md–lg`: two columns where useful; sidebar absent.
- `lg+`: sticky preview + options; tables stay tabular.
- No horizontal page scroll at 320px. Test at 320, 768, 1280.

---

## 6. Accessibility (WCAG 2.2 AA minimum)

- **Contrast:** text ≥ 4.5:1, large text/UI boundaries/focus ≥ 3:1. Token pairs above already comply; don't recombine tokens outside documented pairs.
- **Focus:** always visible: `focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background`. Never `outline-none` without a ring replacement.
- **Keyboard:** everything reachable and operable. Dialogs trap focus and return it on close. Esc closes overlays. Skip-to-content link on every page.
- **Keyboard preview:** the SVG is `role="img"` with an `aria-label` summarising the current configuration (e.g. "75% layout, Lilac case, Ivory keycaps"), updated via `aria-live="polite"`. The options panel holds the real controls; never make the SVG the only way to choose a part.
- **Forms:** visible `<Label>` (no placeholder-only), errors linked via `aria-describedby`, `aria-invalid`, summary focus on submit failure.
- **Colour pickers:** swatches have text names, selected state shown by ring + check, not hue alone.
- **Motion:** see §4. **Zoom:** layouts work at 200%/400% reflow. **Targets:** ≥ 24px minimum, 44px preferred.
- Status updates (toasts, order state) use `role="status"`; errors `role="alert"`.

---

## 7. Interface patterns

All built from shadcn/ui primitives (see §8).

**Navigation**: Top bar, `h-16`, `bg-background/90 backdrop-blur`, border-bottom. Left: wordmark. Centre/right: *Keyboards, Customize, Orders*. Far right: cart (`Badge` count), account `DropdownMenu`. Active link: `text-primary` + 2px underline. Mobile: `Sheet`. Components: `NavigationMenu`, `Sheet`, `DropdownMenu`, `Avatar`.

**Buttons** (`Button`): one `default` (primary) per view. `secondary` for supporting actions, `outline` for neutral, `ghost` for toolbar/icon, `destructive` for irreversible, `link` for inline. Label = verb + object ("Add to cart", "Buy now", "Save design"). Loading: disable, show `Loader2` spinner, keep label ("Adding…").

**Forms** (`Form`, `Input`, `Label`, `Select`, `Checkbox`, `RadioGroup`, `Switch`): single column, `gap-4`, label above field, helper `small muted`, error `small destructive` with icon below field. Validate on blur + submit. Required fields marked in label text, not asterisk alone. Auth: Google button (`outline`) above email form, divided by "or".

**Cards** (`Card`): `rounded-xl border bg-card p-6`; hover `shadow-sm` only when clickable (whole card is one link). Product card: image (4:3, `bg-muted`), name `h3`, one-line spec, price (`tabular-nums`), single action.

**Option pickers** (configurator): `ToggleGroup`/`RadioGroup` styled as cards; selected = `border-primary ring-1 ring-primary` + check icon. Show price delta ("+₹450") and compatibility notes inline. Sections in `Accordion`: Case · Switches/sockets · PCB · Controller · Battery.

**Dialogs** (`Dialog`, `AlertDialog`, `Drawer`): `max-w-md` (`lg` for forms), title + one-sentence description, actions right-aligned, primary last. Destructive confirmations use `AlertDialog`, name the item and consequence.

**Tables** (`Table`): header `bg-muted text-small font-medium`, row `h-12`, hover `bg-accent/50`, numeric columns right-aligned `tabular-nums`, no zebra. Sorting via header buttons with `aria-sort`. Mobile: stacked cards.

**Order tracking**: vertical `Stepper` built from `Badge` + `Separator` (small app component): *Placed → Paid → Building → Shipped → Delivered*. Current = primary, done = success with check, upcoming = muted.

**Feedback**: `Sonner` toast for transient success; `Alert` inline for persistent info/warning/error; `Badge` for status (`success`, `warning`, `destructive`, `secondary`).

**Empty states**: centred, icon 24 in `bg-muted` circle, `h3` title, one-line reason, one primary action. E.g. *"Your cart is empty. Pick a layout to start building your keyboard." → [Start customizing]*.

**Loading**: `Skeleton` (`bg-muted`, 1.5s pulse, static under reduced motion) matching final layout; spinner only inside buttons; the keyboard preview shows a skeleton of the default layout.

**Error states**: What happened + why + fix. *"Payment didn't go through. Your bank declined the card. Try another card or UPI."* Actions: *Try again* / *Use a different method*. Never blame the user; never expose raw errors.

**Money & copy**: `₹12,499` (`Intl.NumberFormat('en-IN')`). Voice: plain, warm, specific. Say *repair*, *swap*, *part*, not jargon. CTA labels start with a verb.

### Reviews, discount codes, admin density
- **Star rating:** 5 Lucide `Star` icons, filled = `--primary`, empty = `--border`; always paired with the number ("4.7 · 128 reviews"). Input version is a keyboard-operable `RadioGroup` of stars. "Verified buyer" = `Badge secondary` with a check icon.
- **Discount code:** `Input` + `Button outline` ("Apply"). Applied = `Badge success` with remove button and a green discount line in the summary. Errors use `small destructive` with an icon: invalid, expired, minimum not met, already used.
- **Admin density:** same tokens, table rows `h-10`, `text-sm`, `Sidebar` 16rem (collapsible to icons), no decorative imagery, destructive actions always confirm via `AlertDialog`. Status always shown as `Badge` + text.
- **Claims:** status `Badge` + text: Submitted (secondary), Needs more info (warning), Approved / Return address sent (info), Replacement shipped / Return received / Refunded (success), Rejected (destructive). Warranty line on orders: success Badge when active, muted text when none or expired.
- **Wireless-first:** the default controller option carries a `Recommended` badge; Battery is shown by default and hidden only when a wired controller is chosen.

### 2D keyboard preview (decided: no 3D)
Build one app component, `KeyboardPreview`, as an **inline layered SVG**.
- **Layers:** one `<g data-part="case|plate|keys|legends">` per visible part, drawn in a flat top-down view. Keys are generated from a **layout JSON** (rows, key widths in units), so each layout (60/65/75/TKL) is data, not a new drawing.
- **v1 layouts:** 65%, 75% and 100% (full-size with numpad). Each has its own `viewBox`; the preview always scales to fit its container width (never scrolls sideways), so 100% is the widest and smallest-keyed on mobile. Don't try to label keys below 12px, hide legends instead.
- **Customising:** option state sets CSS variables on the SVG root (`--part-case`, `--part-keys`, `--part-legend`), so a colourway change recolours instantly in both themes without re-rendering geometry. Colour changes fade ≤150ms (none under reduced motion).
- **Selection:** the part being edited gets a `--ring` outline and a text label.
- **Views (shadcn `Tabs`):** *Top* · *Back* (controller, battery) · *Parts* (static exploded diagram).
- **Raster only for thumbnails/OG images**, generated from the same SVG.
- Keep each layout SVG under ~60 KB; no extra libraries needed.
- Always show: "Preview is illustrative. Final product may vary slightly."

---

## 8. shadcn/ui rules

1. **Use shadcn first.** Install via CLI into `src/components/ui/`. No other component library (no MUI, Chakra, Mantine, Ant, Headless UI, etc.).
2. **Don't fork primitives for style.** Change look via **theme tokens** (§2) and `className`, not by editing `ui/*.tsx`. Allowed edits to `ui/*`: adding a `variant`/`size` through `cva`, or adding `success`/`warning` Badge/Alert variants.
3. **Compose, don't duplicate.** New components live in `src/components/app/` (`ProductCard`, `OptionCard`, `ColorSwatch`, `OrderStepper`, `PriceTag`, `KeyboardPreview`) and must be built from shadcn parts. If shadcn has it, use it (e.g. no custom modal, tooltip, select, tabs).
4. **No hardcoded colours, px, or fonts** in components; tokens and the spacing scale only. Arbitrary Tailwind values need a comment explaining why.
5. **Variants through `cva`**; merge classes with `cn()`.
6. **Keep Radix accessibility intact**: don't strip `aria-*`, focus handling, or `asChild` semantics.
7. **States are mandatory**: default, hover, focus-visible, active, disabled, loading, error for every interactive custom component.
8. Component file = one component; props typed; no inline styles.
9. Rivermark.ai output: use only elements mapping to shadcn components in §7; if a generated element has no shadcn equivalent, the agent substitutes the closest one and notes it.

**Setup from scratch (Vite + React + TS):**
1. `npm i tailwindcss @tailwindcss/vite`; add the plugin in `vite.config.ts`; `@import "tailwindcss";` in `src/index.css`.
2. Add the `@/*` path alias in `tsconfig.json` and `vite.config.ts`.
3. `npx shadcn@latest init`, choose `new-york` style, base colour `neutral`, CSS variables **on**.
4. **Replace** the generated `:root` / `.dark` variables with the block below, and set the fonts.
5. Add components on demand: `npx shadcn@latest add button input label form card dialog alert-dialog sheet drawer dropdown-menu navigation-menu table badge alert skeleton sonner accordion toggle-group radio-group select checkbox switch separator avatar tooltip`.

### Token block (`src/index.css`)
```css
:root {
  --radius: 0.75rem;
  --background: #FAF8FD; --foreground: #2A2233;
  --card: #FFFFFF; --card-foreground: #2A2233;
  --popover: #FFFFFF; --popover-foreground: #2A2233;
  --primary: #6B4FBB; --primary-foreground: #FFFFFF;
  --secondary: #EFE9FA; --secondary-foreground: #3F2F73;
  --muted: #F1EDF8; --muted-foreground: #675E75;
  --accent: #EDE6F9; --accent-foreground: #3F2F73;
  --border: #E4DDF0; --input: #D6CCE6; --ring: #8466D1;
  --destructive: #B3263E; --success: #2F7D5B; --warning: #8A5A00; --info: #3A62B8;
  --sakura: #F4C9DA;
  --font-display: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-body: "Manrope", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
.dark {
  --background: #17131F; --foreground: #F1ECF8;
  --card: #1F1A2A; --popover: #1F1A2A;
  --primary: #A58BF0; --primary-foreground: #17131F;
  --secondary: #2B2340; --secondary-foreground: #E4DBFA;
  --muted: #272033; --muted-foreground: #B3A9C4;
  --accent: #322A47; --accent-foreground: #E4DBFA;
  --border: #332B45; --input: #4A3F63; --ring: #A58BF0;
  --destructive: #F27A8D; --success: #6CCB9D; --warning: #E8B04A; --info: #8FB0F0;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```

---

## 9. Brand direction (concept, needs your sign-off)

**Idea:** a third-person, slightly-above **isometric view of one hot-swap socket and one switch floating in empty space**, as an *exploded* pair (switch hovering just above its socket). That image *is* the brand promise: parts you can pull apart and replace.

- **Logo mark:** flat vector, low three-quarter view (matches the reference photo of a keycap on a switch on a 3D-printed socket). Three **separate floating parts** stacked with small gaps: tapered keycap on top, switch in the middle, low socket base at the bottom (two small holes on its top face, no pin "legs"). Each part uses three flat violet tones (light top, mid front, dark side). Must work as a one-colour silhouette and at 16–32px (favicon). **Interim files:** `brand/logo-mark.svg` (full colour, for light backgrounds) and `brand/logo-mark-mono.svg` (single colour via `currentColor`, tints of one hue). On dark backgrounds use the mono file in `--foreground`, or a designer-made dark variant.
- **Wordmark:** "{Brand}" in Plus Jakarta Sans 700, sentence case, `-0.01em`, in `--foreground`. Lock-up: mark left, wordmark right, gap = mark width ÷ 3, clear space = mark height ÷ 2.
- **Hero / empty-state illustration:** flat vector (no 3D render), the exploded switch + socket on a soft lavender backdrop with a faint contact shadow. This illustration may use a gentle lavender → white gradient; UI chrome may not.
- **Motif:** exploded-view diagrams for the repair/parts pages; thin 1px leader lines in `--border`, labels in `caption` + mono part numbers.
- **Name:** *to be decided* ("Revara" is already registered). The docs use the placeholder `{Brand}`; do one find-and-replace once the name is chosen. Run a trademark search (IP India, WIPO Global Brand Database, and any other market) **before** buying the domain.

---

## 10. Colourways (product data, not theme)
A **colourway** is a named colour (and finish) a customer can pick for a part, e.g. "Lilac" case or "Graphite" keycaps. These are **product data**, stored in Supabase (`colourways`: `id`, `name`, `hex`, `finish`, `applies_to`), not design tokens. Placeholders until the real list exists:

| Name | Hex | Finish |
|---|---|---|
| Lilac | `#B9A6E8` | Matte |
| Sakura | `#F4C9DA` | Matte |
| Graphite | `#3B3744` | Matte |
| Ivory | `#F3EEE3` | Matte |

Rules: each needs a **text name**, and every swatch is shown only via `ColorSwatch` with a ring + check when selected.

---

## 11. Decisions log & open questions
**Confirmed:** v1 layouts 65% / 75% / 100% · flat three-part floating stack (keycap, switch, socket) as logo direction · first colourways (Lilac, Sakura, Graphite, Ivory; more later) · `lucide-react` · **2D preview instead of 3D** · interim AI-generated logo, hire a designer later.

**Name:** "Revara" is taken. Placeholder `{Brand}` until chosen (also update `README.md`, `WebApp/README.md`, `index.html`, package name, and the "3D viewing" line in `WebApp/README.md` Features, which should now read "Live 2D preview of your customised keyboard").

**Preview art plan:**
1. **v1 needs no illustration.** Generate keys and case from layout JSON in code.
2. **Part layers** (optional upgrade): SVG with consistent `viewBox`, one `<g data-part>` per part, flat fills using CSS variables, no raster, no baked shadows, strokes ≥1px with `vector-effect: non-scaling-stroke`.
3. **Hero art:** flat vector exploded switch + socket.

**Still open:** brand name + trademark/domain check · final logo and hero artwork.
