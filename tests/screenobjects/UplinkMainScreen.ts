import AppScreen from "./AppScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  PRE_RELEASE_INDICATOR: "~pre-release",
  TOAST_NOTIFICATION: "~Toast Notification",
};

const SELECTORS_WINDOWS = {
  BUTTON_BADGE: '[name="Button Badge"]',
  BUTTON_NAV: '[name="button-nav"]',
  CHAT_SEARCH_INPUT: '[name="chat-search-input"]',
  CHATS_BUTTON: '[name="chat-button"]',
  FILES_BUTTON: '[name="files-button"]',
  FRIENDS_BUTTON: '[name="friends-button"]',
  PRE_RELEASE_INDICATOR_TEXT: "//*[2]",
  SETTINGS_BUTTON: '[name=settings-button"]',
  SIDEBAR: '[name="sidebar"]',
  SIDEBAR_CHILDREN: "~chats",
  SIDEBAR_SEARCH: '[name="sidebar-search"]',
  SKELETAL_USER: '[name="skeletal-user"]',
  WINDOW: "~main",
};

const SELECTORS_MACOS = {
  BUTTON_BADGE: "~Button Badge",
  BUTTON_NAV: "~button-nav",
  CHAT_SEARCH_INPUT: "~chat-search-input",
  CHATS_BUTTON: "~chats-button",
  FILES_BUTTON: "~files-button",
  FRIENDS_BUTTON: "~friends-button",
  PRE_RELEASE_INDICATOR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  SETTINGS_BUTTON: "~settings-button",
  SIDEBAR: "~sidebar",
  SIDEBAR_CHILDREN: "~sidebar-children",
  SIDEBAR_SEARCH: "~sidebar-search",
  SKELETAL_USER: "~skeletal-user",
  WINDOW: "-ios class chain:**/XCUIElementTypeWindow",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class UplinkMainScreen extends AppScreen {
  constructor() {
    super(SELECTORS.WINDOW);
  }

  get buttonBadge() {
    return $(SELECTORS.BUTTON_BADGE);
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
    return $(SELECTORS.PRE_RELEASE_INDICATOR).$(
      SELECTORS.PRE_RELEASE_INDICATOR_TEXT
    );
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

  get skeletalUser() {
    return $$(SELECTORS.SKELETAL_USER);
  }

  get toastNotifications() {
    return $$(SELECTORS.TOAST_NOTIFICATION);
  }

  get window() {
    return $(SELECTORS.WINDOW);
  }

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

  async validateTextFromButtonBadge(expectedText: string) {
    const badgeText = await $('//*[@label="Button Badge"]/*[1]');
    await expect($(badgeText)).toHaveTextContaining(expectedText);
  }
}
