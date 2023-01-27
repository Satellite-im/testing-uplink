import UplinkMainScreen from "./UplinkMainScreen";

const SELECTORS = {
  ADD_FOLDER_BUTTON: "~add-folder",
  CRUMB: "~crumb",
  FAKE_FILE_1: "~fake-file-1",
  FAKE_FOLDER_1: "~fake-folder-1",
  FAKE_FOLDER_2: "~fake-folder-2",
  FILES_BODY: "~files-body",
  FILES_BREADCRUMBS: "~files-breadcrumbs",
  FILES_INFO: "~files-info",
  FILES_LAYOUT: "~files-layout",
  FILES_LIST: "~files-list",
  UPLOAD_FILE_BUTTON: "~upload-file",
};

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
    return $(SELECTORS.CRUMB).$(
      "-ios class chain:**/XCUIElementTypeStaticText[1]"
    );
  }

  get fakeFile1() {
    return $(SELECTORS.FAKE_FILE_1);
  }

  get fakeFolder1() {
    return $(SELECTORS.FAKE_FOLDER_1);
  }

  get fakeFolder2() {
    return $(SELECTORS.FAKE_FOLDER_2);
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
    return $(
      'ios class chain:**/XCUIElementTypeGroup[`label == "files-info"`]/XCUIElementTypeGroup[1]/XCUIElementTypeStaticText[1]'
    );
  }

  get filesInfoFreeSpaceValue() {
    return $(
      'ios class chain:**/XCUIElementTypeGroup[`label == "files-info"`]/XCUIElementTypeGroup[1]/XCUIElementTypeStaticText[2]'
    );
  }

  get filesInfoTotalSpaceLabel() {
    return $(
      'ios class chain:**/XCUIElementTypeGroup[`label == "files-info"`]/XCUIElementTypeGroup[2]/XCUIElementTypeStaticText[1]'
    );
  }

  get filesInfoTotalSpaceValue() {
    return $(
      'ios class chain:**/XCUIElementTypeGroup[`label == "files-info"`]/XCUIElementTypeGroup[2]/XCUIElementTypeStaticText[2]'
    );
  }

  get filesLayout() {
    return $(SELECTORS.FILES_LAYOUT);
  }

  get filesList() {
    return $(SELECTORS.FILES_LIST);
  }

  get uploadFileButton() {
    return $(SELECTORS.UPLOAD_FILE_BUTTON);
  }
}

export default new FilesScreen();
