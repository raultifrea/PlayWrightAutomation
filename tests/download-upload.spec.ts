import test, { expect } from "@playwright/test";

const ExcelJs = require('exceljs');

/**
 * writes a new price in the cell column of an excel file based on the cell that contains the searched text
 * @param searchText the cell to search for based on text
 * @param replaceText the value to replace the current cell with the price
 * @param change the location of the row/column that contains the price cell
 * @param filePath the path to the excel file
 * @param sheetName the sheet within the excel file where to do the modifications
 */
async function writeExcelTest(searchText: string, replaceText: string, change: { rowChange?: number; colChange: any; }, filePath: string, sheetName: string) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet(sheetName);
    const output = await readExcel(worksheet, searchText);
    const cell = worksheet.getCell(output.row,output.column+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

/**
 * reads an excel fille and returns the row and column in which the searched text lies
 * @param worksheet the exceljs worksheet
 * @param searchText the cell to search for basdd on text
 * @returns object containing the row and column numbers of the matched cell
 */
async function readExcel(worksheet: { eachRow: (arg0: (row: any, rowNumber: any) => void) => void; }, searchText: any) {
    let output = {row: -1, column: -1};
    worksheet?.eachRow((row: { eachCell: (arg0: (cell: any, colNumber: any) => void) => void; }, rowNumber: number) => {
        row.eachCell((cell: { value: any; }, colNumber: number) => {
            if (cell.value === searchText) {
                output.row  = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
}

test("@Web Upload download excel validation", async ({page}) => {

    const textSearch = 'Mango';
    const updateValue = '350';

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    //intercepts the event of type download
    const downloadPromise = page.waitForEvent('download');
    //click the download button
    await page.getByRole('button', {name: 'Download'}).click();
    //waits for download event to take place
    await downloadPromise;
    writeExcelTest('Mango', updateValue, {rowChange:0, colChange:2}, 'download.xlsx', 'Sheet1');
    await page.locator('#fileinput').click();
    //uploads a file. Works if the located button has type='file' property
    await page.locator('#fileinput').setInputFiles('download.xlsx');

    const textLocator = page.getByText(textSearch)
    //searches within the row that contains the textSearch locator only
    const desiredRow = page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator('#cell-4-undefined')).toHaveText(updateValue);
});
