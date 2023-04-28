import {
  getClipboardMacOS,
  hoverOnMacOS,
  hoverOnWindows,
  selectFileOnMacos,
  selectFileOnWindows,
} from "../helpers/commands";
import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver.capabilities.automationName;
const robot = require("robotjs");
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_PROFILE: "~settings-profile",
};

const SELECTORS_WINDOWS = {
  ADD_PICTURE_BUTTON: '[name="add-picture-button"]',
  COPY_ID_BUTTON: "//Button",
  DISMISS_BUTTON: '[name="Dismiss"]',
  INPUT_ERROR: '[name="input-error"]',
  INPUT_ERROR_MESSAGE: "//Text",
  PROFILE_BANNER: '[name="profile-banner"]',
  PROFILE_BANNER_TOOLTIP: "//Text",
  PROFILE_CONTENT: '[name="profile-content"]',
  PROFILE_HEADER: '[name="profile-header"]',
  PROFILE_PICTURE: '[name="profile-picture"]',
  STATUS_INPUT: '[name="status-input"]',
  STATUS_LABEL: "//Text[2]/Text",
  TOAST_NOTIFICATION: '[name="Toast Notification"]',
  TOAST_NOTIFICATION_CLOSE: "//Button/Button",
  TOAST_NOTIFICATION_TEXT: "//Text[2]",
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  USERNAME_INPUT: '[name="username-input"]',
  USERNAME_LABEL: "//Text[1]/Text",
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE: "//Text[2]",
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO: "//Text[3]",
  YOUR_NEW_PROFILE_HEADER_TEXT: "//Text[1]/Text",
};

const SELECTORS_MACOS = {
  ADD_PICTURE_BUTTON: "~add-picture-button",
  COPY_ID_BUTTON: "-ios class chain:**/XCUIElementTypeButton",
  DISMISS_BUTTON:
    '-ios class chain:**/XCUIElementTypeGroup[`label == "settings-profile"`]/XCUIElementTypeButton',
  INPUT_ERROR: "~input-error",
  INPUT_ERROR_MESSAGE: "-ios class chain:**/XCUIElementTypeStaticText",
  PROFILE_BANNER: "~profile-banner",
  PROFILE_BANNER_TOOLTIP:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  PROFILE_CONTENT: "~profile-content",
  PROFILE_HEADER: "~profile-header",
  PROFILE_PICTURE: "~profile-picture",
  STATUS_INPUT: "~status-input",
  STATUS_LABEL: "-ios class chain:**/XCUIElementTypeStaticText[2]",
  TOAST_NOTIFICATION: "~Toast Notification",
  TOAST_NOTIFICATION_CLOSE: "-ios class chain:**/XCUIElementTypeButton",
  TOAST_NOTIFICATION_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup[2]/XCUIElementTypeStaticText",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  USERNAME_INPUT: "~username-input",
  USERNAME_LABEL: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE:
    "-ios class chain:**/XCUIElementTypeGroup[2]/XCUIElementTypeStaticText",
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO:
    '-ios class chain:**/XCUIElementTypeStaticText[`value == "First step, pick out a profile picture and maybe even a banner too!"`]',
  YOUR_NEW_PROFILE_HEADER_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class SettingsProfileScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_PROFILE);
  }

  get addPictureButton() {
    return $(SELECTORS.ADD_PICTURE_BUTTON);
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

  get profileBanner() {
    return $(SELECTORS.PROFILE_BANNER);
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

  get settingsProfile() {
    return $(SELECTORS.SETTINGS_PROFILE);
  }

  get statusInput() {
    return $(SELECTORS.STATUS_INPUT);
  }

  get statusLabel() {
    return $(SELECTORS.PROFILE_CONTENT).$(SELECTORS.STATUS_LABEL);
  }

  get toastNotification() {
    return $(SELECTORS.TOAST_NOTIFICATION);
  }

  get toastNotificationClose() {
    return $(SELECTORS.TOAST_NOTIFICATION).$(
      SELECTORS.TOAST_NOTIFICATION_CLOSE
    );
  }

  get toastNotificationText() {
    return $(SELECTORS.TOAST_NOTIFICATION).$(SELECTORS.TOAST_NOTIFICATION_TEXT);
  }

  get usernameInput() {
    return $(SELECTORS.USERNAME_INPUT);
  }

  get usernameLabel() {
    return $(SELECTORS.PROFILE_CONTENT).$(SELECTORS.USERNAME_LABEL);
  }

  get yourNewProfileDescriptionTextOne() {
    return $(SELECTORS.SETTINGS_PROFILE).$(
      SELECTORS.YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE
    );
  }

  get yourNewProfileDescriptionTextTwo() {
    return $(SELECTORS.SETTINGS_PROFILE).$(
      SELECTORS.YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO
    );
  }

  get yourNewProfileHeaderText() {
    return $(SELECTORS.SETTINGS_PROFILE).$(
      SELECTORS.YOUR_NEW_PROFILE_HEADER_TEXT
    );
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

  async closeToastNotification() {
    await this.toastNotificationClose.click();
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

  async getToastNotificationText() {
    return await this.toastNotificationText.getText();
  }

  async hoverOnBanner() {
    const bannerLocator = await this.profileBanner;
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await hoverOnMacOS(bannerLocator);
    } else if (currentDriver === "windows") {
      await hoverOnWindows(bannerLocator);
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
    if (currentDriver === "mac2") {
      const userKey = await getClipboardMacOS();
      await this.enterStatus(userKey);
    } else if (currentDriver === "windows") {
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
    await this.profileBanner.click();
    if (currentDriver === "mac2") {
      await selectFileOnMacos(relativePath);
    } else if (currentDriver === "windows") {
      await selectFileOnWindows(relativePath);
    }

    // Validate that profile banner is displayed on screen
    await this.profileBanner.waitForDisplayed();
  }

  async uploadProfilePicture(relativePath: string) {
    // Invoke File Selection method depending on current OS driver
    // If Windows driver is running, first retrieve the current context and pass it to file selection function
    const currentDriver = await this.getCurrentDriver();
    await this.clickOnAddPictureButton();
    if (currentDriver === "mac2") {
      await selectFileOnMacos(relativePath);
    } else if (currentDriver === "windows") {
      await selectFileOnWindows(relativePath);
    }

    // Validate that profile banner is displayed on screen
    await this.profilePicture.waitForDisplayed();
  }

  async waitUntilNotificationIsClosed() {
    await this.toastNotification.waitForExist({
      reverse: true,
    });
  }
}

export default new SettingsProfileScreen();
