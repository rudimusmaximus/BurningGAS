/**
 * setup sheets expects a fresh sheet, creates the expected sheets for the demo functions
 * demo functions just activate the sheet by name expecting it to be there
 */
function setupInputSheets() {
  //CREATE SHEETS
  //Gist Query A sheet
  setupQueryInputSheet();
  //Update Multiple Cells
  var spreadsheet = SpreadsheetApp.getActive();
  var umcSheet = spreadsheet.getSheetByName('Update Multiple Cells');
  if (umcSheet) {
    umcSheet.clear();
    populateUpdateMultipleCells();
  } else {
    // create it - insert a new sheet at the beginning
    umcSheet = thisSpreadsheet.insertSheet('Update Mulitple Cells', 0);
    //PREP SHEETS
    populateUpdateMultipleCells();
    highlightsForUpdateMultipleCells();
  }
  //Manipulate Disjoint Ranges
  var mdrSheet = spreadsheet.getSheetByName('Manipulate Disjoint Ranges');
  if (mdrSheet) {
    mdrSheet.clear();
  } else {
    // create it - insert a new sheet at the beginning
    mdrSheet = thisSpreadsheet.insertSheet('Manipulate Disjoint Ranges', 0);
  }
  //PREP SHEETS
  populateManipulateDisjointRanges();

  //ENCLOSED FUNCTIONS
  function populateManipulateDisjointRanges() {
    mdrSheet.getRange('A1').activate();
    mdrSheet.getCurrentCell().setFormula('=hyperlink("https://issuetracker.google.com/issues/36761866","comment 60 on original issue")');
    mdrSheet.getRange('C1').activate().setValue('This function works on any sheet, but run here for demonstration.');
  }

  function populateUpdateMultipleCells() {
    // umcSheet.setActiveSheet(umcSheet.getSheetByName('Update Multiple Values'), true);
    umcSheet.getCurrentCell().setFormula('=hyperlink("https://ctrlq.org/code/20504-update-google-sheet-cell-values","source article for initial idea")');
  }

  function highlightsForUpdateMultipleCells() {
    var spreadsheet = SpreadsheetApp.getActive();
    umcSheet.setActiveSheet(umcSheet.getSheetByName('Update Multiple Values'), true);
    umcSheet.getRange('A2').activate();
    umcSheet.getActiveRangeList().setBackground('#ffff00');
    umcSheet.getRange('B2:B4').activate();
    umcSheet.getActiveRangeList().setBackground('#4a86e8');
    umcSheet.getRange('C2:E2').activate();
    umcSheet.getActiveRangeList().setBackground('#c9daf8');
    umcSheet.getRange('F2:H3').activate();
    umcSheet.getActiveRangeList().setBackground('#b4a7d6');
    umcSheet.getRange('A6').activate();
    umcSheet.getActiveRangeList().setBackground('#b4a7d6');
  }
} //end setupInputSheets
/**
 * sheet1 demo
 * demonstrates mulitple cells updated in one execution
 * enable Google Sheets API first; These services must also be enabled in the Google API Console in GCP
 * Modified from original Written by Amit Agarwal
 * Web: ctrlq.org  Email: amit@labnol.org
 */
function updateMultipleCells(spreadsheetId) {
  //activate the sheet but note that the approach for updating using the advanced service will work for any spreadsheet you have access to
  SpreadsheetApp.getActive().getSheetByName('Update Multiple Values').activate();
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