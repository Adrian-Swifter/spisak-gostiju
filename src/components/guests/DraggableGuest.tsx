import { useDrag } from "react-dnd";
import { Guest } from "../../types";
import { FaUserAlt } from "react-icons/fa";

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
      style={{
        opacity: isDragging ? 0.5 : 1,
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontWeight: "500",
        fontSize: "14px",
        color: "var(--neutral-dark)",
        transition: "all 0.2s ease",
        transform: isDragging ? "scale(0.98)" : "scale(1)",
      }}
      className="guest-item"
      title="Klikni i prevuci do stolice"
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          width: "18px",
          height: "18px",
          backgroundColor: "var(--accent-light)",
          borderRadius: "50%",
          color: "var(--accent-color)",
          fontSize: "9px",
        }}
      >
        <FaUserAlt />
      </div>
      <span
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "calc(100% - 23px)",
        }}
      >
        {guest.name}
      </span>
    </div>
  );
};

export default DraggableGuest;
