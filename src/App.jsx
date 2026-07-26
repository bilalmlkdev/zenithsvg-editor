import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./components/Layout/MainLayout";
import EditorPage from "./pages/EditorPage";
import FilesPage from "./pages/FilesPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<EditorPage />} />
            <Route path="files" element={<FilesPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
