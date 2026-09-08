#!/usr/bin/env node
/**
 * Copies monaco-editor's prebuilt "min/vs" AMD bundle into public/monaco-vs
 * so the editor is fully self-hosted (no jsdelivr CDN dependency at
 * runtime — see src/main.jsx). Also records the current build's hashed
 * web-worker filename into public/monaco-vs/worker-manifest.json, since
 * that filename changes on every monaco-editor version bump and must not
 * be hardcoded in source.
 *
 * Runs automatically via the "postinstall" and "prebuild" npm scripts.
 */
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "node_modules", "monaco-editor", "min", "vs");
const DEST = path.join(__dirname, "..", "public", "monaco-vs");

if (!fs.existsSync(SRC)) {
  console.warn("[sync-monaco] monaco-editor/min/vs not found — skipping (did npm install run?)");
  process.exit(0);
}

fs.rmSync(DEST, { recursive: true, force: true });
fs.cpSync(SRC, DEST, { recursive: true });

// Find the hashed editor web-worker entry file inside the assets folder.
const assetsDir = path.join(DEST, "assets");
let workerFile = null;
if (fs.existsSync(assetsDir)) {
  workerFile = fs
    .readdirSync(assetsDir)
    .find((f) => /^editorWebWorkerMain-.*\.js$/.test(f));
}

if (!workerFile) {
  console.warn(
    "[sync-monaco] Could not locate editorWebWorkerMain-*.js in monaco-vs/assets — Monaco may fail to load workers at runtime.",
  );
}

fs.writeFileSync(
  path.join(DEST, "worker-manifest.json"),
  JSON.stringify({ workerFile: workerFile ? `assets/${workerFile}` : null }, null, 2),
);

console.log(`[sync-monaco] Synced Monaco to public/monaco-vs (worker: ${workerFile || "NOT FOUND"})`);
