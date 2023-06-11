import AppScreen from "./AppScreen.ts";
import { hoverOnMacOS, hoverOnWindows } from "../helpers/commands";

const currentOS = driver["userA"].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  PRE_RELEASE_INDICATOR: "~pre-release",
};

const SELECTORS_WINDOWS = {
  BACK_BUTTON: '[name="back-button"]',
  BUTTON_BADGE: '[name="Button Badge"]',
  BUTTON_BADGE_TEXT: "//Text",
  BUTTON_NAV: '[name="button-nav"]',
  BUTTON_NAV_TOOLTIP: '[name="tooltip"]',
  BUTTON_NAV_TOOLTIP_TEXT: "//Text",
  CHAT_SEARCH_INPUT: '[name="chat-search-input"]',
  CHATS_BUTTON: '[name="chats-button"]',
  FAVORITES: '[name="Favorites"]',
  FAVORITES_CONTEXT_CHAT: '[name="favorites-chat"]',
  FAVORITES_CONTEXT_REMOVE: '[name="favorites-remove"]',
  FAVORITES_HEADER: '[name="favorites-label"]',
  FAVORITES_HEADER_TEXT: "//Text",
  FAVORITES_USER: "//Group",
  FAVORITES_USER_IMAGE: '[name="User Image"]',
  FAVORITES_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  FAVORITES_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  FAVORITES_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  FAVORITES_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  FAVORITES_USER_NAME: "//Text[2]/Text",
  FILES_BUTTON: '[name="files-button"]',
  FRIENDS_BUTTON: '[name="friends-button"]',
  HAMBURGER_BUTTON: '[name="hamburger-button"]',
  PRE_RELEASE_INDICATOR_TEXT: "//Text",
  SETTINGS_BUTTON: '[name="settings-button"]',
  SIDEBAR: '[name="sidebar"]',
  SIDEBAR_CHATS_SECTION: "~chats",
  SIDEBAR_CHILDREN: '[name="sidebar-children"]',
  SIDEBAR_SEARCH: '[name="sidebar-search"]',
  SKELETAL_USER: '[name="skeletal-user"]',
  TOAST_NOTIFICATION: '[name="Toast Notification"]',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  UPDATE_AVAILABLE: '[name="update-available"]',
  UPDATE_AVAILABLE_TEXT: "//Text",
  UPDATE_MENU_DISMISS: '[name="update-menu-dismiss"]',
  UPDATE_MENU_DOWNLOAD: '[name="update-menu-download"]',
  WINDOW: "~main",
};

const SELECTORS_MACOS = {
  BACK_BUTTON: "~back-button",
  BUTTON_BADGE: "~Button Badge",
  BUTTON_BADGE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  BUTTON_NAV: "~button-nav",
  BUTTON_NAV_TOOLTIP: "~tooltip",
  BUTTON_NAV_TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  CHAT_SEARCH_INPUT: "~chat-search-input",
  CHATS_BUTTON: "~chats-button",
  FAVORITES: "~Favorites",
  FAVORITES_CONTEXT_CHAT: "~favorites-chat",
  FAVORITES_CONTEXT_REMOVE: "~favorites-remove",
  FAVORITES_HEADER: "~favorites-label",
  FAVORITES_HEADER_TEXT: "-ios class chain:**/XXCUIElementTypeStaticText",
  FAVORITES_USER: "-ios class chain:**/XCUIElementTypeGroup",
  FAVORITES_USER_IMAGE: "~User Image",
  FAVORITES_USER_IMAGE_PROFILE: "~user-image-profile",
  FAVORITES_USER_IMAGE_WRAP: "~user-image-wrap",
  FAVORITES_USER_INDICATOR_OFFLINE: "~indicator-offline",
  FAVORITES_USER_INDICATOR_ONLINE: "~indicator-online",
  FAVORITES_USER_NAME:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
  FILES_BUTTON: "~files-button",
  FRIENDS_BUTTON: "~friends-button",
  HAMBURGER_BUTTON: "~hamburger-button",
  PRE_RELEASE_INDICATOR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  SETTINGS_BUTTON: "~settings-button",
  SIDEBAR: "~sidebar",
  SIDEBAR_CHATS_SECTION: "~Chats",
  SIDEBAR_CHILDREN: "~sidebar-children",
  SIDEBAR_SEARCH: "~sidebar-search",
  SKELETAL_USER: "~skeletal-user",
  TOAST_NOTIFICATION: "~Toast Notification",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  UPDATE_AVAILABLE: "~update-available",
  UPDATE_AVAILABLE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  UPDATE_MENU_DISMISS: "~update-menu-dismiss",
  UPDATE_MENU_DOWNLOAD: "~update-menu-download",
  WINDOW: "-ios class chain:**/XCUIElementTypeWindow",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class UplinkMainScreen extends AppScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.WINDOW);
  }

  get backButton() {
    return this.instance.$(SELECTORS.BACK_BUTTON);
  }

  get buttonBadge() {
    return this.instance.$(SELECTORS.BUTTON_BADGE);
  }

  get buttonBadgeText() {
    return this.instance
      .$(SELECTORS.BUTTON_BADGE)
      .$(SELECTORS.BUTTON_BADGE_TEXT);
  }

  get buttonNav() {
    return this.instance.$(SELECTORS.BUTTON_NAV);
  }

  get chatSearchInput() {
    return this.instance.$(SELECTORS.CHAT_SEARCH_INPUT);
  }

  get chatsButton() {
    return this.instance.$(SELECTORS.CHATS_BUTTON);
  }

  get chatsButtonTooltip() {
    return this.instance.$(SELECTORS.TOOLTIP);
  }

  get chatsButtonTooltipText() {
    return this.instance
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.BUTTON_NAV_TOOLTIP_TEXT);
  }

  get favorites() {
    return this.instance.$(SELECTORS.SIDEBAR).$(SELECTORS.FAVORITES);
  }

  get favoritesChat() {
    return this.instance.$(SELECTORS.FAVORITES_CONTEXT_CHAT);
  }

  get favoritesRemove() {
    return this.instance.$(SELECTORS.FAVORITES_CONTEXT_REMOVE);
  }

  get favoritesHeader() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$(SELECTORS.FAVORITES_HEADER);
  }

  get favoritesHeaderText() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$(SELECTORS.FAVORITES_HEADER)
      .$(SELECTORS.FAVORITES_HEADER_TEXT);
  }

  get favoriteUsers() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER);
  }

  get favoritesUserImage() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE);
  }

  get favoritesUserImageProfile() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE_PROFILE);
  }

  get favoritesUserImageWrap() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE_WRAP);
  }

  get favoritesUserIndicatorOffline() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$(SELECTORS.FAVORITES_USER_INDICATOR_OFFLINE);
  }

  get favoritesUserIndicatorOnline() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$(SELECTORS.FAVORITES_USER_INDICATOR_ONLINE);
  }

  get favoritesUserName() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$(SELECTORS.FAVORITES_USER_NAME);
  }

  get filesButton() {
    return this.instance.$(SELECTORS.FILES_BUTTON);
  }

  get filesButtonTooltip() {
    return this.instance.$(SELECTORS.TOOLTIP);
  }

  get filesButtonTooltipText() {
    return this.instance
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.BUTTON_NAV_TOOLTIP_TEXT);
  }

  get friendsButton() {
    return this.instance.$(SELECTORS.FRIENDS_BUTTON);
  }

  get friendsButtonTooltip() {
    return this.instance.$(SELECTORS.TOOLTIP);
  }

  get friendsButtonTooltipText() {
    return this.instance
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.BUTTON_NAV_TOOLTIP_TEXT);
  }

  get hamburgerButton() {
    return this.instance.$(SELECTORS.HAMBURGER_BUTTON);
  }

  get prereleaseIndicator() {
    return this.instance.$(SELECTORS.PRE_RELEASE_INDICATOR);
  }

  get prereleaseIndicatorText() {
    return this.instance
      .$(SELECTORS.PRE_RELEASE_INDICATOR)
      .$(SELECTORS.PRE_RELEASE_INDICATOR_TEXT);
  }

  get settingsButton() {
    return this.instance.$(SELECTORS.SETTINGS_BUTTON);
  }

  get settingsButtonTooltip() {
    return this.instance.$(SELECTORS.TOOLTIP);
  }

  get settingsButtonTooltipText() {
    return this.instance
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.BUTTON_NAV_TOOLTIP_TEXT);
  }

  get sidebar() {
    return this.instance.$(SELECTORS.SIDEBAR);
  }

  get sidebarChildren() {
    return this.instance.$(SELECTORS.SIDEBAR_CHILDREN);
  }

  get sidebarSearch() {
    return this.instance.$(SELECTORS.SIDEBAR_SEARCH);
  }

  get skeletalUser() {
    return this.instance.$$(SELECTORS.SKELETAL_USER);
  }

  get toastNotifications() {
    return this.instance.$$(SELECTORS.TOAST_NOTIFICATION);
  }

  get updateAvailable() {
    return this.instance.$(SELECTORS.UPDATE_AVAILABLE);
  }

  get updateAvailableText() {
    return this.instance
      .$(SELECTORS.UPDATE_AVAILABLE)
      .$(SELECTORS.UPDATE_AVAILABLE_TEXT);
  }

  get updateMenuDismiss() {
    return this.instance.$(SELECTORS.UPDATE_MENU_DISMISS);
  }

  get updateMenuDownload() {
    return this.instance.$(SELECTORS.UPDATE_MENU_DOWNLOAD);
  }

  get window() {
    return this.instance.$(SELECTORS.WINDOW);
  }

  // Clicking on common elements methods

  async clickOnBackButton() {
    await this.backButton.click();
  }

  async clickOnHamburgerButton() {
    await this.hamburgerButton.click();
  }

  async clickOnPreReleaseIndicator() {
    await this.prereleaseIndicator.click();
  }

  async clickOnUpdateAvailable() {
    await this.updateAvailable.click();
  }

  // Favorites methods

  async getUsersFromFavorites() {
    const favoriteUsers = await this.favoritesUserName;
    let currentFavoriteUsers = [];
    for (let name of favoriteUsers) {
      currentFavoriteUsers.push(await this.instance.$(name).getText());
    }
    return currentFavoriteUsers;
  }

  // NavBar methods

  async goToFiles() {
    await this.filesButton.click();
  }

  async goToFriends() {
    await this.friendsButton.click();
  }

  async goToMainScreen() {
    await this.chatsButton.click();
  }

  async goToSettings() {
    await this.settingsButton.click();
  }

  // Button Badges methods

  async validateTextFromButtonBadge(expectedText: string) {
    const badgeText = await this.instance.$('//*[@label="Button Badge"]/*[1]');
    await expect($(badgeText)).toHaveTextContaining(expectedText);
  }

  // Hovering methods

  async hoverOnElement(element: WebdriverIO.Element) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await hoverOnMacOS(element, this.executor);
    } else if (currentDriver === "windows") {
      await hoverOnWindows(element, this.executor);
    }
  }

  async hoverOnChatsButton() {
    const element = await this.chatsButton;
    await this.hoverOnElement(element);
  }

  async hoverOnFilesButton() {
    const element = await this.filesButton;
    await this.hoverOnElement(element);
  }

  async hoverOnFriendsButton() {
    const element = await this.friendsButton;
    await this.hoverOnElement(element);
  }

  async hoverOnSettingsButton() {
    const element = await this.settingsButton;
    await this.hoverOnElement(element);
  }

  // Multiremote functions
  async switchToOtherUserWindow() {
    await this.instance.pause(1000);
  }

  async showUplinkWindow() {
    await this.instance.window.click();
    await this.instance.window.waitForIsShown(true);
  }
}
