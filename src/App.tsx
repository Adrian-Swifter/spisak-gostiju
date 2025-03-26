import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import { Guest, Table } from "./types";
import calculateChairPositions from "./utils/calculateChairPositions";
import exportCanvasToPDF from "./utils/exportCanvasToPDF";
import DeviceWrapper from "./components/DeviceWrapper";
import Sidebar from "./components/Sidebar";
import GuestsTab from "./components/tabs/GuestsTab";
import TablesTab from "./components/tabs/TablesTab";
import SettingsTab from "./components/tabs/SettingsTab";
import TableCanvas from "./components/TableCanvas";
import InfoPopups from "./components/InfoPopups";
import ResetPopup from "./components/ResetPopup";

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
  const [activeTab, setActiveTab] = useState<"guests" | "tables" | "settings">(
    "guests"
  );
  const [seatingType, setSeatingType] = useState<"one-sided" | "two-sided">(
    "two-sided"
  );
  const [tableType, setTableType] = useState<"rectangle" | "circle">(
    "rectangle"
  );

  useEffect(() => {
    localStorage.setItem("tables", JSON.stringify(tables));
    localStorage.setItem("guests", JSON.stringify(guests));
  }, [tables, guests]);

  const addGuest = (name: string) => {
    const newGuest: Guest = {
      id: uuidv4(),
      name,
      inviteSent: false,
      confirmedAttendance: false,
    };
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
    const formattedData = guests.map((guest, index) => ({
      "Redni broj": index + 1,
      "Ime gosta": guest.name,
    }));

    const ws = utils.json_to_sheet(formattedData, {
      header: ["Redni broj", "Ime gosta"],
    });

    ws["!cols"] = [{ wch: 10 }, { wch: 30 }];

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Spisak gostiju");
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

  // Render the appropriate tab content based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case "guests":
        return (
          <GuestsTab
            guests={guests}
            tables={tables}
            addGuest={addGuest}
            deleteGuest={deleteGuest}
            editGuest={editGuest}
            setGuests={setGuests}
          />
        );
      case "tables":
        return (
          <TablesTab
            tables={tables}
            deleteTable={deleteTable}
            addTable={addTable}
            newTableName={newTableName}
            setNewTableName={setNewTableName}
            newChairCount={newChairCount}
            setNewChairCount={setNewChairCount}
            tableType={tableType}
            setTableType={setTableType}
            seatingType={seatingType}
            setSeatingType={setSeatingType}
            setTables={setTables}
          />
        );
      case "settings":
        return (
          <SettingsTab
            exportData={exportData}
            importData={importData}
            exportExcel={exportExcel}
            exportPDF={exportPDF}
            exportCanvasToPDF={exportCanvasToPDF}
            setShowResetPopup={setShowResetPopup}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DeviceWrapper>
      <DndProvider backend={HTML5Backend}>
        <div className="app">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}>
            {renderTabContent()}
          </Sidebar>

          <TableCanvas
            tables={tables}
            guests={guests}
            handleChairDrop={handleChairDrop}
            setTables={setTables}
            calculateChairPositions={calculateChairPositions}
            deleteTable={deleteTable}
          />

          <InfoPopups guests={guests} tables={tables} />

          <ResetPopup
            showResetPopup={showResetPopup}
            setShowResetPopup={setShowResetPopup}
            exportData={exportData}
            resetEverything={resetEverything}
          />
        </div>
      </DndProvider>
    </DeviceWrapper>
  );
};

export default App;
