# ADR-001: Pages and information architecture for v1

**Status:** Accepted (revision 3)
**Date:** 2026-10-18
**Deciders:** Product owner
**Brand:** Triare
**Related:** `DESIGN.md` (visual system), `RIVERMARK-PROMPTS.md` (per-page prompts), `WebApp/README.md`

### Revision 2 changes
- **Admin UI added to v1** (9 routes, §7).
- **Wireless-first:** firmware is **ZMK**; the default controller is wireless (BLE), so Battery is part of the default build. New `/firmware` page.
- **Reviews and discount codes added to v1.**
- **Invoices:** GST invoices are emailed manually, so no invoice download in the app.
- **Shipping:** flat rate, India only, INR only.
- Policy pages are confirmed as work to create (§8).

### Revision 3 changes
- **Returns:** no returns or exchanges on builds; refunds only for approved claims where the product is returned **at the buyer's expense**; **free replacement parts** when proof is genuine.
- **Warranty:** 1 year on products that the admin marks (a `warranty_months` field per product/part in Catalog).
- **Claims system added:** customer form `/support/claim` with proof upload, admin `/admin/claims`, claim statuses and a return-address flow. New `/policies/warranty`.
- **Checkout acknowledgement:** required checkbox that builds can't be returned.
- **Firmware tooling:** documented in §6.5 (ZMK Studio, GitHub config, default keymap) with a recommended support level.
- **Policy templates** written: `POLICY-TEMPLATES.md`. Grievance officer details must be shown on the site.

---

## 1. Context

A web app where people **configure a repairable, wireless-first keyboard, buy it, and track the order**; a small team **runs the shop from an admin area**.

| Area | Decision |
|---|---|
| Stack | React + Vite + TypeScript, Tailwind v4, shadcn/ui, Supabase, Vercel |
| Layouts (v1) | 65%, 75%, 100% |
| Customizable parts | Layout, case, hot-swap sockets, switches (choose or bring your own), keycaps, matrix PCB, controller, battery, colourways |
| Firmware | ZMK, so wireless (BLE) is the main use; wired USB stays an option |
| Auth | Supabase (Google + email); **no guest checkout** |
| Payments | Razorpay, INR, India only |
| Shipping | Flat rate (configurable in admin) |
| Preview | 2D layered SVG |
| Returns | No returns/exchanges of builds; refund only after return at buyer's cost; free replacement parts on genuine proof |
| Warranty | 1 year on admin-selected products |
| Hardware | Custom matrix PCB (a ZMK *shield*) + nice!nano-style controller (a ZMK *board*) |
| Theme | Light and dark in v1 |

---

## 2. Decision

Ship **37 routes**: 27 customer-facing and 10 admin, built around **one configurator page** that doubles as the product page.

1. **Browse:** Home, Keyboards, Repairability, Firmware.
2. **Build and buy:** Configurator, Cart, Checkout.
3. **Account:** Auth, Orders, Order detail (tracking, reviews), Saved designs, Profile and addresses.
4. **Trust:** About, Support, claim form (warranty, replacement parts, refunds), five policies (shipping, returns, warranty, privacy, terms), 404/error.
5. **Admin:** Dashboard, Orders, Order detail, Build queue, Catalog, Discounts, Reviews, Claims, Customers, Settings.

Rules
- Presets open the configurator pre-loaded; there is no separate product page.
- Single-page configurator with an accordion beside a sticky 2D preview (not a wizard).
- Cart is a slide-over sheet plus a `/cart` page; **Buy now** skips the cart.
- Sign-in is required at checkout; a guest cart lives locally and merges on sign-in.
- **One discount code per order**, validated on the server.
- **Reviews are for verified buyers**, written after delivery, per layout (65 / 75 / 100).
- Admin is role-gated and uses the same design tokens at a denser setting.
- Parts store and repair guides are v2.

---

## 3. Site map

```
CUSTOMER
/                          Home
/keyboards                 Keyboards (presets)
/customize                 Configurator (layout picker if none chosen)
/customize/:layout         e.g. /customize/75
/customize/preset/:slug    Pre-loaded with a preset
/customize/design/:id      Loaded from a saved design
/repairability             Repairability
/firmware                  ZMK, pairing and keymaps
/cart                      Cart (also a Sheet from the header)
/checkout                  Checkout (auth)
/orders                    My orders (auth)
/orders/:id                Order detail + tracking + write review (auth)
/account                   Profile, addresses, security (auth)
/account/designs           Saved designs (auth)
/auth  /auth/forgot  /auth/reset  /auth/callback
/about  /support  /support/claim   (claim form, auth)
/policies/shipping  /policies/returns  /policies/warranty  /policies/privacy  /policies/terms
*                          404

ADMIN (role = admin)
/admin                     Dashboard
/admin/orders              Orders list
/admin/orders/:id          Order detail
/admin/build-queue         Build queue (board)
/admin/catalog             Parts, colourways, presets, layouts (tabs)
/admin/discounts           Discount codes
/admin/reviews             Review moderation
/admin/claims              Warranty, replacement-part and refund claims
/admin/customers           Customers
/admin/settings            Shipping rate, build time, store info
```

**Global (customer):** header (wordmark; *Keyboards · Customize · Repairability · Firmware*; theme toggle; cart with count; account menu or *Sign in*), footer (Shop, Learn, Support, Policies, theme toggle), cart sheet, toasts, skip link.
**Global (admin):** shadcn `Sidebar` (collapsible), top bar with search, theme toggle, "View store" link, account menu.

---

## 4. Options considered

| Option | Fit | Complexity | Verdict |
|---|---|---|---|
| A. Catalog-first (product page per preset, then configure) | Weak; customization is the product | High (extra page type) | Rejected |
| **B. Configurator-first, presets as starting points** | Strong | Medium | **Chosen** |
| C. Multi-step wizard configurator | Medium; rigid, hard to revisit | Medium-High | Rejected |

Admin options: **(1)** Supabase Studio only (fast, error-prone, not usable by non-technical staff) vs **(2)** custom admin built from shadcn (more work, safer, auditable). **Chosen: (2)**, because discount codes, review moderation, status updates and tracking numbers should not need database access.

---

## 5. Trade-offs

- **B over A/C:** fewer pages, one source of truth for specs and price; cost is a dense configurator that must be excellent.
- **Wireless-first:** Battery and Controller become core steps, not afterthoughts; compatibility rules (battery fits case/layout) are the main logic risk.
- **Custom admin:** adds ~9 routes but removes manual database edits; keep it table-and-form simple, no analytics beyond the dashboard KPIs.
- **Manual GST emails:** zero build effort, but needs an admin reminder ("invoice not yet sent") so none are missed.
- **Reviews auto-publish for verified buyers:** low moderation load; admin can hide or reply. Switch to pre-approval if abuse appears.

---

## 6. Customer page specifications

Common: header + footer, light/dark, `Skeleton` loading, empty and error states per `DESIGN.md` §7.

### 6.1 Home `/`
Goal: understand in ten seconds, start customizing. CTAs: *Start customizing* / *Browse keyboards*.
Sections: hero (flat exploded keycap-switch-socket art) · How it works (3 steps) · Featured presets (65/75/100 with rating) · Repairability pillars (case, sockets, PCB, controller, battery) · "Wireless, open firmware" strip (ZMK, link to `/firmware`) · Reviews highlights (3 cards) · Why we exist (sourced WHO e-waste stat) · closing CTA.
shadcn: `Button`, `Card`, `Badge`, `Accordion`.

### 6.2 Keyboards `/keyboards`
Layout filter (`ToggleGroup`: All / 65% / 75% / 100%), preset grid (2D thumbnail, name, layout badge, rating, "from ₹X", *Customize*), final card *Start from scratch*. Empty filter and loading states.

### 6.3 Configurator `/customize…`
Goal: build a valid keyboard, see price, buy.
Layout: desktop sticky preview (7/12) + options (5/12); mobile preview on top, options in bottom sheet, pinned price bar.
Preview: `KeyboardPreview`, tabs *Top · Back · Parts*, note "Preview is illustrative. Final product may vary slightly."
Accordion order: **1 Layout · 2 Case · 3 Hot-swap sockets · 4 Switches (choose or bring your own) · 5 Keycaps (choose or bring your own) · 6 Controller (ZMK wireless default; ZMK wired option) · 7 Battery (required for wireless) · 8 PCB · 9 Review**.
Below the fold: spec table, **Reviews** for the chosen layout (rating summary, list, sort), FAQ.
Price summary (sticky): itemised, deltas, total ₹, estimated build time (from admin settings).
Actions: *Add to cart*, *Buy now*, *Save design* (sign-in prompt keeps design).
Rules: incompatible options disabled with a reason; choosing wired hides Battery (shows "Not needed for USB-only"); changing layout warns what resets.

### 6.4 Repairability `/repairability`
Statement, static exploded-parts diagram, part cards (what it is, how to swap, tools, difficulty badge), "Repair, don't replace" commitment, CTA. v2: buy replacement parts.

### 6.5 Firmware `/firmware`
Explains ZMK in plain language: why wireless-first, pairing steps (multiple devices), battery expectations, updating firmware, and **how to change what keys do**.
**Keymap paths (recommended support level)**
1. **Default keymap, always.** Every keyboard ships with a working default keymap per layout.
2. **ZMK Studio (recommended as the main route, if enabled in your firmware build).** Edit keys live in a browser or desktop app without reflashing; needs a Studio-enabled build, an unlock key in the keymap and physical-layout metadata for each layout.
3. **GitHub config template (advanced, "officially supported" only as a documented guide).** Fork a template repo, edit the `.keymap` text file, let GitHub Actions build a `.uf2`, flash it by double-tapping reset.
4. Community GUI editors: mention only as unsupported options.
Page content: pairing, battery, update/flash steps, the three paths above with who each is for, links to ZMK docs, FAQ, and how to reach support.

### 6.6 Cart `/cart` + Sheet
Line items (thumbnail, key choices, price, quantity, remove, *Edit in configurator*), **discount code field** (`Input` + *Apply*; applied code shown as `Badge` with remove), summary (subtotal, discount, flat shipping, total), *Checkout*, *Continue customizing*. Empty state included.

### 6.7 Checkout `/checkout` (auth)
Sections: Contact · Shipping address (saved or new, India-only validation: PIN code, state) · Delivery (flat rate shown) · Discount code · Review · Pay. Sticky summary. *Pay ₹X* opens Razorpay; confirmation comes from the server webhook.
States: processing, success (→ order detail with banner), failed (inline alert, retry), cancelled. Notice: "Your GST invoice will be emailed to you after your order is confirmed."

### 6.8 Auth `/auth` (+ forgot, reset, callback)
Tabs *Sign in / Create account*, Google button, email form, forgot link, policy links. States: wrong password, unverified email, account exists.

### 6.9 My orders `/orders`
Table (ID mono, date, items, status badge, total, *View*); stacked cards on mobile; empty state.

### 6.10 Order detail `/orders/:id`
Success banner (after purchase) · header with status · **tracking stepper** (*Placed → Paid → Building → Shipped → Delivered*, carrier and tracking link once shipped) · items with configuration · address · payment summary (incl. discount) · invoice note ("GST invoice emailed to you; contact support if it hasn't arrived") · *Write a review* after delivery (opens a `Dialog`: star rating, title, text) · *Need help?*. Other statuses: Payment failed, Cancelled, Return requested, Return received, Refunded. Each item shows its **warranty status** ("Warranty until 12 Oct 2027" or "No warranty on this item", from the admin warranty setting and delivery date) and a *Raise a claim* button linking to `/support/claim?order=…`. A line states: "Custom-built keyboards can't be returned or exchanged."

### 6.11 Saved designs `/account/designs`
Grid: preview, name, layout, price, last edited; Open, Rename, Duplicate, Delete, Add to cart. Empty state.

### 6.12 Account `/account`
Tabs *Profile · Addresses · Security*; address book; linked Google; delete-account request.

### 6.13 Static and utility
| Page | Content |
|---|---|
| About | Mission, e-waste problem (sourced stat), approach, links |
| Support | FAQ accordion (ordering, wireless/ZMK, repairs, shipping, warranty), contact form or email, phone if any |
| Shipping policy | India-only, flat rate, timelines, tracking |
| Returns, cancellation and refunds | No returns/exchanges of builds; cancellation cut-off; refund only after an approved claim with return at buyer's expense; free replacement parts on genuine proof |
| Warranty | 1 year on admin-selected products, what's covered/excluded, how to claim |
| Claim form `/support/claim` (auth) | Choose delivered order, claim type (replacement part or refund), description, proof upload (photos/video), warranty status shown, claim number on submit, list of my claims with status timeline and return-address block when a refund return is approved |
| Privacy | Data, processors (Supabase, Razorpay), rights |
| Terms | Terms of use |
| 404 / Error | Friendly recovery with links; never raw errors |

Policy pages share one prose template (`max-w-prose`, table of contents, "Last updated"). They must be written before launch (see §10).

---

## 7. Admin UI specification

**Access:** `profiles.role = 'admin'` (and optional `staff` with no access to Discounts, Settings, Customers); enforced by Supabase row-level security, not only by hiding links. Every status or setting change is written to an audit log (`order_events`, `audit_log`).
**Look:** same tokens as the store, denser: table rows `h-10`, `text-sm`, 16rem sidebar, no marketing imagery. Desktop-first; usable on tablet; read-only-friendly on mobile.

| Route | Purpose | Contents |
|---|---|---|
| `/admin` Dashboard | Daily overview | KPI cards (orders today, revenue 7/30 days, paid-awaiting-build, shipped this week, **invoices not yet emailed**, new reviews), orders-over-time chart, "needs attention" list (failed payments, orders waiting > X days, low-stock options) |
| `/admin/orders` | Find and manage orders | Data table: ID, date, customer, items, status, payment, total, **invoice sent?**; filters (status, date range, payment, invoice sent); search (ID, email); CSV export; row actions |
| `/admin/orders/:id` | Fulfil one order | Items with full configuration (a printable **build sheet**), customer and address, payment details (Razorpay payment ID, discount used), **status control** (Placed → Paid → Building → Shipped → Delivered; Cancel; Refunded), **carrier + tracking number**, **"GST invoice emailed" checkbox + date**, copy-order-details button for the invoice email, internal notes, event timeline. Refunds are issued in the Razorpay dashboard; admin records the outcome |
| `/admin/build-queue` | Work the build line | Board with columns *Paid · Building · Ready to ship · Shipped*; cards (ID, layout, due date); drag or menu to move; print build sheets |
| `/admin/catalog` | Control what customers can pick | Tabs: **Parts and options** (name, category, price delta, stock, **warranty months (0 = none)**, compatibility rules, active toggle), **Colourways** (name, hex, finish, applies to), **Presets** (name, layout, chosen options, featured toggle), **Layouts** (65/75/100: base price, active) |
| `/admin/discounts` | Manage codes | Table + create/edit `Sheet`: code, type (% or flat ₹), value, minimum subtotal, start/end, total uses limit, per-customer limit, active; usage count; one-click disable |
| `/admin/reviews` | Moderate | Table (rating, text, layout, buyer, date, status); Hide/Show; reply; filter by rating/status |
| `/admin/claims` | Handle claims | Table (claim no., order, customer, type, status, age with overdue warning); detail with customer message, **proof gallery**, order configuration, **warranty status** (in warranty / expired, days left); actions: request more info, approve replacement (choose part, enter courier + tracking, ships free), approve refund return (sends return address), mark return received, **record refund** (Razorpay refund ID, amount), reject (reason + note); timeline; internal notes. Target: reply within 2 business days |
| `/admin/customers` | Look up buyers | Table (name, email, orders, spent, joined); detail drawer with their orders. No deleting accounts from here in v1 |
| `/admin/settings` | Store-wide values | Flat shipping rate, estimated build time text, contact email/phone/hours, **returns address**, **grievance officer details**, policy last-updated dates, maintenance banner toggle |

shadcn for admin: `Sidebar`, `Table` with TanStack Table pattern, `Tabs`, `Sheet`, `Dialog`, `AlertDialog`, `Form`, `Select`, `Popover` + `Calendar`, `Badge`, `Chart`, `DropdownMenu`, `Command` (search), `Sonner`.

---

## 8. Access and navigation rules

| Page | Signed out | Signed in | Admin |
|---|---|---|---|
| Browse, configurator, cart, static pages | ✅ | ✅ | ✅ |
| Save design, checkout, orders, account | Redirect to `/auth?next=…` | ✅ (own data only) | ✅ |
| `/auth*` | ✅ | Redirect to `/account` | Redirect to `/admin` |
| `/admin*` | Redirect to `/auth` | 404 (not "forbidden", to avoid revealing it) | ✅ |

Journeys: customize and buy · direct buy · return and reorder from saved designs · track and review · admin: paid order → build → ship → email invoice → delivered.

---

## 9. Resolved decisions and remaining assumptions

| # | Decision |
|---|---|
| 1 | No guest checkout |
| 2 | India only, INR |
| 3 | Admin UI in v1 (§7) |
| 4 | Switches: choose or bring your own (keycaps follow the same pattern, **assumed**) |
| 5 | Wireless-first (ZMK); wired option remains |
| 6 | Reviews and discount codes in v1 |
| 7 | Saved designs need an account |
| 8 | GST invoices emailed manually; admin tracks "invoice sent" |
| 9 | Policy pages to be created before launch |
| 10 | Flat shipping rate, set in admin settings |
| 11 | No returns or exchanges of builds |
| 12 | Refund only if the product is returned at the buyer's expense to a specified address, after an approved claim |
| 13 | Free replacement parts when proof is genuine |
| 14 | 1-year warranty on products the admin selects |
| 15 | Policy text starts from `POLICY-TEMPLATES.md` and is lawyer-reviewed |

**Still assumed (confirm):** reviews auto-publish for verified buyers, text only (no photos) · one discount code per order, no stacking · reviews are per layout, not per preset · an order is one keyboard per line item (quantity > 1 allowed) · staff role may be added later.
**Open questions:** brand name · build lead time · exact refund-eligible reasons and claim window · who pays for returned faulty parts · which products carry the warranty (set in admin) · legal entity, GSTIN, return address and grievance officer details · lawyer review of policies.

---

## 10. Consequences

**Easier:** fewer page types; prompts per page can be derived from §6 and §7; the shop can be run without database access.
**Harder:** the configurator's compatibility and pricing logic; keeping admin and store data rules in sync; manual invoice emailing at volume.
**Revisit:** automate GST invoices; guest checkout; parts store and repair guides; review photos; international shipping.

**Indicative data model:** `profiles(role)`, `addresses`, `layouts`, `parts`, `part_options`, `compatibility_rules`, `colourways`, `presets`, `designs`, `carts`, `cart_items`, `orders`, `order_items`, `payments`, `order_events`, `discount_codes`, `discount_redemptions`, `reviews`, `settings`, `audit_log`, `claims`, `claim_events`, `claim_files` (and `warranty_months` on parts/presets).

---

## 11. Action items

1. [ ] Confirm the "still assumed" list in §9.
2. [ ] Paste `index.html` into Rivermark.ai, then run prompts from `RIVERMARK-PROMPTS.md` in order.
3. [ ] Define layout JSON and part/price data for 65/75/100, including battery and controller compatibility.
4. [ ] Decide the supported keymap path (see §6.5) and write the `/firmware` content; define a physical layout and shield for each of 65/75/100.
5. [ ] Choose the brand name and replace `{Brand}`.
6. [ ] Fill `POLICY-TEMPLATES.md` placeholders, get a lawyer review, publish five policy pages, the grievance officer details and the support FAQ.
7. [ ] Check Razorpay account requirements for live payments.
