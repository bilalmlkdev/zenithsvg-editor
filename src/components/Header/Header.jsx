import { useState, useRef, useEffect } from "react";
import { FiSun, FiMoon, FiZap, FiUser } from "react-icons/fi";
import { LuBug } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import logo from "../../../public/logo.svg";
import { useTheme } from "../../context/ThemeContext";

export default function Header() {
  const navigate = useNavigate();
  const { isDark, setIsDark } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <header className="h-11 px-4 flex items-center justify-between bg-gray-100/80 dark:bg-black border-b border-gray-200 dark:border-gray-700 shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <img src={logo} alt="Logo" />
          </div>
          <span className="font-bold text-[20px] text-gray-800 dark:text-white relative top-[1px] tracking-tight">
            ZenithSVG Editor
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 relative">
        {/* GitHub Issues link */}
        <a
          href="https://github.com/byllzz/ZenithSVG/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
          title="Report Issue"
        >
          <LuBug className="w-4 h-4 stroke-[1.5]" />
        </a>

        {/* Theme toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
          title="Toggle Theme"
        >
          {isDark ? (
            <FiSun className="w-4 h-4 stroke-[1.5]" />
          ) : (
            <FiMoon className="w-4 h-4 stroke-[1.5]" />
          )}
        </button>

        {/* User dropdown */}
        <div
          className="relative border-l border-gray-200 dark:border-gray-700 pl-2"
          ref={dropdownRef}
        >
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <FiUser className="w-4 h-4 stroke-[1.5]" />
          </button>
          {isDropdownOpen && (
            <UserDropdown close={() => setIsDropdownOpen(false)} />
          )}
        </div>
      </div>
    </header>
  );
}
