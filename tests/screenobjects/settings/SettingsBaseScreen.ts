import "module-alias/register";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_LAYOUT: "~settings-layout",
};

const SELECTORS_WINDOWS = {
  ABOUT_BUTTON: '[name="about-button"]',
  ACCESSIBILITY_BUTTON: '[name="accessibility-button"]',
  AUDIO_BUTTON: '//Button[@HelpText="Sounds & Audio"]',
  DEVELOPER_BUTTON: '[name="developer-button"]',
  EXTENSIONS_BUTTON: '[name="extensions-button"]',
  GENERAL_BUTTON: '[name="general-button"]',
  LICENSES_BUTTON: '[name="licenses-button"]',
  MESSAGES_BUTTON: '[name="messages-button"]',
  NOTIFICATIONS_BUTTON: '[name="notifications-button"]',
  PROFILE_BUTTON: '[name="profile-button"]',
  SETTINGS_SEARCH_INPUT: '[name="settings-search-input"]',
};

const SELECTORS_MACOS = {
  ABOUT_BUTTON: "~about-button",
  ACCESSIBILITY_BUTTON: "~accessibility-button",
  AUDIO_BUTTON: "~sounds & audio-button",
  DEVELOPER_BUTTON: "~developer-button",
  EXTENSIONS_BUTTON: "~extensions-button",
  GENERAL_BUTTON: "~general-button",
  LICENSES_BUTTON: "~licenses-button",
  MESSAGES_BUTTON: "~messages-button",
  NOTIFICATIONS_BUTTON: "~notifications-button",
  PROFILE_BUTTON: "~profile-button",
  SETTINGS_SEARCH_INPUT: "~settings-search-input",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsBaseScreen extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.SETTINGS_LAYOUT);
  }

  get instance() {
    return browser.getInstance(this.executor);
  }

  async getCurrentDriver() {
    const currentDriver = await driver[this.executor].capabilities
      .automationName;
    return currentDriver;
  }

  async waitForIsShown(isShown = true): Promise<boolean | void> {
    return this.instance.$(SELECTORS.SETTINGS_LAYOUT).waitForDisplayed({
      reverse: !isShown,
    });
  }

  get aboutButton() {
    return this.instance.$(SELECTORS.ABOUT_BUTTON);
  }

  get accessibilityButton() {
    return this.instance.$(SELECTORS.ACCESSIBILITY_BUTTON);
  }

  get audioButton() {
    return this.instance.$(SELECTORS.AUDIO_BUTTON);
  }

  get developerButton() {
    return this.instance.$(SELECTORS.DEVELOPER_BUTTON);
  }

  get extensionsButton() {
    return this.instance.$(SELECTORS.EXTENSIONS_BUTTON);
  }

  get generalButton() {
    return this.instance.$(SELECTORS.GENERAL_BUTTON);
  }

  get licensesButton() {
    return this.instance.$(SELECTORS.LICENSES_BUTTON);
  }

  get messagesButton() {
    return this.instance.$(SELECTORS.MESSAGES_BUTTON);
  }

  get notificationsButton() {
    return this.instance.$(SELECTORS.NOTIFICATIONS_BUTTON);
  }

  get profileButton() {
    return this.instance.$(SELECTORS.PROFILE_BUTTON);
  }

  get settingsLayout() {
    return this.instance.$(SELECTORS.SETTINGS_LAYOUT);
  }

  get settingsSearchInput() {
    return this.instance.$(SELECTORS.SETTINGS_SEARCH_INPUT);
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
}
