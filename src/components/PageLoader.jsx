export default function PageLoader() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-white dark:bg-black">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-800 border-t-orange-500 animate-spin" />
        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          Loading…
        </span>
      </div>
    </div>
  );
}
