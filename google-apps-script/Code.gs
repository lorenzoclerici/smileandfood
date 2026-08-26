/**
 * Smile & Food — Google Apps Script
 *
 * How to use:
 * 1. Open your Google Sheet
 * 2. Extensions → Apps Script
 * 3. Paste this entire file and Save
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL and paste it into js/main.js (GOOGLE_SCRIPT_URL)
 *
 * Sheet headers (row 1), in this exact order:
 * Nome e Cognome | E-mail | Phone | Esperienza di interesse | Data di preferenza |
 * Numero di partecipanti | Richieste particolari | Messaggio | Data ricezione contatto
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = e.parameter || {};

    sheet.appendRow([
      data.nome || "",
      data.email || "",
      data.telefono || "",
      data.esperienza || "",
      data.data || "",
      data.partecipanti || "",
      data.diete || "",
      data.messaggio || "",
      new Date()
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput("Smile & Food form endpoint is live.")
    .setMimeType(ContentService.MimeType.TEXT);
}
