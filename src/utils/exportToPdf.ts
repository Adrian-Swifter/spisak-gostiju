import jsPDF from "jspdf";
import { Guest, Table } from "../types";
import { getTableNameForGuest, countAssignedGuests, replaceSerbianChars } from "./tableUtils";

/**
 * Exports guest list to PDF with table assignments and statuses
 */
const exportToPdf = (guests: Guest[], tables: Table[]): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 10;
  const lineHeight = 10;
  
  // Add title and date
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Spisak Gostiju", margin, margin);
  
  // Add current date
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const currentDate = new Date().toLocaleDateString('sr-RS');
  const dateX = pageWidth - margin - 40;
  doc.text(`Datum: ${currentDate}`, dateX, margin);
  
  // Add website link directly below the date, with same right alignment
  doc.setTextColor(0, 102, 204); // Blue color for the link
  const websiteText = "https://spisakgostiju.rs/";
  doc.textWithLink(websiteText, dateX, margin + lineHeight, { url: websiteText });
  doc.setTextColor(0, 0, 0); // Reset to black
  
  // Add statistics - replace Serbian characters with ASCII equivalents for better compatibility
  doc.setFontSize(12);
  const totalGuests = guests.length;
  const confirmedGuests = guests.filter(guest => guest.confirmedAttendance).length;
  const invitedGuests = guests.filter(guest => guest.inviteSent).length;
  const assignedGuests = countAssignedGuests(guests, tables);
  
  doc.text(`Ukupno gostiju: ${totalGuests}`, margin, margin + lineHeight);
  doc.text(`Potvrdjen dolazak: ${confirmedGuests}`, margin, margin + lineHeight * 2);
  doc.text(`Poslate pozivnice: ${invitedGuests}`, margin, margin + lineHeight * 3);
  doc.text(`Dodeljeni stolovima: ${assignedGuests}`, margin, margin + lineHeight * 4);
  
  // Setup for guest list - adjust column positions
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("R.B.", margin, margin + lineHeight * 6);
  doc.text("Ime gosta", margin + 15, margin + lineHeight * 6);
  doc.text("Sto", margin + 90, margin + lineHeight * 6);
  doc.text("Pozvan", pageWidth - margin - 30, margin + lineHeight * 6);
  doc.text("Potvrdjen", pageWidth - margin - 15, margin + lineHeight * 6);
  
  doc.setFont("helvetica", "normal");
  
  // Draw a line under the header
  doc.line(margin, margin + lineHeight * 6.5, pageWidth - margin, margin + lineHeight * 6.5);
  
  // Start listing guests
  let yPosition = margin + lineHeight * 7.5;
  
  guests.forEach((guest, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = margin + lineHeight;
      
      // Add header on new page
      doc.setFont("helvetica", "bold");
      doc.text("R.B.", margin, margin);
      doc.text("Ime gosta", margin + 15, margin);
      doc.text("Sto", margin + 90, margin);
      doc.text("Pozvan", pageWidth - margin - 30, margin);
      doc.text("Potvrdjen", pageWidth - margin - 15, margin);
      doc.setFont("helvetica", "normal");
      
      // Draw a line under the header
      doc.line(margin, margin + lineHeight * 0.5, pageWidth - margin, margin + lineHeight * 0.5);
      
      yPosition = margin + lineHeight * 1.5;
    }
    
    // Truncate long guest names
    let guestName = guest.name;
    if (guestName.length > 30) {
      guestName = guestName.substring(0, 27) + "...";
    }
    
    // Truncate long table names
    let tableName = getTableNameForGuest(guest.id, tables) || "-";
    if (tableName.length > 15) {
      tableName = tableName.substring(0, 12) + "...";
    }
    
    // Write guest info - replace Serbian characters with ASCII equivalents
    doc.text(`${index + 1}.`, margin, yPosition);
    doc.text(replaceSerbianChars(guestName), margin + 15, yPosition);
    doc.text(replaceSerbianChars(tableName), margin + 90, yPosition);
    doc.text(guest.inviteSent ? "Da" : "Ne", pageWidth - margin - 28, yPosition);
    doc.text(guest.confirmedAttendance ? "Da" : "Ne", pageWidth - margin - 13, yPosition);
    
    yPosition += lineHeight;
  });
  
  // Add page numbers
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Strana ${i} od ${pageCount}`, pageWidth - margin - 30, pageHeight - margin);
  }
  
  doc.save("spisak-gostiju.pdf");
};

export default exportToPdf; 