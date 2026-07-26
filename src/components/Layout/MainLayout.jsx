import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer";
import { useTheme } from "../../context/ThemeContext";

export default function MainLayout() {
  const { isDark, setIsDark } = useTheme();

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 text-gray-800 dark:bg-black dark:text-gray-200 transition-colors duration-200">
      <Header isDark={isDark} setIsDark={setIsDark} />
      <div className="flex-1 overflow-hidden border-t border-gray-200 dark:border-gray-700">
        <Outlet context={{ isDark }} />
      </div>
      <Footer />
    </div>
  );
}
