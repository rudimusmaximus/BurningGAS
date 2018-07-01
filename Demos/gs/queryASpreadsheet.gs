/**
 * setup our input sheet
 */
function setupQueryInputSheet() {
  var values = [
    ['Date', 'Amount', 'Named', '=hyperlink("https://gist.github.com/rudimusmaximus/133ef10736888e42f0c9ba89c07be546","source Gist for initial idea")'],
    ['1/1/2016', '1', 'person jan',''],
    ['2/1/2017', '2', 'person feb',''],
    ['3/1/2017', '3', 'person mar',''],
    ['4/1/2017', '4', 'person apr',''],
    ['5/1/2017', '5', 'person may',''],
    ['6/1/2017', '6', 'person jun',''],
  ];
  var spreadsheet = SpreadsheetApp.getActive();
  var inputSheet = spreadsheet.insertSheet('queryASheet-input',0);
    inputSheet.getRange('A1:D7').setValues(values);
}

/**
 * run query, place output, trim the sheet to match our 2d array of output data
 */
function runQueryPlaceOutput() {
  var ssId = SpreadsheetApp.getActiveSpreadsheet().getId();
  var result = queryASpreadsheet(ssId,
    'queryASheet-input',
    'A1:C',
    'SELECT A,B,C WHERE B < 7');

  var rows = result.length; //7
  var columns = result[0].length; //3

  // first clear anything in a sheet by that name in case running twice
  var thisSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var outputSheet = thisSpreadsheet.getSheetByName('queryASheet-output');
  if (outputSheet) {
    outputSheet.clear();
  } else {
    // insert a new sheet at the beginning
    outputSheet = thisSpreadsheet.insertSheet('queryASheet-output', 0);
   //how do do this with like SpreadsheetApp.create(String name, Integer rows, Integer columns)?TODO asked on G+
  }

  // write to the outputSheet
  outputSheet.getRange(1, 1, rows, columns).setValues(result);

  SpreadsheetApp.getActiveSpreadsheet().setActiveSheet(outputSheet);

  trimResultsInSheet(ssId, outputSheet.getSheetId(), 'queryASheet-output', rows, columns);

  return true;
} //end runQueryPlaceOutput
/**
 * This function uses url fetch to get data from a spreadsheet using a query style 
 * 
 * @param  {String} sheetId the id for the spreadhsheet
 * @param  {String} sheetName
 * @param  {String} rangeSyntax a few example range syntax arguments:  "A1:B10" - A range from cell A1 through B10", "5:7" - Rows 5-7, "D:F" - Columns D-F, "A:A70" - The first 70 cells in column A, "A70:A" - Column A from row 70 to the end, "B5:5" - B5 to the end of row 5, "D3:D" - D3 to the end of column D,"C:C10" - From the beginning of column C to C10
 * @param  {String} queryString 
 * @return {Object[][]} dataTwoD is a JavaScript 2d array; rather this is an array of rows where the rows are arrays of values.
 */
function queryASpreadsheet(sheetId, sheetName, rangeSyntax, queryString) {
  //DriveApp.getRootFolder() 
  var url = 'https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?' +
    'range=' + rangeSyntax +
    '&tqx=out:csv' +
    '&sheet=' + sheetName +
    '&tq=' + encodeURIComponent(queryString);

  var params = {
    headers: {
      'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
    },
    muteHttpExceptions: true
  };

  var csvData = UrlFetchApp.fetch(url, params);
  var dataTwoD = Utilities.parseCsv(csvData); // array of the format [[a, b, c], [d, e, f]]

  return dataTwoD;
}
/**
 * this uses advanced sheets service to set the size of the new output sheet to match
 * our 2d array
 */
function trimResultsInSheet(spreadsheetId, sheetId, sheetName, rows, columns) {
  
  
  var resource = {
  "requests": [
    {
      "updateSheetProperties": {
        "properties": {
          "sheetId": sheetId,
          "title": sheetName,
          "gridProperties": {
            "columnCount": columns,
            "rowCount": rows
          }
        },
        "fields": "*"
      }
    }
  ],
  "includeSpreadsheetInResponse": false
};
  Sheets.Spreadsheets.batchUpdate(resource, spreadsheetId);
}

