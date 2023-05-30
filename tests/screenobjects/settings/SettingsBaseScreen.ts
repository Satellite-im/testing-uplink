import UplinkMainScreen from "../UplinkMainScreen.ts";

const currentOS = driver["userA"].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_LAYOUT: "~settings-layout",
};

const SELECTORS_WINDOWS = {
  ABOUT_BUTTON: '[name="about-button"]',
  ACCESSIBILITY_BUTTON: '[name="accessibility-button"]',
  AUDIO_BUTTON: "//Group/Group/Button[4]",
  DEVELOPER_BUTTON: '[name="developer-button"]',
  EXTENSIONS_BUTTON: '[name="extensions-button"]',
  FILES_BUTTON: '[name="files-button"]',
  GENERAL_BUTTON: '[name="general-button"]',
  NOTIFICATIONS_BUTTON: '[name="notifications-button"]',
  PRIVACY_BUTTON: '[name="privacy-button"]',
  PROFILE_BUTTON: '[name="profile-button"]',
  SETTINGS_SEARCH_INPUT: '[name="settings-search-input"]',
};

const SELECTORS_MACOS = {
  ABOUT_BUTTON: "~about-button",
  ACCESSIBILITY_BUTTON: "~accessibility-button",
  AUDIO_BUTTON: "~sounds & audio-button",
  DEVELOPER_BUTTON: "~developer-button",
  EXTENSIONS_BUTTON: "~extensions-button",
  FILES_BUTTON: "~files-button",
  GENERAL_BUTTON: "~general-button",
  NOTIFICATIONS_BUTTON: "~notifications-button",
  PRIVACY_BUTTON: "~privacy-button",
  PROFILE_BUTTON: "~profile-button",
  SETTINGS_SEARCH_INPUT: "~settings-search-input",
};

currentOS === "windows"
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

  get filesSettingsButton() {
    return this.instance.$$(SELECTORS.FILES_BUTTON)[1];
  }

  get generalButton() {
    return this.instance.$(SELECTORS.GENERAL_BUTTON);
  }

  get notificationsButton() {
    return this.instance.$(SELECTORS.NOTIFICATIONS_BUTTON);
  }

  get privacyButton() {
    return this.instance.$(SELECTORS.PRIVACY_BUTTON);
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
    await this.aboutButton.click();
  }

  async goToAccessibilitySettings() {
    await this.accessibilityButton.click();
  }

  async goToAudioSettings() {
    await this.audioButton.click();
  }

  async goToDeveloperSettings() {
    await this.developerButton.click();
  }

  async goToExtensionsSettings() {
    await this.extensionsButton.click();
  }

  async goToFilesSettings() {
    await this.filesSettingsButton.click();
  }

  async goToGeneralSettings() {
    await this.generalButton.click();
  }

  async goToNotificationsSettings() {
    await this.notificationsButton.click();
  }

  async goToPrivacySettings() {
    await this.privacyButton.click();
  }

  async goToProfileSettings() {
    await this.profileButton.click();
  }

  async getToggleState(element: WebdriverIO.Element) {
    const currentDriver = await this.getCurrentDriver();
    let toggleState;
    if (currentDriver === "mac2") {
      toggleState = await element.getAttribute("value");
    } else if (currentDriver === "windows") {
      toggleState = await element.getAttribute("Toggle.ToggleState");
    }
    return toggleState;
  }
}
