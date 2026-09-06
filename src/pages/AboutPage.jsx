import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiMail,
  FiAlertCircle,
  FiGithub,
  FiSend,
} from "react-icons/fi";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="h-full p-8 bg-white dark:bg-black overflow-y-auto flex justify-center">
      <div className="w-full max-w-3xl flex flex-col">
        <button
          onClick={() => navigate("/")}
          className="self-start flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Editor
        </button>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          About
        </h1>

        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong className="text-gray-900 dark:text-white">
            ZenithSVG Editor
          </strong>{" "}
          is a free online SVG code editor with live preview, built for
          designers and developers who work with SVG graphics. Write and edit
          SVG code with syntax highlighting and see changes rendered in real
          time. The editor itself is{" "}
          <strong className="text-gray-900 dark:text-white">
            completely free
          </strong>{" "}
          - no account, no payment, no limits.
        </p>

        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          The tool is designed to be lightweight and fully client‑side,
          leveraging modern web technologies for a smooth editing experience.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
          Developer
        </h2>

        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          Built and maintained by{" "}
          <a
            href="https://github.com/bilalmlkdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            bilalmlkdev
          </a>{" "}
          /{" "}
          <a
            href="https://github.com/bilalmlkdev/zenithsvg-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ZenithSVG Editor
          </a>
          , inspired by the original SVG Studio workflow.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
          Contact &amp; Support
        </h2>

        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
            <FiMail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span>
              Email:{" "}
              <a
                href="mailto:bilalmlkdev@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                bilalmlkdev@gmail.com
              </a>
            </span>
          </div>
          <div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
            <FiAlertCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span>
              Bug reports:{" "}
              <a
                href="https://github.com/bilalmlkdev/zenithsvg-editor/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                GitHub Issues
              </a>
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
          Social
        </h2>

        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
            <FiGithub className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <a
              href="https://github.com/bilalmlkdev/zenithsvg-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub
            </a>
          </div>
          <div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
            <FiSend className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <a
              href="https://t.me/bilalmlkdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Telegram
            </a>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
          Technology &amp; Credits
        </h2>

        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
          ZenithSVG Editor is built with React, Tailwind CSS, Monaco Editor, and
          Vite. We gratefully acknowledge the following open‑source projects and
          services:
        </p>

        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-8">
          <li>
            <a
              href="https://microsoft.github.io/monaco-editor/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Monaco Editor
            </a>{" "}
            - code editor component (VS Code engine)
          </li>
          <li>
            <a
              href="https://github.com/bvaughn/react-resizable-panels"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              react-resizable-panels
            </a>{" "}
            - workspace layout
          </li>
          <li>
            <a
              href="https://github.com/bubkoo/html-to-image"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              html-to-image
            </a>{" "}
            - PNG export functionality
          </li>
          <li>
            <a
              href="https://react-icons.github.io/react-icons/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              react-icons
            </a>{" "}
            - icon set
          </li>
          <li>
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              React
            </a>{" "}
            - UI library
          </li>
          <li>
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Tailwind CSS
            </a>{" "}
            - styling engine
          </li>
          <li>
            <a
              href="https://vitejs.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Vite
            </a>{" "}
            - build tool
          </li>
        </ul>
      </div>
    </div>
  );
}
