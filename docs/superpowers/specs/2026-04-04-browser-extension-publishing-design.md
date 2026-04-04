# Browser Extension Publishing Design

## Goal

Add a low-friction release workflow to this repository so the extension can be packaged consistently for browser store submission, while documenting the manual Chrome Web Store publishing steps that still happen outside the repo.

## Current Context

- The extension is a plain Manifest V3 bundle with no build step.
- Development already works by loading the repository root as an unpacked extension.
- Publishing currently depends on manual knowledge of which files belong in the upload archive and how to describe the extension in the store listing.

## Scope

### In Scope

- Add a release helper script that packages the extension into a `.zip` file suitable for Chrome Web Store and Microsoft Edge Add-ons uploads.
- Allow the release helper to either package the current manifest version or bump `major`, `minor`, or `patch` before packaging.
- Create repository documentation with a practical publishing checklist for this extension.
- Verify that the generated archive contains only extension files and excludes repository-only files.

### Out of Scope

- Automating store submission through APIs.
- Adding a Node, Make, or other build toolchain.
- Adding screenshots or marketing assets to the repository.
- Changing extension behavior or permissions as part of this task.

## Approach

Use a small shell script in `scripts/` as the single entry point for packaging. The script will rely on `python3`, which is already available in the environment, to read and update `manifest.json` safely and to build the `.zip` archive through `python3 -m zipfile`. This keeps the workflow dependency-light and consistent across environments where `zip` may not be installed.

The publishing checklist will live in `docs/publish.md` and describe the exact packaging command, the required listing assets, the Chrome Web Store dashboard fields that matter for this extension, and the permission rationale derived from the current code.

## File Responsibilities

- `scripts/release.sh`
  Creates the release archive in `dist/`, optionally bumps the manifest version, validates required files, and prints the artifact path.
- `docs/publish.md`
  Documents the store submission checklist and repo-specific packaging guidance.
- `manifest.json`
  May be updated only when the release script is run with a version bump argument.
- `dist/`
  Holds generated release archives and is not part of the uploaded source tree.

## Release Workflow

### Default Packaging

Running the script with no arguments packages the extension using the current version already present in `manifest.json`.

Expected artifact shape:

- `dist/tbr-<version>.zip`

Expected archive contents:

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

Excluded from archive:

- `.git/`
- `.claude/`
- `.codex`
- `CLAUDE.md`
- `docs/`
- `scripts/`
- `dist/`

### Version Bump Mode

Running the script with `major`, `minor`, or `patch` first updates the semantic version in `manifest.json`, then builds the archive using the new version.

Rules:

- `major`: increment major, reset minor and patch to `0`
- `minor`: increment minor, reset patch to `0`
- `patch`: increment patch only
- Any non-`x.y.z` manifest version should fail clearly instead of being rewritten heuristically

## Validation and Failure Behavior

The release helper should fail fast when:

- `python3` is unavailable
- `manifest.json` is missing
- The manifest version is not a simple semantic version
- A required extension file is missing
- Archive creation fails

The script should print a concise success message with the final version and archive path when packaging succeeds.

## Documentation Content

`docs/publish.md` should include:

- How to run the release helper for package-only and version-bump releases
- Which files are included in the upload archive
- A pre-submission checklist for Chrome Web Store publication
- Required listing assets and metadata to prepare outside the repo
- Privacy and permission rationale based on the current manifest and code:
  - `tabs` for counting tabs and reacting to tab events
  - `storage` for saved settings
  - `scripting` and `<all_urls>` for border CSS injection on active tabs
- Update flow for subsequent releases

## Testing Strategy

- Run the release script without arguments and confirm a versioned archive is created under `dist/`
- List archive contents and confirm required extension files are present
- Confirm repository-only files are absent from the archive
- Run the release script with a bump argument and confirm `manifest.json` version changes as expected and the artifact name matches

## Risks and Mitigations

- Risk: accidental inclusion of repository files in the store upload
  Mitigation: use an explicit allowlist of packaged files instead of zipping the whole directory

- Risk: environments missing the `zip` binary
  Mitigation: package with `python3 -m zipfile`

- Risk: unexpected manifest version formats
  Mitigation: reject unsupported formats with a clear error message
