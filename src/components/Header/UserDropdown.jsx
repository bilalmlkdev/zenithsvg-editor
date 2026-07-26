import { useState, useEffect } from "react";
import { FiFolder, FiCreditCard, FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function UserDropdown({ close }) {
  const navigate = useNavigate();
  const [guestId, setGuestId] = useState("");

  useEffect(() => {
    let storedId = localStorage.getItem("zenith_guest_id");
    if (!storedId) {
      storedId = Math.random().toString(36).substring(2, 15).toUpperCase();
      localStorage.setItem("zenith_guest_id", storedId);
    }
    setGuestId(storedId);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    close();
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-black rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-40 overflow-hidden">
      <div className="p-3 border-b border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">Guest ID</p>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate font-mono">
          {guestId}
        </p>
      </div>
      <div className="py-1">
        <button
          onClick={() => handleNavigate("/files")}
          className="w-full px-4 py-2 text-left text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2.5"
        >
          <FiFolder className="w-4 h-4 stroke-[1.5] text-gray-400" /> Files
        </button>
        <button
          onClick={() => handleNavigate("/about")}
          className="w-full px-4 py-2 text-left text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2.5"
        >
          <FiCreditCard className="w-4 h-4 stroke-[1.5] text-gray-400" /> About
        </button>
        <div className="border-t border-gray-100 dark:border-gray-800 my-1" />
        <a
          href="https://github.com/byllzz/ZenithSVG/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-4 py-2 text-left text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2.5"
        >
          <FiMessageSquare className="w-4 h-4 stroke-[1.5] text-gray-400" />{" "}
          Feedback / Report Issue
        </a>
      </div>
    </div>
  );
}
