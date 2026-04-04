# Publishing

## Build The Upload Zip

There is no build step for this extension.

Before packaging, update the version in `src/manifest.json` if this is a new store release.

Create the upload zip from the contents of `src/` using only the extension files:

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

## What Goes In The Upload Zip

The upload archive should contain only the extension files required by the browser stores at the archive root:

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

It must not include a top-level `src/` folder, and it must not include repository-only files such as `.git/`, `.claude/`, `.codex`, `CLAUDE.md`, `docs/`, `scripts/`, `dist/`, `release/`, or `store-visuals/`.

## Chrome Web Store Checklist

- Update `src/manifest.json` with the release version if needed.
- Create the upload zip from the contents of `src/` using only the extension files listed above.
- Load `src/` as an unpacked extension in Chrome and verify the release candidate before upload.
- Prepare listing metadata: title, short description, full description, category, and support contact.
- Prepare listing assets in `store-visuals/`.
- Upload the generated extension `.zip` in the Chrome Web Store Developer Dashboard.
- Complete the Privacy tab accurately.
- Set Distribution visibility and regions.
- Submit for review.

## Current Store Asset Requirements

Based on the current Chrome Web Store docs:

- The listing cannot be missing a description, icon, or screenshots.
- Provide a `128x128` store icon.
- Provide at least 1 screenshot, with up to 5 total.
- Screenshot size should be `1280x800` or `640x400`.
- Provide a required small promo tile at `440x280`.
- Optionally provide a marquee promo image at `1400x560`.
- Optional promo video can be added from YouTube.

Suggested asset placeholders for this repo:

- `store-visuals/screenshot-01-popup.png`
- `store-visuals/screenshot-02-warning-window.png`
- `store-visuals/screenshot-03-settings.png`
- `store-visuals/promo-tile-small-440x280.png`
- `store-visuals/promo-marquee-1400x560.png`

## Privacy And Permission Rationale

Use the current implementation when filling out the store privacy answers:

- `tabs`: required to count open tabs and react to tab creation, removal, activation, replacement, and update events.
- `storage`: required to persist the user’s tab warning settings.
- `scripting`: required to inject and remove the warning border CSS on the active page.
- `<all_urls>`: required because the optional page border feature can target whichever active HTTP or HTTPS page the user is viewing.

This extension does not have a remote backend. If that changes later, revisit the privacy answers before publishing updates.

Inference from the current permissions and behavior: plan to provide a privacy policy in the store submission, because the extension handles tab-related user data and page access.

## Update Flow

- Update the version in `src/manifest.json`.
- Create a new upload zip from the contents of `src/`.
- Upload the newly generated extension `.zip`.
- Update listing text or privacy answers if functionality or permissions changed.
- Submit the updated package for review.

## Edge Add-Ons

The same generated `.zip` is the starting point for Microsoft Edge Add-ons submissions through Partner Center.
