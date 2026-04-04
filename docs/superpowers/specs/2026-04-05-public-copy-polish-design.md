# Public Copy Polish Design

## Goal

Tighten and align the public-facing wording across `README.md`, `docs/index.html`, and `docs/privacy/index.html` without changing the approved layouts or reopening broader content decisions.

## Current Context

- `README.md` was recently rewritten into a shorter, more visual entrypoint.
- `docs/index.html` is the canonical public landing page and should remain the tone anchor.
- `docs/privacy/index.html` is intentionally flatter and more factual, but some metadata still reads as generic boilerplate.
- The GitHub About box wording is now defined and should be reflected where short product descriptions appear.

## Scope

### In Scope

- Adjust short copy and metadata in `README.md`, `docs/index.html`, and `docs/privacy/index.html`
- Align short product descriptions and support/privacy wording across those public surfaces
- Improve generic `<title>` and `<meta name="description">` values where they can be made more intentional

### Out Of Scope

- Layout or visual redesign
- Major section reordering
- Changing the approved privacy facts or support routes
- Reworking the GitHub Pages structure

## Approach

Use the landing page voice as the anchor:

- direct
- controlled
- slightly sharp, but not jokey

Apply that voice carefully:

- `README.md` should stay more expressive than the privacy page, but avoid copy that feels looser than the landing page
- `docs/index.html` should receive only small wording or metadata tweaks where needed
- `docs/privacy/index.html` should stay concise and factual while gaining more intentional title/description metadata

## File Responsibilities

- `README.md`
  Public repo entrypoint with product-focused copy and links
- `docs/index.html`
  Canonical public landing/support page and tone anchor
- `docs/privacy/index.html`
  Canonical public privacy statement with aligned metadata

## Validation

- Verify the three surfaces use materially consistent product framing
- Verify `README.md` still links to the landing page, privacy page, and GitHub Issues
- Verify `docs/index.html` and `docs/privacy/index.html` both have intentional `<title>` and `<meta name="description">` values
- Verify the privacy page remains factual and does not drift into marketing copy

## Risks And Mitigations

- Risk: the privacy page becomes too promotional
  Mitigation: limit changes there to metadata and small phrasing improvements only

- Risk: alignment work creates repetitive copy across surfaces
  Mitigation: keep the same facts but let each file keep its audience boundary
