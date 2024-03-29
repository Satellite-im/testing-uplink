require("module-alias/register");
import { WINDOWS_DRIVER } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { selectorContainer } from "@screenobjects/AppScreen";

let SELECTORS: selectorContainer = {};

const SELECTORS_COMMON: selectorContainer = {
  SETTINGS_LAYOUT: "~settings-layout",
};

const SELECTORS_WINDOWS: selectorContainer = {
  ABOUT_BUTTON: '[name="about-button"]',
  ACCESSIBILITY_BUTTON: '[name="accessibility-button"]',
  AUDIO_BUTTON: '//Button[@HelpText="Sounds & Audio"]',
  DEVELOPER_BUTTON: '[name="developer-button"]',
  EXTENSIONS_BUTTON: '[name="extensions-button"]',
  GENERAL_BUTTON: '[name="general-button"]',
  KEYBOARD_SHORTCUTS_BUTTON: '[name="keyboard shortcuts-button"]',
  LICENSES_BUTTON: '[name="licenses-button"]',
  MESSAGES_BUTTON: '[name="messages-button"]',
  NOTIFICATIONS_BUTTON: '[name="notifications-button"]',
  PROFILE_BUTTON: '[name="profile-button"]',
  SETTINGS_SEARCH_INPUT: '[name="settings-search-input"]',
};

const SELECTORS_MACOS: selectorContainer = {
  ABOUT_BUTTON: "~about-button",
  ACCESSIBILITY_BUTTON: "~accessibility-button",
  AUDIO_BUTTON: "~sounds & audio-button",
  DEVELOPER_BUTTON: "~developer-button",
  EXTENSIONS_BUTTON: "~extensions-button",
  GENERAL_BUTTON: "~general-button",
  KEYBOARD_SHORTCUTS_BUTTON: "~keyboard shortcuts-button",
  LICENSES_BUTTON: "~licenses-button",
  MESSAGES_BUTTON: "~messages-button",
  NOTIFICATIONS_BUTTON: "~notifications-button",
  PROFILE_BUTTON: "~profile-button",
  SETTINGS_SEARCH_INPUT: "~settings-search-input",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsBaseScreen extends UplinkMainScreen {
  constructor(locator: string = SELECTORS.SETTINGS_LAYOUT) {
    super(locator);
  }

  async getCurrentDriver() {
    const currentDriver = process.env.DRIVER;
    return currentDriver;
  }

  async waitForIsShown(isShown = true): Promise<boolean | void> {
    return $(SELECTORS.SETTINGS_LAYOUT).waitForDisplayed({
      reverse: !isShown,
    });
  }

  public get aboutButton() {
    return $(SELECTORS.ABOUT_BUTTON);
  }

  public get accessibilityButton() {
    return $(SELECTORS.ACCESSIBILITY_BUTTON);
  }

  public get audioButton() {
    return $(SELECTORS.AUDIO_BUTTON);
  }

  public get developerButton() {
    return $(SELECTORS.DEVELOPER_BUTTON);
  }

  public get extensionsButton() {
    return $(SELECTORS.EXTENSIONS_BUTTON);
  }

  public get generalButton() {
    return $(SELECTORS.GENERAL_BUTTON);
  }

  public get keyboardShortcutsButton() {
    return $(SELECTORS.KEYBOARD_SHORTCUTS_BUTTON);
  }

  public get licensesButton() {
    return $(SELECTORS.LICENSES_BUTTON);
  }

  public get messagesButton() {
    return $(SELECTORS.MESSAGES_BUTTON);
  }

  public get notificationsButton() {
    return $(SELECTORS.NOTIFICATIONS_BUTTON);
  }

  public get profileButton() {
    return $(SELECTORS.PROFILE_BUTTON);
  }

  public get settingsLayout() {
    return $(SELECTORS.SETTINGS_LAYOUT);
  }

  public get settingsSearchInput() {
    return $(SELECTORS.SETTINGS_SEARCH_INPUT);
  }

  async goToAboutSettings() {
    const aboutButton = await this.aboutButton;
    await aboutButton.click();
  }

  async goToAccessibilitySettings() {
    const accessibilityButton = await this.accessibilityButton;
    await accessibilityButton.click();
  }

  async goToAudioSettings() {
    const audioButton = await this.audioButton;
    await audioButton.click();
  }

  async goToDeveloperSettings() {
    const developerButton = await this.developerButton;
    await developerButton.click();
  }

  async goToExtensionsSettings() {
    const extensionsButton = await this.extensionsButton;
    await extensionsButton.click();
  }

  async goToGeneralSettings() {
    const generalButton = await this.generalButton;
    await generalButton.click();
  }

  async goToKeyboardShortcutsSettings() {
    const keyboardShortcutsButton = await this.keyboardShortcutsButton;
    await keyboardShortcutsButton.click();
  }

  async goToLicensesSettings() {
    const licensesButton = await this.licensesButton;
    await licensesButton.click();
  }

  async goToMessagesSettings() {
    const messagesButton = await this.messagesButton;
    await messagesButton.click();
  }

  async goToNotificationsSettings() {
    const notificationsButton = await this.notificationsButton;
    await notificationsButton.click();
  }

  async goToProfileSettings() {
    const profileButton = await this.profileButton;
    await profileButton.click();
  }
}
