import SettingsBaseScreen from "./SettingsBaseScreen";

const SELECTORS = {
  OPEN_SYNC_FOLDER_BUTTON: "~open-sync-folder-button",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_FILES: "~settings-files",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_SECTION: "~settings-section",
  SWITCH_SLIDER: "~switch-slider",
};

class SettingsFilesScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_FILES);
  }

  get localSyncControllerButton() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(SELECTORS.SWITCH_SLIDER);
  }

  get localSyncControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(
      '//*[@label="switch-slider]/*[1]'
    );
  }

  get localSyncDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[0].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get localSyncHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[0].$(
      '//*[@label="settings-info"]/*[1]'
    );
  }

  get openSyncFolderButton() {
    return $(SELECTORS.OPEN_SYNC_FOLDER_BUTTON);
  }

  get openSyncFolderDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[1].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get openSyncFolderHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[1].$(
      '//*[@label="settings-info"]/*[1]'
    );
  }

  get settingsFiles() {
    return $(SELECTORS.SETTINGS_FILES);
  }

  get settingsControl() {
    return $(SELECTORS.SETTINGS_CONTROL);
  }

  get settingsInfo() {
    return $(SELECTORS.SETTINGS_INFO);
  }

  get settingsSection() {
    return $(SELECTORS.SETTINGS_SECTION);
  }

  get switchSlider() {
    return $(SELECTORS.SWITCH_SLIDER);
  }

  async clickOnLocalSync() {
    await this.localSyncControllerButton.click();
  }

  async clickOnOpenSyncFolder() {
    await this.openSyncFolderButton.click();
  }
}

export default new SettingsFilesScreen();
