import { Upload, Sliders, Sparkles, FolderHeart, PanelLeft, Bookmark } from 'lucide-react';

const TABS = [
  { id: 'upload',     icon: Upload,      label: 'Upload'      },
  { id: 'properties', icon: Sliders,     label: 'Controls'    },
  { id: 'animation',  icon: Sparkles,    label: 'Animations'  },
  { id: 'library',    icon: FolderHeart, label: 'Templates'   },
  { id: 'saved',      icon: Bookmark,    label: 'Saved'       },
];

export default function LeftRail({ activeTab, setActiveTab, panelOpen, setPanelOpen }) {
  const handleTabClick = (id) => {
    setActiveTab(id);
    if (!panelOpen) setPanelOpen(true);
  };

  return (
    <div className={`flex flex-col items-center w-20 h-full shrink-0 pt-5 pb-4 bg-[var(--canvas-bg)] ${panelOpen ? "rounded-tl-2xl rounded-bl-2xl": "rounded-2xl"} `}>
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        title="Toggle Sidebar"
        className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-50 transition-all mb-3"
      >
        <PanelLeft className="h-5 w-5" />
      </button>
      <div className="w-8 h-px bg-gray-200 mb-4" />

      {TABS.map(({ id, icon: Icon, label }) => {
        const isActive = id === 'upload' || (activeTab === id && panelOpen);
        return (
          <button
            key={id}
            onClick={() => handleTabClick(id)}
            title={label}
            className="flex flex-col items-center justify-center gap-1 py-1.5 w-full transition-all group"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                isActive
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-400 '
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span
              className={`text-[10px] font-medium tracking-tight ${
                isActive ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
      <div className="flex-1" />
    </div>
  );
}
