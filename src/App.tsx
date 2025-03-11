import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import { Guest, Table } from "./types";
import calculateChairPositions from "./utils/calculateChairPositions";
import GuestForm from "./components/guests/GuestForm";
import GuestList from "./components/guests/GuestList";
import TableComponent from "./components/TableComponent";
import exportCanvasToPDF from "./utils/exportCanvasToPDF";

const App = () => {
  const [newTableName, setNewTableName] = useState("");
  const [newChairCount, setNewChairCount] = useState(8);

  const [guests, setGuests] = useState<Guest[]>(() => {
    const saved = localStorage.getItem("guests");
    return saved ? JSON.parse(saved) : [];
  });

  const [tables, setTables] = useState<Table[]>(() => {
    const saved = localStorage.getItem("tables");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tables", JSON.stringify(tables));
    localStorage.setItem("guests", JSON.stringify(guests));
  }, [tables, guests]);

  const addGuest = (name: string) => {
    const newGuest = { id: uuidv4(), name };
    setGuests([...guests, newGuest]);
    localStorage.setItem("guests", JSON.stringify([...guests, newGuest]));
  };

  const deleteGuest = (id: string) => {
    const updatedGuests = guests.filter((guest) => guest.id !== id);
    setGuests(updatedGuests);
    localStorage.setItem("guests", JSON.stringify(updatedGuests));
  };

  const editGuest = (id: string, name: string) => {
    const updatedGuests = guests.map((guest) =>
      guest.id === id ? { ...guest, name } : guest
    );
    setGuests(updatedGuests);
    localStorage.setItem("guests", JSON.stringify(updatedGuests));
  };

  const [seatingType, setSeatingType] = useState<"one-sided" | "two-sided">(
    "two-sided"
  );

  const [tableType, setTableType] = useState<"rectangle" | "circle">(
    "rectangle"
  );

  const calculateInitialSize = (
    type: "rectangle" | "circle",
    chairsCount: number
  ) => {
    const chairWidth = 40;
    const minWidth = 200;

    if (type === "rectangle") {
      const chairsPerSide =
        seatingType === "one-sided" ? chairsCount : Math.ceil(chairsCount / 2);
      return Math.max(minWidth, chairsPerSide * chairWidth);
    }
    return 200;
  };

  const addTable = (type: "rectangle" | "circle") => {
    if (!newTableName) return alert("Please enter table name");

    const initialWidth = calculateInitialSize(type, newChairCount);
    const initialHeight = type === "circle" ? initialWidth : 100;

    const newTable: Table = {
      id: uuidv4(),
      name: newTableName,
      type,
      seatingType: type === "rectangle" ? seatingType : undefined,
      x: 100,
      y: 100,
      width: initialWidth,
      height: initialHeight,
      chairsCount: newChairCount,
      chairs: calculateChairPositions(
        type,
        newChairCount,
        initialWidth,
        initialHeight,
        [],
        seatingType
      ),
    };

    setTables([...tables, newTable]);
  };

  const deleteTable = (tableId: string) => {
    setTables((prevTables) =>
      prevTables.filter((table) => table.id !== tableId)
    );
  };

  const handleChairDrop = (chairId: string, guestId: string) => {
    setTables((prevTables) =>
      prevTables.map((table) => ({
        ...table,
        chairs: table.chairs.map((chair) => {
          // Clear previous seat if same guest
          if (chair.occupiedBy === guestId) {
            return { ...chair, occupiedBy: undefined };
          }
          // Update target chair
          if (chair.id === chairId) {
            return { ...chair, occupiedBy: guestId || undefined };
          }
          return chair;
        }),
      }))
    );
  };

  const exportData = () => {
    const data = { guests, tables };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding-plan.json";
    a.click();
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = JSON.parse(event.target?.result as string);
        setGuests(data.guests);
        setTables(data.tables);
        localStorage.setItem("guests", JSON.stringify(data.guests));
        localStorage.setItem("tables", JSON.stringify(data.tables));
      };
      reader.readAsText(file);
    }
  };

  const exportExcel = () => {
    const ws = utils.json_to_sheet(guests);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Guests");
    writeFile(wb, "guests.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Guest List", 10, 10);
    guests.forEach((guest, index) => {
      doc.text(`${index + 1}. ${guest.name}`, 10, 20 + index * 10);
    });
    doc.save("guests.pdf");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <div className="sidebar">
          <GuestForm onAdd={addGuest} />
          <div
            className="button-group"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <input
              type="file"
              onChange={importData}
              accept=".json"
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            />
            <button
              onClick={exportData}
              style={{
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#17a2b8",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Export JSON
            </button>
            <button
              onClick={exportExcel}
              style={{
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#ffc107",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Export Excel
            </button>
            <button
              onClick={exportPDF}
              style={{
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#dc3545",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Export PDF
            </button>
            <button
              onClick={exportCanvasToPDF}
              style={{
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#6c757d",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Exportuj Plan Sale
            </button>
          </div>
          <GuestList
            guests={guests}
            onDelete={deleteGuest}
            onEdit={editGuest}
          />
          <div className="table-creator">
            <h3>Create Table</h3>
            <select
              value={tableType}
              onChange={(e) =>
                setTableType(e.target.value as "rectangle" | "circle")
              }
            >
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
            </select>

            {tableType === "rectangle" && (
              <select
                value={seatingType}
                onChange={(e) =>
                  setSeatingType(e.target.value as "one-sided" | "two-sided")
                }
              >
                <option value="one-sided">One-sided seating</option>
                <option value="two-sided">Two-sided seating</option>
              </select>
            )}
            <input
              type="text"
              placeholder="Table name"
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
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Add Table
            </button>
          </div>
          <div className="table-list" style={{ marginTop: "20px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
              Table List
            </h3>
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
                  style={{
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "3px",
                    backgroundColor: "#ff4d4d",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
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
      </div>
    </DndProvider>
  );
};

export default App;
