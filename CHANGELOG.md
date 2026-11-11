# Royal Reference Edition — changes from previous HTML/CSS/JS demo

- **Same existing project and interactive JavaScript** retained, with only service labels and sample branch image assignments updated.
- Added `reference-theme.css`, layered after the existing `styles.css` to override presentation without replacing event handlers.
- Updated to match the attached approved homepage design direction: dark espresso navigation, gold wordmark and booking CTA, cinematic salon portrait, deeper hero gradient, metallic gold waves, large floating ivory benefits panel, warm cream background, raised photographic category tiles and compact five-across service cards.
- Reduced excess desktop vertical spacing to match the reference's magazine-like section rhythm. Kept service filters functional.
- Restyled transformation slider, horizontal team cards, experience images, luxury feature panel, four locality cards, paired testimonials, photo gallery, final CTA and footer.
- Added assets extracted from the supplied user-approved visual reference: `hero-reference.webp`, `ornament-left.webp`, `ornament-right.webp` and selected illustrative photo fragments; they are design visuals, **not official salon photographs**.
- Preserved video autoplay/loop and play/pause. The hero uses a still overlay of the approved photograph over the moving MP4 for visual similarity; the bundled MP4 remains a photo-motion demo rather than filmed footage.
- Updated mobile, tablet and desktop breakpoints, including a correction for hidden mobile navigation and compact small-phone location cards.
- Existing demo booking, filtering, comparison slider, maps search, WhatsApp sharing, gallery and review carousel are preserved.

## Verification performed

- `node --check script.js` and `node --check server.js` passed.
- Local references from HTML resolve to files in this package; all interactive hook IDs are present and unique.
- CSS parsed without stylesheet syntax errors.
- Local server returned the homepage for `/` and redirected unknown routes such as `/services`, `/stylists`, `/gallery`, `/contact` and an arbitrary path to `/`.
- **Limitation:** The available Chromium runtime in this environment applies a managed `URLBlocklist` that prevents live page navigation, including localhost, so this revision has not been pixel-validated in a browser here. Test the site in your browser against `design-reference/approved-homepage.png` and share screenshots for any further visual tuning.

## Honest content limitations

The screenshot is a static 1024×1536 concept, so exact pixel-by-pixel replication on every responsive screen is not technically possible. Font appearance may vary slightly based on browser/platform and Google Fonts availability. The names/prices/stylist portraits and branch areas remain **demo data**, not verified official business details; bookings save to the browser only. Do not publish them as verified claims. The salon's actual WhatsApp number is not configured.

## 2026-11-11 — Horizontal overflow fix (100% browser zoom)

- Removed document-wide left/right scrolling caused by oversized decorative gold waves in `.hero`, ornaments in `.section-services`, and floral decorations in `.transform-section`.
- Scoped `overflow-x: clip` to those three visual sections rather than hiding overflow on the whole page, so sticky navigation and the mobile service carousel are preserved.
- Added minimum-size constraints to responsive grid/flex children and capped responsive content shells.
- Validated `document.documentElement.scrollWidth === window.innerWidth` at 320, 360, 375, 390, 430, 700, 768, 1024, 1280, 1440, and 1920 CSS pixels in headless Chromium using inline-loaded local files.
- Verified booking modal opens/closes, mobile menu toggles, and original `index.html` and `script.js` remain byte-identical.
