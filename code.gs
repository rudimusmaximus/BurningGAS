/**
 * @OnlyCurrentDoc
 */
// global variable for hard coded values wwObj.ENUMS.SEMVER for example
var wwObj = {
  ENUMS : {
    SEMVER : "1.0.0-queryASheet.4"//working version as of end of GAS working session part 2
  }
};

/**
* Example function onOpen (modified), see this link for details: 
* https://developers.google.com/apps-script/guides/triggers/
**/

function onOpen() {
  // Add a custom menu to the spreadsheet.
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .createMenu('Weekly Wednesday Menu')
      .addItem('Setup sheets', 'setupInputSheets')
      .addItem('Update Multiple Cells', 'updateMultipleCells')
      .addItem('Manipulate Disjoint Ranges', 'manipulateDisjointRanges')
      .addItem('Gist Query A Sheet', 'runQueryPlaceOutput')
      .addToUi();
}