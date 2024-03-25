require("module-alias/register");
import { clickOnSwitchMacOS } from "@helpers/commands";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";
import { selectorContainer } from "@screenobjects/AppScreen";

let SELECTORS: selectorContainer = {};

const SELECTORS_COMMON: selectorContainer = {
  SETTINGS_EXTENSIONS: "~settings-extensions",
};

const SELECTORS_WINDOWS: selectorContainer = {
  AUTO_ENABLE_SECTION: '[name="auto-enable-section"]',
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
  OPEN_EXTENSIONS_SECTION: '[name="open-extensions-section"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SWITCH_SLIDER: '[name="Switch Slider"]',
  SWITCH_SLIDER_VALUE: '[name="switch-slider-value"]',
};

const SELECTORS_MACOS: selectorContainer = {
  AUTO_ENABLE_SECTION: "~auto-enable-section",
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
  OPEN_EXTENSIONS_SECTION: "~open-extensions-section",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SWITCH_SLIDER: "~Switch Slider",
  SWITCH_SLIDER_VALUE: "~switch-slider-value",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class SettingsExtensionsScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_EXTENSIONS);
  }

  public get emojiSelectorCheckbox() {
    return $(SELECTORS.EXTENSIONS_BROWSER).$(SELECTORS.SWITCH_SLIDER);
  }

  public get emojiSelectorCheckboxValue() {
    return $(SELECTORS.EXTENSIONS_BROWSER)
      .$(SELECTORS.SWITCH_SLIDER)
      .$(SELECTORS.SWITCH_SLIDER_VALUE);
  }

  public get emojiSelectorDescription() {
    return $(SELECTORS.EXTENSIONS_BROWSER).$(
      SELECTORS.EMOJI_SELECTOR_DESCRIPTION,
    );
  }

  public get emojiSelectorDeveloper() {
    return $(SELECTORS.EXTENSIONS_BROWSER).$(
      SELECTORS.EMOJI_SELECTOR_DEVELOPER,
    );
  }

  public get emojiSelectorTitle() {
    return $(SELECTORS.EXTENSIONS_BROWSER).$(SELECTORS.EMOJI_SELECTOR_TITLE);
  }

  public get enableAutomaticallyCheckbox() {
    return $(SELECTORS.AUTO_ENABLE_SECTION).$(SELECTORS.SWITCH_SLIDER);
  }

  public get enableAutomaticallyControllerValue() {
    return $(SELECTORS.AUTO_ENABLE_SECTION).$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  public get enableAutomaticallyDescription() {
    return $(SELECTORS.AUTO_ENABLE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  public get enableAutomaticallyHeader() {
    return $(SELECTORS.AUTO_ENABLE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  public get exploreButton() {
    return $(SELECTORS.EXPLORE_BUTTON);
  }

  public get extensionsBrowser() {
    return $(SELECTORS.EXTENSIONS_BROWSER);
  }

  public get extensionsExplore() {
    return $(SELECTORS.EXTENSIONS_EXPLORE_SECTION);
  }

  public get extensionsExploreBanner() {
    return $(SELECTORS.EXTENSIONS_EXPLORE_BANNER);
  }

  public get extensionsSearchHeader() {
    return $(SELECTORS.EXTENSIONS_SEARCH_HEADER);
  }

  public get extensionsSearchInput() {
    return $(SELECTORS.EXTENSIONS_SEARCH_INPUT);
  }

  public get extensionsSettingsButton() {
    return $(SELECTORS.SETTINGS_EXTENSIONS).$(
      SELECTORS.EXTENSIONS_SETTINGS_BUTTON,
    );
  }

  public get installedAlertText() {
    return $(SELECTORS.EXTENSIONS_EXPLORE_BANNER).$(
      SELECTORS.INSTALLED_ALERT_TEXT,
    );
  }

  public get installedButton() {
    return $(SELECTORS.INSTALLED_BUTTON);
  }

  public get openExtensionsDescriptionText() {
    return $(SELECTORS.OPEN_EXTENSIONS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.OPEN_EXTENSIONS_DESCRIPTION_TEXT);
  }

  public get openExtensionsHeaderText() {
    return $(SELECTORS.OPEN_EXTENSIONS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.OPEN_EXTENSIONS_HEADER_TEXT);
  }

  public get openExtensionsFolderButton() {
    return $(SELECTORS.OPEN_EXTENSIONS_FOLDER_BUTTON);
  }

  public get settingsExtensions() {
    return $(SELECTORS.SETTINGS_EXTENSIONS);
  }

  async clickOnEmojiSelectorCheckbox() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      const emojiSelectorCheckbox = await this.emojiSelectorCheckbox;
      await emojiSelectorCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const emojiSelectorCheckbox = await this.emojiSelectorCheckbox;
      await clickOnSwitchMacOS(emojiSelectorCheckbox);
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
      await clickOnSwitchMacOS(enableAutomaticallyCheckbox);
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

  async validateEmojiSelectorIsEnabled() {
    const emojiSelectorCheckboxValue = await this.emojiSelectorCheckboxValue;
    await this.validateToggleIsEnabled(emojiSelectorCheckboxValue);
  }

  async validateEnableAutomaticallyIsEnabled() {
    const enableAutomaticallyControllerValue =
      await this.enableAutomaticallyControllerValue;
    await this.validateToggleIsEnabled(enableAutomaticallyControllerValue);
  }

  async validateEmojiSelectorIsDisabled() {
    const emojiSelectorCheckboxValue = await this.emojiSelectorCheckboxValue;
    await this.validateToggleIsDisabled(emojiSelectorCheckboxValue);
  }

  async validateEnableAutomaticallyIsDisabled() {
    const enableAutomaticallyControllerValue =
      await this.enableAutomaticallyControllerValue;
    await this.validateToggleIsDisabled(enableAutomaticallyControllerValue);
  }
}

export default new SettingsExtensionsScreen();
