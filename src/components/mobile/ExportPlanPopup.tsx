import React from "react";
import { FaTimesCircle } from "react-icons/fa";

interface ExportPlanPopupProps {
  showPopup: boolean;
  onClose: () => void;
}

const ExportPlanPopup: React.FC<ExportPlanPopupProps> = ({
  showPopup,
  onClose,
}) => {
  if (!showPopup) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "90%",
          width: "100%",
          maxHeight: "80%",
          overflowY: "auto",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h3 style={{ margin: 0, color: "var(--primary-dark)" }}>Napomena</h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              color: "var(--danger-color)",
              cursor: "pointer",
            }}
          >
            <FaTimesCircle />
          </button>
        </div>

        <div
          style={{
            marginBottom: "20px",
            color: "#333",
          }}
        >
          <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
            Važna napomena
          </h2>
          <p style={{ lineHeight: "1.6", marginBottom: "12px" }}>
            Opcija <strong>„Preuzmi plan rasporeda stolova (PDF)”</strong>{" "}
            najbolje radi na desktop ili laptop uređajima.
          </p>
          <p style={{ lineHeight: "1.6", marginBottom: "12px" }}>
            Na većem ekranu možete lako vizuelno rasporediti stolove pre nego
            što preuzmete dokument.
          </p>
          <p style={{ lineHeight: "1.6", marginBottom: "15px" }}>
            Za optimalno iskustvo preporučujemo da koristite ovu opciju na
            desktop ili laptop računaru tako što ćete posetiti sledeću web
            adresu:
          </p>
          <div
            style={{
              padding: "10px",
              backgroundColor: "#e7f3ff",
              borderRadius: "5px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "16px",
              wordBreak: "break-word",
            }}
          >
            app.spisakgostiju.rs
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "var(--primary-color)",
            color: "#333",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          Razumem
        </button>
      </div>
    </div>
  );
};

export default ExportPlanPopup;
