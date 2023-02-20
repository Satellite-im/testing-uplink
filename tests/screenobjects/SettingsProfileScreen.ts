import { selectFileOnMacos } from "../helpers/commands";
import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_PROFILE: "~settings-profile",
};

const SELECTORS_WINDOWS = {
  ADD_PICTURE_BUTTON: '[name="add-picture-button"]',
  INPUT_ERROR: '[name="input-error"]',
  INPUT_ERROR_MESSAGE: "//Text",
  PROFILE_BANNER: '[name="profile-banner"]',
  PROFILE_BANNER_TOOLTIP: "",
  PROFILE_CONTENT: '[name="profile-content"]',
  PROFILE_HEADER: '[name="profile-header"]',
  PROFILE_PICTURE: '[name="profile-picture"]',
  STATUS_INPUT: '[name="status-input"]',
  STATUS_LABEL: "//Text[2]",
  USERNAME_INPUT: '[name="username-input"]',
  USERNAME_LABEL: "//Text[1]",
};

const SELECTORS_MACOS = {
  ADD_PICTURE_BUTTON: "~add-picture-button",
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
    const bannerX = (await $("~profile-banner").getLocation("x")) + 10;
    const bannerY = (await $("~profile-banner").getLocation("y")) + 10;

    // Hover on X and Y coordinates previously retrieved
    const currentDriver = await driver.capabilities.automationName;
    if (currentDriver === "mac2") {
      await driver.executeScript("macos: hover", [
        {
          elementId: bannerElementID,
          x: bannerX,
          y: bannerY,
        },
      ]);
    } else if (currentDriver === "windows") {
      console.log("Not implemented yet");
    }
  }

  async uploadBannerPicture(relativePath: string) {
    // Click on Profile Banner
    await this.profileBanner.click();

    // Invoke File Selection Helper Function for MacOS to select the banner image to upload. A similar method will be implemented in the future for Windows
    const currentDriver = await driver.capabilities.automationName;
    if (currentDriver === "mac2") {
      await selectFileOnMacos(relativePath);

      // Validate that profile banner is displayed on screen
      await expect(await this.profileBanner).toBeDisplayed();
    } else if (currentDriver === "windows") {
      console.log("Not implemented yet");
    }
  }

  async uploadProfilePicture(relativePath: string) {
    // Click on Profile Picture add button
    await await this.addPictureButton.click();

    // Invoke File Selection Helper Function for MacOS to select the profile image to upload. A similar method will be implemented in the future for Windows
    const currentDriver = await driver.capabilities.automationName;
    if (currentDriver === "mac2") {
      await selectFileOnMacos(relativePath);

      // Click on username input to move the mouse cursor
      await this.usernameInput.click();

      // Validate that profile picture is displayed on screen
      await expect(await this.profilePicture).toBeDisplayed();
    } else if (currentDriver === "windows") {
      console.log("Not implemented yet");
    }
  }
}

export default new SettingsProfileScreen();
