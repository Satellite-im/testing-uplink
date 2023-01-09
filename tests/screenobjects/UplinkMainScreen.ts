import AppScreen from "./AppScreen"

const SELECTORS = {
  ADD_FRIENDS_BUTTON: "~add-friends-button",
  BUTTON_NAV: "~button-nav",
  CHAT_SEARCH_INPUT: "~chat-search-input",
  CHATS_BUTTON: "~chats-button",
  FILES_BUTTON: "~files-button",
  FRIENDS_BUTTON: "~friends-button",
  PRE_RELEASE_INDICATOR: "~pre-release",
  PRE_RELEASE_INDICATOR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText[`value == \"Pre-release\"`]",
  SETTINGS_BUTTON: "~settings-button",
  SIDEBAR: "~sidebar",
  SIDEBAR_CHILDREN: "~sidebar-children",
  SIDEBAR_SEARCH: "~sidebar-search",
  SKELETAL_USER: "~skeletal-user",
  WELCOME_SCREEN: "~welcome-screen",
  WINDOW: "-ios class chain:**/XCUIElementTypeWebView",
}

class UplinkMainScreen extends AppScreen {
  constructor() {
    super(SELECTORS.WELCOME_SCREEN)
  }

  get addFriendsButton() {
    return $(SELECTORS.ADD_FRIENDS_BUTTON)
  }

  get buttonNav() {
    return $(SELECTORS.BUTTON_NAV)
  }

  get chatSearchInput() {
    return $(SELECTORS.CHAT_SEARCH_INPUT)
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

  get sidebar() {
    return $(SELECTORS.SIDEBAR)
  }

  get sidebarChildren() {
    return $(SELECTORS.SIDEBAR_CHILDREN)
  }

  get sidebarSearch() {
    return $(SELECTORS.SIDEBAR_SEARCH)
  }

  get skeletalUser() {
    return $$(SELECTORS.SKELETAL_USER)
  }

  get welcomeScreen() {
    return $(SELECTORS.WELCOME_SCREEN)
  }

  get window() {
    return $(SELECTORS.WINDOW)
  }
}

export default new UplinkMainScreen()
