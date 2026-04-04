# Chrome Web Store Listing Copy

## Title

`tbr – Tab Budget Reminder`

## Short Description

Track open tabs with configurable thresholds and get escalating warnings before your browser gets away from you.

## Full Description

`tbr – Tab Budget Reminder` keeps track of how many tabs you have open and starts pushing back when the count climbs.

Set your own warning and danger thresholds. As you cross them, the extension can change the badge color, tint the icon, draw a warning border around the current page, and eventually interrupt you with a dedicated warning window when you open another tab over the danger threshold.

The goal is simple: make tab overload visible early, then make it annoying enough that you stop pretending the pile is fine.

The default progression is calm, then warning, then danger, with each stage getting harder to ignore as your tab count rises.

## Feature List

- Live tab count in the popup
- Adjustable warning and danger thresholds
- Optional badge-color warning
- Optional page-border warning on the active page
- Optional icon-color warning
- Dedicated warning window when you open a new tab while already over the danger threshold
- Settings stored locally in your browser

## Chrome Web Store Privacy Form

- Does the extension collect personal or sensitive user data for transmission to a remote server?
  No. The extension reads your current tab count live and stores only your warning settings locally in the browser. It does not send that information to a remote server.
- Is user data sold to third parties?
  No.
- Is user data transferred to third parties for purposes unrelated to the extension's core functionality?
  No.
- Does the extension use or transfer user data for creditworthiness or lending purposes?
  No.

## Permission Rationale

- `tabs`: count open tabs, react to tab creation, removal, activation, replacement, and updates, and let the warning window close the newly opened tab if you choose
- `storage`: save warning thresholds and visual warning preferences locally
- `scripting`: inject and remove the optional warning border CSS on the active page
- `<all_urls>`: allow the optional warning border to work on whichever HTTP or HTTPS page is active
