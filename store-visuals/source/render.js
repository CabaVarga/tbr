const SCENES = {
  popup: {
    width: 1280,
    height: 800,
    layout: "screenshot",
    eyebrow: "Tab budget control",
    headline: "Your tabs need a budget.",
    subtitle:
      "Set a limit, watch the warning colors climb, and stop the browser clutter before it gets absurd.",
    chips: [
      { text: "warning thresholds", tone: "warn" },
      { text: "interrupt new tabs", tone: "danger" }
    ],
    detailCards: [
      { title: "Live count", body: "The popup shows the number immediately, without ceremony." },
      { title: "Escalation", body: "Calm turns to warning, then danger, before the tab pile drifts further." },
      { title: "Pressure", body: "The visuals stay disciplined until they need to stop being polite." }
    ],
    tabs: ["Inbox (94)", "Weekend trip", "Read later", "New headphones", "That video", "+22 more"],
    address: "https://mail.example.test/inbox",
    borderMode: "danger-frame",
    primaryCard: {
      title: "Personal distraction spiral",
      body:
        "Articles for later, shopping tabs you swear you are comparing carefully, travel ideas, videos, and inbox tabs all in one place.",
      lines: ["long", "medium", "long", "short"]
    },
    secondaryCard: {
      title: "Why it works",
      bullets: [
        "The clutter is visible before it feels urgent.",
        "The popup stays quick to read.",
        "The color shift makes denial harder."
      ]
    },
    device: {
      type: "popup",
      count: "27",
      countTone: "danger",
      message: "Way too many tabs!",
      messageTone: "danger"
    }
  },
  warning: {
    width: 1280,
    height: 800,
    layout: "screenshot",
    eyebrow: "Danger threshold reached",
    headline: "The extension interrupts the spiral.",
    subtitle:
      "Opening another tab over your danger threshold triggers a blunt warning window with a clear decision.",
    chips: [
      { text: "blunt warning", tone: "danger" },
      { text: "keep or close", tone: "warn" }
    ],
    detailCards: [
      { title: "One job", body: "The warning window exists to make the next tab opening slightly inconvenient." },
      { title: "No auto-close", body: "You still choose. The extension just stops pretending this is a good idea." },
      { title: "Fast read", body: "Strong wording, simple options, nothing buried." }
    ],
    tabs: ["Travel plans", "Packing list", "YouTube", "Shopping cart", "Recipe", "+21 more"],
    address: "https://video.example.test/watch-later",
    primaryCard: {
      title: "Another tab too many",
      body:
        "The warning arrives when the number is already in the danger zone and you try to add just one more tab to the pile.",
      lines: ["long", "long", "medium", "short"]
    },
    secondaryCard: {
      title: "Designed to interrupt",
      bullets: [
        "The message is direct on purpose.",
        "The user can keep the tab if it is actually needed.",
        "The moment feels costly enough to notice."
      ]
    },
    device: {
      type: "warning",
      title: "Do you REALLY need another tab?",
      copy: "You have 27 tabs open. That's too many. You know it."
    }
  },
  settings: {
    width: 1280,
    height: 800,
    layout: "screenshot",
    eyebrow: "Set your own limits",
    headline: "Tune the pressure.",
    subtitle:
      "Choose when the warning starts, when the danger state kicks in, and which cues should push back.",
    chips: [
      { text: "custom thresholds", tone: "warn" },
      { text: "visual cues", tone: "danger" }
    ],
    detailCards: [
      { title: "Adjustable", body: "Warning and danger thresholds are small enough to use and easy to change." },
      { title: "Selective", body: "Badge, page border, and icon cues can be mixed to suit your tolerance." },
      { title: "Local", body: "The settings stay in browser storage and do not require any account." }
    ],
    tabs: ["Inbox", "Read later", "Budget sheet", "Hotel tab", "News", "+19 more"],
    address: "https://docs.example.test/tab-budget",
    primaryCard: {
      title: "Threshold tuning",
      body:
        "The settings panel expands inside the popup so the budget is easy to adjust without introducing a separate full-page options screen.",
      lines: ["long", "medium", "long", "short"]
    },
    secondaryCard: {
      title: "Current defaults",
      bullets: [
        "Warning at 10 tabs",
        "Danger at 20 tabs",
        "Visual cues can be toggled independently"
      ]
    },
    device: {
      type: "settings",
      count: "14",
      countTone: "warn",
      message: "Getting out of hand...",
      messageTone: "warn"
    }
  },
  work: {
    width: 1280,
    height: 800,
    layout: "screenshot",
    eyebrow: "Works for real work too",
    headline: "The overload counts even when it looks productive.",
    subtitle:
      "Issues, docs, dashboards, pull requests, and tickets still add up to the same tab problem when the window gets crowded enough.",
    chips: [
      { text: "work overload", tone: "warn" },
      { text: "same guardrails", tone: "danger" }
    ],
    detailCards: [
      { title: "Not just distraction", body: "The extension is just as useful when the pile comes from work context switching." },
      { title: "Same thresholds", body: "It does not care whether the tabs are leisure or legitimate." },
      { title: "Visible debt", body: "The browser clutter becomes obvious before it becomes normal." }
    ],
    tabs: ["PR #91", "Issue 441", "Runbook", "Dashboard", "Docs", "+18 more"],
    address: "https://github.example.test/org/repo/pull/91",
    borderMode: "danger-frame",
    primaryCard: {
      title: "Work overload scenario",
      body:
        "Documentation, monitoring, issue triage, and pull requests can still overwhelm the browser even when every tab feels defensible.",
      lines: ["long", "medium", "long", "medium"]
    },
    secondaryCard: {
      title: "Same extension, different context",
      bullets: [
        "The warning logic stays identical.",
        "The tab count is still the point.",
        "The tool works without turning into a task manager."
      ]
    },
    device: {
      type: "popup",
      count: "24",
      countTone: "danger",
      message: "Way too many tabs!",
      messageTone: "danger"
    }
  },
  tile: {
    width: 440,
    height: 280,
    layout: "promo",
    eyebrow: "tbr",
    headline: "Your tabs need a budget.",
    subtitle: "",
    chips: [],
    detailCards: [],
    promo: {
      count: "27",
      label: "tabs open",
      message: "Way too many tabs!"
    }
  },
  marquee: {
    width: 1400,
    height: 560,
    layout: "marquee",
    eyebrow: "tbr",
    headline: "Your tabs need a budget.",
    subtitle:
      "Escalating warnings that make browser overload hard to ignore.",
    chips: [],
    detailCards: [],
    promo: {
      count: "27",
      label: "tabs open",
      message: "Way too many tabs!"
    }
  }
};

function renderChips(chips) {
  return chips
    .map((chip) => `<span class="chip ${chip.tone}">${chip.text}</span>`)
    .join("");
}

function renderDetailCards(cards) {
  if (!cards.length) {
    return "";
  }

  return `
    <div class="detail-strip">
      ${cards
        .map(
          (card) => `
            <div class="detail-card">
              <strong>${card.title}</strong>
              <span>${card.body}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderTabs(tabs) {
  return tabs
    .map((tab, index) => `<div class="tab${index === 0 ? " active" : ""}">${tab}</div>`)
    .join("");
}

function renderLines(lines) {
  return `
    <div class="page-lines">
      ${lines.map((size) => `<div class="page-line ${size}"></div>`).join("")}
    </div>
  `;
}

function renderBullets(bullets) {
  return `
    <div class="bullet-list">
      ${bullets.map((bullet) => `<div class="bullet">${bullet}</div>`).join("")}
    </div>
  `;
}

function renderPopupDevice(device) {
  const settingsMarkup =
    device.type === "settings"
      ? `
        <div class="settings-toggle">Settings</div>
        <div class="settings-panel">
          <div class="settings-group-title">Warnings</div>
          <div class="setting-row"><span>Badge color</span><span class="toggle"></span></div>
          <div class="setting-row"><span>Page border</span><span class="toggle"></span></div>
          <div class="setting-row"><span>Icon color</span><span class="toggle"></span></div>
          <div class="settings-group-title">Thresholds</div>
          <div class="limit-row"><span>Warning at</span><span class="limit-pill">10</span></div>
          <div class="limit-row"><span>Danger at</span><span class="limit-pill">20</span></div>
        </div>
      `
      : "";

  return `
    <div class="popup-device">
      <div class="popup-frame">
        <div class="popup-count ${device.countTone}">${device.count}</div>
        <div class="popup-label">open tabs</div>
        <div class="popup-message ${device.messageTone}">${device.message}</div>
        ${settingsMarkup}
      </div>
    </div>
  `;
}

function renderWarningDevice(device) {
  return `
    <div class="warning-card">
      <div class="warning-icon">⚠</div>
      <div class="warning-title">${device.title}</div>
      <div class="warning-copy">${device.copy}</div>
      <div class="warning-actions">
        <div class="btn-primary">Close the new tab</div>
        <div class="btn-ghost">I need this tab</div>
      </div>
    </div>
  `;
}

function renderDevice(device) {
  if (device.type === "warning") {
    return renderWarningDevice(device);
  }

  return renderPopupDevice(device);
}

function renderBrandMark() {
  return `
    <svg
      class="brand-mark"
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="brand-shield-blue" x1="30" y1="18" x2="95" y2="111" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#94DAFF"></stop>
          <stop offset="1" stop-color="#447FD5"></stop>
        </linearGradient>
        <linearGradient id="brand-tab-orange" x1="64" y1="15" x2="108" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#FFC860"></stop>
          <stop offset="1" stop-color="#F08A1E"></stop>
        </linearGradient>
        <linearGradient id="brand-shoulder-highlight" x1="46" y1="30" x2="75" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#F0FAFF" stop-opacity="0.9"></stop>
          <stop offset="1" stop-color="#C3E7FF" stop-opacity="0.2"></stop>
        </linearGradient>
      </defs>

      <path
        d="M64 17C74.3 25.7 88.1 30 99 30V61C99 82.6 85.9 99.4 64 112C42.1 99.4 29 82.6 29 61V30C39.9 30 53.7 25.7 64 17Z"
        fill="#E3493D"
      ></path>
      <path
        d="M64 22.4C72.8 29.4 84.4 33 92.8 33V60.9C92.8 79.5 81.7 94.3 64 105C46.3 94.3 35.2 79.5 35.2 60.9V33C43.6 33 55.2 29.4 64 22.4Z"
        fill="url(#brand-shield-blue)"
      ></path>
      <path
        d="M44.4 35.6C53.6 33.9 60.7 29.5 64 26.9C68 29.8 74 33.4 82.1 35.1C80.8 39 77 41.8 72.7 41.8H53.4C49 41.8 45.5 39.2 44.4 35.6Z"
        fill="url(#brand-shoulder-highlight)"
      ></path>
      <path
        d="M64 16H100C104.4 16 108 19.6 108 24V32H71.3C67.3 32 64 28.7 64 24.7V16Z"
        fill="url(#brand-tab-orange)"
      ></path>
    </svg>
  `;
}

function renderPromoArt(scene) {
  const supportMarkup = scene.promo.support
    ? `<p class="promo-support">${scene.promo.support}</p>`
    : "";

  return `
    <div class="promo-art">
      <div class="promo-halo promo-halo-warn"></div>
      <div class="promo-halo promo-halo-danger"></div>
      <div class="promo-tabs-band">
        <span>Inbox</span>
        <span>Docs</span>
        <span>Read later</span>
        <span>Trip</span>
        <span>+22</span>
      </div>
      <div class="promo-icon-wrap">
        ${renderBrandMark()}
      </div>
      <div class="promo-count-card">
        <div class="promo-count">${scene.promo.count}</div>
        <div class="promo-count-label">${scene.promo.label}</div>
        <div class="promo-count-message">${scene.promo.message}</div>
      </div>
      <div class="promo-mini-panel">
        <div class="promo-mini-title">Escalating warnings</div>
        <div class="promo-mini-line long"></div>
        <div class="promo-mini-line medium"></div>
        <div class="promo-mini-line short"></div>
      </div>
      ${supportMarkup}
    </div>
  `;
}

function renderScene(scene) {
  if (scene.layout !== "screenshot") {
    return `
      <section class="scene layout-${scene.layout}">
        <div class="hero-panel">
          <div>
            <div class="eyebrow">${scene.eyebrow}</div>
            <h1 class="headline">${scene.headline}</h1>
            ${scene.subtitle ? `<p class="subtitle">${scene.subtitle}</p>` : ""}
          </div>
        </div>
        <div class="illustration-shell">
          ${renderPromoArt(scene)}
        </div>
      </section>
    `;
  }

  const leftCard = `
    <div class="content-card">
      <h3>${scene.primaryCard.title}</h3>
      <p>${scene.primaryCard.body}</p>
      ${renderLines(scene.primaryCard.lines)}
    </div>
  `;

  const rightCard = scene.secondaryCard
    ? `
      <div class="content-card">
        <h3>${scene.secondaryCard.title}</h3>
        ${renderBullets(scene.secondaryCard.bullets)}
      </div>
    `
    : "";

  return `
    <section class="scene layout-${scene.layout}">
      <div class="hero-panel">
        <div>
          <div class="eyebrow">${scene.eyebrow}</div>
          <h1 class="headline">${scene.headline}</h1>
          <p class="subtitle">${scene.subtitle}</p>
          <div class="chips">${renderChips(scene.chips)}</div>
          ${renderDetailCards(scene.detailCards)}
        </div>
      </div>
      <div class="browser-shell">
        <div class="browser">
          <div class="browser-top">
            <div class="toolbar-dots"><span></span><span></span><span></span></div>
            <div class="tab-row">${renderTabs(scene.tabs)}</div>
            <div class="address">${scene.address}</div>
          </div>
          <div class="browser-body ${scene.borderMode || ""}">
            <div class="page-grid">
              <div class="stack">
                ${leftCard}
                ${rightCard}
              </div>
              <div class="floating-device">
                ${renderDevice(scene.device)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

const params = new URLSearchParams(window.location.search);
const sceneName = params.get("scene") || "popup";
const scene = SCENES[sceneName] || SCENES.popup;

document.documentElement.style.setProperty("--scene-width", `${scene.width}px`);
document.documentElement.style.setProperty("--scene-height", `${scene.height}px`);
document.title = `tbr store visual - ${sceneName}`;
document.getElementById("app").innerHTML = renderScene(scene);
