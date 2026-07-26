import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSearch, FiFolder, FiDatabase } from "react-icons/fi";

export default function FilesPage() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("zenithSVG_projects") || "[]",
    );
    setFiles(saved);
  }, []);

  // Compute statistics
  const totalFiles = files.length;
  const totalBytes = files.reduce((acc, file) => acc + file.code.length, 0);

  // Filter files based on search term (search by date or project index)
  const filteredFiles = useMemo(() => {
    if (!searchTerm.trim()) return files;
    const term = searchTerm.toLowerCase();
    return files.filter((file, idx) => {
      const projectName = `Project ${idx + 1}`.toLowerCase();
      const date = file.date.toLowerCase();
      return projectName.includes(term) || date.includes(term);
    });
  }, [files, searchTerm]);

  return (
    <div className="h-full p-8 bg-white dark:bg-black overflow-y-auto flex justify-center">
      <div className="w-full max-w-3xl flex flex-col">
        {/* Back button */}
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
          View and manage all your locally stored SVG projects.
        </p>

        {/* Stats Cards */}
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

        {/* Search Bar */}
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

        {/* Files List */}
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {files.length === 0
                ? "No saved files found. Use the save button in the editor!"
                : "No projects match your search."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFiles.map((file, idx) => {
              // Find original index for display
              const originalIndex = files.indexOf(file);
              return (
                <div
                  key={file.id}
                  className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 hover:border-orange-300 dark:hover:border-orange-700 transition-colors"
                >
                  <div className="flex flex-col">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                      Project {originalIndex + 1}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {file.date}
                    </p>
                  </div>
                  <span className="text-xs bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400 px-3 py-1 rounded-full whitespace-nowrap">
                    {file.code.length} bytes
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
