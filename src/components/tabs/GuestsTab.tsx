import { Guest, Table } from "../../types";
import GuestForm from "../guests/GuestForm";
import GuestList from "../guests/GuestList";

interface GuestsTabProps {
  guests: Guest[];
  tables: Table[];
  addGuest: (name: string) => void;
  deleteGuest: (guestId: string) => void;
  editGuest: (id: string, name: string) => void;
  setGuests: React.Dispatch<React.SetStateAction<Guest[]>>;
  isMobile?: boolean;
  addGuestToTable?: (guestId: string, tableId: string) => void;
  removeGuestFromChair?: (guestId: string) => void;
}

const GuestsTab = ({
  guests,
  tables,
  addGuest,
  deleteGuest,
  editGuest,
  setGuests,
  isMobile = false,
  addGuestToTable,
  removeGuestFromChair,
}: GuestsTabProps) => {
  return (
    <>
      <GuestForm onAdd={addGuest} />
      <GuestList
        guests={guests}
        tables={tables}
        onDelete={deleteGuest}
        onEdit={editGuest}
        setGuests={setGuests}
        isMobile={isMobile}
        addGuestToTable={addGuestToTable}
        removeGuestFromChair={removeGuestFromChair}
      />
    </>
  );
};

export default GuestsTab;
