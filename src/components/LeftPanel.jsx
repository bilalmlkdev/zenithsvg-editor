import { useState, useMemo, useEffect, useRef } from "react";
import { Search, ChevronDown, Check, Upload } from "lucide-react";
import { ALL_SVGS } from "../data/svgs";

const ITEMS_PER_PAGE = 24;

const LeftPanel = ({ onSelectSvg }) => {
  // State for search, pagination, and user-uploaded custom SVGs
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [customIcons, setCustomIcons] = useState([]);

  // State for the 3 Dropdown Filters
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortFilter, setSortFilter] = useState("Popular");
  const [licenseFilter, setLicenseFilter] = useState("All");

  // Active custom dropdown state ("category" | "sort" | "license" | null)
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Ref to handle click outside to close dropdowns
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Combine custom uploaded SVGs with default SVGs
  const allAvailableSvgs = useMemo(() => {
    return [...customIcons, ...ALL_SVGS];
  }, [customIcons]);

  // Handle local SVG file uploads
  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const svgText = event.target.result;
          const newIcon = {
            id: `custom-${Date.now()}-${Math.random()}`,
            name: file.name.replace(/\.[^/.]+$/, ""),
            category: "Custom",
            svg: svgText,
          };
          setCustomIcons((prev) => [newIcon, ...prev]);
          onSelectSvg(svgText); // Select the newly uploaded SVG immediately
        };
        reader.readAsText(file);
      }
    });
    // Reset file input value so same file can be uploaded again if needed
    e.target.value = "";
  };

  // Compute filtered items based on search + dropdowns
  const filteredItems = useMemo(() => {
    let items = allAvailableSvgs;

    // 1. Search Filter
    if (search.trim()) {
      items = items.filter((icon) =>
        icon.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // 2. Category Filter
    if (categoryFilter !== "All") {
      items = items.filter((icon) => icon.category === categoryFilter);
    }

    // 3. Sort Filter
    if (sortFilter === "Recent") {
      items = [...items].reverse();
    }

    // 4. License Filter
    if (licenseFilter === "Free") {
      items = items.filter((_, idx) => idx % 2 === 0);
    } else if (licenseFilter === "Pro") {
      items = items.filter((_, idx) => idx % 2 !== 0);
    }

    return items;
  }, [allAvailableSvgs, search, categoryFilter, sortFilter, licenseFilter]);

  // Slice the items for the current page
  const currentItems = filteredItems.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = currentItems.length < filteredItems.length;

  // Reset page to 1 whenever search or filters change
  useEffect(() => {
    setPage(1);
  }, [search, categoryFilter, sortFilter, licenseFilter]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const categories = [
    "All",
    "Custom",
    "UI",
    "Auth",
    "Media",
    "Social",
    "Shape",
    "Tech",
    "Commerce",
    "Weather",
  ];
  const sorts = ["Popular", "Recent"];
  const licenses = ["All", "Free", "Pro"];

  return (
    <div className="w-full h-full flex flex-col bg-white border-r border-gray-200 select-none">
      {/* 1. Title & Upload Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">SVGViewer</h1>
          <label className="flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-md cursor-pointer transition-colors border border-orange-200 shadow-sm">
            <Upload size={14} />
            <span>Upload SVG</span>
            <input
              type="file"
              accept=".svg,image/svg+xml"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>

        {/* 2. Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search SVGs..."
            className="w-full bg-gray-50 text-gray-700 text-sm pl-9 pr-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-orange-500 border border-gray-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 3. Three Custom Dropdown Filters */}
        <div className="flex flex-wrap gap-2 relative" ref={dropdownRef}>
          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "category" ? null : "category",
                )
              }
              className="flex items-center justify-between gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors shadow-sm font-medium"
            >
              <span>
                {categoryFilter === "All" ? "All Categories" : categoryFilter}
              </span>
              <ChevronDown
                size={12}
                className={`text-gray-400 transition-transform ${activeDropdown === "category" ? "rotate-180" : ""}`}
              />
            </button>

            {activeDropdown === "category" && (
              <div className="absolute left-0 mt-1.5 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 text-xs max-h-52 overflow-y-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategoryFilter(cat);
                      setActiveDropdown(null);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-orange-50 hover:text-orange-600 ${
                      categoryFilter === cat
                        ? "text-orange-600 font-medium bg-orange-50/50"
                        : "text-gray-700"
                    }`}
                  >
                    <span>{cat === "All" ? "All Categories" : cat}</span>
                    {categoryFilter === cat && (
                      <Check size={13} className="text-orange-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "sort" ? null : "sort")
              }
              className="flex items-center justify-between gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors shadow-sm font-medium"
            >
              <span>Sort: {sortFilter}</span>
              <ChevronDown
                size={12}
                className={`text-gray-400 transition-transform ${activeDropdown === "sort" ? "rotate-180" : ""}`}
              />
            </button>

            {activeDropdown === "sort" && (
              <div className="absolute left-0 mt-1.5 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 text-xs">
                {sorts.map((sort) => (
                  <button
                    key={sort}
                    onClick={() => {
                      setSortFilter(sort);
                      setActiveDropdown(null);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-orange-50 hover:text-orange-600 ${
                      sortFilter === sort
                        ? "text-orange-600 font-medium bg-orange-50/50"
                        : "text-gray-700"
                    }`}
                  >
                    <span>{sort}</span>
                    {sortFilter === sort && (
                      <Check size={13} className="text-orange-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* License Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "license" ? null : "license",
                )
              }
              className="flex items-center justify-between gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors shadow-sm font-medium"
            >
              <span>License: {licenseFilter}</span>
              <ChevronDown
                size={12}
                className={`text-gray-400 transition-transform ${activeDropdown === "license" ? "rotate-180" : ""}`}
              />
            </button>

            {activeDropdown === "license" && (
              <div className="absolute left-0 mt-1.5 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 text-xs">
                {licenses.map((lic) => (
                  <button
                    key={lic}
                    onClick={() => {
                      setLicenseFilter(lic);
                      setActiveDropdown(null);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-orange-50 hover:text-orange-600 ${
                      licenseFilter === lic
                        ? "text-orange-600 font-medium bg-orange-50/50"
                        : "text-gray-700"
                    }`}
                  >
                    <span>{lic}</span>
                    {licenseFilter === lic && (
                      <Check size={13} className="text-orange-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. SVG Grid with Screenshot Card Box UI */}
      <div className="flex-1 overflow-y-auto p-3 grid grid-cols-2 xl:grid-cols-3 gap-2.5 content-start">
        {currentItems.map((icon) => (
          <div
            key={icon.id}
            className="flex flex-col items-center justify-center p-3.5 bg-white rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50/40 hover:shadow-sm cursor-pointer transition-all duration-200 group"
            onClick={() => onSelectSvg(icon.svg)}
          >
            <div
              className="w-8 h-8 text-gray-700 group-hover:text-orange-600 transition-colors flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
              dangerouslySetInnerHTML={{ __html: icon.svg }}
            />
            <span className="text-[11px] font-medium text-gray-600 mt-2 group-hover:text-gray-900 text-center truncate w-full">
              {icon.name}
            </span>
          </div>
        ))}

        {currentItems.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-400 text-sm">
            No SVGs found matching your filters.
          </div>
        )}
      </div>

      {/* 5. Load More Button */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        {hasMore ? (
          <button
            onClick={handleLoadMore}
            className="w-full bg-white border border-gray-300 hover:border-orange-400 hover:text-orange-600 text-gray-700 py-2.5 rounded-md text-xs font-medium transition-colors shadow-sm"
          >
            Load More SVGs
          </button>
        ) : (
          <div className="text-center text-gray-400 text-xs py-2">
            {filteredItems.length > 0
              ? "You've reached the end!"
              : "No items to display."}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftPanel;
