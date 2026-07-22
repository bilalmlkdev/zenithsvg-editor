import { useState, useCallback } from 'react';

export function useHistory(initialState) {
  const [history, setHistory] = useState([initialState]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const pushHistory = useCallback((newState) => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newState]);
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(i => i - 1);
      return history[historyIndex - 1];
    }
    return null;
  }, [historyIndex, history]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(i => i + 1);
      return history[historyIndex + 1];
    }
    return null;
  }, [historyIndex, history]);

  return { history, historyIndex, pushHistory, undo, redo, canUndo: historyIndex > 0, canRedo: historyIndex < history.length - 1 };
}
