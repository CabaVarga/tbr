# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

"tbr" (Tab Budget Reminder) — a Chrome extension (Manifest V3) that discourages tab hoarding through escalating visual warnings.

## Development

No build step. Load as an unpacked extension:

1. Go to `chrome://extensions`, enable Developer Mode
2. Click "Load unpacked", select this repo's `src/` directory
3. After code changes, click the reload button on the extension card

## Architecture

```
src/manifest.json      MV3 manifest
src/background.js      Service worker — core logic
  ├── Listens to tab events (onCreated, onRemoved, onReplaced)
  ├── Updates badge text (tab count) and badge color
  └── Opens src/warning.html popup window at 20+ tabs

src/popup.html/js/css   Extension icon click — shows tab count + status
src/warning.html/js/css Annoying popup window — "close tab" or "keep tab"
src/icons/              Simple PNG icons (16, 48, 128)
```

## Key Thresholds (defined in both src/background.js and src/popup.js)

- **< 10 tabs**: Green/default — all clear
- **10–19 tabs**: Orange badge — warning
- **20+ tabs**: Red badge — new tab triggers a popup window demanding confirmation

## Design Decisions

- Vanilla JS/CSS/HTML only, no frameworks or build tools
- No auto-close or tab grouping — warnings only
- Warning popup uses `chrome.windows.create` (type: "popup") to be intentionally intrusive
- One warning window at a time (tracked via `warningWindowId`)
