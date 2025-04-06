import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { Guest, Table, Chair } from "./types";

// Import utility functions
import calculateChairPositions from "./utils/calculateChairPositions";
import exportCanvasToPDF from "./utils/exportCanvasToPDF";
import exportToPdf from "./utils/exportToPdf";
import exportToExcel from "./utils/exportToExcel";
import { exportData, importData } from "./utils/dataUtils";

// Component imports
import Sidebar from "./components/Sidebar";
import GuestsTab from "./components/tabs/GuestsTab";
import TablesTab from "./components/tabs/TablesTab";
import SettingsTab from "./components/tabs/SettingsTab";
import ResetPopup from "./components/ResetPopup";
import MobileTableDetailScreen from "./components/mobile/MobileTableDetailScreen";
import MobileWelcomePopup from "./components/mobile/MobileWelcomePopup";
import MobileBanner from "./components/mobile/MobileBanner";

const MobileApp = () => {
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

  // Mobile specific states
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  useEffect(() => {
    // Check if the welcome popup has been shown before
    const welcomeShown = localStorage.getItem("mobileWelcomeShown") === "true";
    setShowWelcomePopup(!welcomeShown);
  }, []);

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
    setGuests((prevGuests) =>
      prevGuests.map((g) => (g.id === id ? { ...g, name } : g))
    );
  };

  const addTable = (type: "rectangle" | "circle") => {
    // Calculate dimensions based on table type
    const width = type === "rectangle" ? 160 : 120;
    const height = type === "rectangle" ? 90 : 120;

    const newTable: Table = {
      id: uuidv4(),
      name: newTableName || `Sto ${tables.length + 1}`,
      type: type,
      x: 50,
      y: 50,
      width: width,
      height: height,
      chairsCount: newChairCount,
      chairs: [],
      seatingType: seatingType,
    };

    // Calculate chairs based on table type and seating
    newTable.chairs = calculateChairPositions(
      type,
      newChairCount,
      width,
      height,
      undefined,
      seatingType
    );

    setTables([...tables, newTable]);

    // Clear the input after adding
    setNewTableName("");
  };

  const deleteTable = (id: string) => {
    setTables((prevTables) => prevTables.filter((table) => table.id !== id));
  };

  // Mobile specific function to add a guest to a table
  const addGuestToTable = (guestId: string, tableId: string) => {
    const table = tables.find((t) => t.id === tableId);
    if (!table) return;

    // Find the first available empty chair
    const availableChair = table.chairs.find((chair) => !chair.occupiedBy);
    if (!availableChair) {
      alert("Nema slobodnih mesta za ovog gosta. Dodajte više stolica.");
      return;
    }

    // Update the tables with the guest assigned to the chair
    setTables((prevTables) =>
      prevTables.map((table) => {
        if (table.id === tableId) {
          return {
            ...table,
            chairs: table.chairs.map((chair) => {
              // Clear previous assignment of this guest
              if (chair.occupiedBy === guestId) {
                return { ...chair, occupiedBy: undefined };
              }

              // Assign to first available chair
              if (chair.id === availableChair.id) {
                return { ...chair, occupiedBy: guestId };
              }

              return chair;
            }),
          };
        }

        // For other tables, clear this guest from any chairs
        return {
          ...table,
          chairs: table.chairs.map((chair) => {
            if (chair.occupiedBy === guestId) {
              return { ...chair, occupiedBy: undefined };
            }
            return chair;
          }),
        };
      })
    );
  };

  // Remove guest from chair
  const removeGuestFromChair = (guestId: string) => {
    setTables((prevTables) =>
      prevTables.map((table) => {
        return {
          ...table,
          chairs: table.chairs.map((chair) => {
            if (chair.occupiedBy === guestId) {
              return { ...chair, occupiedBy: undefined };
            }
            return chair;
          }),
        };
      })
    );
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importData(file)
        .then((data) => {
          setGuests(data.guests);
          setTables(data.tables);
          localStorage.setItem("guests", JSON.stringify(data.guests));
          localStorage.setItem("tables", JSON.stringify(data.tables));
        })
        .catch((error) => {
          alert(`Error importing data: ${error.message}`);
        });
    }
  };

  const resetEverything = () => {
    setGuests([]);
    setTables([]);
    localStorage.removeItem("guests");
    localStorage.removeItem("tables");
    setShowResetPopup(false);
  };

  // Function to go back from table detail view to tables list
  const handleBackToTables = () => {
    setSelectedTableId(null);
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
            isMobile={true}
            addGuestToTable={addGuestToTable}
            removeGuestFromChair={removeGuestFromChair}
          />
        );
      case "tables":
        if (selectedTableId) {
          const selectedTable = tables.find((t) => t.id === selectedTableId);
          return selectedTable ? (
            <MobileTableDetailScreen
              table={selectedTable}
              guests={guests}
              onBack={handleBackToTables}
              removeGuestFromChair={removeGuestFromChair}
            />
          ) : null;
        }
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
            isMobile={true}
            onTableClick={setSelectedTableId}
          />
        );
      case "settings":
        return (
          <SettingsTab
            exportData={() => exportData(guests, tables)}
            importData={handleImportData}
            exportExcel={() => exportToExcel(guests, tables)}
            exportPDF={() => exportToPdf(guests, tables)}
            exportCanvasToPDF={exportCanvasToPDF}
            setShowResetPopup={setShowResetPopup}
            isMobile={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app mobile-app">
        {showWelcomePopup && (
          <MobileWelcomePopup onClose={() => setShowWelcomePopup(false)} />
        )}

        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobile={true}
        >
          {renderTabContent()}
        </Sidebar>

        <ResetPopup
          showResetPopup={showResetPopup}
          setShowResetPopup={setShowResetPopup}
          exportData={() => exportData(guests, tables)}
          resetEverything={resetEverything}
        />

        <MobileBanner />
      </div>
    </DndProvider>
  );
};

export default MobileApp;
