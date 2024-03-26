require("module-alias/register");
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";
import { selectorContainer } from "@screenobjects/AppScreen";

let SELECTORS: selectorContainer = {};

const SELECTORS_COMMON: selectorContainer = {
  SETTINGS_GENERAL: "~settings-general",
};

const SELECTORS_WINDOWS: selectorContainer = {
  DECREASE_FONT_SIZE_SECTION: '[name="decrease-font-size-section"]',
  HIDE_FOCUS_UPLINK_SECTION: '[name="hide-focus-uplink-section"]',
  INCREASE_FONT_SIZE_SECTION: '[name="increase-font-size-section"]',
  KEYBIND_KEY: '[name="keybind-key"]',
  KEYBIND_KEY_INNER: '[name="keybind-key-inner"]',
  KEYBIND_KEY_INNER_TEXT: "<Text>",
  KEYBIND_SECTION_LABEL: '[name="keybind-section-label"]',
  KEYBIND_SECTION_LABEL_TEXT: "<Text>",
  KEYBIND_SECTION_KEYS: '[name="keybind-section-keys"]',
  KEYBIND_SEPARATOR: '[name="keybind-separator"]',
  OPEN_CLOSE_DEV_TOOLS_SECTION: '[name="open-close-dev-tools-section"]',
  RESET_KEYBINDS_SECTION: '[name="reset-keybinds-section"]',
  RESET_SINGLE_KEYBIND_BUTTON: '[name="reset-single-keybind-button"]',
  REVERT_KEYBINDS_BUTTON: '[name="revert-keybinds-button"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_KEYBINDS: '[name="settings-keybinds"]',
  SETTINGS_KEYBINDS_INFO: '[name="settings-keybind-info"]',
  SETTINGS_KEYBINDS_INFO_TEXT: '[name="settings-keybind-info-text"]',
  SETTINGS_KEYBINDS_INFO_TEXT_VALUE: "<Text>",
  TOGGLE_DEAFEN_SECTION: '[name="toggle-deafen-section"]',
  TOGGLE_DEVMODE_SECTION: '[name="toggle-devmode-section"]',
  TOGGLE_MUTE_SECTION: '[name="toggle-mute-section"]',
};

const SELECTORS_MACOS: selectorContainer = {
  DECREASE_FONT_SIZE_SECTION: "~decrease-font-size-section",
  HIDE_FOCUS_UPLINK_SECTION: "~hide-focus-uplink-section",
  INCREASE_FONT_SIZE_SECTION: "~increase-font-size-section",
  KEYBIND_KEY: "~keybind-key",
  KEYBIND_KEY_INNER: "~keybind-key-inner",
  KEYBIND_KEY_INNER_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  KEYBIND_SECTION_LABEL: "~keybind-section-label",
  KEYBIND_SECTION_LABEL_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  KEYBIND_SECTION_KEYS: "~keybind-section-keys",
  KEYBIND_SEPARATOR: "~keybind-separator",
  OPEN_CLOSE_DEV_TOOLS_SECTION: "~open-close-dev-tools-section",
  RESET_KEYBINDS_SECTION: "~reset-keybinds-section",
  RESET_SINGLE_KEYBIND_BUTTON: "~reset-single-keybind-button",
  REVERT_KEYBINDS_BUTTON: "~revert-keybinds-button",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_KEYBINDS: "~settings-keybinds",
  SETTINGS_KEYBINDS_INFO: "~settings-keybind-info",
  SETTINGS_KEYBINDS_INFO_TEXT: "~settings-keybind-info-text",
  SETTINGS_KEYBINDS_INFO_TEXT_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  TOGGLE_DEAFEN_SECTION: "~toggle-deafen-section",
  TOGGLE_DEVMODE_SECTION: "~toggle-devmode-section",
  TOGGLE_MUTE_SECTION: "~toggle-mute-section",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export type Keybinds =
  | "decrease-font-size"
  | "hide-focus-uplink"
  | "increase-font-size"
  | "open-close-dev-tools"
  | "toggle-deafen"
  | "toggle-devmode"
  | "toggle-mute";

class SettingsKeybindsScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_KEYBINDS);
  }

  // Decrease Font Size UI Locators

  public get decreaseFontSizeKeybindKeys() {
    return this.decreaseFontSizeSectionKeys.$(SELECTORS.KEYBIND_KEY);
  }

  public get decreaseFontSizeKeybindKeyInner() {
    return this.decreaseFontSizeKeybindKeys.$(SELECTORS.KEYBIND_KEY_INNER);
  }

  public get decreaseFontSizeKeybindKeyInnerValue() {
    return this.decreaseFontSizeKeybindKeyInner.$$(
      SELECTORS.KEYBIND_KEY_INNER_TEXT,
    );
  }

  public get decreaseFontSizeKeybindSeparators() {
    return this.decreaseFontSizeSectionKeys.$$(SELECTORS.KEYBIND_SEPARATOR);
  }

  public get decreaseFontSizeLabel() {
    return this.decreaseFontSizeSection.$(SELECTORS.KEYBIND_SECTION_LABEL);
  }

  public get decreaseFontSizeLabelText() {
    return this.decreaseFontSizeLabel.$(SELECTORS.KEYBIND_SECTION_LABEL_TEXT);
  }

  public get decreaseFontSizeResetKeybindButton() {
    return this.decreaseFontSizeSection.$(
      SELECTORS.RESET_SINGLE_KEYBIND_BUTTON,
    );
  }

  public get decreaseFontSizeSection() {
    return this.settingsKeybinds.$(SELECTORS.DECREASE_FONT_SIZE_SECTION);
  }

  public get decreaseFontSizeSectionKeys() {
    return this.decreaseFontSizeSection.$(SELECTORS.KEYBIND_SECTION_KEYS);
  }

  // Hide Focus Uplink UI Locators

  public get hideFocusUplinkKeybindKeys() {
    return this.hideFocusUplinkSectionKeys.$(SELECTORS.KEYBIND_KEY);
  }

  public get hideFocusUplinkKeybindKeyInner() {
    return this.hideFocusUplinkKeybindKeys.$(SELECTORS.KEYBIND_KEY_INNER);
  }

  public get hideFocusUplinkKeybindKeyInnerValue() {
    return this.hideFocusUplinkKeybindKeyInner.$$(
      SELECTORS.KEYBIND_KEY_INNER_TEXT,
    );
  }

  public get hideFocusUplinkKeybindSeparators() {
    return this.hideFocusUplinkSectionKeys.$$(SELECTORS.KEYBIND_SEPARATOR);
  }

  public get hideFocusUplinkLabel() {
    return this.hideFocusUplinkSection.$(SELECTORS.KEYBIND_SECTION_LABEL);
  }

  public get hideFocusUplinkLabelText() {
    return this.hideFocusUplinkLabel.$(SELECTORS.KEYBIND_SECTION_LABEL_TEXT);
  }

  public get hideFocusUplinkResetKeybindButton() {
    return this.hideFocusUplinkSection.$(SELECTORS.RESET_SINGLE_KEYBIND_BUTTON);
  }

  public get hideFocusUplinkSection() {
    return this.settingsKeybinds.$(SELECTORS.HIDE_FOCUS_UPLINK_SECTION);
  }

  public get hideFocusUplinkSectionKeys() {
    return this.hideFocusUplinkSection.$(SELECTORS.KEYBIND_SECTION_KEYS);
  }

  // Increase Font Size UI Locators

  public get increaseFontSizeKeybindKeys() {
    return this.increaseFontSizeSectionKeys.$(SELECTORS.KEYBIND_KEY);
  }

  public get increaseFontSizeKeybindKeyInner() {
    return this.increaseFontSizeKeybindKeys.$(SELECTORS.KEYBIND_KEY_INNER);
  }

  public get increaseFontSizeKeybindKeyInnerValue() {
    return this.increaseFontSizeKeybindKeyInner.$$(
      SELECTORS.KEYBIND_KEY_INNER_TEXT,
    );
  }

  public get increaseFontSizeKeybindSeparators() {
    return this.increaseFontSizeSectionKeys.$$(SELECTORS.KEYBIND_SEPARATOR);
  }

  public get increaseFontSizeLabel() {
    return this.increaseFontSizeSection.$(SELECTORS.KEYBIND_SECTION_LABEL);
  }

  public get increaseFontSizeLabelText() {
    return this.increaseFontSizeLabel.$(SELECTORS.KEYBIND_SECTION_LABEL_TEXT);
  }

  public get increaseFontSizeResetKeybindButton() {
    return this.increaseFontSizeSection.$(
      SELECTORS.RESET_SINGLE_KEYBIND_BUTTON,
    );
  }

  public get increaseFontSizeSection() {
    return this.settingsKeybinds.$(SELECTORS.INCREASE_FONT_SIZE_SECTION);
  }

  public get increaseFontSizeSectionKeys() {
    return this.increaseFontSizeSection.$(SELECTORS.KEYBIND_SECTION_KEYS);
  }

  // Open Close DevTools Section

  public get openCloseDevToolsKeybindKeys() {
    return this.openCloseDevToolsSectionKeys.$(SELECTORS.KEYBIND_KEY);
  }

  public get openCloseDevToolsKeybindKeyInner() {
    return this.openCloseDevToolsKeybindKeys.$(SELECTORS.KEYBIND_KEY_INNER);
  }

  public get openCloseDevToolsKeybindKeyInnerValue() {
    return this.openCloseDevToolsKeybindKeyInner.$$(
      SELECTORS.KEYBIND_KEY_INNER_TEXT,
    );
  }

  public get openCloseDevToolsKeybindSeparators() {
    return this.openCloseDevToolsSectionKeys.$$(SELECTORS.KEYBIND_SEPARATOR);
  }

  public get openCloseDevToolsLabel() {
    return this.openCloseDevToolsSection.$(SELECTORS.KEYBIND_SECTION_LABEL);
  }

  public get openCloseDevToolsLabelText() {
    return this.openCloseDevToolsLabel.$(SELECTORS.KEYBIND_SECTION_LABEL_TEXT);
  }

  public get openCloseDevToolsResetKeybindButton() {
    return this.openCloseDevToolsSection.$(
      SELECTORS.RESET_SINGLE_KEYBIND_BUTTON,
    );
  }

  public get openCloseDevToolsSection() {
    return this.settingsKeybinds.$(SELECTORS.OPEN_CLOSE_DEV_TOOLS_SECTION);
  }

  public get openCloseDevToolsSectionKeys() {
    return this.openCloseDevToolsSection.$(SELECTORS.KEYBIND_SECTION_KEYS);
  }

  // Reset Keybinds Section

  public get resetKeybindsSection() {
    return this.settingsKeybinds.$(SELECTORS.RESET_KEYBINDS_SECTION);
  }

  public get resetKeybindsDescription() {
    return this.resetKeybindsSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  public get resetKeybindsHeader() {
    return this.resetKeybindsSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  public get revertKeybindsButton() {
    return this.resetKeybindsSection.$(SELECTORS.REVERT_KEYBINDS_BUTTON);
  }

  // Settings Keybinds Main UI Locators

  public get settingsKeybinds() {
    return $(SELECTORS.SETTINGS_KEYBINDS);
  }

  public get settingsKeybindsInfo() {
    return this.settingsKeybinds.$(SELECTORS.SETTINGS_KEYBINDS_INFO);
  }

  public get settingsKeybindsInfoText() {
    return this.settingsKeybindsInfo.$(SELECTORS.SETTINGS_KEYBINDS_INFO_TEXT);
  }

  public get settingsKeybindsInfoTextValue() {
    return this.settingsKeybindsInfoText.$(
      SELECTORS.SETTINGS_KEYBINDS_INFO_TEXT_VALUE,
    );
  }

  // Toggle Deafen Section

  public get toggleDeafenKeybindKeys() {
    return this.toggleDeafenSectionKeys.$(SELECTORS.KEYBIND_KEY);
  }

  public get toggleDeafenKeybindKeyInner() {
    return this.toggleDeafenKeybindKeys.$(SELECTORS.KEYBIND_KEY_INNER);
  }

  public get toggleDeafenKeybindKeyInnerValue() {
    return this.toggleDeafenKeybindKeyInner.$$(
      SELECTORS.KEYBIND_KEY_INNER_TEXT,
    );
  }

  public get toggleDeafenKeybindSeparators() {
    return this.toggleDeafenSectionKeys.$$(SELECTORS.KEYBIND_SEPARATOR);
  }

  public get toggleDeafenLabel() {
    return this.toggleDeafenSection.$(SELECTORS.KEYBIND_SECTION_LABEL);
  }

  public get toggleDeafenLabelText() {
    return this.toggleDeafenLabel.$(SELECTORS.KEYBIND_SECTION_LABEL_TEXT);
  }

  public get toggleDeafenResetKeybindButton() {
    return this.toggleDeafenSection.$(SELECTORS.RESET_SINGLE_KEYBIND_BUTTON);
  }

  public get toggleDeafenSection() {
    return this.settingsKeybinds.$(SELECTORS.TOGGLE_DEAFEN_SECTION);
  }

  public get toggleDeafenSectionKeys() {
    return this.toggleDeafenSection.$(SELECTORS.KEYBIND_SECTION_KEYS);
  }

  // Toggle DevMode Section

  public get toggleDevModeKeybindKeys() {
    return this.toggleDevModeSectionKeys.$(SELECTORS.KEYBIND_KEY);
  }

  public get toggleDevModeKeybindKeyInner() {
    return this.toggleDevModeKeybindKeys.$(SELECTORS.KEYBIND_KEY_INNER);
  }

  public get toggleDevModeKeybindKeyInnerValue() {
    return this.toggleDevModeKeybindKeyInner.$$(
      SELECTORS.KEYBIND_KEY_INNER_TEXT,
    );
  }

  public get toggleDevModeKeybindSeparators() {
    return this.toggleDevModeSectionKeys.$$(SELECTORS.KEYBIND_SEPARATOR);
  }

  public get toggleDevModeLabel() {
    return this.toggleDevModeSection.$(SELECTORS.KEYBIND_SECTION_LABEL);
  }

  public get toggleDevModeLabelText() {
    return this.toggleDevModeLabel.$(SELECTORS.KEYBIND_SECTION_LABEL_TEXT);
  }

  public get toggleDevModeResetKeybindButton() {
    return this.toggleDevModeSection.$(SELECTORS.RESET_SINGLE_KEYBIND_BUTTON);
  }

  public get toggleDevModeSection() {
    return this.settingsKeybinds.$(SELECTORS.TOGGLE_DEVMODE_SECTION);
  }

  public get toggleDevModeSectionKeys() {
    return this.toggleDevModeSection.$(SELECTORS.KEYBIND_SECTION_KEYS);
  }

  // Toggle Mute Section

  public get toggleMuteKeybindKeys() {
    return this.toggleMuteSectionKeys.$(SELECTORS.KEYBIND_KEY);
  }

  public get toggleMuteKeybindKeyInner() {
    return this.toggleMuteKeybindKeys.$(SELECTORS.KEYBIND_KEY_INNER);
  }

  public get toggleMuteKeybindKeyInnerValue() {
    return this.toggleMuteKeybindKeyInner.$$(SELECTORS.KEYBIND_KEY_INNER_TEXT);
  }

  public get toggleMuteKeybindSeparators() {
    return this.toggleMuteSectionKeys.$$(SELECTORS.KEYBIND_SEPARATOR);
  }

  public get toggleMuteLabel() {
    return this.toggleMuteSection.$(SELECTORS.KEYBIND_SECTION_LABEL);
  }

  public get toggleMuteLabelText() {
    return this.toggleMuteLabel.$(SELECTORS.KEYBIND_SECTION_LABEL_TEXT);
  }

  public get toggleMuteResetKeybindButton() {
    return this.toggleMuteSection.$(SELECTORS.RESET_SINGLE_KEYBIND_BUTTON);
  }

  public get toggleMuteSection() {
    return this.settingsKeybinds.$(SELECTORS.TOGGLE_MUTE_SECTION);
  }

  public get toggleMuteSectionKeys() {
    return this.toggleMuteSection.$(SELECTORS.KEYBIND_SECTION_KEYS);
  }

  // Retrieve the keybinds for a section
  async getKeybinds(section: Keybinds) {
    let keybinds = [];
    let sectionToValidate;
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      sectionToValidate = await $(`~${section}-section`).$(
        SELECTORS.KEYBIND_SECTION_KEYS,
      );
    } else {
      sectionToValidate = await $(`[name="${section}-section"]`).$(
        SELECTORS.KEYBIND_SECTION_KEYS,
      );
    }
    const separators = await sectionToValidate.$$(SELECTORS.KEYBIND_SEPARATOR);
    const numberOfKeys = separators.length + 1;
    for (let i = 0; i < numberOfKeys; i++) {
      const key = await sectionToValidate?.$$(SELECTORS.KEYBIND_KEY)[i];
      const keyInner = await key
        ?.$(SELECTORS.KEYBIND_KEY_INNER)
        .$(SELECTORS.KEYBIND_KEY_INNER_TEXT);
      const keyInnerText = await keyInner?.getText();
      keybinds.push(keyInnerText);
    }
    return keybinds;
  }

  // Revert buttons click methods

  async clickOnRevertAllKeybinds() {
    const revertButton = await this.revertKeybindsButton;
    await revertButton.click();
  }

  async clickOnRevertDecreaseFontSize() {
    const revertButton = await this.decreaseFontSizeResetKeybindButton;
    await revertButton.click();
  }

  async clickOnRevertHideFocusUplink() {
    const revertButton = await this.hideFocusUplinkResetKeybindButton;
    await revertButton.click();
  }

  async clickOnRevertIncreaseFontSize() {
    const revertButton = await this.increaseFontSizeResetKeybindButton;
    await revertButton.click();
  }

  async clickOnRevertOpenCloseDevTools() {
    const revertButton = await this.openCloseDevToolsResetKeybindButton;
    await revertButton.click();
  }

  async clickOnRevertToggleDeafen() {
    const revertButton = await this.toggleDeafenResetKeybindButton;
    await revertButton.click();
  }

  async clickOnRevertToggleDevMode() {
    const revertButton = await this.toggleDevModeResetKeybindButton;
    await revertButton.click();
  }

  async clickOnRevertToggleMute() {
    const revertButton = await this.toggleMuteResetKeybindButton;
    await revertButton.click();
  }

  // Edit Keybinds
  async editKeybind(section: Keybinds) {
    let sectionToEdit;
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      sectionToEdit = await $(`~${section}-section`).$(
        SELECTORS.KEYBIND_SECTION_KEYS,
      );
    } else if (currentDriver === WINDOWS_DRIVER) {
      sectionToEdit = await $(`[name="${section}-section"]`).$(
        SELECTORS.KEYBIND_SECTION_KEYS,
      );
    }
    await sectionToEdit?.click();
  }
}

export default new SettingsKeybindsScreen();
