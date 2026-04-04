# Store Submission Assets Design

## Goal

Prepare the final store-facing assets and release workflow needed to publish `tbr – Tab Budget Reminder` to the Chrome Web Store, in this order:

1. final store visuals in `store-visuals/`
2. listing copy and privacy-policy materials
3. final upload zip
4. optional cleanup of the old worktree

## Current Context

- The extension runtime now lives under `src/`, and local development loads `src/` as the unpacked extension.
- The packaging rule is already established: zip the contents of `src/`, with no top-level `src/` folder in the archive.
- The extension already has a defined visual personality in-product:
  - dark popup UI
  - warning/danger states in amber and red
  - blunt warning-window copy
- `store-visuals/README.md` and `docs/publish.md` still describe placeholders and manual publishing guidance, but the final launch assets and listing materials do not exist yet.
- A local-only `scripts/release.sh` already exists and has been updated to package the `src/` contents correctly. It is intentionally untracked and should remain local-only.

## Scope

### In Scope

- Create the final Chrome Web Store screenshots and promo graphics in `store-visuals/`
- Finalize one approved listing-copy voice for store submission
- Prepare a concise privacy policy suitable for public hosting via GitHub Pages
- Add a repo-hosted privacy-policy page that can become the public Chrome Web Store privacy URL when the repo is opened
- Build the final upload zip using the local `scripts/release.sh`
- Optionally remove the old `extension-src-layout` worktree after the release assets are complete

### Out Of Scope

- Automating Chrome Web Store submission
- Changing the extension’s runtime behavior or permissions
- Reworking the popup or warning-window UI to match the store visuals
- Adding a backend, analytics, or telemetry

## Approved Creative Direction

### Brand Tone

The store presentation should be playfully confrontational, but controlled and reviewer-safe.

Approved tone characteristics:

- sharp
- disciplined
- mildly accusatory
- not loud, jokey, or novelty-app chaotic

Rejected tone characteristics:

- full snark
- meme-heavy humor
- exaggerated aggression

This means the store materials should feel aligned with the existing warning window, but filtered into a more polished and trustworthy store voice.

### Visual Direction

The preferred visual direction is the quieter “Direction A” explored during brainstorming:

- dark, disciplined base palette
- warning amber and danger red as emphasis colors
- real extension UI shown as-is
- lightly staged and polished surrounding compositions
- browser/tab clutter used to communicate overload quickly

The store assets should not look like raw screenshots. They should look like honest product screenshots presented with deliberate framing, clean typography, controlled contrast, and readable browser clutter.

## Asset Strategy

### Screenshot Narrative

The screenshot set should tell one consistent story:

- this extension gives tab overload a visible budget
- it escalates as tab counts rise
- it can interrupt bad browsing habits before they spiral
- it is useful both for distraction-heavy personal browsing and overloaded work sessions

The primary story should be personal distraction. The secondary story should be work overload.

### Content Staging

The staged browser/tab content should look realistic and cluttered rather than generic.

Primary screenshot context:

- saved articles
- videos
- shopping
- travel planning
- inbox
- read-later tabs
- random research spirals

Secondary screenshot context:

- docs
- issues
- dashboards
- PRs
- tickets
- work references

### Final Asset Set

Required final assets:

- `store-visuals/screenshot-01-popup.png`
  Popup in danger state with a live tab count and personal-distraction tab clutter behind it.
- `store-visuals/screenshot-02-warning-window.png`
  Warning window interrupting a cluttered personal browsing session.
- `store-visuals/screenshot-03-settings.png`
  Settings panel expanded with thresholds and warning toggles visible.
- `store-visuals/screenshot-04-work-overload.png`
  Work-oriented overload scenario showing the same product value in a docs/issues/dashboard context.
- `store-visuals/promo-tile-small-440x280.png`
  Final small promo tile using the approved Direction A composition.

Optional but recommended:

- `store-visuals/promo-marquee-1400x560.png`
  A wider adaptation of the same composition if it strengthens the listing.

Do not add a fifth screenshot unless the first four leave a concrete product story gap during review.

## Listing Copy Direction

Only one store-copy voice should be prepared.

The listing copy should:

- match the approved Direction A tone
- describe the extension as a serious utility with attitude
- avoid joke-app framing
- avoid overclaiming self-improvement outcomes
- explain the product plainly enough to satisfy store reviewers

The copy should present:

- a short description
- a full description
- a concise flat feature list for store entry

The copy should consistently reinforce that the extension:

- tracks open tabs
- escalates from calm to warning to danger states
- supports configurable thresholds
- can apply badge, page-border, and icon warnings
- opens an interruption window when the user opens a new tab over the danger threshold

## Privacy Policy Strategy

### Hosting Approach

The privacy policy should be treated as a first-class publishing asset and prepared now for GitHub Pages hosting.

Recommended repo structure:

- `docs/privacy/index.html` as the standalone page designed to be served from GitHub Pages
- a stable URL path that can remain unchanged across releases

The exact final public URL will only exist after the repository is made public and GitHub Pages is enabled, but the repo should contain the complete final page beforehand.

### Policy Position

The privacy policy should be short and explicit because the extension does not use a remote backend and does not intentionally collect personal information for transmission or sale.

The policy must still clearly explain that the extension can access tab and page context locally because it uses:

- `tabs`
- `storage`
- `scripting`
- `<all_urls>`

The page should state:

- what data or browser context the extension can access
- what is stored locally
- that data is not sold or shared
- that there is no remote server/backend
- that the extension’s functionality is local to the browser
- how users can contact the publisher

### Store Privacy Answers

The Chrome Web Store privacy fields and the hosted privacy policy must say the same thing in materially consistent language.

Implementation should prepare concise answer copy for the relevant privacy questions so the dashboard entry is straightforward during submission.

## Release Packaging

The final upload artifact should be built only after the store visuals and listing/privacy materials are in place.

Packaging requirements remain:

- run the local `./scripts/release.sh`
- produce `dist/tbr-<version>.zip`
- ensure the archive root contains the contents of `src/`
- ensure there is no top-level `src/` directory in the final zip

This step should verify the final artifact before submission rather than re-design the packaging workflow.

## Worktree Cleanup

After the release assets and final zip are complete, the old worktree at:

- `/home/cabav/dev/tbr/.worktrees/extension-src-layout`

should be removed only after confirming the current main workspace fully supersedes it.

Cleanup is explicitly optional and should happen last.

## File Responsibilities

- `store-visuals/`
  Final screenshots and promo graphics for the Chrome Web Store listing.
- `store-visuals/README.md`
  Updated from placeholder guidance to reflect the final delivered asset set.
- listing copy document in the repo
  Final short description, full description, and feature list used during store submission.
- `docs/privacy/index.html`
  Public-facing privacy policy content for the store submission URL.
- `docs/publish.md`
  Updated to point to the final privacy-policy path and the final release sequence.
- `dist/`
  Holds the final release artifact generated from the local-only script.

## Testing And Validation

### Visual Assets

- confirm all required files exist in `store-visuals/`
- verify dimensions match Chrome Web Store requirements
- verify text remains readable at store-card scale
- verify the screenshots use the approved Direction A tone consistently

### Listing And Privacy

- verify listing copy matches current extension behavior and permissions
- verify privacy policy language is consistent with the manifest and current code
- verify the privacy-policy page is ready to publish without needing structural rework later

### Release Artifact

- run the local packaging script
- inspect the generated zip contents
- confirm the archive root contains the `src/` files directly

### Cleanup

- only remove the old worktree if the current main workspace already contains everything needed

## Risks And Mitigations

- Risk: visuals become louder or snarkier than the approved tone
  Mitigation: keep Direction A as the explicit visual and copy reference during asset creation

- Risk: listing copy and privacy text drift away from actual permissions
  Mitigation: derive final text directly from `src/manifest.json` and current runtime behavior

- Risk: privacy-policy URL work is postponed until submission time
  Mitigation: create the GitHub Pages-ready policy page now, even if it is not public until the repo opens

- Risk: the final zip is built from the wrong root
  Mitigation: keep using the already-verified local `scripts/release.sh` that packages the contents of `src/`
