# Design System: Dangjin Power Plant Safety Kiosk

**Target Device:** 32–43" Landscape Touch Kiosk
**Design Philosophy:** Modern Minimalist × Bento Grid — Airport Signage meets iOS Widgets

## 1. Visual Theme & Atmosphere

A **clean, modular "cockpit"** layout that exudes institutional trust and quiet authority. Each content module sits inside its own well-defined container — like a safety control panel — creating a grid of independent, scannable information tiles. The overall feel is **calm, spacious, and purposeful**, with generous whitespace that reduces cognitive load for plant workers in high-stress environments.

Inspired by **Apple iOS widget layouts** and **airport information kiosks**: large touch targets, high contrast text on muted backgrounds, and a strict information hierarchy.

## 2. Color Palette & Roles

| Role               | Descriptive Name        | Hex       | HSL            | Usage                                                     |
| ------------------ | ----------------------- | --------- | -------------- | --------------------------------------------------------- |
| **Primary**        | Authoritative Deep Blue | `#0052CC` | `214 100% 40%` | Primary actions, navigation highlights, header accents    |
| **Primary Dark**   | Navy Depth              | `#003D99` | `214 100% 30%` | Hover/pressed states on primary elements                  |
| **Primary Light**  | Frost Blue Wash         | `#E6F0FF` | `214 100% 95%` | Active sidebar items, card highlights, subtle backgrounds |
| **Secondary**      | Safety Amber            | `#FFAB00` | `40 100% 50%`  | Warning badges, attention-drawing CTAs, alert indicators  |
| **Secondary Dark** | Burnt Amber             | `#CC8800` | `40 100% 40%`  | Hover/pressed on secondary elements                       |
| **Background**     | Paper Gray              | `#F4F5F7` | `220 14% 96%`  | Global page background — eye-fatigue reducer              |
| **Card**           | Pure White              | `#FFFFFF` | `0 0% 100%`    | Card/container surfaces, modals                           |
| **Foreground**     | Near Black              | `#1A1A1A` | `0 0% 10%`     | Primary text, headings                                    |
| **Gray 700**       | Charcoal                | `#4A4A4A` | `0 0% 29%`     | Secondary text, labels                                    |
| **Gray 500**       | Slate Gray              | `#8A8A8A` | `0 0% 54%`     | Captions, timestamps, placeholders                        |
| **Gray 300**       | Silver Mist             | `#C5C5C5` | `0 0% 77%`     | Borders, dividers                                         |
| **Gray 100**       | Smoke White             | `#F0F0F0` | `0 0% 94%`     | Table alternating rows, subtle separators                 |
| **Success**        | Safety Green            | `#1B8A3E` | `133 67% 33%`  | Success toasts, confirmation badges                       |
| **Danger**         | Alert Red               | `#CC3333` | `0 65% 51%`    | Delete actions, error states, critical warnings           |

## 3. Typography Rules

**Font:** Pretendard (local, offline-safe)

| Level      | Size | Weight         | Letter-Spacing | Usage                           |
| ---------- | ---- | -------------- | -------------- | ------------------------------- |
| Display    | 56px | Bold (700)     | -0.5px         | Screensaver title               |
| H1         | 40px | Bold (700)     | -0.3px         | Page titles                     |
| H2         | 32px | SemiBold (600) | -0.2px         | Section headers, header title   |
| H3         | 26px | SemiBold (600) | 0              | Card titles, subsection headers |
| Body Large | 22px | Regular (400)  | 0.1px          | Prominent body text             |
| Body       | 20px | Regular (400)  | 0.1px          | Default body text               |
| Body Small | 18px | Regular (400)  | 0.1px          | List items, secondary info      |
| Caption    | 16px | Regular (400)  | 0.2px          | Timestamps, meta info           |
| Button     | 22px | SemiBold (600) | 0.3px          | All touchable button labels     |

## 4. Component Stylings

### Buttons

- **Primary:** Solid Deep Blue fill with white text. Generously rounded corners (12px). On press: gentle scale-down (0.97) + brightness increase.
- **Secondary:** Outlined with 2px Deep Blue border, transparent fill. On hover: frost blue wash background.
- **Danger:** Outlined with Alert Red border. Appears only in admin contexts.
- **Ghost:** No border or fill. Subtle hover background.
- **All buttons:** Minimum 52px height for comfortable touch. Minimum 16px horizontal gap between adjacent buttons.

### Cards (Bento Grid Tiles)

- **Shape:** Generously rounded corners (16px radius). Pure white surface on Paper Gray background.
- **Shadow:** Whisper-soft diffused shadow (`0 4px 12px rgba(0,0,0,0.08)`) — creates subtle lift without heaviness.
- **Hover:** Shadow deepens slightly + subtle upward translate (-2px). Scale stays at 1.0 for stability.
- **Active:** Gentle press-down scale (0.98).
- **Grid:** 4-column layout with 32px gutters for main categories. Responsive to screen width.

### Header (Fixed Top Bar)

- **Height:** 80px fixed. Pure white surface with hair-thin bottom shadow.
- **Left:** Shield icon in Deep Blue circle + "당진발전본부 안전관리" in H2.
- **Right:** Digital clock (H3) + date in caption below.

### Bottom Bar (Fixed Navigation)

- **Height:** 64px fixed. Pure white surface with top border.
- **Left:** Home button (solid primary) + Back button (outlined primary, conditional).
- **Right:** Admin lock icon with circular progress ring on long-press (5 sec).

### Modals & Overlays

- **Backdrop:** Semi-transparent dark overlay (`rgba(0,0,0,0.5)`).
- **Container:** White card with 24px radius, generous 32px padding, centered on screen.
- **Entrance:** Scale-in from 0.95 with fade-in (300ms).

### Input Fields (Admin)

- **Style:** 2px gray-300 border, 12px radius, white background.
- **Focus:** Border transitions to Deep Blue, subtle blue ring glow.
- **Height:** Minimum 48px for touch accessibility.

## 5. Layout Principles

- **Max content width:** 1760px with 48px side padding.
- **Bento Grid:** Modular card grid with 32px gap. Cards are self-contained information units.
- **Vertical rhythm:** Consistent 32px/48px section spacing.
- **Touch safety:** Minimum 16px gap between any interactive elements. All touch targets ≥ 48×48px.
- **Fixed chrome:** Header (80px top) + Bottom bar (64px bottom) always visible. Content scrolls between them.
- **Admin layout:** 240px fixed left sidebar + fluid main area.

## 6. Motion & Animation

- **Transitions:** 200ms default, 300ms for page enters, 500ms for dramatic effects.
- **Easing:** Material Design standard (`cubic-bezier(0.4, 0, 0.2, 1)`).
- **Page transitions:** Fade-in (300ms) for screen changes.
- **Screensaver:** Crossfade slideshow (600ms transitions, 5s intervals).
- **Reduced motion:** Respect `prefers-reduced-motion` — disable all animations.
