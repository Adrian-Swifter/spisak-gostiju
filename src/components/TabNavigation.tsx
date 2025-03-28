import { FaUser, FaCog, FaHeart } from "react-icons/fa";
import TableIcon from "../utils/TableIcon";

type Tab = "guests" | "tables" | "settings";

interface TabNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => {
  return (
    <div
      className="sidebar-tabs"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        padding: "12px 15px 18px",
        boxSizing: "border-box",
        background: "#f5d4e2",
        borderTop: "1px solid rgba(255, 255, 255, 0.5)",
        zIndex: 2,
      }}
    >
      <button
        onClick={() => setActiveTab("guests")}
        className={`sidebar-tab ${activeTab === "guests" ? "active" : ""}`}
        style={{
          flex: 1,
          border: "none",
          cursor: "pointer",
          padding: "12px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.3s ease",
          background: activeTab === "guests" ? "white" : "transparent",
          borderRadius: "12px",
          boxShadow: activeTab === "guests" ? "var(--shadow-md)" : "none",
          color:
            activeTab === "guests"
              ? "var(--primary-color)"
              : "var(--primary-dark)",
          transform:
            activeTab === "guests" ? "translateY(-10px)" : "translateY(0)",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              activeTab === "guests"
                ? "var(--primary-light)"
                : "rgba(255, 255, 255, 0.5)",
            transition: "all 0.3s ease",
          }}
        >
          <FaUser size={20} />
        </div>
        <span
          style={{
            fontSize: "13px",
            fontWeight: "600",
            letterSpacing: "0.5px",
          }}
        >
          Gosti
        </span>
      </button>

      <button
        onClick={() => setActiveTab("tables")}
        className={`sidebar-tab ${activeTab === "tables" ? "active" : ""}`}
        style={{
          flex: 1,
          border: "none",
          cursor: "pointer",
          padding: "12px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.3s ease",
          background: activeTab === "tables" ? "white" : "transparent",
          borderRadius: "12px",
          boxShadow: activeTab === "tables" ? "var(--shadow-md)" : "none",
          color:
            activeTab === "tables"
              ? "var(--primary-color)"
              : "var(--primary-dark)",
          transform:
            activeTab === "tables" ? "translateY(-10px)" : "translateY(0)",
          margin: "0 10px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              activeTab === "tables"
                ? "var(--primary-light)"
                : "rgba(255, 255, 255, 0.5)",
            transition: "all 0.3s ease",
          }}
        >
          <TableIcon size={"22px"} />
        </div>
        <span
          style={{
            fontSize: "13px",
            fontWeight: "600",
            letterSpacing: "0.5px",
          }}
        >
          Stolovi
        </span>
      </button>

      <button
        onClick={() => setActiveTab("settings")}
        className={`sidebar-tab ${activeTab === "settings" ? "active" : ""}`}
        style={{
          flex: 1,
          border: "none",
          cursor: "pointer",
          padding: "12px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.3s ease",
          background: activeTab === "settings" ? "white" : "transparent",
          borderRadius: "12px",
          boxShadow: activeTab === "settings" ? "var(--shadow-md)" : "none",
          color:
            activeTab === "settings"
              ? "var(--primary-color)"
              : "var(--primary-dark)",
          transform:
            activeTab === "settings" ? "translateY(-10px)" : "translateY(0)",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              activeTab === "settings"
                ? "var(--primary-light)"
                : "rgba(255, 255, 255, 0.5)",
            transition: "all 0.3s ease",
          }}
        >
          <FaCog size={20} />
        </div>
        <span
          style={{
            fontSize: "13px",
            fontWeight: "600",
            letterSpacing: "0.5px",
          }}
        >
          Postavke
        </span>
      </button>
    </div>
  );
};

export default TabNavigation;
