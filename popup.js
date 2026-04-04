const WARN_THRESHOLD = 10;
const DANGER_THRESHOLD = 20;

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
}

render();
