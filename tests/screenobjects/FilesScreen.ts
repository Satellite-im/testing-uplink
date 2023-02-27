import UplinkMainScreen from "./UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  ADD_FOLDER_BUTTON: '[name="add-folder"]',
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
  SHOW_SIDEBAR: "//Button[1]",
  TOPBAR: '[name="Topbar"]',
  UPLOAD_FILE_BUTTON: '[name="upload-file"]',
};

const SELECTORS_MACOS = {
  ADD_FOLDER_BUTTON: "~add-folder",
  CRUMB: "~crumb",
  CRUMB_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
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
  UPLOAD_FILE_BUTTON: "~upload-file",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class FilesScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.FILES_LAYOUT);
  }

  get addFileButton() {
    return $(SELECTORS.ADD_FOLDER_BUTTON);
  }

  get crumb() {
    return $(SELECTORS.CRUMB);
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

  get showSidebar() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.SHOW_SIDEBAR);
  }

  get topbar() {
    return $(SELECTORS.TOPBAR);
  }

  get uploadFileButton() {
    return $(SELECTORS.UPLOAD_FILE_BUTTON);
  }

  async clickOnShowSidebar() {
    await this.showSidebar.click();
  }
}

export default new FilesScreen();
