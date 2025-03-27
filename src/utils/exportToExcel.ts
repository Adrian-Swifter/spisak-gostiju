import { utils, writeFile } from "xlsx";
import { Guest, Table } from "../types";
import { getTableNameForGuest } from "./tableUtils";

/**
 * Exports guest list to Excel file with table assignments and statuses
 */
const exportToExcel = (guests: Guest[], tables: Table[]): void => {
  const formattedData = guests.map((guest, index) => ({
    "Redni broj": index + 1,
    "Ime gosta": guest.name,
    "Sto": getTableNameForGuest(guest.id, tables) || "Nije dodeljen",
    "Pozivnica poslata": guest.inviteSent ? "Da" : "Ne",
    "Potvrdio dolazak": guest.confirmedAttendance ? "Da" : "Ne"
  }));

  const ws = utils.json_to_sheet(formattedData, {
    header: ["Redni broj", "Ime gosta", "Sto", "Pozivnica poslata", "Potvrdio dolazak"],
  });

  // Adjust column widths
  ws["!cols"] = [
    { wch: 10 },  // Redni broj
    { wch: 30 },  // Ime gosta
    { wch: 30 },  // Sto
    { wch: 15 },  // Pozivnica poslata
    { wch: 15 }   // Potvrdio dolazak
  ];

  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Spisak gostiju");
  writeFile(wb, "spisak-gostiju.xlsx");
};

export default exportToExcel; 