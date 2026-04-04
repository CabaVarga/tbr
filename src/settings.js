const WARN_MIN = 1, WARN_MAX = 50;
const DANGER_MIN = 2, DANGER_MAX = 100;

const DEFAULT_SETTINGS = {
  badge: true,
  pageBorder: false,
  dynamicIcon: false,
  warnAt: 10,
  dangerAt: 20,
};

async function loadSettings() {
  const data = await chrome.storage.local.get("settings");
  return { ...DEFAULT_SETTINGS, ...data.settings };
}

async function saveSettings(settings) {
  await chrome.storage.local.set({ settings });
}
