import { createContext, useCallback, useContext, useRef, useState } from "react";
import { FiCheckCircle, FiAlertTriangle, FiInfo, FiX } from "react-icons/fi";

const ToastContext = createContext(null);

let idCounter = 0;

const ICONS = {
  success: FiCheckCircle,
  error: FiAlertTriangle,
  info: FiInfo,
};

const STYLES = {
  success:
    "bg-emerald-50 dark:bg-emerald-950/90 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900",
  error:
    "bg-red-50 dark:bg-red-950/90 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900",
  info: "bg-gray-50 dark:bg-gray-900/95 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-800",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const toast = useCallback(
    (message, type = "info", duration = 3500) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      timers.current[id] = setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss],
  );

  const value = {
    toast,
    success: (msg, duration) => toast(msg, "success", duration),
    error: (msg, duration) => toast(msg, "error", duration),
    info: (msg, duration) => toast(msg, "info", duration),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
        role="status"
        aria-live="polite"
      >
        {toasts.map(({ id, message, type }) => {
          const Icon = ICONS[type] || FiInfo;
          return (
            <div
              key={id}
              className={`pointer-events-auto flex items-start gap-2.5 max-w-sm px-3.5 py-2.5 rounded-lg border shadow-lg text-xs font-medium animate-[toast-in_0.18s_ease-out] ${STYLES[type]}`}
            >
              <Icon className="w-4 h-4 shrink-0 mt-0.5 stroke-[1.5]" />
              <span className="leading-relaxed">{message}</span>
              <button
                onClick={() => dismiss(id)}
                className="ml-auto shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Dismiss"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
