import { Table, Chair } from "../types";
import { useState, useCallback } from "react";
import ChairComponent from "./ChairComponent";
import TableHeader from "./TableHeader";
import TableContextMenu from "./TableContextMenu";
import { Rnd } from "react-rnd";
import { v4 as uuidv4 } from "uuid";
import InfoIcon from "../assets/info.png";

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
  onDeleteTable?: (tableId: string) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  table,
  guests,
  onChairDrop,
  setTables,
  calculateChairPositions,
  onDeleteTable,
}) => {
  const [position, setPosition] = useState({ x: table.x, y: table.y });
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    position: { x: 0, y: 0 },
  });

  // Size constraints for circle tables
  const MIN_SIZE = 200;
  const MAX_SIZE = 500;

  // Handler for table position changes from drag operations
  const handlePositionChange = (x: number, y: number) => {
    setPosition({ x, y });
    setTables((prev) =>
      prev.map((t) => (t.id === table.id ? { ...t, x, y } : t))
    );
  };

  // Handler for table resize operations
  const handleResize = (width: number, height: number) => {
    // For circle tables, maintain aspect ratio and enforce size constraints
    if (table.type === "circle") {
      const size = Math.max(width, height);
      // Enforce min/max size for circles
      width = Math.min(Math.max(size, MIN_SIZE), MAX_SIZE);
      height = width; // Keep it circular
    }

    updateTableSize(width, height);
  };

  // Handler for size slider from context menu
  const handleSizeChange = (newSize: number) => {
    if (table.type === "circle") {
      // For circle tables, adjust both width and height
      const size = Math.min(Math.max(newSize, MIN_SIZE), MAX_SIZE);
      updateTableSize(size, size);
    }
  };

  // Shared function for updating table size
  const updateTableSize = (width: number, height: number) => {
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

  // Handler for right-click to open context menu
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      position: { x: e.clientX, y: e.clientY },
    });
  }, []);

  // Close context menu
  const closeContextMenu = useCallback(() => {
    setContextMenu({ ...contextMenu, visible: false });
  }, [contextMenu]);

  // Duplicate table
  const handleDuplicateTable = useCallback(() => {
    const newTable = {
      ...table,
      id: uuidv4(),
      name: `${table.name} (Kopija)`,
      x: table.x + 50,
      y: table.y + 50,
      chairs: table.chairs.map((chair) => ({
        ...chair,
        id: uuidv4(),
        occupiedBy: undefined,
      })),
    };

    setTables((prev) => [...prev, newTable]);
    closeContextMenu();
  }, [table, setTables, closeContextMenu]);

  // Delete table
  const handleDeleteTable = useCallback(() => {
    if (onDeleteTable) {
      onDeleteTable(table.id);
    } else {
      setTables((prev) => prev.filter((t) => t.id !== table.id));
    }
    closeContextMenu();
  }, [table.id, onDeleteTable, setTables, closeContextMenu]);

  // Configure resize handles based on table type
  const resizeHandles =
    table.type === "circle"
      ? false // Disable resize handles for circle tables
      : {
          // Enable all resize handles for rectangle tables
          bottom: true,
          bottomLeft: true,
          bottomRight: true,
          left: true,
          right: true,
          top: true,
          topLeft: true,
          topRight: true,
        };

  return (
    <>
      <Rnd
        position={position}
        size={{ width: table.width, height: table.height }}
        onDragStop={(e, d) => handlePositionChange(d.x, d.y)}
        onResizeStop={(e, direction, ref, delta, position) => {
          handleResize(parseInt(ref.style.width), parseInt(ref.style.height));
          handlePositionChange(position.x, position.y);
        }}
        dragHandleClassName="table-drag-handle"
        enableResizing={resizeHandles}
        bounds=".canvas" // <--- Add this line
      >
        <div
          className={`table ${table.type} table-drag-handle`}
          title={
            table.type === "circle"
              ? "Prevuci da pomeriš sto (Desni klik za opcije veličine)"
              : "Prevuci da pomeriš sto (Desni klik za opcije)"
          }
          onContextMenu={handleContextMenu}
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

      <TableContextMenu
        visible={contextMenu.visible}
        position={contextMenu.position}
        table={table}
        onClose={closeContextMenu}
        onSizeChange={handleSizeChange}
        onDuplicate={handleDuplicateTable}
        onDelete={handleDeleteTable}
        onNameChange={handleNameChange}
        // Add this prop to pass extra info for rectangles
        extraInfo={
          table.type === "rectangle" ? (
            <div
              className="rectangle-info"
              style={{
                marginTop: 8,
                color: "#888",
                fontSize: 13,
                display: "flex",
                alignItems: "start",
              }}
            >
              <img src={InfoIcon} alt="" style={{ width: "20px" }} />
              <p style={{ margin: 0, marginLeft: 5 }}>
                Za uvećanje stola, pređite mišem preko njegove ivice i prevucite
                kada se pojavi ikonica.
              </p>
            </div>
          ) : null
        }
      />
    </>
  );
};

export default TableComponent;
