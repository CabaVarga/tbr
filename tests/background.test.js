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

function createChromeMock({ settings, allTabs, activeTab }) {
  const insertCSSCalls = [];
  const removeCSSCalls = [];

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
        insertCSSCalls.push(details);
      },
      async removeCSS(details) {
        removeCSSCalls.push(details);
      },
    },
    storage: {
      local: {
        async get(key) {
          assert.equal(key, "settings");
          return { settings };
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
          return [activeTab];
        }
        return allTabs;
      },
    },
    windows: {
      onRemoved: createEvent(),
      async create() {
        return { id: 123 };
      },
      async get() {
        return { id: 123 };
      },
    },
  };

  return { chrome, insertCSSCalls, removeCSSCalls };
}

function bootBackground(overrides = {}) {
  const repoRoot = path.resolve(__dirname, "..");
  const backgroundPath = process.env.TBR_BACKGROUND_PATH
    ? path.resolve(process.env.TBR_BACKGROUND_PATH)
    : path.join(repoRoot, "src", "background.js");
  const { chrome, insertCSSCalls, removeCSSCalls } = createChromeMock({
    settings: {
      badge: true,
      pageBorder: true,
      dynamicIcon: false,
      warnAt: 10,
      dangerAt: 20,
      ...overrides.settings,
    },
    allTabs: overrides.allTabs || Array.from({ length: 12 }, (_, id) => ({ id: id + 1 })),
    activeTab: overrides.activeTab || { id: 1, url: "https://example.com", active: true },
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

  return { chrome, insertCSSCalls, removeCSSCalls };
}

async function triggerFirstListener(event, ...args) {
  assert.equal(event.listeners.length, 1, "expected a single listener");
  const result = event.listeners[0](...args);
  await result;
  await new Promise((resolve) => setTimeout(resolve, 0));
}

test("woken service worker reloads persisted settings before syncing active-tab border", async () => {
  const { chrome, insertCSSCalls } = bootBackground();

  await triggerFirstListener(chrome.tabs.onActivated, { tabId: 1, windowId: 1 });

  assert.equal(insertCSSCalls.length, 1);
  assert.match(insertCSSCalls[0].css, /border: 6px solid #F59E0B/);
});
