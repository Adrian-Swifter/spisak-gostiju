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
      <h3
        style={{
          fontFamily: "var(--font-secondary)",
          color: "var(--primary-dark)",
          fontSize: "1.8rem",
          marginBottom: "15px",
        }}
      >
        Gosti ({guests.length})
      </h3>
      <input
        type="text"
        placeholder="Pretraži goste"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 15px",
          marginBottom: "12px",
          boxSizing: "border-box",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--primary-light)",
          fontSize: "14px",
          transition: "all 0.2s ease",
        }}
      />
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
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
          style={{
            padding: "8px 12px",
            flex: "1",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--primary-light)",
            fontSize: "14px",
            cursor: "pointer",
          }}
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
          style={{
            padding: "8px 12px",
            flex: "1",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--primary-light)",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          <option value="none">Bez sortiranja</option>
          <option value="table">Sortiraj po stolu</option>
        </select>
      </div>
      <div
        className="guest-list"
        style={{
          padding: "15px",
          borderRadius: "var(--radius-lg)",
          backgroundColor: "white",
          boxShadow: "var(--shadow-sm)",
          border: "1px solid var(--primary-light)",
        }}
      >
        <ol style={{ padding: 0, listStyleType: "none" }}>
          {sortedGuests.map((guest, index) => (
            <li
              key={guest.id}
              className="guest-item-list"
              style={{
                paddingRight: "8px",
                marginBottom: "10px",
                backgroundColor: "#fff",
                boxShadow: "var(--shadow-sm)",
                borderRadius: "var(--radius-md)",
                borderLeft: "4px solid var(--primary-color)",
                overflow: "hidden",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                    gap: "6px",
                    minWidth: 0,
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      flexShrink: 0,
                      width: "22px",
                      height: "22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "var(--primary-light)",
                      color: "var(--primary-dark)",
                      borderRadius: "50%",
                      fontSize: "12px",
                    }}
                  >
                    {index + 1}
                  </span>

                  {editingGuestId === guest.id ? (
                    <input
                      type="text"
                      value={editingGuestName}
                      onChange={(e) => setEditingGuestName(e.target.value)}
                      style={{
                        flex: "1",
                        marginRight: "5px",
                        padding: "6px 8px",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--primary-light)",
                        fontSize: "14px",
                        minWidth: 0,
                      }}
                      autoFocus
                    />
                  ) : (
                    <div
                      style={{
                        flexGrow: 1,
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <DraggableGuest guest={guest} />
                    </div>
                  )}
                </div>
                <div
                  className="guest-controls"
                  style={{
                    display: "flex",
                    gap: "3px",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {editingGuestId === guest.id ? (
                    <button
                      onClick={handleSaveClick}
                      title="Sačuvaj"
                      style={{
                        width: "26px",
                        height: "26px",
                        padding: "0",
                        border: "none",
                        borderRadius: "var(--radius-circle)",
                        backgroundColor: "var(--green-accent)",
                        color: "#ffffff",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease",
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
                          width: "26px",
                          height: "26px",
                          padding: "0",
                          border: "none",
                          borderRadius: "var(--radius-circle)",
                          backgroundColor: guest.inviteSent
                            ? "var(--green-accent)"
                            : "white",
                          color: guest.inviteSent
                            ? "#ffffff"
                            : "var(--primary-dark)",
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease",
                          boxShadow: "var(--shadow-sm)",
                        }}
                      >
                        <FaEnvelope />
                      </button>
                      <button
                        onClick={() => handleConfirmClick(guest.id)}
                        title="Potvrdi dolazak"
                        style={{
                          width: "26px",
                          height: "26px",
                          padding: "0",
                          border: "none",
                          borderRadius: "var(--radius-circle)",
                          backgroundColor: guest.confirmedAttendance
                            ? "var(--accent)"
                            : "white",
                          color: guest.confirmedAttendance
                            ? "#ffffff"
                            : "var(--primary-dark)",
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease",
                          boxShadow: "var(--shadow-sm)",
                        }}
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleEditClick(guest)}
                        title="Izmeni"
                        style={{
                          width: "26px",
                          height: "26px",
                          padding: "0",
                          border: "none",
                          borderRadius: "var(--radius-circle)",
                          backgroundColor: "white",
                          color: "var(--accent-color)",
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease",
                          boxShadow: "var(--shadow-sm)",
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete(guest.id)}
                        title="Izbriši"
                        style={{
                          width: "26px",
                          height: "26px",
                          padding: "0",
                          border: "none",
                          borderRadius: "var(--radius-circle)",
                          backgroundColor: "white",
                          color: "var(--danger-color)",
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease",
                          boxShadow: "var(--shadow-sm)",
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
                  marginTop: "0",
                  padding: "5px 8px",
                  fontSize: "0.75rem",
                  color: "rgb(126, 63, 94)",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "var(--primary-color)",
                  overflow: "hidden",
                  borderTop: "1px solid var(--primary-light)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {getTableNameForGuest(guest.id) ? (
                    <>
                      <div style={{ flexShrink: 0 }}>
                        <TableIcon color="rgb(126, 63, 94)" />
                      </div>
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontWeight: "500",
                          color: "rgb(126, 63, 94)",
                        }}
                      >
                        {getTableNameForGuest(guest.id)}
                      </span>
                    </>
                  ) : (
                    <span
                      style={{
                        fontStyle: "italic",
                        opacity: 0.8,
                        color: "rgb(126, 63, 94)",
                      }}
                    >
                      Nije dodeljen stolu
                    </span>
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
