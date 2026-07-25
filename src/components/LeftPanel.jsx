import { useState } from "react";
import { Search } from "lucide-react";
import { svgIcons } from "../data/svgs";

const LeftPanel = ({ onSelectSvg }) => {
  const [search, setSearch] = useState("");

  const filteredIcons = svgIcons.filter((icon) =>
    icon.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e]">
      {" "}
      <div className="p-4 border-b border-[#333]">
        <h1 className="text-xl font-bold text-orange-500 mb-3">SVGViewer</h1>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search SVGs"
            className="w-full bg-[#252526] text-gray-300 text-sm pl-9 pr-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-orange-500 border border-[#333]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* Change grid-cols-3 to grid-cols-2 auto-adapting or min-w-0 */}
      <div className="flex-1 overflow-y-auto p-2 grid grid-cols-2 xl:grid-cols-3 gap-2 content-start min-w-0">
        {filteredIcons.map((icon) => (
          <div
            key={icon.id}
            className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-[#333] cursor-pointer transition-colors group"
            onClick={() => onSelectSvg(icon.svg)}
          >
            <div
              className="w-8 h-8 text-white group-hover:text-orange-400"
              dangerouslySetInnerHTML={{ __html: icon.svg }}
            />
            <span className="text-[10px] text-gray-400 mt-1 group-hover:text-gray-200">
              {icon.name}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-[#333] bg-[#252526]">
        <button className="w-full bg-[#333] hover:bg-[#444] text-gray-300 py-2 rounded-md text-xs transition-colors">
          Load More SVGs
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;
