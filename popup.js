const WARN_THRESHOLD = 10;
const DANGER_THRESHOLD = 20;
const DEFAULT_SETTINGS = { badge: true, pageBorder: false, dynamicIcon: false };

const TOGGLES = ["badge", "pageBorder", "dynamicIcon"];

async function loadSettings() {
  const data = await chrome.storage.local.get("settings");
  return { ...DEFAULT_SETTINGS, ...data.settings };
}

async function saveSettings(settings) {
  await chrome.storage.local.set({ settings });
}

async function render() {
  const tabs = await chrome.tabs.query({});
  const count = tabs.length;

  const countEl = document.getElementById("count");
  const messageEl = document.getElementById("message");

  countEl.textContent = count;
  countEl.className = "";
  messageEl.className = "";

  if (count >= DANGER_THRESHOLD) {
    countEl.classList.add("danger");
    messageEl.classList.add("danger");
    messageEl.textContent = "Way too many tabs!";
  } else if (count >= WARN_THRESHOLD) {
    countEl.classList.add("warn");
    messageEl.classList.add("warn");
    messageEl.textContent = "Getting out of hand...";
  } else {
    countEl.classList.add("ok");
    messageEl.textContent = "Looking good.";
  }

  // Load and apply settings to toggles
  const settings = await loadSettings();
  for (const key of TOGGLES) {
    document.getElementById("opt-" + key).checked = settings[key];
  }
}

function bindToggles() {
  for (const key of TOGGLES) {
    document.getElementById("opt-" + key).addEventListener("change", async () => {
      const settings = await loadSettings();
      settings[key] = document.getElementById("opt-" + key).checked;
      await saveSettings(settings);
    });
  }
}

render();
bindToggles();
