import { clickOnSwitchMacOS } from "../../helpers/commands";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "../../helpers/constants";
import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_NOTIFICATIONS: "~settings-notifications",
};

const SELECTORS_WINDOWS = {
  GRANT_PERMISSIONS_BUTTON: '[name="grant-permissions-button"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "//Text[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_SECTION: '[name="settings-section"]',
  SWITCH_SLIDER: '[name="Switch Slider"]',
};

const SELECTORS_MACOS = {
  GRANT_PERMISSIONS_BUTTON: "~grant-permissions-button",
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
  constructor(executor: string) {
    super(executor, SELECTORS.SETTINGS_NOTIFICATIONS);
  }

  get enabledNotificationsCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[0]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get enabledNotificationsControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[0]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get enabledNotificationsDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get enabledNotificationsHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get friendsNotificationsCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[1]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get friendsNotificationsControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[1]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get friendsNotificationsDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get friendsNotificationsHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get messagesNotificationsCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[2]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get messagesNotificationsControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[2]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get messagesNotificationsDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get messagesNotificationsHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsNotificationsCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[3]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get settingsNotificationsControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[3]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get settingsNotificationsDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get settingsNotificationsHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsNotifications() {
    return this.instance.$(SELECTORS.SETTINGS_NOTIFICATIONS);
  }

  async clickOnEnabledNotifications() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await this.enabledNotificationsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const locator = await this.enabledNotificationsCheckbox;
      await clickOnSwitchMacOS(locator, this.executor);
    }
  }

  async clickOnFriendsNotifications() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await this.friendsNotificationsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const locator = await this.friendsNotificationsCheckbox;
      await clickOnSwitchMacOS(locator, this.executor);
    }
  }

  async clickOnMessagesNotifications() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await this.messagesNotificationsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const locator = await this.messagesNotificationsCheckbox;
      await clickOnSwitchMacOS(locator, this.executor);
    }
  }

  async clickOnSettingsNotifications() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await this.settingsNotificationsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const locator = await this.settingsNotificationsCheckbox;
      await clickOnSwitchMacOS(locator, this.executor);
    }
  }
}
