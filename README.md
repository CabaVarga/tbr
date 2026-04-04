# tbr – Tab Budget Reminder

tbr is a Chrome extension that pushes back against tab hoarding with escalating warnings. It keeps the feedback local, blunt, and visible: you can see the current tab count, tune thresholds, and let the extension escalate from calm to warning to danger as your tab stack grows.

Public links:

- Landing page: https://cabavarga.github.io/tbr/
- Privacy policy: https://cabavarga.github.io/tbr/privacy/
- Support: https://github.com/CabaVarga/tbr/issues

## What It Does

- Tracks how many tabs you currently have open.
- Shows the live tab count in the extension popup.
- Escalates from warning to danger based on configurable thresholds.
- Can highlight overload with badge color, page border, and dynamic icon color.
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
6. Keep browsing until the extension starts pushing back.

If you cross the danger threshold and open another tab, the extension opens a dedicated warning window. From there you can close the new tab or keep it.

## Permissions

tbr uses `tabs`, `storage`, `scripting`, and `<all_urls>` so it can count tabs, save your settings, and optionally inject the warning border into the active page. There is no backend; the extension runs entirely in the browser.

## Repo Context

- `src/` is the unpacked extension root.
- `docs/` is the public GitHub Pages site.
- `store-visuals/` contains tracked store-submission assets and the source renderer.
- `asset-generation-pipeline/` contains local-only notes for the asset pipeline.

## Local Development

There is no build step.

To load the extension locally:

1. Open `chrome://extensions`
2. Turn on Developer mode
3. Click `Load unpacked`
4. Select the repository `src/` directory
5. Reload the extension after code changes

## Packaging For The Chrome Web Store

Package the extension from the contents of `src/` with no top-level `src/` directory in the uploaded zip.

The archive root should contain the extension files directly, such as:

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

Do not include repo-only paths such as `.git/`, `.claude/`, `.codex`, `docs/`, `scripts/`, `dist/`, `release/`, or `store-visuals/`.

More publishing details live in [docs/publish.md](docs/publish.md).
