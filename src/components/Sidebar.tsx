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
  return (
    <div className="sidebar">
      <Header />
      <div
        style={{
          overflowY: "auto",
          height: "calc(100vh - 180px)",
        }}
      >
        {children}
      </div>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Sidebar;
