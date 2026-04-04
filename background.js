const WARN_THRESHOLD = 10;
const DANGER_THRESHOLD = 20;

const COLOR_DEFAULT = "#6B7280";
const COLOR_WARN = "#F59E0B";
const COLOR_DANGER = "#EF4444";
const COLOR_OK = "#6BCB77";

const DEFAULT_SETTINGS = { badge: true, pageBorder: false, dynamicIcon: false };

let settings = { ...DEFAULT_SETTINGS };
let currentBorderColor = null;

async function loadSettings() {
  const data = await chrome.storage.local.get("settings");
  settings = { ...DEFAULT_SETTINGS, ...data.settings };
}

async function getTabCount() {
  const tabs = await chrome.tabs.query({});
  return tabs.length;
}

function getColor(count) {
  if (count >= DANGER_THRESHOLD) return COLOR_DANGER;
  if (count >= WARN_THRESHOLD) return COLOR_WARN;
  return null;
}

// --- Badge ---

async function updateBadge(count, color) {
  if (settings.badge) {
    await chrome.action.setBadgeText({ text: String(count) });
    await chrome.action.setBadgeBackgroundColor({ color: color || COLOR_DEFAULT });
  } else {
    await chrome.action.setBadgeText({ text: "" });
  }
}

// --- Page Border ---

function borderCSS(color) {
  return `html { border: 6px solid ${color} !important; }`;
}

async function injectableTabs() {
  const tabs = await chrome.tabs.query({});
  return tabs.filter((t) => t.url && /^https?:\/\//.test(t.url));
}

async function updatePageBorder(color) {
  const tabs = await injectableTabs();
  const targetColor = settings.pageBorder ? color : null;

  // Remove old border if color changed or feature disabled
  if (currentBorderColor && currentBorderColor !== targetColor) {
    const css = borderCSS(currentBorderColor);
    for (const tab of tabs) {
      try {
        await chrome.scripting.removeCSS({ target: { tabId: tab.id }, css });
      } catch {
        // Tab may not be injectable (e.g. chrome:// pages)
      }
    }
  }

  // Inject new border
  if (targetColor) {
    const css = borderCSS(targetColor);
    for (const tab of tabs) {
      try {
        await chrome.scripting.insertCSS({ target: { tabId: tab.id }, css });
      } catch {
        // Tab may not be injectable
      }
    }
  }

  currentBorderColor = targetColor;
}

// --- Dynamic Icon ---

function drawIcon(size, color) {
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Draw filled circle
  const center = size / 2;
  const radius = size * 0.42;
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();

  return ctx.getImageData(0, 0, size, size);
}

async function updateIcon(color) {
  if (settings.dynamicIcon && color) {
    await chrome.action.setIcon({
      imageData: {
        16: drawIcon(16, color),
        32: drawIcon(32, color),
      },
    });
  } else {
    // Restore default icon
    await chrome.action.setIcon({
      path: {
        16: "icons/icon16.png",
        48: "icons/icon48.png",
        128: "icons/icon128.png",
      },
    });
  }
}

// --- Main update ---

async function updateVisuals() {
  const count = await getTabCount();
  const color = getColor(count);

  await updateBadge(count, color);
  await updatePageBorder(color);
  await updateIcon(color);
}

// --- Warning popup (20+ tabs) ---

let warningWindowId = null;

async function showWarning(newTabId) {
  if (warningWindowId !== null) {
    try {
      await chrome.windows.get(warningWindowId);
      return;
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

chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === warningWindowId) {
    warningWindowId = null;
  }
});

// --- Event listeners ---

chrome.tabs.onCreated.addListener(async (tab) => {
  await updateVisuals();
  const count = await getTabCount();
  if (count >= DANGER_THRESHOLD) {
    showWarning(tab.id);
  }
});

chrome.tabs.onRemoved.addListener(() => {
  setTimeout(updateVisuals, 100);
});

chrome.tabs.onReplaced.addListener(updateVisuals);

chrome.storage.onChanged.addListener(async (changes) => {
  if (changes.settings) {
    settings = { ...DEFAULT_SETTINGS, ...changes.settings.newValue };
    await updateVisuals();
  }
});

// Initialize
chrome.runtime.onInstalled.addListener(async () => {
  await loadSettings();
  await updateVisuals();
});

chrome.runtime.onStartup.addListener(async () => {
  await loadSettings();
  await updateVisuals();
});
