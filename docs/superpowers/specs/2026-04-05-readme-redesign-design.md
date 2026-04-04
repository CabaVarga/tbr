# README Redesign Design

## Goal

Rewrite `README.md` into a shorter, more visually engaging repo entrypoint that explains what `tbr` does, links to the public site, and feels more like a polished public GitHub README than an internal project note.

## Current Context

- The current `README.md` is accurate but reads as long, dry, and operational.
- The repository now has a public GitHub Pages landing page at `https://cabavarga.github.io/tbr/`.
- Approved public visuals already exist in `docs/assets/store-visuals/`.
- The desired direction is a "normal fancy GitHub README" with emojis, one image, and copy that stays mostly product-focused.
- The user wants only a very small development/setup section.

## Scope

### In Scope

- Restructure `README.md` around a concise product pitch
- Add one committed visual near the top of the README
- Add clear links to the GitHub Pages landing page, privacy page, and support path
- Keep the content centered on product behavior and value
- Reduce technical and packaging detail to a very small bottom section

### Out Of Scope

- Changing the public site itself
- Changing the approved product facts or privacy claims
- Adding badges, shields, or generated analytics widgets
- Expanding the README into a full publishing or contributor guide

## Approach

Use a hero-style README shape:

- title and short punchy description near the top
- one embedded image using the committed promo marquee asset
- a compact quick-links block for site, privacy, and support
- short sections describing what the extension does, how it escalates, and what can be configured
- a brief local-first/privacy reassurance section
- a minimal development section at the bottom covering only `src/` loading and the lack of a build step

The tone should stay direct and readable, with light emoji use to create visual rhythm without turning the README into gimmick copy.

## Content Boundaries

- `README.md` should explain the product and basic local loading
- `docs/index.html` remains the more visual public landing page
- `docs/privacy/index.html` remains the canonical privacy statement

The README should link out to those pages rather than duplicating them in detail.

## File Responsibility

- `README.md`
  Public repo entrypoint focused on product understanding, key links, and minimal setup guidance

## Validation

- Verify the README includes one image from `docs/assets/store-visuals/`
- Verify it links to:
  - `https://cabavarga.github.io/tbr/`
  - `https://cabavarga.github.io/tbr/privacy/`
  - `https://github.com/CabaVarga/tbr/issues`
- Verify the README is materially shorter and more product-focused than the current version
- Verify the small setup section still correctly describes loading `src/` as an unpacked extension with no build step

## Risks And Mitigations

- Risk: the README becomes too decorative and loses clarity
  Mitigation: keep each section short and centered on concrete product behavior

- Risk: technical guidance becomes too thin
  Mitigation: preserve a small bottom section with the only setup details a new developer actually needs
