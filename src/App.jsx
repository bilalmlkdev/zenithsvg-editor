import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { ConfirmProvider } from "./context/ConfirmContext";
import ErrorBoundary from "./components/ErrorBoundary";
import MainLayout from "./components/Layout/MainLayout";
import PageLoader from "./components/PageLoader";

// Route-level code splitting: EditorPage pulls in Monaco (~600kB), so the
// initial JS payload for /files and /about stays small, and Monaco itself is
// only fetched once the person actually opens the editor.
const EditorPage = lazy(() => import("./pages/EditorPage"));
const FilesPage = lazy(() => import("./pages/FilesPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <ToastProvider>
            <ConfirmProvider>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route
                    index
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <EditorPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="files"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <FilesPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="about"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <AboutPage />
                      </Suspense>
                    }
                  />
                </Route>
              </Routes>
            </ConfirmProvider>
          </ToastProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
