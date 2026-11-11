# Maestro Salon — Reference Edition (Royal 3D-style Homepage)

A responsive **single-page** premium salon website built with vanilla HTML, CSS and JavaScript. No npm packages or API keys are needed.

## Start

```bash
cd maestro-salon-3d-matched
npm start
```

Open `http://localhost:3000` in your browser. Any unknown **page route** (such as `/services` or `/stylists`) redirects to `/`; in-page navigation scrolls to the corresponding homepage section. An included `404.html` provides the same behavior on static hosts that support custom 404 pages. Missing image/script files intentionally return 404, rather than hiding mistakes.

Alternatively, opening `index.html` directly works for most interactions, but use `npm start` for the correct route redirects.

## Features

- Responsive cinematic background video, muted autoplay and infinite loop, with pause/play and reduced-motion handling.
- Premium layered burgundy/cream/champagne styling and SVG ornaments, 3D-style depth via CSS shadows and metallic gradients.
- Service category jump/filter interactions and service booking buttons.
- Working touch, mouse and keyboard before/after image slider.
- Four-step demo booking modal, validation, date/time preference selection, review, and **localStorage** persistence.
- Location area cards, Google Maps search popup, external Google Maps links and optional browser geolocation sorting by **approximate area-centre straight-line distance**.
- Gallery lightbox, example testimonial carousel, mobile navigation, WhatsApp message/share modal, back-to-top and smooth scrolling.

## Important: demonstration data

**This is a visual and functional demo, not an official Maestro Salon site.** The generated photorealistic images are *illustrative* and do not portray confirmed staff, premises, actual before/after results or specific clients. Prices, featured services, team names and testimonials are sample content.

The area listings (GTB Nagar, Pitampura, New Moti Nagar, Saraswati Garden) are unverified possible locations based on information supplied for the project, **not confirmed branches or exact street locations**. Their Maps actions deliberately perform a search rather than asserting a precise destination.

The bundled looping MP4 is a **cinematic moving-zoom preview built from illustrative imagery**, not original filmed salon footage. Replace with actual licensed or salon-owned footage when available, preserving the current filename (or updating the `<source>`).

Bookings are **not transmitted to a business or server** and are **not confirmed appointments**. Demo submissions are stored in the current browser only under `maestro_demo_requests`.

The WhatsApp button launches WhatsApp's share flow. To link directly to the salon, set the verified phone number in `script.js` as `CONFIG.whatsappNumber`, with the country code and no leading `+`. Social profiles are intentionally unconfigured until official URLs are supplied.

Before deploying publicly, confirm branch ownership/addresses, salon contact, opening hours, actual price list and staff profiles; replace illustrative photos/film with licensed business assets; connect real booking backend with server-side validation; and add privacy notice for collected personal details.

## Code files

- `index.html`: semantic homepage and modals
- `styles.css`: global theme and responsive layout
- `script.js`: all interactivity and demo data
- `server.js`: zero-dependency local server with unknown-route redirects
- `assets/images/`: illustrative image assets
- `assets/video/`: loopable MP4 hero preview

## Responsive design

Optimized for desktop, tablet and mobile, including small phones. Fonts use Google Fonts Cormorant Garamond + Manrope where available, with readable local fallbacks.

## Reference Edition

This update follows the owner-supplied luxury full-page reference more closely: dark brown navbar, reference-tone cinematic hero portrait overlay, ivory floating trust bar, compact five-column signature services, metallic side arches, tight editorial vertical rhythm, grouped locations/reviews, and premium gold buttons. `reference-theme.css` and `3d-match.css` supply the reference-matched styling; `script.js` retains the booking, filtering, slider, map, gallery, video, WhatsApp, and mobile controls, with a small featured-location expansion enhancement. The user-supplied mockup photo fragments are used only for illustrative design visuals. An exact pixel-for-pixel reproduction across devices is not possible from a single fixed-resolution design mockup; layout is adapted for legibility and responsiveness.


## 3D visual match pass
The `3d-match.css` stylesheet is loaded last and corrects the desktop/tablet/mobile composition against the approved reference screenshot. See `DESIGN-COMPARISON.md`.

## Verification (2026-11-11)

- Browser DOM/layout checks at 320, 360, 390, 430, 700, 768, 899, 900, 1024, 1280, 1440, and 1920px: no page-wide horizontal overflow.
- Verified 4 categories, 5 featured services, 4 illustrative stylist profiles, and 3 featured location cards (4 on expand).
- Verified modal controls, service filtering, gallery lightbox, booking steps, local demo request save via a test storage shim, and mobile menu.
- HTTP checks: `/services`, `/stylists`, `/locations`, `/contact` return 302 redirects to `/`; image assets and stylesheet return HTTP 200.
- Previews are browser-generated with local assets inlined because this test environment blocks browser access to localhost URLs. Browser-installed font fallback can differ from font loaded over the internet.
