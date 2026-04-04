const WARN_THRESHOLD = 10;
const DANGER_THRESHOLD = 20;

const COLOR_DEFAULT = "#6B7280";
const COLOR_WARN = "#F59E0B";
const COLOR_DANGER = "#EF4444";

async function getTabCount() {
  const tabs = await chrome.tabs.query({});
  return tabs.length;
}

async function updateBadge() {
  const count = await getTabCount();
  const text = String(count);

  let color;
  if (count >= DANGER_THRESHOLD) {
    color = COLOR_DANGER;
  } else if (count >= WARN_THRESHOLD) {
    color = COLOR_WARN;
  } else {
    color = COLOR_DEFAULT;
  }

  await chrome.action.setBadgeText({ text });
  await chrome.action.setBadgeBackgroundColor({ color });
}

let warningWindowId = null;

async function showWarning(newTabId) {
  // Don't stack multiple warning windows
  if (warningWindowId !== null) {
    try {
      await chrome.windows.get(warningWindowId);
      return; // window still open, skip
    } catch {
      warningWindowId = null;
    }
  }

  const url = chrome.runtime.getURL(
    "warning.html?tabId=" + encodeURIComponent(newTabId)
  );
  const win = await chrome.windows.create({
    url,
    type: "popup",
    width: 460,
    height: 320,
    focused: true,
  });
  warningWindowId = win.id;
}

// Clean up warningWindowId when it's closed
chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === warningWindowId) {
    warningWindowId = null;
  }
});

chrome.tabs.onCreated.addListener(async (tab) => {
  await updateBadge();
  const count = await getTabCount();
  if (count >= DANGER_THRESHOLD) {
    showWarning(tab.id);
  }
});

chrome.tabs.onRemoved.addListener(() => {
  // Small delay so the count reflects the removal
  setTimeout(updateBadge, 100);
});

chrome.tabs.onReplaced.addListener(updateBadge);

// Initialize badge on install / startup
chrome.runtime.onInstalled.addListener(updateBadge);
chrome.runtime.onStartup.addListener(updateBadge);
