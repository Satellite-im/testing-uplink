require("module-alias/register");
import { clickOnSwitchMacOS } from "@helpers/commands";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_NOTIFICATIONS: "~settings-notifications",
};

const SELECTORS_WINDOWS = {
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_SECTION: '[name="settings-section"]',
  SWITCH_SLIDER: '[name="Switch Slider"]',
};

const SELECTORS_MACOS = {
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_SECTION: "~settings-section",
  SWITCH_SLIDER: "~Switch Slider",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsNotificationsScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_NOTIFICATIONS);
  }

  get enabledNotificationsCheckbox() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(SELECTORS.SWITCH_SLIDER);
  }

  get enabledNotificationsControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get enabledNotificationsDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get enabledNotificationsHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get friendsNotificationsCheckbox() {
    return $$(SELECTORS.SETTINGS_CONTROL)[1].$(SELECTORS.SWITCH_SLIDER);
  }

  get friendsNotificationsControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[1].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get friendsNotificationsDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get friendsNotificationsHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get messagesNotificationsCheckbox() {
    return $$(SELECTORS.SETTINGS_CONTROL)[2].$(SELECTORS.SWITCH_SLIDER);
  }

  get messagesNotificationsControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[2].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get messagesNotificationsDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get messagesNotificationsHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsNotificationsCheckbox() {
    return $$(SELECTORS.SETTINGS_CONTROL)[3].$(SELECTORS.SWITCH_SLIDER);
  }

  get settingsNotificationsControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[3].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get settingsNotificationsDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get settingsNotificationsHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsNotifications() {
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
}
