const WARN_MIN = 1, WARN_MAX = 50;
const DANGER_MIN = 2, DANGER_MAX = 100;

const DEFAULT_SETTINGS = {
  badge: true,
  pageBorder: false,
  dynamicIcon: false,
  warnAt: 10,
  dangerAt: 20,
};

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
  const settings = await loadSettings();

  const countEl = document.getElementById("count");
  const messageEl = document.getElementById("message");

  countEl.textContent = count;
  countEl.className = "";
  messageEl.className = "";

  if (count >= settings.dangerAt) {
    countEl.classList.add("danger");
    messageEl.classList.add("danger");
    messageEl.textContent = "Way too many tabs!";
  } else if (count >= settings.warnAt) {
    countEl.classList.add("warn");
    messageEl.classList.add("warn");
    messageEl.textContent = "Getting out of hand...";
  } else {
    countEl.classList.add("ok");
    messageEl.textContent = "Looking good.";
  }

  // Apply settings to controls
  for (const key of TOGGLES) {
    document.getElementById("opt-" + key).checked = settings[key];
  }
  document.getElementById("limit-warn").value = settings.warnAt;
  document.getElementById("limit-danger").value = settings.dangerAt;
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

function bindLimits() {
  const warnEl = document.getElementById("limit-warn");
  const dangerEl = document.getElementById("limit-danger");

  warnEl.addEventListener("change", async () => {
    const settings = await loadSettings();
    const val = parseInt(warnEl.value, 10);
    if (val >= WARN_MIN && val <= WARN_MAX && val < settings.dangerAt) {
      settings.warnAt = val;
      await saveSettings(settings);
      render();
    } else {
      warnEl.value = settings.warnAt;
    }
  });

  dangerEl.addEventListener("change", async () => {
    const settings = await loadSettings();
    const val = parseInt(dangerEl.value, 10);
    if (val >= DANGER_MIN && val <= DANGER_MAX && val > settings.warnAt) {
      settings.dangerAt = val;
      await saveSettings(settings);
      render();
    } else {
      dangerEl.value = settings.dangerAt;
    }
  });
}

document.getElementById("settings-toggle").addEventListener("click", () => {
  const toggle = document.getElementById("settings-toggle");
  const panel = document.getElementById("settings");
  toggle.classList.toggle("open");
  panel.classList.toggle("collapsed");
});

render();
bindToggles();
bindLimits();
