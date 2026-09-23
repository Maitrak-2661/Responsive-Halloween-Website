<div align="center">

# 🎃 Halloween Night

### A fully responsive, feature-rich Halloween-themed shopping experience — built with zero frameworks.

<img src="preview.png" alt="Halloween Night — project preview" width="100%">

<br>

[![Live Demo](https://img.shields.io/badge/🔴_Live_Demo-View_Site-orange?style=for-the-badge)](https://maitrak-2661.github.io/Responsive-Halloween-Website/)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](#-pwa--offline-support)
[![License](https://img.shields.io/badge/License-Educational-blue?style=for-the-badge)](#-license)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![No Framework](https://img.shields.io/badge/Framework-None-critical?style=flat-square)
![Responsive](https://img.shields.io/badge/Responsive-Mobile→Desktop-success?style=flat-square)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Shopping Cart](#-shopping-cart)
- [Countdown Timer](#-countdown-timer)
- [Theme System](#-theme-system)
- [Accessibility](#-accessibility)
- [PWA / Offline Support](#-pwa--offline-support)
- [Project Structure](#-project-structure)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Page Sections](#-page-sections)
- [Known Limitations](#-known-limitations)
- [License](#-license)

---

## 🕸️ Overview

**Halloween Night** is a static, front-end-only e-commerce landing page built from scratch with **HTML5, SCSS, and vanilla JavaScript** — no React, no Vue, no build framework of any kind. It was built to demonstrate that a genuinely feature-rich, production-feeling shopping experience — theming, a working cart, search, offline support — doesn't require a framework or a backend to get right.

Every piece of "dynamic" behaviour (cart, favourites, theme choice) lives entirely in the browser, persisted with `localStorage`. There is no server, no database, no API — that's a deliberate design decision, not a missing feature.

## 🔴 Live Demo

**[maitrak-2661.github.io/Responsive-Halloween-Website](https://maitrak-2661.github.io/Responsive-Halloween-Website/)**

Try it, install it as an app (see [PWA support](#-pwa--offline-support)), or switch off your wifi after your first visit and reload — it still works.

---

## ✨ Features

### Core UI

| Feature | Details |
|---|---|
| 🎠 Hero Slider | Swiper.js carousel with 3 animated slides and pagination |
| 🛍️ Trick or Treat Grid | Searchable product grid with add-to-cart buttons |
| 🆕 New Arrivals Slider | Centred auto-width Swiper carousel, favourites + add-to-cart |
| 💸 Discount Banner | Promotional section with scroll-reveal animation |
| 📧 Newsletter | Email subscribe form |
| 🦶 Footer | Multi-column layout with social links and decorative illustrations |

### JavaScript-Powered Enhancements

| Feature | Details |
|---|---|
| ⏳ Halloween Countdown | Live days / hrs / min banner counting to Oct 31, rolls to next year automatically |
| 🛒 Shopping Cart | Add-to-cart from **both** New Arrivals and Trick or Treat, quantity controls, subtotal, demo checkout — fully `localStorage`-backed |
| ❤️ Favourites | Heart-toggle on every New Arrivals card, persisted, with a live nav badge |
| 🔍 Search & Filter | Instant, case-insensitive client-side filtering on Trick or Treat — no reload |
| 🎨 Theme Switcher | Green · Red · Black themes, saved and restored across visits |
| 🌑 Auto Dark Mode | Reads `prefers-color-scheme: dark` to pick a sensible first-visit default |
| 🖼️ Lazy Loading | All below-the-fold `<img>` tags use `loading="lazy"` |
| ♿ Accessibility | `aria-label`s, `aria-pressed` states, `aria-live` regions, visible `:focus-visible` outlines, full alt-text |
| 🎉 Confetti Burst | CSS-keyframe candy/emoji explosion on "Book Now" — zero external libraries |
| 🔄 Scroll Animations | ScrollReveal.js entrance animations across every major section |
| 🔝 Scroll-to-Top | Appears after 460px of scroll |
| 📌 Active Nav Link | Highlights the current section as you scroll |
| 📲 PWA / Offline | Installable, works with no network connection after first visit |

---

## 🛒 Shopping Cart

A genuine, working cart — entirely front-end, no backend or payment processing.

- **Add to cart** from either the **New Arrivals** slider or the **Trick or Treat** grid — both sections wired independently, sharing one cart.
- Adding the same item twice increments its quantity rather than duplicating the row.
- **Cart drawer** slides in from the right: item image, name, unit price, `+`/`−` quantity controls, and a remove button per row.
- **Subtotal** recalculates live as quantities change.
- **Checkout** opens a confirmation modal that's explicit about being a demo — no real payment is processed — with a "Clear Cart" action.
- Fully **keyboard-accessible**: `Escape` closes the drawer or modal, every control carries an `aria-label`.
- Correctly handles **Swiper's loop-cloning** — New Arrivals uses `loop: true`, which duplicates slide DOM nodes; cart and favourites state stay perfectly in sync between a card and its clone via event delegation, not per-button listeners.
- Persisted to `localStorage` under the key `halloween-cart`.

## ⏳ Countdown Timer

A banner at the top of the page counts down to 31 October of the current year (rolling to next year automatically once that date passes).

It deliberately sits in **normal document flow** (`position: static`) rather than `sticky` — an earlier version used `sticky` and broke silently on desktop, because the ancestor `.main` element has `overflow: hidden` applied for an unrelated scroll-animation purpose, and an `overflow: hidden` ancestor breaks `position: sticky` on any descendant. The banner also carries its own `margin-top` matching the fixed header's height at each breakpoint, so it's never hidden underneath it.

## 🎨 Theme System

Three themes, switchable via the colour dots in the nav bar. The active choice is saved to `localStorage` and restored on every visit — switching themes only ever touches two CSS custom properties (`--body-color`, `--container-color`), so the change is instant with no re-render.

| Theme | Style |
|---|---|
| 🟢 Green *(default)* | Gradient |
| 🔴 Red | Gradient |
| ⚫ Black | Solid |

> On first visit (before any manual choice exists), the site checks `prefers-color-scheme: dark` — visitors with a dark-mode OS default to the Black theme automatically.

## ♿ Accessibility

- Every icon-only interactive control carries an `aria-label`.
- Favourite and cart buttons expose state via `aria-pressed` / `aria-label`.
- The cart panel and checkout modal use `role="dialog"` and `aria-modal="true"`.
- The countdown banner uses `aria-live="polite"` so screen readers announce updates without interrupting.
- Every `<img>` has meaningful `alt` text.
- Keyboard focus is always visible via a themed `:focus-visible` outline — never removed, only styled.

## 📲 PWA / Offline Support

The site is a fully installable Progressive Web App with genuine offline support, backed by a Service Worker using a **cache-first** strategy:

1. **Install** — every core asset (HTML, compiled CSS, JS bundles, key images) is pre-cached the first time you visit.
2. **Activate** — any stale cache from a previous version is automatically cleared.
3. **Fetch** — same-origin requests are served instantly from cache; cross-origin requests (Google Fonts, Boxicons CDN) are intentionally *not* cached, so those specific assets won't load offline — everything else will.

Verified by disabling network access entirely in Chrome DevTools and reloading — the full page, including the theme switcher, cart, and countdown, renders correctly with zero network connection.

---

## 📁 Project Structure

```
responsive-halloween-website-main/
├── index.html                   # All page markup
├── manifest.json                # PWA install metadata
├── README.md
│
├── assets/
│   ├── css/
│   │   ├── styles.css           # Compiled from SCSS — the file the browser loads
│   │   └── swiper-bundle.min.css
│   │
│   ├── scss/
│   │   ├── styles.scss          # Root manifest — imports every partial below
│   │   ├── base/
│   │   │   └── _base.scss       # Reset, base elements, :focus-visible
│   │   ├── config/
│   │   │   └── _variables.scss  # Every CSS custom property
│   │   ├── theme/
│   │   │   └── _theme.scss      # Theme override hooks
│   │   ├── layout/
│   │   │   └── _layout.scss     # Container, grid, .main
│   │   └── components/
│   │       ├── _header.scss
│   │       ├── _countdown.scss  # Halloween countdown banner
│   │       ├── _home.scss
│   │       ├── _buttons.scss
│   │       ├── _category.scss
│   │       ├── _about.scss
│   │       ├── _trick.scss
│   │       ├── _discount.scss
│   │       ├── _new.scss
│   │       ├── _cart.scss       # Shopping cart drawer + modal
│   │       ├── _newsletter.scss
│   │       ├── _footer.scss
│   │       ├── _scroll.scss
│   │       └── _breakpoints.scss
│   │
│   ├── js/
│   │   ├── main.js              # All application JavaScript
│   │   ├── sw.js                # Service worker — offline caching
│   │   ├── swiper-bundle.min.js
│   │   └── scrollreveal.min.js
│   │
│   └── img/                     # Site imagery, favicon, PWA icons
```

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| HTML5 | Semantic markup |
| SCSS (partials) | Modular, variable-driven styling |
| CSS Custom Properties | Runtime theming, read and written by JS |
| Vanilla JavaScript (ES6+) | All interactivity — no framework |
| [Swiper.js](https://swiperjs.com/) | Touch-friendly sliders |
| [ScrollReveal.js](https://scrollrevealjs.org/) | Scroll entrance animations |
| [Boxicons](https://boxicons.com/) | Icon set |
| [Google Fonts — Poppins](https://fonts.google.com/specimen/Poppins) | Typography |
| Service Worker + Cache API | Offline support |
| Web App Manifest | PWA installability |

---

## 🚀 Getting Started

No build step is required just to view the site.

\`\`\`bash
# Clone the repo
git clone https://github.com/Maitrak-2661/Responsive-Halloween-Website.git

# Open in browser
start index.html       # Windows
open index.html        # macOS
xdg-open index.html    # Linux
\`\`\`

To edit styles, compile SCSS → \`assets/css/styles.css\`:

\`\`\`bash
# Sass CLI (watch mode)
sass --watch assets/scss/styles.scss assets/css/styles.css

# VS Code: Live Sass Compiler extension → click "Watch Sass" in the status bar
\`\`\`

> **Note:** the Service Worker only activates when served over HTTP/HTTPS, not from \`file://\`. Use a local server (VS Code Live Server, \`npx serve .\`) or the [live deployment](https://maitrak-2661.github.io/Responsive-Halloween-Website/) to test offline/PWA features.

---

## 📸 Page Sections

1. **Header / Nav** — sticky, background-shifts on scroll, mobile hamburger, theme switcher, favourites badge, cart badge
2. **Countdown Banner** — live days · hrs · min until Halloween, static positioning
3. **Home Slider** — 3-slide hero with ghost characters and a "Book Now" confetti burst
4. **Category** — Ghosts · Pumpkins · Witch Hats with hover lift
5. **About** — floating illustration, scroll-reveal text sliding in from opposite directions
6. **Trick or Treat** — searchable product grid with add-to-cart
7. **Discount** — 50% off promotional banner
8. **New Arrivals** — swipeable cards with favourites and add-to-cart
9. **Newsletter** — email subscription form
10. **Footer** — links, social icons, decorative illustrations

---

## ⚠️ Known Limitations

Documented honestly rather than hidden:

- **No backend** — the cart is a genuine front-end demonstration; checkout does not process real payments or persist orders beyond the current browser.
- **Offline scope** — cross-origin resources (Google Fonts, Boxicons CDN) are intentionally excluded from the Service Worker's cache and will not load without a network connection; all first-party content and styling will.
- **No dedicated tablet breakpoint** — tablet widths currently share styling with desktop rather than having bespoke tuning.

---

Built by **Maitrak Manojbhai Kunjadiya** · B.Tech AI & ML · Internship Project at Orbize Infotech

</div>
