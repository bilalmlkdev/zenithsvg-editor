import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSearch,
  FiFolder,
  FiDatabase,
  FiTrash2,
  FiEdit2,
  FiUpload,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { useSavedProjects } from "../hooks/useSavedProjects";
import { useToast } from "../context/ToastContext";
import { useConfirm } from "../context/ConfirmContext";
import SvgThumbnail from "../components/Files/SvgThumbnail";

export default function FilesPage() {
  const navigate = useNavigate();
  const { projects, deleteProject, renameProject } = useSavedProjects();
  const toast = useToast();
  const confirm = useConfirm();

  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const totalFiles = projects.length;
  const totalBytes = projects.reduce((acc, file) => acc + file.code.length, 0);

  const filteredFiles = useMemo(() => {
    if (!searchTerm.trim()) return projects;
    const term = searchTerm.toLowerCase();
    return projects.filter((file) => {
      const name = (file.name || "Untitled").toLowerCase();
      const date = (file.date || "").toLowerCase();
      return name.includes(term) || date.includes(term);
    });
  }, [projects, searchTerm]);

  const handleLoad = (file) => {
    localStorage.setItem("zenith_svg_code", JSON.stringify(file.code));
    toast.success(`Loaded "${file.name || "Untitled"}" into the editor`);
    navigate("/");
  };

  const handleDelete = async (file) => {
    const ok = await confirm(
      `This will permanently delete "${file.name || "Untitled"}". This can't be undone.`,
      { title: "Delete project?", confirmLabel: "Delete" },
    );
    if (ok) {
      deleteProject(file.id);
      toast.success("Project deleted");
    }
  };

  const startRename = (file) => {
    setEditingId(file.id);
    setEditingName(file.name || "Untitled");
  };

  const commitRename = (file) => {
    const trimmed = editingName.trim();
    if (!trimmed) {
      toast.error("Name can't be empty.");
      return;
    }
    renameProject(file.id, trimmed);
    setEditingId(null);
    toast.success("Renamed");
  };

  return (
    <div className="h-full p-8 bg-white dark:bg-black overflow-y-auto flex justify-center">
      <div className="w-full max-w-3xl flex flex-col">
        <button
          onClick={() => navigate("/")}
          className="self-start flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Editor
        </button>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Saved Projects
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          View, rename, reopen, or delete your locally stored SVG projects.
          These live only in this browser.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center gap-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full">
              <FiFolder className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Projects
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {totalFiles}
              </p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center gap-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
              <FiDatabase className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Size
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {totalBytes > 1024
                  ? `${(totalBytes / 1024).toFixed(1)} KB`
                  : `${totalBytes} bytes`}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 stroke-[1.5]" />
          <input
            type="text"
            placeholder="Search by project name or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        {filteredFiles.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {projects.length === 0
                ? "No saved files yet. Use the Save button in the editor toolbar!"
                : "No projects match your search."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="p-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900/30 flex items-center gap-3 hover:border-orange-300 dark:hover:border-orange-700 transition-colors"
              >
                <div className="w-12 h-12 shrink-0 rounded-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-1">
                  <SvgThumbnail code={file.code} className="w-full h-full" />
                </div>

                <div className="flex-1 min-w-0">
                  {editingId === file.id ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        autoFocus
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") commitRename(file);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                        className="w-full px-2 py-1 text-sm bg-white dark:bg-black border border-orange-400 rounded-md text-gray-900 dark:text-gray-100 focus:outline-none"
                      />
                      <button
                        onClick={() => commitRename(file)}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-md"
                        title="Save name"
                      >
                        <FiCheck className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md"
                        title="Cancel"
                      >
                        <FiX className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 truncate">
                        {file.name || "Untitled"}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {file.date}
                      </p>
                    </>
                  )}
                </div>

                <span className="hidden sm:inline text-xs bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                  {file.code.length} bytes
                </span>

                {editingId !== file.id && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleLoad(file)}
                      className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-md transition-colors"
                      title="Load into editor"
                    >
                      <FiUpload className="w-4 h-4 stroke-[1.5]" />
                    </button>
                    <button
                      onClick={() => startRename(file)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                      title="Rename"
                    >
                      <FiEdit2 className="w-4 h-4 stroke-[1.5]" />
                    </button>
                    <button
                      onClick={() => handleDelete(file)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
