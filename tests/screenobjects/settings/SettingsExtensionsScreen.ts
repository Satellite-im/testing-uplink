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
  SETTINGS_EXTENSIONS: "~settings-extensions",
};

const SELECTORS_WINDOWS = {
  EMOJI_SELECTOR_DEVELOPER: '//Text[starts-with(@Name, "SATELLITE")]',
  EMOJI_SELECTOR_DESCRIPTION:
    '//Text[starts-with(@Name, "Browse the standard unicode")]',
  EMOJI_SELECTOR_TITLE: '//Text[starts-with(@Name, "Emoji Selector")]',
  EXPLORE_BUTTON: '[name="explore-button"]',
  EXTENSIONS_BROWSER: '[name="extensions-browser"]',
  EXTENSIONS_EXPLORE_BANNER: '[name="extensions-explore-banner"]',
  EXTENSIONS_EXPLORE_SECTION: '[name="extensions-explore"]',
  EXTENSIONS_SEARCH_HEADER: '//Text[@Name="SEARCH EXTENSIONS"]',
  EXTENSIONS_SEARCH_INPUT: '[name="extensions-search-input"]',
  EXTENSIONS_SETTINGS_BUTTON: '[name="settings-button"]',
  INSTALLED_ALERT_TEXT: "<Text>",
  INSTALLED_BUTTON: '[name="installed-button"]',
  OPEN_EXTENSIONS_DESCRIPTION_TEXT: "<Text>[2]",
  OPEN_EXTENSIONS_FOLDER_BUTTON: '[name="open-extensions-folder-button"]',
  OPEN_EXTENSIONS_HEADER_TEXT: "//Text[1]/Text",
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_SECTION: '[name="settings-section"]',
  SWITCH_SLIDER: '[name="Switch Slider"]',
  SWITCH_SLIDER_VALUE: '[name="switch-slider-value"]',
};

const SELECTORS_MACOS = {
  EMOJI_SELECTOR_DEVELOPER:
    '//XCUIElementTypeStaticText[starts-with(@value, "SATELLITE")][1]',
  EMOJI_SELECTOR_DESCRIPTION:
    '//XCUIElementTypeStaticText[starts-with(@value, "Browse the standard unicode")]',
  EMOJI_SELECTOR_TITLE:
    '//XCUIElementTypeStaticText[starts-with(@value, "Emoji Selector")]',
  EXPLORE_BUTTON: "~explore-button",
  EXTENSIONS_BROWSER: "~extensions-browser",
  EXTENSIONS_EXPLORE_BANNER: "~extensions-explore-banner",
  EXTENSIONS_EXPLORE_SECTION: "~extensions-explore",
  EXTENSIONS_SEARCH_HEADER:
    '-ios class chain:**/XCUIElementTypeStaticText[`value == "SEARCH EXTENSIONS"`][2]',
  EXTENSIONS_SEARCH_INPUT: "~extensions-search-input",
  EXTENSIONS_SETTINGS_BUTTON: "~settings-button",
  INSTALLED_ALERT_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  INSTALLED_BUTTON: "~installed-button",
  OPEN_EXTENSIONS_DESCRIPTION_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  OPEN_EXTENSIONS_FOLDER_BUTTON: "~open-extensions-folder-button",
  OPEN_EXTENSIONS_HEADER_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_SECTION: "~settings-section",
  SWITCH_SLIDER: "~Switch Slider",
  SWITCH_SLIDER_VALUE: "~switch-slider-value",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsExtensionsScreen extends SettingsBaseScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.SETTINGS_EXTENSIONS);
  }

  get emojiSelectorCheckbox() {
    return this.instance
      .$(SELECTORS.EXTENSIONS_BROWSER)
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get emojiSelectorCheckboxValue() {
    return this.instance
      .$(SELECTORS.EXTENSIONS_BROWSER)
      .$(SELECTORS.SWITCH_SLIDER)
      .$(SELECTORS.SWITCH_SLIDER_VALUE);
  }

  get emojiSelectorDescription() {
    return this.instance
      .$(SELECTORS.EXTENSIONS_BROWSER)
      .$(SELECTORS.EMOJI_SELECTOR_DESCRIPTION);
  }

  get emojiSelectorDeveloper() {
    return this.instance
      .$(SELECTORS.EXTENSIONS_BROWSER)
      .$(SELECTORS.EMOJI_SELECTOR_DEVELOPER);
  }

  get emojiSelectorTitle() {
    return this.instance
      .$(SELECTORS.EXTENSIONS_BROWSER)
      .$(SELECTORS.EMOJI_SELECTOR_TITLE);
  }

  get enableAutomaticallyCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get enableAutomaticallyControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get enableAutomaticallyDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get enableAutomaticallyHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get exploreButton() {
    return this.instance.$(SELECTORS.EXPLORE_BUTTON);
  }

  get extensionsBrowser() {
    return this.instance.$(SELECTORS.EXTENSIONS_BROWSER);
  }

  get extensionsExplore() {
    return this.instance.$(SELECTORS.EXTENSIONS_EXPLORE_SECTION);
  }

  get extensionsExploreBanner() {
    return this.instance.$(SELECTORS.EXTENSIONS_EXPLORE_BANNER);
  }

  get extensionsSearchHeader() {
    return this.instance.$(SELECTORS.EXTENSIONS_SEARCH_HEADER);
  }

  get extensionsSearchInput() {
    return this.instance.$(SELECTORS.EXTENSIONS_SEARCH_INPUT);
  }

  get extensionsSettingsButton() {
    return this.instance
      .$(SELECTORS.SETTINGS_EXTENSIONS)
      .$(SELECTORS.EXTENSIONS_SETTINGS_BUTTON);
  }

  get installedAlertText() {
    return this.instance
      .$(SELECTORS.EXTENSIONS_EXPLORE_BANNER)
      .$(SELECTORS.INSTALLED_ALERT_TEXT);
  }

  get installedButton() {
    return this.instance.$(SELECTORS.INSTALLED_BUTTON);
  }

  get openExtensionsDescriptionText() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.OPEN_EXTENSIONS_DESCRIPTION_TEXT);
  }

  get openExtensionsHeaderText() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.OPEN_EXTENSIONS_HEADER_TEXT);
  }

  get openExtensionsFolderButton() {
    return this.instance.$(SELECTORS.OPEN_EXTENSIONS_FOLDER_BUTTON);
  }

  get settingsExtensions() {
    return this.instance.$(SELECTORS.SETTINGS_EXTENSIONS);
  }

  async clickOnEmojiSelectorCheckbox() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      const emojiSelectorCheckbox = await this.emojiSelectorCheckbox;
      await emojiSelectorCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const emojiSelectorCheckbox = await this.emojiSelectorCheckbox;
      await clickOnSwitchMacOS(emojiSelectorCheckbox, this.executor);
    }
  }

  async clickOnEnableAutomatically() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      const enableAutomaticallyCheckbox =
        await this.enableAutomaticallyCheckbox;
      await enableAutomaticallyCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const enableAutomaticallyCheckbox =
        await this.enableAutomaticallyCheckbox;
      await clickOnSwitchMacOS(enableAutomaticallyCheckbox, this.executor);
    }
  }

  async clickOnExploreButton() {
    const exploreButton = await this.exploreButton;
    await exploreButton.click();
  }

  async clickOnExtensionsSettingsButton() {
    const extensionsSettingsButton = await this.extensionsSettingsButton;
    await extensionsSettingsButton.click();
  }

  async clickOnInstalledButton() {
    const installedButton = await this.installedButton;
    await installedButton.click();
  }

  async clickOnOpenExtensionsFolder() {
    const openExtensionsFolderButton = await this.openExtensionsFolderButton;
    await openExtensionsFolderButton.click();
  }

  async getPlaceholderFromExtensionsInput() {
    const currentDriver = await this.getCurrentDriver();
    const extensionsSearchInput = await this.extensionsSearchInput;
    let result;
    if (currentDriver === WINDOWS_DRIVER) {
      result = await extensionsSearchInput.getAttribute("HelpText");
    } else {
      result = await extensionsSearchInput.getAttribute("placeholderValue");
    }
    return result.toString();
  }
}
