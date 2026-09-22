# ABHI-MOH — MASTER DEVELOPMENT RULES

The current ABHI-MOH website UI is already designed and should be treated as the baseline.

## Core Directives

- **DO NOT redesign the entire website.**
- **DO NOT replace existing sections unnecessarily.**
- **DO NOT change the current visual identity just for the sake of changing it.**

## Visual & Brand Identity

The website must remain:
- Luxury
- Modern
- Editorial
- Vintage / retro-inspired
- Indian fashion focused
- Sophisticated
- Warm rather than extremely dark
- Visually rich but not cluttered

## Preserving Animations & Baseline Features

- Existing animations that already look good must be preserved.
- **Preserve the existing Our Story / scroll animation** unless a specific bug is found.
- The current **Collection page is connected to Wix**.
- The **Exclusive Collection section** and **Lookbook** are currently **NOT connected to Wix**. Do not connect them to Wix yet unless explicitly instructed.

## Development Priorities

1. Fix functionality.
2. Fix data / state bugs.
3. Improve UX.
4. Improve visual quality.
5. Improve responsive behavior.
6. Improve performance.
7. Then integrate additional Wix functionality.

## Engineering & State Discipline

- **Inspect before modifying:** Before changing any component, inspect its existing implementation.
- **No duplicate components:** Do not create duplicate components when an existing component can be fixed.
- **Single Source of Truth:** Do not create duplicate state systems or duplicate `localStorage` keys. Use one source of truth for each feature.
- **Cross-device testing:** After every change, ensure the existing desktop and mobile UI still works.
- **Real data integrity:**
  - Do not introduce placeholder/fake product data.
  - Do not hardcode customer information.
  - Do not hardcode favorite products.
  - Do not hardcode cart contents.
- **Preserve capabilities:** Do not remove existing functionality while improving the design.
