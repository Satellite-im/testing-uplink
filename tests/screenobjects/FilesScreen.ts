import AppScreen from "./AppScreen";

const SELECTORS = {
  ADD_FOLDER_BUTTON: "~add-folder",
  BUTTON_NAV: "~button-nav",
  CHAT_SEARCH_INPUT: "~chat-search-input",
  CHATS_BUTTON: "~chats-button",
  CRUMB: "~crumb",
  FAKE_FILE_1: "~fake-file-1",
  FAKE_FOLDER_1: "~fake-folder-1",
  FAKE_FOLDER_2: "~fake-folder-2",
  FILES_BODY: "~files-body",
  FILES_BREADCRUMBS: "~files-breadcrumbs",
  FILES_BUTTON: "~files-button",
  FILES_INFO: "~files-info",
  FILES_LAYOUT: "~files-layout",
  FILES_LIST: "~files-list",
  FRIENDS_BUTTON: "~friends-button",
  PRE_RELEASE_INDICATOR: "~pre-release",
  PRE_RELEASE_INDICATOR_TEXT:
    '-ios class chain:**/XCUIElementTypeStaticText[`value == "Pre-release"`]',
  SETTINGS_BUTTON: "~settings-button",
  SIDEBAR: "~sidebar",
  SIDEBAR_CHILDREN: "~sidebar-children",
  SIDEBAR_SEARCH: "~sidebar-search",
  UPLOAD_FILE_BUTTON: "~upload-file",
  WINDOW: "-ios class chain:**/XCUIElementTypeWebView",
};

class FilesScreen extends AppScreen {
  constructor() {
    super(SELECTORS.FILES_LAYOUT);
  }

  get addFileButton() {
    return $(SELECTORS.ADD_FOLDER_BUTTON);
  }

  get buttonNav() {
    return $(SELECTORS.BUTTON_NAV);
  }

  get chatSearchInput() {
    return $(SELECTORS.CHAT_SEARCH_INPUT);
  }

  get chatsButton() {
    return $(SELECTORS.CHATS_BUTTON);
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

  get filesButton() {
    return $(SELECTORS.FILES_BUTTON);
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

  get friendsButton() {
    return $(SELECTORS.FRIENDS_BUTTON);
  }

  get prereleaseIndicator() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR);
  }

  get prereleaseIndicatorText() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR_TEXT);
  }

  get settingsButton() {
    return $(SELECTORS.SETTINGS_BUTTON);
  }

  get sidebar() {
    return $(SELECTORS.SIDEBAR);
  }

  get sidebarChildren() {
    return $(SELECTORS.SIDEBAR_CHILDREN);
  }

  get sidebarSearch() {
    return $(SELECTORS.SIDEBAR_SEARCH);
  }

  get uploadFileButton() {
    return $(SELECTORS.UPLOAD_FILE_BUTTON);
  }

  get window() {
    return $(SELECTORS.WINDOW);
  }
}

export default new FilesScreen();
