# Icon Redesign Design

## Goal

Replace the current refreshed icon concept with a corrected store-ready icon that actually matches the approved brief: a shield-first blue icon with a short wide orange tab rising above the top-right area and a visible red outer warning frame.

This design supersedes the earlier assumptions in `docs/superpowers/specs/2026-04-05-icon-refresh-design.md`.

## Current Context

- The current source icon at `store-visuals/icon-source.svg` does not read as a shield first.
- Its silhouette currently lands closer to a rounded document or tab sheet with a folded corner than to the approved concept.
- The previous summary of the icon direction was accepted without reviewing the rendered asset itself, so the actual image drifted away from the intended brief.
- Chrome Web Store guidance still favors simple, recognizable icons that remain legible at small sizes and stay visually consistent with the rest of the listing.

## Scope

### In Scope

- Redesign the icon concept and geometry
- Update the SVG source-of-truth for the icon
- Re-export `16x16`, `48x48`, and `128x128` PNG assets
- Verify the redesigned icon remains simple, recognizable, and legible on transparent backgrounds

### Out Of Scope

- Reworking screenshots or promo graphics as part of the same task
- Changing the extension runtime UI
- Inventing a second icon family or alternate mascot/logo system

## Approved Direction

The icon should use the `T1` refinement from the visual brainstorming pass.

That direction means:

- the primary silhouette is a centered shield
- the main body is blue
- the orange tab is short and wide, sits above the top-right portion of the shield, and starts at the shield centerline
- the red warning cue is not a thin outline stroke; it is a visible outer frame layer behind the blue shield
- the tab interrupts the top run of the red frame rather than sitting beside it

## Visual Construction

### Shield

- The shield is the first thing the eye should read.
- It should not resemble a document, page, or browser window.
- The lower point should feel stable and centered rather than exaggerated or decorative.

### Orange Tab

- The tab should feel like a browser-tab reference, but only as a secondary accent.
- It should be wider than tall.
- It should rise slightly above the shield, positioned slightly right of center.
- Its left edge should align with the horizontal centerline of the shield.
- It should not carry an extra top contour line or bevel line.

### Red Frame

- The red frame should be visible around the shield perimeter as a structural warning shell.
- It should sit behind the blue shield, not as a hairline stroke drawn on top.
- It should remain calm and controlled, not jagged or aggressive.
- The tab should naturally occlude the frame where they overlap.

### Interior Detail

- Keep only one pale-blue highlight shape near the upper shoulder area of the shield.
- Remove the previous extra contour strokes and ambiguous inner curves.
- Do not add extra shadows, wedges, folds, or decorative linework unless required for legibility.

## Style Rules

- Flat with subtle depth only
- No gloss, chrome, or shiny skeuomorphic treatment
- No baked background square
- No perspective tilt
- No tiny strokes that disappear or blur at `16x16`
- Transparent background for exported PNGs

## Scaling Strategy

### `128x128`

- Preserve the full composition with transparent padding appropriate for store use.
- The shield, orange tab, and red frame should all remain clearly distinguishable.

### `48x48`

- Preserve the same overall composition.
- Simplify any edge or highlight geometry that starts to look muddy.

### `16x16`

- Prioritize silhouette over fidelity.
- If any internal detail becomes noise, reduce it to the minimum needed to keep the icon readable.

## Source And Outputs

- Source of truth: `store-visuals/icon-source.svg`
- Export targets:
  - `src/icons/icon16.png`
  - `src/icons/icon48.png`
  - `src/icons/icon128.png`

No parallel or alternate icon source should be introduced unless the export workflow makes the current single-source approach impossible.

## Success Criteria

- The icon reads as a shield first, not a document or generic rounded tile.
- The orange tab is clearly visible, short, and wide.
- The tab begins at the shield centerline and rises slightly above the shield.
- The red frame is visible and supportive without overpowering the blue shield.
- The single pale-blue highlight reads as intentional shape definition rather than noise.
- The icon stays simple, recognizable, and compliant-looking at `16x16`, `48x48`, and `128x128`.

## Risks And Mitigations

- Risk: the tab becomes too decorative or too much like a floating sticker.
  Mitigation: keep it structurally attached to the shield silhouette and avoid extra linework.

- Risk: the red frame becomes too dominant and turns the icon into a warning badge instead of a product icon.
  Mitigation: keep the blue shield as the primary mass and let the red layer act as a backing frame.

- Risk: subtle details collapse at `16x16`.
  Mitigation: validate small-size readability and simplify geometry rather than preserving full-detail fidelity.
