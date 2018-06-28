/**
 * setup sheets expects a fresh sheet, creates the expected sheets for the demo functions
 * demo functions just activate the sheet by name expecting it to be there
 */
function setupInputSheets() {
  //CREATE SHEETS
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('B9').activate();
  spreadsheet.insertSheet(2);
  spreadsheet.getActiveSheet().setName('Update Multiple Values');
  spreadsheet.insertSheet(3);
  spreadsheet.getRange('D27').activate();
  spreadsheet.getActiveSheet().setName('Manipulate Disjoint Ranges');
  spreadsheet.getRange('A1').activate();
  spreadsheet.getCurrentCell().setFormula('=hyperlink("https://issuetracker.google.com/issues/36761866","comment 60 on original issue")');
  spreadsheet.getRange('A2').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Update Multiple Values'), true);
  spreadsheet.getCurrentCell().setFormula('=hyperlink("https://ctrlq.org/code/20504-update-google-sheet-cell-values","source article for initial idea")');
  spreadsheet.getRange('A2').activate();
  //PREP SHEETS
  highlights();

  function highlights() {
    var spreadsheet = SpreadsheetApp.getActive();
    spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Update Multiple Values'), true);
    spreadsheet.getRange('A2').activate();
    spreadsheet.getActiveRangeList().setBackground('#ffff00');
    spreadsheet.getRange('B2:B4').activate();
    spreadsheet.getActiveRangeList().setBackground('#4a86e8');
    spreadsheet.getRange('C2:E2').activate();
    spreadsheet.getActiveRangeList().setBackground('#c9daf8');
    spreadsheet.getRange('F2:H3').activate();
    spreadsheet.getActiveRangeList().setBackground('#b4a7d6');
    spreadsheet.getRange('A6').activate();
    spreadsheet.getActiveRangeList().setBackground('#b4a7d6');
  }
}
/**
 * sheet1 demo
 * demonstrates mulitple cells updated in one execution
 * enable Google Sheets API first; These services must also be enabled in the Google API Console in GCP
 * Modified from original Written by Amit Agarwal
 * Web: ctrlq.org  Email: amit@labnol.org
 */
function updateMulitpleCells(spreadsheetId) {
  var spreadsheetId = spreadsheetId || SpreadsheetApp.getActive().getId(); //when called from menu no passed param, get the id in the users current sheet
  // TODO: compare to other approaches on batchUpdate and examine google examples
  var data = [{
      range: "'Update Multiple Values'!A2", // Update single cell
      values: [
        ["A2"]
      ]
    },
    {
      range: "'Update Multiple Values'!B2:B4", // Update a column
      values: [
        ["B2"],
        ["B3"],
        ["B4"]
      ]
    },
    {
      range: "'Update Multiple Values'!C2:E2", // Update a row
      values: [
        ["C2", "D2", "E2"]
      ]
    },
    {
      range: "'Update Multiple Values'!F2:H3", // Update a 2d range
      values: [
        ["F2", "G2", "H2"],
        ["F3", "G3", "H3"]
      ]
    },
    {
      range: "'Update Multiple Values'!A6", // Update a cell with a 2d array
      values: [
        ["F2", "G2", "H2"],
        ["F3", "G3", "H3"]
      ]
    }
  ];

  var resource = {
    valueInputOption: "USER_ENTERED",
    data: data
  };
  //TODO: try catch with e sent to stackdriver
  Sheets.Spreadsheets.Values.batchUpdate(resource, spreadsheetId);

}

/**
 * and this pattern is comment 60 on https://issuetracker.google.com/36761866
 * select multiple ranges, run function, each selection has border set
 **/
function manipulateDisjointRanges() {

  SpreadsheetApp.getActiveSheet().getActiveRangeList().getRanges().forEach(Outline);

  function Outline(R) {
    R.setBorder(true, true, true, true, true, true);
  }
}