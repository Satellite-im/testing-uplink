import { hoverOnMacOS, hoverOnWindows } from "../helpers/commands";
import AppScreen from "./AppScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  PRE_RELEASE_INDICATOR: "~pre-release",
  SIDEBAR_CHATS_SECTION: "~Chats",
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
  CREATE_GROUP_CHAT_CREATE_DM_BUTTON: '[name="create-dm-button"]',
  CREATE_GROUP_CHAT_FRIEND_CONTAINER: '[name="Friend Container"]',
  CREATE_GROUP_CHAT_SECTION: '[name="Create Group"]',
  CREATE_GROUP_CHAT_USER_IMAGE: '[name="User Image"]',
  CREATE_GROUP_CHAT_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  CREATE_GROUP_CHAT_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  CREATE_GROUP_CHAT_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  CREATE_GROUP_CHAT_USER_NAME: '[name="friend-name"]',
  CREATE_GROUP_CHAT_USER_NAME_TEXT: "//Text",
  FAVORITES: '[name="Favorites"]',
  FAVORITES_HEADER: "//Text/Text",
  FAVORITES_USER: "//Group",
  FAVORITES_USER_IMAGE: '[name="User Image"]',
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
  SIDEBAR_CHATS_HEADER: "//Text/Text",
  SIDEBAR_CHATS_USER: '[name="User"]',
  SIDEBAR_CHATS_USER_IMAGE: '[name="User Image"]',
  SIDEBAR_CHATS_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  SIDEBAR_CHATS_USER_INFO: '[name="User Info"]',
  SIDEBAR_CHATS_USER_NAME: '[name="Username"]',
  SIDEBAR_CHATS_USER_NAME_VALUE: "//Text",
  SIDEBAR_CHATS_USER_OFFLINE_INDICATOR: '[name="indicator-offline"]',
  SIDEBAR_CHATS_USER_ONLINE_INDICATOR: '[name="indicator-online"]',
  SIDEBAR_CHATS_USER_STATUS: '[name="User Status"]',
  SIDEBAR_CHATS_USER_STATUS_VALUE: "//Text",
  SIDEBAR_CHILDREN: '[name="sidebar-children"]',
  SIDEBAR_CREATE_GROUP_CHAT_BUTTON: '[name="create-group-chat"]',
  SIDEBAR_GROUP_CHAT_IMAGE: '[name="user-image-group-wrap"]',
  SIDEBAR_GROUP_CHAT_PLUS_SOME: '[name="plus-some"]',
  SIDEBAR_SEARCH: '[name="sidebar-search"]',
  SKELETAL_USER: '[name="skeletal-user"]',
  TOAST_NOTIFICATION: '[name="Toast Notification"]',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  UPDATE_AVAILABLE: '[name="update-available"]',
  UPDATE_AVAILABLE_TEXT: "//Text",
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
  CREATE_GROUP_CHAT_CREATE_DM_BUTTON: "~create-dm-button",
  CREATE_GROUP_CHAT_FRIEND_CONTAINER: "~Friend Container",
  CREATE_GROUP_CHAT_SECTION: "~Create Group",
  CREATE_GROUP_CHAT_USER_IMAGE: "~User Image",
  CREATE_GROUP_CHAT_USER_IMAGE_WRAP: "~user-image-wrap",
  CREATE_GROUP_CHAT_USER_INDICATOR_OFFLINE: "~indicator-offline",
  CREATE_GROUP_CHAT_USER_INDICATOR_ONLINE: "~indicator-online",
  CREATE_GROUP_CHAT_USER_NAME: "~friend-name",
  CREATE_GROUP_CHAT_USER_NAME_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  FAVORITES: "~Favorites",
  FAVORITES_HEADER:
    "-ios class chain:**/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
  FAVORITES_USER: "-ios class chain:**/XCUIElementTypeGroup",
  FAVORITES_USER_IMAGE_WRAP: "~user-image-wrap",
  FAVORITES_USER_IMAGE: "~User Image",
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
  SIDEBAR_CHATS_HEADER:
    "-ios class chain:**/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
  SIDEBAR_CHATS_USER: "~User",
  SIDEBAR_CHATS_USER_IMAGE: "~User Image",
  SIDEBAR_CHATS_USER_IMAGE_WRAP: "~user-image-wrap",
  SIDEBAR_CHATS_USER_INFO: "~User Info",
  SIDEBAR_CHATS_USER_NAME: "~Username",
  SIDEBAR_CHATS_USER_NAME_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  SIDEBAR_CHATS_USER_OFFLINE_INDICATOR: "~indicator-offline",
  SIDEBAR_CHATS_USER_ONLINE_INDICATOR: "~indicator-online",
  SIDEBAR_CHATS_USER_STATUS: "~User Status",
  SIDEBAR_CHATS_USER_STATUS_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  SIDEBAR_CHILDREN: "~sidebar-children",
  SIDEBAR_CREATE_GROUP_CHAT_BUTTON: "~create-group-chat",
  SIDEBAR_GROUP_CHAT_IMAGE: "~user-image-group-wrap",
  SIDEBAR_GROUP_CHAT_PLUS_SOME: "~plus-some",
  SIDEBAR_SEARCH: "~sidebar-search",
  SKELETAL_USER: "~skeletal-user",
  TOAST_NOTIFICATION: "~Toast Notification",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  UPDATE_AVAILABLE: "~update-available",
  UPDATE_AVAILABLE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  WINDOW: "-ios class chain:**/XCUIElementTypeWindow",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class UplinkMainScreen extends AppScreen {
  constructor() {
    super(SELECTORS.WINDOW);
  }

  get backButton() {
    return $(SELECTORS.BACK_BUTTON);
  }

  get buttonBadge() {
    return $(SELECTORS.BUTTON_BADGE);
  }

  get buttonBadgeText() {
    return $(SELECTORS.BUTTON_BADGE).$(SELECTORS.BUTTON_BADGE_TEXT);
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

  get chatsButtonTooltip() {
    return $(SELECTORS.BUTTON_NAV).$(SELECTORS.TOOLTIP);
  }

  get chatsButtonTooltipText() {
    return $(SELECTORS.BUTTON_NAV)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.BUTTON_NAV_TOOLTIP_TEXT);
  }

  get createGroupChatSection() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION);
  }

  get createGroupChatCreateDMButton() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION).$(
      SELECTORS.CREATE_GROUP_CHAT_CREATE_DM_BUTTON
    );
  }

  get createGroupChatSearchInput() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION).$(
      SELECTORS.CHAT_SEARCH_INPUT
    );
  }

  get createGroupChatFriendContainer() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION).$(
      SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER
    );
  }

  get createGroupChatUserImage() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_IMAGE);
  }

  get createGroupChatUserImageWrap() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_IMAGE_WRAP);
  }

  get createGroupChatUserIndicatorOffline() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_INDICATOR_OFFLINE);
  }

  get createGroupChatUserIndicatorOnline() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_INDICATOR_ONLINE);
  }

  get createGroupChatUserName() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_NAME);
  }

  get createGroupChatUserNameText() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_NAME)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_NAME_TEXT);
  }

  get favorites() {
    return $(SELECTORS.SIDEBAR).$(SELECTORS.FAVORITES);
  }

  get favoritesHeader() {
    return $(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$(SELECTORS.FAVORITES_HEADER);
  }

  get favoriteUsers() {
    return $(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER);
  }

  get favoritesUserImage() {
    return $(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE);
  }

  get favoritesUserImageWrap() {
    return $(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE_WRAP);
  }

  get favoritesUserIndicatorOffline() {
    return $(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$(SELECTORS.FAVORITES_USER_INDICATOR_OFFLINE);
  }

  get favoritesUserIndicatorOnline() {
    return $(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$(SELECTORS.FAVORITES_USER_INDICATOR_ONLINE);
  }

  get favoritesUserName() {
    return $(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$(SELECTORS.FAVORITES_USER_NAME);
  }

  get filesButton() {
    return $(SELECTORS.FILES_BUTTON);
  }

  get filesButtonTooltip() {
    return $(SELECTORS.BUTTON_NAV).$(SELECTORS.TOOLTIP);
  }

  get filesButtonTooltipText() {
    return $(SELECTORS.BUTTON_NAV)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.BUTTON_NAV_TOOLTIP_TEXT);
  }

  get friendsButton() {
    return $(SELECTORS.FRIENDS_BUTTON);
  }

  get friendsButtonTooltip() {
    return $(SELECTORS.BUTTON_NAV).$(SELECTORS.TOOLTIP);
  }

  get friendsButtonTooltipText() {
    return $(SELECTORS.BUTTON_NAV)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.BUTTON_NAV_TOOLTIP_TEXT);
  }

  get hamburgerButton() {
    return $(SELECTORS.HAMBURGER_BUTTON);
  }

  get prereleaseIndicator() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR);
  }

  get prereleaseIndicatorText() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR).$(
      SELECTORS.PRE_RELEASE_INDICATOR_TEXT
    );
  }

  get settingsButton() {
    return $(SELECTORS.SETTINGS_BUTTON);
  }

  get settingsButtonTooltip() {
    return $(SELECTORS.BUTTON_NAV).$(SELECTORS.TOOLTIP);
  }

  get settingsButtonTooltipText() {
    return $(SELECTORS.BUTTON_NAV)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.BUTTON_NAV_TOOLTIP_TEXT);
  }

  get sidebar() {
    return $(SELECTORS.SIDEBAR);
  }

  get siderbarChatsHeader() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION).$(
      SELECTORS.SIDERBAR_CHATS_HEADER
    );
  }

  get sidebarChatsSection() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION);
  }

  get sidebarChatsUser() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION).$$(SELECTORS.SIDEBAR_CHATS_USER);
  }

  get sidebarChatsUserImage() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE);
  }

  get sidebarChatsUserImageWrap() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP);
  }

  get sidebarChatsUserInfo() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_INFO);
  }

  get sidebarChatsUserName() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_NAME);
  }
  get sidebarChatsUserNameValue() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_NAME)
      .$(SELECTORS.SIDEBAR_CHATS_USER_NAME_VALUE);
  }

  get sidebarChatsUserOfflineIndicator() {
    return $$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_OFFLINE_INDICATOR);
  }

  get sidebarChatsUserOnlineIndicator() {
    return $$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_ONLINE_INDICATOR);
  }

  get sidebarChatsUserStatus() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS);
  }

  get sidebarChatsUserStatusValue() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS_VALUE);
  }

  get sidebarChildren() {
    return $(SELECTORS.SIDEBAR_CHILDREN);
  }

  get sidebarCreateGroupChat() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION).$(
      SELECTORS.SIDEBAR_CREATE_GROUP_CHAT_BUTTON
    );
  }

  get sidebarCreateGroupChatTooltip() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION).$(SELECTORS.TOOLTIP);
  }

  get sidebarCreateGroupChatTooltipText() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get sidebarGroupChatImage() {
    return $(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE);
  }

  get sidebarGroupChatPlusSome() {
    return $(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE).$(
      SELECTORS.SIDEBAR_GROUP_CHAT_PLUS_SOME
    );
  }

  get sidebarGroupChatUserImages() {
    return $(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE);
  }

  get sidebarGroupChatUserImageWraps() {
    return $(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE).$$(
      SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP
    );
  }

  get sidebarGroupChatUserIndicatorOffline() {
    return $(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_OFFLINE_INDICATOR);
  }

  get sidebarGroupChatsUserIndicatorOnline() {
    return $(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_ONLINE_INDICATOR);
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

  get updateAvailable() {
    return $(SELECTORS.UPDATE_AVAILABLE);
  }

  get updateAvailableText() {
    return $(SELECTORS.UPDATE_AVAILABLE).$(SELECTORS.UPDATE_AVAILABLE_TEXT);
  }

  get window() {
    return $(SELECTORS.WINDOW);
  }

  // Clicking on common elements methods

  async clickOnBackButton() {
    (await this.backButton).click();
  }

  async clickOnHamburgerButton() {
    (await this.hamburgerButton).click();
  }

  async clickOnPreReleaseIndicator() {
    (await this.prereleaseIndicator).click();
  }

  async clickOnUpdateAvailable() {
    (await this.updateAvailable).click();
  }

  // Toast Notifications methods

  async closeToastNotification(title: string) {
    const toast = await driver.findElement(
      "xpath",
      "//*[@label='Toast Notification']//*[@value='" + title + "']/.."
    );
    const closeButton = await driver.findElementFromElement(
      toast.ELEMENT,
      "-ios class chain",
      "XCUIElementTypeButton"
    );
    await (await $(closeButton)).click();
  }

  async validateContentsToastNotification(
    title: string,
    expectedSubtitle: string
  ) {
    const toast = await driver.findElement(
      "xpath",
      "//*[@label='Toast Notification']//*[@value='" + title + "']/.."
    );
    const toastSubtitle = await driver.findElementFromElement(
      toast.ELEMENT,
      "-ios class chain",
      "**/XCUIElementTypeGroup/XCUIElementTypeStaticText"
    );
    const toastTitle = await driver.findElementFromElement(
      toast.ELEMENT,
      "-ios class chain",
      "**/XCUIElementTypeStaticText"
    );
    await expect(await $(toastSubtitle)).toHaveTextContaining(expectedSubtitle);
    await expect(await $(toastTitle)).toHaveTextContaining(title);
  }

  // Favorites methods

  async getUsersFromFavorites() {
    const favoriteUsers = await this.favoritesUserName;
    let currentFavoriteUsers = [];
    for (let name of favoriteUsers) {
      currentFavoriteUsers.push(await (await $(name)).getText());
    }
    return currentFavoriteUsers;
  }

  // NavBar methods

  async goToFiles() {
    await (await this.filesButton).click();
  }

  async goToFriends() {
    await (await this.friendsButton).click();
  }

  async goToMainScreen() {
    await (await this.chatsButton).click();
  }

  async goToSettings() {
    await (await this.settingsButton).click();
  }

  // Button Badges methods

  async validateTextFromButtonBadge(expectedText: string) {
    const badgeText = await $('//*[@label="Button Badge"]/*[1]');
    await expect($(badgeText)).toHaveTextContaining(expectedText);
  }

  // Hovering methods

  async hoverOnElement(element: WebdriverIO.Element) {
    if ((await this.getCurrentDriver()) === "mac2") {
      await hoverOnMacOS(element);
    } else if ((await this.getCurrentDriver()) === "windows") {
      await hoverOnWindows(element);
    }
  }

  async hoverOnChatsButton() {
    await this.hoverOnElement(await this.chatsButton);
  }

  async hoverOnFilesButton() {
    await this.hoverOnElement(await this.filesButton);
  }

  async hoverOnFriendsButton() {
    await this.hoverOnElement(await this.friendsButton);
  }

  async hoverOnSettingsButton() {
    await this.hoverOnElement(await this.settingsButton);
  }
}
