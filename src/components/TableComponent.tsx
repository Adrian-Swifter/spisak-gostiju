import { Table, Chair } from "../types";
import { useState } from "react";
import ChairComponent from "./ChairComponent";
import TableHeader from "./TableHeader";
import { Rnd } from "react-rnd";

interface TableComponentProps {
  table: Table;
  guests: Array<{
    id: string;
    name: string;
    inviteSent: any;
    confirmedAttendance: any;
  }>;
  onChairDrop: (chairId: string, guestId: string) => void;
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
  calculateChairPositions: (
    type: "rectangle" | "circle",
    count: number,
    width: number,
    height: number,
    existingChairs?: Chair[],
    seatingType?: "one-sided" | "two-sided"
  ) => Chair[];
}

const TableComponent: React.FC<TableComponentProps> = ({
  table,
  guests,
  onChairDrop,
  setTables,
  calculateChairPositions,
}) => {
  const [position, setPosition] = useState({ x: table.x, y: table.y });

  // Handler for table position changes from drag operations
  const handlePositionChange = (x: number, y: number) => {
    setPosition({ x, y });
    setTables((prev) =>
      prev.map((t) => (t.id === table.id ? { ...t, x, y } : t))
    );
  };

  // Handler for table resize operations
  const handleResize = (width: number, height: number) => {
    // For circle tables, maintain aspect ratio
    if (table.type === "circle") {
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
                t.type === "circle" ? width : height,
                t.chairs,
                t.seatingType
              ),
            }
          : t
      )
    );
  };

  // Handler for adding/removing chairs
  const handleChairCount = (delta: number) => {
    const newCount = Math.max(1, table.chairsCount + delta);

    // When removing chairs
    if (delta < 0) {
      // Try to remove only empty chairs
      let remainingToRemove = Math.abs(delta);
      const newChairs = table.chairs.filter((chair) => {
        if (remainingToRemove > 0 && !chair.occupiedBy) {
          remainingToRemove--;
          return false;
        }
        return true;
      });

      // If there are still chairs to remove but all remaining have guests
      if (remainingToRemove > 0) {
        alert("Ne možete ukloniti stolicu sa gostom!");
        return;
      }

      updateTableWithNewChairs(newCount, newChairs);
    } else {
      // When adding chairs
      updateTableWithNewChairs(
        newCount,
        table.chairs.slice(0, Math.min(table.chairs.length, newCount))
      );
    }
  };

  // Helper to update the table with new chair configuration
  const updateTableWithNewChairs = (newCount: number, chairs: Chair[]) => {
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
                t.type === "circle" ? t.width : t.height,
                chairs,
                t.seatingType
              ),
            }
          : t
      )
    );
  };

  // Handler for table name changes
  const handleNameChange = (name: string) => {
    setTables((prev) =>
      prev.map((t) => (t.id === table.id ? { ...t, name } : t))
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
      <div
        className={`table ${table.type} table-drag-handle`}
        title="Prevuci da pomeriš sto"
      >
        <TableHeader
          table={table}
          onNameChange={handleNameChange}
          onChairCountChange={handleChairCount}
        />

        {/* Render all chairs */}
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
