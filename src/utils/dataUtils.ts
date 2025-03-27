import { Guest, Table } from "../types";

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
        
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error("Error reading file"));
    
    reader.readAsText(file);
  });
}; 