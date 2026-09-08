import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Group, Panel, Separator } from "react-resizable-panels";
import EditorPanel from "../components/EditorPanel/EditorPanel";
import PreviewPanel from "../components/PreviewPanel/PreviewPanel";
import HelpPanel from "../components/HelpPanel";
import { useLocalStorage } from "../hooks/useLocalStorage";

const INITIAL_SVG = `<svg fill="#000000" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;}</style></defs><title>SVG</title><path d="M30,23H24a2,2,0,0,1-2-2V11a2,2,0,0,1,2-2h6v2H24V21h4V17H26V15h4Z" transform="translate(0 0)"></path><polygon points="18 9 16 22 14 9 12 9 14.52 23 17.48 23 20 9 18 9"></polygon><path d="M8,23H2V21H8V17H4a2,2,0,0,1-2-2V11A2,2,0,0,1,4,9h6v2H4v4H8a2,2,0,0,1,2,2v4A2,2,0,0,1,8,23Z" transform="translate(0 0)"></path><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32" transform="translate(32 32) rotate(-180)"></rect></g></svg>`;

export default function EditorPage() {
  const { isDark } = useOutletContext(); // now we get isDark from MainLayout
  const [svgCode, setSvgCode] = useLocalStorage("zenith_svg_code", INITIAL_SVG);
  const [bgColor, setBgColor] = useLocalStorage(
    "zenith_bg_color",
    "transparent",
  );
  const [layoutMode, setLayoutMode] = useLocalStorage(
    "zenith_layout_mode",
    "show-both",
  );

  // useLocalStorage only reads its initial value once on mount, but the
  // Files page can write "zenith_svg_code" directly (loading a saved
  // project) while this component stays mounted in the SPA shell. Re-sync
  // on every visit to the editor route so a loaded project actually shows.
  useEffect(() => {
    try {
      const stored = localStorage.getItem("zenith_svg_code");
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (parsed !== svgCode) setSvgCode(parsed);
      }
    } catch {
      // ignore malformed storage, keep current in-memory value
    }
    // Intentionally run only on mount (i.e. each time this route is
    // navigated to), not on every svgCode change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {layoutMode === "show-both" && (
        <Group orientation="horizontal" className="h-full w-full">
          <Panel defaultSize="38%" minSize="20%">
            <EditorPanel
              svgCode={svgCode}
              setSvgCode={setSvgCode}
              isDark={isDark}
              layoutMode={layoutMode}
              setLayoutMode={setLayoutMode}
            />
          </Panel>
          <Separator className="w-[0.5px] bg-gray-200 dark:bg-gray-700 hover:bg-orange-500 transition-colors cursor-col-resize" />
          <Panel defaultSize="44%" minSize="25%">
            <PreviewPanel
              svgCode={svgCode}
              setSvgCode={setSvgCode}
              bgColor={bgColor}
              setBgColor={setBgColor}
            />
          </Panel>
          <Separator className="w-[0.5px] bg-gray-200 dark:bg-gray-700 hover:bg-orange-500 transition-colors cursor-col-resize" />
          <Panel defaultSize="18%" minSize="15%" maxSize="30%">
            <HelpPanel />
          </Panel>
        </Group>
      )}

      {layoutMode === "hide-preview" && (
        <Group orientation="horizontal" className="h-full w-full">
          <Panel defaultSize="80%" minSize="30%">
            <EditorPanel
              svgCode={svgCode}
              setSvgCode={setSvgCode}
              isDark={isDark}
              layoutMode={layoutMode}
              setLayoutMode={setLayoutMode}
            />
          </Panel>
          <Separator className="w-[0.5px] bg-gray-200 dark:bg-gray-700 hover:bg-orange-500 transition-colors cursor-col-resize" />
          <Panel defaultSize="20%" minSize="15%" maxSize="30%">
            <HelpPanel />
          </Panel>
        </Group>
      )}

      {layoutMode === "hide-code" && (
        <Group orientation="horizontal" className="h-full w-full">
          <Panel defaultSize="80%" minSize="30%">
            <PreviewPanel
              svgCode={svgCode}
              setSvgCode={setSvgCode}
              bgColor={bgColor}
              setBgColor={setBgColor}
            />
          </Panel>
          <Separator className="w-[0.5px] bg-gray-200 dark:bg-gray-700 hover:bg-orange-500 transition-colors cursor-col-resize" />
          <Panel defaultSize="20%" minSize="15%" maxSize="30%">
            <HelpPanel />
          </Panel>
        </Group>
      )}
    </>
  );
}
