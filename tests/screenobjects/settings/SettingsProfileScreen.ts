import {
  getClipboardMacOS,
  hoverOnMacOS,
  hoverOnWindows,
  selectFileOnMacos,
  selectFileOnWindows,
} from "../../helpers/commands";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "../../helpers/constants";
import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
const robot = require("robotjs");
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_PROFILE: "~settings-profile",
};

const SELECTORS_WINDOWS = {
  ADD_PICTURE_BUTTON: '[name="add-picture-button"]',
  COPY_ID_BUTTON: '[name="copy-id-button"]',
  DISMISS_BUTTON: '[name="welcome-message-dismiss"]',
  INPUT_ERROR: '[name="input-error"]',
  INPUT_ERROR_MESSAGE: "//Text",
  PROFILE_BANNER: '[name="profile-banner"]',
  PROFILE_BANNER_CLEAR: '[name="clear-banner"]',
  PROFILE_BANNER_TOOLTIP: "//Text",
  PROFILE_CONTENT: '[name="profile-content"]',
  PROFILE_HEADER: '[name="profile-header"]',
  PROFILE_PICTURE: '[name="profile-picture"]',
  PROFILE_PICTURE_CLEAR: '[name="clear-avatar"]',
  STATUS_INPUT: '[name="status-input"]',
  STATUS_LABEL: '//Text[@Name="profile-status-label"]/Text',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  USERNAME_INPUT: '[name="username-input"]',
  USERNAME_LABEL: '//Text[@Name="profile-username-label"]/Text',
  YOUR_NEW_PROFILE: '[name="new-profile-welcome"]',
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE: '[name="welcome-message-desc"]',
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE_VALUE: "//Text",
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO: '[name="welcome-message-cta"]',
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO_VALUE: "//Text",
  YOUR_NEW_PROFILE_HEADER_TEXT: '[name="welcome-message"]',
  YOUR_NEW_PROFILE_HEADER_TEXT_VALUE: '//Text[@Name="YOUR NEW PROFILE!"]',
};

const SELECTORS_MACOS = {
  ADD_PICTURE_BUTTON: "~add-picture-button",
  COPY_ID_BUTTON: "~copy-id-button",
  DISMISS_BUTTON: "~welcome-message-dismiss",
  INPUT_ERROR: "~input-error",
  INPUT_ERROR_MESSAGE: "-ios class chain:**/XCUIElementTypeStaticText",
  PROFILE_BANNER: "~profile-banner",
  PROFILE_BANNER_CLEAR: "~clear-banner",
  PROFILE_BANNER_TOOLTIP:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  PROFILE_CONTENT: "~profile-content",
  PROFILE_HEADER: "~profile-header",
  PROFILE_PICTURE: "~profile-picture",
  PROFILE_PICTURE_CLEAR: "~clear-avatar",
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

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsProfileScreen extends SettingsBaseScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.SETTINGS_PROFILE);
  }

  get addPictureButton() {
    return this.instance.$(SELECTORS.ADD_PICTURE_BUTTON);
  }

  get copyIDButton() {
    return this.instance
      .$(SELECTORS.PROFILE_CONTENT)
      .$(SELECTORS.COPY_ID_BUTTON);
  }

  get copyIDTooltip() {
    return this.instance.$(SELECTORS.PROFILE_CONTENT).$(SELECTORS.TOOLTIP);
  }

  get copyIDTooltipText() {
    return this.instance
      .$(SELECTORS.PROFILE_CONTENT)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get dismissButton() {
    return this.instance.$(SELECTORS.DISMISS_BUTTON);
  }

  get inputError() {
    return this.instance.$(SELECTORS.INPUT_ERROR);
  }

  get inputErrorMessage() {
    return this.instance
      .$(SELECTORS.INPUT_ERROR)
      .$(SELECTORS.INPUT_ERROR_MESSAGE);
  }

  get profileBanner() {
    return this.instance.$(SELECTORS.PROFILE_BANNER);
  }

  get profileBannerClear() {
    return this.instance.$(SELECTORS.PROFILE_BANNER_CLEAR);
  }

  get profileBannerTooltip() {
    return this.instance
      .$(SELECTORS.PROFILE_BANNER)
      .$(SELECTORS.PROFILE_BANNER_TOOLTIP);
  }

  get profileContent() {
    return this.instance.$(SELECTORS.PROFILE_CONTENT);
  }

  get profileHeader() {
    return this.instance.$(SELECTORS.PROFILE_HEADER);
  }

  get profilePicture() {
    return this.instance.$(SELECTORS.PROFILE_PICTURE);
  }

  get profilePictureClear() {
    return this.instance.$(SELECTORS.PROFILE_PICTURE_CLEAR);
  }

  get settingsProfile() {
    return this.instance.$(SELECTORS.SETTINGS_PROFILE);
  }

  get statusInput() {
    return this.instance.$(SELECTORS.STATUS_INPUT);
  }

  get statusLabel() {
    return this.instance.$(SELECTORS.PROFILE_CONTENT).$(SELECTORS.STATUS_LABEL);
  }

  get usernameInput() {
    return this.instance.$(SELECTORS.USERNAME_INPUT);
  }

  get usernameLabel() {
    return this.instance
      .$(SELECTORS.PROFILE_CONTENT)
      .$(SELECTORS.USERNAME_LABEL);
  }

  get yourNewProfile() {
    return this.instance.$(SELECTORS.YOUR_NEW_PROFILE);
  }

  get yourNewProfileDescriptionTextOne() {
    return this.instance.$(SELECTORS.YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE);
  }

  get yourNewProfileDescriptionTextOneValue() {
    return this.instance
      .$(SELECTORS.YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE)
      .$(SELECTORS.YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE_VALUE);
  }

  get yourNewProfileDescriptionTextTwo() {
    return this.instance.$(SELECTORS.YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO);
  }

  get yourNewProfileDescriptionTextTwoValue() {
    return this.instance
      .$(SELECTORS.YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO)
      .$(SELECTORS.YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO_VALUE);
  }

  get yourNewProfileHeaderText() {
    return this.instance.$(SELECTORS.YOUR_NEW_PROFILE_HEADER_TEXT);
  }

  get yourNewProfileHeaderTextValue() {
    return this.instance
      .$(SELECTORS.YOUR_NEW_PROFILE_HEADER_TEXT)
      .$(SELECTORS.YOUR_NEW_PROFILE_HEADER_TEXT_VALUE);
  }

  async clickOnAddPictureButton() {
    await this.addPictureButton.click();
  }

  async clickOnCopyIDButton() {
    await this.copyIDButton.click();
  }

  async clickOnDismissButton() {
    await this.dismissButton.click();
  }

  async deleteStatus() {
    await this.statusInput.click();
    await this.statusInput.clearValue();
  }

  async enterStatus(status: string) {
    await this.statusInput.click();
    await this.statusInput.clearValue();
    await this.statusInput.addValue(status);
  }

  async enterUsername(username: string) {
    await this.usernameInput.click();
    await this.usernameInput.clearValue();
    await this.usernameInput.addValue(username);
  }

  async getCopyIDButtonText() {
    return await this.copyIDButton;
  }

  async getShortDidKey(didKey: string) {
    const userKey = didKey;
    const abbreviatedUserKey = "#" + userKey.slice(-8);
    return abbreviatedUserKey;
  }

  async getStatusInputText() {
    return await this.statusInput;
  }

  async getStatusInputValue() {
    return await this.statusInput.getText();
  }

  async hoverOnBanner() {
    const bannerLocator = await this.profileBanner;
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await hoverOnMacOS(bannerLocator, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await hoverOnWindows(bannerLocator, this.executor);
    }
  }

  async hoverOnCopyID() {
    const element = await this.copyIDButton;
    await this.hoverOnElement(element);
  }

  async pasteUserKeyInStatus() {
    // Assuming that user already clicked on Copy ID button
    // If driver is macos, then get clipboard and pass it to enterStatus function
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      const userKey = await getClipboardMacOS();
      await this.enterStatus(userKey);
    } else if (currentDriver === WINDOWS_DRIVER) {
      // If driver is windows, then click on status input to place cursor there and simulate a control + v
      await this.statusInput.click();
      await this.statusInput.clearValue();
      await robot.keyTap("v", ["control"]);
    }
  }

  async uploadBannerPicture(relativePath: string) {
    // Invoke File Selection method depending on current OS driver
    // If Windows driver is running, first retrieve the current context and pass it to file selection function
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.profileBanner.click();
      await selectFileOnMacos(relativePath, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.profileBanner.click();
      const uplinkContext = await driver[this.executor].getWindowHandle();
      await selectFileOnWindows(relativePath, uplinkContext, this.executor);
    }

    // Validate that profile banner is displayed on screen
    await this.profileBanner.waitForDisplayed();
  }

  async uploadProfilePicture(relativePath: string) {
    // Invoke File Selection method depending on current OS driver
    // If Windows driver is running, first retrieve the current context and pass it to file selection function
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.clickOnAddPictureButton();
      await selectFileOnMacos(relativePath, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.clickOnAddPictureButton();
      const uplinkContext = await driver[this.executor].getWindowHandle();
      await selectFileOnWindows(relativePath, uplinkContext, this.executor);
    }

    // Validate that profile banner is displayed on screen
    await this.profilePicture.waitForDisplayed();
  }
}
