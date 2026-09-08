import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "zenithSVG_projects";

function readProjects() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function useSavedProjects() {
  const [projects, setProjects] = useState(readProjects);

  // Keep in sync if another tab changes storage.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setProjects(readProjects());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next) => {
    setProjects(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const deleteProject = useCallback(
    (id) => {
      persist(projects.filter((p) => p.id !== id));
    },
    [projects, persist],
  );

  const renameProject = useCallback(
    (id, name) => {
      persist(projects.map((p) => (p.id === id ? { ...p, name } : p)));
    },
    [projects, persist],
  );

  const refresh = useCallback(() => setProjects(readProjects()), []);

  return { projects, deleteProject, renameProject, refresh };
}
