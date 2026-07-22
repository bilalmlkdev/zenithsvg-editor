import { useState, useEffect } from 'react';
import { getSavedProjects, saveProjectToStorage, deleteProjectFromStorage } from '../utils/storage';

export function useSavedProjects() {
  const [savedProjects, setSavedProjects] = useState([]);

  useEffect(() => {
    setSavedProjects(getSavedProjects());
  }, []);

  const saveProject = (project) => {
    const updated = saveProjectToStorage(project);
    setSavedProjects(updated);
    return updated;
  };

  const deleteProject = (id) => {
    const updated = deleteProjectFromStorage(id);
    setSavedProjects(updated);
    return updated;
  };

  return { savedProjects, saveProject, deleteProject };
}
