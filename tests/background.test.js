"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function createEvent() {
  const listeners = [];
  return {
    listeners,
    addListener(listener) {
      listeners.push(listener);
    },
  };
}

function tab({
  id,
  windowId,
  active = false,
  url = `https://example.com/${id}`,
  border = false,
}) {
  return { id, windowId, active, url, border };
}

function sortNumbers(values) {
  return [...values].sort((left, right) => left - right);
}

function makeTabs({
  focusedActiveTabId = 1,
  backgroundActiveTabId = 7,
  borderTabIds = [],
  focusedWindowId = 1,
  injectableFocusedTab = true,
} = {}) {
  return Array.from({ length: 12 }, (_, index) => {
    const id = index + 1;
    const windowId = id <= 6 ? 1 : 2;
    const active = id === focusedActiveTabId || id === backgroundActiveTabId;
    const isFocusedActiveTab = id === focusedActiveTabId;
    const url =
      isFocusedActiveTab && !injectableFocusedTab
        ? "chrome://extensions"
        : `https://example.com/${id}`;

    return tab({
      id,
      windowId,
      active,
      url,
      border: borderTabIds.includes(id),
    });
  }).map((currentTab) => ({
    ...currentTab,
    active: currentTab.windowId === focusedWindowId
      ? currentTab.id === focusedActiveTabId
      : currentTab.id === backgroundActiveTabId,
  }));
}

function borderStateAfter(cssOps, initialTabs) {
  const borderedTabs = new Map(
    initialTabs
      .filter((currentTab) => currentTab.border)
      .map((currentTab) => [currentTab.id, currentTab.border])
  );

  for (const op of cssOps) {
    if (op.method === "remove") {
      borderedTabs.delete(op.target.tabId);
    } else if (op.method === "insert") {
      borderedTabs.set(op.target.tabId, true);
    }
  }

  return sortNumbers([...borderedTabs.keys()]);
}

function assertBorderInvariant({ initialTabs, cssOps, expectedBorderedTabIds }) {
  assert.deepEqual(
    borderStateAfter(cssOps, initialTabs),
    sortNumbers(expectedBorderedTabIds)
  );
}

function isInjectableUrl(url) {
  return url && /^https?:\/\//.test(url);
}

function createChromeMock({ settings, tabs, focusedWindowId = 1 }) {
  const cssOps = [];
  let currentSettings = settings;

  function getTab(tabId) {
    const tab = tabs.find((currentTab) => currentTab.id === tabId);
    assert.ok(tab, `expected fixture tab ${tabId} to exist`);
    return tab;
  }

  const chrome = {
    action: {
      async setBadgeText() {},
      async setBadgeBackgroundColor() {},
      async setIcon() {},
    },
    runtime: {
      onInstalled: createEvent(),
      onStartup: createEvent(),
      getURL(relativePath) {
        return `chrome-extension://test/${relativePath}`;
      },
    },
    scripting: {
      async insertCSS(details) {
        const tab = getTab(details.target.tabId);
        if (!isInjectableUrl(tab.url)) {
          throw new Error(`Cannot inject CSS into ${tab.url}`);
        }
        cssOps.push({ method: "insert", ...details });
      },
      async removeCSS(details) {
        const tab = getTab(details.target.tabId);
        if (!isInjectableUrl(tab.url)) {
          throw new Error(`Cannot inject CSS into ${tab.url}`);
        }
        cssOps.push({ method: "remove", ...details });
      },
    },
    storage: {
      local: {
        async get(key) {
          assert.equal(key, "settings");
          return { settings: currentSettings };
        },
        async set() {},
      },
      onChanged: createEvent(),
    },
    tabs: {
      onActivated: createEvent(),
      onCreated: createEvent(),
      onRemoved: createEvent(),
      onReplaced: createEvent(),
      onUpdated: createEvent(),
      async query(queryInfo) {
        if (queryInfo.active) {
          return tabs.filter((currentTab) => {
            if (!currentTab.active) {
              return false;
            }

            if (queryInfo.lastFocusedWindow) {
              return currentTab.windowId === focusedWindowId;
            }

            return true;
          });
        }
        return tabs;
      },
    },
    windows: {
      onRemoved: createEvent(),
      async create() {
        return { id: 123 };
      },
      async get() {
        return { id: focusedWindowId };
      },
    },
  };

  return {
    chrome,
    cssOps,
    setSettings(nextSettings) {
      currentSettings = nextSettings;
    },
  };
}

function bootBackground(overrides = {}) {
  const repoRoot = path.resolve(__dirname, "..");
  const backgroundPath = process.env.TBR_BACKGROUND_PATH
    ? path.resolve(process.env.TBR_BACKGROUND_PATH)
    : path.join(repoRoot, "src", "background.js");
  const { chrome, cssOps, setSettings } = createChromeMock({
    settings: {
      badge: true,
      pageBorder: true,
      dynamicIcon: false,
      warnAt: 10,
      dangerAt: 20,
      ...overrides.settings,
    },
    tabs:
      overrides.tabs ||
      makeTabs({
        focusedActiveTabId: 1,
        backgroundActiveTabId: 7,
      }),
    focusedWindowId: overrides.focusedWindowId || 1,
  });

  const context = vm.createContext({
    chrome,
    console,
    setTimeout,
    clearTimeout,
  });

  context.importScripts = (...relativePaths) => {
    for (const relativePath of relativePaths) {
      const script = fs.readFileSync(path.join(repoRoot, "src", relativePath), "utf8");
      vm.runInContext(script, context, { filename: relativePath });
    }
  };

  const backgroundSource = fs.readFileSync(backgroundPath, "utf8");
  vm.runInContext(backgroundSource, context, { filename: path.basename(backgroundPath) });

  return { chrome, cssOps, setSettings };
}

async function triggerFirstListener(event, ...args) {
  assert.equal(event.listeners.length, 1, "expected a single listener");
  const result = event.listeners[0](...args);
  await result;
  await new Promise((resolve) => setTimeout(resolve, 0));
}

test("woken service worker reloads persisted settings before syncing active-tab border", async () => {
  const { chrome, cssOps } = bootBackground();

  await triggerFirstListener(chrome.tabs.onActivated, { tabId: 1, windowId: 1 });

  const insertOps = cssOps.filter((op) => op.method === "insert");
  assert.equal(insertOps.length, 1);
  assert.match(insertOps[0].css, /border: 6px solid #F59E0B/);
});

test("reconciles stale borders across windows back to the focused active tab", async () => {
  const tabs = makeTabs({
    focusedActiveTabId: 2,
    backgroundActiveTabId: 8,
    borderTabIds: [9],
  });
  const { chrome, cssOps } = bootBackground({ tabs });

  await triggerFirstListener(chrome.tabs.onActivated, { tabId: 2, windowId: 1 });

  assertBorderInvariant({
    initialTabs: tabs,
    cssOps,
    expectedBorderedTabIds: [2],
  });
});

test("clears stale borders when the page-border feature is off", async () => {
  const tabs = makeTabs({
    focusedActiveTabId: 3,
    backgroundActiveTabId: 9,
    borderTabIds: [3, 11],
  });
  const { chrome, cssOps, setSettings } = bootBackground({ tabs });

  setSettings({
    badge: true,
    pageBorder: false,
    dynamicIcon: false,
    warnAt: 10,
    dangerAt: 20,
  });
  await triggerFirstListener(chrome.storage.onChanged, {
    settings: {
      oldValue: { pageBorder: true },
      newValue: { pageBorder: false },
    },
  });

  assertBorderInvariant({
    initialTabs: tabs,
    cssOps,
    expectedBorderedTabIds: [],
  });
});

test("clears stale borders when the focused active tab is not injectable", async () => {
  const tabs = makeTabs({
    focusedActiveTabId: 4,
    backgroundActiveTabId: 10,
    borderTabIds: [11],
    injectableFocusedTab: false,
  });
  const { chrome, cssOps } = bootBackground({ tabs });

  await triggerFirstListener(chrome.tabs.onActivated, { tabId: 4, windowId: 1 });

  assertBorderInvariant({
    initialTabs: tabs,
    cssOps,
    expectedBorderedTabIds: [],
  });
});
