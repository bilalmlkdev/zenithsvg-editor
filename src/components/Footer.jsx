export default function Footer() {
  return (
    <footer className="h-7 flex items-center justify-between px-2 border-t border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-black shrink-0 text-[12px] text-gray-500">
      <span>v1.0.0 © {new Date().getFullYear()} ZenithSVG Editor</span>

      <a
        href="https://github.com/bilalmlkdev/zenithsvg-editor"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-0.5 px-1 text-gray-700 dark:text-gray-300 font-medium"
      >
        <span>GitHub</span>
      </a>
    </footer>
  );
}
