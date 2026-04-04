# Publishing

## Release Workflow

Use the local release helper to package the extension from `src/` into a store-ready archive:

```bash
./scripts/release.sh
```

The helper is intentionally local-only and untracked. In the current release setup it lives in the main checkout, not this worktree. Run it from the checkout where your local `scripts/release.sh` exists after confirming that checkout's `src/` matches the release candidate.

If you are packaging from a different checkout than the release candidate, verify the two `src/` trees match before you build:

```bash
git diff --no-index --quiet /path/to/release-helper-checkout/src /path/to/release-candidate/src
```

The generated file should be named `dist/tbr-<version>.zip`. The archive must contain the files from `src/` at the zip root and must not include a top-level `src/` folder.

If this is a new store release, update `src/manifest.json` first so the packaged version matches the listing.

## Archive Contents

The upload zip should include only the runtime extension files at the archive root:

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

It must not include repository-only files such as `.git/`, `.claude/`, `.codex`, `CLAUDE.md`, `docs/`, `scripts/`, `dist/`, `release/`, or `store-visuals/`.

## Store Submission Checklist

- Review the final listing copy in [store-listing.md](store-listing.md).
- Publish [privacy/index.html](privacy/index.html) to the public GitHub Pages privacy URL for this repo, for example `https://cabavarga.github.io/tbr/privacy/` once Pages is enabled from `docs/`.
- Confirm the public privacy-policy URL resolves before submitting it in the store dashboard.
- Load `src/` as an unpacked extension in Chrome and sanity-check the release candidate.
- Prepare listing metadata: title, short description, full description, category, and support contact.
- Prepare the images and promo assets in `store-visuals/`.
- Upload `dist/tbr-<version>.zip` in the Chrome Web Store Developer Dashboard.
- Complete the Privacy tab and distribution settings.
- Submit the package for review.

## Privacy And Permissions

Use the current implementation when answering the store privacy questions:

- `tabs`: count open tabs, react to tab creation, removal, activation, replacement, and update events, and let the warning window close the newly opened tab if you choose.
- `storage`: persist the user’s tab warning settings locally.
- `scripting`: inject and remove the warning border CSS on the active page.
- `<all_urls>`: apply the optional page border to whichever HTTP or HTTPS page the user is currently viewing.

The extension does not use a remote backend. Functionality stays local to the browser, and user data is not sold or shared.

## Update Flow

- Update `src/manifest.json` when the release version changes.
- Run the local `./scripts/release.sh` helper from the checkout where it exists to create a fresh `dist/tbr-<version>.zip`.
- Update the listing copy or privacy answers if permissions or behavior change.
- Upload the new archive and resubmit through the store dashboard.

## Edge Add-Ons

The same generated `.zip` is the starting point for Microsoft Edge Add-ons submissions through Partner Center.
