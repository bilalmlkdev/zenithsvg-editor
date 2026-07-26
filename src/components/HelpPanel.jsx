export default function HelpPanel() {
  return (
    <div className="w-full h-full flex flex-col bg-transparent border-l border-gray-200 dark:border-gray-800 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">
          SVG Studio Documentation
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          A quick guide on how to use the workspace features and tools.
        </p>
      </div>

      <div className="space-y-6 text-xs text-gray-600 dark:text-gray-300 flex-1">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wide text-[11px]">
            Core Features
          </h3>
          <ul className="space-y-2 pl-4 list-disc">
            <li>
              <strong className="text-gray-900 dark:text-white">
                New Template:
              </strong>{" "}
              Resets the editor to a clean, default SVG layout structure.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Open File:
              </strong>{" "}
              Upload any local{" "}
              <code className="font-mono text-gray-500 dark:text-gray-400">
                .svg
              </code>{" "}
              file directly into the editor.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Export & Download:
              </strong>{" "}
              Save your design as a vector{" "}
              <code className="font-mono text-gray-500 dark:text-gray-400">
                .svg
              </code>{" "}
              or a raster{" "}
              <code className="font-mono text-gray-500 dark:text-gray-400">
                .png
              </code>{" "}
              image.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Save Project:
              </strong>{" "}
              Stores your active code securely to your browser's LocalStorage.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wide text-[11px]">
            Workspace & Preview
          </h3>
          <ul className="space-y-2 pl-4 list-disc">
            <li>
              <strong className="text-gray-900 dark:text-white">
                Layout Modes:
              </strong>{" "}
              Toggle between <strong>Show Both</strong>,{" "}
              <strong>Hide Preview</strong>, or{" "}
              <strong>Hide Code Editor</strong> via the layout controls.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Editor Preferences:
              </strong>{" "}
              Adjust font sizing, line numbers, word-wrap rules, and minimap
              settings.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Pan & Zoom:
              </strong>{" "}
              Drag inside the preview panel to pan around or scroll/pinch to
              zoom in and out.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Background Switcher:
              </strong>{" "}
              Switch the preview background between transparent, white, light
              gray, and dark slate.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
