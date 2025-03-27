import { Guest, Table } from "../types";

/**
 * Finds the table name that a guest is assigned to
 * @param guestId The ID of the guest
 * @param tables Array of all tables
 * @returns Table name or undefined if guest not assigned
 */
export const getTableNameForGuest = (guestId: string, tables: Table[]): string | undefined => {
  for (const table of tables) {
    for (const chair of table.chairs) {
      if (chair.occupiedBy === guestId) {
        return table.name;
      }
    }
  }
  return undefined;
};

/**
 * Counts how many guests are assigned to tables
 * @param guests Array of all guests
 * @param tables Array of all tables
 * @returns Number of assigned guests
 */
export const countAssignedGuests = (guests: Guest[], tables: Table[]): number => {
  return guests.filter(guest => {
    for (const table of tables) {
      for (const chair of table.chairs) {
        if (chair.occupiedBy === guest.id) return true;
      }
    }
    return false;
  }).length;
};

/**
 * Helper function to replace Serbian characters with ASCII equivalents
 * @param text Text containing Serbian characters
 * @returns Text with Serbian characters replaced with ASCII equivalents
 */
export const replaceSerbianChars = (text: string): string => {
  return text
    .replace(/č/g, "c")
    .replace(/ć/g, "c")
    .replace(/đ/g, "dj")
    .replace(/š/g, "s")
    .replace(/ž/g, "z")
    .replace(/Č/g, "C")
    .replace(/Ć/g, "C")
    .replace(/Đ/g, "Dj")
    .replace(/Š/g, "S")
    .replace(/Ž/g, "Z");
}; 