# Active Tab Border Reconciliation Design

## Goal

Ensure page-border styling always matches the real browser state after any tab lifecycle event or service worker wake: at most one tab may have border styling, and it must be the active tab in the focused window.

## Problem

The current service worker logic updates border styling by syncing only the active tab. That is not sufficient to guarantee correctness because stale border CSS can remain on previously active or background tabs. In an MV3 service worker, any in-memory tracking of "last bordered tab" is fragile because the worker can sleep and lose that state.

## Approved Direction

- Treat page-border styling as a reconciliation problem, not an incremental state-tracking problem
- On each relevant sync, inspect all open tabs across all windows
- Remove stale border CSS from every non-target injectable tab
- Apply the correct border only to the active tab in the focused window when warning or danger mode is active and `pageBorder` is enabled
- If the active tab is not injectable, or if the feature should be off, clear borders everywhere

## Invariant

After every reconciliation run, exactly one of these states must be true:

- No tab has TBR border CSS
- Exactly one tab has TBR border CSS, and it is the active tab in the focused window

Any bordered background tab is a bug, even if it was previously active or the worker recently restarted.

## Reconciliation Model

`src/background.js` should expose one border reconciliation path that is reused by all lifecycle handlers. That path should:

1. Ensure persisted settings are loaded
2. Query all open tabs across all windows
3. Determine the active tab in the focused window
4. Compute the current badge/icon/border severity from the global tab count
5. Remove known TBR border CSS from every other injectable tab
6. Apply the correct warning or danger border only to the target active tab when needed

The reconciliation should be idempotent. Running it repeatedly with the same browser state should converge to the same result without relying on memory of prior runs.

## Event Coverage

The following paths should all funnel into the same reconciliation logic so behavior remains consistent:

- `chrome.tabs.onActivated`
- `chrome.tabs.onCreated`
- `chrome.tabs.onRemoved`
- `chrome.tabs.onReplaced`
- `chrome.tabs.onUpdated` when a relevant active page finishes loading
- `chrome.storage.onChanged` for settings changes
- `chrome.runtime.onInstalled`
- `chrome.runtime.onStartup`
- Any post-wake event that reaches the worker and triggers visual updates

## Performance Constraints

Scanning all tabs on lifecycle events is acceptable for this extension. The extension already queries all tabs for counting, and reconciliation runs only on discrete browser or settings events, not on a polling loop. Correctness is more important than micro-optimizing away a small number of `removeCSS` calls.

The implementation should still avoid unnecessary work where easy to do so:

- Skip CSS operations for non-injectable URLs
- Keep the CSS removal set bounded to the known TBR border variants
- Reuse the same reconciliation path instead of adding event-specific branches

## Testing Requirements

Regression coverage should verify the invariant instead of only checking individual functions. Tests should prove that reconciliation leaves either zero bordered tabs or one correctly bordered active tab.

Required cases:

- Activating a different tab removes the old tab's border and applies the new one
- Create/remove/replace/update events converge to one bordered active tab
- Disabling `pageBorder` clears borders from all tabs
- Dropping below the warning threshold clears borders from all tabs
- A service worker restart/wake followed by a lifecycle event reconciles stale borders away
- Non-injectable tabs never receive border CSS but do not prevent stale borders on other tabs from being removed

## Non-Goals

- Tracking one bordered tab per browser window
- Adding persistent bookkeeping for "last bordered tab"
- Introducing polling or timed cleanup loops
- Changing badge or dynamic icon thresholds beyond reusing the existing severity logic

## Implementation Scope

- Modify `src/background.js` to centralize border reconciliation across all tabs
- Extend `tests/background.test.js` to cover stale-border cleanup and single-target enforcement
- Keep the rest of the extension architecture unchanged unless a small helper extraction is needed to support testability and clearer logic
