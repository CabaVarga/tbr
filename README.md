# tbr – Tab Budget Reminder

`tbr` is a Chrome extension that pushes back against tab hoarding with escalating warnings.

It starts simple: you click the extension icon and see how many tabs you have open. As the count climbs, the extension can turn the badge orange or red, tint the icon, draw a warning border around the active page, and eventually interrupt you with a blunt popup asking whether you really need that new tab.

## What It Does

- Tracks how many tabs you currently have open.
- Shows the live tab count in the extension popup.
- Escalates from a warning state to a danger state based on configurable thresholds.
- Can highlight tab overload with badge color, page border, and dynamic icon color.
- Opens a warning popup when you create a new tab while already over the danger threshold.

## How You Use It

1. Install the extension.
2. Click the toolbar icon to see your current tab count.
3. Open the settings panel in the popup if you want to change the warning behavior.
4. Set your own `Warning at` and `Danger at` thresholds.
5. Enable or disable visual cues:
   - badge color
   - page border
   - icon color
6. Keep browsing normally until the extension starts pushing back.

If you cross the danger threshold and open another tab, the extension opens a dedicated warning window. From there you can close the new tab or keep it.

## Default Behavior

- Fewer than 10 tabs: calm state
- 10 to 19 tabs: warning state
- 20 or more tabs: danger state

These values can be changed in the popup settings.

## Local Development

There is no build step.

To load the extension locally:

1. Open `chrome://extensions`
2. Turn on Developer mode
3. Click `Load unpacked`
4. Select the repository root
5. Reload the extension after code changes

## Packaging For The Chrome Web Store

There is no build step.

When you are ready to submit a release, create a `.zip` from the extension files in the repo root:

- `manifest.json`
- `background.js`
- `popup.html`
- `popup.js`
- `popup.css`
- `warning.html`
- `warning.js`
- `warning.css`
- `settings.js`
- `icons/`

Do not include repo-only paths such as `.git/`, `.claude/`, `.codex`, `docs/`, `scripts/`, or `store-visuals/`.

More publishing details live in [docs/publish.md](docs/publish.md).

## Store Visual Placeholders

Chrome Web Store visuals for this extension should live in [store-visuals/README.md](store-visuals/README.md).

Planned placeholders:

- `store-visuals/screenshot-01-popup.png`
- `store-visuals/screenshot-02-warning-window.png`
- `store-visuals/screenshot-03-settings.png`
- `store-visuals/promo-tile-small-440x280.png`
- `store-visuals/promo-marquee-1400x560.png`

## Permissions

The extension currently uses:

- `tabs`
- `storage`
- `scripting`
- `<all_urls>`

These are used for tab counting, storing settings, and optionally injecting the warning border into the active page.
