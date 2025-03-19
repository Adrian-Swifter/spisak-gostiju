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
import {
  FaFileExport,
  FaFileImport,
  FaFileExcel,
  FaFilePdf,
  FaChair,
  FaTrash,
  FaRedo,
} from "react-icons/fa";
import DeviceWrapper from "./components/DeviceWrapper";

const App = () => {
  const [newTableName, setNewTableName] = useState("");
  const [newChairCount, setNewChairCount] = useState(8);
  const [showResetPopup, setShowResetPopup] = useState(false);

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

  const deleteGuest = (guestId: string) => {
    setGuests((prevGuests) => prevGuests.filter((g) => g.id !== guestId));
    localStorage.setItem(
      "guests",
      JSON.stringify(guests.filter((g) => g.id !== guestId))
    );

    setTables((prevTables) =>
      prevTables.map((table) => ({
        ...table,
        chairs: table.chairs.map((chair) => {
          if (chair.occupiedBy === guestId) {
            return { ...chair, occupiedBy: undefined };
          }
          return chair;
        }),
      }))
    );
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
    if (!newTableName) return alert("Unesite naziv stola!");

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
    setNewTableName("");
    setNewChairCount(8);
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
    a.download = "spisak-gostiju.json";
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
    utils.book_append_sheet(wb, ws, "Gosti");
    writeFile(wb, "spisak-gostiju.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Spisak Gostiju", 10, 10);
    guests.forEach((guest, index) => {
      doc.text(`${index + 1}. ${guest.name}`, 10, 20 + index * 10);
    });
    doc.save("spisak-gostiju.pdf");
  };

  const resetEverything = () => {
    setGuests([]);
    setTables([]);
    localStorage.removeItem("guests");
    localStorage.removeItem("tables");
    setShowResetPopup(false);
  };

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

  const iconStyle = { marginRight: "5px" };

  return (
    <DeviceWrapper>
      <DndProvider backend={HTML5Backend}>
        <div className="app">
          <div className="sidebar">
            <div
              style={{
                textAlign: "center",
                marginBottom: "2rem",
                padding: "1rem",
                borderBottom: "1px solid #eee",
              }}
            >
              <img
                src="/src/assets/logo.png"
                alt="App Logo"
                style={{
                  maxWidth: "100px",
                  height: "auto",
                  margin: "0 auto",
                  display: "block",
                }}
              />
            </div>
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
              <label
                style={{
                  ...buttonStyle,
                  backgroundColor: "#fff",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                }}
              >
                <FaFileImport style={iconStyle} />
                Uvezite Konfiguraciju
                <input
                  type="file"
                  onChange={importData}
                  accept=".json"
                  style={{
                    display: "none",
                  }}
                />
              </label>
              <button
                onClick={exportData}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #ccc",
                }}
              >
                <FaFileExport style={iconStyle} />
                Sačuvaj Konfiguraciju
              </button>
              <button
                onClick={exportExcel}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #ccc",
                }}
              >
                <FaFileExcel style={iconStyle} />
                Izvezi Excel Spisak Gostiju
              </button>
              <button
                onClick={exportPDF}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #ccc",
                }}
              >
                <FaFilePdf style={iconStyle} />
                Izvezi PDF Spisak Gostiju
              </button>
              <button
                onClick={exportCanvasToPDF}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #ccc",
                }}
              >
                <FaChair style={iconStyle} />
                Izvezi Plan Sale PDF
              </button>
              <button
                onClick={() => setShowResetPopup(true)}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #ccc",
                }}
              >
                <FaRedo style={iconStyle} />
                Resetuj Sve
              </button>
            </div>
            <GuestList
              guests={guests}
              onDelete={deleteGuest}
              onEdit={editGuest}
            />
            <h3>Napravi Sto</h3>
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
                <FaChair style={iconStyle} />
                Dodaj Sto
              </button>
            </div>
            <h3 style={{ marginBottom: "10px" }}>Lista Stolova</h3>
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
        {showResetPopup && (
          <div
            className="reset-popup"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              zIndex: 1000,
            }}
          >
            <h3>Da li želite da sačuvate konfiguraciju pre resetovanja?</h3>
            <div
              className="button-group"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <button
                onClick={exportData}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #ccc",
                }}
              >
                <FaFileExport style={iconStyle} />
                Sačuvaj konfiguraciju
              </button>
              <button
                onClick={resetEverything}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #ccc",
                }}
              >
                <FaRedo style={iconStyle} />
                Resetuj Sve
              </button>
              <button
                onClick={() => setShowResetPopup(false)}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #ccc",
                }}
              >
                Otkaži
              </button>
            </div>
          </div>
        )}
      </DndProvider>
    </DeviceWrapper>
  );
};

export default App;
