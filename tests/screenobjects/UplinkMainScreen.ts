import AppScreen from "./AppScreen";
import { hoverOnMacOS, hoverOnWindows } from "../helpers/commands";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "../helpers/constants";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
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
  CHATS_BUTTON: '[name="chats-button"]',
  CONTEXT_MENU: '[name="Context Menu"]',
  FILES_BUTTON: '[name="files-button"]',
  FRIENDS_BUTTON: '[name="friends-button"]',
  HAMBURGER_BUTTON: '[name="hamburger-button"]',
  PRE_RELEASE_INDICATOR_TEXT: "//Text",
  SETTINGS_BUTTON: '[name="settings-button"]',
  SKELETAL_USER: '[name="skeletal-user"]',
  TOAST_NOTIFICATION: '[name="Toast Notification"]',
  TOAST_NOTIFICATION_CLOSE: '[name="close-toast"]',
  TOAST_NOTIFICATION_TEXT: '[name="toast-content"]',
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
  CHATS_BUTTON: "~chats-button",
  CONTEXT_MENU: "~Context Menu",
  FILES_BUTTON: "~files-button",
  FRIENDS_BUTTON: "~friends-button",
  HAMBURGER_BUTTON: "~hamburger-button",
  PRE_RELEASE_INDICATOR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  SETTINGS_BUTTON: "~settings-button",
  SKELETAL_USER: "~skeletal-user",
  TOAST_NOTIFICATION: "~Toast Notification",
  TOAST_NOTIFICATION_CLOSE: "~close-toast",
  TOAST_NOTIFICATION_TEXT: "~toast-content",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  UPDATE_AVAILABLE: "~update-available",
  UPDATE_AVAILABLE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  UPDATE_MENU_DISMISS: "~update-menu-dismiss",
  UPDATE_MENU_DOWNLOAD: "~update-menu-download",
  WINDOW: "-ios class chain:**/XCUIElementTypeWindow",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class UplinkMainScreen extends AppScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.WINDOW);
  }

  get backButton() {
    return this.instance.$(SELECTORS.BACK_BUTTON);
  }

  get buttonNav() {
    return this.instance.$(SELECTORS.BUTTON_NAV);
  }

  get buttonNavBarButtonBadge() {
    return this.instance.$(SELECTORS.BUTTON_NAV).$(SELECTORS.BUTTON_BADGE);
  }

  get buttonNavBarButtonBadgeText() {
    return this.instance
      .$(SELECTORS.BUTTON_NAV)
      .$(SELECTORS.BUTTON_BADGE)
      .$(SELECTORS.BUTTON_BADGE_TEXT);
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

  get contextMenu() {
    return this.instance.$(SELECTORS.CONTEXT_MENU);
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

  get skeletalUser() {
    return this.instance.$$(SELECTORS.SKELETAL_USER);
  }

  get toastNotifications() {
    return this.instance.$$(SELECTORS.TOAST_NOTIFICATION);
  }

  get toastNotification() {
    return this.instance.$(SELECTORS.TOAST_NOTIFICATION);
  }

  get toastNotificationClose() {
    return this.instance
      .$(SELECTORS.TOAST_NOTIFICATION)
      .$(SELECTORS.TOAST_NOTIFICATION_CLOSE);
  }

  get toastNotificationText() {
    return this.instance
      .$(SELECTORS.TOAST_NOTIFICATION)
      .$(SELECTORS.TOAST_NOTIFICATION_TEXT);
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

  // Toast Notifications methods

  async closeToastNotification() {
    await this.toastNotificationClose.click();
  }

  async getToastNotificationText() {
    const toastText = await this.toastNotificationText.getText();
    return toastText;
  }

  async waitUntilNotificationIsClosed() {
    await this.toastNotification.waitForExist({
      reverse: true,
    });
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

  // Hovering methods

  async hoverOnElement(element: WebdriverIO.Element) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await hoverOnMacOS(element, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
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
    const currentInstance = await this.instance.getWindowHandle();
    await this.instance.switchToWindow(currentInstance);
  }

  async showUplinkWindow() {
    await this.instance.window.click();
    await this.instance.window.waitForIsShown(true);
  }
}
