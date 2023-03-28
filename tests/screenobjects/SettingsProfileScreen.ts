import { selectFileOnMacos, selectFileOnWindows } from "../helpers/commands";
import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_PROFILE: "~settings-profile",
};

const SELECTORS_WINDOWS = {
  ADD_PICTURE_BUTTON: '[name="add-picture-button"]',
  DISMISS_BUTTON: "//Button",
  INPUT_ERROR: '[name="input-error"]',
  INPUT_ERROR_MESSAGE: "//Text",
  PROFILE_BANNER: '[name="profile-banner"]',
  PROFILE_BANNER_TOOLTIP: "//Text",
  PROFILE_CONTENT: '[name="profile-content"]',
  PROFILE_HEADER: '[name="profile-header"]',
  PROFILE_PICTURE: '[name="profile-picture"]',
  STATUS_INPUT: '[name="status-input"]',
  STATUS_LABEL: "//Text[2]/Text",
  USERNAME_INPUT: '[name="username-input"]',
  USERNAME_LABEL: "//Text[1]/Text",
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE: "//Text[2]",
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO: "//Text[3]",
  YOUR_NEW_PROFILE_HEADER_TEXT: "//Text[1]/Text",
};

const SELECTORS_MACOS = {
  ADD_PICTURE_BUTTON: "~add-picture-button",
  DISMISS_BUTTON: "-ios class chain:**/XCUIElementTypeButton",
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
  USERNAME_INPUT: "~username-input",
  USERNAME_LABEL: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_ONE:
    "-ios class chain:**/XCUIElementTypeGroup[2]/XCUIElementTypeStaticText",
  YOUR_NEW_PROFILE_DESCRIPTION_TEXT_TWO:
    "-ios class chain:**/XCUIElementTypeGroup[3]/XCUIElementTypeStaticText",
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

  get dismissButton() {
    return $(SELECTORS.SETTINGS_PROFILE).$(SELECTORS.DISMISS_BUTTON);
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

  async hoverOnBanner() {
    // Get elementID of Profile Banner
    const bannerElementID = await driver.findElement(
      "accessibility id",
      "profile-banner"
    ).elementId;

    // Get X and Y coordinates to hover on from Profile Banner
    const bannerX = (await this.profileBanner.getLocation("x")) + 10;
    const bannerY = (await this.profileBanner.getLocation("y")) + 10;

    // Hover on X and Y coordinates previously retrieved
    if ((await this.getCurrentDriver()) === "mac2") {
      await driver.executeScript("macos: hover", [
        {
          elementId: bannerElementID,
          x: bannerX,
          y: bannerY,
        },
      ]);
    } else if ((await this.getCurrentDriver()) === "windows") {
      await driver.touchPerform([
        {
          element: bannerElementID,
          action: "moveTo",
          options: {
            x: bannerX,
            y: bannerY,
          },
        },
      ]);
    }
  }

  async waitForToastNotificationClosed() {
    const toast = await $(SELECTORS.TOAST_NOTIFICATIONS);
    await toast.waitForDisplayed({ reverse: true });
  }

  async uploadBannerPicture(relativePath: string) {
    // Invoke File Selection method depending on current OS driver
    // If Windows driver is running, first retrieve the current context and pass it to file selection function
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await this.profileBanner.click();
      await selectFileOnMacos(relativePath);
    } else if (currentDriver === "windows") {
      const uplinkContext = await driver.getWindowHandle();
      await this.profileBanner.click();
      await selectFileOnWindows(relativePath, uplinkContext);
    }
    // Validate that profile banner is displayed on screen
    await expect(await this.profileBanner).toBeDisplayed();
  }

  async uploadProfilePicture(relativePath: string) {
    // Invoke File Selection method depending on current OS driver
    // If Windows driver is running, first retrieve the current context and pass it to file selection function
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await this.profilePicture.click();
      await selectFileOnMacos(relativePath);
    } else if (currentDriver === "windows") {
      const uplinkContext = await driver.getWindowHandle();
      await this.profilePicture.click();
      await selectFileOnWindows(relativePath, uplinkContext);
    }
    // Validate that profile banner is displayed on screen
    await expect(await this.profilePicture).toBeDisplayed();
  }
}

export default new SettingsProfileScreen();
