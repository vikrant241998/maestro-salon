# Maestro Salon — Horizontal scrolling fix

This edition fixes the page-wide horizontal scrollbar visible at 100% browser zoom.

Cause: decorative elements purposely extended outside the hero, services, and transformation sections. Their visible overflow expanded the document's scroll width by 75px on all tested viewport widths.

Fix: clip horizontal overflow locally on the three decorative sections (`.hero`, `.section-services`, `.transform-section`) instead of globally clipping the document. Content shells and flex/grid items also have responsive width limits.

Tested widths (CSS pixels at 100% browser zoom): 320, 360, 375, 390, 430, 700, 768, 1024, 1280, 1440, 1920. All reported zero page-wide horizontal overflow in headless Chromium. The service list is still an intentional contained horizontal carousel on mobile, but the page itself never scrolls sideways.

Run: `npm start` from this folder, then visit `http://localhost:3000`.

Original `index.html` and `script.js` were not modified; booking, gallery, location, menu, and other interactions keep their existing behavior.
