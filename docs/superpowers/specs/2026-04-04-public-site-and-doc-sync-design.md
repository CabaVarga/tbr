# Public Site And Doc Sync Design

## Goal

Prepare `tbr` for a public repository and Chrome Web Store submission by:

1. publishing a GitHub Pages-ready public site from `docs/`
2. giving the store privacy policy a stable dedicated URL at `/tbr/privacy/`
3. upgrading `README.md` into a stronger repo entrypoint with light technical context
4. bringing tracked documentation into sync with the current product, release flow, and public-site structure
5. removing store-operator-only docs from version control while preserving them locally

## Current Context

- `main` already contains the integrated store-submission work through commit `a191aa7`.
- The approved store direction is controlled, reviewer-safe, mildly accusatory, with a personal-distraction-first emphasis.
- Final store visuals already exist in `store-visuals/`, including screenshots and promo graphics.
- The repo is currently private, but the intended next state is to make it public after housekeeping.
- `docs/privacy/index.html` already exists as a first draft of the privacy page.
- `docs/publish.md` and `docs/store-listing.md` are currently tracked, but the desired end state is for both to become local-only operator documents kept outside version control.
- `asset-generation-pipeline/` is critically important local-only memory and must remain untouched and local-only.

## Scope

### In Scope

- Add a public landing page at `docs/index.html`
- Refine `docs/privacy/index.html` into the final public privacy-policy page
- Rewrite and substantially improve `README.md`
- Synchronize tracked docs with the current repo state, public-site structure, and release workflow
- Stop tracking `docs/publish.md` and `docs/store-listing.md` while leaving the local files in place
- Document the GitHub Pages assumptions and canonical public URLs in tracked docs that remain in the repo

### Out Of Scope

- Chrome Web Store dashboard submission itself
- Runtime extension feature changes
- Replacing the approved store visuals
- Automating GitHub Pages deployment beyond what GitHub already provides
- Changing or deleting any local-only memory under `asset-generation-pipeline/`

## Hosting Strategy

### GitHub Pages Shape

The public site should be served directly from the repository `docs/` folder through GitHub Pages after the repository is made public.

Planned public URLs:

- landing page: `https://cabavarga.github.io/tbr/`
- privacy policy: `https://cabavarga.github.io/tbr/privacy/`

This keeps the hosting model simple, stable, and easy to reference during store submission.

### Public Surface Area

Using `docs/` as the Pages source means repository documentation under that path may be publicly reachable after Pages is enabled. That is acceptable for this repo once housekeeping is complete and the repository is opened.

The public-facing tracked pages should be intentionally shaped rather than accidental:

- `docs/index.html` is the landing/support page
- `docs/privacy/index.html` is the privacy-policy page

Other tracked docs may still exist in the repo, but the public narrative should be anchored by those two pages.

## Content Model

### Public Landing Page

`docs/index.html` should be visual-first and built around the existing store visuals.

Approved direction:

- use the stronger collage-first layout direction chosen during brainstorming
- lead with the warning-window visual and the line: `You do not need another tab.`
- keep text minimal and product-facing
- keep the same approved mildly accusatory tone used for the store materials
- include GitHub issues as the primary support path
- include a prominent link to the privacy policy

The page should feel like a durable product/support homepage, not a generic README mirror and not a pure marketing splash page.

### Privacy Policy

`docs/privacy/index.html` should remain concise and explicit:

- what browser context the extension can access
- what settings are stored locally
- that functionality is local to the browser
- that there is no remote backend
- that data is not sold or shared
- how to contact or support the project

The privacy-policy language must stay materially consistent with the extension permissions and the Chrome Web Store privacy answers.

### README

`README.md` should become the repo entrypoint rather than a thin overview.

It should include:

- a strong product overview
- the current feature set
- a concise permissions explanation
- a small technical section covering repo structure, local loading, and packaging
- links to the public landing page and privacy policy

The README should still be readable to non-developers, but it should carry slightly more implementation and repo context than the public landing page.

## Content Boundaries

The content split must be explicit to avoid future drift:

- `docs/index.html`
  Canonical user-facing product/support story
- `docs/privacy/index.html`
  Canonical privacy statement for public/store use
- `README.md`
  Canonical repo overview with limited technical context
- other tracked docs
  Secondary operational references that must match the same facts without duplicating the full narrative

The rule is:

- same facts
- different audience
- no accidental contradictions

## Documentation Cleanup

### Files To Remove From Version Control

These files should no longer be tracked:

- `docs/publish.md`
- `docs/store-listing.md`

Desired end state:

- the files remain present locally for operator use
- git stops tracking them
- future local edits stay local

Because `.git/info/exclude` only affects untracked files, implementation must explicitly remove these files from version control without deleting the local copies.

### Tracked Docs To Sync

Tracked documentation should be updated so it reflects:

- the current `src/` layout
- the integrated store visuals in `store-visuals/`
- the public GitHub Pages structure in `docs/`
- the existence of a stable privacy-policy URL path
- the current support path through GitHub issues once the repo is public

The exact set of tracked docs may be small, but they must be internally consistent after the update.

## Visual Direction For The Public Site

The landing page should reuse the approved store visual language rather than invent a second brand system.

Requirements:

- use the committed store visuals directly
- keep a dark, disciplined palette with amber/red emphasis
- preserve the controlled, mildly accusatory tone
- make the warning-window screenshot the emotional anchor
- keep structure strong enough that support and privacy links are easy to find

The selected composition direction is the more aggressive collage-first option from brainstorming, with a slight structural cleanup so the page remains usable as an ongoing support destination.

## File Responsibilities

- `docs/index.html`
  Public landing/support page for GitHub Pages
- `docs/privacy/index.html`
  Public privacy-policy page for the Chrome Web Store URL
- `README.md`
  Primary repo overview
- tracked docs that remain in the repo
  Support the current workflow and mirror the current product facts
- `docs/publish.md`
  Local-only operator doc after untracking
- `docs/store-listing.md`
  Local-only operator doc after untracking

## Validation

### Public Site

- verify the landing page and privacy page render correctly as standalone static pages
- verify links between the landing page, privacy page, GitHub repo, and GitHub issues are correct
- verify the landing page meaningfully uses the committed store visuals

### README And Tracked Docs

- verify product claims match the current extension behavior
- verify permission explanations match the current manifest and implementation
- verify tracked docs consistently describe `src/` as the extension root

### Version-Control Cleanup

- verify `docs/publish.md` and `docs/store-listing.md` are removed from git tracking
- verify both files still exist locally after the change
- verify local ignore rules keep them out of normal git status going forward

## Risks And Mitigations

### Risk: Public/docs content drifts again

Mitigation:

- define a single audience boundary per file
- update README, landing page, and privacy page together in one pass
- treat remaining tracked docs as fact-sync documents, not independent narratives

### Risk: Landing page becomes too much like store art

Mitigation:

- keep the selected collage-first energy
- add clearer support structure below the hero
- make privacy and support links explicit and easy to reach

### Risk: Untracking operator docs accidentally deletes useful local content

Mitigation:

- remove them from version control without deleting the local files
- confirm the files still exist locally after untracking
- preserve local ignore rules immediately after the change
