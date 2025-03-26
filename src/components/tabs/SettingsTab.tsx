import {
  FaFileExport,
  FaFileImport,
  FaFileExcel,
  FaFilePdf,
  FaChair,
  FaRedo,
} from "react-icons/fa";

interface SettingsTabProps {
  exportData: () => void;
  importData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  exportExcel: () => void;
  exportPDF: () => void;
  exportCanvasToPDF: () => void;
  setShowResetPopup: (show: boolean) => void;
}

const SettingsTab = ({
  exportData,
  importData,
  exportExcel,
  exportPDF,
  exportCanvasToPDF,
  setShowResetPopup,
}: SettingsTabProps) => {
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
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <div
        className="button-group"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <label
          style={{
            ...buttonStyle,
            backgroundColor: "#fff",
            color: "#000",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
            border: "1px solid #ccc",
          }}
          title="Fajl koji ste sačuvali. Završava se sa .json ekstenzijom."
        >
          <FaFileImport style={iconStyle} />
          Uvezite Konfiguraciju
          <input
            type="file"
            onChange={importData}
            accept=".json"
            style={{
              display: "none",
            }}
          />
        </label>
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
          Sačuvaj Konfiguraciju
        </button>
        <button
          onClick={exportExcel}
          style={{
            ...buttonStyle,
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          <FaFileExcel style={iconStyle} />
          Izvezi Excel Spisak Gostiju
        </button>
        <button
          onClick={exportPDF}
          style={{
            ...buttonStyle,
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          <FaFilePdf style={iconStyle} />
          Izvezi PDF Spisak Gostiju
        </button>
        <button
          onClick={exportCanvasToPDF}
          style={{
            ...buttonStyle,
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          <FaChair style={iconStyle} />
          Izvezi Plan Sale PDF
        </button>
        <button
          onClick={() => setShowResetPopup(true)}
          style={{
            ...buttonStyle,
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #ccc",
          }}
          title="Briše sve podatke (goste, stolove...). Koristiti u slučaju potrebe za rasporedom gostiju u dodatnoj sali i slično."
        >
          <FaRedo style={iconStyle} />
          Resetuj Sve
        </button>
      </div>
      <div>
        <p>
          Za dodatne funkcionalnosti ili za prijavu problema pri korišćenju,
          molimo pošaljite email na{" "}
          <a href="mailto:contact@milosdraskovic.com">
            contact@milosdraskovic.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default SettingsTab;
