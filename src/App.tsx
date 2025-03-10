import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Rnd } from "react-rnd";
import { v4 as uuidv4 } from "uuid";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import { Guest, Table, Chair } from "./types";

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

  const addTable = (type: "rectangle" | "circle") => {
    if (!newTableName) return alert("Please enter table name");

    const newTable: Table = {
      id: uuidv4(),
      name: newTableName,
      type,
      x: 100,
      y: 100,
      width: type === "circle" ? 150 : 200,
      height: type === "circle" ? 150 : 100,
      chairsCount: newChairCount,
      chairs: calculateChairPositions(type, newChairCount, 200, 100),
    };

    setTables([...tables, newTable]);
    localStorage.setItem("tables", JSON.stringify([...tables, newTable]));
    setNewTableName("");
    setNewChairCount(8);
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

const GuestForm = ({ onAdd }: { onAdd: (name: string) => void }) => {
  const [name, setName] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(name);
        setName("");
      }}
    >
      <input value={name} onChange={(e) => setName(e.target.value)} required />
      <button type="submit">Add Guest</button>
    </form>
  );
};

const GuestList = ({ guests }: { guests: Guest[] }) => {
  return (
    <div>
      <h3>Guests</h3>
      <div className="guest-list">
        {guests.map((guest) => (
          <DraggableGuest key={guest.id} guest={guest} />
        ))}
      </div>
    </div>
  );
};

const DraggableGuest = ({ guest }: { guest: Guest }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "guest",
    item: { id: guest.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="guest-item"
    >
      {guest.name}
    </div>
  );
};

interface TableComponentProps {
  table: Table;
  guests: Guest[];
  onChairDrop: (chairId: string, guestId: string) => void;
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
  calculateChairPositions: (
    type: "rectangle" | "circle",
    count: number,
    width: number,
    height: number
  ) => Chair[];
}

const TableComponent = ({
  table,
  guests,
  onChairDrop,
  setTables,
  calculateChairPositions,
}: TableComponentProps) => {
  const [position, setPosition] = useState({ x: table.x, y: table.y });

  const handlePositionChange = (x: number, y: number) => {
    setPosition({ x, y });
    setTables((prev) =>
      prev.map((t) => (t.id === table.id ? { ...t, x, y } : t))
    );
  };

  const handleResize = (width: number, height: number) => {
    if (table.type === "circle") {
      const size = Math.max(width, height);
      width = size;
      height = size;
    }

    setTables((prev) =>
      prev.map((t) =>
        t.id === table.id
          ? {
              ...t,
              width,
              height,
              chairs: calculateChairPositions(
                t.type,
                t.chairsCount,
                width,
                height,
                t.chairs
              ),
            }
          : t
      )
    );
  };

  const handleChairCount = (delta: number) => {
    const newCount = Math.max(1, table.chairsCount + delta);

    // Prevent removing chairs with guests
    if (delta < 0) {
      const chairsToRemove = table.chairs.slice(newCount);
      const hasOccupied = chairsToRemove.some((chair) => chair.occupiedBy);

      if (hasOccupied) {
        alert("Cannot remove chairs with guests!");
        return;
      }
    }

    setTables((prev) =>
      prev.map((t) =>
        t.id === table.id
          ? {
              ...t,
              chairsCount: newCount,
              chairs: calculateChairPositions(
                t.type,
                newCount,
                t.width,
                t.height,
                t.chairs.slice(0, newCount) // Keep only the first newCount chairs
              ),
            }
          : t
      )
    );
  };

  return (
    <Rnd
      position={position}
      size={{ width: table.width, height: table.height }}
      onDragStop={(e, d) => handlePositionChange(d.x, d.y)}
      onResizeStop={(e, direction, ref, delta, position) => {
        handleResize(parseInt(ref.style.width), parseInt(ref.style.height));
        handlePositionChange(position.x, position.y);
      }}
      dragHandleClassName="table-drag-handle"
      enableResizing={{
        bottom: true,
        bottomLeft: true,
        bottomRight: true,
        left: true,
        right: true,
        top: true,
        topLeft: true,
        topRight: true,
      }}
    >
      <div className={`table ${table.type} table-drag-handle`}>
        {/* <div className="table-drag-handle" /> */}
        <div className="table-header">
          <input
            type="text"
            value={table.name}
            onChange={(e) => {
              setTables((prev) =>
                prev.map((t) =>
                  t.id === table.id ? { ...t, name: e.target.value } : t
                )
              );
            }}
            className="table-name-input"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="chair-controls">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleChairCount(-1);
              }}
            >
              -
            </button>
            <span>{table.chairs.length}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleChairCount(1);
              }}
            >
              +
            </button>
          </div>
        </div>
        {table.chairs.map((chair) => (
          <ChairComponent
            key={chair.id}
            chair={chair}
            guest={guests.find((g) => g.id === chair.occupiedBy)}
            onDrop={(guestId) => onChairDrop(chair.id, guestId)}
          />
        ))}
      </div>
    </Rnd>
  );
};

const ChairComponent = ({
  chair,
  guest,
  onDrop,
}: {
  chair: Chair;
  guest?: Guest;
  onDrop: (guestId: string) => void;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "guest",
    drop: (item: { id: string }) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleClick = () => {
    if (chair.occupiedBy) {
      onDrop(""); // Clear the seat
    }
  };

  return (
    <div
      ref={(node) => drop(node)}
      className="chair"
      style={{
        left: chair.x,
        top: chair.y,
        backgroundColor: isOver ? "lightgreen" : guest ? "gold" : "white",
      }}
      onClick={handleClick}
    >
      {guest?.name || " "}
    </div>
  );
};

const calculateChairPositions = (
  type: "rectangle" | "circle",
  count: number,
  width: number,
  height: number,
  existingChairs: Chair[] = []
): Chair[] => {
  const chairSize = 20;
  const chairs: Chair[] = [];
  const preservedChairs = existingChairs.slice(0, count);

  // Generate new chair positions
  if (type === "rectangle") {
    const chairsPerSide = Math.ceil(count / 4);
    const sides = ["top", "right", "bottom", "left"];

    sides.forEach((side, sideIndex) => {
      const chairsOnThisSide = Math.min(
        chairsPerSide,
        count - sideIndex * chairsPerSide
      );
      const step =
        side === "top" || side === "bottom"
          ? width / (chairsOnThisSide + 1)
          : height / (chairsOnThisSide + 1);

      for (let i = 0; i < chairsOnThisSide; i++) {
        let x = 0,
          y = 0;
        switch (side) {
          case "top":
            x = step * (i + 1) - chairSize / 2;
            y = -chairSize;
            break;
          case "right":
            x = width;
            y = step * (i + 1) - chairSize / 2;
            break;
          case "bottom":
            x = step * (i + 1) - chairSize / 2;
            y = height;
            break;
          case "left":
            x = -chairSize;
            y = step * (i + 1) - chairSize / 2;
            break;
        }
        chairs.push({ x, y });
      }
    });
  } else {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - chairSize;

    for (let i = 0; i < count; i++) {
      const angle = (i * (360 / count) * Math.PI) / 180;
      const x = centerX + radius * Math.cos(angle) - chairSize / 2;
      const y = centerY + radius * Math.sin(angle) - chairSize / 2;
      chairs.push({ x, y });
    }
  }

  // Merge existing chairs with new positions
  return preservedChairs
    .map((existingChair, index) => ({
      ...existingChair,
      x: chairs[index]?.x ?? existingChair.x,
      y: chairs[index]?.y ?? existingChair.y,
      id: existingChair.id || uuidv4(),
    }))
    .concat(
      chairs.slice(preservedChairs.length).map((pos) => ({
        id: uuidv4(),
        x: pos.x,
        y: pos.y,
        occupiedBy: undefined,
      }))
    )
    .slice(0, count);
};
export default App;
