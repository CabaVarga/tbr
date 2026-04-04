const params = new URLSearchParams(window.location.search);
const newTabId = Number(params.get("tabId"));

async function init() {
  const tabs = await chrome.tabs.query({});
  document.getElementById("count").textContent = tabs.length;
}

document.getElementById("close-tab").addEventListener("click", async () => {
  if (newTabId) {
    try {
      await chrome.tabs.remove(newTabId);
    } catch {
      // Tab may already be closed
    }
  }
  window.close();
});

document.getElementById("keep-tab").addEventListener("click", () => {
  window.close();
});

init();
