# Browser Extension Publishing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a repo-local release helper that can package the extension for store submission, optionally bump the manifest version, and document the Chrome Web Store publishing checklist.

**Architecture:** Keep the workflow shell-based and dependency-light. `scripts/release.sh` will own validation, optional semantic version bumping, and archive creation through `python3 -m zipfile`, while `docs/publish.md` will document the manual publishing steps and permission rationale for this extension.

**Tech Stack:** Bash, Python 3 standard library, existing Manifest V3 extension files

---

### Task 1: Establish the red state for release packaging

**Files:**
- Test: `scripts/release.sh`
- Test: `dist/`

- [ ] **Step 1: Run the missing release command to confirm the workflow does not exist yet**

```bash
./scripts/release.sh
```

- [ ] **Step 2: Verify the command fails for the expected reason**

Run: `./scripts/release.sh`
Expected: shell error that `./scripts/release.sh` does not exist or is not executable

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/plans/2026-04-04-browser-extension-publishing.md
git commit -m "docs: add publishing workflow implementation plan"
```

### Task 2: Implement the release helper

**Files:**
- Create: `scripts/release.sh`
- Modify: `manifest.json`
- Create: `dist/`

- [ ] **Step 1: Write the failing packaging check**

```bash
bash ./scripts/release.sh
```

Expected before implementation: `bash: ./scripts/release.sh: No such file or directory`

- [ ] **Step 2: Run the failing check and confirm the missing-script error**

Run: `bash ./scripts/release.sh`
Expected: FAIL because the script has not been created yet

- [ ] **Step 3: Write the minimal implementation**

```bash
#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if ! command -v python3 >/dev/null 2>&1; then
  echo "error: python3 is required" >&2
  exit 1
fi

REQUIRED_FILES=(
  "manifest.json"
  "background.js"
  "popup.html"
  "popup.js"
  "popup.css"
  "warning.html"
  "warning.js"
  "warning.css"
  "settings.js"
  "icons/icon16.png"
  "icons/icon48.png"
  "icons/icon128.png"
)

for path in "${REQUIRED_FILES[@]}"; do
  if [[ ! -f "$path" ]]; then
    echo "error: missing required file: $path" >&2
    exit 1
  fi
done

BUMP_KIND="${1:-}"
if [[ -n "$BUMP_KIND" && "$BUMP_KIND" != "major" && "$BUMP_KIND" != "minor" && "$BUMP_KIND" != "patch" ]]; then
  echo "usage: ./scripts/release.sh [major|minor|patch]" >&2
  exit 1
fi

VERSION="$(
  python3 - <<'PY'
import json
from pathlib import Path

manifest = json.loads(Path("manifest.json").read_text())
version = manifest.get("version", "")
parts = version.split(".")
if len(parts) != 3 or any(not part.isdigit() for part in parts):
    raise SystemExit("error: manifest version must be semantic x.y.z")
print(version)
PY
)"

if [[ -n "$BUMP_KIND" ]]; then
  VERSION="$(
    python3 - "$BUMP_KIND" <<'PY'
import json
import sys
from pathlib import Path

bump = sys.argv[1]
path = Path("manifest.json")
manifest = json.loads(path.read_text())
version = manifest.get("version", "")
parts = version.split(".")
if len(parts) != 3 or any(not part.isdigit() for part in parts):
    raise SystemExit("error: manifest version must be semantic x.y.z")

major, minor, patch = map(int, parts)
if bump == "major":
    major += 1
    minor = 0
    patch = 0
elif bump == "minor":
    minor += 1
    patch = 0
else:
    patch += 1

manifest["version"] = f"{major}.{minor}.{patch}"
path.write_text(json.dumps(manifest, indent=2) + "\n")
print(manifest["version"])
PY
  )"
fi

mkdir -p dist
ARTIFACT="dist/tbr-$VERSION.zip"
rm -f "$ARTIFACT"

python3 -m zipfile -c "$ARTIFACT" \
  manifest.json background.js popup.html popup.js popup.css \
  warning.html warning.js warning.css settings.js icons

echo "created $ARTIFACT"
```

- [ ] **Step 4: Run the script and verify packaging passes**

Run: `./scripts/release.sh`
Expected: PASS with output like `created dist/tbr-1.0.0.zip`

- [ ] **Step 5: Run the version bump path and verify manifest/artifact alignment**

Run: `./scripts/release.sh patch`
Expected: PASS with output like `created dist/tbr-1.0.1.zip`, and `manifest.json` version becomes `1.0.1`

- [ ] **Step 6: Commit**

```bash
git add scripts/release.sh manifest.json dist
git commit -m "feat: add extension release helper"
```

### Task 3: Document the publishing checklist

**Files:**
- Create: `docs/publish.md`

- [ ] **Step 1: Write the failing documentation check**

```bash
test -f docs/publish.md
```

Expected before implementation: exit code `1`

- [ ] **Step 2: Run the check and confirm the document is missing**

Run: `test -f docs/publish.md`
Expected: FAIL with exit code `1`

- [ ] **Step 3: Write the minimal documentation**

```markdown
# Publishing

## Build A Release Zip

Run `./scripts/release.sh` to package the current manifest version.
Run `./scripts/release.sh patch` to bump the patch version and package in one step.

The upload archive includes:

- `manifest.json`
- `background.js`
- `popup.html`
- `popup.js`
- `popup.css`
- `warning.html`
- `warning.js`
- `warning.css`
- `settings.js`
- `icons/`

## Chrome Web Store Checklist

- Create the release archive with `./scripts/release.sh`
- Test the unpacked extension in Chrome before upload
- Prepare screenshots, description, and store graphics
- Upload the generated `dist/tbr-<version>.zip`
- Fill out privacy and permissions accurately
- Submit for review

## Permission Rationale

- `tabs`: count tabs and react to tab lifecycle events
- `storage`: persist user settings
- `scripting` and `<all_urls>`: inject warning border CSS into the active tab when enabled
```

- [ ] **Step 4: Run the documentation presence check again**

Run: `test -f docs/publish.md`
Expected: PASS with exit code `0`

- [ ] **Step 5: Commit**

```bash
git add docs/publish.md
git commit -m "docs: add extension publishing checklist"
```

### Task 4: Verify the final workflow

**Files:**
- Verify: `scripts/release.sh`
- Verify: `docs/publish.md`
- Verify: `manifest.json`
- Verify: `dist/tbr-*.zip`

- [ ] **Step 1: Run the packaging workflow fresh**

Run: `./scripts/release.sh`
Expected: PASS and create `dist/tbr-<version>.zip`

- [ ] **Step 2: List archive contents**

Run: `python3 -m zipfile -l dist/tbr-<version>.zip`
Expected: required extension files are present

- [ ] **Step 3: Verify repo-only files are excluded**

Run: `python3 - <<'PY'`

```python
import zipfile

with zipfile.ZipFile("dist/tbr-<version>.zip") as zf:
    names = set(zf.namelist())

for forbidden in ("CLAUDE.md", ".git/", ".claude/", ".codex", "docs/", "scripts/"):
    assert forbidden not in names
```

Expected: PASS with no assertion failures

- [ ] **Step 4: Inspect the publish checklist**

Run: `sed -n '1,220p' docs/publish.md`
Expected: includes release commands, package contents, Chrome Web Store checklist, and permission rationale

- [ ] **Step 5: Commit**

```bash
git add scripts/release.sh docs/publish.md manifest.json dist
git commit -m "chore: verify extension publishing workflow"
```
