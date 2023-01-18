import AppScreen from "./AppScreen";

const SELECTORS = {
  BUTTON_BADGE: "~Button Badge",
  BUTTON_NAV: "~button-nav",
  CHAT_LAYOUT: "~chat-layout",
  CHAT_MESSAGE: "~Message",
  CHAT_SEARCH_INPUT: "~chat-search-input",
  CHATS_BUTTON: "~chats-button",
  FILES_BUTTON: "~files-button",
  FRIENDS_BUTTON: "~friends-button",
  PRE_RELEASE_INDICATOR: "~pre-release",
  PRE_RELEASE_INDICATOR_TEXT:
    '-ios class chain:**/XCUIElementTypeStaticText[`value == "Pre-release"`]',
  SETTINGS_BUTTON: "~settings-button",
  SIDEBAR: "~sidebar",
  SIDEBAR_CHATS_SECTION: "~Chats",
  SIDEBAR_CHATS_USER: "~User",
  SIDEBAR_CHATS_USER_IMAGE: "~User Image",
  SIDEBAR_CHATS_USER_INFO: "~User Info",
  SIDEBAR_CHATS_USER_NAME: "~Username",
  SIDEBAR_CHATS_USER_STATUS: "~User Status",
  SIDEBAR_CHILDREN: "~sidebar-children",
  SIDEBAR_SEARCH: "~sidebar-search",
  SKELETAL_USER: "~skeletal-user",
  TOAST_NOTIFICATION: "~Toast Notification",
  TOPBAR: "~Topbar",
  TOPBAR_ADD_TO_FAVORITES: "~Add to Favorites",
  TOPBAR_CALL: "~Call",
  TOPBAR_USER_IMAGE: "~User Image",
  TOPBAR_VIDEOCALL: "~Videocall",
  WINDOW: "-ios class chain:**/XCUIElementTypeWebView",
};

class ChatScreen extends AppScreen {
  constructor() {
    super(SELECTORS.CHAT_LAYOUT);
  }

  get buttonBadge() {
    return $(SELECTORS.BUTTON_BADGE);
  }

  get buttonNav() {
    return $(SELECTORS.BUTTON_NAV);
  }

  get chatLayout() {
    return $(SELECTORS.CHAT_LAYOUT);
  }

  get chatMessage() {
    return $(SELECTORS.CHAT_LAYOUT).$$(SELECTORS.CHAT_MESSAGE);
  }

  get chatSearchInput() {
    return $(SELECTORS.CHAT_SEARCH_INPUT);
  }

  get chatsButton() {
    return $(SELECTORS.CHATS_BUTTON);
  }

  get filesButton() {
    return $(SELECTORS.FILES_BUTTON);
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

  get sidebarChatsSection() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION);
  }

  get sidebarChatsUser() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION).$$(SELECTORS.SIDEBAR_CHATS_USER);
  }

  get sidebarChatsUserImage() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION).$(SELECTORS.SIDEBAR_CHATS_USER).$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE);
  }

  get sidebarChatsUserInfo() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION).$(SELECTORS.SIDEBAR_CHATS_USER).$$(SELECTORS.SIDEBAR_CHATS_USER_INFO);
  }

  get sidebarChatsUserName() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION).$(SELECTORS.SIDEBAR_CHATS_USER).$$(SELECTORS.SIDEBAR_CHATS_USER_INFO).$(SELECTORS.SIDEBAR_CHATS_USER_NAME);
  }

  get sidebarChatsUserStatus() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION).$(SELECTORS.SIDEBAR_CHATS_USER).$$(SELECTORS.SIDEBAR_CHATS_USER_INFO).$(SELECTORS.SIDEBAR_CHATS_USER_STATUS);
  }

  get sidebarChildren() {
    return $$(SELECTORS.SIDEBAR_CHILDREN);
  }

  get sidebarSearch() {
    return $(SELECTORS.SIDEBAR_SEARCH);
  }

  get skeletalUser() {
    return $$(SELECTORS.SKELETAL_USER);
  }

  get toastNotifications() {
    return $$(SELECTORS.TOAST_NOTIFICATION);
  }

  get topbar() {
    return $(SELECTORS.TOPBAR);
  }

  get topbarAddToFavorites() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_ADD_TO_FAVORITES);
  }

  get topbarCall() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_CALL);
  }

  get topbarUserImage() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_IMAGE);
  }

  get topbarVideocall() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_VIDEOCALL);
  }

  get welcomeScreen() {
    return $(SELECTORS.WELCOME_SCREEN);
  }

  get window() {
    return $(SELECTORS.WINDOW);
  }

  async goToFiles() {
    await (await this.filesButton).click();
  }

  async goToFriends() {
    await (await this.friendsButton).click();
  }

  async goToSettings() {
    await (await this.settingsButton).click();
  }

  async validateTextFromButtonBadge(expectedText: string) {
    const buttonBadge = await driver.findElement('accessibility id', 'Button Badge')
    const badgeText = await driver.findElementFromElement(buttonBadge.ELEMENT, '-ios class chain', '*')
    await expect($(badgeText)).toHaveTextContaining(expectedText)
  }
}

export default new ChatScreen();
