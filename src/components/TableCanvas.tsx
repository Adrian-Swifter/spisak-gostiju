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
}

const TableCanvas = ({
  tables,
  guests,
  handleChairDrop,
  setTables,
  calculateChairPositions,
}: TableCanvasProps) => {
  return (
    <div className="canvas">
      {tables.map((table) => (
        <TableComponent
          key={table.id}
          table={table}
          guests={guests}
          onChairDrop={handleChairDrop}
          setTables={setTables}
          calculateChairPositions={calculateChairPositions}
        />
      ))}
    </div>
  );
};

export default TableCanvas;
