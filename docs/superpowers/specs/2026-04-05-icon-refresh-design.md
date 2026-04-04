# Icon Refresh Design

## Goal

Replace the current extension icons with a store-ready set that reads as cleaner, more intentional, and more compliant with Chrome Web Store icon guidance before packaging the next submission zip.

## Current Context

- The current icon set in `src/icons/` is extremely simple and appears to use a baked-in dark square background rather than transparent padding.
- The Chrome Web Store guidance for the `128x128` icon expects a `96x96` core icon area with transparent padding around it.
- The broader `tbr` visual system is already established:
  - dark, disciplined presentation
  - cool blue base tones are acceptable
  - amber and red represent warning escalation
  - tone is controlled, reviewer-safe, and only mildly sharp
- The user wants the icon to hint at warning/tab control without overdoing it.

## Scope

### In Scope

- Redesign the extension icon concept
- Produce a refreshed icon set for `16x16`, `48x48`, and `128x128`
- Ensure the `128x128` asset uses transparency and proper padding for store submission
- Keep the icon visually compatible with the current store visuals and product tone

### Out Of Scope

- Redesigning the popup or warning window UI
- Replacing the existing screenshots or promo graphics as part of the same task
- Turning the icon into a loud warning symbol or novelty illustration

## Approved Direction

Use a blue tab-shield concept with a warm warning notch.

That means:

- the main form stays simple, front-facing, and predominantly cool blue
- the icon should suggest a tab-like or controlled-browser shape rather than a generic app blob
- a small amber/red accent should imply warning pressure or escalation
- the warning accent should be subtle, not a full hazard icon

## Visual Requirements

- Transparent canvas, especially for `128x128`
- No baked background square
- No heavy shadows
- No perspective tilt
- Strong silhouette at small sizes
- Accent colors limited enough that the icon still reads as disciplined rather than loud

## Scaling Strategy

- `128x128`
  Full store-ready composition with transparent padding and the small warm accent clearly visible
- `48x48`
  Preserve the same core form and accent with simplified detail if needed
- `16x16`
  Reduce to the strongest possible simplified silhouette; readability matters more than full fidelity

## File Responsibilities

- `src/icons/icon16.png`
  Smallest installed icon, optimized for legibility
- `src/icons/icon48.png`
  Mid-size icon for extension surfaces
- `src/icons/icon128.png`
  Store and extension icon with transparent padding and final polished composition

## Validation

- Verify all three icon files remain valid PNGs at the required dimensions
- Verify the `128x128` image uses transparency rather than a solid background square
- Verify the icon reads cleanly on both light and dark backgrounds
- Verify the refreshed icon looks like the same product family as the current store visuals

## Risks And Mitigations

- Risk: the icon becomes too literal or busy
  Mitigation: keep the warning cue to a small notch/accent rather than a full symbol

- Risk: the icon becomes too abstract and still feels generic
  Mitigation: bias the shape toward a tab/control silhouette rather than a pure geometric block
