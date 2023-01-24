import AppScreen from "./AppScreen";

const SELECTORS = {
  AUDIO_BUTTON: "~audio-button",
  BUTTON_NAV: "~button-nav",
  CHATS_BUTTON: "~chats-button",
  DEVELOPER_BUTTON: "~developer-button",
  EXTENSIONS_BUTTTON: "~extensions-button",
  FILES_BUTTON: "~files-button",
  FRIENDS_BUTTON: "~friends-button",
  GENERAL_BUTTON: "~general-button",
  PRE_RELEASE_INDICATOR: "~pre-release",
  PRE_RELEASE_INDICATOR_TEXT:
    '-ios class chain:**/XCUIElementTypeStaticText[`value == "Pre-release"`]',
  PRIVACY_BUTTON: "~privacy-button",
  PROFILE_BUTTON: "~profile-button",
  SETTINGS_BUTTON: "~settings-button",
  SETTINGS_LAYOUT: "~settings-layout",
  SIDEBAR: "~sidebar",
  SIDEBAR_CHILDREN: "~sidebar-children",
  SIDEBAR_SEARCH: "~sidebar-search",
  WINDOW: "-ios class chain:**/XCUIElementTypeWebView",
};

class SettingsScreen extends AppScreen {
  constructor() {
    super(SELECTORS.SETTINGS_LAYOUT);
  }

  get audioButton() {
    return $(SELECTORS.AUDIO_BUTTON);
  }

  get buttonNav() {
    return $(SELECTORS.BUTTON_NAV);
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

  get prereleaseIndicator() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR);
  }

  get prereleaseIndicatorText() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR_TEXT);
  }

  get privacyButton() {
    return $(SELECTORS.PRIVACY_BUTTON);
  }

  get profileButton() {
    return $(SELECTORS.PROFILE_BUTTON);
  }

  get settingsButton() {
    return $(SELECTORS.SETTINGS_BUTTON);
  }

  get settingsLayout() {
    return $(SELECTORS.SETTINGS_LAYOUT);
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

  get window() {
    return $(SELECTORS.WINDOW);
  }

  async goToProfileSettings() {
    await (await this.profileButton).click();
  }

  async goToGeneralSettings() {
    await (await this.generalButton).click();
  }

  async goToPrivacySettings() {
    await (await this.privacyButton).click();
  }

  async goToAudioSettings() {
    await (await this.audioButton).click();
  }

  async goToFilesSettings() {
    await (await this.filesSettingsButton).click();
  }

  async goToExtensionsSettings() {
    await (await this.extensionsButton).click();
  }

  async goToDeveloperSettings() {
    await (await this.developerButton).click();
  }

  async goToMainScreen() {
    await (await this.chatsButton).click();
  }
}

export default new SettingsScreen();
