import { FaFileExport, FaRedo } from "react-icons/fa";

interface ResetPopupProps {
  showResetPopup: boolean;
  setShowResetPopup: (show: boolean) => void;
  exportData: () => void;
  resetEverything: () => void;
}

const ResetPopup = ({
  showResetPopup,
  setShowResetPopup,
  exportData,
  resetEverything,
}: ResetPopupProps) => {
  if (!showResetPopup) return null;

  const buttonStyle = {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const iconStyle = { marginRight: "5px" };

  return (
    <div
      className="reset-popup"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      <h3>Da li želite da sačuvate konfiguraciju pre resetovanja?</h3>
      <div
        className="button-group"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <button
          onClick={exportData}
          style={{
            ...buttonStyle,
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #ccc",
          }}
          title="Sačuvajte podatke (goste,stolove...) za kasnije korišćenje."
        >
          <FaFileExport style={iconStyle} />
          Sačuvaj konfiguraciju
        </button>
        <button
          onClick={resetEverything}
          style={{
            ...buttonStyle,
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          <FaRedo style={iconStyle} />
          Resetuj Sve
        </button>
        <button
          onClick={() => setShowResetPopup(false)}
          style={{
            ...buttonStyle,
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          Otkaži
        </button>
      </div>
    </div>
  );
};

export default ResetPopup;
