import { Guest, Table, Chair } from "../types";
import TableComponent from "./TableComponent";

interface TableCanvasProps {
  tables: Table[];
  guests: Guest[];
  handleChairDrop: (chairId: string, guestId: string) => void;
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
  calculateChairPositions: (
    type: "rectangle" | "circle",
    count: number,
    width: number,
    height: number,
    existingChairs?: Chair[],
    seatingType?: "one-sided" | "two-sided"
  ) => Chair[];
  deleteTable?: (tableId: string) => void;
}

const TableCanvas = ({
  tables,
  guests,
  handleChairDrop,
  setTables,
  calculateChairPositions,
  deleteTable,
}: TableCanvasProps) => {
  // Handler for deleting a table
  const handleDeleteTable = (tableId: string) => {
    if (deleteTable) {
      deleteTable(tableId);
    } else {
      setTables((prev) => prev.filter((table) => table.id !== tableId));
    }
  };

  return (
    <div
      className="canvas"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "400px",
        minWidth: "400px",
        overflow: "auto",
        background: "#f8f8f8",
        margin: 0,
        flex: 1,
        boxSizing: "border-box",
      }}
    >
      {tables.map((table) => (
        <TableComponent
          key={table.id}
          table={table}
          guests={guests}
          onChairDrop={handleChairDrop}
          setTables={setTables}
          calculateChairPositions={calculateChairPositions}
          onDeleteTable={handleDeleteTable}
        />
      ))}
    </div>
  );
};

export default TableCanvas;
