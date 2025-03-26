import { FaTrash } from "react-icons/fa";
import { Table } from "../../types";
import TableIcon from "../../utils/TableIcon";
import getItemCountFromLocalStorage from "../../utils/getItemCountFromLocalStorage";

interface TablesTabProps {
  tables: Table[];
  deleteTable: (tableId: string) => void;
  addTable: (type: "rectangle" | "circle") => void;
  newTableName: string;
  setNewTableName: (name: string) => void;
  newChairCount: number;
  setNewChairCount: (count: number) => void;
  tableType: "rectangle" | "circle";
  setTableType: (type: "rectangle" | "circle") => void;
  seatingType: "one-sided" | "two-sided";
  setSeatingType: (type: "one-sided" | "two-sided") => void;
}

const TablesTab = ({
  tables,
  deleteTable,
  addTable,
  newTableName,
  setNewTableName,
  newChairCount,
  setNewChairCount,
  tableType,
  setTableType,
  seatingType,
  setSeatingType,
}: TablesTabProps) => {
  const buttonStyle = {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <>
      <h3 style={{ marginBottom: "10px" }}>Napravi Sto</h3>
      <div className="table-creator">
        <select
          value={tableType}
          onChange={(e) =>
            setTableType(e.target.value as "rectangle" | "circle")
          }
        >
          <option value="rectangle">Četvrtasti</option>
          <option value="circle">Kružni</option>
        </select>

        {tableType === "rectangle" && (
          <select
            value={seatingType}
            onChange={(e) =>
              setSeatingType(e.target.value as "one-sided" | "two-sided")
            }
          >
            <option value="one-sided">Jednostrano sedenje</option>
            <option value="two-sided">Dvostrano sedenje</option>
          </select>
        )}
        <input
          type="text"
          placeholder="Ime stola"
          value={newTableName}
          onChange={(e) => setNewTableName(e.target.value)}
        />
        <input
          type="number"
          min="1"
          value={newChairCount}
          onChange={(e) => setNewChairCount(Number(e.target.value))}
        />
        <button
          onClick={() => addTable(tableType)}
          style={{
            ...buttonStyle,
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          <TableIcon />
          Dodaj Sto
        </button>
      </div>
      <h3 style={{ marginBottom: "10px" }}>
        Lista Stolova ({getItemCountFromLocalStorage("tables")})
      </h3>
      <div className="table-list" style={{ marginTop: "20px" }}>
        {tables.map((table) => (
          <div
            key={table.id}
            className="table-item"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: "500" }}>
              {table.name}
            </span>
            <button
              onClick={() => deleteTable(table.id)}
              title="Obriši Sto"
              style={{
                padding: "5px 10px",
                borderRadius: "3px",
                backgroundColor: "inherit",
                color: "black",
                fontSize: "1.2rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default TablesTab;
