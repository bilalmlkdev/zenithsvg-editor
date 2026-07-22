import { useState, useEffect } from 'react';

// Possible values: 'light' | 'dark' | 'system'
const STORAGE_KEY = 'pathcraft_theme';

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(resolved) {
  const root = document.documentElement;
  if (resolved === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'light';
  });

  // The actual resolved theme
  const resolved = theme === 'system' ? getSystemTheme() : theme;

  useEffect(() => {
    applyTheme(resolved);
  }, [resolved]);

  // Listen for OS-level theme changes when mode is 'system'
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme(getSystemTheme());
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = (val) => {
    localStorage.setItem(STORAGE_KEY, val);
    setThemeState(val);
  };

  return { theme, setTheme, resolved };
}
