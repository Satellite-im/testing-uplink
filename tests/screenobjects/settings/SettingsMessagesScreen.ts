require("module-alias/register");
import { clickOnSwitchMacOS } from "@helpers/commands";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "@helpers/constants";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_MESSAGES: "~settings-messages",
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

export default class SettingsMessagesScreen extends SettingsBaseScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.SETTINGS_MESSAGES);
  }

  get convertEmojiCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[0]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get convertEmojiControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[0]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get convertEmojiDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get convertEmojiHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get markdownSupportCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[1]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get markdownSupportControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[1]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get markdownSupportDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get markdownSupportHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsMessages() {
    return this.instance.$(SELECTORS.SETTINGS_MESSAGES);
  }

  async clickOnConvertEmoji() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      const convertEmoji = await this.convertEmojiCheckbox;
      await convertEmoji.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const convertEmoji = await this.convertEmojiCheckbox;
      await clickOnSwitchMacOS(convertEmoji, this.executor);
    }
  }

  async clickOnMarkdownSupport() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      const markdownSupport = await this.markdownSupportCheckbox;
      await markdownSupport.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const markdownSupport = await this.markdownSupportCheckbox;
      await clickOnSwitchMacOS(markdownSupport, this.executor);
    }
  }

  async validateSettingsMessagesIsShown() {
    const settingsMessages = await this.settingsMessages;
    await settingsMessages.waitForExist();
  }
}
