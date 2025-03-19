import { useDrag } from "react-dnd";
import { Guest } from "../../types";

const DraggableGuest = ({ guest }: { guest: Guest }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "guest",
    item: { id: guest.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as any}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="guest-item"
      title="Klikni i prevuci do stolice"
    >
      {guest.name}
    </div>
  );
};

export default DraggableGuest;
