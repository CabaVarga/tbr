# Privacy Email Obfuscation Design

## Goal

Reduce email harvesting risk on the public privacy page while preserving a direct privacy-contact route for human readers.

## Current Context

- `docs/privacy/index.html` is publicly reachable through GitHub Pages.
- The current page exposes `caba.varga@gmail.com` as both visible text and a `mailto:` link.
- The approved direction is to keep privacy-specific contact available, but not as a clickable link.

## Scope

### In Scope

- Remove the literal `mailto:` link from `docs/privacy/index.html`
- Replace the fully exposed address with non-clickable obfuscated text
- Keep the existing GitHub Issues support path unchanged

### Out Of Scope

- Adding a contact form or backend service
- Introducing JavaScript-based reconstruction of the address
- Changing the broader privacy-policy wording outside the contact line
- Changing the support route away from GitHub Issues

## Approach

Use plain human-readable obfuscation directly in the static HTML:

- replace the linked address with text in the form `caba dot varga at gmail dot com`
- keep the sentence structure intact so the privacy-contact route remains obvious
- avoid `mailto:` and avoid embedding the literal address in page source

This is the lowest-complexity change that meaningfully reduces trivial scraping while keeping the page readable without JavaScript.

## File Responsibility

- `docs/privacy/index.html`
  Holds the public privacy-policy page and the obfuscated privacy-contact text

## Validation

- Verify there is no `mailto:` link in `docs/privacy/index.html`
- Verify the literal full email address no longer appears in static page source
- Verify the privacy-contact sentence remains readable and accurate

## Risks And Mitigations

- Risk: some scrapers can still infer obfuscated addresses
  Mitigation: remove the highest-exposure pattern (`mailto:` plus literal address) while keeping contact usable for humans

- Risk: users may not immediately recognize the obfuscated format
  Mitigation: keep the wording simple and conventional (`dot`, `at`)
