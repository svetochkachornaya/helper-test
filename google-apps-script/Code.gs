/**
 * Принимает заявки с лендинга «Обнуление» и дублирует каждую строкой
 * в Google Таблицу:
 * https://docs.google.com/spreadsheets/d/1trslWGQjt6foXHATKGWOTsLOySjdipi0BzdCuO-mzh8/edit
 *
 * Настройка:
 * 1. Откройте саму таблицу по ссылке выше.
 * 2. Extensions → Apps Script.
 * 3. Вставьте содержимое этого файла вместо Code.gs (Ctrl+S чтобы сохранить).
 * 4. Deploy → New deployment → тип Web app.
 *    Execute as: Me. Who has access: Anyone.
 * 5. Скопируйте URL веб-приложения и вставьте его в index.html
 *    в переменную GOOGLE_SCRIPT_URL.
 */

var SHEET_ID = '1trslWGQjt6foXHATKGWOTsLOySjdipi0BzdCuO-mzh8';
var SHEET_NAME = 'Заявки';
var HEADERS = ['Дата и время', 'Имя', 'Фамилия', 'Телефон', 'Telegram'];

function getTargetSheet_() {
  var ss = SHEET_ID
    ? SpreadsheetApp.openById(SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function doPost(e) {
  var sheet = getTargetSheet_();
  var data = JSON.parse(e.postData.contents);

  var timestamp = Utilities.formatDate(new Date(), 'Europe/Kyiv', 'dd.MM.yyyy HH:mm:ss');

  sheet.appendRow([
    timestamp,
    data.firstName,
    data.lastName,
    data.phone,
    data.telegram
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
