import { useState } from "react";
import DraggableGuest from "./DraggableGuest";
import { Guest, Table } from "../../types";
import InfoIcon from "../../assets/info.png";

import {
  FaEdit,
  FaTrash,
  FaSave,
  FaEnvelope,
  FaCheck,
  FaChair,
  FaPlus,
  FaTimesCircle,
  FaGripVertical,
} from "react-icons/fa";
import TableIcon from "../../utils/TableIcon";
import { isMobileDevice } from "../../utils/deviceDetector";

interface GuestListProps {
  guests: Guest[];
  tables: Table[];
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
  setGuests: (guests: Guest[]) => void;
  isMobile?: boolean;
  addGuestToTable?: (guestId: string, tableId: string) => void;
  removeGuestFromChair?: (guestId: string) => void;
}

const GuestList = ({
  guests,
  tables,
  onDelete,
  onEdit,
  setGuests,
  isMobile = false,
  addGuestToTable,
  removeGuestFromChair,
}: GuestListProps) => {
  const [editingGuestId, setEditingGuestId] = useState<string | null>(null);
  const [editingGuestName, setEditingGuestName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterOption, setFilterOption] = useState<
    "all" | "assigned" | "unassigned" | "inviteSent" | "confirmedAttendance"
  >("all");
  const [sortOption, setSortOption] = useState<"none" | "table">("none");

  // Mobile-specific state
  const [selectingTableFor, setSelectingTableFor] = useState<string | null>(
    null
  );

  // Drag and drop state
  const [draggedGuestId, setDraggedGuestId] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

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

  // Handle selecting table for a guest on mobile
  const handleAddToTableClick = (guestId: string) => {
    setSelectingTableFor(guestId);
  };

  // Handle adding guest to selected table
  const handleTableSelect = (tableId: string) => {
    if (selectingTableFor && addGuestToTable) {
      addGuestToTable(selectingTableFor, tableId);
      setSelectingTableFor(null);
    }
  };

  // Cancel table selection
  const handleCancelTableSelect = () => {
    setSelectingTableFor(null);
  };

  // Handle removing guest from table
  const handleRemoveFromTable = (guestId: string) => {
    if (removeGuestFromChair) {
      removeGuestFromChair(guestId);
    }
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, guest: Guest, index: number) => {
    setDraggedGuestId(guest.id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.outerHTML);
    e.dataTransfer.setDragImage(e.currentTarget as HTMLElement, 0, 0);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    // Only clear drag over if mouse is outside the element
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverIndex(null);
    }
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);

    if (!draggedGuestId) return;

    const draggedIndex = sortedGuests.findIndex(
      (guest) => guest.id === draggedGuestId
    );
    if (draggedIndex === -1 || draggedIndex === dropIndex) {
      setDraggedGuestId(null);
      return;
    }

    // Create new array with reordered guests
    const newSortedGuests = [...sortedGuests];
    const draggedGuest = newSortedGuests[draggedIndex];

    // Remove from old position
    newSortedGuests.splice(draggedIndex, 1);

    // Insert at new position
    newSortedGuests.splice(dropIndex, 0, draggedGuest);

    // Update the original guests array to maintain the new order
    const updatedGuests = [...guests];

    // Find the positions of reordered guests in the original array and update
    newSortedGuests.forEach((guest, newIndex) => {
      const originalIndex = updatedGuests.findIndex((g) => g.id === guest.id);
      if (originalIndex !== -1) {
        updatedGuests[originalIndex] = { ...guest, order: newIndex };
      }
    });

    setGuests(updatedGuests);
    localStorage.setItem("guests", JSON.stringify(updatedGuests));
    setDraggedGuestId(null);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedGuestId(null);
    setDragOverIndex(null);
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
    // Sort by order property if available, otherwise maintain original order
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
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
          border: "1px solid var(--accent)",
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
            border: "1px solid var(--accent)",
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
            border: "1px solid var(--accent)",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          <option value="none">Bez sortiranja</option>
          <option value="table">Sortiraj po stolu</option>
        </select>
      </div>
      {!isMobileDevice() && (
        <div>
          <p
            style={{
              display: "flex",
              alignItems: "start",
              margin: 0,
              gap: "5px",
              fontSize: "0.9rem",
              marginBottom: "10px",
            }}
          >
            <img src={InfoIcon} alt="" style={{ width: "1rem" }} /> Klikni, drži
            i prevuci gosta do stolice da bi ga dodelio stolu.
          </p>
          <p
            style={{
              display: "flex",
              alignItems: "start",
              margin: 0,
              gap: "5px",
              fontSize: "0.9rem",
              color: "var(--primary-dark)",
            }}
          >
            <FaGripVertical style={{ width: "1rem", marginTop: "2px" }} />{" "}
            Koristi ručicu za prevlačenje da promeniš redosled gostiju.
          </p>
        </div>
      )}
      {/* Table Selection UI (shown when selecting a table for a guest) */}
      {selectingTableFor && isMobile && (
        <div
          className="table-selection-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="table-selection-modal"
            style={{
              backgroundColor: "white",
              borderRadius: "var(--radius-lg)",
              padding: "20px",
              maxWidth: "90%",
              width: "100%",
              maxHeight: "80%",
              overflowY: "auto",
              boxShadow: "var(--shadow-lg)",
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
              <h3 style={{ margin: 0 }}>Izaberite sto</h3>
              <button
                onClick={handleCancelTableSelect}
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

            {tables.length === 0 ? (
              <p style={{ textAlign: "center", padding: "20px 0" }}>
                Nema dostupnih stolova. Prvo dodajte stolove.
              </p>
            ) : (
              <ul style={{ padding: 0, listStyle: "none" }}>
                {tables.map((table) => {
                  const availableSeats = table.chairs.filter(
                    (chair) => !chair.occupiedBy
                  ).length;
                  return (
                    <li
                      key={table.id}
                      onClick={() => handleTableSelect(table.id)}
                      style={{
                        padding: "12px 15px",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--primary-light)",
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        backgroundColor:
                          availableSeats > 0 ? "white" : "#f9f9f9",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <TableIcon />
                        <span>{table.name}</span>
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          backgroundColor:
                            availableSeats > 0
                              ? "var(--primary-light)"
                              : "#e0e0e0",
                          color:
                            availableSeats > 0 ? "var(--primary-dark)" : "#777",
                          padding: "4px 8px",
                          borderRadius: "var(--radius-sm)",
                        }}
                      >
                        {availableSeats} slobodno od {table.chairs.length}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}

      <div
        className="guest-list"
        style={{
          padding: "5px",
          borderRadius: "var(--radius-lg)",
          backgroundColor: "white",
          boxShadow: "var(--shadow-sm)",
          border: "1px solid var(--primary-light)",
        }}
      >
        {sortedGuests.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "30px 0",
              color: "#888",
              fontStyle: "italic",
            }}
          >
            Još nema gostiju
          </div>
        ) : (
          <ol style={{ padding: 0, listStyleType: "none" }}>
            {sortedGuests.map((guest, index) => (
              <li
                key={guest.id}
                className="guest-item-list"
                draggable={!isMobile && sortOption === "none"}
                onDragStart={(e) => handleDragStart(e, guest, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                style={{
                  paddingRight: "8px",
                  marginBottom: "10px",
                  backgroundColor:
                    draggedGuestId === guest.id ? "#f0f0f0" : "#fff",
                  boxShadow:
                    draggedGuestId === guest.id
                      ? "var(--shadow-lg)"
                      : "var(--shadow-sm)",
                  borderRadius: "var(--radius-md)",
                  borderLeft:
                    dragOverIndex === index
                      ? "4px solid var(--accent-color)"
                      : "4px solid var(--primary-color)",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                  cursor:
                    !isMobile && sortOption === "none" ? "grab" : "default",
                  opacity: draggedGuestId === guest.id ? 0.5 : 1,
                  transform:
                    dragOverIndex === index
                      ? "translateY(-2px)"
                      : "translateY(0)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px",
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
                    {/* Drag handle for desktop */}
                    {!isMobile && sortOption === "none" && (
                      <div
                        style={{
                          color: "var(--primary-color)",
                          cursor: "grab",
                          display: "flex",
                          alignItems: "center",
                          padding: "2px",
                          flexShrink: 0,
                        }}
                      >
                        <FaGripVertical size={14} />
                      </div>
                    )}

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
                          backgroundColor: "#4caf50",
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
                        {/* Mobile - Add to Table Button */}
                        {isMobile && (
                          <button
                            onClick={() => handleAddToTableClick(guest.id)}
                            title="Dodaj na sto"
                            style={{
                              width: "26px",
                              height: "26px",
                              padding: "0",
                              border: "none",
                              borderRadius: "var(--radius-circle)",
                              backgroundColor: "white",
                              color: "var(--primary-color)",
                              fontSize: "0.85rem",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s ease",
                              boxShadow: "var(--shadow-sm)",
                            }}
                          >
                            <FaChair />
                          </button>
                        )}

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
                              ? "#8bc34a"
                              : "white",
                            color: guest.inviteSent
                              ? "#333333"
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
                              ? "#5c6bc0"
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
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    {getTableNameForGuest(guest.id) ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            overflow: "hidden",
                            flexGrow: 1,
                          }}
                        >
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
                        </div>

                        {/* Mobile - Remove from Table Button */}
                        {isMobile && removeGuestFromChair && (
                          <button
                            onClick={() => handleRemoveFromTable(guest.id)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "rgb(126, 63, 94)",
                              padding: 0,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.75rem",
                            }}
                            title="Ukloni sa stola"
                          >
                            <FaTimesCircle />
                          </button>
                        )}
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
        )}
      </div>
    </div>
  );
};

export default GuestList;
