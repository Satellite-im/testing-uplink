require("module-alias/register");
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import { rightClickOnMacOS, rightClickOnWindows } from "@helpers/commands";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { selectorContainer } from "@screenobjects/AppScreen";

let SELECTORS: selectorContainer = {};

const SELECTORS_COMMON: selectorContainer = {};

const SELECTORS_WINDOWS: selectorContainer = {
  CLOSE_BUTTON: "<Button>",
  CLOSE_BUTTON_MODAL: '[name="modal"]',
  CONTEXT_MENU: '[name="Context Menu"]',
  CONTEXT_MENU_FILES_RENAME: '[name="files-rename"]',
  CONTEXT_MENU_FOLDER_DELETE: '[name="folder-delete"]',
  CONTEXT_MENU_FOLDER_RENAME: '[name="folder-rename"]',
  FILE_FOLDER_NAME_TEXT: "//Text/Text",
  FILE_THUMBNAIL: "<Image>",
  FILES_BREADCRUMBS: '[name="files-breadcrumbs"]',
  FILES_CRUMB: '[name="crumb"]',
  FILES_CRUMB_TEXT: "<Text>",
  FILES_LIST: '[name="files-list"]',
  INPUT_ERROR: '[name="input-error"]',
  INPUT_ERROR_TEXT: "<Text>",
  INPUT_FILE_NAME: '[name="file-name-input"]',
  INPUT_FOLDER_NAME: '[name="folder-name-input"]',
  GO_TO_FILES_BUTTON: '[name="go_to_files_btn"]',
  HOME_DIR: '[name="home-dir"]',
  HOME_DIR_TEXT: '[name="Home"]',
  NO_FILES_AVAILABLE: "//Text/Text",
  SEND_FILES_BODY: '[name="send-files-body"]',
  SEND_FILES_LAYOUT: '[name="send-files-layout"]',
  SEND_FILES_MODAL_SEND_BUTTON: '[name="send_files_modal_send_button"]',
};

const SELECTORS_MACOS: selectorContainer = {
  CLOSE_BUTTON: "-ios class chain:**/XCUIElementTypeButton",
  CLOSE_BUTTON_MODAL: "~modal",
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MENU_FILES_RENAME: "~files-rename",
  CONTEXT_MENU_FOLDER_DELETE: "~folder-delete",
  CONTEXT_MENU_FOLDER_RENAME: "~folder-rename",
  FILE_FOLDER_NAME_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
  FILE_THUMBNAIL: "-ios class chain:**/XCUIElementTypeImage",
  FILES_BREADCRUMBS: "~files-breadcrumbs",
  FILES_CRUMB: "~crumb",
  FILES_CRUMB_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  FILES_LIST: "~files-list",
  GO_TO_FILES_BUTTON: "~go_to_files_btn",
  HOME_DIR: "~home-dir",
  HOME_DIR_TEXT:
    '-ios class chain:**/XCUIElementTypeStaticText[`value == "Home"`]',
  INPUT_ERROR: "~input-error",
  INPUT_ERROR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  INPUT_FILE_NAME: '[name="file-name-input"]',
  INPUT_FOLDER_NAME: '[name="folder-name-input"]',
  NO_FILES_AVAILABLE:
    "-ios class chain:**/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
  SEND_FILES_BODY: "~send-files-body",
  SEND_FILES_LAYOUT: "~send-files-layout",
  SEND_FILES_MODAL_SEND_BUTTON: "~send_files_modal_send_button",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class SendFiles extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.SEND_FILES_LAYOUT);
  }

  public get closeButton() {
    return this.closeButtonModal.$(SELECTORS.CLOSE_BUTTON);
  }

  public get closeButtonModal() {
    return $(SELECTORS.CLOSE_BUTTON_MODAL);
  }

  public get contextMenu() {
    return $(SELECTORS.CONTEXT_MENU);
  }

  public get contextMenuFilesRename() {
    return $(SELECTORS.CONTEXT_MENU_FILES_RENAME);
  }

  public get contextMenuFolderDelete() {
    return $(SELECTORS.CONTEXT_MENU_FOLDER_DELETE);
  }

  public get contextMenuFolderRename() {
    return $(SELECTORS.CONTEXT_MENU_FOLDER_RENAME);
  }

  public get fileFolderNameText() {
    return this.sendFilesBody.$(SELECTORS.FILE_FOLDER_NAME_TEXT);
  }

  public get fileThumbnail() {
    return this.sendFilesBody.$(SELECTORS.FILE_THUMBNAIL);
  }

  public get filesBreadcrumbs() {
    return this.sendFilesBody.$(SELECTORS.FILES_BREADCRUMBS);
  }

  public get filesCrumb() {
    return this.filesBreadcrumbs.$(SELECTORS.FILES_CRUMB);
  }

  public get filesCrumbText() {
    return this.filesCrumb.$(SELECTORS.FILES_CRUMB_TEXT);
  }

  public get filesList() {
    return this.sendFilesBody.$(SELECTORS.FILES_LIST);
  }

  public get goToFilesButton() {
    return this.sendFilesBody.$(SELECTORS.GO_TO_FILES_BUTTON);
  }

  public get homeDir() {
    return this.sendFilesBody.$(SELECTORS.HOME_DIR);
  }

  public get homeDirText() {
    return this.homeDir.$(SELECTORS.HOME_DIR_TEXT);
  }

  public get inputError() {
    return this.sendFilesBody.$(SELECTORS.INPUT_ERROR);
  }

  public get inputErrorText() {
    return this.inputError.$(SELECTORS.INPUT_ERROR_TEXT);
  }

  public get inputFileName() {
    return $(SELECTORS.INPUT_FILE_NAME);
  }

  public get inputFolderName() {
    return $(SELECTORS.INPUT_FOLDER_NAME);
  }

  public get noFilesAvailable() {
    return this.sendFilesBody.$(SELECTORS.NO_FILES_AVAILABLE);
  }

  public get sendFilesBody() {
    return this.sendFilesLayout.$(SELECTORS.SEND_FILES_BODY);
  }

  public get sendFilesLayout() {
    return $(SELECTORS.SEND_FILES_LAYOUT);
  }

  public get sendFilesModalSendButton() {
    return this.sendFilesBody.$(SELECTORS.SEND_FILES_MODAL_SEND_BUTTON);
  }

  async clickOnCloseModal() {
    const closeButton = await this.closeButton;
    await closeButton.click();
  }

  async clickOnFile(locator: string) {
    const fileLocator: WebdriverIO.Element =
      await this.getLocatorOfFolderFile(locator);
    const fileElement = await fileLocator.$(SELECTORS.FILE_THUMBNAIL);
    await fileElement.click();
  }

  async clickOnFolder(locator: string) {
    const folderLocator: WebdriverIO.Element =
      await this.getLocatorOfFolderFile(locator);
    await folderLocator.click();
  }

  async clickOnFolderCrumb(folderName: string) {
    const crumbs: WebdriverIO.ElementArray = await $$(SELECTORS.FILES_CRUMB);
    for (let i = 0; i < crumbs.length; i++) {
      const crumbTextElement = await crumbs[i].$(SELECTORS.FILES_CRUMB_TEXT);
      const crumbTextValue = await crumbTextElement.getText();
      if (crumbTextValue === folderName) {
        await crumbs[i].click();
      }
    }
  }

  async clickOnGoToFiles() {
    const goToFilesButton = await this.goToFilesButton;
    await goToFilesButton.click();
  }

  async clickOnHomeFolderCrumb() {
    const homeFolder = await this.homeDir;
    await homeFolder.click();
  }

  async clickOnSendFilesButton() {
    const sendFilesButton = await this.sendFilesModalSendButton;
    await sendFilesButton.click();
  }

  async getValueFromSendFilesButton() {
    const currentDriver = await this.getCurrentDriver();
    const sendFilesModalSendButton = await this.sendFilesModalSendButton;
    let result;
    if (currentDriver === WINDOWS_DRIVER) {
      result = await sendFilesModalSendButton.getAttribute("HelpText");
    }
    return result?.toString();
  }

  async typeOnFileNameInput(name: string) {
    const inputFileName = await this.inputFileName;
    await inputFileName.waitForExist();
    await inputFileName.clearValue();
    await inputFileName.setValue(name);
    const inputFileNameValue = await inputFileName.getText();
    if (inputFileNameValue !== name) {
      await this.typeOnFileNameInput(name);
    }
  }

  async typeOnFolderNameInput(name: string) {
    const inputFolderName = await this.inputFolderName;
    await inputFolderName.waitForExist();
    await inputFolderName.clearValue();
    await inputFolderName.setValue(name);
    const inputFolderNameValue = await inputFolderName.getText();
    if (inputFolderNameValue !== name) {
      await this.typeOnFolderNameInput(name);
    }
  }

  async getCurrentFolder() {
    const folders: WebdriverIO.ElementArray = await $$(SELECTORS.FILES_CRUMB);
    const treeLength = folders.length - 1;
    const currentFolderName = await folders[treeLength].$(
      SELECTORS.FILES_CRUMB_TEXT,
    );
    const currentFolderNameText = await currentFolderName.getText();
    return currentFolderNameText;
  }

  async getFileFolderName(element: WebdriverIO.Element) {
    const fileOrFolderText = await element.$(SELECTORS.FILE_FOLDER_NAME_TEXT);
    const fileOrFolderTextValue = await fileOrFolderText.getText();
    return fileOrFolderTextValue;
  }

  async getLocatorOfDeletedElement(name: string) {
    const currentDriver = await this.getCurrentDriver();
    let locator;
    if (currentDriver === MACOS_DRIVER) {
      locator =
        '-ios class chain:**/XCUIElementTypeGroup[`label == "' + name + '"`]';
    } else {
      locator = '//Group[name="' + name + '"]';
    }
    return locator;
  }

  async getLocatorOfFolderFile(name: string) {
    const currentDriver = await this.getCurrentDriver();
    let locator: string;
    if (currentDriver === MACOS_DRIVER) {
      locator =
        '-ios class chain:**/XCUIElementTypeGroup[`label == "' + name + '"`]';
      const element: WebdriverIO.Element =
        await this.sendFilesLayout.$(locator);
      return element;
    } else {
      locator = '//Group[@Name="' + name + '"]';
      const element: WebdriverIO.Element =
        await this.sendFilesLayout.$(locator);
      return element;
    }
  }

  async updateNameFile(newName: string, extension: string = "") {
    const inputFileName = await this.inputFileName;
    await inputFileName.waitForExist();
    await inputFileName.clearValue();
    await inputFileName.setValue(newName);
    const inputFileNameValue = await inputFileName.getText();
    if (inputFileNameValue !== newName) {
      await this.updateNameFile(newName, extension);
    } else {
      const newFile = await this.getLocatorOfFolderFile(newName + extension);
      await newFile.waitForExist();
    }
  }

  async updateNameFolder(newName: string) {
    const inputFolderName = await this.inputFolderName;
    await inputFolderName.waitForExist();
    await inputFolderName.clearValue();
    await inputFolderName.setValue(newName);
    const inputFolderNameValue = await inputFolderName.getText();
    if (inputFolderNameValue !== newName) {
      await this.updateNameFolder(newName);
    } else {
      const newFolder = await this.getLocatorOfFolderFile(newName);
      await newFolder.waitForExist();
    }
  }

  async validateFileOrFolderExist(locator: string) {
    const fileFolderElement = await this.getLocatorOfFolderFile(locator);
    await fileFolderElement.waitForExist();
  }

  async validateFileOrFolderNotExist(locator: string) {
    const fileFolderLocator = await this.getLocatorOfDeletedElement(locator);
    await $(fileFolderLocator).waitForExist({ reverse: true });
  }

  async validateNoFilesAvailableIsShown() {
    const noFilesAvailable = await this.noFilesAvailable;
    await noFilesAvailable.waitForExist();
    await expect(noFilesAvailable).toHaveText("NO FILES ADDED YET");
  }

  async validateSendFilesButtonText(expectedText: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await this.getValueFromSendFilesButton().then((value) => {
        expect(value).toEqual(expectedText);
      });
    }
  }

  async validateSendFilesModalIsShown() {
    const filesBody = await this.sendFilesLayout;
    await filesBody.waitForExist();
  }

  async validateThumbnailIsShown(name: string) {
    const fileElement = await this.getLocatorOfFolderFile(name);
    const fileThumbnail = await fileElement.$(SELECTORS.FILE_THUMBNAIL);
    await fileThumbnail.waitForExist();
  }

  // Context Menu methods

  async openFilesContextMenu(name: string) {
    const elementLocator = await this.getLocatorOfFolderFile(name);
    const fileFolderToRightClick = await elementLocator.$(
      SELECTORS.FILE_FOLDER_NAME_TEXT,
    );
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(fileFolderToRightClick);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(fileFolderToRightClick);
    }
    await this.contextMenu.waitForExist();
  }

  async clickOnFilesRename() {
    const filesRenameOption = await this.contextMenuFilesRename;
    await filesRenameOption.click();
  }

  async clickOnFolderDelete() {
    const folderDeleteOption = await this.contextMenuFolderDelete;
    await folderDeleteOption.click();
  }

  async clickOnFolderRename() {
    const folderRenameOption = await this.contextMenuFolderRename;
    await folderRenameOption.click();
  }
}

export default new SendFiles();
