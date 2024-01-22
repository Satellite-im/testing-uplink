require("module-alias/register");
import {
  getClipboardMacOS,
  getUplinkWindowHandle,
  hoverOnMacOS,
  hoverOnWindows,
  rightClickOnMacOS,
  rightClickOnWindows,
  selectFileOnMacos,
  selectFileOnWindows,
} from "@helpers/commands";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";

const { keyboard, Key } = require("@nut-tree/nut-js");
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_PROFILE: "~settings-profile",
};

const SELECTORS_WINDOWS = {
  ADD_PICTURE_BUTTON: '[name="add-picture-button"]',
  CLEAR_AVATAR_BUTTON: "[name='clear-avatar']",
  CLEAR_BANNER_BUTTON: "[name='clear-banner']",
  CONTEXT_MENU: '[name="Context Menu"]',
  CONTEXT_MENU_COPY_DID_KEY: "<Button>[2]",
  CONTEXT_MENU_COPY_ID: "<Button>[1]",
  COPY_ID_BUTTON: '[name="copy-id-button"]',
  DISMISS_BUTTON: '[name="welcome-message-dismiss"]',
  INPUT_ERROR: '[name="input-error"]',
  INPUT_ERROR_MESSAGE: "<Text>",
  ONLINE_STATUS_SECTION: "[name='online-status-section']",
  PROFILE_BANNER: '[name="profile-banner"]',
  PROFILE_BANNER_CLEAR: '[name="clear-banner"]',
  PROFILE_BANNER_TOOLTIP: "<Text>",
  PROFILE_CONTENT: '[name="profile-content"]',
  PROFILE_HEADER: '[name="profile-header"]',
  PROFILE_PICTURE: '[name="profile-picture"]',
  PROFILE_PICTURE_CLEAR: '[name="clear-avatar"]',
  RECOVERY_SEED_SECTION: "[name='recovery-seed-section']",
  REVEAL_RECOVERY_SEED_BUTTON: "[name='reveal-recovery-seed-button']",
  SEED_WORD_VALUE_TEXT: "<Text>",
  SEED_WORDS_SECTION: "[name='seed-words-section']",
  SELECTOR: "<ComboBox>",
  SELECTOR_CURRENT_VALUE: "//Group/Text",
  SELECTOR_OPTION: '[name="selector-option"]',
  SELECTOR_OPTION_INDICATOR_DO_NOT_DISTURB: "[name='indicator-do-not-disturb']",
  SELECTOR_OPTION_INDICATOR_IDLE: "[name='indicator-idle']",
  SELECTOR_OPTION_INDICATOR_OFFLINE: "[name='indicator-offline']",
  SELECTOR_OPTION_INDICATOR_ONLINE: "[name='indicator-online']",
  SELECTOR_OPTIONS_LIST: '[name="selector-options-list"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  STATUS_INPUT: '[name="status-input"]',
  STATUS_LABEL: '//Text[@Name="profile-status-label"]/Text',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  USERNAME_INPUT: '[name="username-input"]',
  USERNAME_LABEL: '//Text[@Name="profile-username-label"]/Text',
  YOUR_NEW_PROFILE: '[name="new-profile-welcome"]',
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE: '[name="welcome-message-desc"]',
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE_VALUE: "<Text>",
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO: '[name="welcome-message-cta"]',
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO_VALUE: "<Text>",
  YOUR_NEW_PROFILE_HEADER_TEXT: '[name="welcome-message"]',
  YOUR_NEW_PROFILE_HEADER_TEXT_VALUE: '//Text[@Name="YOUR NEW PROFILE!"]',
};

const SELECTORS_MACOS = {
  ADD_PICTURE_BUTTON: "~add-picture-button",
  CLEAR_AVATAR_BUTTON: "clear-avatar",
  CLEAR_BANNER_BUTTON: "clear-banner",
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MENU_COPY_DID_KEY:
    '-ios class chain:**/XCUIElementTypeButton[`label == "copy-id-context"`][2]',
  CONTEXT_MENU_COPY_ID:
    '-ios class chain:**/XCUIElementTypeButton[`label == "copy-id-context"`][1]',
  COPY_ID_BUTTON: "~copy-id-button",
  DISMISS_BUTTON: "~welcome-message-dismiss",
  INPUT_ERROR: "~input-error",
  INPUT_ERROR_MESSAGE: "-ios class chain:**/XCUIElementTypeStaticText",
  ONLINE_STATUS_SECTION: "~online-status-section",
  PROFILE_BANNER: "~profile-banner",
  PROFILE_BANNER_CLEAR: "~clear-banner",
  PROFILE_BANNER_TOOLTIP:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  PROFILE_CONTENT: "~profile-content",
  PROFILE_HEADER: "~profile-header",
  PROFILE_PICTURE: "~profile-picture",
  PROFILE_PICTURE_CLEAR: "~clear-avatar",
  RECOVERY_SEED_SECTION: "~recovery-seed-section",
  REVEAL_RECOVERY_SEED_BUTTON: "~reveal-recovery-seed-button",
  SEED_WORD_VALUE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  SEED_WORDS_SECTION: "~seed-words-section",
  SELECTOR: "~Selector",
  SELECTOR_CURRENT_VALUE:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SELECTOR_OPTION: "~selector-option",
  SELECTOR_OPTION_INDICATOR_DO_NOT_DISTURB: "~indicator-do-not-disturb",
  SELECTOR_OPTION_INDICATOR_IDLE: "~indicator-idle",
  SELECTOR_OPTION_INDICATOR_OFFLINE: "~indicator-offline",
  SELECTOR_OPTION_INDICATOR_ONLINE: "~indicator-online",
  SELECTOR_OPTIONS_LIST: "~selector-options-list",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  STATUS_INPUT: "~status-input",
  STATUS_LABEL: "-ios class chain:**/XCUIElementTypeStaticText[2]",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  USERNAME_INPUT: "~username-input",
  USERNAME_LABEL: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  YOUR_NEW_PROFILE: "~new-profile-welcome",
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE: "~welcome-message-desc",
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO: "~welcome-message-cta",
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  YOUR_NEW_PROFILE_HEADER_TEXT: "~welcome-message",
  YOUR_NEW_PROFILE_HEADER_TEXT_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsProfileScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_PROFILE);
  }

  get addPictureButton() {
    return $(SELECTORS.ADD_PICTURE_BUTTON);
  }

  get clearAvatarButton() {
    return $(SELECTORS.CLEAR_AVATAR_BUTTON);
  }
  get clearBannerButton() {
    return $(SELECTORS.CLEAR_BANNER_BUTTON);
  }

  get contextMenuProfile() {
    return this.profileHeader.$(SELECTORS.CONTEXT_MENU);
  }

  get contextMenuCopyDidKey() {
    return $(SELECTORS.CONTEXT_MENU_COPY_DID_KEY);
  }

  get contextMenuCopyId() {
    return $(SELECTORS.CONTEXT_MENU_COPY_ID);
  }

  get copyIDButton() {
    return $(SELECTORS.PROFILE_CONTENT).$(SELECTORS.COPY_ID_BUTTON);
  }

  get copyIDTooltip() {
    return $(SELECTORS.PROFILE_CONTENT).$(SELECTORS.TOOLTIP);
  }

  get copyIDTooltipText() {
    return $(SELECTORS.PROFILE_CONTENT)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get dismissButton() {
    return $(SELECTORS.DISMISS_BUTTON);
  }

  get inputError() {
    return $(SELECTORS.INPUT_ERROR);
  }

  get inputErrorMessage() {
    return $(SELECTORS.INPUT_ERROR).$(SELECTORS.INPUT_ERROR_MESSAGE);
  }

  get onlineStatusSection() {
    return $(SELECTORS.ONLINE_STATUS_SECTION);
  }

  get onlineStatusDescription() {
    return $(SELECTORS.ONLINE_STATUS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get onlineStatusHeader() {
    return $(SELECTORS.ONLINE_STATUS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get profileBanner() {
    return $(SELECTORS.PROFILE_BANNER);
  }

  get profileBannerClear() {
    return $(SELECTORS.PROFILE_BANNER_CLEAR);
  }

  get profileBannerTooltip() {
    return $(SELECTORS.PROFILE_BANNER).$(SELECTORS.PROFILE_BANNER_TOOLTIP);
  }

  get profileContent() {
    return $(SELECTORS.PROFILE_CONTENT);
  }

  get profileHeader() {
    return $(SELECTORS.PROFILE_HEADER);
  }

  get profilePicture() {
    return $(SELECTORS.PROFILE_PICTURE);
  }

  get profilePictureClear() {
    return $(SELECTORS.PROFILE_PICTURE_CLEAR);
  }

  get recoverySeedDescription() {
    return $(SELECTORS.RECOVERY_SEED_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get recoverySeedHeader() {
    return $(SELECTORS.RECOVERY_SEED_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get recoverySeedSection() {
    return $(SELECTORS.RECOVERY_SEED_SECTION);
  }

  get revealRecoverySeedButton() {
    return $(SELECTORS.REVEAL_RECOVERY_SEED_BUTTON);
  }

  get seedWordsDescription() {
    return $(SELECTORS.SEED_WORDS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get seedWordsHeader() {
    return $(SELECTORS.SEED_WORDS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get seedWordsSection() {
    return $(SELECTORS.SEED_WORDS_SECTION);
  }

  get seedWordsWarningPhraseHidden() {
    return $$(SELECTORS.SETTINGS_CONTROL)[2].$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get seedWordsWarningPhraseNotHidden() {
    return $$(SELECTORS.SETTINGS_CONTROL)[3].$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get selector() {
    return this.settingsProfile.$(SELECTORS.SELECTOR);
  }

  get selectorCurrentValue() {
    return this.selector.$(SELECTORS.SELECTOR_CURRENT_VALUE);
  }

  get selectorOption() {
    return this.selector.$(SELECTORS.SELECTOR_OPTION);
  }

  get selectorOptionIndicatorDoNotDisturb() {
    return this.selectorOptionsList.$(
      SELECTORS.SELECTOR_OPTION_INDICATOR_DO_NOT_DISTURB,
    );
  }

  get selectorOptionIndicatorIdle() {
    return this.selectorOptionsList.$(SELECTORS.SELECTOR_OPTION_INDICATOR_IDLE);
  }

  get selectorOptionIndicatorOffline() {
    return this.selectorOptionsList.$(
      SELECTORS.SELECTOR_OPTION_INDICATOR_OFFLINE,
    );
  }

  get selectorOptionIndicatorOnline() {
    return this.selectorOptionsList.$(
      SELECTORS.SELECTOR_OPTION_INDICATOR_ONLINE,
    );
  }

  get selectorOptionsList() {
    return this.selector.$(SELECTORS.SELECTOR_OPTIONS_LIST);
  }

  get settingsProfile() {
    return $(SELECTORS.SETTINGS_PROFILE);
  }

  get statusInput() {
    return $(SELECTORS.STATUS_INPUT);
  }

  get statusLabel() {
    return $(SELECTORS.PROFILE_CONTENT).$(SELECTORS.STATUS_LABEL);
  }

  get usernameInput() {
    return $(SELECTORS.USERNAME_INPUT);
  }

  get usernameLabel() {
    return $(SELECTORS.PROFILE_CONTENT).$(SELECTORS.USERNAME_LABEL);
  }

  get yourNewProfile() {
    return $(SELECTORS.YOUR_NEW_PROFILE);
  }

  get yourNewProfileDescriptionTextOne() {
    return $(SELECTORS.YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE);
  }

  get yourNewProfileDescriptionTextOneValue() {
    return $(SELECTORS.YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE).$(
      SELECTORS.YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE_VALUE,
    );
  }

  get yourNewProfileDescriptionTextTwo() {
    return $(SELECTORS.YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO);
  }

  get yourNewProfileDescriptionTextTwoValue() {
    return $(SELECTORS.YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO).$(
      SELECTORS.YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO_VALUE,
    );
  }

  get yourNewProfileHeaderText() {
    return $(SELECTORS.YOUR_NEW_PROFILE_HEADER_TEXT);
  }

  get yourNewProfileHeaderTextValue() {
    return $(SELECTORS.YOUR_NEW_PROFILE_HEADER_TEXT).$(
      SELECTORS.YOUR_NEW_PROFILE_HEADER_TEXT_VALUE,
    );
  }

  async clickOnAddPictureButton() {
    const button = await this.profilePicture;
    await button.click();
  }

  async clickOnCopyIDButton() {
    const button = await this.copyIDButton;
    await button.click();
  }

  async clickOnDismissButton() {
    const button = await this.dismissButton;
    await button.click();
  }

  async deleteStatus() {
    const input = await this.statusInput;
    await input.click();
    await input.clearValue();
  }

  async enterStatus(status: string) {
    const input = await this.statusInput;
    await input.clearValue();
    await input.setValue(status);
    const statusInputText = await input.getText();
    if (statusInputText !== status) {
      await this.enterStatus(status);
    }
  }

  async enterUsername(username: string) {
    const input = await this.usernameInput;
    await input.clearValue();
    await input.setValue(username);
    const usernameInputText = await input.getText();
    if (usernameInputText !== username) {
      await this.enterUsername(username);
    }
  }

  async getCopiedDidFromStatusInput() {
    const statusInputValue = await this.getStatusInputValue();
    return statusInputValue;
  }

  async getCopyIDButtonText() {
    const text = await this.copyIDButton;
    return text;
  }

  async getShortDidKey(didKey: string) {
    const userKey = didKey;
    const abbreviatedUserKey = "#" + userKey.slice(-8);
    return abbreviatedUserKey;
  }

  async getStatusInputElement() {
    const statusInput = await this.statusInput;
    return statusInput;
  }

  async getStatusInputValue() {
    const statusInput = await this.statusInput;
    const statusInputText = await statusInput.getText();
    return statusInputText;
  }

  async hoverOnBanner() {
    const bannerLocator = await this.profileBanner;
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await hoverOnMacOS(bannerLocator);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await hoverOnWindows(bannerLocator);
    }
  }

  async hoverOnCopyID() {
    const copyIdButton = await this.copyIDButton;
    await this.hoverOnElement(copyIdButton);
  }

  async pasteUserNameInStatus(username: string) {
    // Assuming that user already clicked on Copy ID button
    // If driver is macos, then get clipboard and pass it to enterStatus function
    const currentDriver = await this.getCurrentDriver();
    const statusInput = await this.statusInput;
    if (currentDriver === MACOS_DRIVER) {
      const userKey = await getClipboardMacOS();
      await this.enterStatus(userKey);
    } else if (currentDriver === WINDOWS_DRIVER) {
      // If driver is windows, then click on status input to place cursor there and simulate a control + v
      await browser.pause(1000);
      await statusInput.click();
      await statusInput.clearValue();
      await keyboard.type(Key.LeftControl, Key.V);
    }
    await statusInput.waitUntil(
      async () => {
        const statusInputText = await statusInput.getText();
        return await statusInputText.includes(username + "#");
      },
      {
        timeout: 5000,
        timeoutMsg:
          "Expected status input to contain username# after 5 seconds",
      },
    );
  }

  async pasteUserKeyInStatus() {
    // Assuming that user already clicked on Copy ID button
    // If driver is macos, then get clipboard and pass it to enterStatus function
    const currentDriver = await this.getCurrentDriver();
    const statusInput = await this.statusInput;
    if (currentDriver === MACOS_DRIVER) {
      const userKey = await getClipboardMacOS();
      await this.enterStatus(userKey);
    } else if (currentDriver === WINDOWS_DRIVER) {
      // If driver is windows, then click on status input to place cursor there and simulate a control + v
      await browser.pause(1000);
      await statusInput.click();
      await statusInput.clearValue();
      await keyboard.type(Key.LeftControl, Key.V);
    }
    await statusInput.waitUntil(
      async () => {
        const statusInputText = await statusInput.getText();
        return await statusInputText.includes("did:key");
      },
      {
        timeout: 5000,
        timeoutMsg: "Expected status input to contain did key after 5 seconds",
      },
    );
  }

  async selectBannerPicture(relativePath: string) {
    // Invoke File Selection method depending on current OS driver
    // If Windows driver is running, first retrieve the current context and pass it to file selection function
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      const profileBannerMac = await this.profileBanner;
      await profileBannerMac.click();
      await selectFileOnMacos(relativePath);
    } else if (currentDriver === WINDOWS_DRIVER) {
      const uplinkContext = await getUplinkWindowHandle();
      const profileBannerWindows = await this.profileBanner;
      await profileBannerWindows.click();
      await selectFileOnWindows(relativePath, uplinkContext);
    }
  }

  async selectProfilePicture(relativePath: string) {
    //
    // Invoke File Selection method depending on current OS driver
    // If Windows driver is running, first retrieve the current context and pass it to file selection function
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.clickOnAddPictureButton();
      await selectFileOnMacos(relativePath);
    } else if (currentDriver === WINDOWS_DRIVER) {
      const uplinkContext = await getUplinkWindowHandle();
      const profilePictureImage = await this.profilePicture;
      await profilePictureImage.click();
      await selectFileOnWindows(relativePath, uplinkContext);
    }
  }

  async validateBannerPictureIsShown() {
    // Validate that profile banner is displayed on screen
    const bannerImage = await this.profileBanner;
    await bannerImage.waitForExist();
  }

  async validateProfilePictureIsShown() {
    // Validate that profile picture is displayed on screen
    const profilePictureImage = await this.profilePicture;
    await profilePictureImage.waitForExist();
  }

  async validateSettingsProfileIsShown() {
    const settingsProfile = await this.settingsProfile;
    await settingsProfile.waitForExist();
  }

  // Copy ID Context Menu

  async clickOnContextMenuCopyDidKey() {
    const contextMenuCopyDidKey = await this.contextMenuCopyDidKey;
    await contextMenuCopyDidKey.click();
  }

  async clickOnContextMenuCopyId() {
    const contextMenuCopyId = await this.contextMenuCopyId;
    await contextMenuCopyId.click();
  }

  async openCopyIDContextMenu() {
    const copyIdButton = await this.copyIDButton;
    await copyIdButton.click();
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(copyIdButton);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(copyIdButton);
    }
    const contextMenu = await this.contextMenu;
    await contextMenu.waitForExist();
  }

  // Online Status Selector Methods
  async clickOnSelector() {
    const statusSelector = await this.selector;
    await statusSelector.click();
  }

  async selectDoNotDisturbStatus() {
    // Open selector
    await this.clickOnSelector();

    // Select the correct option
    const doNotDisturbStatusOption =
      await this.selectorOptionIndicatorDoNotDisturb;
    await doNotDisturbStatusOption.click();

    // Close selector and wait until toast notification is closed
    await this.clickOnSelector();
    await this.waitUntilNotificationIsClosed();
  }

  async selectIdleStatus() {
    // Open selector
    await this.clickOnSelector();

    // Select the correct option
    const idleStatusOption = await this.selectorOptionIndicatorIdle;
    await idleStatusOption.click();

    // Close selector and wait until toast notification is closed
    await this.clickOnSelector();
    await this.waitUntilNotificationIsClosed();
  }

  async selectOfflineStatus() {
    // Open selector
    await this.clickOnSelector();

    // Select the correct option
    const offlineStatusOption = await this.selectorOptionIndicatorOffline;
    await offlineStatusOption.click();

    // Close selector and wait until toast notification is closed
    await this.clickOnSelector();
    await this.waitUntilNotificationIsClosed();
  }

  async selectOnlineStatus() {
    // Open selector
    await this.clickOnSelector();

    // Select the correct option
    const onlineStatusOption = await this.selectorOptionIndicatorOnline;
    await onlineStatusOption.click();

    // Close selector and wait until toast notification is closed
    await this.clickOnSelector();
    await this.waitUntilNotificationIsClosed();
  }

  // Recovery Seed Methods

  async clickOnRevealRecoverySeed() {
    const revealRecoverySeedButton = await this.revealRecoverySeedButton;
    await revealRecoverySeedButton.click();
  }

  async getSeedWord(numberOfWord: string) {
    const currentDriver = await this.getCurrentDriver();
    let locatorOfWord: string = "";
    let word: string = "";
    if (currentDriver === WINDOWS_DRIVER) {
      locatorOfWord = '[name="seed-word-value-' + numberOfWord + '"]';
    } else {
      locatorOfWord = "~seed-word-value-" + numberOfWord;
    }
    word = await $(locatorOfWord).$(SELECTORS.SEED_WORD_VALUE_TEXT).getText();
    return word;
  }

  async getSeedWords() {
    let seedWords: string[] = [];
    for (let i = 1; i <= 12; i++) {
      seedWords.push(await this.getSeedWord(i.toString()));
    }
    return seedWords;
  }
}
