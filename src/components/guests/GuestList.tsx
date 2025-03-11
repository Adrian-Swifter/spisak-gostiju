import { useState } from "react";
import DraggableGuest from "./DraggableGuest";
import { Guest } from "../../types";

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

  return (
    <div>
      <h3>Guests</h3>
      <div
        className="guest-list"
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        {guests.map((guest) => (
          <div
            key={guest.id}
            className="guest-item"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
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
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                }}
              />
            ) : (
              <DraggableGuest guest={guest} />
            )}
            <div
              className="guest-controls"
              style={{ display: "flex", gap: "10px" }}
            >
              {editingGuestId === guest.id ? (
                <button
                  onClick={handleSaveClick}
                  style={{
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "3px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditClick(guest)}
                  style={{
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "3px",
                    backgroundColor: "#008CBA",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => onDelete(guest.id)}
                style={{
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "3px",
                  backgroundColor: "#f44336",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestList;
