import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "../../helpers/constants";
import {
  rightClickOnMacOS,
  rightClickOnWindows,
  saveFileOnMacOS,
  saveFileOnWindows,
  selectFileOnMacos,
  selectFileOnWindows,
} from "../../helpers/commands";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  ADD_FOLDER_BUTTON: '[name="add-folder"]',
  CONTEXT_MENU: '[name="Context Menu"]',
  CONTEXT_MENU_FILES_DELETE: '[name="files-delete"]',
  CONTEXT_MENU_FILES_DOWNLOAD: '[name="files-download"]',
  CONTEXT_MENU_FILES_RENAME: '[name="files-rename"]',
  CONTEXT_MENU_FOLDER_DELETE: '[name="folder-delete"]',
  CONTEXT_MENU_FOLDER_RENAME: '[name="folder-rename"]',
  CRUMB: '[name="crumb"]',
  CRUMB_HOME_FOLDER: '[name="home-dir"]',
  CRUMB_TEXT: "//Text",
  FILE_FOLDER_NAME_TEXT: "//Text/Text",
  FILES_BODY: '[name="files-body"]',
  FILES_BREADCRUMBS: '[name="files-breadcrumbs"]',
  FILES_INFO: '[name="files-info"]',
  FILES_INFO_CURRENT_SIZE: '[name="free-space-current-size"]',
  FILES_INFO_CURRENT_SIZE_HEADER: "//Text[1]",
  FILES_INFO_CURRENT_SIZE_VALUE: "//Text[2]",
  FILES_INFO_MAX_SIZE: '[name="free-space-max-size"]',
  FILES_INFO_MAX_SIZE_HEADER: "//Text[1]",
  FILES_INFO_MAX_SIZE_VALUE: "//Text[2]",
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
  UPLOAD_PROGRESS_BAR: '[name="upload-progress-bar-container"]',
  UPLOAD_PROGRESS_BAR_CONTENTS_FILENAME:
    '[name="filename-and-file-queue-text"]',
  UPLOAD_PROGRESS_BAR_CONTENTS_PERCENTAGE: '[name="progress-percentage"]',
  UPLOAD_PROGRESS_BAR_CONTENTS_QUEUE: '[name="upload-progress-files-queue"]',
  UPLOAD_PROGRESS_BAR_HEADER_DESCRIPTION:
    '[name="upload-progress-description"]',
  UPLOAD_PROGRESS_BAR_HEADER_PERCENTAGE: '[name="upload-progress-percentage"]',
};

const SELECTORS_MACOS = {
  ADD_FOLDER_BUTTON: "~add-folder",
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MENU_FILES_DELETE: "~files-delete",
  CONTEXT_MENU_FILES_DOWNLOAD: "~files-download",
  CONTEXT_MENU_FILES_RENAME: "~files-rename",
  CONTEXT_MENU_FOLDER_DELETE: "~folder-delete",
  CONTEXT_MENU_FOLDER_RENAME: "~folder-rename",
  CRUMB: "~crumb",
  CRUMB_HOME_FOLDER: "~home-dir",
  CRUMB_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText[1]",
  FILE_FOLDER_NAME:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
  FILE_FOLDER_NAME_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
  FILES_BODY: "~files-body",
  FILES_BREADCRUMBS: "~files-breadcrumbs",
  FILES_INFO: "~files-info",
  FILES_INFO_CURRENT_SIZE: "~free-space-current-size",
  FILES_INFO_CURRENT_SIZE_HEADER:
    "-ios class chain:**/XCUIElementTypeStaticText[1]",
  FILES_INFO_CURRENT_SIZE_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText[2]",
  FILES_INFO_MAX_SIZE: "~free-space-max-size",
  FILES_INFO_MAX_SIZE_HEADER:
    "-ios class chain:**/XCUIElementTypeStaticText[1]",
  FILES_INFO_MAX_SIZE_VALUE: "-ios class chain:**/XCUIElementTypeStaticText[2]",
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
  UPLOAD_PROGRESS_BAR: "~upload-progress-bar-container",
  UPLOAD_PROGRESS_BAR_CONTENTS_FILENAME: "~filename-and-file-queue-text",
  UPLOAD_PROGRESS_BAR_CONTENTS_PERCENTAGE: "~progress-percentage",
  UPLOAD_PROGRESS_BAR_CONTENTS_QUEUE: "~upload-progress-files-queue",
  UPLOAD_PROGRESS_BAR_HEADER_DESCRIPTION: "~upload-progress-description",
  UPLOAD_PROGRESS_BAR_HEADER_PERCENTAGE: "~upload-progress-percentage",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class FilesScreen extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.FILES_LAYOUT);
  }

  get addFolderButton() {
    return this.instance.$(SELECTORS.ADD_FOLDER_BUTTON);
  }

  get addFolderTooltip() {
    return this.instance.$(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP);
  }

  get addFolderTooltipText() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get contextMenu() {
    return this.instance.$(SELECTORS.CONTEXT_MENU);
  }

  get contextMenuFilesDelete() {
    return this.instance.$(SELECTORS.CONTEXT_MENU_FILES_DELETE);
  }

  get contextMenuFilesDownload() {
    return this.instance.$(SELECTORS.CONTEXT_MENU_FILES_DOWNLOAD);
  }

  get contextMenuFilesRename() {
    return this.instance.$(SELECTORS.CONTEXT_MENU_FILES_RENAME);
  }

  get contextMenuFolderDelete() {
    return this.instance.$(SELECTORS.CONTEXT_MENU_FOLDER_DELETE);
  }

  get contextMenuFolderRename() {
    return this.instance.$(SELECTORS.CONTEXT_MENU_FOLDER_RENAME);
  }

  get crumb() {
    return this.instance.$$(SELECTORS.CRUMB);
  }

  get crumbHomeDir() {
    return this.instance.$(SELECTORS.CRUMB_HOME_FOLDER);
  }

  get crumbText() {
    return this.instance.$$(SELECTORS.CRUMB).$(SELECTORS.CRUMB_TEXT);
  }

  get fileFolderNameText() {
    return this.instance.$(SELECTORS.FILE_FOLDER_NAME_TEXT);
  }

  get filesBody() {
    return this.instance.$(SELECTORS.FILES_BODY);
  }

  get filesBreadcrumbs() {
    return this.instance.$(SELECTORS.FILES_BREADCRUMBS);
  }

  get filesInfo() {
    return this.instance.$(SELECTORS.FILES_INFO);
  }

  get filesInfoCurrentSize() {
    return this.instance.$(SELECTORS.FILES_INFO_CURRENT_SIZE);
  }

  get filesInfoCurrentSizeLabel() {
    return this.instance
      .$(SELECTORS.FILES_INFO_CURRENT_SIZE)
      .$(SELECTORS.FILES_INFO_CURRENT_SIZE_HEADER);
  }

  get filesInfoCurrentSizeValue() {
    return this.instance
      .$(SELECTORS.FILES_INFO_CURRENT_SIZE)
      .$(SELECTORS.FILES_INFO_CURRENT_SIZE_VALUE);
  }

  get filesInfoMaxSize() {
    return this.instance.$(SELECTORS.FILES_INFO_MAX_SIZE);
  }

  get filesInfoMaxSizeLabel() {
    return this.instance
      .$(SELECTORS.FILES_INFO_MAX_SIZE)
      .$(SELECTORS.FILES_INFO_MAX_SIZE_HEADER);
  }

  get filesInfoMaxSizeValue() {
    return this.instance
      .$(SELECTORS.FILES_INFO_MAX_SIZE)
      .$(SELECTORS.FILES_INFO_MAX_SIZE_VALUE);
  }

  get filesLayout() {
    return this.instance.$(SELECTORS.FILES_LAYOUT);
  }

  get filesList() {
    return this.instance.$(SELECTORS.FILES_LIST);
  }

  get inputError() {
    return this.instance.$(SELECTORS.INPUT_ERROR);
  }

  get inputErrorText() {
    return this.instance.$(SELECTORS.INPUT_ERROR).$(SELECTORS.INPUT_ERROR_TEXT);
  }

  get inputFolderFileName() {
    return this.instance
      .$(SELECTORS.FILES_LIST)
      .$(SELECTORS.INPUT_FOLDER_FILE_NAME);
  }

  get showSidebar() {
    return this.instance.$(SELECTORS.TOPBAR).$(SELECTORS.SHOW_SIDEBAR);
  }

  get topbar() {
    return this.instance.$(SELECTORS.TOPBAR);
  }

  get uploadFileButton() {
    return this.instance.$(SELECTORS.UPLOAD_FILE_BUTTON);
  }

  get uploadFileTooltip() {
    return this.instance.$(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP);
  }

  get uploadFileTooltipText() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get uploadFileIndicatorFilename() {
    return this.instance.$(SELECTORS.UPLOAD_FILE_INDICATOR_FILENAME);
  }

  get uploadFileIndicatorProgress() {
    return this.instance.$(SELECTORS.UPLOAD_FILE_INDICATOR_PROGRESS);
  }

  get uploadProgressBar() {
    return this.instance.$(SELECTORS.UPLOAD_PROGRESS_BAR);
  }

  get uploadProgressBarContentsFilename() {
    return this.instance
      .$(SELECTORS.UPLOAD_PROGRESS_BAR)
      .$(SELECTORS.UPLOAD_PROGRESS_BAR_CONTENTS_FILENAME);
  }

  get uploadProgressBarContentsPercentage() {
    return this.instance
      .$(SELECTORS.UPLOAD_PROGRESS_BAR)
      .$(SELECTORS.UPLOAD_PROGRESS_BAR_CONTENTS_PERCENTAGE);
  }

  get uploadProgressBarContentsQueue() {
    return this.instance
      .$(SELECTORS.UPLOAD_PROGRESS_BAR)
      .$(SELECTORS.UPLOAD_PROGRESS_BAR_CONTENTS_QUEUE);
  }

  get uploadProgressBarHeaderDescription() {
    return this.instance
      .$(SELECTORS.UPLOAD_PROGRESS_BAR)
      .$(SELECTORS.UPLOAD_PROGRESS_BAR_HEADER_DESCRIPTION);
  }
  get uploadProgressBarHeaderPercentage() {
    return this.instance
      .$(SELECTORS.UPLOAD_PROGRESS_BAR)
      .$(SELECTORS.UPLOAD_PROGRESS_BAR_HEADER_PERCENTAGE);
  }

  async clickOnCreateFolder() {
    await this.addFolderButton.click();
  }

  async clickOnFileOrFolder(locator: string) {
    const element = await this.getLocatorOfFolderFile(locator);
    await this.instance.$(element).click();
  }

  async clickOnFolderCrumb(folderName: string) {
    const crumbs = await this.crumb;
    for (let i = 0; i < crumbs.length; i++) {
      const crumbText = await crumbs[i].$(SELECTORS.CRUMB_TEXT).getText();
      if (crumbText === folderName) {
        await crumbs[i].click();
      }
    }
  }

  async clickOnHomeFolderCrumb() {
    await this.instance.$(SELECTORS.CRUMB_HOME_FOLDER).click();
  }

  async clickOnShowSidebar() {
    await this.showSidebar.click();
  }

  async clickOnUploadFile() {
    await this.uploadFileButton.click();
  }

  async createFolder(name: string) {
    const currentDriver = await this.getCurrentDriver();
    await this.clickOnCreateFolder();
    if (currentDriver === MACOS_DRIVER) {
      await this.inputFolderFileName.setValue(name + "\n");
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.inputFolderFileName.setValue(name + "\uE007");
    }
    const newFolder = await this.getLocatorOfFolderFile(name);
    await this.instance.$(newFolder).waitForExist({ timeout: 15000 });
  }

  async typeOnFileFolderNameInput(name: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.inputFolderFileName.setValue(name + "\n");
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.inputFolderFileName.setValue(name + "\uE007");
    }
  }

  async downloadFile(filename: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.clickOnFilesDownload();
      await saveFileOnMacOS(filename, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      const uplinkContext = await driver.getWindowHandle();
      await this.clickOnFilesDownload();
      await saveFileOnWindows(filename, uplinkContext, this.executor);
    }
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
    const fileOrFolderText = await element
      .$(SELECTORS.FILE_FOLDER_NAME)
      .getText();
    return fileOrFolderText;
  }

  async getLocatorOfDeletedElement(name: string) {
    const currentDriver = await this.getCurrentDriver();
    let locator;
    if (currentDriver === MACOS_DRIVER) {
      locator =
        '-ios class chain:**/XCUIElementTypeGroup[`label == "' + name + '"`]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator = '//Group[name="' + name + '"]';
    }
    return locator;
  }

  async getLocatorOfFolderFile(name: string) {
    const currentDriver = await this.getCurrentDriver();
    let locator;
    if (currentDriver === MACOS_DRIVER) {
      locator =
        '-ios class chain:**/XCUIElementTypeGroup[`label == "' + name + '"`]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator = '//Group[@Name="' + name + '"]';
    }
    return locator;
  }

  async getProgressUploadFilename() {
    const filename = await this.uploadFileIndicatorFilename.getText();
    return filename;
  }

  async getProgressUploadPercentage() {
    const progress = await this.uploadFileIndicatorProgress.getText();
    return progress;
  }

  async updateNameFileFolder(newName: string, extension: string = "") {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.inputFolderFileName.setValue(newName + "\n");
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.inputFolderFileName.setValue(newName + "\uE007");
    }
    const newFileFolder = await this.getLocatorOfFolderFile(
      newName + extension
    );
    await this.instance.$(newFileFolder).waitForExist();
  }

  async uploadFile(relativePath: string) {
    const currentDriver = await this.getCurrentDriver();
    await this.clickOnUploadFile();
    if (currentDriver === MACOS_DRIVER) {
      await selectFileOnMacos(relativePath, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await selectFileOnWindows(relativePath);
    }
  }

  async validateFileOrFolderExist(locator: string) {
    const element = await this.getLocatorOfFolderFile(locator);
    await this.instance.$(element).waitForExist({ timeout: 15000 });
  }

  async validateFileOrFolderNotExist(locator: string) {
    const element = await this.getLocatorOfDeletedElement(locator);
    await this.instance.$(element).waitForExist({ reverse: true });
  }

  // Hovering methods

  async hoverOnNewFolderButton() {
    const element = await this.addFolderButton;
    await this.hoverOnElement(element);
  }

  async hoverOnUploadButton() {
    const element = await this.uploadFileButton;
    await this.hoverOnElement(element);
  }

  // Context Menu methods

  async openFilesContextMenu(name: string) {
    const elementLocator = await this.getLocatorOfFolderFile(name);
    const fileFolderToRightClick = await this.instance
      .$(elementLocator)
      .$(SELECTORS.FILE_FOLDER_NAME_TEXT);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(fileFolderToRightClick, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(fileFolderToRightClick, this.executor);
    }
    await this.contextMenu.waitForDisplayed();
  }

  async clickOnFilesDelete() {
    await this.contextMenuFilesDelete.click();
  }

  async clickOnFilesDownload() {
    await this.contextMenuFilesDownload.click();
  }

  async clickOnFilesRename() {
    await this.contextMenuFilesRename.click();
  }

  async clickOnFolderDelete() {
    await this.contextMenuFolderDelete.click();
  }

  async clickOnFolderRename() {
    await this.contextMenuFolderRename.click();
  }
}
