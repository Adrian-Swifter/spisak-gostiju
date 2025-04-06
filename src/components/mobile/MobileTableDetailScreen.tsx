import React from "react";
import { FaArrowLeft, FaChair, FaTrash } from "react-icons/fa";
import { Table, Guest } from "../../types";

interface MobileTableDetailScreenProps {
  table: Table;
  guests: Guest[];
  onBack: () => void;
  removeGuestFromChair: (guestId: string) => void;
}

const MobileTableDetailScreen: React.FC<MobileTableDetailScreenProps> = ({
  table,
  guests,
  onBack,
  removeGuestFromChair,
}) => {
  // Find guests assigned to this table
  const assignedGuestIds = table.chairs
    .filter((chair) => chair.occupiedBy)
    .map((chair) => chair.occupiedBy as string);

  const assignedGuests = guests.filter((guest) =>
    assignedGuestIds.includes(guest.id)
  );

  const totalChairs = table.chairs.length;
  const occupiedChairs = assignedGuestIds.length;
  const freeChairs = totalChairs - occupiedChairs;

  return (
    <div className="mobile-table-detail">
      <div className="mobile-table-detail-header">
        <button className="mobile-table-detail-back" onClick={onBack}>
          <FaArrowLeft />
        </button>
        <h2 className="mobile-table-detail-title">{table.name}</h2>
      </div>

      <div className="table-info-card">
        <div className="info-item">
          <span className="info-label">Ukupno stolica</span>
          <span className="info-value">
            <FaChair /> {totalChairs}
          </span>
        </div>

        <div className="info-item">
          <span className="info-label">Zauzeto stolica</span>
          <span className="info-value">{occupiedChairs}</span>
        </div>

        <div className="info-item">
          <span className="info-label">Slobodno stolica</span>
          <span className="info-value">{freeChairs}</span>
        </div>
      </div>

      <h3 className="section-title">Gosti za ovim stolom</h3>

      {assignedGuests.length === 0 ? (
        <div className="empty-message">Nema gostiju za ovim stolom</div>
      ) : (
        <div className="assigned-guests-list">
          {assignedGuests.map((guest) => (
            <div key={guest.id} className="guest-item">
              <div className="guest-name">{guest.name}</div>
              <button
                onClick={() => removeGuestFromChair(guest.id)}
                className="remove-guest-btn"
                title="Ukloni gosta sa stola"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="help-note">
        <p>
          Da biste dodali goste na sto, idite na tab "Gosti" i koristite opciju
          "Dodaj na sto".
        </p>
      </div>
    </div>
  );
};

export default MobileTableDetailScreen;
