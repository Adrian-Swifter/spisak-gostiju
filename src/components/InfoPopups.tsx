import { FaUser } from "react-icons/fa";
import { Guest, Table } from "../types";
import TableIcon from "../utils/TableIcon";
import InfoIcon from "../assets/info.png";

interface InfoPopupsProps {
  guests: Guest[];
  tables: Table[];
}

const InfoPopups = ({ guests, tables }: InfoPopupsProps) => {
  return (
    <>
      <div
        className="fixed-popup"
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          padding: "10px",
          fontSize: "14px",
          zIndex: 1000,
        }}
      >
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSc9pInnPFbJweSjuEcvRUa2sLIHSEpRMPlXCjBuYiHDLK9ZbQ/viewform?usp=header"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: "linear-gradient(45deg,#7e3f5e 0%, #9c4d7a 100%)",
            color: "#fff",
            fontWeight: 700,
            padding: "4px 8px",
            textDecoration: "none",
            boxShadow: "0 6px 20px rgba(126,63,94,.35)",
          }}
        >
          💍 Sajt za venčanje za samo 97 €
        </a>
      </div>
      <div
        className="fixed-popup"
        style={{
          position: "fixed",
          top: "10px",
          left: "420px",
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          fontSize: "14px",
          zIndex: 1000,
        }}
      >
        <p
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            margin: 0,
          }}
        >
          <img src={InfoIcon} alt="" style={{ width: "1rem" }} /> Desni klik na
          sto za više opcija.
        </p>
      </div>
      <div
        className="fixed-popup"
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          fontSize: "14px",
          zIndex: 1000,
          maxWidth: "350px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <img src={InfoIcon} alt="" style={{ width: "1rem" }} />
          <p style={{ margin: 0 }}>
            <strong>Za više prostora za stolove odzumirati:</strong>
          </p>
        </div>

        <p style={{ margin: "5px 0" }}>
          <strong>Windows:</strong> Držite <kbd>Ctrl</kbd> i pritisnite{" "}
          <kbd>-</kbd>, ili koristite točkić miša dok držite <kbd>Ctrl</kbd>.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Mac:</strong> Držite <kbd>⌘ Command</kbd> i pritisnite{" "}
          <kbd>-</kbd> za odzumiranje.
        </p>
      </div>

      <div
        className="fixed-popup"
        style={{
          position: "fixed",
          bottom: "10px",
          left: "420px",
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          fontSize: "14px",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flexDirection: "column",
          }}
        >
          <p style={{ margin: 0 }}>Ukupno</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <span>{guests.length}</span>
            <FaUser />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flexDirection: "column",
          }}
        >
          <p style={{ margin: 0 }}>Poslato</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <span>{guests.filter((guest) => guest.inviteSent).length}</span>
            <FaUser style={{ color: "var(--green-accent)" }} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flexDirection: "column",
          }}
        >
          <p style={{ margin: 0 }}>Potvrđeno</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <span>
              {guests.filter((guest) => guest.confirmedAttendance).length}
            </span>
            <FaUser style={{ color: "var(--accent)" }} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flexDirection: "column",
          }}
        >
          <p style={{ margin: 0 }}>Stolova</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <span>{tables.length}</span>
            <TableIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPopups;
