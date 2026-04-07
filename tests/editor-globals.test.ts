/// <reference path="../src/editor-globals.d.ts" />

let settings = { ...DEFAULT_SETTINGS };

async function verifyBackgroundGlobals() {
  const loadedSettings = await loadSettings();
  settings = loadedSettings;
  await saveSettings(loadedSettings);
}

const limits = [WARN_MIN, WARN_MAX, DANGER_MIN, DANGER_MAX];

export { settings, verifyBackgroundGlobals, limits };
