import React, { useState } from "react";
import { FaDesktop, FaTimes } from "react-icons/fa";

const MobileBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem("mobileBannerDismissed") === "true";
  });

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("mobileBannerDismissed", "true");
  };

  if (dismissed) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        padding: "3px 15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1000,
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaDesktop
          style={{ marginRight: "10px", color: "var(--primary-dark)" }}
        />
        <span style={{ fontSize: "14px", color: "var(--primary-dark)" }}>
          Desktop verzija ima više funkcionalnosti
        </span>
      </div>

      <button
        onClick={handleDismiss}
        style={{
          background: "none",
          border: "none",
          color: "var(--primary-dark)",
          padding: "5px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="Zatvori"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default MobileBanner;
