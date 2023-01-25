import AppScreen from "./AppScreen";
import { join } from "path";

const SELECTORS = {
  ADD_PICTURE_BUTTON: "~add-picture-button",
  AUDIO_BUTTON: "~audio-button",
  BUTTON_NAV: "~button-nav",
  CHATS_BUTTON: "~chats-button",
  DEVELOPER_BUTTON: "~developer-button",
  EXTENSIONS_BUTTTON: "~extensions-button",
  FILE_SELECTION_OK_BUTTON: "~OKButton",
  FILE_SELECTION_PANEL: "~open-panel",
  FILES_BUTTON: "~files-button",
  FRIENDS_BUTTON: "~friends-button",
  GENERAL_BUTTON: "~general-button",
  INPUT_ERROR: "~input-error",
  PRE_RELEASE_INDICATOR: "~pre-release",
  PRE_RELEASE_INDICATOR_TEXT:
    '-ios class chain:**/XCUIElementTypeStaticText[`value == "Pre-release"`]',
  PRIVACY_BUTTON: "~privacy-button",
  PROFILE_BANNER: "~profile-banner",
  PROFILE_BUTTON: "~profile-button",
  PROFILE_CONTENT: "~profile-content",
  PROFILE_HEADER: "~profile-header",
  PROFILE_PICTURE: "~profile-picture",
  SETTINGS_BUTTON: "~settings-button",
  SETTINGS_LAYOUT: "~settings-layout",
  SETTINGS_PROFILE: "~settings-profile",
  SETTINGS_SEARCH_INPUT: "~settings-search-input",
  SIDEBAR: "~sidebar",
  SIDEBAR_CHILDREN: "~sidebar-children",
  SIDEBAR_SEARCH: "~sidebar-search",
  STATUS_INPUT: "~status-input",
  USERNAME_INPUT: "~username-input",
  WINDOW: "-ios class chain:**/XCUIElementTypeWebView",
};

class SettingsProfileScreen extends AppScreen {
  constructor() {
    super(SELECTORS.SETTINGS_PROFILE);
  }

  get addPictureButton() {
    return $(SELECTORS.ADD_PICTURE_BUTTON);
  }

  get audioButton() {
    return $(SELECTORS.AUDIO_BUTTON);
  }

  get buttonNav() {
    return $$(SELECTORS.BUTTON_NAV);
  }

  get chatsButton() {
    return $(SELECTORS.CHATS_BUTTON);
  }

  get developerButton() {
    return $(SELECTORS.DEVELOPER_BUTTON);
  }

  get extensionsButton() {
    return $(SELECTORS.EXTENSIONS_BUTTTON);
  }

  get fileSelectionOKButton() {
    return $(SELECTORS.FILE_SELECTION_OK_BUTTON);
  }

  get fileSelectionPanel() {
    return $(SELECTORS.FILE_SELECTION_PANEL);
  }

  get filesButton() {
    return $$(SELECTORS.FILES_BUTTON)[0];
  }

  get filesSettingsButton() {
    return $$(SELECTORS.FILES_BUTTON)[1];
  }

  get friendsButton() {
    return $(SELECTORS.FRIENDS_BUTTON);
  }

  get generalButton() {
    return $(SELECTORS.GENERAL_BUTTON);
  }

  get inputError() {
    return $(SELECTORS.INPUT_ERROR);
  }

  get inputErrorOnStatus() {
    return $(SELECTORS.INPUT_ERROR).$(
      "//*[@value='Maximum of 128 characters exceeded.']"
    );
  }

  get inputErrorOnUsernameMax() {
    return $(SELECTORS.INPUT_ERROR).$(
      "//*[@value='Maximum of 32 characters exceeded.']"
    );
  }

  get inputErrorOnUsernameMin() {
    return $(SELECTORS.INPUT_ERROR).$(
      "//*[@value='Please enter at least 4 characters.']"
    );
  }

  get inputErrorOnUsernameSpaces() {
    return $(SELECTORS.INPUT_ERROR).$("//*[@value='Spaces are not allowed.']");
  }

  get prereleaseIndicator() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR);
  }

  get prereleaseIndicatorText() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR_TEXT);
  }

  get privacyButton() {
    return $(SELECTORS.PRIVACY_BUTTON);
  }

  get profileBanner() {
    return $(SELECTORS.PROFILE_BANNER);
  }

  get profileBannerTooltip() {
    return $(SELECTORS.PROFILE_BANNER).$('//*[@value="Change banner"]');
  }

  get profileButton() {
    return $(SELECTORS.PROFILE_BUTTON);
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

  get settingsButton() {
    return $(SELECTORS.SETTINGS_BUTTON);
  }

  get settingsLayout() {
    return $(SELECTORS.SETTINGS_LAYOUT);
  }

  get settingsProfile() {
    return $(SELECTORS.SETTINGS_PROFILE);
  }

  get settingsSearchInput() {
    return $(SELECTORS.SETTINGS_SEARCH_INPUT);
  }

  get sidebar() {
    return $(SELECTORS.SIDEBAR);
  }

  get sidebarChildren() {
    return $(SELECTORS.SIDEBAR_CHILDREN);
  }

  get sidebarSearch() {
    return $(SELECTORS.SIDEBAR_SEARCH);
  }

  get statusInput() {
    return $(SELECTORS.STATUS_INPUT);
  }

  get statusLabel() {
    return $(SELECTORS.PROFILE_CONTENT).$('(//*[@value="STATUS"])[1]');
  }

  get usernameInput() {
    return $(SELECTORS.USERNAME_INPUT);
  }

  get usernameLabel() {
    return $(SELECTORS.PROFILE_CONTENT).$('(//*[@value="USERNAME"])[1]');
  }

  get window() {
    return $(SELECTORS.WINDOW);
  }

  async enterStatus(status: string) {
    await this.statusInput.setValue(status);
  }

  async enterUsername(username: string) {
    await this.usernameInput.setValue(username);
  }

  async goToMainScreen() {
    await (await this.chatsButton).click();
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
    await driver.executeScript("macos: hover", [
      {
        elementId: bannerElementID,
        x: bannerX,
        y: bannerY,
      },
    ]);
  }

  async uploadBannerPicture(relativePath: string) {
    // Get absolute path from banner picture to upload by joining process.cwd with the relative path passed as argument
    const imagePath = join(process.cwd(), relativePath);

    // Click on Profile Banner
    await await this.profileBanner.click();

    // Once that File Selection Panel is available, look for the absolute path of the banner picture and select it
    await browser.pause(1000);
    await this.fileSelectionPanel.addValue(imagePath + "\n");
    await this.fileSelectionOKButton.click();

    // Validate that profile banner is displayed on screen
    await expect(await this.profileBanner).toBeDisplayed();
  }

  async uploadProfilePicture(relativePath: string) {
    // Get absolute path from profile picture to upload by joining process.cwd with the relative path passed as argument
    const imagePath = join(process.cwd(), relativePath);

    // Click on Profile Picture add button
    await await this.addPictureButton.click();

    // Once that File Selection Panel is available, look for the absolute path of the profile picture and select it
    await browser.pause(1000);
    await this.fileSelectionPanel.addValue(imagePath + "\n");
    await this.fileSelectionOKButton.click();

    // Click on username input to move the mouse cursor
    await await this.usernameInput.click();

    // Validate that profile picture is displayed on screen
    await expect(await this.profilePicture).toBeDisplayed();
  }
}

export default new SettingsProfileScreen();
