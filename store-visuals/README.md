# Store Visuals

This folder contains the committed Chrome Web Store assets for `tbr`.

## Delivered Assets

- `screenshot-01-popup.png`
- `screenshot-02-warning-window.png`
- `screenshot-03-settings.png`
- `screenshot-04-work-overload.png`
- `promo-tile-small-440x280.png`
- `promo-marquee-1400x560.png`

## Source Renderer

The source renderer lives in:

- `source/index.html`
- `source/styles.css`
- `source/render.js`

## Narrative

The visuals lead with personal distraction first, then escalate into a controlled, reviewer-safe, mildly accusatory tone. One scene covers a work-overload situation so the listing has a concrete second pressure point, not just casual browsing fatigue.

## Public Site Copies

Selected copies are published from `docs/assets/store-visuals/` so the static site stays self-contained.

## Regenerating

1. Run `python3 -m http.server 4173 --directory store-visuals/source`
2. Point `playwright-cli` at the available Chromium binary if needed
3. Capture each scene at its final dimensions and overwrite the PNGs in this directory

## Size Targets

- screenshots: `1280x800`
- small promo tile: `440x280`
- marquee: `1400x560`
