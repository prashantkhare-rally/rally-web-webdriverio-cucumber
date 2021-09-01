let xls_json = require('node-excel-to-json');

import * as generic from '../../testdata/generic.json';
import setInputField from '../action/setInputField';
import moveTo from '../action/moveTo';

import clickElement from '../action/clickElement';
import fs from 'fs';
import path from 'path';
// import * as objJson from '../../testdata/clients/expected/clients.json';
import getElemText from '../action/getElemText';
import checkEqualsText from '../check/checkEqualsText';
import checkElementExists from '../check/checkElementExists';


export module CommonUtility {


  /***************************************************************************************/
  /*
   * method excel_getTableRow(fileName, sheetName, columnName, where, callback)
   * @param {fileName} - relative or absolute path of Excel file
   * @param {sheetName} - sheet anme of the Excel file from which data needs to be picked
   * @param {columnName} - name of the column in excel sheet
   * @param {where} - the column value against which the search to be done
   * @param {callback} callback method that contains command results (one excel row from the specified sheet name)
   * and gets called when the command finishes
   * Turn any xls or xlsx file or OpenDocument Spreadsheet (ODS) into a clean JSON file or Javascript Object.
   **/
  /****************************************************************************************/
  export function excel_getTableRow(fileName: any, sheetName: any, columnName: string | number, where: any, callback: (arg0: any) => void) {
    xls_json(fileName, {
      'convert_all_sheet': false,
      'return_type': 'Object',
      'sheetName': sheetName
    }, function (err: any, result: string | any[]) {
      if (err) {
        console.error(err);
      } else if (result) {
        for (var row = 0; row < result.length; ++row) {
          if (result[row].hasOwnProperty(columnName) && (result[row][columnName] == where)) {
            //console.log(result[row]);
            callback(result[row]);
          }
        }
      }
    });
  }

  /***************************************************************************************/
  /*
   * method excel_getTableRows(fileName, sheetName, callback)
   * @param {fileName} - relative or absolute path of Excel file
   * @param {sheetName} - sheet anme of the Excel file from which data needs to be picked
   * @param {callback} callback method that contains command results (all excel rows from the specified sheet name)
   * and gets called when the command finishes
   * Turn any xls or xlsx file or OpenDocument Spreadsheet (ODS) into a clean JSON file or Javascript Object.
   **/
  /****************************************************************************************/
  export function excel_getTableRows(fileName: any, sheetName: any, callback: (arg0: any) => any) {
    xls_json(fileName, {
      'convert_all_sheet': false,
      'return_type': 'Object',
      'sheetName': sheetName
    }, function (err: any, result: any) {
      if (err) {
        console.error(err);
      } else if (result) {
        //console.log(result);
        return callback(result);
      }
    });
  }

  /***************************************************************************************/
  /*
   * method excel_getTableRows(fileName, sheetName, callback)
   * @param {fileName} - relative or absolute path of Excel file
   * @param {callback} callback method that contains command results (all sheet's rows from the specified sheet name)
   * and gets called when the command finishes
   * Turn any xls or xlsx file or OpenDocument Spreadsheet (ODS) into a clean JSON file or Javascript Object.
   **/
  /****************************************************************************************/
  export function excel_getAllSheetData(fileName: any, callback: (arg0: any) => any) {
    xls_json(fileName, {
      'convert_all_sheet': true,
      'return_type': 'Object',
    }, function (err: any, result: any) {
      if (err) {
        console.error(err);
      } else if (result) {
        //console.log(result);
        return callback(result);
      }
    });
  }


  /***************************************************************************************/
  //method to generate timestamp in the format: mm/dd/yy hh:mi:ss
  /***************************************************************************************/
  export function getTimeStamp() {
    var now = new Date();
    return ((now.getMonth() + 1) + '/' +
      (now.getDate()) + '/' +
      now.getFullYear() + " " +
      now.getHours() + ':' +
      ((now.getMinutes() < 10)
        ? ("0" + now.getMinutes())
        : (now.getMinutes())) + ':' +
      ((now.getSeconds() < 10)
        ? ("0" + now.getSeconds())
        : (now.getSeconds())));
  }

  /***************************************************************************************/
  //method to launch Salesforce classic and navigate to home page.
  /***************************************************************************************/
  export function launchSF() {
    const userName_SF = (<any>generic)["SalesforceClassic_username"];
    const password_SF = (<any>generic)["SalesforceClassic_password"];

    setInputField("setValue", userName_SF, "SF_username");
    setInputField("setValue", password_SF, "SF_password");
    clickElement("click", "selector", "SF_btnLogin");

  }

  /***************************************************************************************/
  //method to generate timestamp in the format: mm/dd/yy hh:mi:ss
  /***************************************************************************************/
  export function saveUserDetailsFromInputFiles(memberFlag: string) {

    const dir = "../../testdata/clients/input";
    const out = "../../testdata/clients/expected";
    const dirPath = path.resolve(__dirname, dir);
    const outPath = path.resolve(__dirname, out);

    let files = getFiles(dirPath);


    let objUserData = createUserData(memberFlag, files, dirPath);

    console.log("objUserData: " + JSON.stringify(objUserData));

    writeToFile(outPath, objUserData);

  }

  /***************************************************************************************/
  //method to generate timestamp in the format: mm/dd/yy hh:mi:ss
  /***************************************************************************************/
  export function saveClientDetailsFromSF() {

    const out = "../../testdata/clients/expected";
    let objJson = require('../../testdata/clients/expected/clients.json')
    const outPath = path.resolve(__dirname, out);
    const releaseDate_SF = (<any>generic)["ReleaseDate"];
    let strJson = JSON.stringify(objJson);
    let objectJson = JSON.parse(strJson);


    let objClientData = createClientData(objectJson, releaseDate_SF, outPath);

  }

  function isArray(o: any) {
    return Object.prototype.toString.call(o) === '[object Array]'
  }

  export async function validateSupportNumber() {
    const out = "../../testdata/clients/expected";
    const screenshot = "../../reports/screenshots";
    const outPath = path.resolve(__dirname, out);
    const screenshotPath = path.resolve(__dirname, screenshot);

    const cucumberJson = require('wdio-cucumberjs-json-reporter').default;

    const strJson: any = fs.readFileSync(outPath + '/clients.json');
    let objectJson = JSON.parse(strJson);
    let userName;
    let password;
    let contactNumber;
    let handles: any;

    for (let key in objectJson) {
      try {
        console.log("The client name is : " + JSON.stringify(key));
        if (isArray(objectJson[key])) {
          for (let arrCount = 0; arrCount < objectJson[key].length; arrCount++) {
            userName = objectJson[key][arrCount].username;
            password = objectJson[key][arrCount].password;
            contactNumber = objectJson[key][arrCount].contactNumber;
            console.log("The client details are : " + userName + " " + password + " " + contactNumber);
          }
        }
        else {
          userName = objectJson[key].username;
          password = objectJson[key].password;
          contactNumber = objectJson[key].contactNumber;
          console.log("The client details are : " + userName + " " + password + " " + contactNumber);
        }

        setInputField("setValue", userName, "Rally_LoginEmail");
        setInputField("setValue", password, "Rally_LoginPassword");
        clickElement("click", "selector", "Rally_LoginButton");
        
        browser.pause(5000);
        moveTo("Rally_Menu");
        // $('#rh-header-account-menu-profile-container').moveTo();
        clickElement("click", "selector", "Rally_HelpLink");

        browser.pause(5000);
        browser.setTimeout({ 'implicit': 50000 });
        handles = browser.getWindowHandles();
        console.log("handles: " + handles.length);

        if (handles.length > 1) {
          browser.switchToWindow(handles[1]);
          clickElement("click", "selector", "Rally_ContactSupportButton");
          let contactNumberActual = JSON.stringify($(".slds-button.slds-button_brand.cta-button").getText());
          checkEqualsText("button", "Rally_ContactNumberButton", false, contactNumber);
          console.log("Contact Number Expected: " + contactNumber);
          console.log("Contact Number Actual: " + contactNumberActual);


          cucumberJson.attach(browser.takeScreenshot(), 'image/png');
          browser.saveScreenshot(screenshotPath + '/' + key + '.png');

          // browser.reloadSession();

          browser.closeWindow();
          browser.switchToWindow(handles[0]);
          moveTo("Rally_Menu");
          clickElement("click", "selector", "Rally_LogoutLink");

        }
      } catch (e) {
        console.log("Error in Rally app: " + e);
        // browser.reloadSession();
        cucumberJson.attach(browser.takeScreenshot(), 'image/png');
        browser.saveScreenshot(screenshotPath + '/' + key + '.png');
        browser.closeWindow();
        browser.switchToWindow(handles[0]);
        moveTo("Rally_Menu");
        clickElement("click", "selector", "Rally_LogoutLink");
        // throw e;
      }
    }

  }

  export function getFiles(pathOfDir: string) {
    let files = fs.readdirSync(pathOfDir);
    return files;
  }

  export function writeToFile(pathOfDir: string, jsonObj: any) {
    fs.writeFile(pathOfDir + '/clients.json', JSON.stringify(jsonObj), (err) => {
      if (err) {
        throw err;
      }
      console.log("JSON data is saved.");
    });
  }

  export function createUserData(flag: string, clientFiles: any, dirPath: string) {
    let sfExpectation: any = {};
    let username: any;
    let password: any;


    username = 'username';
    password = 'password';

    clientFiles.forEach(function (file: string) {

      excel_getTableRows(dirPath + '/' + file, 'Sheet1', function (results) {

        if (flag != 'with') {
          sfExpectation[results[0].CUST_LEG_NM] = { [username]: results[0].RALLY_EMAIL, [password]: results[0].RALLY_PASSWORD };
        }

        results.forEach(function (record: any) {

          let customerName = record.CUST_LEG_NM;
          if (!sfExpectation[customerName]) {
            sfExpectation[customerName] = [];
          }

          if (flag != 'without') {
            sfExpectation[customerName].push({ [username]: record.RALLY_EMAIL, [password]: record.RALLY_PASSWORD });
          }

        });

      });
    });
    return sfExpectation;

  }

  export function createClientData(jsonObj: any, dateOfRelease: any, pathOut: any) {
    for (let key in jsonObj) {
      console.log(key + " -> " + jsonObj[key]);

      let clientImp = key + ' - ' + dateOfRelease;
      let contactNumber = 'contactNumber';

      setInputField('setValue', clientImp, 'SF_SearchClient');
      clickElement('click', 'selector', 'SF_btnSearch');
      clickElement('click', 'selector', 'SF_btnSearch', clientImp);

      //This line is CREATING ISSUE
      // let rawText = await JSON.stringify(getElemText('element','SF_StandardContact'));


      // THIS WORKS FINE
      let rawText = JSON.stringify($("//div[@id='00NE0000006Km3F_ileinner']").getText());
      if (rawText) {
        rawText = rawText
      }
      else {
        rawText = JSON.stringify($("//div[@id='00NE0000006Km2z_ileinner']").getText());
      }

      console.log("Raw text is: " + JSON.stringify(rawText));
      let arrSuppNo = rawText.split("(");
      let expSuppNo = arrSuppNo[1];
      let lengthSuppNo = expSuppNo.length;
      expSuppNo = expSuppNo.substring(2, lengthSuppNo - 2);

      if (isArray(jsonObj[key])) {
        for (let arrCount = 0; arrCount < jsonObj[key].length; arrCount++) {
          jsonObj[key][arrCount][contactNumber] = expSuppNo;
        }
      }
      else {
        jsonObj[key][contactNumber] = expSuppNo;
      }
      writeToFile(pathOut, jsonObj);


    }
    // return jsonObj;
  }
}