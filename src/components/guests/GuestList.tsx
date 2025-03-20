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
        <ol style={{ padding: 0, listStylePosition: "inside" }}>
          {filteredGuests.map((guest) => (
            <li
              key={guest.id}
              className="guest-item"
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
                  style={{ display: "flex", alignItems: "center", flex: "1" }}
                >
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
                  }}
                >
                  {editingGuestId === guest.id ? (
                    <button
                      onClick={handleSaveClick}
                      title="Sačuvaj"
                      style={{
                        padding: "5px",
                        border: "none",
                        borderRadius: "3px",
                        backgroundColor: "white",
                        color: "black",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaSave />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(guest)}
                      title="Izmeni"
                      style={{
                        padding: "5px",
                        border: "none",
                        borderRadius: "3px",
                        backgroundColor: "white",
                        color: "black",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(guest.id)}
                    title="Izbriši"
                    style={{
                      padding: "5px",
                      border: "none",
                      borderRadius: "3px",
                      backgroundColor: "white",
                      color: "black",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaTrash />
                  </button>
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
