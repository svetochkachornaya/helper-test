/**
 * Принимает заявки с лендинга «Обнуление» и дублирует каждую в Google Документ.
 *
 * Настройка:
 * 1. Создайте пустой Google Документ, скопируйте его ID из URL:
 *    https://docs.google.com/document/d/ЭТОТ_ID/edit
 * 2. Вставьте ID в DOC_ID ниже.
 * 3. Extensions → Apps Script, вставьте этот файл вместо Code.gs.
 * 4. Deploy → New deployment → Web app.
 *    Execute as: Me. Who has access: Anyone.
 * 5. Скопируйте URL веб-приложения и вставьте его в index.html
 *    в переменную GOOGLE_SCRIPT_URL.
 */

var DOC_ID = 'REPLACE_WITH_YOUR_GOOGLE_DOC_ID';

function doPost(e) {
  var doc = DocumentApp.openById(DOC_ID);
  var body = doc.getBody();

  var data = JSON.parse(e.postData.contents);

  var timestamp = Utilities.formatDate(new Date(), 'Europe/Kyiv', 'dd.MM.yyyy HH:mm:ss');

  var line = [
    timestamp,
    data.firstName + ' ' + data.lastName,
    data.phone,
    data.telegram
  ].join('  |  ');

  body.appendParagraph(line);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
