import { TableComponentProps } from "../types";
import { useState } from "react";
import ChairComponent from "./ChairComponent";
import { Rnd } from "react-rnd";

const TableComponent = ({
  table,
  guests,
  onChairDrop,
  setTables,
  calculateChairPositions,
}: TableComponentProps) => {
  const [position, setPosition] = useState({ x: table.x, y: table.y });

  const handlePositionChange = (x: number, y: number) => {
    setPosition({ x, y });
    setTables((prev) =>
      prev.map((t) => (t.id === table.id ? { ...t, x, y } : t))
    );
  };

  const handleResize = (width: number, height: number) => {
    if (table.type === "circle") {
      // Maintain aspect ratio
      const size = Math.max(width, height);
      width = size;
      height = size;
    }

    setTables((prev) =>
      prev.map((t) =>
        t.id === table.id
          ? {
              ...t,
              width,
              height: t.type === "circle" ? width : height,
              chairs: calculateChairPositions(
                t.type,
                t.chairsCount,
                width,
                height,
                t.chairs,
                t.seatingType
              ),
            }
          : t
      )
    );
  };

  const handleChairCount = (delta: number) => {
    const newCount = Math.max(1, table.chairsCount + delta);

    // Prevent removing chairs with guests
    if (delta < 0) {
      const chairsToRemove = table.chairs.slice(newCount);
      const hasOccupied = chairsToRemove.some((chair) => chair.occupiedBy);

      if (hasOccupied) {
        alert("Ne možete ukloniti stolicu sa gostom!");
        return;
      }
    }

    setTables((prev) =>
      prev.map((t) =>
        t.id === table.id
          ? {
              ...t,
              chairsCount: newCount,
              chairs: calculateChairPositions(
                t.type,
                newCount,
                t.width,
                t.height,
                t.chairs.slice(0, newCount),
                t.seatingType
              ),
            }
          : t
      )
    );
  };

  return (
    <Rnd
      position={position}
      size={{ width: table.width, height: table.height }}
      onDragStop={(e, d) => handlePositionChange(d.x, d.y)}
      onResizeStop={(e, direction, ref, delta, position) => {
        handleResize(parseInt(ref.style.width), parseInt(ref.style.height));
        handlePositionChange(position.x, position.y);
      }}
      dragHandleClassName="table-drag-handle"
      enableResizing={{
        bottom: true,
        bottomLeft: true,
        bottomRight: true,
        left: true,
        right: true,
        top: true,
        topLeft: true,
        topRight: true,
      }}
    >
      <div className={`table ${table.type} table-drag-handle`}>
        <div className="table-header">
          <input
            type="text"
            value={table.name}
            onChange={(e) => {
              setTables((prev) =>
                prev.map((t) =>
                  t.id === table.id ? { ...t, name: e.target.value } : t
                )
              );
            }}
            className="table-name-input"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="chair-controls">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleChairCount(-1);
              }}
            >
              -
            </button>
            <span>{table.chairs.length}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleChairCount(1);
              }}
            >
              +
            </button>
          </div>
        </div>
        {table.chairs.map((chair) => (
          <ChairComponent
            key={chair.id}
            chair={chair}
            guest={guests.find((g) => g.id === chair.occupiedBy)}
            onDrop={(guestId) => onChairDrop(chair.id, guestId)}
          />
        ))}
      </div>
    </Rnd>
  );
};

export default TableComponent;
