# Extension Src Layout Design

## Goal

Move the browser extension runtime out of the repository root into a dedicated `src/` directory, while keeping the extension build-free and updating the current documentation so local development and release packaging both use `src/` as the extension source.

## Current Context

- The extension is a plain Manifest V3 bundle with no build step.
- All runtime files currently live at the repository root, with icons under `icons/`.
- Current documentation assumes local development loads the repository root as an unpacked extension.
- Current publishing documentation assumes the upload archive is assembled from root-level runtime files.

## Scope

### In Scope

- Move all extension runtime files into `src/` without adding a build system.
- Preserve the current flat runtime structure inside `src/`.
- Keep the uploaded extension archive root unchanged by packaging the contents of `src/`, not the `src/` folder itself.
- Update current repository documentation that describes the runtime location or packaging inputs.

### Out of Scope

- Reorganizing runtime files into feature-specific subdirectories.
- Changing extension behavior, permissions, or visual assets.
- Rewriting historical planning/spec documents that describe the earlier root-based structure.

## Approach

Use `src/` as the single runtime directory for the extension.

The runtime layout remains intentionally simple:

- `src/manifest.json`
- `src/background.js`
- `src/popup.html`
- `src/popup.js`
- `src/popup.css`
- `src/warning.html`
- `src/warning.js`
- `src/warning.css`
- `src/settings.js`
- `src/icons/`

The manifest continues to reference files relative to itself, so runtime asset paths stay simple after the move. Because `manifest.json` moves into `src/`, icon references remain `icons/...`, the popup remains `popup.html`, and the service worker remains `background.js`.

## File Responsibilities

- `src/`
  The complete unpacked extension runtime used for local Chrome loading and release packaging.
- `README.md`
  The main contributor-facing instructions for local loading and packaging.
- `docs/publish.md`
  The source of truth for release packaging and store-submission preparation.
- `CLAUDE.md`
  Agent-oriented repository guidance reflecting the new runtime location.
- `store-visuals/README.md`
  Store asset notes that reference runtime asset paths where needed.

## Development Flow

Local development remains build-free.

Updated workflow:

1. Open `chrome://extensions`
2. Turn on Developer mode
3. Click `Load unpacked`
4. Select the repository `src/` directory
5. Reload the extension after runtime code changes

This keeps the repository root focused on project metadata, docs, scripts, and store-preparation assets.

## Packaging Flow

Release packaging should use only the contents of `src/`.

The upload archive must contain runtime files at the archive root, including:

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

The upload archive must not contain a top-level `src/` folder. Packaging therefore needs to archive the contents of `src/` rather than zipping the repository root or zipping `src/` as a nested directory.

Repository-only paths remain excluded from release packaging, including:

- `.git/`
- `.claude/`
- `.codex/`
- `docs/`
- `scripts/`
- `release/`
- `store-visuals/`

## Documentation Changes

Current docs should be updated to reflect the new layout:

- `README.md`
  Change local development instructions to load `src/` and change packaging guidance to list `src/` as the runtime source directory.
- `docs/publish.md`
  Change all packaging instructions from root-based runtime files to packaging the contents of `src/`.
- `CLAUDE.md`
  Update development and architecture sections so agent guidance reflects the `src/` runtime location.
- `store-visuals/README.md`
  Update the icon path reference from `icons/icon128.png` to `src/icons/icon128.png`.

Historical documents under `docs/superpowers/` should remain unchanged because they capture the earlier publishing design state rather than current operating instructions.

## Testing Strategy

- Confirm the runtime files exist under `src/` with the expected flat layout.
- Confirm `src/manifest.json` still points to valid runtime assets after the move.
- Confirm the updated docs consistently instruct developers to load `src/` locally.
- Confirm the updated packaging docs consistently describe zipping the contents of `src/` so the archive root contains `manifest.json` and the rest of the runtime files.

## Risks and Mitigations

- Risk: packaging `src/` incorrectly and producing an archive with a nested `src/` directory
  Mitigation: document explicitly that packaging must zip the contents of `src/`, not the folder itself.

- Risk: stale docs continue to tell contributors to load the repository root
  Mitigation: update every current operational document that mentions loading or packaging paths.

- Risk: moving files breaks manifest-relative asset references
  Mitigation: preserve the current flat layout inside `src/` so manifest paths stay unchanged.
