import DraggableGuest from "./DraggableGuest";

import { Guest } from "../../types";

const GuestList = ({ guests }: { guests: Guest[] }) => {
  return (
    <div>
      <h3>Guests</h3>
      <div className="guest-list">
        {guests.map((guest) => (
          <DraggableGuest key={guest.id} guest={guest} />
        ))}
      </div>
    </div>
  );
};

export default GuestList;
