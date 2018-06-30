/**
 * setup our input sheet
 */
function setupQueryInputSheet() {
  
}

/**
 * quickly test our function
 */
function runQueryPlaceOutput() {
  var result = queryASpreadsheet('1sPevvtTMSd9LUptX8qdsw4VJf07nOal_1qn9JLwO4fQ',
    'Example Data',
    'A1:C',
    'SELECT A,B,C WHERE B < 7');

  var rows = result.length; //7
  var columns = result[0].length; //3

  // first clear anything in a sheet by that name in case running twice
  var thisWorkbook = SpreadsheetApp.getActiveSpreadsheet();
  var outputSheet = thisWorkbook.getSheetByName('outputSheet');
  if (outputSheet) {
    outputSheet.clear();
  } else {
    // insert a new sheet at the beginning
    outputSheet = thisWorkbook.insertSheet('outputSheet', 0);
  }

  // write to the outputSheet
  var outputSheet = outputSheet.getRange(1, 1, rows, columns).setValues(result);
  return true;
} //end test
/**
 * This function uses url fetch to get data from a spreadsheet using a query style 
 * 
 * @param  {String} sheetId
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