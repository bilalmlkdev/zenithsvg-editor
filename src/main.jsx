import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import loader from '@monaco-editor/loader';
import './index.css';
import App from './App.jsx'

// Self-host Monaco from /monaco-vs (synced from node_modules at
// install/build time — see scripts/sync-monaco.cjs) instead of letting
// @monaco-editor/react fetch it from the jsdelivr CDN at runtime. This
// removes a third-party network dependency, which matters for offline/PWA
// use, corporate firewalls, and not leaking editor usage to a third party.
loader.config({ paths: { vs: '/monaco-vs' } });

// The editor web-worker's filename is content-hashed by monaco-editor's own
// build and changes on every version bump, so it's never hardcoded here —
// sync-monaco.cjs records the current one in worker-manifest.json. We wait
// for this before rendering so MonacoEnvironment is guaranteed to be in
// place before the editor route can possibly mount and start loading Monaco.
async function bootstrap() {
  try {
    const res = await fetch('/monaco-vs/worker-manifest.json');
    const { workerFile } = await res.json();
    if (workerFile) {
      self.MonacoEnvironment = {
        getWorkerUrl: () => `/monaco-vs/${workerFile}`,
      };
    }
  } catch {
    // Manifest missing/unreachable: Monaco falls back to its own default
    // worker resolution rather than the app failing to start.
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

bootstrap();
