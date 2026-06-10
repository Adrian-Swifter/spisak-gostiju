import { Guest, Table } from "../types";
import { v4 as uuidv4 } from "uuid";

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

export const sanitizeGuests = (guests: unknown): Guest[] => {
  if (!Array.isArray(guests)) return [];

  return guests
    .filter(isRecord)
    .map((guest, index) => ({
      id: typeof guest.id === "string" && guest.id ? guest.id : uuidv4(),
      name: typeof guest.name === "string" ? guest.name.trim() : "",
      inviteSent: guest.inviteSent === true,
      confirmedAttendance: guest.confirmedAttendance === true,
      order: typeof guest.order === "number" ? guest.order : index,
    }))
    .filter((guest) => guest.name.length > 0);
};

export const sanitizeTables = (tables: unknown): Table[] => {
  if (!Array.isArray(tables)) return [];

  return tables.filter(isRecord).map((table, index) => {
    const type = table.type === "circle" ? "circle" : "rectangle";
    const width = typeof table.width === "number" ? table.width : 200;
    const height = typeof table.height === "number" ? table.height : 100;
    const chairs = Array.isArray(table.chairs)
      ? table.chairs
          .filter(isRecord)
          .filter(
            (chair) =>
              typeof chair.x === "number" && typeof chair.y === "number"
          )
          .map((chair) => ({
            id: typeof chair.id === "string" && chair.id ? chair.id : uuidv4(),
            x: chair.x as number,
            y: chair.y as number,
            occupiedBy:
              typeof chair.occupiedBy === "string"
                ? chair.occupiedBy
                : undefined,
            side:
              chair.side === "front" ||
              chair.side === "top" ||
              chair.side === "bottom"
                ? chair.side
                : undefined,
          }))
      : [];

    return {
      id: typeof table.id === "string" && table.id ? table.id : uuidv4(),
      name:
        typeof table.name === "string" && table.name.trim()
          ? table.name
          : `Sto ${index + 1}`,
      type,
      seatingType:
        table.seatingType === "one-sided" || table.seatingType === "two-sided"
          ? table.seatingType
          : undefined,
      x: typeof table.x === "number" ? table.x : 100,
      y: typeof table.y === "number" ? table.y : 100,
      width,
      height: type === "circle" ? width : height,
      chairsCount:
        typeof table.chairsCount === "number" ? table.chairsCount : chairs.length,
      chairs,
    };
  });
};

/**
 * Export guests and tables as a JSON file
 */
export const exportData = (guests: Guest[], tables: Table[]): void => {
  const data = { guests, tables };
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "spisak-gostiju.json";
  a.click();
};

/**
 * Import guests and tables from a file
 * @returns A Promise that resolves to the imported data or rejects with an error
 */
export const importData = (file: File): Promise<{ guests: Guest[], tables: Table[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (!event.target?.result) {
          throw new Error("Failed to read file");
        }
        
        const data = JSON.parse(event.target.result as string);
        
        // Validate the data has the expected structure
        if (!data.guests || !Array.isArray(data.guests) || !data.tables || !Array.isArray(data.tables)) {
          throw new Error("Invalid file format");
        }
        
        resolve({
          guests: sanitizeGuests(data.guests),
          tables: sanitizeTables(data.tables),
        });
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error("Error reading file"));
    
    reader.readAsText(file);
  });
}; 
