import { FiCircle, FiSquare, FiSlash } from "react-icons/fi";

export const bgOptions = [
  {
    value: "transparent",
    label: "Transparent",
    icon: <FiSlash className="w-3.5 h-3.5 stroke-[1.5]" />,
  },
  {
    value: "#ffffff",
    label: "White",
    icon: (
      <FiCircle className="w-3.5 h-3.5 fill-white text-gray-400 stroke-[1.5]" />
    ),
  },
  {
    value: "#1e293b",
    label: "Dark Slate",
    icon: (
      <FiCircle className="w-3.5 h-3.5 fill-slate-800 text-slate-500 stroke-[1.5]" />
    ),
  },
  {
    value: "#f3f4f6",
    label: "Light Gray",
    icon: (
      <FiSquare className="w-3.5 h-3.5 fill-gray-200 text-gray-400 stroke-[1.5]" />
    ),
  },
];
