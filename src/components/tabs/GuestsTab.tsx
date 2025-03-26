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
}

const GuestsTab = ({
  guests,
  tables,
  addGuest,
  deleteGuest,
  editGuest,
  setGuests,
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
      />
    </>
  );
};

export default GuestsTab;
