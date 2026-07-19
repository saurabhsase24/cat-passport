# Cat Passport — Home Screen Product Design Specification
### Final Direction: Premium Exploration (Expedition foundation + Passport soul + Field Guide calm)

---

## 1. Overall UX Philosophy

Cat Passport is not a map product and not a social app. It is a **discovery ritual**. The single emotional job of the home screen is to answer one question the moment it opens: *"Is there someone worth visiting near me right now?"*

Three principles govern every decision below:

- **Curiosity over completeness.** Show just enough to make someone want to look further — never dump full information up front.
- **Cats are the celebrities.** Every layout decision should ask "does this make the cat feel more important, or does it make the interface feel more important?" The interface always loses that contest.
- **Calm urgency.** The product should nudge people outside without ever feeling like a game with scores, streaks, or pressure. Urgency comes from *specificity* ("last seen 18 minutes ago"), not from mechanics (points, badges, timers).

The home screen is structured as three emotional beats, top to bottom: **Welcome → Centerpiece (the map) → Reasons to go now (trending, nearby, recent).**

---

## 2. Detailed Home Screen Wireframe

```
┌─────────────────────────────────┐
│  🐾 Cat Passport      (avatar)  │  ← Header, transparent → cream on scroll
├─────────────────────────────────┤
│                                 │
│   "Someone's out there."       │  ← Hero, cream bg, no imagery clutter
│   Warm one-line subhead         │
│                                 │
│   [ Find Nearby Cats ]          │  ← Primary, filled orange
│   [ Add a Cat ]                 │  ← Secondary, outlined sage
│                                 │
├─────────────────────────────────┤
│                                 │
│        ⌾  MAP (large,           │  ← Centerpiece, ~55% viewport height
│        rounded, soft shadow)    │     visible without scrolling
│        3–4 soft pins, no        │
│        clutter, gentle pulse    │
│        on nearest cat           │
│                                 │
├─────────────────────────────────┤
│  Trending Cats            →    │
│  ┌────────┐┌────────┐┌───────  │  ← Full-bleed swipeable cards
│  │ photo  ││ photo  ││ photo   │     photo-dominant, name only
│  └────────┘└────────┘└───────  │     visible below fold
├─────────────────────────────────┤
│  Nearby Cats               →   │
│  ┌────────┐┌────────┐          │  ← Distance + last seen
│  │ photo  ││ photo  │          │     status line, not stats block
│  └────────┘└────────┘          │
├─────────────────────────────────┤
│  Recent Sightings              │
│  ○ Orange Loaf — Marina, 18m   │  ← Logbook-style feed
│  ○ Whiskers — Al Majaz, 41m    │
│  ○ ...                         │
├─────────────────────────────────┤
│  🏠   🧭   ➕   🔖   🪪         │  ← Bottom nav, Add elevated
└─────────────────────────────────┘
```

The map sits directly beneath the hero with no scroll required to see it — it is the centerpiece, per the brief. Everything below it is "further reasons to look," reachable by a natural, unhurried scroll.

---

## 3. Visual Hierarchy

1. **The map** — largest, most visually dominant element on first paint
2. **Hero headline + primary CTA** — second read, sets emotional tone before the map
3. **Trending/Nearby photography** — third read, photo-first, name second, metadata third
4. **Recent Sightings text feed** — quietest element, rewards scrolling rather than demanding attention
5. **Navigation and chrome** — always present, never competing for attention (low-contrast until active)

Nothing on the screen should ever be visually louder than a cat photo. Buttons, badges, and UI chrome sit one visual "step" below imagery at all times — achieved through restrained saturation and generous negative space rather than size alone.

---

## 4. Spacing System

An 8pt base grid, mobile-first:

| Token | Value | Use |
|---|---|---|
| `space-xs` | 4px | icon-to-label gaps |
| `space-sm` | 8px | inline element spacing |
| `space-md` | 16px | card internal padding, standard gaps |
| `space-lg` | 24px | section internal breathing room |
| `space-xl` | 40px | space *between* major sections (hero→map, map→trending) |
| `space-2xl` | 64px | top of hero, bottom safe-area above nav |

Section-to-section spacing (`xl`/`2xl`) is deliberately larger than most consumer apps — this is what preserves the "Field Guide calm" even while the Expedition/map energy dominates the top of the screen. Density is allowed to increase slightly *within* a card, but never *between* sections.

---

## 5. Component Hierarchy

```
HomeScreen
├── Header
│   ├── Logo
│   └── GuestAvatar
├── Hero
│   ├── Headline
│   ├── Subheadline
│   └── CTAButtonGroup
│       ├── PrimaryButton (Find Nearby Cats)
│       └── SecondaryButton (Add a Cat)
├── ExploreMap (centerpiece)
│   ├── MapCanvas
│   ├── PinCluster
│   └── NearestCatPulse
├── TrendingSection
│   └── TrendingCard[] (photo, name, subtle status tag)
├── NearbySection
│   └── NearbyCard[] (photo, name, distance, "last seen")
├── RecentSightingsFeed
│   └── SightingEntry[] (avatar thumb, name, place, relative time)
└── BottomNavigation
    ├── HomeTab
    ├── ExploreTab
    ├── AddTab (elevated, center)
    ├── SavedTab
    └── PassportTab ("Me")
```

Passport itself is a separate screen/component tree (`PassportBook`, `PassportPage`, `TravelNoteEntry`, `StampGraphic`) reached by tapping a cat card — it is intentionally *not* part of the home screen's component tree, to keep home lightweight and fast.

---

## 6. Interaction Design

- **Map is the default exploratory surface.** Tapping a pin surfaces a small preview sheet (photo, name, distance) that slides up from the bottom — never a full navigation away from the map, preserving context.
- **Cards are swipeable, not paginated with dots.** Momentum scroll with soft snap, no page-count UI — keeps things feeling calm rather than gamified.
- **One-thumb rule:** primary CTAs and the Add tab sit in the bottom half of the screen; nothing critical requires a stretch to the top corners on large phones.
- **"Check In" replaces "Upload."** Tapping Add opens the camera directly — no intermediate form-first screen. Metadata (location, mood, time) is inferred where possible and only lightly confirmed by the user.
- **Today's Status line** (e.g., "Last seen 18 minutes ago · Mood: Relaxed · 5 visitors today") appears only on the card detail/preview, not the home cards themselves, to keep home cards visually quiet — this is the single biggest place we resist the temptation to add "just one more stat" to the home feed itself.

---

## 7. Animation Recommendations

All animations stay under 300ms, easing curves soft (ease-out), nothing bounces more than once:

- **Button press:** 4–6% scale-down, 120ms, subtle
- **Pin pulse:** slow, ambient breathing glow (2s loop) on the nearest undiscovered cat only — never more than one pin pulsing at a time, to avoid visual noise
- **Passport stamp:** on completing a check-in, a single stamp animation lands with a soft thud-style haptic — this is the one moment allowed to feel slightly more theatrical, since it's the emotional payoff moment
- **Paw-print loader:** three small prints fade in sequentially during map/data loading, replacing a generic spinner
- **Camera shutter:** brief iris-close/open flash (150ms) on photo capture, no shutter sound unless device sound is on
- **Card entrance:** gentle fade-up (8px translate, 200ms) as sections scroll into view — once only, not on every re-scroll

---

## 8. Colour Usage

| Colour | Role | Notes |
|---|---|---|
| Warm Cream | Base background (~70% of surface) | Never pure white — keeps the "field notebook" warmth even outside Passport pages |
| Warm Orange | Primary actions only (CTA buttons, active nav state, nearest-pin pulse) | Used sparingly so it retains urgency/energy when it does appear |
| Sage Green | Secondary structure (outlined buttons, section dividers, inactive states) | The "calm" counterweight to orange |
| Sky Blue | Discovery/new signals only (e.g., a small "new sighting" indicator) | Smallest footprint of the four — a semantic accent, not decoration |
| Vintage Paper / Dark Green / Gold / Brown | Reserved entirely for the Passport experience | Deliberately does not leak into the home screen — this contrast is what makes opening a Passport feel like stepping into a different, more intimate space |

This restraint (home = warm neutrals + two functional accents; Passport = a whole separate palette) is one of the most important decisions in this spec: it makes the Passport-opening moment feel like a genuine mode change, not just another screen.

---

## 9. Typography Recommendations

- **Display/Headline:** A rounded, warm sans with real personality (weight and character similar to a friendly geometric rounded face) — used for the hero headline and section titles only.
- **Body/UI:** A clean rounded sans, slightly larger base size than typical apps (17px body, 15px minimum for secondary text) for outdoor readability and all-age accessibility.
- **Passport-only accent:** A slab-serif for passport headers and a light script-style face used sparingly for "Travel Notes," reinforcing the journal feeling — never used outside the Passport screens.

Type scale stays restrained: 4 sizes on the home screen (headline, section title, card title, meta text) — resisting the urge to introduce more granularity than the content needs.

---

## 10. Iconography

Rounded-stroke, single-weight icon set (no mixed fill/outline styles). Paw prints used as a recurring *motif* (loading states, empty states, passport stamps) rather than as literal navigation icons, so they stay special instead of decorative wallpaper. Navigation icons are simple and universally legible (house, compass, plus, bookmark, passport/ID card) — no invented iconography that requires learning.

---

## 11. Photography Guidelines

- Every cat photo is candid, natural light, taken at cat's eye level where possible — never posed or stock-looking.
- No filters that alter cat colour accuracy (consistency matters for identification).
- Crop generously — cats occupy 60–80% of frame, environment visible enough to suggest "a real place nearby," not a studio shot.
- Avoid photos that show a cat in a stressed posture (flattened ears, tucked body) being used as "cute" content — ties directly to the "respect community cats" principle.

---

## 12. Navigation Behaviour

Bottom nav is persistent and always five items, Add visually elevated as a circular button breaking the nav bar's top edge (camera-first apps' pattern) — signals it's the most important action without needing a label to say so. Tapping Explore surfaces a full-screen map (home's map is a preview/centerpiece; Explore is the "working" map with filters). Tapping Me opens the user's own Passport collection — importantly, the user's *own* passport uses the same treatment as any cat's passport, reinforcing that Passports are a genre of object in this product, not a user-account page.

---

## 13. Empty States

Never technical, always warm and forward-looking:

- No cats nearby yet: *"Looks like nobody's been spotted here yet. Be the first to say hello."*
- No sightings in feed: *"Quiet out there right now. Check back soon — or go find someone."*
- No saved passports: *"Your collection is just getting started."*

Each empty state pairs a single soft illustration (never a cat looking sad — always neutral/optimistic) with one short line and one clear next action.

---

## 14. Loading States

- Map load: paw-print sequence loader described above
- Card/image load: soft cream skeleton blocks with a very subtle shimmer, never a spinner over a photo
- Passport open: the "cover" briefly animates as if opening, so even the loading moment contributes to the magic rather than feeling like a technical pause

---

## 15. Notification Style

Warm, specific, never alarming: *"Orange Loaf was just spotted near you"* rather than *"New sighting alert."* Frequency capped and geographically relevant only — no engagement-farming pushes ("come back!"). Notifications should always feel like a friend telling you something, never like a system reminding you to open an app.

---

## 16. Emotional Journey

| Moment | Desired feeling |
|---|---|
| Opening the app | Calm curiosity — "let's see who's around" |
| Seeing the map | Gentle excitement — "oh, there's someone nearby" |
| Browsing trending/nearby cards | Warmth, mild anticipation |
| Reading recent sightings | Connection to a real, ongoing community |
| Checking in / adding a cat | Small pride, quick and low-friction |
| Opening a Passport | Genuine delight — "this feels special" |
| Returning next day | Familiarity plus fresh curiosity — never fatigue or obligation |

The product should never make someone feel behind, competitive, or nagged. Every touchpoint should feel like an invitation, not a demand.

---

## 17. What Makes This Memorable / Award-Worthy

- The **contrast between the exploration palette and the Passport palette** is the product's signature move — most apps use one consistent theme throughout; treating the Passport as a genuinely different visual world is the most ownable, screenshot-worthy idea here.
- The **single-pulse pin** (only ever one cat "calling out" at a time) is a small restraint that most competitors would over-design into a busy map — it's the kind of quiet decision an Apple Design Award panel notices.
- **"Today's Status"** treated as a living, specific detail (not a stat block) turns each cat into a character with a day, not a database row — this is the core idea that separates Cat Passport from being "a map with pins."
- The **Passport-opening animation** as the one moment allowed extra theatricality creates a clear "peak moment" in the product, which is a hallmark of memorable mobile experiences (cf. Duolingo's streak animation, Apple's unlock animations).

---

## Self-Critique: 10 Improvements Before Any Code Is Written

1. **The hero currently has no imagery.** A fully text-based hero risks feeling flat given "photos before text" is a core principle. Consider a single, very softly blurred background cat photo behind the headline (not a sharp hero photo, to avoid competing with the map below) — needs a design pass to confirm it doesn't visually compete with the map's centerpiece role.
2. **"Today's Status" needs a firm content model.** Mood ("Relaxed," "Playful," "Shy") must be a small, well-defined taxonomy set by contributors, not free text — otherwise it will drift into noise or misuse. Needs product decision before V1.
3. **The single-pulse-pin rule doesn't scale.** In a dense area (e.g., Marina Walk with 20 cats), showing only one pulsing pin may feel arbitrary or hide genuinely nearby cats. Needs a clustering/prioritization rule (e.g., pulse = nearest *undiscovered* cat, cluster the rest quietly).
4. **No stated strategy for cats that move between areas or aren't seen for a long time.** "Last seen" needs a graceful decay state (e.g., fading confidence after days/weeks) so the product doesn't silently mislead users into a wasted trip.
5. **The "Visitors today" stat risks re-introducing the gamification we removed.** It should be reframed as descriptive ("a few people stopped by today") rather than a number, or it will read as a leaderboard-adjacent metric.
6. **No accessibility spec yet for colour-blind users** on the map's pin/pulse system — pulsing alone shouldn't be the only differentiator; needs a shape or icon cue as well as colour/animation.
7. **The Recent Sightings feed has no stated moderation or trust model.** Since this is community-contributed and involves location data about specific spots, there needs to be a lightweight review or reporting mechanism before V1 launch, even if manual at first.
8. **No offline/poor-connectivity state defined.** Community cat spotting happens outdoors, often in areas with weak signal — the map and check-in flow need a clear "captured, will sync when back online" state, or the core action of the app will fail exactly when it's most likely to be used.
9. **The elevated center "Add" button pattern is well-trodden (Instagram, TikTok) — worth deliberately differentiating it** (e.g., a paw-print shaped button rather than a plain circle) so it doesn't read as a generic camera-app clone, given the brief's "don't copy any product" instruction.
10. **No guidance yet on what happens for duplicate/miscategorized cats** (two people creating two Passports for the same cat). This is a data-integrity and trust issue that will directly affect whether "Trending" and "Nearby" feel accurate — needs a merge/claim flow before the community scales.

---

## Version Roadmap

**Version 1 (MVP — ship this):**
- Header, Hero (static, no dynamic personalization), CTA buttons
- Map centerpiece with basic pins, single-pulse nearest-cat logic
- Trending Cats and Nearby Cats sections (photo, name, distance, last seen only — no mood/visitor count yet)
- Recent Sightings as a simple chronological feed
- Bottom navigation (Home, Explore, Add, Saved, Me)
- Check-in flow (camera-first, minimal metadata)
- Passport page with photo, name, and a simple Travel Notes list — full vintage styling, but without stamp-collection mechanics yet
- Basic empty/loading states as specified above

**Version 2 (post-launch enhancements):**
- "Today's Status" (mood, visitor count) once a content model and moderation approach exist
- Passport stamping animation and any collectible/keepsake mechanics
- Notification system
- Duplicate-cat merge/claim flow
- Offline capture-and-sync
- Advanced map clustering and decay-based "last seen" confidence
- Personalized hero (e.g., "3 cats near you haven't been visited this week")
