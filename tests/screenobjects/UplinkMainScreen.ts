require("module-alias/register");
import AppScreen from "@screenobjects/AppScreen";
import {
  hoverOnMacOS,
  hoverOnWindows,
  leftClickOnMacOS,
  leftClickOnWindows,
} from "@helpers/commands";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";

let SELECTORS = {};

const SELECTORS_COMMON = {
  PRE_RELEASE_INDICATOR: "~pre-release",
};

const SELECTORS_WINDOWS = {
  BACK_BUTTON: '[name="back-button"]',
  BUTTON_BADGE: '[name="Button Badge"]',
  BUTTON_BADGE_TEXT: "<Text>",
  BUTTON_NAV: '[name="button-nav"]',
  BUTTON_NAV_TOOLTIP: '[name="tooltip"]',
  BUTTON_NAV_TOOLTIP_TEXT: "<Text>",
  CHATS_BUTTON: '[name="chats-button"]',
  CONTEXT_MENU: '[name="Context Menu"]',
  CONTEXT_MENU_OPEN_WEB_INSPECTOR: '[name="open-devtools-context"]',
  FILES_BUTTON: '[name="files-button"]',
  FRIENDS_BUTTON: '[name="friends-button"]',
  HAMBURGER_BUTTON: '[name="hamburger-button"]',
  MODAL: '[name="modal"]',
  PRE_RELEASE_INDICATOR_TEXT: "<Text>",
  SETTINGS_BUTTON: '[name="settings-button"]',
  SKELETAL_USER: '[name="skeletal-user"]',
  TOAST_NOTIFICATION: '[name="Toast Notification"]',
  TOAST_NOTIFICATION_CLOSE: '[name="close-toast"]',
  TOAST_NOTIFICATION_TEXT: '[name="toast-content"]',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  UPDATE_AVAILABLE: '[name="update-available"]',
  UPDATE_AVAILABLE_TEXT: "<Text>",
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
  CONTEXT_MENU_OPEN_WEB_INSPECTOR: "~open-devtools-context",
  FILES_BUTTON: "~files-button",
  FRIENDS_BUTTON: "~friends-button",
  HAMBURGER_BUTTON: "~hamburger-button",
  MODAL: "~modal",
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

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class UplinkMainScreen extends AppScreen {
  constructor() {
    super(SELECTORS.WINDOW);
  }

  get backButton() {
    return $(SELECTORS.BACK_BUTTON);
  }

  get buttonNav() {
    return $(SELECTORS.BUTTON_NAV);
  }

  get buttonNavBarButtonBadge() {
    return $(SELECTORS.BUTTON_NAV).$(SELECTORS.BUTTON_BADGE);
  }

  get buttonNavBarButtonBadgeText() {
    return $(SELECTORS.BUTTON_NAV)
      .$(SELECTORS.BUTTON_BADGE)
      .$(SELECTORS.BUTTON_BADGE_TEXT);
  }

  get chatsButton() {
    return $(SELECTORS.CHATS_BUTTON);
  }

  get chatsButtonTooltip() {
    return $(SELECTORS.TOOLTIP);
  }

  get chatsButtonTooltipText() {
    return $(SELECTORS.TOOLTIP).$(SELECTORS.BUTTON_NAV_TOOLTIP_TEXT);
  }

  get contextMenu() {
    return $(SELECTORS.CONTEXT_MENU);
  }

  get contextMenuOpenWebInspector() {
    return this.contextMenu.$(SELECTORS.CONTEXT_MENU_OPEN_WEB_INSPECTOR);
  }

  get filesButton() {
    return $(SELECTORS.FILES_BUTTON);
  }

  get filesButtonTooltip() {
    return $(SELECTORS.TOOLTIP);
  }

  get filesButtonTooltipText() {
    return $(SELECTORS.TOOLTIP).$(SELECTORS.BUTTON_NAV_TOOLTIP_TEXT);
  }

  get friendsButton() {
    return $(SELECTORS.FRIENDS_BUTTON);
  }

  get friendsButtonTooltip() {
    return $(SELECTORS.TOOLTIP);
  }

  get friendsButtonTooltipText() {
    return $(SELECTORS.TOOLTIP).$(SELECTORS.BUTTON_NAV_TOOLTIP_TEXT);
  }

  get hamburgerButton() {
    return $(SELECTORS.HAMBURGER_BUTTON);
  }

  get modal() {
    return $(SELECTORS.MODAL);
  }

  get prereleaseIndicator() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR);
  }

  get prereleaseIndicatorText() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR).$(
      SELECTORS.PRE_RELEASE_INDICATOR_TEXT,
    );
  }

  get settingsButton() {
    return $(SELECTORS.SETTINGS_BUTTON);
  }

  get settingsButtonTooltip() {
    return $(SELECTORS.TOOLTIP);
  }

  get settingsButtonTooltipText() {
    return $(SELECTORS.TOOLTIP).$(SELECTORS.BUTTON_NAV_TOOLTIP_TEXT);
  }

  get skeletalUser() {
    return $$(SELECTORS.SKELETAL_USER)[0];
  }

  get toastNotifications() {
    return $$(SELECTORS.TOAST_NOTIFICATION);
  }

  get toastNotification() {
    return $(SELECTORS.TOAST_NOTIFICATION);
  }

  get toastNotificationClose() {
    return $(SELECTORS.TOAST_NOTIFICATION).$(
      SELECTORS.TOAST_NOTIFICATION_CLOSE,
    );
  }

  get toastNotificationText() {
    return $(SELECTORS.TOAST_NOTIFICATION).$(SELECTORS.TOAST_NOTIFICATION_TEXT);
  }

  get updateAvailable() {
    return $(SELECTORS.UPDATE_AVAILABLE);
  }

  get updateAvailableText() {
    return $(SELECTORS.UPDATE_AVAILABLE).$(SELECTORS.UPDATE_AVAILABLE_TEXT);
  }

  get updateMenuDismiss() {
    return $(SELECTORS.UPDATE_MENU_DISMISS);
  }

  get updateMenuDownload() {
    return $(SELECTORS.UPDATE_MENU_DOWNLOAD);
  }

  get window() {
    return $(SELECTORS.WINDOW);
  }

  // Toast Notifications methods

  async closeToastNotification() {
    const toast = await this.toastNotificationClose;
    await toast.click();
  }

  async getToastNotificationText() {
    const toastText = await this.toastNotificationText;
    const toastTextValue = await toastText.getText();
    return toastTextValue;
  }

  async waitUntilNotificationIsClosed() {
    await this.toastNotification.waitForExist({
      reverse: true,
    });
  }

  // Clicking on common elements methods

  async clickOnBackButton() {
    const button = await this.backButton;
    await button.click();
  }

  async clickOnHamburgerButton() {
    const button = await this.hamburgerButton;
    await button.click();
  }

  async clickOnPreReleaseIndicator() {
    const prerelease = await this.prereleaseIndicator;
    await prerelease.click();
  }

  async clickOnUpdateAvailable() {
    const updateAvailable = await this.updateAvailable;
    await updateAvailable.click();
  }

  // NavBar methods

  async goToFiles() {
    const button = await this.filesButton;
    await button.click();
  }

  async goToFriends() {
    const button = await this.friendsButton;
    await button.click();
  }

  async goToMainScreen() {
    const chatsButton = await this.chatsButton;
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await leftClickOnMacOS(chatsButton);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await leftClickOnWindows(chatsButton);
    }
  }

  async goToSettings() {
    const button = await this.settingsButton;
    await button.click();
  }

  // Hovering methods

  async hoverOnElement(element: WebdriverIO.Element) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await hoverOnMacOS(element);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await hoverOnWindows(element);
    }
  }

  async hoverOnChatsButton() {
    const chatsButton = await this.chatsButton;
    await this.hoverOnElement(chatsButton);
  }

  async hoverOnFilesButton() {
    const filesButton = await this.filesButton;
    await this.hoverOnElement(filesButton);
  }

  async hoverOnFriendsButton() {
    const friendsButton = await this.friendsButton;
    await this.hoverOnElement(friendsButton);
  }

  async hoverOnSettingsButton() {
    const settingsButton = await this.settingsButton;
    await this.hoverOnElement(settingsButton);
  }

  // Multiremote functions
  async switchToOtherUserWindow() {
    const currentInstance = await driver.getWindowHandle();
    await driver.switchToWindow(currentInstance);
  }

  async showUplinkWindow() {
    const window = await this.window;
    await window.click();
    await window.waitForExist();
  }

  // Get Toggle Value

  async getToggleState(element: WebdriverIO.Element) {
    const currentDriver = await this.getCurrentDriver();
    let toggleState;
    if (currentDriver === MACOS_DRIVER) {
      toggleState = await element.getAttribute("value");
    } else if (currentDriver === WINDOWS_DRIVER) {
      toggleState = await element.getAttribute("Toggle.ToggleState");
    }
    return toggleState;
  }

  async validateNoModalIsOpen() {
    await this.modal.waitForExist({
      reverse: true,
    });
  }

  async clickOnOpenWebInspector() {
    const webInspectorOption = await this.contextMenuOpenWebInspector;
    await webInspectorOption.click();
  }
}
