import { selectFileOnMacos, selectFileOnWindows } from "../helpers/commands";
import UplinkMainScreen from "./UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  ADD_FOLDER_BUTTON: '[name="add-folder"]',
  CONTEXT_MENU: '[name="Context Menu"]',
  CONTEXT_MENU_OPTION: '[name="Context Item"]',
  CRUMB: '[name="crumb"]',
  CRUMB_TEXT: "//Text",
  FILES_BODY: '[name="files-body"]',
  FILES_BREADCRUMBS: '[name="files-breadcrumbs"]',
  FILES_INFO: '[name="files-info"]',
  FILES_INFO_FREE_SPACE_LABEL: "//Text[1]",
  FILES_INFO_FREE_SPACE_VALUE: "//Text[2]",
  FILES_INFO_TOTAL_SPACE_LABEL: "//Text[3]",
  FILES_INFO_TOTAL_SPACE_VALUE: "//Text[4]",
  FILES_LAYOUT: '[name=files-layout"]',
  FILES_LIST: '[name="files-list"]',
  INPUT_ERROR: '[name="input-error"]',
  INPUT_ERROR_TEXT: "//Text",
  INPUT_FOLDER_FILE_NAME: "//Group/Edit",
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  TOPBAR: '[name="Topbar"]',
  UPLOAD_FILE_BUTTON: '[name="upload-file"]',
  UPLOAD_FILE_INDICATOR_FILENAME: "//Document/Group/Text[1]",
  UPLOAD_FILE_INDICATOR_PROGRESS: "//Document/Group/Text[2]",
};

const SELECTORS_MACOS = {
  ADD_FOLDER_BUTTON: "~add-folder",
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MENU_OPTION: "~Context Item",
  CRUMB: "~crumb",
  CRUMB_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText[1]",
  FILE_FOLDER_NAME:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
  FILES_BODY: "~files-body",
  FILES_BREADCRUMBS: "~files-breadcrumbs",
  FILES_INFO: "~files-info",
  FILES_INFO_FREE_SPACE_LABEL:
    "-ios class chain:**/XCUIElementTypeGroup[1]/XCUIElementTypeStaticText[1]",
  FILES_INFO_FREE_SPACE_VALUE:
    "-ios class chain:**/XCUIElementTypeGroup[1]/XCUIElementTypeStaticText[2]",
  FILES_INFO_TOTAL_SPACE_LABEL:
    "-ios class chain:**/XCUIElementTypeGroup[2]/XCUIElementTypeStaticText[1]",
  FILES_INFO_TOTAL_SPACE_VALUE:
    "-ios class chain:**/XCUIElementTypeGroup[2]/XCUIElementTypeStaticText[2]",
  FILES_LAYOUT: "~files-layout",
  FILES_LIST: "~files-list",
  INPUT_ERROR: "~input-error",
  INPUT_ERROR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  INPUT_FOLDER_FILE_NAME: "-ios class chain:**/XCUIElementTypeTextField",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  TOPBAR: "~Topbar",
  UPLOAD_FILE_BUTTON: "~upload-file",
  UPLOAD_FILE_INDICATOR_FILENAME:
    "-ios class chain:**/XCUIElementTypeWebView/XCUIElementTypeGroup[3]/XCUIElementTypeStaticText",
  UPLOAD_FILE_INDICATOR_PROGRESS:
    "-ios class chain:**/XCUIElementTypeWebView/XCUIElementTypeGroup[4]/XCUIElementTypeStaticText",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class FilesScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.FILES_LAYOUT);
  }

  get addFolderButton() {
    return $(SELECTORS.ADD_FOLDER_BUTTON);
  }

  get addFolderTooltip() {
    return $(SELECTORS.TOPBAR).$$(SELECTORS.TOOLTIP)[0];
  }

  get addFolderTooltipText() {
    return $(SELECTORS.TOPBAR)
      .$$(SELECTORS.TOOLTIP)[0]
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get crumb() {
    return $$(SELECTORS.CRUMB);
  }

  get crumbText() {
    return $$(SELECTORS.CRUMB).$(SELECTORS.CRUMB_TEXT);
  }

  get filesBody() {
    return $(SELECTORS.FILES_BODY);
  }

  get filesBreadcrumbs() {
    return $(SELECTORS.FILES_BREADCRUMBS);
  }

  get filesInfo() {
    return $(SELECTORS.FILES_INFO);
  }

  get filesInfoFreeSpaceLabel() {
    return $(SELECTORS.FILES_INFO).$(SELECTORS.FILES_INFO_FREE_SPACE_LABEL);
  }

  get filesInfoFreeSpaceValue() {
    return $(SELECTORS.FILES_INFO).$(SELECTORS.FILES_INFO_FREE_SPACE_VALUE);
  }

  get filesInfoTotalSpaceLabel() {
    return $(SELECTORS.FILES_INFO).$(SELECTORS.FILES_INFO_TOTAL_SPACE_LABEL);
  }

  get filesInfoTotalSpaceValue() {
    return $(SELECTORS.FILES_INFO).$(SELECTORS.FILES_INFO_TOTAL_SPACE_VALUE);
  }

  get filesLayout() {
    return $(SELECTORS.FILES_LAYOUT);
  }

  get filesList() {
    return $(SELECTORS.FILES_LIST);
  }

  get inputError() {
    return $(SELECTORS.INPUT_ERROR);
  }

  get inputErrorText() {
    return $(SELECTORS.INPUT_ERROR).$(SELECTORS.INPUT_ERROR_TEXT);
  }

  get inputFolderFileName() {
    return $(SELECTORS.FILES_LIST).$(SELECTORS.INPUT_FOLDER_FILE_NAME);
  }

  get showSidebar() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.SHOW_SIDEBAR);
  }

  get topbar() {
    return $(SELECTORS.TOPBAR);
  }

  get uploadFileButton() {
    return $(SELECTORS.UPLOAD_FILE_BUTTON);
  }

  get uploadFileTooltip() {
    return $(SELECTORS.TOPBAR).$$(SELECTORS.TOOLTIP)[1];
  }

  get uploadFileTooltipText() {
    return $(SELECTORS.TOPBAR)
      .$$(SELECTORS.TOOLTIP)[1]
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get uploadFileIndicatorFilename() {
    return $(SELECTORS.UPLOAD_FILE_INDICATOR_FILENAME);
  }

  get uploadFileIndicatorProgress() {
    return $(SELECTORS.UPLOAD_FILE_INDICATOR_PROGRESS);
  }

  async clickOnFolderCrumb(folderName: string) {
    const crumbs = await this.crumb;
    for (let i = 0; i < crumbs.length; i++) {
      if (
        (await (await crumbs[i].$(SELECTORS.CRUMB_TEXT)).getText()) ===
        folderName
      ) {
        await crumbs[i].click();
      }
    }
  }

  async clickOnHomeFolderCrumb() {
    await $$(SELECTORS.CRUMB)[0].click();
  }

  async clickOnShowSidebar() {
    await this.showSidebar.click();
  }

  async createFolder(name: string) {
    const currentDriver = await this.getCurrentDriver();
    await (await this.addFolderButton).click();
    if (currentDriver === "mac2") {
      await (await this.inputFolderFileName).setValue(name + "\n");
    } else if (currentDriver === "windows") {
      await (await this.inputFolderFileName).setValue(name + "\uE007");
    }
    const newFolder = await this.getLocatorOfFolderFile(name);
    expect(newFolder).toExist();
  }

  async getCurrentFolder() {
    const folders = await this.crumb;
    const treeLength = folders.length - 1;
    const currentFolderName = await folders[treeLength]
      .$(SELECTORS.CRUMB_TEXT)
      .getText();
    return currentFolderName;
  }

  async getFileFolderName(element: WebdriverIO.Element) {
    return await (await element.$(SELECTORS.FILE_FOLDER_NAME)).getText();
  }

  async getLocatorOfFolderFile(name: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      return await $("~" + name);
    } else if (currentDriver === "windows") {
      return await $('[name="' + name + '"]');
    }
  }

  async getProgressUploadFilename() {
    const filename = await (await this.uploadFileIndicatorFilename).getText();
    return filename;
  }

  async getProgressUploadPercentage() {
    const progress = await (await this.uploadFileIndicatorProgress).getText();
    return progress;
  }

  async uploadFile(relativePath: string) {
    const currentDriver = await this.getCurrentDriver();
    await (await this.uploadFileButton).click();
    if (currentDriver === "mac2") {
      await selectFileOnMacos(relativePath);
    } else if (currentDriver === "windows") {
      await selectFileOnWindows(relativePath);
    }
  }
}

export default new FilesScreen();
