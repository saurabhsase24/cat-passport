# Cat Passport
## Design Package — Version 1.0
### Single Source of Truth for Product & Frontend Development

---

## 1. Brand Identity

**Name:** Cat Passport

**One-line description:** An interactive way to discover, revisit, and document the community cats of the UAE.

**Brand personality:** Warm, friendly, curious, natural, premium, modern, playful, wholesome, optimistic.

**Never:** Corporate, cold, technical-sounding, competitive, cluttered.

**Positioning statement:** *Cat Passport is not a map, not a social network, and not an adoption platform. It is a discovery experience that turns community cats into local celebrities worth visiting.*

**Tagline candidates:**
- "Discover who's nearby."
- "Every cat has a story."
- "The world's smallest passports."

**Voice:** Speaks like a warm, observant friend telling you about someone interesting nearby — never like a system, a database, or a game host. Sentences are short, specific, and never twee for the sake of it (clarity beats cleverness, per the new product principle).

---

## 2. Design Philosophy

Three inherited pillars, now fused into one identity:

- **From Expedition:** Discovery is the core loop. The map is the centerpiece. Curiosity, not competition, drives return visits.
- **From the Passport concept:** Every cat's page is a keepsake — vintage, warm, tactile, worth opening slowly.
- **From Field Guide restraint:** Calm spacing, large photography, minimal text everywhere outside the Passport itself.

**Governing rule:** *Cats are the celebrities. Every other element — map, UI chrome, navigation, even the mascot — exists to support that fact.*

**Clarity over cleverness:** Wherever a creative label and a plain label compete (e.g., "Last Seen" vs. "Last Immigration Check"), the plain label wins unless the creative version is unambiguous at a glance.

---

## 3. Complete Information Architecture

```
Cat Passport
├── Onboarding (first-run only)
│   ├── Screen 1 — Welcome
│   ├── Screen 2 — Every cat deserves a Passport
│   └── Screen 3 — Let's find your first cat → Continue as Guest
│
├── Home
│   ├── Hero
│   ├── Map (centerpiece preview)
│   ├── Trending Cats
│   ├── Nearby Cats
│   └── Recent Sightings
│
├── Explore (full map)
│   ├── Filters (distance, recently seen, territory)
│   ├── Map canvas with Known Territories
│   └── Pin preview sheet → Passport
│
├── Passport (per-cat)
│   ├── Passport Cover
│   ├── Identity Page (number, nationality, home territory, last seen, issued date)
│   ├── Personality Chips
│   ├── Known Territory map
│   ├── Stories (community memories)
│   └── Check-In History
│
├── Add a Cat / Check In
│   ├── Camera capture
│   ├── Confirm location & territory
│   ├── Optional personality chip suggestion
│   └── Celebration + stamp moment
│
├── Saved
│   └── Bookmarked Passports
│
└── Explorer Profile ("Me")
    ├── Guest identity (avatar, display name)
    ├── My Check-Ins
    └── My Saved Passports
```

**Navigation model:** Flat, five-tab bottom navigation (Home, Explore, Add, Saved, Me). No nested hamburger menus. Every screen reachable in one or two taps from Home.

---

## 4. High-Fidelity Screen Descriptions

### 4.1 Home Screen
*(Full spec already ratified in v0.9 — summary retained here for completeness.)*
Header (logo + guest avatar) → Hero (headline + two CTAs: Find Nearby Cats / Add a Cat) → large Map centerpiece, visible without scrolling → Trending Cats (swipeable, photo-first) → Nearby Cats (photo, distance, Last Seen) → Recent Sightings (logbook-style feed) → bottom navigation.

### 4.2 Explore Map
Full-screen map, cream/sage muted tile styling (never a standard blue-heavy GIS look). **Known Territories** render as soft, translucent sage-green blobs rather than hard boundaries — implying "usually found around here," not a precise cage. Pins sit within territories; the single nearest-undiscovered-cat pin pulses gently, all others sit calm and static. A slim filter bar floats above the map (Nearby / Recently Seen / Trending) using pill toggles, not a full settings panel. Tapping a pin raises a bottom sheet preview (photo, name, distance, Last Seen) with a "View Passport" action — never a full navigation jump, to preserve map context.

### 4.3 Passport
This is the emotional peak screen and should feel distinctly different from the rest of the app:

- **Cover:** Vintage paper texture, dark green and gold detailing, the cat's name set in a slab-serif, a small embossed paw stamp
- **Identity Page:** Passport Number (`CAT-UAE-000428` format), Nationality ("United Arab Emirates"), Home Territory, Last Seen, Passport Issued — laid out like an actual passport bio page, generous margins, no more than 5 fields, never presented as a data table
- **Personality Chips:** small rounded pill chips with a single emoji + word each (Friendly, Food Lover, Night Owl, Afternoon Sleeper, Calm) — 3–5 max, never a long list
- **Known Territory:** a small inline map showing the soft territory blob, not the full explore map
- **Stories:** a short, warm feed of community-submitted memories, each attributed to a first-name-only contributor, styled like handwritten journal entries rather than comment threads
- **Check-In History:** a minimal timeline strip (dates only), tucked below Stories, deliberately the least visually prominent element on the page

### 4.4 Add a Cat / Check In
Opens directly to camera (no form-first screen). After capture: confirm/adjust pin location on a small embedded map, optional single-tap personality chip suggestion, optional one-line Story. Ends with a stamp animation and a short celebratory microcopy line ("Welcome to the Passport, [Cat Name].").

### 4.5 Explorer Profile ("Me")
Deliberately the calmest, least decorated screen in the app — guest avatar, display name (editable), a simple grid of "My Check-Ins," and a list of saved Passports. No stats, no levels, no leaderboard — consistent with "curiosity, not competition."

### 4.6 Onboarding
Three full-bleed screens, mascot present on all three:

1. **"Welcome to Cat Passport."** / "Discover UAE's community cats." — mascot mid-stride, as if walking into frame
2. **"Every cat deserves a Passport."** — mascot sits beside an illustrated passport book, small stamp animates on
3. **"Let's find your first cat."** — single button: **Continue as Guest**, mascot pointing toward a stylized map

No account creation, no permissions wall before value is shown — location permission is requested contextually, only when "Find Nearby Cats" is first tapped.

---

## 5. Complete Component Library

**Layout/Navigation**
`Header`, `BottomNavigation`, `TabIcon`, `SafeAreaContainer`

**Home**
`Hero`, `CTAButtonGroup`, `PrimaryButton`, `SecondaryButton`, `MapPreviewCard`, `SectionHeader`, `HorizontalCardScroller`, `TrendingCard`, `NearbyCard`, `SightingsFeed`, `SightingListItem`

**Explore**
`FullMapCanvas`, `TerritoryOverlay`, `PinMarker` (default / pulsing), `FilterPillBar`, `PinPreviewSheet`

**Passport**
`PassportCover`, `PassportIdentityCard`, `PersonalityChip`, `PersonalityChipRow`, `TerritoryMiniMap`, `StoryEntry`, `StoriesFeed`, `CheckInTimeline`, `StampGraphic`

**Add/Check-In**
`CameraCapture`, `LocationConfirmSheet`, `ChipSuggestionRow`, `StoryInputField`, `CelebrationOverlay`

**Profile**
`GuestAvatar`, `DisplayNameField`, `CheckInGrid`, `SavedPassportList`

**Shared/System**
`Mascot` (multiple poses), `EmptyState`, `LoadingPawTrail`, `Toast/Notification`, `Modal/BottomSheet`, `Badge` (used sparingly — new-sighting indicator only)

---

## 6. Complete Design Token System

### Colour
```
--color-bg-cream:        #FBF3E7   (base background)
--color-primary-orange:  #E8873A   (primary actions, pulse, CTA)
--color-secondary-sage:  #8FA888   (secondary structure, outlines, inactive states)
--color-accent-sky:      #7FC7D9   (discovery/new-signal accent only)
--color-text-primary:    #2E2A24
--color-text-secondary:  #6B6355

--passport-paper:        #F1E4C6
--passport-green:        #2F4A3C
--passport-gold:         #C6A15B
--passport-brown:        #6B4A34
```

### Typography
```
--font-display:  "Rounded Sans Bold"      /* Hero, section titles */
--font-body:     "Rounded Sans Regular"   /* body, UI */
--font-passport-heading: "Slab Serif"     /* Passport identity fields */
--font-passport-accent:  "Warm Script"    /* Stories, used sparingly */

--text-2xl: 28px   /* hero headline */
--text-xl:  22px   /* section titles */
--text-lg:  18px   /* card titles, body */
--text-md:  16px   /* standard body / UI */
--text-sm:  14px   /* meta text, timestamps */
```

### Spacing (8pt grid)
```
--space-xs: 4px   --space-sm: 8px    --space-md: 16px
--space-lg: 24px  --space-xl: 40px   --space-2xl: 64px
```

### Radius
```
--radius-sm: 8px   (chips, small buttons)
--radius-md: 16px  (cards)
--radius-lg: 24px  (map, hero panels)
--radius-full: 999px (pills, avatar)
```

### Elevation
```
--shadow-soft: 0 2px 12px rgba(46,42,36,0.06)   /* default card */
--shadow-raised: 0 6px 20px rgba(46,42,36,0.10) /* elevated Add button */
```

### Motion
```
--duration-fast: 120ms
--duration-standard: 200ms
--duration-celebration: 280ms
--easing-standard: cubic-bezier(0.22, 1, 0.36, 1)
```

---

## 7. Motion Design System

| Interaction | Duration | Behaviour |
|---|---|---|
| Button press | 120ms | 4–6% scale down, ease-out |
| Nearest-pin pulse | 2000ms loop | Ambient glow breathing, one pin at a time only |
| Card entrance on scroll | 200ms | 8px fade-up, plays once |
| Passport stamp | 280ms | Stamp drops with slight overshoot + soft haptic thud; the one moment allowed extra theatricality |
| Paw-print loader | 900ms loop | Three prints fade in sequentially, replacing generic spinners |
| Camera shutter | 150ms | Iris close/open flash on capture |
| Passport cover open | 320ms | Cover "lifts" like a real book page before content reveals |
| Mascot idle | 3000ms loop | Gentle tail-flick / blink, used in empty and loading states |

Rule: nothing bounces more than once, nothing loops faster than it takes a human eye to comfortably register (≥900ms for ambient loops).

---

## 8. Illustration Style Guide — Mascot

**Name (working):** Saffron *(orange-and-white community cat, inspired by typical UAE strays)*

**Look:** Simple, rounded, flat-illustration style with 2–3 tone shading max — never photorealistic, never a mascot competing with the real cat photography that is the product's true star. Big expressive eyes, short simple whiskers (3 max per side), no clothing or humanization props (keeps things wholesome and grounded, not costumed).

**Colour:** Orange and white coat, sage-green collar/bandana as the single brand-colour tie-in.

**Poses library (minimum set for V1):**
- Walking/mid-stride (onboarding, loading)
- Sitting attentively (empty states)
- Curled up sleeping (idle/loading, "quiet right now" states)
- Peeking from behind an object (tips, contextual hints)
- Stamping a passport with a paw (celebration moment)

**Where it appears:** Onboarding, empty states, loading states, first-run tips, notification icon avatar. **Where it must never appear:** Passport pages (Saffron is a guide character, not a resident — appearing inside another cat's Passport would undercut that cat's status as the star of their own page).

---

## 9. Icon System

Rounded single-weight stroke icons, consistent 2px stroke at base size, no mixed fill/outline styles. Core set: home, compass (Explore), plus (Add), bookmark (Saved), ID-card (Me/Passport), pin, paw (used as a motif in empty/loading states, not as a literal repeated nav icon), camera, location-pin-soft (territory), chip/tag (personality). No invented iconography — every icon must be recognizable without a label on first encounter.

---

## 10. Photography Guidelines

- Candid, natural light, eye-level with the cat wherever possible
- No filters that distort true coat colour (matters for identification/trust)
- Cat occupies 60–80% of frame; environment visible enough to feel like a real, findable place
- Never use or select photos showing clear stress signals (flattened ears, tucked body, bared teeth) as featured/trending imagery — ties directly to the "respect community cats" principle
- Passport cover photo should be the cat's single best, most "portrait-like" image; Stories and check-in history can use more candid/action shots

---

## 11. Accessibility Guidelines

- Minimum tap target: 44×44px, primary CTAs sized larger for one-thumb comfortable reach
- Text contrast: body text minimum 4.5:1 against cream/paper backgrounds; verify passport gold-on-paper combinations specifically, as gold-on-cream is a known low-contrast risk — needs manual contrast audit before shipping Passport screens
- Map pin state must never rely on colour/pulse alone — pair pulsing pin with a distinct shape or subtle icon so colour-blind users aren't dependent on animation alone
- Base body text size 16–17px minimum, scalable with system font-size settings
- All interactive elements reachable via screen reader with meaningful labels ("View Orange Loaf's Passport," not "Card 3")
- Motion: respect reduced-motion system settings — ambient pulse and mascot idle loops should downgrade to a static state, not simply play slower

---

## 12. Microcopy Guide

| Situation | Avoid | Use |
|---|---|---|
| Uploading a photo | "Upload" | "Check In" |
| Cat's profile | "Profile" | "Passport" |
| Comments | "Comments" | "Stories" |
| Location field | "Last Immigration Check" | **Last Seen** |
| No results | "No results found" | "Looks like nobody's been spotted here yet." |
| Empty feed | "No data" | "Quiet out there right now." |
| Error state | "An error occurred" | "Something went sideways — let's try that again." |

General rule: every string should sound like it could be said out loud by a warm, slightly wry friend — never like a system message. Clarity beats cleverness whenever the two are in tension: prefer the plain word if the creative one risks confusion.

---

## 13. Notification System

Warm and specific, never alarming, capped in frequency, geographically relevant only:

- *"Orange Loaf was just spotted near you."*
- *"Someone shared a new Story about a cat you've visited."*
- *"A cat near your saved territory hasn't been seen in a while — maybe check in?"*

Mascot (Saffron) used as the small notification icon/avatar for a consistent, friendly sender identity. No streak-protection or re-engagement-pressure notifications ("come back before you lose your streak!") — explicitly excluded per the anti-competition principle.

---

## 14. Empty States

Each pairs one Saffron pose with one short warm line and one clear action:

- No cats nearby: Saffron sitting attentively — *"Looks like nobody's been spotted here yet. Be the first to say hello."*
- No sightings in feed: Saffron curled up — *"Quiet out there right now. Check back soon — or go find someone."*
- No saved Passports: Saffron peeking — *"Your collection is just getting started."*
- No Stories yet on a Passport: *"No stories yet. Know something about this cat? Be the first to share."*

---

## 15. Loading States

- Map/data load: three-paw-print sequential fade loader
- Image/card load: cream skeleton block, subtle shimmer, never a spinner over a photo
- Passport opening: cover-lift animation doubles as the loading transition, so the wait itself feels intentional rather than dead time

---

## 16. Version 1 Roadmap

- Onboarding (3 screens + mascot, Continue as Guest)
- Home: Hero, Map centerpiece, Trending, Nearby, Recent Sightings
- Explore: full map, basic filters, Known Territory overlay (static, non-editable shape), pin preview sheet
- Passport: cover, identity fields (number, nationality, home territory, Last Seen, issued date), personality chips (manually curated at launch), Stories (basic list, lightly moderated), check-in history strip
- Add/Check-In: camera-first flow, location confirm, optional chip + story, stamp celebration
- Saved + Explorer Profile (guest identity, check-ins, saved list)
- Mascot: minimum pose set (walking, sitting, sleeping, peeking, stamping)
- Core design tokens, icon set, accessibility baseline (contrast, tap targets, reduced motion)

## 17. Version 2 Roadmap

- Respect Mode: moderator tooling to reduce location precision or hide vulnerable cats (injured, nursing, rescue situations) — requires a moderator role/permissions system, which doesn't exist in V1's guest-only model
- Personality chip suggestions driven by pattern/ML rather than manual curation
- Dynamic, community-refined Known Territory shapes (vs. static V1 shape)
- Duplicate-cat merge/claim flow
- Notification system full rollout (V1 can launch notification-free)
- Offline check-in capture with background sync
- Personalized Home hero ("3 cats near you haven't been visited this week")
- Expanded mascot pose library and seasonal/event variants

---

## 18. Final Critical Self-Review

1. **Respect Mode is designed conceptually but has no permission model yet.** V1 has only "Guest" — there's no moderator role defined. This needs to be resolved as a backend/identity decision before Respect Mode can be built at all, not just a V2 UI task.
2. **Personality chips need a governance decision.** Who assigns them — the check-in submitter, a moderator, or community consensus? Left unanswered, chips will drift into noise or become a minor conflict point (disagreements over whether a cat is "Friendly").
3. **Passport Number format (`CAT-UAE-000428`) implies a global sequential registry** — worth confirming this is desired versus a per-territory or per-emirate numbering scheme, since a single global counter created at guest-scale could reveal total cat-count/growth metrics publicly in a way that may or may not be intended.
4. **Gold-on-cream contrast risk (Section 11) must be resolved before Passport visual design is finalized** — this is a real accessibility risk, not a stylistic nice-to-have, and should block sign-off on the Passport palette.
5. **Stories moderation is mentioned but not specified.** Community-submitted free text about specific animals and specific locations carries real risk (harassment, misinformation, disclosing sensitive location details for vulnerable cats) — needs at least a lightweight report/review flow in V1, even manual, not deferred entirely to V2.
6. **The Known Territory "soft blob" is a good instinct for calmness but needs a defined minimum size/radius rule** so it never accidentally reveals a precise home location for a vulnerable cat before Respect Mode exists — this is a V1 privacy gap, not just a V2 nicety.
7. **Mascot risk: "as recognizable as Duo or Octocat" is a high bar** — recommend user-testing 2–3 pose/style variations of Saffron before locking the final illustration style, rather than committing on first pass.
8. **No stated policy for what happens when a cat is reported deceased or permanently gone.** This is emotionally sensitive territory (users may be attached to a specific Passport) and needs a compassionate, clearly designed state — silence here risks a jarring or confusing experience for returning users.
9. **The elevated center "Add" button pattern still resembles existing camera-first apps** (flagged previously) — worth a final differentiation pass (e.g., paw-shaped rather than circular) before final visual lock, given the brief's explicit "don't copy any product" instruction.
10. **No clear onboarding fallback if location permission is denied.** The product's entire value proposition depends on proximity — Screen 3's "find your first cat" promise needs a graceful alternate path (e.g., manually browsing trending cats by area) for users who decline location access, or the first-run experience breaks entirely for a meaningful subset of users.

---

*This document supersedes Version 0.9 and should be treated as the canonical reference for Cat Passport frontend and product development going forward. Items flagged in Section 18 are recommended blockers for design sign-off, not optional polish.*
