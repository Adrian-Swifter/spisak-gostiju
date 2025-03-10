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

  // In App component
  useEffect(() => {
    localStorage.setItem("tables", JSON.stringify(tables));
    localStorage.setItem("guests", JSON.stringify(guests));
  }, [tables, guests]);

  const addGuest = (name: string) => {
    const newGuest = { id: uuidv4(), name };
    setGuests([...guests, newGuest]);
    localStorage.setItem("guests", JSON.stringify([...guests, newGuest]));
  };

  // Update the circle table creation in addTable function
  const addTable = (type: "rectangle" | "circle") => {
    if (!newTableName) return alert("Please enter table name");

    const initialSize = type === "circle" ? 200 : 200; // Increased initial size
    const initialHeight = type === "circle" ? 200 : 100;

    const newTable: Table = {
      id: uuidv4(),
      name: newTableName,
      type,
      x: 100,
      y: 100,
      width: initialSize,
      height: initialHeight,
      chairsCount: newChairCount,
      chairs: calculateChairPositions(
        type,
        newChairCount,
        initialSize,
        initialHeight
      ),
    };

    setTables([...tables, newTable]);
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
          <button onClick={() => addTable("rectangle")}>
            Add Rectangle Table
          </button>
          <button onClick={() => addTable("circle")}>Add Circle Table</button>
          <input type="file" onChange={importData} accept=".json" />
          <button onClick={exportData}>Export JSON</button>
          <button onClick={exportExcel}>Export Excel</button>
          <button onClick={exportPDF}>Export PDF</button>
          <GuestList guests={guests} />
          <div className="table-creator">
            <h3>Create Table</h3>
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
            <button onClick={() => addTable("rectangle")}>
              Add Rectangle Table
            </button>
            <button onClick={() => addTable("circle")}>Add Circle Table</button>
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
