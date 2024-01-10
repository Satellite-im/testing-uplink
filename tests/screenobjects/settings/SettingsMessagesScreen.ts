require("module-alias/register");
import { clickOnSwitchMacOS } from "@helpers/commands";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";

let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_MESSAGES: "~settings-messages",
};

const SELECTORS_WINDOWS = {
  EMOJI_CONVERSION_SECTION: '[name="emoji-conversion-section"]',
  MARKDOWN_SUPPORT_SECTION: '[name="markdown-support-section"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SWITCH_SLIDER: '[name="Switch Slider"]',
};

const SELECTORS_MACOS = {
  EMOJI_CONVERSION_SECTION: "~emoji-conversion-section",
  MARKDOWN_SUPPORT_SECTION: "~markdown-support-section",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SWITCH_SLIDER: "~Switch Slider",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsMessagesScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_MESSAGES);
  }

  get convertEmojiCheckbox() {
    return $(SELECTORS.EMOJI_CONVERSION_SECTION).$(SELECTORS.SWITCH_SLIDER);
  }

  get convertEmojiControllerValue() {
    return $(SELECTORS.EMOJI_CONVERSION_SECTION).$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get convertEmojiDescription() {
    return $(SELECTORS.EMOJI_CONVERSION_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get convertEmojiHeader() {
    return $(SELECTORS.EMOJI_CONVERSION_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get markdownSupportCheckbox() {
    return $(SELECTORS.MARKDOWN_SUPPORT_SECTION).$(SELECTORS.SWITCH_SLIDER);
  }

  get markdownSupportControllerValue() {
    return $(SELECTORS.MARKDOWN_SUPPORT_SECTION).$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get markdownSupportDescription() {
    return $(SELECTORS.MARKDOWN_SUPPORT_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get markdownSupportHeader() {
    return $(SELECTORS.MARKDOWN_SUPPORT_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsMessages() {
    return $(SELECTORS.SETTINGS_MESSAGES);
  }

  async clickOnConvertEmoji() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      const convertEmoji = await this.convertEmojiCheckbox;
      await convertEmoji.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const convertEmoji = await this.convertEmojiCheckbox;
      await clickOnSwitchMacOS(convertEmoji);
    }
  }

  async clickOnMarkdownSupport() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      const markdownSupport = await this.markdownSupportCheckbox;
      await markdownSupport.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const markdownSupport = await this.markdownSupportCheckbox;
      await clickOnSwitchMacOS(markdownSupport);
    }
  }

  async validateSettingsMessagesIsShown() {
    const settingsMessages = await this.settingsMessages;
    await settingsMessages.waitForExist();
  }
}
