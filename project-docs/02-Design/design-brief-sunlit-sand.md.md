# Cat Passport — Sunlit Sand Design Brief

**Status:** Approved design direction
**Purpose:** Permanent visual and UX reference for Cat Passport
**Scope:** Visual design, component styling, copy conventions, and future UI direction
**Relationship to existing documentation:** This brief should guide Design System V2. It does not replace the PRD or backend architecture.

---

## 1. Design Direction

Cat Passport should feel like a warm, calm neighborhood journal rather than a conventional mapping application or social network.

The visual identity should combine:

* warm sunlight and sand-inspired neutral tones;
* soft sage accents;
* restrained orange for important actions;
* generous whitespace;
* rounded, approachable components;
* photography as an important part of the experience;
* subtle passport-inspired character on individual cat Passport pages.

The interface should feel:

**Warm · Calm · Curious · Local · Friendly · Simple**

It should not feel:

**Corporate · Dark · Competitive · Overly cute · Game-like · Technically dense**

Avoid heavy dark borders, near-black outlines, dark device-style frames, saturated blue/teal interfaces, excessive shadows, and unnecessary visual decoration.

---

# 2. Colour System — Sunlit Sand

Use the following palette as the basis of Design System V2.

```css
--color-bg-cream:        #FCF7EF;
--color-bg-surface:      #F3EADA;
--color-border-soft:     #E3D6C0;

--color-text-primary:    #4A3F33;
--color-text-secondary:  #8A7C68;

--color-primary-orange:  #E8873A;
--color-secondary-sage:  #9FBB98;

--color-accent-photo-1:  #F2A87F;
--color-accent-photo-2:  #C7CFC1;
```

### Usage

**Background cream**
Primary page background.

**Background surface**
Cards, map placeholders, elevated content areas and other surfaces that need subtle separation from the page.

Use the existing `--color-bg-surface` naming convention. Do not introduce a competing `--color-bg-card` token.

**Border soft**
Borders, separators and dividers.

Dark borders should generally not be used.

**Primary orange**
Reserve for:

* primary CTA;
* active navigation;
* important map actions;
* selected/high-priority interaction states;
* the future nearest-cat map-pin pulse.

It should not dominate large areas of the interface.

**Secondary sage**
Use for:

* secondary actions;
* chips;
* quiet status elements;
* future territory-map fills;
* subtle decorative accents.

Replace darker/cooler secondary colours such as teal where they remain in the interface.

---

# 3. Passport-Only Colours

These tokens belong specifically to Cat Passport pages and should not become general application colours.

```css
--passport-paper:        #F6EFDE;
--passport-border:       #E3D6C0;
--passport-cover:        #F2A87F;
--passport-stamp-red:    #C97B4E;
--passport-gold-line:    #D6B679;
```

The Passport should feel visually related to the main application while having a distinct printed-document character.

---

# 4. Typography

## General application

Use a friendly rounded sans-serif family.

Preferred direction:

* **Nunito**, or
* **Quicksand**

Use one primary rounded family consistently rather than mixing several sans-serif fonts.

### Headings

* Rounded sans
* Medium to semibold weight
* Friendly rather than heavy
* Avoid oversized marketing-style hero typography

### Body

* Same rounded sans family
* Regular weight
* Approximately **16–17px** base size

### Metadata

Approximately **14px**.

Metadata should remain readable outdoors on mobile devices and should not be made excessively small merely to create hierarchy.

---

## Passport typography

Passport pages intentionally introduce a serif typeface for:

* cat name;
* identity information;
* story quotations;
* selected passport-document details.

Preferred:

* **Lora**, or
* **Georgia** as a system fallback.

This typography shift should help Passport pages feel like a physical identity document rather than another standard app screen.

---

# 5. Spacing

Use an 8-point-oriented spacing system.

Core values:

* 4px — micro spacing
* 8px — compact spacing
* 16px — standard spacing
* 24px — component/section spacing
* 40px — generous section spacing
* 64px — major separation where appropriate

Do not force every layout into excessive vertical whitespace.

On map-first and task-oriented screens, functional content takes priority over decorative breathing room.

---

# 6. Shape Language

### Standard cards

**16px radius**

### Map / major visual panels

Approximately **20–24px radius**

### Buttons

Fully rounded / pill-shaped.

### Chips

Fully rounded / pill-shaped.

Borders should use `--color-border-soft` or a lighter equivalent.

Shadows should remain restrained. Separation should come primarily from surface colour, spacing and borders rather than large drop shadows.

---

# 7. Home Screen

The homepage is **map-first**.

Do not restore a large hero block above the map.

The map should remain the first substantial visual element after a compact introduction/header.

The current responsive map-first structure established before this design brief should be preserved unless usability testing justifies changing it.

## Map preview

Eventually the map should:

* center around the user's real location;
* use rounded corners;
* occupy a substantial portion of the first mobile viewport;
* visually dominate the homepage.

A small overlay may communicate local activity, for example:

**“3 cats seen nearby today”**

Do not reduce the existing responsive map substantially merely to match an arbitrary fixed pixel height.

---

## Primary actions

The core user actions remain:

**Find Nearby Cats**
Primary orange action.

**Spot a Cat**
The established entry-point label for starting a new sighting.

The term **Check In** is reserved for the eventual submission/confirmation action within the sighting flow. It should not replace the homepage/entry-point wording “Spot a Cat.”

Avoid restoring the previous large QuickActions section if the same actions can be presented more efficiently around the map.

---

# 8. Cat Discovery Cards

Trending and nearby cat cards should remain visually clean.

Core content:

* cat photo;
* cat name.

A single short contextual line is permitted where it materially helps distinguish the cat, for example:

* “Seen near Marina Walk”
* “A regular around the Corniche”
* “Friendly orange regular”

Do not overload discovery cards with:

* multiple timestamps;
* statistics;
* several metadata rows;
* unnecessary distance information;
* engagement metrics.

Detailed information belongs in the map preview/bottom sheet and Passport.

---

# 9. Recent Sightings

Recent Sightings should use a simple vertical feed.

Each row may contain:

* small circular cat photo;
* cat name;
* territory/location;
* natural relative time.

Use light divider lines rather than separate heavy cards where possible.

Examples of relative time:

* “18 minutes ago”
* “this morning”
* “yesterday evening”

Avoid countdowns or manufactured urgency.

Empty state:

**“Quiet out there right now.”**

---

# 10. Bottom Navigation

The primary mobile navigation remains:

* Home
* Explore
* Add
* Passports
* Profile

Future visual direction:

The **Add** action may become an elevated circular orange button that breaks slightly above the navigation bar.

This is a **future visual specification**, not an instruction to restructure navigation during unrelated implementation work.

Navigation should remain visually light and should not resemble a dark mobile-device toolbar.

---

# 11. Explore Map

The Explore experience should eventually use a muted, warm-toned map style.

Avoid a default saturated, blue-heavy basemap where practical.

## Cat markers

Future markers should use cat photography rather than generic map pins where practical.

Preferred direction:

* circular cat photo;
* contained within a simple rounded marker/pin treatment.

## Nearest unvisited cat

Only the **single nearest not-yet-visited cat** may receive a gentle orange pulsing ring.

All other markers remain static.

Do not create multiple simultaneous pulsing markers.

---

# 12. Known Territory

A cat's commonly observed area may be represented using a soft translucent sage fill.

Use:

`--color-secondary-sage`

at low opacity.

The territory must communicate:

**“Usually seen around here.”**

It must not imply:

**“This is the cat's precise or exclusive boundary.”**

Territory opacity may vary modestly according to sighting activity, with stronger activity producing a slightly richer fill.

Avoid hard geographic borders.

---

# 13. Map Cat Preview

Selecting a cat marker should eventually open a compact bottom sheet rather than immediately navigating away.

The preview should contain:

* photo;
* name;
* distance;
* last seen;
* one short story teaser.

The story teaser is important. It provides emotional/contextual information that may encourage the user to open the full Passport.

Example:

*“Usually waits beside the bakery just before sunset.”*

The user may then choose to open the Passport.

---

# 14. Passport Page

The Passport is the most distinctive visual surface in Cat Passport.

It should feel like a modern interpretation of a physical passport rather than a conventional profile page.

## Cover photo

The cat photograph should dominate the first view.

Target direction:

Approximately **40% of the initial viewport height**.

The photograph should not feel like a small avatar.

---

## Visited stamp

Future Passport design should include a subtle:

**VISITED**

stamp.

Direction:

* approximately 50px;
* circular outline;
* slightly transparent;
* positioned toward the upper-right of the photograph;
* approximately -14° rotation.

It should feel stamped, not like a digital badge.

---

## Territory stamp

A second passport-style stamp may identify territory, for example:

**MARINA WALK**

Use:

`--passport-stamp-red`

with slight rotation.

Place it near the personality/identity area rather than competing with the cover photo.

---

# 15. Passport Paper Character

Use subtle aged-paper cues.

Possible treatments:

* two very low-opacity rounded shapes at opposite corners;
* one faint horizontal crease line;
* flat colour and opacity only.

Do not use:

* strong textures;
* realistic stains;
* blur-heavy effects;
* large drop shadows;
* skeuomorphic paper simulation.

The effect should be barely noticeable.

---

# 16. Identity Block

Maximum approximately five primary identity fields.

Suggested fields:

* Passport Number
* Nationality
* Home Territory
* Last Seen
* Passport Issued

Use a spacious **two-column layout** where screen size permits.

The section must not resemble an administrative database table.

---

# 17. Personality

Use approximately **3–5 personality chips** maximum.

Format:

**emoji + one word/short phrase**

Examples:

* 😴 Sleepy
* 🧡 Friendly
* 👀 Curious

Use sage-filled pill styling.

Personality should feel observational and playful, not diagnostic or overly anthropomorphic.

---

# 18. Stories

User/community comments are presented as:

**Stories**

Passport stories may use:

* italic serif typography;
* subtle gold left border;
* attribution using first name only.

The section should feel closer to collected neighborhood memories than a social-media comment feed.

---

# 19. Product Language

Use the following terminology consistently.

| Concept                                   | Preferred language |
| ----------------------------------------- | ------------------ |
| Start reporting/adding a sighting         | **Spot a Cat**     |
| Final submission within the sighting flow | **Check In**       |
| Cat profile                               | **Passport**       |
| Community comments/memories               | **Stories**        |
| Location/timing information               | **Last Seen**      |

No cats nearby:

**“Looks like nobody's been spotted here yet.”**

Empty sightings:

**“Quiet out there right now.”**

---

# 20. Voice

Copy should be:

* warm;
* plain;
* concise;
* human;
* lightly playful where appropriate.

Avoid:

* corporate language;
* excessive cat puns;
* forced cuteness;
* manufactured urgency;
* gamification language.

When choosing between a clever term and a clearer term, prefer clarity unless the branded term adds meaningful character.

---

# 21. Gamification Policy

V1 contains no:

* points;
* XP;
* streaks;
* levels;
* achievements;
* leaderboards.

Existing project documentation already excludes advanced gamification from V1.

**Design System V2 should not silently decide whether these concepts are permanently removed from the entire Cat Passport roadmap.**

That is a separate product decision.

Until explicitly decided otherwise:

* no gamification should be implemented in V1;
* existing roadmap references to possible future gamification remain product-roadmap matters rather than design-system requirements.

---

# 22. Interaction Principles

Interactions should feel calm and predictable.

Prefer:

* clear tap targets;
* obvious navigation;
* lightweight transitions;
* meaningful feedback;
* progressive disclosure.

Avoid:

* excessive animation;
* bouncing controls;
* unnecessary pulse effects;
* engagement tricks;
* artificial urgency.

The map's future nearest-cat pulse is a deliberate exception and should remain subtle.

---

# 23. Mobile First

Cat Passport is primarily designed for smartphones.

Every design decision should first be evaluated on:

* narrow screens;
* outdoor readability;
* thumb reach;
* map visibility;
* camera/location workflow;
* variable mobile browser viewport heights.

Desktop layouts should adapt gracefully but should not dictate the mobile design.

---

# 24. Accessibility

Visual warmth must not compromise usability.

Maintain:

* readable text contrast;
* minimum practical tap targets;
* keyboard focus states;
* semantic HTML;
* screen-reader-friendly labels;
* logical heading hierarchy;
* non-colour indicators for important states.

Do not use orange or sage alone to communicate critical status.

---

# 25. Implementation Guardrails

This brief defines visual and UX direction. It does not authorize unrelated architectural changes.

In particular:

* Do not modify Sprint 5A Supabase infrastructure merely to implement visual changes.
* Do not restructure routing without a functional reason.
* Do not modify Mapbox integration during a visual-only sprint unless the task explicitly covers map implementation.
* Do not reintroduce the removed QuickActions section.
* Do not shrink the map-first homepage merely to reproduce a static mock-up.
* Reuse shared design tokens and primitives instead of adding one-off colours and component-specific constants.
* `--color-bg-surface` remains the canonical shared surface token.

---

# 26. Implementation Priority

## Design System V2 / Near-term

Prioritize:

1. Sunlit Sand colour tokens
2. Typography
3. Soft border system
4. Radius consistency
5. Button/chip styling
6. Homepage visual refinement while preserving map-first hierarchy
7. Card/list simplification
8. Copy consistency
9. Mobile readability

## Future feature-specific work

Document now but implement with the relevant feature sprint:

* warm Mapbox basemap;
* photo map markers;
* nearest-unvisited-cat pulse;
* Known Territory overlays;
* map bottom sheet;
* full Passport visual treatment;
* Visited/territory stamps;
* Stories presentation;
* elevated Add navigation button.

These should not be prematurely mocked into unrelated screens merely to satisfy this design brief.

---

# 27. Design Principle

When uncertain, use this hierarchy:

**Map/location first → cat photography → clear action → useful context → decorative personality.**

Cat Passport should help someone notice the cats already living around them.

The design should make that discovery feel personal without making the application noisy.
