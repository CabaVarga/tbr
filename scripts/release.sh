#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"
SRC_DIR="$ROOT_DIR/src"

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
  if [[ ! -f "$SRC_DIR/$path" ]]; then
    echo "error: missing required file: src/$path" >&2
    exit 1
  fi
done

BUMP_KIND="${1:-}"
if [[ -n "$BUMP_KIND" && "$BUMP_KIND" != "major" && "$BUMP_KIND" != "minor" && "$BUMP_KIND" != "patch" ]]; then
  echo "usage: ./scripts/release.sh [major|minor|patch]" >&2
  exit 1
fi

read_version() {
  python3 - <<'PY'
import json
from pathlib import Path

manifest = json.loads(Path("src/manifest.json").read_text())
version = manifest.get("version", "")
parts = version.split(".")
if len(parts) != 3 or any(not part.isdigit() for part in parts):
    raise SystemExit("error: manifest version must be semantic x.y.z")
print(version)
PY
}

bump_version() {
  python3 - "$1" <<'PY'
import json
import sys
from pathlib import Path

bump = sys.argv[1]
path = Path("src/manifest.json")
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
path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
print(manifest["version"])
PY
}

VERSION="$(read_version)"
if [[ -n "$BUMP_KIND" ]]; then
  VERSION="$(bump_version "$BUMP_KIND")"
fi

mkdir -p dist
ARTIFACT_REL="dist/tbr-$VERSION.zip"
ARTIFACT="$ROOT_DIR/$ARTIFACT_REL"
rm -f "$ARTIFACT"

(
  cd "$SRC_DIR"
  python3 - "$ARTIFACT" "${REQUIRED_FILES[@]}" <<'PY'
import sys
from zipfile import ZipFile

artifact = sys.argv[1]
paths = sys.argv[2:]

with ZipFile(artifact, "w") as archive:
    for path in paths:
        archive.write(path, arcname=path)
PY
)

echo "created $ARTIFACT_REL"
