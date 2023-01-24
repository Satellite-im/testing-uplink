import AppScreen from "./AppScreen";
import { join } from "path";
import { hoverOnElement } from "../helpers/commands";

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

  get fileSelectionPanel () {
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

  get inputErrors() {
    return $$(SELECTORS.INPUT_ERROR);
  }

  get inputErrorOnStatus() {
    return $$(SELECTORS.INPUT_ERROR).$("//*[value='Maximum of 128 characters exceeded.']");
  }

  get inputErrorOnUsernameMax() {
    return $$(SELECTORS.INPUT_ERROR).$("//*[value='Maximum of 32 characters exceeded.']");
  }

  get inputErrorOnUsernameMin() {
    return $$(SELECTORS.INPUT_ERROR).$("//*[value='Please enter at least 4 characters.']");
  }

  get inputErrorOnUsernameSpaces() {
    return $$(SELECTORS.INPUT_ERROR).$("//*[value='Spaces are not allowed.']");
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
    return $(SELECTORS.PROFILE_CONTENT).$("//*[value='STATUS']");
  }

  get usernameInput() {
    return $(SELECTORS.USERNAME_INPUT);
  }

  get usernameLabel() {
    return $(SELECTORS.PROFILE_CONTENT).$("//*[value='USERNAME']");
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

  async enterUsernameWithSpaces() {
    await this.usernameInput.click();
    await driver.execute_script('macos: keys', {
      'keys': [{
          'key': 'Space',   
      }]
    });
  }

  async goToMainScreen() {
    await (await this.chatsButton).click();
  }

  async hoverOnBanner() {
    await hoverOnElement("//*[label='profile-banner']");
  }

  async uploadBannerPicture(relativePath: string) {
    const imagePath = join(process.cwd(), relativePath);
    await await(this.profileBanner).click();
    await this.fileSelectionPanel.waitForDisplayed();
    await this.fileSelectionPanel.setValue(imagePath + "\n");
    await this.fileSelectionOKButton.click();
    await this.fileSelectionPanel.waitForExist({ reverse: true });
    await expect(await this.profileBanner).toBeDisplayed();
  }

  async uploadProfilePicture(relativePath: string) {
    const imagePath = join(process.cwd(), relativePath);
    await await(this.addPictureButton).click();
    await this.fileSelectionPanel.waitForDisplayed();
    await this.fileSelectionPanel.setValue(imagePath + "\n");
    await this.fileSelectionOKButton.click();
    await this.fileSelectionPanel.waitForExist({ reverse: true });
    await await(this.usernameInput).click();
    await expect(await this.profilePicture).toBeDisplayed();
  }  
}

export default new SettingsProfileScreen();
