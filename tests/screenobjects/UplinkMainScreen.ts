import AppScreen from "./AppScreen";

const SELECTORS = {
  BUTTON_BADGE: "~Button Badge",
  BUTTON_NAV: "~button-nav",
  CHAT_SEARCH_INPUT: "~chat-search-input",
  CHATS_BUTTON: "~chats-button",
  FILES_BUTTON: "~files-button",
  FRIENDS_BUTTON: "~friends-button",
  PRE_RELEASE_INDICATOR: "~pre-release",
  PRE_RELEASE_INDICATOR_TEXT:
    '-ios class chain:**/XCUIElementTypeStaticText[`value == "Pre-release"`]',
  SETTINGS_BUTTON: "~settings-button",
  SIDEBAR: "~sidebar",
  SIDEBAR_CHILDREN: "~sidebar-children",
  SIDEBAR_SEARCH: "~sidebar-search",
  SKELETAL_USER: "~skeletal-user",
  TOAST_NOTIFICATION: "~Toast Notification",
  WINDOW: "-ios class chain:**/XCUIElementTypeWebView",
};

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
    const buttonBadge = await driver.findElement(
      "accessibility id",
      "Button Badge"
    );
    const badgeText = await driver.findElementFromElement(
      buttonBadge.ELEMENT,
      "-ios class chain",
      "*"
    );
    await expect($(badgeText)).toHaveTextContaining(expectedText);
  }
}