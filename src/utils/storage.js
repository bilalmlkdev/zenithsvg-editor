const STORAGE_KEY = 'pathcraft_saved_projects_v1';

export const getSavedProjects = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to load projects from storage:', err);
    return [];
  }
};

export const saveProjectToStorage = (project) => {
  try {
    const projects = getSavedProjects();
    const existingIndex = projects.findIndex(p => p.id === project.id);

    if (existingIndex >= 0) {
      projects[existingIndex] = { ...project, updatedAt: new Date().toISOString() };
    } else {
      projects.unshift({ ...project, id: Date.now().toString(), createdAt: new Date().toISOString() });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return projects;
  } catch (err) {
    console.error('Failed to save project:', err);
    return [];
  }
};

export const deleteProjectFromStorage = (id) => {
  try {
    const projects = getSavedProjects().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return projects;
  } catch (err) {
    console.error('Failed to delete project:', err);
    return [];
  }
};
