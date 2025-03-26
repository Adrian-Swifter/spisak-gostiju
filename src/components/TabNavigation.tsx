import { FaUser, FaCog } from "react-icons/fa";
import TableIcon from "../utils/TableIcon";

type Tab = "guests" | "tables" | "settings";

interface TabNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        borderTop: "1px solid #eee",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={() => setActiveTab("guests")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: activeTab === "guests" ? "#000" : "#666",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FaUser size={20} />
        <span style={{ fontSize: "12px" }}>Gosti</span>
      </button>

      <button
        onClick={() => setActiveTab("tables")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: activeTab === "tables" ? "#000" : "#666",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TableIcon size={"20px"} />
        <span style={{ fontSize: "12px" }}>Stolovi</span>
      </button>

      <button
        onClick={() => setActiveTab("settings")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: activeTab === "settings" ? "#000" : "#666",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FaCog size={20} />
        <span style={{ fontSize: "12px" }}>Postavke</span>
      </button>
    </div>
  );
};

export default TabNavigation;
