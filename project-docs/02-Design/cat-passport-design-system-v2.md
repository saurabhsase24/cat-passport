# Cat Passport — Design System V2 (Sunlit Sand)

**Status:** Approved — ready for implementation
**Supersedes:** `cat-passport-design-system-v1.md` (token layer only; V1 remains the reference for mascot, iconography, photography, notifications and roadmap)
**Derived from:** `design-brief-sunlit-sand.md` — the canonical Sunlit Sand visual/UX brief
**Scope:** Token system, typography, shape and elevation language, shared component rules, and the accessibility rationale behind each value.

This document records *approved decisions and their measured justification*. Where a value differs from the brief, the brief section is cited and the reason is stated. This document does not authorize routing, data-flow, database, authentication, package, Mapbox, or Passport feature work.

---

## 1. Relationship to the Sunlit Sand brief

The brief is canonical for direction. This document is canonical for **values**.

Three tokens differ from the brief's literal hex list. Each change was driven by brief §24 (*"Visual warmth must not compromise usability"*) and brief §2's own instruction that orange and sage must never carry status alone. Nothing was changed for stylistic preference, and no colour from the brief was discarded — one was reassigned to the role it actually suits.

| Brief value | Disposition | Reason |
|---|---|---|
| `--color-text-secondary: #8A7C68` | **Amended** to `#736550` | 3.81:1 on cream / 3.41:1 on surface — fails the 4.5:1 body-text threshold |
| `#8A7C68` | **Reassigned** to `--color-border-strong` | 3.81:1 clears the 3:1 non-text threshold; the value is correct for control boundaries, not for text |
| — | **Added** `--color-text-on-primary: #3A3227` | Brief's `text-primary` gives only 3.88:1 on orange; button labels must clear 4.5:1 |
| — | **Added** `--color-primary-orange-strong: #C96A1C` | `#E8873A` is 2.47:1 on cream and cannot be the sole signal for text-free indicators |

Everything else in brief §2 and §3 is adopted verbatim.

---

## 2. Final Sunlit Sand token set

The complete approved `@theme` block for [`app/globals.css`](../../app/globals.css).

```css
/* Sunlit Sand — see project-docs/02-Design/design-brief-sunlit-sand.md §2
   Ratios verified against bg-cream and bg-surface; see §3 of this document. */
--color-bg-cream:              #fcf7ef;
--color-bg-surface:            #f3eada;  /* canonical shared surface token */
--color-border-soft:           #e3d6c0;  /* dividers, card hairlines — decorative */
--color-border-strong:         #8a7c68;  /* focusable control boundaries — 3.81:1 */

--color-text-primary:          #4a3f33;
--color-text-secondary:        #736550;  /* amended from brief #8A7C68 */
--color-text-on-primary:       #3a3227;  /* added */

--color-primary-orange:        #e8873a;  /* filled surfaces carrying a label */
--color-primary-orange-strong: #c96a1c;  /* added — text-free indicators */
--color-secondary-sage:        #9fbb98;
--color-accent-photo-1:        #f2a87f;
--color-accent-photo-2:        #c7cfc1;

/* Passport-only (brief §3) — declarations now, no consumers until the Passport sprint */
--passport-paper:      #f6efde;
--passport-border:     #e3d6c0;
--passport-cover:      #f2a87f;
--passport-stamp-red:  #c97b4e;
--passport-gold-line:  #d6b679;

--font-display: var(--font-nunito);
--font-body:    var(--font-nunito);

--text-md: 1.0625rem;            /* 17px — brief §4 */
--text-md--line-height: 1.625rem;

--radius-sm: 8px;  --radius-md: 16px;  --radius-lg: 20px;  --radius-xl: 24px;

--shadow-soft:   0 1px 6px  rgba(74, 63, 51, 0.05);
--shadow-raised: 0 3px 12px rgba(74, 63, 51, 0.08);
```

**Net change:** three tokens added, one retired, one amended, one reassigned.

**Retired:** `--color-accent-sky: #7FC7D9`. Declared in V1, zero usages in the codebase (verified). It is the "saturated blue/teal" that brief §1 explicitly rejects.

**Replaced:** the V1 Passport tokens `--color-passport-green` / `--color-passport-gold` / `--color-passport-brown` / `--color-passport-paper`. All were declared with zero usages. Retiring them now also clears the gold-on-cream contrast risk flagged as a sign-off blocker in V1 §18.4.

---

## 3. Measured contrast matrix

All values are WCAG 2.1 relative-contrast ratios computed against the two page grounds. Thresholds: **4.5:1** for normal text (1.4.3), **3:1** for non-text UI components and state indicators (1.4.11).

### 3.1 Approved set — all thresholds met

| Result | Ratio | Required | Token | Applied to |
|---|---|---|---|---|
| PASS | 9.60 | 4.5 | `text-primary` `#4A3F33` | body / heading on cream |
| PASS | 8.58 | 4.5 | `text-primary` `#4A3F33` | body on surface |
| PASS | 5.31 | 4.5 | `text-secondary` `#736550` | metadata on cream |
| PASS | 4.75 | 4.5 | `text-secondary` `#736550` | metadata on surface |
| PASS | 4.78 | 4.5 | `text-on-primary` `#3A3227` | primary button label on orange |
| PASS | 6.03 | 4.5 | `text-on-primary` `#3A3227` | label on sage fill |
| PASS | 9.60 | 3.0 | focus ring `#4A3F33` | focus indicator on cream |
| PASS | 3.54 | 3.0 | `orange-strong` `#C96A1C` | indicator on cream |
| PASS | 3.16 | 3.0 | `orange-strong` `#C96A1C` | indicator on surface |
| PASS | 3.81 | 3.0 | `border-strong` `#8A7C68` | input / control boundary on cream |
| PASS | 3.41 | 3.0 | `border-strong` `#8A7C68` | control boundary on surface |

### 3.2 Decorative values — no threshold applies

| Ratio | Pair | Note |
|---|---|---|
| 1.34 | `border-soft` on cream | Divider only — never the sole boundary of a control |
| 1.20 | `border-soft` on surface | As above |
| 1.12 | surface vs cream | A real but faint tint — this is why the hairline border is mandatory, not optional |
| 2.47 | orange fill on cream | Compliant only because a 4.78:1 label identifies the control |
| 1.96 | sage fill on cream | Never a sole status carrier (brief §24) |

### 3.3 Rejected candidates — recorded so they are not retried

| Candidate | Measured | Why rejected |
|---|---|---|
| `text-secondary` `#8A7C68` (brief value) | 3.81 / 3.41 | Fails 4.5:1 body text on both grounds |
| `text-secondary` `#786A55` | 4.93 / 4.41 | Passes on cream, fails on surface — a placement-dependent rule the system should not carry |
| White label on orange | 2.64 | Fails badly; dark warm ink is the only viable direction |
| Darkening orange for dark ink (`#D9762A`) | 3.21 | Moves the wrong way — darkening the fill *reduces* contrast with dark ink |
| `border-strong` `#9C8768` | 3.24 / 2.89 | Marginally fails 3:1 on surface |

### 3.4 Regression note against V1

The Sunlit Sand palette is lighter than V1 across the board. Recorded for context: V1 `text-primary #2E2A24` measured 12.95 on cream, `text-secondary #6B6355` measured 5.39, and the V1 button label measured 5.40. The approved V2 set is warmer and lower-contrast by design but stays above every threshold. **Any future darkening or lightening of a ground colour invalidates this matrix and requires re-measurement.**

---

## 4. The two-orange rule

`#E8873A` cannot legally carry state where no text identifies the element. Rather than change the brand orange, V2 defines two roles within one hue family.

| Token | Use for | Rationale |
|---|---|---|
| `--color-primary-orange` `#E8873A` | Filled surfaces **with a text label on them** — primary Button, selected Chip | The 4.78:1 label identifies the control, so the fill itself carries no threshold |
| `--color-primary-orange-strong` `#C96A1C` | Small or thin marks with **no text** — active-nav indicator, selection borders, the future nearest-cat map-pin ring | The mark is the sole visual signal and must clear 3:1 |

The two values sit in the same hue family and read as one orange in use, not two.

**Governing rule (brief §2 and §24):** orange remains reserved for primary CTA, active navigation, important map actions, selected/high-priority states, and the future nearest-cat pulse. It must not dominate large areas, and neither orange nor sage may be the *only* indicator of an important state — a weight, shape, text, or ARIA signal must always accompany it.

---

## 5. `border-soft` vs `border-strong`

Two border tokens with a strict, testable split.

| Token | Value | Ratio vs cream | Use |
|---|---|---|---|
| `--color-border-soft` | `#E3D6C0` | 1.34 | Dividers between list rows, card hairlines, section separators, decorative outlines |
| `--color-border-strong` | `#8A7C68` | 3.81 | Any boundary that defines a **focusable or interactive** control — text inputs, textareas, selectable cards |

**The test:** *can the user focus it, type in it, or select it?* If yes, its boundary is `border-strong`. If it only separates static content, it is `border-soft`.

`border-soft` at 1.34:1 is intentional and correct for its role — brief §6 asks separation to come from surface colour, spacing and borders rather than shadow, and a hairline is exactly that. It simply cannot be the only thing defining a control.

**Dark borders remain prohibited** (brief §2). Neither token approaches a near-black outline.

---

## 6. Typography decision

**Family: Nunito**, loaded via `next/font/google`, applied to both `--font-display` and `--font-body`.

- **Chosen over Quicksand** because Quicksand's geometric single-storey `a` and `g` degrade at 14px metadata sizes in outdoor light — a condition brief §23 names as a first-order evaluation criterion.
- **Replaces Geist**, a neutral grotesque that reads in the "corporate" register brief §1 rejects. The existing `--font-display` / `--font-body` aliases were already marked temporary in the V1 CSS.
- **Geist Mono is dropped** — zero usages.
- **No package change.** `next/font/google` ships inside `next` and self-hosts at build time; no dependency is added and no runtime network request is made.

**One family only** across the application, per brief §4. Hierarchy comes from weight and size, never from mixing sans families.

**Base body size raised to 17px** (`--text-md: 1.0625rem`), the top of the brief's 16–17px range, for outdoor readability (brief §4, §23). Metadata stays at 14px and must not be reduced further to manufacture hierarchy.

**Lora is deferred** to the Passport sprint. The serif shift is defined in brief §4 as Passport-only and has no consumer until Passport screens exist.

---

## 7. Spacing, radius and shadow

### Spacing
The existing 8-point scale is unchanged and already matches brief §5: `4 / 8 / 16 / 24 / 40 / 64`. Brief §5's caution applies — on map-first and task-oriented screens, functional content takes priority over decorative breathing room. The homepage must not gain vertical whitespace in this work.

### Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 8px | Small controls |
| `--radius-md` | 16px | Standard cards (brief §6) |
| `--radius-lg` | 20px | Map and major visual panels (brief §6: 20–24px) |
| `--radius-xl` | 24px | **Added** — upper bound for major panels |
| pill | `rounded-full` | Buttons and chips — fully rounded (brief §6) |

The scale is **monotonic by size** (8 → 16 → 20 → 24). `--radius-lg` moves from 24px to 20px and `--radius-xl` is added at 24px, so that `lg`/`xl` bracket the brief's 20–24px panel band — a step the scale previously lacked, since it jumped straight from 16px to 24px.

The `--radius-lg` value change is safe: at the time of the change the only consumer of `rounded-lg` was `HeroIllustration.tsx`, which is dead code rendered nowhere (see §10). No live surface shifted.

### Shadow
Both shadows are softened and retinted from the V2 ink (`74, 63, 51`) rather than V1's cooler `46, 42, 36`:

```css
--shadow-soft:   0 1px 6px  rgba(74, 63, 51, 0.05);
--shadow-raised: 0 3px 12px rgba(74, 63, 51, 0.08);
```

Brief §6 caps shadow prominence: separation comes primarily from surface colour, spacing and borders. Shadows become the exception for genuinely floating elements, not the default card treatment.

### Surface polarity inversion — the largest single change

V1 `bg-surface` was `#FFFBF4`, **brighter** than the page; cards lifted by being lighter plus a shadow. V2 `bg-surface` is `#F3EADA`, **darker and warmer** than cream; cards separate by recessing into a warm tint plus a `border-soft` hairline, with shadow reduced to `none` by default.

The token name is preserved as the canonical shared surface token, but its *meaning* inverts. Every `Card` consumer requires a visual re-check, not just a value swap. Because surface-vs-cream measures only 1.12:1, the hairline border must land in the same change as the value swap — never afterwards.

---

## 8. Component rules

### 8.1 Card
- Gains `border border-border-soft`.
- `shadow` prop gains a `"none"` option, which becomes the **default**; `soft` / `raised` are retained for genuinely floating elements.
- The V1 intent comment describing surface as "a tint brighter than the page" is now false and must be rewritten.

### 8.2 Button
- Primary: `--color-primary-orange` fill with `--color-text-on-primary` label (4.78:1).
- Secondary: sage-outlined, `text-primary` label.
- Focus ring stays on `text-primary` (9.60:1). Pill shape unchanged.

### 8.3 BottomNavigation — revised active-state rule

**The initially proposed "active tab turns orange" was withdrawn.** Orange text on cream measures 2.47:1 and fails the text threshold outright. Tab icons are emoji glyphs (`🏠 🧭 ➕ 📘 👤`) and cannot be tinted at all without an SVG icon system, which is out of scope.

**Approved rule:**
- Active label stays `text-primary` + semibold (9.60:1).
- Orange enters as a **2px `orange-strong` pill indicator** beneath the active tab (3.54:1).
- `aria-current="page"` is retained as the non-visual signal.

This satisfies brief §2's sanctioned "active navigation" orange use, meets 3:1, keeps weight as a non-colour indicator per brief §24, and adds no structural change. Border moves from `secondary-sage/15` to `border-soft`. Nav label `"Add Cat"` → `"Add"` per brief §10.

**Not in scope:** the elevated circular Add button. Brief §10 marks it explicitly as future visual specification, *"not an instruction to restructure navigation during unrelated implementation work."* Navigation stays flat and visually light.

### 8.4 SpotCatFlow — selection and input borders

Two token-level corrections, no behavioural or structural change:

| Element | Current | V2 | Reason |
|---|---|---|---|
| Selected match card | `peer-checked:border-primary-orange` (2.21:1 on surface) | `border-primary-orange-strong` (3.16:1) | Border is the sole selection signal for sighted users; the radio's ARIA state already covers assistive tech |
| Nickname input, note textarea | `border-secondary-sage/40` | `border-border-strong` | A text field boundary is a focusable control boundary and needs the 3:1 token; sage also implies a status meaning it does not have |

### 8.5 Chip
Resting state takes the new sage value; selected state takes `text-on-primary` on the orange fill. `aria-pressed` is retained. No structural change.

### 8.6 StepProgress — verified compliant, no change
Audited against the two-orange rule and found already compliant: the dots are `aria-hidden`, a visible text label names the current stage, and an `aria-live` region announces the ordinal. **Colour is not the sole signal.** It takes the new token values and nothing else.

### 8.7 Avatar, Hero, PageHeader, Section, Container, SafeArea
Token flow-through only. No edits required — these inherit correctly.

---

## 9. Immediate implementation scope

Three grouped stages. Tokens must land first; everything downstream depends on them.

### Stage 1 — Tokens + typography foundation
- [`app/globals.css`](../../app/globals.css) — full `@theme` block per §2
- [`app/layout.tsx`](../../app/layout.tsx) — Nunito via `next/font/google`, drop Geist + Geist Mono; also correct the stale `"Create Next App"` metadata title and description

### Stage 2 — Shared UI + navigation components
- [`components/ui/Card.tsx`](../../components/ui/Card.tsx) — border, `shadow="none"` default, rewrite stale comment
- [`components/ui/Button.tsx`](../../components/ui/Button.tsx) — `text-on-primary`
- [`components/ui/Chip.tsx`](../../components/ui/Chip.tsx) — `text-on-primary` on selected
- [`components/ui/Avatar.tsx`](../../components/ui/Avatar.tsx) — sage flow-through
- [`components/navigation/BottomNavigation.tsx`](../../components/navigation/BottomNavigation.tsx) — active indicator per §8.3, `border-soft`, `"Add Cat"` → `"Add"`

### Stage 3 — Homepage + Spot flow visual alignment
- [`components/home/MapPreview.tsx`](../../components/home/MapPreview.tsx) — `--radius-lg` (20px), dashed sage → solid `border-soft`, `"Spot a cat"` → `"Spot a Cat"`. **Map height untouched.**
- [`components/home/NearbyCatsPreview.tsx`](../../components/home/NearbyCatsPreview.tsx) — heavy raised cards → light divided vertical feed; small circular photo, name, and one contextual line; heading → `"Recent Sightings"`
- [`components/spot/SpotCatFlow.tsx`](../../components/spot/SpotCatFlow.tsx) — selection and input borders per §8.4, Card flow-through
- [`components/spot/StepProgress.tsx`](../../components/spot/StepProgress.tsx) — token values only

### Preserved without modification
- Map-first homepage hierarchy and current responsive map dominance (brief §7, §25)
- `--color-bg-surface` as the canonical shared surface token
- "Spot a Cat" as entry-point wording; "Check In" reserved for the eventual sighting-submission action (brief §19)
- Sprint 5A Supabase and backend infrastructure — frozen
- All routing, data flow, authentication, and `package.json`

---

## 10. Deferred — documented, not built

Per brief §26, implemented with the relevant feature sprint and not prematurely mocked into unrelated screens:

- Warm Mapbox basemap and any map integration
- Photo map markers; nearest-unvisited-cat pulse (`orange-strong` is reserved for it)
- Known Territory overlays (translucent sage, brief §12)
- Map cat preview bottom sheet (brief §13)
- Full Passport visual treatment — cover photo, Visited and territory stamps, paper character, identity block, Stories serif presentation
- Lora / serif typography
- Elevated circular Add navigation button
- The `"3 cats seen nearby today"` map overlay — requires real counts; a hardcoded number would be a fabricated statistic
- Relative-time strings and empty-state copy (`"Quiet out there right now."`, `"Looks like nobody's been spotted here yet."`) — require real data before they can be truthful
- SVG icon system to replace emoji nav glyphs

**Not restored:** the removed QuickActions section (brief §25).

**Gamification:** V1 remains non-gamified as already documented. This document makes **no decision** about permanent removal from the wider roadmap — that is a separate product decision, per brief §21.

### Open item carried forward
[`components/home/HeroIllustration.tsx`](../../components/home/HeroIllustration.tsx) is dead code — rendered nowhere, and `Hero.tsx` records it as "pending redesign." It is deliberately left untouched. Deleting it is a product call about whether the mascot direction survives, not a visual-token change.

---

## 11. Accessibility rationale

Brief §24 states that visual warmth must not compromise usability, and brief §2 forbids orange or sage from carrying critical status alone. The Sunlit Sand palette is meaningfully lighter than V1, so every token pairing was measured rather than assumed. Three of the brief's literal pairings fell below threshold; all three were resolved without abandoning the direction.

Principles this system holds to:

1. **Measured, not assumed.** §3 is the record. Any change to a ground colour invalidates it and requires re-measurement before merge.
2. **Colour is never the only signal.** Active navigation pairs orange with font weight and `aria-current`. Selection pairs a border with a native radio state. Step progress pairs colour with a visible text label and an `aria-live` region.
3. **Roles, not shades.** Where one value could not serve two jobs, the system added a role (`text-on-primary`, `orange-strong`, `border-strong`) rather than compromise a threshold or invent a new hue.
4. **Nothing is discarded arbitrarily.** The brief's `#8A7C68` failed as body text and was reassigned to the boundary role it measures correctly for.
5. **Warmth is preserved.** Every corrected value stays inside the Sunlit Sand family. No correction introduces black, white, or a cool hue.
6. **Existing commitments stand:** 44×44px minimum tap targets, keyboard focus states, semantic HTML, screen-reader labels, logical heading hierarchy, and reduced-motion support.

---

*Approved. Values in §2 and thresholds in §3 are binding for implementation. Deviations require re-measurement and an update to this document.*
