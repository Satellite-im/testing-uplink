require("module-alias/register");
import { clickOnSwitchMacOS } from "@helpers/commands";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";
import { selectorContainer } from "@screenobjects/AppScreen";

let SELECTORS: selectorContainer = {};

const SELECTORS_COMMON: selectorContainer = {
  SETTINGS_NOTIFICATIONS: "~settings-notifications",
};

const SELECTORS_WINDOWS: selectorContainer = {
  ENABLED_NOTIFICATIONS_SECTION: '[name="enabled-notifications-section"]',
  FRIENDS_NOTIFICATIONS_SECTION: '[name="friends-notifications-section"]',
  MESSAGES_NOTIFICATIONS_SECTION: '[name="messages-notifications-section"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_NOTIFICATIONS_SECTION: '[name="settings-notifications-section"]',
  SWITCH_SLIDER: '[name="Switch Slider"]',
};

const SELECTORS_MACOS: selectorContainer = {
  ENABLED_NOTIFICATIONS_SECTION: "~enabled-notifications-section",
  FRIENDS_NOTIFICATIONS_SECTION: "~friends-notifications-section",
  MESSAGES_NOTIFICATIONS_SECTION: "~messages-notifications-section",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_NOTIFICATIONS_SECTION: "~settings-notifications-section",
  SWITCH_SLIDER: "~Switch Slider",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class SettingsNotificationsScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_NOTIFICATIONS);
  }

  public get enabledNotificationsCheckbox() {
    return this.enabledNotificationsSection.$(SELECTORS.SWITCH_SLIDER);
  }

  public get enabledNotificationsControllerValue() {
    return this.enabledNotificationsSection.$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  public get enabledNotificationsDescription() {
    return this.enabledNotificationsSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  public get enabledNotificationsHeader() {
    return this.enabledNotificationsSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  public get enabledNotificationsSection() {
    return this.settingsNotifications.$(
      SELECTORS.ENABLED_NOTIFICATIONS_SECTION,
    );
  }

  public get friendsNotificationsCheckbox() {
    return this.friendsNotificationsSection.$(SELECTORS.SWITCH_SLIDER);
  }

  public get friendsNotificationsControllerValue() {
    return this.friendsNotificationsSection.$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  public get friendsNotificationsDescription() {
    return this.friendsNotificationsSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  public get friendsNotificationsHeader() {
    return this.friendsNotificationsSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  public get friendsNotificationsSection() {
    return this.settingsNotifications.$(
      SELECTORS.FRIENDS_NOTIFICATIONS_SECTION,
    );
  }

  public get messagesNotificationsCheckbox() {
    return this.messagesNotificationsSection.$(SELECTORS.SWITCH_SLIDER);
  }

  public get messagesNotificationsControllerValue() {
    return this.messagesNotificationsSection.$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  public get messagesNotificationsDescription() {
    return this.messagesNotificationsSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  public get messagesNotificationsHeader() {
    return this.messagesNotificationsSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  public get messagesNotificationsSection() {
    return this.settingsNotifications.$(
      SELECTORS.MESSAGES_NOTIFICATIONS_SECTION,
    );
  }

  public get settingsNotificationsCheckbox() {
    return this.settingsNotificationsSection.$(SELECTORS.SWITCH_SLIDER);
  }

  public get settingsNotificationsControllerValue() {
    return this.settingsNotificationsSection.$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  public get settingsNotificationsDescription() {
    return this.settingsNotificationsSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  public get settingsNotificationsHeader() {
    return this.settingsNotificationsSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  public get settingsNotificationsSection() {
    return this.settingsNotifications.$(
      SELECTORS.SETTINGS_NOTIFICATIONS_SECTION,
    );
  }

  public get settingsNotifications() {
    return $(SELECTORS.SETTINGS_NOTIFICATIONS);
  }

  async clickOnEnabledNotifications() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      const enableNotifications = await this.enabledNotificationsCheckbox;
      await enableNotifications.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const enableNotifications = await this.enabledNotificationsCheckbox;
      await clickOnSwitchMacOS(enableNotifications);
    }
  }

  async clickOnFriendsNotifications() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      const friendsNotificationsCheckbox =
        await this.friendsNotificationsCheckbox;
      await friendsNotificationsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const locator = await this.friendsNotificationsCheckbox;
      await clickOnSwitchMacOS(locator);
    }
  }

  async clickOnMessagesNotifications() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      const messagesNotificationsCheckbox =
        await this.messagesNotificationsCheckbox;
      await messagesNotificationsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const locator = await this.messagesNotificationsCheckbox;
      await clickOnSwitchMacOS(locator);
    }
  }

  async clickOnSettingsNotifications() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      const settingsNotificationsCheckbox =
        await this.settingsNotificationsCheckbox;
      await settingsNotificationsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const locator = await this.settingsNotificationsCheckbox;
      await clickOnSwitchMacOS(locator);
    }
  }

  async validateSettingsNotificationsIsShown() {
    const settingsNotifications = await this.settingsNotifications;
    await settingsNotifications.waitForExist();
  }

  // Toggle Enable Methods

  async validateEnabledNotificationsIsEnabled() {
    const enabledNotificationsControllerValue =
      await this.enabledNotificationsControllerValue;
    await this.validateToggleIsEnabled(enabledNotificationsControllerValue);
  }

  async validateFriendsNotificationsIsEnabled() {
    const friendsNotificationsControllerValue =
      await this.friendsNotificationsControllerValue;
    await this.validateToggleIsEnabled(friendsNotificationsControllerValue);
  }

  async validateMessagesNotificationsIsEnabled() {
    const messagesNotificationsControllerValue =
      await this.messagesNotificationsControllerValue;
    await this.validateToggleIsEnabled(messagesNotificationsControllerValue);
  }

  async validateSettingsNotificationsIsEnabled() {
    const settingsNotificationsControllerValue =
      await this.settingsNotificationsControllerValue;
    await this.validateToggleIsEnabled(settingsNotificationsControllerValue);
  }

  // Toggle Disabled Methods

  async validateEnabledNotificationsIsDisabled() {
    const enabledNotificationsControllerValue =
      await this.enabledNotificationsControllerValue;
    await this.validateToggleIsDisabled(enabledNotificationsControllerValue);
  }

  async validateFriendsNotificationsIsDisabled() {
    const friendsNotificationsControllerValue =
      await this.friendsNotificationsControllerValue;
    await this.validateToggleIsDisabled(friendsNotificationsControllerValue);
  }

  async validateMessagesNotificationsIsDisabled() {
    const messagesNotificationsControllerValue =
      await this.messagesNotificationsControllerValue;
    await this.validateToggleIsDisabled(messagesNotificationsControllerValue);
  }

  async validateSettingsNotificationsIsDisabled() {
    const settingsNotificationsControllerValue =
      await this.settingsNotificationsControllerValue;
    await this.validateToggleIsDisabled(settingsNotificationsControllerValue);
  }
}

export default new SettingsNotificationsScreen();
