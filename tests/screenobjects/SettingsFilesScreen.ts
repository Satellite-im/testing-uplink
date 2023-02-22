import SettingsBaseScreen from "./SettingsBaseScreen";

const SELECTORS = {
  OPEN_SYNC_FOLDER_BUTTON: "~open-sync-folder-button",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_FILES: "~settings-files",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_SECTION: "~settings-section",
};

class SettingsFilesScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_FILES);
  }

  get localSyncCheckbox() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX
    );
  }

  get localSyncDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get localSyncHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get openSyncFolderButton() {
    return $(SELECTORS.OPEN_SYNC_FOLDER_BUTTON);
  }

  get openSyncFolderDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get openSyncFolderHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsFiles() {
    return $(SELECTORS.SETTINGS_FILES);
  }

  async clickOnLocalSync() {
    await this.localSyncCheckbox.click();
  }

  async clickOnOpenSyncFolder() {
    await this.openSyncFolderButton.click();
  }
}

export default new SettingsFilesScreen();
