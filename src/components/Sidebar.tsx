import { ReactNode } from "react";
import Header from "./Header";
import TabNavigation from "./TabNavigation";

type Tab = "guests" | "tables" | "settings";

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  children: ReactNode;
}

const Sidebar = ({ activeTab, setActiveTab, children }: SidebarProps) => {
  // Increase the spacing to ensure text in settings tab is fully visible
  const tabNavigationHeight = 110; // Increased to ensure full visibility
  const headerHeight = 160; // Approximate header height

  return (
    <div
      className="sidebar"
      style={{
        background:
          "linear-gradient(135deg, #f5d4e2 0%, var(--primary-color) 100%)",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--shadow-lg)",
        position: "relative",
        overflow: "hidden",
        height: "100vh", // Ensure sidebar takes full height
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "250px",
          height: "250px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15) 10%, transparent 70%)",
          zIndex: 0,
          borderRadius: "50%",
          transform: "translate(50%, -50%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 70%)",
          zIndex: 0,
          borderRadius: "50%",
          transform: "translate(-50%, 50%)",
        }}
      />

      <Header />

      <div
        className="sidebar-content"
        style={{
          overflowY: "auto",
          height: `calc(100vh - ${headerHeight}px - ${tabNavigationHeight}px)`,
          marginLeft: "5px",
          padding: "0",
          borderRadius: "var(--radius-md)",
          backgroundColor: "white",
          boxShadow: "var(--shadow-md)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Sidebar;
