import { useState } from "react";
import DraggableGuest from "./DraggableGuest";
import { Guest } from "../../types";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";

const GuestList = ({
  guests,
  onDelete,
  onEdit,
}: {
  guests: Guest[];
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
}) => {
  const [editingGuestId, setEditingGuestId] = useState<string | null>(null);
  const [editingGuestName, setEditingGuestName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const filteredGuests = guests.filter((guest) =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h3>Gosti</h3>
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
      <div
        className="guest-list"
        style={{
          padding: "10px",
        }}
      >
        <ol style={{ padding: "0" }}>
          {filteredGuests.map((guest) => (
            <li
              key={guest.id}
              className="guest-item"
              style={{
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                wordWrap: "break-word",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
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
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                {editingGuestId === guest.id ? (
                  <button
                    onClick={handleSaveClick}
                    style={{
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "3px",
                      backgroundColor: "green",
                      color: "white",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <FaSave /> Sačuvaj
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(guest)}
                    style={{
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "3px",
                      backgroundColor: "goldenrod",
                      color: "white",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <FaEdit /> Izmeni
                  </button>
                )}
                <button
                  onClick={() => onDelete(guest.id)}
                  style={{
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "3px",
                    backgroundColor: "tomato",
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <FaTrash /> Izbriši
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default GuestList;
