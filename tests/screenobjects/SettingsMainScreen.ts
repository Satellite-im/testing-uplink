import AppScreen from "./AppScreen"

const SELECTORS = {
  BUTTON_NAV: "~button-nav",
  CHATS_BUTTON: "~chats-button",
  FILES_BUTTON: "~files-button",
  FRIENDS_BUTTON: "~friends-button",
  PRE_RELEASE_INDICATOR: "~pre-release",
  PRE_RELEASE_INDICATOR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText[`value == \"Pre-release\"`]",
  SETTINGS_BUTTON: "~settings-button",
  SETTINGS_LAYOUT: "~settings-layout",
  SIDEBAR: "~sidebar",
  SIDEBAR_CHILDREN: "~sidebar-children",
  SIDEBAR_SEARCH: "~sidebar-search",
  WINDOW: "-ios class chain:**/XCUIElementTypeWebView",
}

class SettingsScreen extends AppScreen {
  constructor() {
    super(SELECTORS.SETTINGS_LAYOUT)
  }

  get buttonNav() {
    return $(SELECTORS.BUTTON_NAV)
  }

  get chatsButton() {
    return $(SELECTORS.CHATS_BUTTON)
  }

  get filesButton() {
    return $(SELECTORS.FILES_BUTTON)
  }

  get friendsButton() {
    return $(SELECTORS.FRIENDS_BUTTON)
  }

  get prereleaseIndicator() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR)
  }

  get prereleaseIndicatorText() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR_TEXT)
  }

  get settingsButton() {
    return $(SELECTORS.SETTINGS_BUTTON)
  }

  get settingsLayout() {
    return $(SELECTORS.SETTINGS_LAYOUT)
  }

  get sidebar() {
    return $(SELECTORS.SIDEBAR)
  }

  get sidebarChildren() {
    return $(SELECTORS.SIDEBAR_CHILDREN)
  }

  get sidebarSearch() {
    return $(SELECTORS.SIDEBAR_SEARCH)
  }

  get window() {
    return $(SELECTORS.WINDOW)
  }
}

export default new SettingsScreen()
