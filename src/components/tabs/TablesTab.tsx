import { FaTrash, FaEdit, FaChair, FaSave } from "react-icons/fa";
import { Table } from "../../types";
import TableIcon from "../../utils/TableIcon";
import getItemCountFromLocalStorage from "../../utils/getItemCountFromLocalStorage";
import { useState } from "react";

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
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
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
  setTables,
}: TablesTabProps) => {
  const [editingTableId, setEditingTableId] = useState<string | null>(null);
  const [editingTableName, setEditingTableName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const handleEditClick = (table: Table) => {
    setEditingTableId(table.id);
    setEditingTableName(table.name);
  };

  const handleSaveClick = (tableId: string) => {
    if (editingTableName.trim()) {
      const updatedTables = tables.map((table) =>
        table.id === tableId ? { ...table, name: editingTableName } : table
      );

      // Update both the localStorage and the state
      localStorage.setItem("tables", JSON.stringify(updatedTables));
      setTables(updatedTables);
    }

    setEditingTableId(null);
  };

  const filteredTables = tables.filter((table) =>
    table.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getOccupiedChairsCount = (table: Table) => {
    return table.chairs.filter((chair) => chair.occupiedBy).length;
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

      <input
        type="text"
        placeholder="Pretraži stolove"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
      />

      <div className="table-list" style={{ marginTop: "20px" }}>
        <ol style={{ padding: 0, listStyleType: "none" }}>
          {filteredTables.map((table, index) => (
            <li
              key={table.id}
              className="table-item-list"
              style={{
                paddingRight: "5px",
                marginBottom: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                wordWrap: "break-word",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: "1",
                    gap: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>{index + 1}.</span>
                  {table.type === "circle" ? (
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        border: "2px solid #0066cc",
                        marginRight: "5px",
                      }}
                    ></div>
                  ) : (
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid #0066cc",
                        marginRight: "5px",
                      }}
                    ></div>
                  )}

                  {editingTableId === table.id ? (
                    <input
                      type="text"
                      value={editingTableName}
                      onChange={(e) => setEditingTableName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveClick(table.id);
                        if (e.key === "Escape") setEditingTableId(null);
                      }}
                      autoFocus
                      style={{
                        flex: "1",
                        marginRight: "10px",
                        padding: "5px",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: "16px",
                        maxWidth: "160px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "block",
                      }}
                    >
                      {table.name}
                    </span>
                  )}
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#f5f5f5",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      visibility:
                        editingTableId === table.id ? "hidden" : "visible",
                    }}
                  >
                    <FaChair size={12} />
                    <span>
                      {getOccupiedChairsCount(table)}/{table.chairs.length}
                    </span>
                  </div>

                  {editingTableId === table.id ? (
                    <button
                      onClick={() => handleSaveClick(table.id)}
                      title="Sačuvaj"
                      style={{
                        background: "none",
                        border: "none",
                        padding: "5px",
                        color: "#28a745",
                        cursor: "pointer",
                      }}
                    >
                      <FaSave size={16} />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(table)}
                        title="Izmeni ime stola"
                        style={{
                          background: "none",
                          border: "none",
                          padding: "5px",
                          color: "#0066cc",
                          cursor: "pointer",
                        }}
                      >
                        <FaEdit size={16} />
                      </button>

                      <button
                        onClick={() => deleteTable(table.id)}
                        title="Obriši Sto"
                        style={{
                          background: "none",
                          border: "none",
                          padding: "5px",
                          color: "#f44336",
                          cursor: "pointer",
                        }}
                      >
                        <FaTrash size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default TablesTab;
