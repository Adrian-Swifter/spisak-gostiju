import {
  FaFileExport,
  FaFileImport,
  FaFileExcel,
  FaFilePdf,
  FaChair,
  FaRedo,
} from "react-icons/fa";
import { useState } from "react";
import ExportPlanPopup from "../mobile/ExportPlanPopup";
import InfoIcon from "../../assets/info.png";

interface SettingsTabProps {
  exportData: () => void;
  importData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  exportExcel: () => void;
  exportPDF: () => void;
  exportCanvasToPDF: () => void;
  setShowResetPopup: (show: boolean) => void;
  isMobile?: boolean;
}

const SettingsTab = ({
  exportData,
  importData,
  exportExcel,
  exportPDF,
  exportCanvasToPDF,
  setShowResetPopup,
  isMobile = false,
}: SettingsTabProps) => {
  const [showExportPlanPopup, setShowExportPlanPopup] = useState(false);

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

  const handleExportPlanClick = () => {
    if (isMobile) {
      setShowExportPlanPopup(true);
    } else {
      exportCanvasToPDF();
    }
  };

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
          Učitaj prethodno sačuvane podatke
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
          Sačuvaj podatke za kasnije
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
          Preuzmi listu gostiju (Excel)
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
          Preuzmi listu gostiju (PDF)
        </button>
        <button
          onClick={handleExportPlanClick}
          style={{
            ...buttonStyle,
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          <FaChair style={iconStyle} />
          Preuzmi plan rasporeda stolova (PDF)
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
          Obriši sve podatke
        </button>
      </div>
      <div style={{ display: "flex", gap: "5px", alignItems: "start" }}>
        <img src={InfoIcon} alt="" style={{ width: "1rem" }} />
        <p style={{ fontSize: "0.9rem", margin: 0 }}>
          <b>Kako sačuvati vaše podatke?</b>
          <br />
          Da biste koristili podatke na drugom uređaju ili nakon brisanja
          istorije pregledača, kliknite na „Sačuvaj podatke za kasnije“ i
          preuzmite fajl na svoj uređaj. Zatim kliknite „Učitaj prethodno
          sačuvane podatke“ na novom uređaju ili nakon brisanja podataka
          pregledača, i odaberite preuzeti fajl.
        </p>
      </div>
      <div>
        <p>
          Za dodatne funkcionalnosti ili za prijavu problema pri korišćenju,
          molimo pošaljite email na{" "}
          <a href="mailto:contact@milosdraskovic.com">
            contact@milosdraskovic.com
          </a>
        </p>
        <p style={{ fontSize: "0.9rem" }}>
          Ako ti je aplikacija bila korisna, počasti nas kafom ☕ na{" "}
          <a href="https://ko-fi.com/spisakgostijurs" target="_blank">
            ko-fi.com/spisakgostijurs
          </a>
          {". "}
          Aplikacija je besplatna i uvek će biti – tvoja donacija pomaže da
          ostane online i da se dalje razvija.
        </p>
      </div>

      {/* Mobile popup for export plan */}
      <ExportPlanPopup
        showPopup={showExportPlanPopup}
        onClose={() => setShowExportPlanPopup(false)}
      />
    </div>
  );
};

export default SettingsTab;
