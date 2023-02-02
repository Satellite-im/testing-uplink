import SettingsBaseScreen from "./SettingsBaseScreen";

const SELECTORS = {
  CLEAR_CACHE_BUTTON: "~clear-button",
  COMPRESS_BUTTON: "~compress-button",
  DEBUG_LOGGER_BUTTON: "~debug-logger-button",
  OPEN_CACHE_FOLDER_BUTTON: "~open-cache-folder-button",
  OPEN_CODEBASE_BUTTON: "~open-codebase-button",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_DEVELOPER: "~settings-developer",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_SECTION: "~settings-section",
  SWITCH_SLIDER: "~Switch Slider",
};

class SettingsDeveloperScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_DEVELOPER);
  }

  get clearCacheButton() {
    return $(SELECTORS.CLEAR_CACHE_BUTTON);
  }

  get clearCacheDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[4].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get clearCacheHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[4].$(
      '//*[@label="settings-info"]/*[1]'
    );
  }

  get compressAndDownloadCacheButton() {
    return $(SELECTORS.COMPRESS_BUTTON);
  }

  get compressAndDownloadCacheDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[3].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get compressAndDownloadCacheHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[3].$(
      '//*[@label="settings-info"]/*[1]'
    );
  }

  get debugLoggerButton() {
    return $(SELECTORS.DEBUG_LOGGER_BUTTON);
  }

  get debugLoggerDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[5].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get debugLoggerHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[5].$(
      '//*[@label="settings-info"]/*[1]'
    );
  }

  get developerModeControllerButton() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(SELECTORS.SWITCH_SLIDER);
  }

  get developerModeControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(
      '//*[@label="Switch Slider"]/*[1]'
    );
  }

  get developerModeDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[0].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get developerModeHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[0].$(
      '//*[@label="settings-info"]/*[1]'
    );
  }

  get openCacheButton() {
    return $(SELECTORS.OPEN_CACHE_FOLDER_BUTTON);
  }

  get openCacheDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[2].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get openCacheHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[2].$(
      '//*[@label="settings-info"]/*[1]'
    );
  }

  get openCodebaseButton() {
    return $(SELECTORS.OPEN_CODEBASE_BUTTON);
  }

  get openCodebaseDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[1].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get openCodebaseHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[1].$(
      '//*[@label="settings-info"]/*[1]'
    );
  }

  get saveLogsControllerButton() {
    return $$(SELECTORS.SETTINGS_CONTROL)[6].$(SELECTORS.SWITCH_SLIDER);
  }

  get saveLogsControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[6].$(
      '//*[@label="Switch Slider"]/*[1]'
    );
  }

  get saveLogsDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[6].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get saveLogsHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[6].$(
      '//*[@label="settings-info"]/*[1]'
    );
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

  get settingsDeveloper() {
    return $(SELECTORS.SETTINGS_DEVELOPER);
  }

  get switchSlider() {
    return $(SELECTORS.SWITCH_SLIDER);
  }

  async clickOnClearCache() {
    await this.clearCacheButton.click();
  }

  async clickOnCompressAndDownloadCache() {
    await this.compressAndDownloadCacheButton.click();
  }

  async clickOnDebugLogger() {
    await this.debugLoggerButton.click();
  }

  async clickOnDeveloperMode() {
    await this.developerModeControllerButton.click();
  }

  async clickOnOpenCache() {
    await this.openCacheButton.click();
  }

  async clickOnOpenCodebase() {
    await this.openCodebaseButton.click();
  }

  async clickOnSaveLogs() {
    await this.saveLogsControllerButton.click();
  }

  async returnToApp() {
    await driver.executeScript("macos: launchApp", [
      {
        bundleId: "im.satellite.uplink",
      },
    ]);
  }
}

export default new SettingsDeveloperScreen();
