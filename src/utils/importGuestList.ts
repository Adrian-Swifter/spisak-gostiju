import { read, utils } from "xlsx";

export interface ImportedGuest {
  name: string;
  inviteSent: boolean;
  confirmedAttendance: boolean;
}

const NAME_HEADERS = [
  "ime",
  "ime gosta",
  "gost",
  "gosti",
  "name",
  "guest",
  "guests",
  "full name",
  "attendee",
  "invitee",
];

const INVITE_HEADERS = [
  "pozivnica poslata",
  "pozivnica",
  "invite sent",
  "invitation sent",
  "invited",
];

const CONFIRMED_HEADERS = [
  "potvrdio dolazak",
  "potvrdjen dolazak",
  "potvrden dolazak",
  "confirmed attendance",
  "confirmed",
  "rsvp",
];

const SKIPPED_HEADERS = [
  "redni broj",
  "broj",
  "sto",
  "table",
  "email",
  "e-mail",
  "phone",
  "telefon",
  "mobile",
];

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const hasHeader = (value: string, headers: string[]) => {
  const normalizedValue = normalize(value);
  return headers.some((header) => normalizedValue === normalize(header));
};

const parseBoolean = (value: unknown): boolean => {
  const normalizedValue = normalize(String(value ?? ""));
  return ["da", "yes", "y", "true", "1", "poslato", "potvrdjeno", "potvrdeno"].includes(
    normalizedValue
  );
};

const cleanCandidate = (value: unknown): string => {
  return String(value ?? "")
    .replace(/^\s*(?:[-*]|\d+[.)])\s*/, "")
    .replace(/^["']|["']$/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const isLikelyGuestName = (value: string): boolean => {
  const candidate = cleanCandidate(value);
  const normalizedCandidate = normalize(candidate);

  if (candidate.length < 2 || candidate.length > 100) return false;
  if (/^\d+$/.test(candidate)) return false;
  if (/^\d{1,2}[./-]\d{1,2}([./-]\d{2,4})?$/.test(candidate)) return false;
  if (candidate.includes("@")) return false;
  if (hasHeader(candidate, [...NAME_HEADERS, ...INVITE_HEADERS, ...CONFIRMED_HEADERS, ...SKIPPED_HEADERS])) {
    return false;
  }
  if (["da", "ne", "yes", "no", "true", "false", "n/a"].includes(normalizedCandidate)) {
    return false;
  }

  return /[\p{L}]/u.test(candidate);
};

const uniqueGuests = (guests: ImportedGuest[]): ImportedGuest[] => {
  const seen = new Set<string>();

  return guests.filter((guest) => {
    const key = normalize(guest.name);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const splitTextIntoGuests = (text: string): ImportedGuest[] => {
  const candidates = text
    .split(/\r?\n/)
    .flatMap((line) => line.split(/\t|;|,/))
    .map(cleanCandidate)
    .filter(isLikelyGuestName);

  return uniqueGuests(
    candidates.map((name) => ({
      name,
      inviteSent: false,
      confirmedAttendance: false,
    }))
  );
};

const getHeaderIndex = (rows: string[][]): number => {
  return rows.slice(0, 5).findIndex((row) =>
    row.some((cell) => hasHeader(cell, NAME_HEADERS))
  );
};

const findHeaderColumn = (headerRow: string[], headers: string[]): number => {
  return headerRow.findIndex((cell) => hasHeader(cell, headers));
};

const scoreColumn = (rows: string[][], columnIndex: number): number => {
  return rows.reduce((score, row) => {
    const value = cleanCandidate(row[columnIndex]);
    if (!value) return score;
    if (isLikelyGuestName(value)) return score + 2;
    return score - 1;
  }, 0);
};

const findBestNameColumn = (rows: string[][]): number => {
  const maxColumns = rows.reduce((max, row) => Math.max(max, row.length), 0);
  let bestColumn = 0;
  let bestScore = Number.NEGATIVE_INFINITY;

  for (let columnIndex = 0; columnIndex < maxColumns; columnIndex += 1) {
    const score = scoreColumn(rows, columnIndex);
    if (score > bestScore) {
      bestColumn = columnIndex;
      bestScore = score;
    }
  }

  return bestColumn;
};

const parseRows = (rows: string[][]): ImportedGuest[] => {
  const usableRows = rows.filter((row) => row.some((cell) => cleanCandidate(cell)));
  if (usableRows.length === 0) return [];

  const headerIndex = getHeaderIndex(usableRows);
  const headerRow = headerIndex >= 0 ? usableRows[headerIndex] : [];
  const dataRows = headerIndex >= 0 ? usableRows.slice(headerIndex + 1) : usableRows;
  const nameColumn =
    headerIndex >= 0 ? findHeaderColumn(headerRow, NAME_HEADERS) : findBestNameColumn(dataRows);
  const inviteColumn = headerIndex >= 0 ? findHeaderColumn(headerRow, INVITE_HEADERS) : -1;
  const confirmedColumn = headerIndex >= 0 ? findHeaderColumn(headerRow, CONFIRMED_HEADERS) : -1;

  if (nameColumn < 0) return [];

  return uniqueGuests(
    dataRows
      .map((row) => ({
        name: cleanCandidate(row[nameColumn]),
        inviteSent: inviteColumn >= 0 ? parseBoolean(row[inviteColumn]) : false,
        confirmedAttendance:
          confirmedColumn >= 0 ? parseBoolean(row[confirmedColumn]) : false,
      }))
      .filter((guest) => isLikelyGuestName(guest.name))
  );
};

const parseSpreadsheet = async (file: File): Promise<ImportedGuest[]> => {
  const buffer = await file.arrayBuffer();
  const workbook = read(buffer, { type: "array" });

  const guests = workbook.SheetNames.flatMap((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const rows = utils.sheet_to_json<string[]>(worksheet, {
      header: 1,
      raw: false,
      defval: "",
    });

    return parseRows(rows);
  });

  return uniqueGuests(guests);
};

const parseDocx = async (file: File): Promise<ImportedGuest[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ arrayBuffer });
  return splitTextIntoGuests(result.value);
};

const parseText = async (file: File): Promise<ImportedGuest[]> => {
  return splitTextIntoGuests(await file.text());
};

export const importGuestList = async (file: File): Promise<ImportedGuest[]> => {
  const extension = file.name.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "xlsx":
    case "xls":
    case "xlsm":
    case "xlsb":
    case "ods":
    case "csv":
    case "tsv":
      return parseSpreadsheet(file);
    case "docx":
      return parseDocx(file);
    case "txt":
      return parseText(file);
    default:
      throw new Error(
        "Nepodrzan format fajla. Izvezite listu kao Excel, CSV, TSV, TXT ili Word DOCX fajl."
      );
  }
};
