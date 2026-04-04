# Store Visuals

Final Chrome Web Store listing assets for `tbr – Tab Budget Reminder`.

## Delivered Files

- `screenshot-01-popup.png` — popup danger state in a personal-distraction browsing context
- `screenshot-02-warning-window.png` — warning window interrupting another tab opening
- `screenshot-03-settings.png` — settings panel with thresholds and warning toggles
- `screenshot-04-work-overload.png` — overload shown in a docs/issues/dashboard context
- `promo-tile-small-440x280.png` — required small promo tile
- `promo-marquee-1400x560.png` — optional Chrome Web Store marquee

## Source Files

The tracked source for these assets lives in `store-visuals/source/`.

- `index.html` selects a scene via `?scene=...`
- `styles.css` owns the shared visual system
- `render.js` defines the scene content

## Regenerating

1. Run `python3 -m http.server 4173 --directory store-visuals/source`
2. Point `playwright-cli` at the available Chromium binary if needed
3. Capture each scene at its final dimensions and overwrite the PNGs in this directory

This workspace used a local Playwright config at `/tmp/playwright-cli-config.json` that points to `/home/cabav/.cache/ms-playwright/chromium-1212/chrome-linux64/chrome`.

## Size Targets

- screenshots: `1280x800`
- small promo tile: `440x280`
- marquee: `1400x560`
