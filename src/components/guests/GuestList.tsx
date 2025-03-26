import { useState } from "react";
import DraggableGuest from "./DraggableGuest";
import { Guest, Table } from "../../types";
import { FaEdit, FaTrash, FaSave, FaEnvelope, FaCheck } from "react-icons/fa";
import TableIcon from "../../utils/TableIcon";

const GuestList = ({
  guests,
  tables,
  onDelete,
  onEdit,
  setGuests,
}: {
  guests: Guest[];
  tables: Table[];
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
  setGuests: (guests: Guest[]) => void;
}) => {
  const [editingGuestId, setEditingGuestId] = useState<string | null>(null);
  const [editingGuestName, setEditingGuestName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterOption, setFilterOption] = useState<
    "all" | "assigned" | "unassigned" | "inviteSent" | "confirmedAttendance"
  >("all");
  const [sortOption, setSortOption] = useState<"none" | "table">("none");

  const handleEditClick = (guest: Guest) => {
    setEditingGuestId(guest.id);
    setEditingGuestName(guest.name);
  };

  const handleSaveClick = () => {
    if (editingGuestId) {
      onEdit(editingGuestId, editingGuestName);
      setEditingGuestId(null);
      setEditingGuestName("");
    }
  };

  const handleInviteClick = (guestId: string) => {
    const updatedGuests = guests.map((guest) =>
      guest.id === guestId ? { ...guest, inviteSent: !guest.inviteSent } : guest
    );
    setGuests(updatedGuests);
    localStorage.setItem("guests", JSON.stringify(updatedGuests));
  };

  const handleConfirmClick = (guestId: string) => {
    const updatedGuests = guests.map((guest) =>
      guest.id === guestId
        ? { ...guest, confirmedAttendance: !guest.confirmedAttendance }
        : guest
    );
    setGuests(updatedGuests);
    localStorage.setItem("guests", JSON.stringify(updatedGuests));
  };

  const getTableNameForGuest = (guestId: string): string | null => {
    for (const table of tables) {
      for (const chair of table.chairs) {
        if (chair.occupiedBy === guestId) {
          return table.name;
        }
      }
    }
    return null;
  };

  const filteredGuests = guests.filter((guest) => {
    const tableName = getTableNameForGuest(guest.id);
    if (filterOption === "assigned") return tableName !== null;
    if (filterOption === "unassigned") return tableName === null;
    if (filterOption === "inviteSent") return guest.inviteSent === true;
    if (filterOption === "confirmedAttendance")
      return guest.confirmedAttendance === true;
    return true; // "all"
  });

  const searchedGuests = filteredGuests.filter((guest) =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedGuests = [...searchedGuests].sort((a, b) => {
    if (sortOption === "table") {
      const tableA = getTableNameForGuest(a.id) || "";
      const tableB = getTableNameForGuest(b.id) || "";
      return tableA.localeCompare(tableB);
    }
    return 0;
  });

  return (
    <div>
      <h3>Gosti ({guests.length})</h3>
      <input
        type="text"
        placeholder="Pretraži goste"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
      />
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <select
          value={filterOption}
          onChange={(e) =>
            setFilterOption(
              e.target.value as
                | "all"
                | "assigned"
                | "unassigned"
                | "inviteSent"
                | "confirmedAttendance"
            )
          }
          style={{ padding: "5px" }}
        >
          <option value="all">Svi gosti</option>
          <option value="assigned">Dodeljeni stolu</option>
          <option value="unassigned">Nedodeljeni stolu</option>
          <option value="inviteSent">Pozivnica poslata</option>
          <option value="confirmedAttendance">Potvrđen dolazak</option>
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as "none" | "table")}
          style={{ padding: "5px" }}
        >
          <option value="none">Bez sortiranja</option>
          <option value="table">Sortiraj po stolu</option>
        </select>
      </div>
      <div
        className="guest-list"
        style={{
          padding: "10px",
        }}
      >
        <ol style={{ padding: 0, listStyleType: "none" }}>
          {sortedGuests.map((guest, index) => (
            <li
              key={guest.id}
              className="guest-item-list"
              style={{
                paddingRight: "5px",
                marginBottom: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                wordWrap: "break-word",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: "1",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: "1",
                    gap: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>{index + 1}.</span>{" "}
                  {editingGuestId === guest.id ? (
                    <input
                      type="text"
                      value={editingGuestName}
                      onChange={(e) => setEditingGuestName(e.target.value)}
                      style={{
                        flex: "1",
                        marginRight: "10px",
                        padding: "5px",
                      }}
                    />
                  ) : (
                    <DraggableGuest guest={guest} />
                  )}
                </div>
                <div
                  className="guest-controls"
                  style={{
                    display: "flex",
                    gap: "2px",
                    alignItems: "center",
                  }}
                >
                  {editingGuestId === guest.id ? (
                    <button
                      onClick={handleSaveClick}
                      title="Sačuvaj"
                      style={{
                        padding: "3px",
                        border: "none",
                        borderRadius: "3px",
                        backgroundColor: "#4caf50",
                        color: "white",
                        fontSize: "1rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaSave />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleInviteClick(guest.id)}
                        title="Poslata pozivnica"
                        style={{
                          padding: "3px",
                          border: "none",
                          borderRadius: "3px",
                          backgroundColor: guest.inviteSent
                            ? "#4caf50"
                            : "white",
                          color: guest.inviteSent ? "white" : "black",
                          fontSize: "1rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FaEnvelope />
                      </button>
                      <button
                        onClick={() => handleConfirmClick(guest.id)}
                        title="Potvrdi dolazak"
                        style={{
                          padding: "3px",
                          border: "none",
                          borderRadius: "3px",
                          backgroundColor: guest.confirmedAttendance
                            ? "#4caf50"
                            : "white",
                          color: guest.confirmedAttendance ? "white" : "black",
                          fontSize: "1rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleEditClick(guest)}
                        title="Izmeni"
                        style={{
                          padding: "3px",
                          border: "none",
                          borderRadius: "3px",
                          backgroundColor: "white",
                          color: "black",
                          fontSize: "1rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete(guest.id)}
                        title="Izbriši"
                        style={{
                          padding: "3px",
                          border: "none",
                          borderRadius: "3px",
                          backgroundColor: "white",
                          color: "#f44336",
                          fontSize: "1rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div
                style={{
                  marginTop: "5px",
                  fontSize: "0.7rem",
                  color: "#fff",
                  display: "inline-flex",
                  backgroundColor: "#6d4c41",
                  padding: "3px",
                  borderRadius: "3px",
                  maxWidth: "200px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {getTableNameForGuest(guest.id) ? (
                    <>
                      <TableIcon />
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {getTableNameForGuest(guest.id)}
                      </span>
                    </>
                  ) : (
                    "Nije dodeljen stolu"
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default GuestList;
