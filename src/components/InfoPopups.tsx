import { FaUser } from "react-icons/fa";
import { Guest, Table } from "../types";
import TableIcon from "../utils/TableIcon";

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
          bottom: "10px",
          right: "10px",
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          fontSize: "14px",
          zIndex: 1000,
        }}
      >
        <p>
          <strong>Za više prostora za stolove odzumirati:</strong>
        </p>
        <p>
          <strong>Windows:</strong> Držite <kbd>Ctrl</kbd> i pritisnite{" "}
          <kbd>-</kbd> za odzumiranje.
        </p>
        <p>
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
