require("module-alias/register");
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";

let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_GENERAL: "~settings-general",
};

const SELECTORS_WINDOWS = {
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

const SELECTORS_MACOS = {
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

export default class SettingsKeybindsScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_KEYBINDS);
  }

  // Decrease Font Size UI Locators

  get decreaseFontSizeKeybindKeys() {
    return this.decreaseFontSizeSectionKeys.$(SELECTORS.KEYBIND_KEY);
  }

  get decreaseFontSizeKeybindKeyInner() {
    return this.decreaseFontSizeKeybindKeys.$(SELECTORS.KEYBIND_KEY_INNER);
  }

  get decreaseFontSizeKeybindKeyInnerValue() {
    return this.decreaseFontSizeKeybindKeyInner.$$(
      SELECTORS.KEYBIND_KEY_INNER_TEXT,
    );
  }

  get decreaseFontSizeKeybindSeparators() {
    return this.decreaseFontSizeSectionKeys.$$(SELECTORS.KEYBIND_SEPARATOR);
  }

  get decreaseFontSizeLabel() {
    return this.decreaseFontSizeSection.$(SELECTORS.KEYBIND_SECTION_LABEL);
  }

  get decreaseFontSizeLabelText() {
    return this.decreaseFontSizeLabel.$(SELECTORS.KEYBIND_SECTION_LABEL_TEXT);
  }

  get decreaseFontSizeResetKeybindButton() {
    return this.decreaseFontSizeSection.$(
      SELECTORS.RESET_SINGLE_KEYBIND_BUTTON,
    );
  }

  get decreaseFontSizeSection() {
    return this.settingsKeybinds.$(SELECTORS.DECREASE_FONT_SIZE_SECTION);
  }

  get decreaseFontSizeSectionKeys() {
    return this.decreaseFontSizeSection.$(SELECTORS.KEYBIND_SECTION_KEYS);
  }

  // Hide Focus Uplink UI Locators

  get hideFocusUplinkKeybindKeys() {
    return this.hideFocusUplinkSectionKeys.$(SELECTORS.KEYBIND_KEY);
  }

  get hideFocusUplinkKeybindKeyInner() {
    return this.hideFocusUplinkKeybindKeys.$(SELECTORS.KEYBIND_KEY_INNER);
  }

  get hideFocusUplinkKeybindKeyInnerValue() {
    return this.hideFocusUplinkKeybindKeyInner.$$(
      SELECTORS.KEYBIND_KEY_INNER_TEXT,
    );
  }

  get hideFocusUplinkKeybindSeparators() {
    return this.hideFocusUplinkSectionKeys.$$(SELECTORS.KEYBIND_SEPARATOR);
  }

  get hideFocusUplinkLabel() {
    return this.hideFocusUplinkSection.$(SELECTORS.KEYBIND_SECTION_LABEL);
  }

  get hideFocusUplinkLabelText() {
    return this.hideFocusUplinkLabel.$(SELECTORS.KEYBIND_SECTION_LABEL_TEXT);
  }

  get hideFocusUplinkResetKeybindButton() {
    return this.hideFocusUplinkSection.$(SELECTORS.RESET_SINGLE_KEYBIND_BUTTON);
  }

  get hideFocusUplinkSection() {
    return this.settingsKeybinds.$(SELECTORS.HIDE_FOCUS_UPLINK_SECTION);
  }

  get hideFocusUplinkSectionKeys() {
    return this.hideFocusUplinkSection.$(SELECTORS.KEYBIND_SECTION_KEYS);
  }

  // Increase Font Size UI Locators

  get increaseFontSizeKeybindKeys() {
    return this.increaseFontSizeSectionKeys.$(SELECTORS.KEYBIND_KEY);
  }

  get increaseFontSizeKeybindKeyInner() {
    return this.increaseFontSizeKeybindKeys.$(SELECTORS.KEYBIND_KEY_INNER);
  }

  get increaseFontSizeKeybindKeyInnerValue() {
    return this.increaseFontSizeKeybindKeyInner.$$(
      SELECTORS.KEYBIND_KEY_INNER_TEXT,
    );
  }

  get increaseFontSizeKeybindSeparators() {
    return this.increaseFontSizeSectionKeys.$$(SELECTORS.KEYBIND_SEPARATOR);
  }

  get increaseFontSizeLabel() {
    return this.increaseFontSizeSection.$(SELECTORS.KEYBIND_SECTION_LABEL);
  }

  get increaseFontSizeLabelText() {
    return this.increaseFontSizeLabel.$(SELECTORS.KEYBIND_SECTION_LABEL_TEXT);
  }

  get increaseFontSizeResetKeybindButton() {
    return this.increaseFontSizeSection.$(
      SELECTORS.RESET_SINGLE_KEYBIND_BUTTON,
    );
  }

  get increaseFontSizeSection() {
    return this.settingsKeybinds.$(SELECTORS.INCREASE_FONT_SIZE_SECTION);
  }

  get increaseFontSizeSectionKeys() {
    return this.increaseFontSizeSection.$(SELECTORS.KEYBIND_SECTION_KEYS);
  }

  // Open Close DevTools Section

  get openCloseDevToolsKeybindKeys() {
    return this.openCloseDevToolsSectionKeys.$(SELECTORS.KEYBIND_KEY);
  }

  get openCloseDevToolsKeybindKeyInner() {
    return this.openCloseDevToolsKeybindKeys.$(SELECTORS.KEYBIND_KEY_INNER);
  }

  get openCloseDevToolsKeybindKeyInnerValue() {
    return this.openCloseDevToolsKeybindKeyInner.$$(
      SELECTORS.KEYBIND_KEY_INNER_TEXT,
    );
  }

  get openCloseDevToolsKeybindSeparators() {
    return this.openCloseDevToolsSectionKeys.$$(SELECTORS.KEYBIND_SEPARATOR);
  }

  get openCloseDevToolsLabel() {
    return this.openCloseDevToolsSection.$(SELECTORS.KEYBIND_SECTION_LABEL);
  }

  get openCloseDevToolsLabelText() {
    return this.openCloseDevToolsLabel.$(SELECTORS.KEYBIND_SECTION_LABEL_TEXT);
  }

  get openCloseDevToolsResetKeybindButton() {
    return this.openCloseDevToolsSection.$(
      SELECTORS.RESET_SINGLE_KEYBIND_BUTTON,
    );
  }

  get openCloseDevToolsSection() {
    return this.settingsKeybinds.$(SELECTORS.OPEN_CLOSE_DEV_TOOLS_SECTION);
  }

  get openCloseDevToolsSectionKeys() {
    return this.openCloseDevToolsSection.$(SELECTORS.KEYBIND_SECTION_KEYS);
  }

  // Reset Keybinds Section

  get resetKeybindsSection() {
    return this.settingsKeybinds.$(SELECTORS.RESET_KEYBINDS_SECTION);
  }

  get resetKeybindsDescription() {
    return this.resetKeybindsSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get resetKeybindsHeader() {
    return this.resetKeybindsSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get revertKeybindsButton() {
    return this.resetKeybindsSection.$(SELECTORS.REVERT_KEYBINDS_BUTTON);
  }

  // Settings Keybinds Main UI Locators

  get settingsKeybinds() {
    return $(SELECTORS.SETTINGS_KEYBINDS);
  }

  get settingsKeybindsInfo() {
    return this.settingsKeybinds.$(SELECTORS.SETTINGS_KEYBINDS_INFO);
  }

  get settingsKeybindsInfoText() {
    return this.settingsKeybindsInfo.$(SELECTORS.SETTINGS_KEYBINDS_INFO_TEXT);
  }

  get settingsKeybindsInfoTextValue() {
    return this.settingsKeybindsInfoText.$(
      SELECTORS.SETTINGS_KEYBINDS_INFO_TEXT_VALUE,
    );
  }

  // Toggle Deafen Section

  get toggleDeafenKeybindKeys() {
    return this.toggleDeafenSectionKeys.$(SELECTORS.KEYBIND_KEY);
  }

  get toggleDeafenKeybindKeyInner() {
    return this.toggleDeafenKeybindKeys.$(SELECTORS.KEYBIND_KEY_INNER);
  }

  get toggleDeafenKeybindKeyInnerValue() {
    return this.toggleDeafenKeybindKeyInner.$$(
      SELECTORS.KEYBIND_KEY_INNER_TEXT,
    );
  }

  get toggleDeafenKeybindSeparators() {
    return this.toggleDeafenSectionKeys.$$(SELECTORS.KEYBIND_SEPARATOR);
  }

  get toggleDeafenLabel() {
    return this.toggleDeafenSection.$(SELECTORS.KEYBIND_SECTION_LABEL);
  }

  get toggleDeafenLabelText() {
    return this.toggleDeafenLabel.$(SELECTORS.KEYBIND_SECTION_LABEL_TEXT);
  }

  get toggleDeafenResetKeybindButton() {
    return this.toggleDeafenSection.$(SELECTORS.RESET_SINGLE_KEYBIND_BUTTON);
  }

  get toggleDeafenSection() {
    return this.settingsKeybinds.$(SELECTORS.TOGGLE_DEAFEN_SECTION);
  }

  get toggleDeafenSectionKeys() {
    return this.toggleDeafenSection.$(SELECTORS.KEYBIND_SECTION_KEYS);
  }

  // Toggle DevMode Section

  get toggleDevModeKeybindKeys() {
    return this.toggleDevModeSectionKeys.$(SELECTORS.KEYBIND_KEY);
  }

  get toggleDevModeKeybindKeyInner() {
    return this.toggleDevModeKeybindKeys.$(SELECTORS.KEYBIND_KEY_INNER);
  }

  get toggleDevModeKeybindKeyInnerValue() {
    return this.toggleDevModeKeybindKeyInner.$$(
      SELECTORS.KEYBIND_KEY_INNER_TEXT,
    );
  }

  get toggleDevModeKeybindSeparators() {
    return this.toggleDevModeSectionKeys.$$(SELECTORS.KEYBIND_SEPARATOR);
  }

  get toggleDevModeLabel() {
    return this.toggleDevModeSection.$(SELECTORS.KEYBIND_SECTION_LABEL);
  }

  get toggleDevModeLabelText() {
    return this.toggleDevModeLabel.$(SELECTORS.KEYBIND_SECTION_LABEL_TEXT);
  }

  get toggleDevModeResetKeybindButton() {
    return this.toggleDevModeSection.$(SELECTORS.RESET_SINGLE_KEYBIND_BUTTON);
  }

  get toggleDevModeSection() {
    return this.settingsKeybinds.$(SELECTORS.TOGGLE_DEVMODE_SECTION);
  }

  get toggleDevModeSectionKeys() {
    return this.toggleDevModeSection.$(SELECTORS.KEYBIND_SECTION_KEYS);
  }

  // Toggle Mute Section

  get toggleMuteKeybindKeys() {
    return this.toggleMuteSectionKeys.$(SELECTORS.KEYBIND_KEY);
  }

  get toggleMuteKeybindKeyInner() {
    return this.toggleMuteKeybindKeys.$(SELECTORS.KEYBIND_KEY_INNER);
  }

  get toggleMuteKeybindKeyInnerValue() {
    return this.toggleMuteKeybindKeyInner.$$(SELECTORS.KEYBIND_KEY_INNER_TEXT);
  }

  get toggleMuteKeybindSeparators() {
    return this.toggleMuteSectionKeys.$$(SELECTORS.KEYBIND_SEPARATOR);
  }

  get toggleMuteLabel() {
    return this.toggleMuteSection.$(SELECTORS.KEYBIND_SECTION_LABEL);
  }

  get toggleMuteLabelText() {
    return this.toggleMuteLabel.$(SELECTORS.KEYBIND_SECTION_LABEL_TEXT);
  }

  get toggleMuteResetKeybindButton() {
    return this.toggleMuteSection.$(SELECTORS.RESET_SINGLE_KEYBIND_BUTTON);
  }

  get toggleMuteSection() {
    return this.settingsKeybinds.$(SELECTORS.TOGGLE_MUTE_SECTION);
  }

  get toggleMuteSectionKeys() {
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
    } else if (currentDriver === WINDOWS_DRIVER) {
      sectionToValidate = await $(`[name="${section}-section"]`).$(
        SELECTORS.KEYBIND_SECTION_KEYS,
      );
    }
    const separators = await sectionToValidate.$$(SELECTORS.KEYBIND_SEPARATOR);
    const numberOfKeys = separators.length + 1;
    for (let i = 0; i < numberOfKeys; i++) {
      const key = await sectionToValidate.$$(SELECTORS.KEYBIND_KEY)[i];
      const keyInner = await key
        .$(SELECTORS.KEYBIND_KEY_INNER)
        .$(SELECTORS.KEYBIND_KEY_INNER_TEXT);
      const keyInnerText = await keyInner.getText();
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
