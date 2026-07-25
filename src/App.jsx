import { useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import LeftPanel from "./components/LeftPanel";
import CenterPanel from "./components/CenterPanel";
import RightPanel from "./components/RightPanel";
import { initialSvg } from "./data/svgs";

export default function App() {
  const [code, setCode] = useState(initialSvg);

  return (
    <Group
      orientation="horizontal"
      className="h-screen w-screen overflow-hidden bg-[#1e1e1e]"
    >
      {/* Left Panel */}
      <Panel
        id="left-panel"
        order={1}
        defaultSize="24%"
        minSize="10%"
        maxSize="40%"
      >
        <LeftPanel onSelectSvg={setCode} />
      </Panel>

      <Separator
        style={{
          width: "8px",
          flexShrink: 0,
          cursor: "col-resize",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
          right: -4,
        }}
      >
        <div
          style={{
            width: "4px",
            height: "60px",
            borderRadius: "20px",
            background: "#ccc",
          }}
        />
      </Separator>

      {/* Center Panel */}
      <Panel id="center-panel" order={2} defaultSize="42.5%" minSize="20%">
        <CenterPanel code={code} setCode={setCode} />
      </Panel>

      <Separator
        style={{
          width: "8px",
          flexShrink: 0,
          cursor: "col-resize",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
          right: 2,
        }}
      >
        <div
          style={{
            width: "4px",
            height: "60px",
            borderRadius: "20px",
            background: "#ccc",
          }}
        />
      </Separator>

      {/* Right Panel */}
      <Panel id="right-panel" order={3} defaultSize="33%" minSize="20%">
        <RightPanel code={code} />
      </Panel>
    </Group>
  );
}
