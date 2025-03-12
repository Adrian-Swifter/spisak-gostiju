import { useDrop } from "react-dnd";
import { Chair, Guest } from "../types";

const ChairComponent = ({
  chair,
  guest,
  onDrop,
}: {
  chair: Chair;
  guest?: Guest;
  onDrop: (guestId: string) => void;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "guest",
    drop: (item: { id: string }) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleClick = () => {
    if (chair.occupiedBy) {
      onDrop("");
    }
  };

  return (
    <div
      ref={(node) => drop(node)}
      className="chair"
      style={{
        left: chair.x,
        top: chair.y,
        backgroundColor: isOver ? "lightgreen" : guest ? "lightgreen" : "white",
      }}
      onClick={handleClick}
      data-side={chair.side}
    >
      {guest?.name || " "}
    </div>
  );
};

export default ChairComponent;
