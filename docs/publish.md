# Publishing

## Build A Release Zip

Run the release helper from the repo root:

```bash
./scripts/release.sh
```

That packages the extension with the current version in `manifest.json` and writes the upload artifact to `dist/tbr-<version>.zip`.

To bump the manifest version and package in one step:

```bash
./scripts/release.sh patch
./scripts/release.sh minor
./scripts/release.sh major
```

## What Goes In The Upload Zip

The release helper packages only the extension files required by the browser stores:

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

It does not package repository-only files such as `.git/`, `.claude/`, `.codex`, `CLAUDE.md`, `docs/`, `scripts/`, or `dist/`.

## Chrome Web Store Checklist

- Run `./scripts/release.sh` or `./scripts/release.sh patch` from the repo root.
- Load the repo as an unpacked extension in Chrome and verify the release candidate before upload.
- Prepare listing metadata: title, short description, full description, category, and support contact.
- Prepare listing assets: at least one screenshot plus any required store graphics.
- Upload `dist/tbr-<version>.zip` in the Chrome Web Store Developer Dashboard.
- Complete the Privacy tab accurately.
- Set Distribution visibility and regions.
- Submit for review.

## Privacy And Permission Rationale

Use the current implementation when filling out the store privacy answers:

- `tabs`: required to count open tabs and react to tab creation, removal, activation, replacement, and update events.
- `storage`: required to persist the user’s tab warning settings.
- `scripting`: required to inject and remove the warning border CSS on the active page.
- `<all_urls>`: required because the optional page border feature can target whichever active HTTP or HTTPS page the user is viewing.

This extension does not have a remote backend. If that changes later, revisit the privacy answers before publishing updates.

## Update Flow

- Bump the version with `./scripts/release.sh patch`, `minor`, or `major`, or edit `manifest.json` first and then run `./scripts/release.sh`.
- Upload the newly generated `dist/tbr-<version>.zip`.
- Update listing text or privacy answers if functionality or permissions changed.
- Submit the updated package for review.

## Edge Add-Ons

The same generated `.zip` is the starting point for Microsoft Edge Add-ons submissions through Partner Center.
