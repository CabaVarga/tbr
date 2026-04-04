const COLOR_DEFAULT = "#6B7280";
const COLOR_WARN = "#F59E0B";
const COLOR_DANGER = "#EF4444";

const DEFAULT_SETTINGS = {
  badge: true,
  pageBorder: false,
  dynamicIcon: false,
  warnAt: 10,
  dangerAt: 20,
};

let settings = { ...DEFAULT_SETTINGS };
const ALL_BORDER_COLORS = [COLOR_WARN, COLOR_DANGER];

async function loadSettings() {
  const data = await chrome.storage.local.get("settings");
  settings = { ...DEFAULT_SETTINGS, ...data.settings };
}

async function getTabCount() {
  const tabs = await chrome.tabs.query({});
  return tabs.length;
}

function getColor(count) {
  if (count >= settings.dangerAt) return COLOR_DANGER;
  if (count >= settings.warnAt) return COLOR_WARN;
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
  const isRed = color === COLOR_DANGER;
  const glow = isRed ? `box-shadow: inset 0 0 30px ${color}88, inset 0 0 60px ${color}44;` : `box-shadow: inset 0 0 20px ${color}66;`;
  const anim = isRed
    ? `animation: tbr-pulse 0.6s ease-in-out infinite alternate;`
    : `animation: tbr-pulse 2s ease-in-out infinite alternate;`;
  return `
    @keyframes tbr-pulse {
      from { opacity: 1; }
      to { opacity: 0.4; }
    }
    html::after {
      content: "";
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      border: 6px solid ${color};
      ${glow}
      ${anim}
      pointer-events: none;
      z-index: 2147483647;
    }`;
}

function isInjectable(url) {
  return url && /^https?:\/\//.test(url);
}

async function syncBorderForTab(tabId, color) {
  const targetColor = settings.pageBorder ? color : null;

  // Always remove all possible borders first (idempotent — survives service worker restarts)
  for (const c of ALL_BORDER_COLORS) {
    try {
      await chrome.scripting.removeCSS({ target: { tabId }, css: borderCSS(c) });
    } catch {
      // Tab may not be injectable
    }
  }

  // Inject the correct border if needed
  if (targetColor) {
    try {
      await chrome.scripting.insertCSS({ target: { tabId }, css: borderCSS(targetColor) });
    } catch {
      // Tab may not be injectable
    }
  }
}

async function syncBorderForActiveTab(color) {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (tab && isInjectable(tab.url)) {
    await syncBorderForTab(tab.id, color);
  }
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
  await syncBorderForActiveTab(color);
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
  if (count >= settings.dangerAt) {
    showWarning(tab.id);
  }
});

chrome.tabs.onRemoved.addListener(() => {
  setTimeout(updateVisuals, 100);
});

chrome.tabs.onReplaced.addListener(() => {
  updateVisuals();
});

chrome.tabs.onActivated.addListener(() => {
  updateVisuals();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active && isInjectable(tab.url)) {
    updateVisuals();
  }
});

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
