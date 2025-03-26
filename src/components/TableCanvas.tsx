import { Guest, Table } from "../types";
import TableComponent from "./TableComponent";

interface TableCanvasProps {
  tables: Table[];
  guests: Guest[];
  handleChairDrop: (chairId: string, guestId: string) => void;
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
  calculateChairPositions: any; // Using any type to match the original implementation
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
