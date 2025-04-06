import { FaTrash, FaEdit, FaChair, FaSave } from "react-icons/fa";
import { Table } from "../../types";
import TableIcon from "../../utils/TableIcon";
import getItemCountFromLocalStorage from "../../utils/getItemCountFromLocalStorage";
import { useState } from "react";

interface TablesTabProps {
  tables: Table[];
  deleteTable: (id: string) => void;
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
  isMobile?: boolean;
  onTableClick?: (tableId: string) => void;
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
  isMobile = false,
  onTableClick,
}: TablesTabProps) => {
  const [editingTableId, setEditingTableId] = useState<string | null>(null);
  const [editingTableName, setEditingTableName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const buttonStyle = {
    padding: "12px 15px",
    border: "none",
    borderRadius: "var(--radius-md)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
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

  const handleTableClick = (table: Table) => {
    if (isMobile && onTableClick) {
      onTableClick(table.id);
    } else {
      setSelectedTable(table);
    }
  };

  const filteredTables = tables.filter((table) =>
    table.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getOccupiedChairsCount = (table: Table) => {
    return table.chairs.filter((chair) => chair.occupiedBy).length;
  };

  // Render mobile or desktop view
  if (isMobile) {
    return (
      <>
        <h3
          style={{
            fontFamily: "var(--font-secondary)",
            color: "var(--primary-dark)",
            fontSize: "1.8rem",
            marginBottom: "15px",
          }}
        >
          Napravi Sto
        </h3>
        <div
          className="table-creator"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "25px",
            padding: "15px",
            borderRadius: "var(--radius-lg)",
            backgroundColor: "white",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--primary-light)",
          }}
        >
          <select
            value={tableType}
            onChange={(e) =>
              setTableType(e.target.value as "rectangle" | "circle")
            }
            style={{
              padding: "12px 15px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--primary-light)",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
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
              style={{
                padding: "12px 15px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--primary-light)",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
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
            style={{
              padding: "12px 15px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--primary-light)",
              fontSize: "14px",
              transition: "all 0.2s ease",
            }}
          />
          <input
            type="number"
            min="1"
            value={newChairCount}
            onChange={(e) => setNewChairCount(Number(e.target.value))}
            style={{
              padding: "12px 15px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--primary-light)",
              fontSize: "14px",
              transition: "all 0.2s ease",
            }}
          />
          <button
            onClick={() => addTable(tableType)}
            style={{
              ...buttonStyle,
              backgroundColor: "rgb(126, 63, 94)",
              color: "#ffffff",
            }}
          >
            <TableIcon color="#ffffff" />
            Dodaj Sto
          </button>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-secondary)",
            color: "var(--primary-dark)",
            fontSize: "1.8rem",
            marginBottom: "15px",
          }}
        >
          Stolovi ({tables.length})
        </h3>

        <input
          type="text"
          placeholder="Pretraži stolove"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 15px",
            marginBottom: "12px",
            boxSizing: "border-box",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--primary-light)",
            fontSize: "14px",
            transition: "all 0.2s ease",
          }}
        />

        <div
          className="table-list-mobile"
          style={{
            padding: "15px",
            borderRadius: "var(--radius-lg)",
            backgroundColor: "white",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--primary-light)",
          }}
        >
          {filteredTables.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "30px 0",
                color: "#888",
                fontStyle: "italic",
              }}
            >
              Još nema stolova
            </div>
          ) : (
            <ol style={{ padding: 0, listStyleType: "none" }}>
              {filteredTables.map((table, index) => (
                <li
                  key={table.id}
                  className="table-item-list"
                  onClick={() => onTableClick && onTableClick(table.id)}
                  style={{
                    paddingRight: "8px",
                    marginBottom: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "var(--shadow-sm)",
                    borderRadius: "var(--radius-md)",
                    borderLeft: "4px solid var(--primary-color)",
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                        gap: "10px",
                        minWidth: 0,
                        overflow: "hidden",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          flexShrink: 0,
                          width: "22px",
                          height: "22px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "var(--primary-light)",
                          color: "var(--primary-dark)",
                          borderRadius: "50%",
                          fontSize: "12px",
                        }}
                      >
                        {index + 1}
                      </span>

                      <div style={{ flexShrink: 0 }}>
                        {table.type === "circle" ? (
                          <div
                            style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "50%",
                              border: "2px solid var(--accent)",
                              flexShrink: 0,
                            }}
                          ></div>
                        ) : (
                          <div
                            style={{
                              width: "18px",
                              height: "18px",
                              border: "2px solid var(--accent)",
                              flexShrink: 0,
                            }}
                          ></div>
                        )}
                      </div>

                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "var(--neutral-dark)",
                          flexGrow: 1,
                          minWidth: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {table.name}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "var(--primary-light)",
                        padding: "3px 8px",
                        borderRadius: "var(--radius-md)",
                        fontSize: "12px",
                        color: "var(--primary-dark)",
                      }}
                    >
                      <FaChair style={{ marginRight: "4px" }} size={12} />
                      <span>
                        {getOccupiedChairsCount(table)}/{table.chairs.length}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </>
    );
  }

  // Desktop view (original functionality)
  return (
    <>
      <h3
        style={{
          fontFamily: "var(--font-secondary)",
          color: "var(--primary-dark)",
          fontSize: "1.8rem",
          marginBottom: "15px",
        }}
      >
        Napravi Sto
      </h3>
      <div
        className="table-creator"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "25px",
          padding: "15px",
          borderRadius: "var(--radius-lg)",
          backgroundColor: "white",
          boxShadow: "var(--shadow-sm)",
          border: "1px solid var(--primary-light)",
        }}
      >
        <select
          value={tableType}
          onChange={(e) =>
            setTableType(e.target.value as "rectangle" | "circle")
          }
          style={{
            padding: "12px 15px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--primary-light)",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
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
            style={{
              padding: "12px 15px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--primary-light)",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
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
          style={{
            padding: "12px 15px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--primary-light)",
            fontSize: "14px",
            transition: "all 0.2s ease",
          }}
        />
        <input
          type="number"
          min="1"
          value={newChairCount}
          onChange={(e) => setNewChairCount(Number(e.target.value))}
          style={{
            padding: "12px 15px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--primary-light)",
            fontSize: "14px",
            transition: "all 0.2s ease",
          }}
        />
        <button
          onClick={() => addTable(tableType)}
          style={{
            ...buttonStyle,
            backgroundColor: "rgb(126, 63, 94)",
            color: "#ffffff",
          }}
        >
          <TableIcon color="#ffffff" />
          Dodaj Sto
        </button>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-secondary)",
          color: "var(--primary-dark)",
          fontSize: "1.8rem",
          marginBottom: "15px",
        }}
      >
        Lista Stolova ({tables.length})
      </h3>

      <input
        type="text"
        placeholder="Pretraži stolove"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 15px",
          marginBottom: "12px",
          boxSizing: "border-box",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--primary-light)",
          fontSize: "14px",
          transition: "all 0.2s ease",
        }}
      />

      <div
        className="table-list"
        style={{
          padding: "15px",
          borderRadius: "var(--radius-lg)",
          backgroundColor: "white",
          boxShadow: "var(--shadow-sm)",
          border: "1px solid var(--primary-light)",
        }}
      >
        {filteredTables.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "30px 0",
              color: "#888",
              fontStyle: "italic",
            }}
          >
            Još nema stolova
          </div>
        ) : (
          <ol style={{ padding: 0, listStyleType: "none" }}>
            {filteredTables.map((table, index) => (
              <li
                key={table.id}
                className="table-item-list"
                style={{
                  paddingRight: "8px",
                  marginBottom: "10px",
                  backgroundColor: "#fff",
                  boxShadow: "var(--shadow-sm)",
                  borderRadius: "var(--radius-md)",
                  borderLeft: "4px solid var(--primary-color)",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexGrow: 1,
                      gap: "6px",
                      minWidth: 0,
                      overflow: "hidden",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                        flexShrink: 0,
                        width: "22px",
                        height: "22px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "var(--primary-light)",
                        color: "var(--primary-dark)",
                        borderRadius: "50%",
                        fontSize: "12px",
                      }}
                    >
                      {index + 1}
                    </span>
                    {table.type === "circle" ? (
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          border: "2px solid var(--accent)",
                          flexShrink: 0,
                        }}
                      ></div>
                    ) : (
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          border: "2px solid var(--accent)",
                          flexShrink: 0,
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
                          marginRight: "5px",
                          padding: "6px 8px",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--primary-light)",
                          fontSize: "14px",
                          minWidth: 0,
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "var(--neutral-dark)",
                          flexGrow: 1,
                          minWidth: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {table.name}
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        backgroundColor: "var(--primary-light)",
                        padding: "3px 6px",
                        borderRadius: "var(--radius-md)",
                        fontSize: "12px",
                        color: "var(--primary-dark)",
                        visibility:
                          editingTableId === table.id ? "hidden" : "visible",
                      }}
                    >
                      <FaChair size={10} />
                      <span>
                        {getOccupiedChairsCount(table)}/{table.chairs.length}
                      </span>
                    </div>

                    {editingTableId === table.id ? (
                      <button
                        onClick={() => handleSaveClick(table.id)}
                        title="Sačuvaj"
                        style={{
                          width: "26px",
                          height: "26px",
                          padding: "0",
                          border: "none",
                          borderRadius: "var(--radius-circle)",
                          backgroundColor: "#4caf50",
                          color: "#ffffff",
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <FaSave />
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent firing table click when editing
                            handleEditClick(table);
                          }}
                          title="Izmeni ime stola"
                          style={{
                            width: "26px",
                            height: "26px",
                            padding: "0",
                            border: "none",
                            borderRadius: "var(--radius-circle)",
                            backgroundColor: "white",
                            color: "var(--accent-color)",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s ease",
                            boxShadow: "var(--shadow-sm)",
                          }}
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent firing table click when deleting
                            deleteTable(table.id);
                          }}
                          title="Obriši Sto"
                          style={{
                            width: "26px",
                            height: "26px",
                            padding: "0",
                            border: "none",
                            borderRadius: "var(--radius-circle)",
                            backgroundColor: "white",
                            color: "var(--danger-color)",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s ease",
                            boxShadow: "var(--shadow-sm)",
                          }}
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
};

export default TablesTab;
